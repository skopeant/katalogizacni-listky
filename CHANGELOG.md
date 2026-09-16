## 2.2.2

- Kept the catalog card at **120 × 75 mm**.
- Bottom-aligned subject headings within the card.
- Retained automatic two-column subject layout based on actual rendered height.
- Updated subject selection priority: use **650 + 696 with $2 psh** first; if no PSH exists, use **650 with $2 czenas**; always append **655 with $2 czenas**.
- Updated release/version information.

## 2.2.1

- Changed the application title to the bilingual form **Katalogizační lístky – Catalog Cards**.
- Standardized the print-preview window to use a CSP-safe **Print** button.

## [2.2.0] - 2026-09-09

### Added
- Full Czech and English localization of the Cloud App user interface.
- English is used as the fallback language.
- The interface follows the language of the current Alma session.

### Changed
- Removed `relevantForInst`; the Cloud App is now available to Alma institutions generally.
- Corrected the Help URL to the Catalog Cards documentation.
- Updated public documentation for institution-independent use.
- Removed the unused Spanish example translation.
- Removed the duplicated `cloudapp/src/assets/manifest.json`.
- Replaced Czech-locale-specific uppercasing with institution-neutral Unicode uppercasing.

### Notes
- Bibliographic content itself is not translated; it is taken directly from Alma records.
- The application remains read-only and does not modify Alma data.

All notable changes to this project are documented here.

## [2.1.1] - 2026-09-09

### Changed
- Added a Help link to the Cloud App manifest.

## [2.1.0] - 2026-09-09

### Changed
- Added English and Czech localized metadata for the Cloud App title, subtitle, and description.
- Standardized the application license as MIT across repository metadata.
- Changed the manifest license URL to the repository `LICENSE` file.
- Standardized the package name and package description.
- Added full English and Czech README documentation.
- Updated the package version to 2.1.0.

### Fixed
- Corrected the inconsistent `BSD-3-Clause` license value in `package.json`.

### Notes
- No functional changes were made to catalog-card generation, preview, or printing.

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
