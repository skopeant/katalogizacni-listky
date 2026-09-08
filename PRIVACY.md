# Privacy and Data Handling

## Data processed

The Cloud App processes only bibliographic record data requested by a user via
local Alma MMS ID.

## Data storage

The application does not persist bibliographic record data outside the current
browser session and does not maintain an external database.

## External services

The application does not send bibliographic data to third-party services.

## Authentication

The application uses the Ex Libris Cloud App runtime and `CloudAppRestService`.
No Alma API key is embedded in the source code.

## Patron data

The application does not request, process, store, or transmit patron/user records.

## Printing

The application opens a browser window containing the generated printable cards.
This is the reason for the `popups` and `popups-to-escape-sandbox` permissions
declared in `manifest.json`.
