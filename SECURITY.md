# Security

## Supported version

Security fixes are applied to the current published release.

## Reporting a security issue

Do not post API keys, credentials, patron data, or other sensitive information
in a public GitHub issue. Report sensitive security findings privately to the
repository owner through the institutional contact channel.

## Security design

- No embedded Alma API key.
- Read-only Alma BIB API calls.
- No external data service.
- No patron data processing.
- No persistent application database.
- Popup capability is used only for the print window.
