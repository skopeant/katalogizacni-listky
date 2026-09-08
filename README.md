# Katalogizační lístky

Cloud App pro Ex Libris Alma, která vytváří tiskové katalogizační lístky podle lokálních MMS ID.

## Co aplikace dělá

Uživatel zadá jedno nebo více MMS ID. Cloud App načte bibliografické záznamy z Almy
pomocí read-only REST volání a připraví náhled a tisk katalogizačních lístků.

Na jednu stránku A4 se tisknou tři lístky.

### Použitá MARC pole

- `100` – autor; pokud chybí, použije se autor vrácený Alma BIB API
- `245` – název a údaj o odpovědnosti
- `250` – vydání
- `264` / `260` – nakladatelské údaje
- `300` – fyzický popis
- `650 $a` – věcná hesla; přednostně pole s `$2 czenas`
- poslední relevantní `655 $a` – označení formy/žánru v horní části lístku
- lokální MMS ID – vytištěno v horní části lístku

## Bezpečnost a data

Aplikace je read-only. Nepoužívá vlastní API klíč, neukládá data mimo Almu
a neposílá bibliografická data žádné třetí straně. Tisk používá pouze nové okno
prohlížeče, proto manifest povoluje `popups` a `popups-to-escape-sandbox`.

Aplikace vyžaduje přihlášeného uživatele Almy s oprávněním číst bibliografické záznamy.
Konkrétní role může záviset na nastavení instituce.

## Omezení na instituci

Manifest obsahuje:

```json
"relevantForInst": ["420CARDS_CVUT"]
```

Po publikaci tedy bude Cloud App v Almě dostupná pouze této instituci, i když
zdrojový GitHub repozitář musí být pro publikační proces Ex Libris veřejný.

## Lokální vývoj

Po naklonování repozitáře:

```text
eca init
eca start
```

Při `eca init` se doplní lokální `config.json` s URL vaší Alma instance.
`config.json` je v `.gitignore` a nemá být publikován.

## Kontrola před vydáním

```text
eca build
```

Produkční build musí proběhnout bez chyb před vytvořením GitHub Release.

## Licence

MIT License. Viz [LICENSE](LICENSE).

---

# English summary

**Katalogizační lístky** is an institution-restricted Ex Libris Alma Cloud App
for creating printable catalog cards from local MMS IDs.

The app reads Alma bibliographic records, formats selected MARC21 fields, and
prints three cards per A4 page. It is read-only, uses no embedded API key,
does not modify Alma data, and does not transmit bibliographic data to external
services.

It requires an Alma user with permission to read bibliographic records.
