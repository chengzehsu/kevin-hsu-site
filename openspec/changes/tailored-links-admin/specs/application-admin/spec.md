## Purpose

Gives Kevin one private, Chinese workspace on the site to record every application, bind it to a variant and tracking link, and edit variants against the main copy, without using the PocketBase dashboard.

## ADDED Requirements

### Requirement: Owner-only access

The admin at `/admin/` SHALL require login with an account from the `owners` auth collection, and every backend rule for `applications` and `variants` MUST allow access only to authenticated owners. The `owners` collection MUST NOT allow self-registration.

#### Scenario: Anonymous visitor

- **WHEN** someone opens `/admin/` without a session
- **THEN** only the Chinese login form is shown and no application or variant data is requested

#### Scenario: Anonymous API read

- **WHEN** an anonymous client lists `applications` or `variants` through the backend API
- **THEN** no records are returned

#### Scenario: Wrong password

- **WHEN** a login attempt uses a wrong password
- **THEN** the form shows 「帳號或密碼錯誤」

### Requirement: Admin is not discoverable

The `/admin/` page SHALL be marked `noindex`, SHALL be absent from the sitemap and site navigation, and its HTML SHALL contain no application or variant data.

#### Scenario: Crawled page

- **WHEN** the built `/admin/index.html` is inspected
- **THEN** it contains a robots `noindex` directive and no company names

### Requirement: Applications view

The admin SHALL list applications with status, company and role, applied date, bound variant, tracking code, open count, and last-open time, and SHALL support filtering by status and free-text search over company, role, requirements, and notes.

#### Scenario: Filter by status

- **WHEN** the owner selects the status 「面試中」
- **THEN** only applications with that status are listed

### Requirement: Application editing records the site version

Creating an application SHALL prefill `siteVersion` from the live site's `version.json`, and the owner SHALL be able to bind one variant, set a tracking code, upload a PDF, and save.

#### Scenario: New application

- **WHEN** the owner creates an application while the live site reports commit `5773ab9`
- **THEN** the form's site version is prefilled with `5773ab9`

### Requirement: Tracking link generation

The admin SHALL generate tracking URLs in the same shape as `pnpm utm` (origin, optional `/en`, page path, `?s=<code>`), SHALL reject codes not matching `^[a-z0-9][a-z0-9_-]{0,39}$`, SHALL refuse a code whose first segment (before `-`) is a share channel in `lib/share-channels.json`, because analytics files such a code under that channel and the site never loads a variant for it, and SHALL refuse a code already used by another application, because the backend keeps codes unique and each code resolves to exactly one variant. The backend SHALL refuse the same codes when a code is created or changed. Changing the code SHALL clear the generated URL until it is generated again, so a saved URL always carries the saved code.

#### Scenario: Duplicate code

- **WHEN** the owner enters a code already stored on another application
- **THEN** the admin refuses the code, names the application that holds it, and suggests a suffixed code such as `acme-2`

#### Scenario: Channel code

- **WHEN** the owner enters `line` or `line-pm`
- **THEN** the admin refuses the code, says it starts with a share channel's name, and suggests a code that starts with the company name

#### Scenario: Code edited after the link was generated

- **WHEN** the owner generates a link for `acme`, then changes the code to `acme-pm`
- **THEN** the generated URL is cleared, and saving stores no URL until the owner generates one for `acme-pm`

##### Example: generated URLs

| Code   | Page     | Locale  | URL                                               |
| ------ | -------- | ------- | ------------------------------------------------- |
| `acme` | 一頁履歷 | 中文    | `https://chengzeresume.zeabur.app/resume/?s=acme` |
| `acme` | 首頁     | English | `https://chengzeresume.zeabur.app/en/?s=acme`     |

### Requirement: Variant editing against the main copy

The variant editor SHALL show, for each overridable field and locale, the main copy read-only next to the override input, and SHALL treat an empty input as "use the main copy".

#### Scenario: Clearing an override

- **WHEN** the owner empties the `resume.summary` override and saves
- **THEN** the overlay no longer contains `resume.summary`

### Requirement: Sent variants are locked

The backend MUST reject updates and deletion of a variant referenced by any application whose status is not 「準備中」, responding with 「這個版本已經寄出，請複製成新版本再修改」, and the admin SHALL offer 「複製成新版本」 for such variants.

#### Scenario: Editing a sent variant

- **WHEN** the owner saves a change to a variant used by an application with status 「已投遞」
- **THEN** the save is rejected with the lock message and the stored variant is unchanged

#### Scenario: Re-binding a sent application

- **WHEN** the owner changes the variant or tracking code of an application whose stored status is not 「準備中」, or sets its status back to 「準備中」
- **THEN** the backend rejects the update and the stored application is unchanged

#### Scenario: Duplicating

- **WHEN** the owner chooses 「複製成新版本」
- **THEN** a new unlocked variant with the same overlays and the name suffixed 「（複本）」 is created

### Requirement: Number consistency warning

The variant editor SHALL warn, without blocking the save, when an override contains a numeric token that does not appear in the main copy's numeric set.

#### Scenario: Unknown number

- **WHEN** an override contains `+80%` and the main copy never contains `+80%`
- **THEN** a warning names `+80%` as not found in the main copy

### Requirement: Chinese, site-styled interface

All admin interface text SHALL be Traditional Chinese with Taiwan usage, and the admin SHALL use the site's color and type tokens in both light and dark themes.

#### Scenario: Mainland vocabulary check

- **WHEN** `bash scripts/check-copy.sh` runs over the admin source
- **THEN** it reports no mainland vocabulary
