# Notes for Ex Libris manual review

## Purpose

The app reproduces an existing catalog-card workflow for Alma staff. Users enter
local MMS IDs and receive printable catalog cards.

## Alma access

The app calls only:

```text
GET /almaws/v1/bibs/{mms_id}
```

through `CloudAppRestService`.

It does not call POST, PUT, or DELETE endpoints.

## Credentials

No API key, password, token, or institutional credential is stored in the project.

## External connectivity

No third-party network service is used.

## Content Security permissions

The manifest requests:

```json
"contentSecurity": {
  "sandbox": {
    "popups": true,
    "popups-to-escape-sandbox": true
  }
}
```

These permissions are required solely for opening the browser print window.

## Bibliographic processing

The app uses:
- MARC 100 for author, with Alma API author fallback
- 245, 250, 260/264 and 300 for the description
- 650 `$a`, preferring `$2 czenas`, for subject headings
- the last relevant 655 `$a` for form/genre
- the local MMS ID entered by the staff user

## Data retention

No record data is retained after the browser session and no external database exists.

## Testing

The workflow was manually tested against real Alma records and with a non-administrator
librarian account before the `v1.0.0` release candidate was prepared.
