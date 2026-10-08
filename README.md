# TRUST NO ONE — Vanta City

Startbares Browser-Partyspiel für 2–15 Spieler. Node.js 20 oder neuer. Keine externen npm-Abhängigkeiten, kein Build-Schritt, keine API-Schlüssel.

## Start auf deinem Mac

Entpacke die ZIP. Öffne im Terminal **den Ordner `trust-no-one`, in dem `package.json` liegt**:

```bash
cd /Pfad/zum/entpackten/trust-no-one
npm install
npm start
```

Öffne http://localhost:3000. `sudo` ist nicht nötig.

## Gemeinsam spielen

1. Host erstellt einen Raum und kopiert den Einladungslink.
2. Auf demselben Rechner: Freunde in getrennten Browsern/Browserprofilen testen. Ein Browserprofil verwaltet einen lokalen Zugang; für mehrere unabhängige Spieler getrennte Profile nutzen.
3. Auf Handys im gleichen WLAN: Computer-IP statt `localhost` öffnen, z. B. `http://192.168.1.42:3000`. Auf macOS: Systemeinstellungen → WLAN → Details → TCP/IP → IP-Adresse. Alle müssen denselben Server erreichen. Der Server bindet an `0.0.0.0`.
4. Raumcode eingeben, bereit melden, Host startet. Für kleine Gruppen können Bots ergänzt werden.
5. Sprecht im selben Raum oder nutzt eine eigene Sprachverbindung. Textchat ist eingebaut; Sprach-/Videochat nicht.

Für Freunde außerhalb des WLANs braucht der Node-Server einen erreichbaren Host mit HTTPS. Diese ZIP veröffentlicht keinen Server automatisch. Zugangstoken sind Spielzugänge ohne Benutzerkonten; Einladungen nur an die Mitspieler geben.

## Enthaltene Spielfunktionen

- Echte serverseitige Räume, 2–15 Spieler, Bereitschaft, Host-Einstellungen, Bots, Wiederverbindung und Rematch.
- Sieben Phasen mit Timern und Host-Vorlauf: Ereignis, Diskussion, Aktionen, Verträge, Wahl, Enthüllung, Einkommen.
- 25 öffentliche Rollen; jede hat eine kostenlose Spezialaktion pro Runde. Andere Aktionen kosten Aktionspunkte und teilweise Geld.
- 216 Ereignisvarianten aus 12 Stadtszenarien × 18 ausführbaren Mechaniken. Das sind systematisch kombinierte Varianten, keine 216 individuell geschriebenen Geschichten.
- Persönliche Ziele aus 11 parametrisierten Zieltypen (Zielspieler/Schwellenwert variieren), zwei zu Beginn und eine zusätzliche Mission zur Halbzeit. Keine Behauptung eines vollständig handgeschriebenen 100-Ziele-Decks.
- Geld, verborgenes Konto, Schulden, Einfluss, Popularität, Prestige, institutionelles Einkommen, Bankrott-Hilfe und Rachekarten.
- Bestechung, Erpressung, Diebstahl, Spionage, Enthüllung, Sabotage, Schutz, Gerüchte, Stimmfälschung, Stimmblockade, Kontosperre, Kredite, Investitionen, Glücksspiel, Geldverstecken, Stadtrettung und Institutionenkauf.
- Verträge zwischen realen Spielern mit sofortiger Zahlung, automatisch geprüften Bedingungen und echten Vertragsbrüchen. Bedingungen: Stimme, Schutz, Nichtangriff, Institution, Information.
- Direkte Zahlungen, öffentliche/private Nachrichten und Allianzchat; aktive Allianzen schalten die Institutionenfähigkeiten der Partner frei. Öffentlich oder geheim, mit Einladung und Austritt.
- Kopfgelder gegen einen Wahlsieg; Wetten über die nächste Originalstimme eines anderen Spielers, Einsatz treuhänderisch gehalten, Auszahlung nach Ergebnis.
- Krisenfinanzierung, verdeckte Auktionen, Schuldfrage, Koffer, offene Mikrofone, Zieltausch, Diktator, Revolution, Misstrauenswahl, Funkstille, Doppelstimmen, Whistleblower, Finanzcrash, Putsch, Anarchie, 20-Sekunden-Handytausch und Bankrun.
- „Ich schwöre“ mit geprüften Aussagen und späterer Entlarvung von Lügen.
- Bei 10–15 Spielern stimmt in jeder zweiten Runde ein rotierendes Komitee ab; alle anderen können weiter verhandeln und handeln. Diktator-Ereignis überschreibt dies.
- Tresor-Memory-Minispiel in jeder dritten Enthüllungsphase. Die anderen im ursprünglichen Konzept genannten Minispiele sind nicht implementiert.
- Dynamische Original-/manipulierte Wahlergebnisse, Stadtereignisse, Enthüllungen, Verratsanimationen, zeitlich begrenzte Überblendungen und synthetischer Sound (schaltbar). Systemeinstellung „Bewegung reduzieren“ wird berücksichtigt.
- DE/EN/TR pro Browser unabhängig. Freier Nachrichtentext und Spielernamen werden nicht automatisch übersetzt.
- Finaler Gewinner, offengelegte Ziele, Punkteaufteilung, geheime Aktionen, Auszeichnungen und lokale Profilhistorie.

## Modi

