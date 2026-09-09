# Ex Libris App Center / public release notes

## Current release

Version: `v2.2.0`

## Current state

- Public GitHub repository
- MIT License
- Czech and English user interface
- English fallback
- No `relevantForInst` restriction
- External Help page:
  `https://skopec.vosis.cz/alma/cloudapp/katalogizacni-listky/`
- Read-only access to Alma bibliographic records
- No embedded Alma API key

## App Center fields

### App name

```text
Catalog Cards
```

### Product

```text
Alma
```

### App type

```text
Cloud App
```

### App homepage

```text
https://github.com/skopeant/katalogizacni-listky
```

### Description

```text
Catalog Cards is an Ex Libris Alma Cloud App for creating and printing catalog
cards from Alma bibliographic records using MMS IDs. The user interface supports
English and Czech and follows the language of the Alma session.

The application is read-only. It does not update Alma records, does not embed an
Alma API key, does not use an external database, and does not send bibliographic
data to third-party services.

The app requires an authenticated Alma staff user with permission to read
bibliographic records. The exact role may depend on the institution's role
configuration.
```

## Release workflow

For an already published Cloud App, create a GitHub Release and use the configured
Ex Libris release webhook to request the updated build.
