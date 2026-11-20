# Ibolya Könyvelés – statikus weboldal

Vite + React + TypeScript alapú, teljes egészében magyar nyelvű, statikus könyvelési és ügyviteli weboldal. A felület saját CSS-t használ, fizetős sablon vagy kötelező külső API nélkül.

## Helyi futtatás

Szükséges: Node.js 20 vagy újabb.

```bash
npm install
npm run dev
```

Ezután nyisd meg a terminálban megjelenő helyi címet. Éles build készítése:

```bash
npm run build
npm run preview
```

A build kimenete a `dist/` mappába kerül.

Fontos: az `index.html` fájlt ne a VS Code Live Serverrel nyisd meg. A `.tsx` forrásfájlokat a Vite fordítja le, ezért a működő fejlesztői cím a `npm run dev` parancs után megjelenő, általában `http://localhost:5173/` cím.

## Oldalak

- `/` – Főoldal
- `/rolam` – Rólam
- `/szolgaltatasok` – Szolgáltatások
- `/informaciok` – Hasznos információk
- `/kapcsolat` – Kapcsolat

A navigáció egyszerű kliensoldali útvonalválasztást használ, a `public/_redirects` fájl pedig Cloudflare Pages alatt biztosítja, hogy a közvetlenül megnyitott aloldalak is az alkalmazásba érkezzenek.

## Cloudflare Pages – ingyenes közzététel

GitHub/GitLab repository összekötése után a Cloudflare Pages projektben állítsd be:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** 20 vagy újabb

A projekt nem használ szerveroldali hátteret, adatbázist vagy fizetős szolgáltatást. A kapcsolatfelvételi űrlap jelenleg statikus bemutató űrlap: a valódi küldéshez egy ügyfél által kiválasztott e-mailes vagy ingyenes űrlap-megoldást kell beállítani.

## Tartalmi adatstruktúra

A szolgáltatások és a navigáció a `src/data.ts` fájlban találhatók. A felület több helyen szándékosan helyőrzőt használ, így kitalált szakmai adat vagy jogszabályi állítás nem került az oldalra.

## Még szükséges ügyféladatok

- Végleges név és bemutatkozó szöveg
- Telefonszám
- E-mail-cím
- Település vagy megjelenítendő cím
- A pontosan vállalt szolgáltatási kör, különösen az egyéni vállalkozói körön túli feladatoknál
- Végzettségek, szakmai jogosultságok vagy tapasztalati adatok, ha ezeket meg szeretnéd jeleníteni
- Kapcsolatfelvételi űrlap tényleges címzettje és küldési módja
- Adatkezelési tájékoztató és annak végleges linkje
- Opcionális profilfotó vagy saját, jogtisztán használható képi anyag
