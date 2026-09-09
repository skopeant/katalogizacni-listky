# Test Plan and Test Record

## Release candidate

Version: `v2.2.0`

## Required tests

- [ ] `eca build` completes without errors.
- [ ] Cloud App starts in the Alma development environment.
- [ ] Czech session displays Czech UI labels.
- [ ] English session displays English UI labels.
- [ ] App Center title follows the current Alma language after reload.
- [ ] Single valid MMS ID loads a BIB record.
- [ ] Multiple MMS IDs can be entered.
- [ ] Invalid MMS ID validation is localized.
- [ ] Missing MARC 100 uses the Alma API author fallback.
- [ ] 245 / 250 / 260 or 264 / 300 are combined into the bibliographic description.
- [ ] `650 $2 czenas` headings are preferred when present.
- [ ] Records without `czenas` headings still use available 650/655 fields.
- [ ] Print window opens.
- [ ] Three cards are laid out per A4 page.
- [ ] No Alma record is modified during testing.
