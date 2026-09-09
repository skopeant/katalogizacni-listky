# Katalogizační lístky

[English](README.md) | [Česky](README.cs.md)

Katalogizační lístky jsou Cloud App pro Ex Libris Alma, která vytváří a tiskne katalogizační lístky z bibliografických záznamů Almy podle MMS ID.

Cloud App je dostupná obecně institucím používajícím Almu a není omezena na konkrétní instituci.

## Jazyky

Uživatelské rozhraní Cloud App podporuje:

- češtinu (`cs`)
- angličtinu (`en`) — zároveň slouží jako fallback

Aplikace automaticky používá jazyk aktuální relace Almy. Bibliografický obsah se přebírá ze záznamu v Almě a nepřekládá se.

## Funkce

- zadání jednoho nebo více Alma MMS ID
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
- `650 $a` — věcná hesla; pokud existují pole s `$2 czenas`, mají přednost
- poslední relevantní `655 $a` — označení formy/žánru v horní části lístku
- lokální MMS ID — vytištěno v horní části lístku

Pokud záznam neobsahuje pole s `$2 czenas`, aplikace použije dostupná pole `650` / `655`.

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

## Dostupnost

Manifest neobsahuje `relevantForInst`, takže Cloud App mohou v App Centeru najít a nainstalovat obecně instituce používající Almu.

## Nápověda

https://skopec.vosis.cz/alma/cloudapp/katalogizacni-listky/

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

## Verze

2.2.0
