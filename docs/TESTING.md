# Test Plan and Test Record

## Release candidate

Version: `v1.0.0`

## Completed manual tests

- [x] Cloud App starts in the Alma development environment.
- [x] Application is visible in the Cloud Apps panel.
- [x] Czech title and description display correctly.
- [x] Custom KL icon displays correctly.
- [x] Single valid MMS ID loads a BIB record.
- [x] Multiple MMS IDs can be entered.
- [x] Missing MARC 100 uses the Alma API author fallback.
- [x] 245 / 250 / 260 or 264 / 300 are combined into the bibliographic description.
- [x] Czech `650` headings are selected when `$2 czenas` is present.
- [x] Multiple 650 headings are displayed vertically, one per line.
- [x] 655 value and local MMS ID are displayed in the header.
- [x] Print window opens.
- [x] Three cards are laid out per A4 page.
- [x] Application was tested with a librarian account that is not an Alma administrator.
- [x] No Alma record was modified during testing.

## Required final pre-release test

Run:

```text
eca build
```

The release must not be created until the production build completes without errors.

## Recommended smoke test after Ex Libris publication

1. Install the published Cloud App in Alma.
2. Open it with a normal staff account.
3. Load one known MMS ID.
4. Load three known MMS IDs.
5. Open print preview.
6. Verify three cards fit on one A4 page.
