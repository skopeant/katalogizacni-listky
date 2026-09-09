# Release checklist

## Source
- [ ] Confirm `manifest.json` contains no `relevantForInst`.
- [ ] Confirm Help points to the Catalog Cards documentation.
- [ ] Confirm KL icon is displayed.
- [ ] Confirm `.gitignore` excludes `config.json`, build output and generated manifest copies.
- [ ] Confirm `cloudapp/src/i18n/cs.json` and `en.json` are present.
- [ ] Confirm there are no API keys or credentials in tracked files.

## Build
- [ ] Run `eca build`.
- [ ] Build completes with no errors.
- [ ] Run `eca start`.
- [ ] Smoke-test Czech Alma session.
- [ ] Smoke-test English Alma session.
- [ ] Smoke-test one MMS ID.
- [ ] Smoke-test three MMS IDs.
- [ ] Verify print preview.

## GitHub
- [ ] Public repository is current.
- [ ] `config.json`, `build/`, `.ng/` and `node_modules/` are NOT committed.
- [ ] MIT `LICENSE` is present.
- [ ] Release tag `v2.2.0` is created.

## Ex Libris
- [ ] GitHub Release `v2.2.0` is published.
- [ ] Release webhook returns HTTP 200.
- [ ] Version and localized title are verified in Alma Cloud App Center.
