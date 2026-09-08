# Ex Libris App Center submission

## Before opening the App Center form

- [ ] Public GitHub repository exists.
- [ ] `eca build` succeeds.
- [ ] GitHub release `v1.0.0` exists.
- [ ] Repository contains `LICENSE`.
- [ ] Repository contains `README.md`.
- [ ] `config.json` is not present in GitHub.
- [ ] Manifest contains the required popup permissions.
- [ ] Manifest contains `relevantForInst: ["420CARDS_CVUT"]`.

## App Center fields – prepared text

### App name

```text
Katalogizační lístky
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

Replace the placeholder with the final public repository URL:

```text
https://github.com/<GITHUB-USER>/katalogizacni-listky
```

### Short description

```text
Creates printable catalog cards in Alma from local MMS IDs.
```

### App description – English

```text
Katalogizační lístky is an Ex Libris Alma Cloud App for creating and printing
catalog cards from local MMS IDs. A user can enter one or more MMS IDs; the app
retrieves the corresponding bibliographic records using the Alma Cloud App REST
service, formats selected MARC21 fields, and generates a print layout with three
cards per A4 page.

The application is read-only. It does not update Alma records, does not embed an
Alma API key, does not use an external database, and does not send bibliographic
data to third-party services.

The app requires an authenticated Alma staff user with permission to read
bibliographic records. The exact role may depend on the institution's role
configuration.

The manifest restricts availability to institution 420CARDS_CVUT.
```

### App description – Czech

```text
Cloud App pro Ex Libris Alma vytváří a tiskne katalogizační lístky podle lokálních
MMS ID. Z bibliografického MARC21 záznamu sestaví autor, bibliografický popis,
věcná hesla a formu/žánr a připraví tři lístky na jednu stránku A4.

Aplikace je pouze čtecí, neobsahuje API klíč a v Almě žádná data nemění.
Vyžaduje přihlášeného zaměstnance Almy s oprávněním číst bibliografické záznamy.
```

## Submission path

On the Ex Libris Developer Network:

1. Sign in.
2. Open **My Apps**.
3. Choose **Create new app**.
4. Select **Cloud App** as the app type.
5. Enter the public GitHub repository URL in **App homepage**.
6. Paste the prepared description above.
7. Publish/submit the app for manual review.

The Ex Libris team may request changes before publication.

## Institution restriction

The source repository is public, but `relevantForInst` causes the installed Cloud App
to be shown only to the listed institution in Alma.
