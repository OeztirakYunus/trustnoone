import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {room,player,view,command,advance,bots,log} from './engine.js';
const base=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(base,'../public'),data=process.env.DATA_DIR||path.resolve(base,'../data');
fs.mkdirSync(data,{recursive:true});
let rooms=new Map();try{rooms=new Map(JSON.parse(fs.readFileSync(path.join(data,'rooms.json'),'utf8')).map(r=>[r.code,r]));for(const r of rooms.values())if(r.deadline)r.deadline=Date.now()+30000;}catch{}
const streams=new Map(),limits=new Map();let dirty=false;
function save(){if(!dirty)return;fs.writeFileSync(path.join(data,'rooms.tmp'),JSON.stringify([...rooms.values()]));fs.renameSync(path.join(data,'rooms.tmp'),path.join(data,'rooms.json'));dirty=false;}
function publish(r){r.version++;dirty=true;for(const s of streams.get(r.code)||[]){const p=r.players.find(p=>p.id===s.id);if(p)s.res.write(`data: ${JSON.stringify(view(r,p))}\n\n`);else{s.res.write('event: removed\ndata: {}\n\n');s.res.end();}}}
const send=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj));};
async function body(req){let chunks=[],size=0;for await(const c of req){size+=c.length;if(size>16384)throw new Error('BODY_TOO_LARGE');chunks.push(c)}try{return JSON.parse(Buffer.concat(chunks).toString()||'{}')}catch{throw new Error('INVALID_JSON')}}
function auth(r,token){const p=r.players.find(p=>p.token===token&&!p.bot);if(!p)throw new Error('UNAUTHORIZED');p.lastSeen=Date.now();return p;}
const server=http.createServer(async(req,res)=>{const u=new URL(req.url,'http://localhost');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');
try{if(u.pathname.startsWith('/api/')){const ip=req.socket.remoteAddress;const now=Date.now(),lim=limits.get(ip)||{at:now,n:0};if(now-lim.at>10000){lim.at=now;lim.n=0}limits.set(ip,lim);if(++lim.n>160)return send(res,429,{error:'RATE_LIMIT'});
if(req.method==='POST'){if(req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host)return send(res,403,{error:'INVALID_ORIGIN'});const b=await body(req);
if(u.pathname==='/api/create'){if(rooms.size>=200)throw new Error('SERVER_FULL');const r=room(b.name);while(rooms.has(r.code))r.code=room('').code;rooms.set(r.code,r);dirty=true;return send(res,200,{token:r.players[0].token,state:view(r,r.players[0])});}
const r=rooms.get(String(b.code||'').toUpperCase());if(!r)return send(res,404,{error:'ROOM_NOT_FOUND'});
if(u.pathname==='/api/join'){if(r.phase!=='lobby')throw new Error('GAME_STARTED');if(r.players.length>=15)throw new Error('ROOM_FULL');const p=player(b.name);r.players.push(p);publish(r);return send(res,200,{token:p.token,state:view(r,p)})}
const p=auth(r,req.headers.authorization?.replace('Bearer ',''));if(u.pathname==='/api/command'){command(r,p,b);publish(r);return send(res,200,view(r,p))}return send(res,404,{error:'NOT_FOUND'});}
const r=rooms.get(String(u.searchParams.get('code')||'').toUpperCase());if(!r)return send(res,404,{error:'ROOM_NOT_FOUND'});const p=auth(r,req.headers.authorization?.replace('Bearer ','')||u.searchParams.get('token'));
if(u.pathname==='/api/events'){res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(`data: ${JSON.stringify(view(r,p))}\n\n`);const s={id:p.id,res};const set=streams.get(r.code)||new Set();set.add(s);streams.set(r.code,set);req.on('close',()=>set.delete(s));return}
if(u.pathname==='/api/state')return send(res,200,view(r,p));return send(res,404,{error:'NOT_FOUND'});}
if(req.method!=='GET')return send(res,405,{error:'METHOD_NOT_ALLOWED'});const file=path.resolve(root,'.'+decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!file.startsWith(root+path.sep))return send(res,403,{error:'FORBIDDEN'});const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};fs.readFile(file,(err,buf)=>{if(err)return send(res,404,{error:'NOT_FOUND'});res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(buf)});
}catch(e){send(res,e.message==='UNAUTHORIZED'?401:400,{error:e.message})}});
setInterval(()=>{for(const r of rooms.values()){if(r.phase!=='lobby'&&r.phase!=='finished'){if(Date.now()>=r.deadline){advance(r);publish(r)}else if(Date.now()%10000<1100){bots(r);publish(r)}}}save()},1000).unref();
setInterval(()=>{for(const [code,r]of rooms){if(Date.now()-r.created>7*86400000&&!streams.get(code)?.size){rooms.delete(code);dirty=true}}for(const s of streams.values())for(const x of s){x.res.write(': heartbeat\n\n');const r=[...rooms.values()].find(r=>r.players.some(p=>p.id===x.id));const p=r?.players.find(p=>p.id===x.id);if(p)p.lastSeen=Date.now()}for(const [k,v]of limits)if(Date.now()-v.at>60000)limits.delete(k)},20000).unref();
const port=Number(process.env.PORT)||3000;server.listen(port,'0.0.0.0',()=>console.log(`TRUST NO ONE · http://localhost:${port}\nOther devices: http://YOUR-LAN-IP:${port}`));
function close(){dirty=true;save();server.close();process.exit(0)}process.on('SIGINT',close);process.on('SIGTERM',close);
