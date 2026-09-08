# Changelog

All notable changes to this project are documented here.

## [1.0.0] - 2026-09-08

### Added
- Input of one or more local Alma MMS IDs.
- Read-only retrieval of BIB records through CloudAppRestService.
- MARC21 processing for fields 100, 245, 250, 260/264, 300, 650 and 655.
- Fallback to the Alma API author value when MARC field 100 is absent.
- Preference for Czech subject headings identified by `$2 czenas`.
- Catalog card preview inside the Cloud App.
- Print layout with three catalog cards per A4 page.
- Print popup permissions in the Cloud App manifest.
- Institution restriction to `420CARDS_CVUT`.
- Custom KL application icon.

### Tested
- Verified with real Alma bibliographic records.
- Verified with a non-administrator librarian account.
- Verified catalog-card preview and browser print workflow.

### Repository
- Licensed under the MIT License.
