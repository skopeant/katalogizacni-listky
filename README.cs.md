# Katalogizační lístky

[English](README.md) | [Česky](README.cs.md)

Katalogizační lístky jsou Cloud App pro Ex Libris Alma, která vytváří a tiskne katalogizační lístky z bibliografických záznamů Almy podle lokálních MMS ID.

Aplikace je v současnosti omezena na České vysoké učení technické v Praze.

## Funkce

- zadání jednoho nebo více lokálních Alma MMS ID
- načtení bibliografických záznamů prostřednictvím REST služby Alma Cloud Apps
- vytvoření formátovaných katalogizačních lístků z vybraných polí MARC21
- náhled katalogizačních lístků před tiskem
- tisk tří katalogizačních lístků na jednu stránku A4
- pouze čtení dat — aplikace data v Almě nemění
- aplikace neobsahuje vlastní Alma API klíč
- bibliografická data nejsou odesílána externím službám

## Použitá pole MARC21

Aplikace používá následující pole MARC21:

- `100` — autor; pokud chybí, použije se autor vrácený Alma BIB API
- `245` — název a údaj o odpovědnosti
- `250` — vydání
- `264` / `260` — nakladatelské údaje
- `300` — fyzický popis
- `650 $a` — věcná hesla; přednostně pole s `$2 czenas`
- poslední relevantní `655 $a` — označení formy/žánru v horní části lístku
- lokální MMS ID — vytištěno v horní části lístku

## Požadavky

- Ex Libris Alma s podporou Cloud Apps
- přihlášený uživatel Almy s oprávněním číst bibliografické záznamy

Konkrétní požadovaná role Almy může záviset na nastavení instituce.

## Bezpečnost a práce s daty

Aplikace je read-only. Nepoužívá vlastní Alma API klíč, nemění záznamy v Almě, neuchovává bibliografická data mimo aktuální relaci prohlížeče a neposílá bibliografická data žádné třetí straně.

Tisk probíhá v novém okně prohlížeče. Manifest Cloud App proto povoluje `popups` a `popups-to-escape-sandbox`.

Další informace:

- [Security Policy](SECURITY.md)
- [Privacy and Data Handling](PRIVACY.md)

## Omezení na instituci

Manifest obsahuje:

```json
"relevantForInst": [
  "420CARDS_CVUT"
]
```

Cloud App je proto v Almě dostupná pouze Českému vysokému učení technickému v Praze, zatímco zdrojový repozitář zůstává veřejný kvůli publikačnímu procesu Ex Libris.

## Lokální vývoj

Po naklonování repozitáře:

```text
eca init
eca start
```

Při `eca init` se vytvoří lokální `config.json` s URL Alma prostředí. `config.json` je ignorován Gitem a nesmí být commitován.

## Build

Před vytvořením nové verze:

```text
eca build
```

Produkční build musí proběhnout bez chyb před vytvořením GitHub Release.

## Autor

Antonín Skopec

## Licence

MIT License. Viz [LICENSE](LICENSE).
