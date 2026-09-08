# Technical overview

## Runtime

The application runs as an Ex Libris Alma Cloud App and uses
`CloudAppRestService` for authenticated REST requests in the current Alma user context.

## Input

One or more local MMS IDs supplied by the staff user.

## API

```text
GET /almaws/v1/bibs/{mms_id}
```

## Output

HTML catalog-card preview and a separate browser print document.

## Side effects

None in Alma. The application is read-only.

## Network boundary

Alma Cloud App runtime only; no third-party API calls.

## Persistence

None.