- Normal: gewählte Dauer.
- Chaos: Chaos steigt am Rundenende schneller.
- Hardcore: keine direkten privaten Nachrichten.
- Party: Phasendauer höchstens 30 Sekunden.
- Freundschaftskiller: ein persönliches Rivalitätsziel zu Beginn.
- Blitz: 6 Runden, 30 Sekunden pro Phase.
- Endlos: keine Rundengrenze; 100 Chaos beendet weiter die Partie.
- Turnier: reguläre Partie; lokale Profilhistorie erfasst Ergebnisse. Kein eigener Online-Turnierbaum.

## Regeln / Abrechnung

Alle starten mit 10.000 € und 3 Einfluss (Erbe: 15.000 €). Pro Runde 2 reguläre Aktionen plus eine kostenlose Rollenfähigkeit. Schutz blockiert den nächsten Diebstahl, die nächste Sabotage, Konto- oder Stimmblockade. Das Rathaus erhöht Stimmgewicht um 1; Bestechungen erhöhen die eigene Stimme um 1. Fälschung leitet die Stimme des Zielspielers auf den Täter um. Erpressung bei korrekt geratenem Geheimnis bindet die Stimme. Keine direkte Eliminierung.

Verträge zahlen bei Annahme sofort. Die Bedingung gilt für die aktuelle Runde. Für Stimmen zählt die Originalstimme einschließlich einer erpressten Stimme; die spätere Fälschung ändert nicht die Vertragstreue. Informationsverträge prüfen, ob der Empfänger nach Angebotsbeginn ein neues Geheimnis öffentlich enthüllt. Nichtangriff umfasst Diebstahl, Sabotage, Stimm- und Kontoblockade sowie Fälschung. Bruch: −2 Einfluss, Rachekarte für Auftraggeber (Anarchie: keine Einflussstrafe). Erfüllung: beide erhalten +1 Prestige.

Wahlgleichstand: höherer Einfluss, danach stabile zufällige Spieler-ID. Auktion: höchstes bezahlbares nicht eingefrorenes Gebot, dann weniger Vermögen, dann ID. Kein/mehrere Koffernehmer: kein Gewinn. Im Bankrun verlieren mehrere Abheber je 10 % ihres Geldes. Die Schuldfrage bestrafen den richtigen Täter mit 5.000 € Verlust und −2 Prestige; Unschuldige verlieren 2 Einfluss und der Täter gewinnt 3 Prestige.

Einkommen: 1.000 € +700 € je Institution (+700 € als Unternehmer). Unter 3.000 € nach Einkommen: 2.000 € Starthilfe plus Rachekarte. Popularität ≥80 gibt +1 Einfluss, <20 kostet 1 Einfluss am Rundenende. Einfluss wird auf 0–20 begrenzt. Geheimnis: Auslandskonto +10.000 € verborgen; Schuldner +8.000 € Schulden; falsche Identität hat eine andere geheime Spezialaktion; Korruption belohnt Bestechung; Informant erfährt ein Geheimnis; Rachsucht gibt zusätzliche Rachekarten bei Angriffen; Verräter bekommt bis zu 3 Endpunkte für Vertragsbruch. Öffentlich entlarvte Geheimnisse kosten ihre angezeigte Prestigestrafe.

Endpunkte: `min(15, floor(max(0, Geld + verborgen − Schulden) / 5000))` + `floor(Einfluss / 3)` + `2 × Institutionen` + `5 × erfüllte Ziele` + Prestige + bis zu 3 tatsächlich umgeleitete Stimmen + Verräterbonus. Gleichstand: Nettovermögen, dann ID. Lügen beim Schwur werden spätestens bei Spielende aufgedeckt und kosten 5 Einfluss.

## Speicherung / Technik

Serverzustand wird automatisch nach `data/rooms.json` geschrieben, einschließlich geheimer Informationen und Zugangstoken. Ordner privat halten und nicht veröffentlichen. Serverneustarts laden die Räume und geben einer laufenden Phase 30 Sekunden. Räume ohne Verbindung werden nach sieben Tagen entfernt. Browser-Zugang und Statistiken bleiben im lokalen Browser gespeichert; es gibt keine Cloud-Profile, Konten, Matchmaking, Shops, Zahlungsintegration, Bild-Uploads, integrierte Videoanrufe oder native Store-Apps.

Der Server läuft mit Node `http`, die Echtzeitverbindung mit Server-Sent Events. Alle Spielaktionen werden serverseitig geprüft. Das Tresor-Minispiel verwendet eine im Client sichtbare Sequenz; es ist ein Partyspiel, keine manipulationssichere Wettspielplattform.

Optional:

```bash
PORT=4000 npm start
DATA_DIR=/absoluter/pfad/spielstand npm start
npm test
```

## Prüfung

Automatisierte Tests: Geheimhaltung von Nachrichten/Zielen/Token, Vertragszahlungen/-bruch, Regeln für Schutz und Rache, verbotene Aktionen, Schulden, Schwüre, alle Ereignisse mit 2 und 15 Spielern, vollständige Bot-Partie, HTTP-Authentifizierung und Serverneustart sowie Ausführung der Client-Ansichtsvorlagen in allen drei Sprachen. Der letzte Test prüft HTML-Erzeugung, keinen echten Browser. Ein visueller Browser-Sichttest konnte in der Erstellungsumgebung nicht durchgeführt werden, weil Browserinstallation/Download nicht verfügbar war. Spielbalance und tatsächlicher Gruppenspaß müssen in echten Spielrunden erprobt werden.

Quellcode: `server/engine.js`, `server/index.js`, `public/content.js`, `public/i18n.js`, `public/app.js`, `public/styles.css`. Keine Remote-Schriftarten, externen Assets oder Tracking-Dienste.
