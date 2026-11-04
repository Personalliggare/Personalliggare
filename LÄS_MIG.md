# Personalliggare – installera appen (offline)

Appen läser gruppens Excel-fil direkt i telefonen. Den skickar ingenting över internet och har ingen server. Säkerhetsregeln i `index.html` (Content-Security-Policy, `connect-src 'none'`) gör att webbläsaren vägrar låta sidan skicka data någonstans.

## Lägg upp appen på GitHub Pages (en gång)

1. Skapa ett gratis konto på github.com och slå på **tvåstegsverifiering** (Settings → Password and authentication).
2. Klicka **New repository** och döp det till t.ex. `personalliggare`. Välj **Public**. Appen innehåller inga personuppgifter.
3. Klicka **uploading an existing file** och dra in alla filer från den här mappen: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`. Klicka **Commit changes**.
4. Gå till **Settings → Pages**. Under *Branch* väljer du `main` och `/ (root)` och klickar **Save**.
5. Efter någon minut ligger appen på `https://DITTNAMN.github.io/personalliggare/`.

## Installera på telefonen

- **iPhone:** öppna adressen i **Safari** → Dela-knappen → **Lägg till på hemskärmen**.
- **Android:** öppna adressen i **Chrome** → menyn ⋮ → **Installera app** (eller Lägg till på startskärmen).

Öppna appen från ikonen en gång medan du har nät. Efter det fungerar den även i flygplansläge.

## Uppdatera appen

Ladda upp de nya filerna till samma repository och skriv över de gamla. Telefonerna hämtar uppdateringen nästa gång de har nät och appen öppnas.

## Bra att veta

- Uppgifterna sparas krypterat (AES-256) på telefonen med PIN-koden. Glömmer man PIN-koden raderar man bara sparad data och öppnar Excel-filen igen.
- Appen låser sig själv efter några minuter utan aktivitet, och när den har legat i bakgrunden i mer än en minut.
- **Spara & dela** gör en ny Excel-fil i samma format. Dela den i Signal-gruppen. Den fungerar som vanligt i Excel.
- Kolla med förbandets informationssäkerhetsansvarige innan appen sprids i gruppen.
