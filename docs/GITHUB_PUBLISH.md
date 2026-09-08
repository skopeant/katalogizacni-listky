# GitHub publication – exact preparation

The Ex Libris publication workflow builds Cloud Apps directly from a public GitHub repository.

## 1. Copy these preparation files into the real project

Copy the contents of this package into:

```text
C:\alma\katalogizacni-listky
```

Do not replace your existing `package.json` or `package-lock.json`; they were created by `eca init`
and must stay in the repository.

## 2. Check what will be public

Before the first commit, verify that `config.json` is ignored:

```text
git status
```

`config.json`, `node_modules`, `.ng`, and build output must not be committed.

## 3. Production build

```text
cd C:\alma\katalogizacni-listky
eca build
```

Fix any build error before proceeding.

## 4. Create the Git repository

Either use GitHub Desktop or command line.

Suggested repository name:

```text
katalogizacni-listky
```

Suggested repository description:

```text
Ex Libris Alma Cloud App for printing catalog cards from MMS IDs
```

The repository must be **public** for the Ex Libris Cloud App publishing workflow.

## 5. First commit

Suggested commit message:

```text
Initial release of Katalogizační lístky Cloud App
```

## 6. Create the first GitHub Release

Tag:

```text
v1.0.0
```

Release title:

```text
Katalogizační lístky v1.0.0
```

Use the text from `docs/release-notes-v1.0.0.md` as the release notes.

Do not use a `-beta` suffix for the first public Cloud App release. If the first
release is intended as beta, indicate Beta in the manifest title/subtitle/description
instead.

## 7. After the app is accepted

For future releases, an optional GitHub webhook can automate re-publication:

- Payload URL: `https://api01.ext.exlibrisgroup.com/cloudapps/build`
- Content type: `application/json`
- Trigger: only **Releases**

This webhook is for updates after the initial publication workflow is in place.
