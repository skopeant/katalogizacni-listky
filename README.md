# Katalogizační lístky – Catalog Cards

[English](README.md) | [Česky](README.cs.md)

Catalog Cards is an Ex Libris Alma Cloud App that creates and prints catalog cards from Alma bibliographic records using MMS IDs.

The Cloud App is available to Alma institutions generally and is not restricted to a specific institution.

## Languages

The Cloud App user interface supports:

- English (`en`) — fallback language
- Czech (`cs`)

The application follows the language of the current Alma session. The bibliographic content itself is taken from the Alma record and is not translated.

## Features

- Enter one or more Alma MMS IDs
- Retrieve bibliographic records through the Alma Cloud App REST service
- Generate formatted catalog cards from selected MARC21 fields
- Preview catalog cards before printing
- Print three catalog cards per A4 page
- Read-only operation — no Alma data is modified
- No embedded Alma API key
- No bibliographic data is transmitted to external services

## MARC21 fields

The application uses the following MARC21 fields:

- `100` — author; if unavailable, the author returned by the Alma BIB API is used
- `245` — title and statement of responsibility
- `250` — edition
- `264` / `260` — publication information
- `300` — physical description
- `650 $a` — subject headings; headings with `$2 czenas` are preferred when present
- last relevant `655 $a` — form/genre displayed at the top of the card
- local MMS ID — displayed at the top of the card

If no `$2 czenas` fields are present, the application falls back to the available `650` / `655` fields.

## Requirements

- Ex Libris Alma with Cloud Apps support
- An authenticated Alma user with permission to read bibliographic records

The exact Alma role required may depend on the institution's role configuration.

## Security and data handling

The application is read-only. It does not use its own Alma API key, does not modify Alma records, does not persist bibliographic data outside the current browser session, and does not send bibliographic data to third-party services.

Printing is performed in a browser window. The Cloud App manifest therefore enables `popups` and `popups-to-escape-sandbox`.

See also:

- [Security Policy](SECURITY.md)
- [Privacy and Data Handling](PRIVACY.md)

## Availability

The manifest does not contain `relevantForInst`, so the Cloud App can be discovered and installed by Alma institutions generally.

## Help

https://skopec.vosis.cz/alma/cloudapp/katalogizacni-listky/

## Local development

After cloning the repository:

```text
eca init
eca start
```

During `eca init`, a local `config.json` containing the Alma environment URL is created. `config.json` is ignored by Git and must not be committed.

## Build

Before creating a release:

```text
eca build
```

The production build must complete successfully before a GitHub Release is created.

## Author

Antonín Skopec

## License

MIT License. See [LICENSE](LICENSE).

## Version

2.2.2




### Catalog card layout

Printed catalog cards use a fixed size of **120 × 75 mm**. Subject headings are first rendered in one column. If their real rendered height exceeds the available subject area, the print preview automatically switches that subject block to two columns. If two columns are still too tall, only the subject text is made slightly more compact.


### Subject heading selection

Subject headings are selected in this order:

1. First use **all 650 and all 696 fields with $2 psh**.
2. Only if there are no PSH fields in either 650 or 696, use **650 with $2 czenas**.
3. Always append **655 with $2 czenas**.

The printed value is taken from subfield **$a**.


### Version 2.2.2

- Catalog card size remains fixed at **120 × 75 mm**.
- Subject headings are aligned to the bottom of the card.
- Subject headings automatically switch to two columns when their rendered height exceeds the available space; only the subject text is made slightly more compact if needed.
- Subject selection prefers **650 and 696 with $2 psh**; if no PSH headings exist, **650 with $2 czenas** is used; **655 with $2 czenas** is always appended.
