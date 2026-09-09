# Catalog Cards

[English](README.md) | [Česky](README.cs.md)

Catalog Cards is an Ex Libris Alma Cloud App for creating and printing catalog cards from Alma bibliographic records using local MMS IDs.

The application is currently restricted to the Czech Technical University in Prague.

## Features

- Enter one or more local Alma MMS IDs
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
- `650 $a` — subject headings; headings with `$2 czenas` are preferred
- last relevant `655 $a` — form/genre displayed at the top of the card
- local MMS ID — displayed at the top of the card

## Requirements

- Ex Libris Alma with Cloud Apps support
- An authenticated Alma user with permission to read bibliographic records

The exact Alma role required may depend on the institution's configuration.

## Security and data handling

The application is read-only. It does not use its own Alma API key, does not modify Alma records, does not persist bibliographic data outside the current browser session, and does not send bibliographic data to third-party services.

Printing is performed in a browser window. The Cloud App manifest therefore enables `popups` and `popups-to-escape-sandbox`.

See also:

- [Security Policy](SECURITY.md)
- [Privacy and Data Handling](PRIVACY.md)

## Institution restriction

The manifest contains:

```json
"relevantForInst": [
  "420CARDS_CVUT"
]
```

The Cloud App is therefore available in Alma only to the Czech Technical University in Prague, while the source repository remains public for the Ex Libris publishing process.

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
