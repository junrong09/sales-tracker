# DFS Sales Tracker Change Log

## [0.1.09] - 2019-08-19
### Added
- Add transactions filter.
- Add change log.
### Changed
- Add mock API option in hidden API selector.
### Fixed
- Fix SA name display (not rendered when bizDate of sales transactions fetched passes yesterday).
- Fix position of BETA badge.

## [0.1.08] - 2019-08-16
### Added
- Add BETA badge.
### Fixed
- Fix "null" currency in transactions table.
- Fix numpad input to support IOS browser.
- Fix unexpected date parser from Safari.

## [0.1.07] - 2019-08-15
### Changed
- Change text input to numpad input for selected text field (Specific to mobile devices).
- Add cache to feedback form. Feedback form no longer resets after user's switch tabs.
- Restrict transactions rendered to users by permitting only data ranged between today and yesterday.

## [0.1.06] - 2019-08-12
### Added
- Add Feedback Tab.
- Link Feedback to Google Sheet API.
### Removed
- Drop down menu for SA store selection.

## [0.1.05] - 2019-08-02
### Added
- Add currency locality.
- Add drop down menu for SA store selection.
- Add API selector with cache to facilitate testing.
- Add PWA icon for IOS.
- Configure PWA settings
### Changed
- Replace item-view of transactions from table-based to fat-cell detail view.
### Fixed
- Fix transactions table sort (replace string sort to number sort).

## [0.1.04] - 2019-07-16
### Added
- Add date switcher for target setter.
### Fixed
- Fix boundary data cases (such as empty transactions).
- Update JSON parser to match transactions and target API.

## [0.1.03] - 2019-07-06
### Added
- Add toast to display user messages.
- Add expanded item-view for transactions.

## [0.1.02] - 2019-06-25
### Added
- Add sales history table tab.
- Add aggregate view.
- Add target setter.

## [0.1.01] - 2019-06-21
### Added
- Add login page
- Add sales vs target chart
- Add fetch connection 