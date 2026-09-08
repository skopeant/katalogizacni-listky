# Release checklist

## Source
- [ ] Copy this preparation package over the tested project.
- [ ] Confirm Czech text in `manifest.json` is correct.
- [ ] Confirm KL icon is displayed.
- [ ] Confirm `.gitignore` excludes `config.json`.
- [ ] Confirm there are no API keys or credentials in tracked files.

## Build
- [ ] Run `eca build`.
- [ ] Build completes with no errors.
- [ ] Run `eca start` after the final manifest change.
- [ ] Smoke-test one MMS ID.
- [ ] Smoke-test three MMS IDs.
- [ ] Verify print preview.

## GitHub
- [ ] Public repository created.
- [ ] Entire Cloud App project committed, including `package.json` and `package-lock.json`.
- [ ] `config.json` is NOT committed.
- [ ] BSD-3-Clause `LICENSE` present.
- [ ] Release tag `v1.0.0` created.

## Ex Libris
- [ ] App Center entry created as type `Cloud App`.
- [ ] App homepage points to the public GitHub repository.
- [ ] Description includes required Alma access/role information.
- [ ] App submitted for manual review.
