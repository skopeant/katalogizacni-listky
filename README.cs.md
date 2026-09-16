# Katalogizační lístky – Catalog Cards

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

2.2.2




### Rozměr katalogizačního lístku

Tištěný katalogizační lístek má pevný rozměr **120 × 75 mm**. Hesla se nejprve vykreslí v jednom sloupci. Pokud jejich skutečná vykreslená výška přesáhne dostupný prostor, tiskový náhled automaticky přepne blok hesel do dvou sloupců. Pokud nestačí ani dva sloupce, mírně se zmenší pouze text hesel.


### Výběr předmětových hesel

Předmětová hesla se vybírají v tomto pořadí:

1. Primárně se vezmou **všechna pole 650 a všechna pole 696 s $2 psh**.
2. Pouze pokud není žádné PSH ani v 650, ani v 696, použije se **650 s $2 czenas**.
3. Nakonec se vždy přidají **655 s $2 czenas**.

Pro tisk se bere hodnota z podpole **$a**.


### Verze 2.2.2

- Katalogizační lístek má nadále pevný rozměr **120 × 75 mm**.
- Předmětová hesla jsou zarovnána ke spodnímu okraji lístku.
- Pokud se podle skutečné vykreslené výšky nevejdou, automaticky se přepnou do dvou sloupců; při nutnosti se mírně zmenší pouze text hesel.
- Přednostně se používají **650 a 696 s $2 psh**; pokud žádné PSH není, použije se **650 s $2 czenas**; **655 s $2 czenas** se vždy přidá.
