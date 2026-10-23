## Purpose

Adds the Ecofirst collection-monitoring back office as a fifth work case, written as an illustrated article with real, anonymised screens, so readers see how Kevin maps a field process, defines the data, proves or disproves his own assumptions, and keeps AI-built software under control.

## ADDED Requirements

### Requirement: Fifth work case page in both locales

The site SHALL generate `/cases/internal-backend/` and `/en/cases/internal-backend/`. Visitor-facing copy MUST call the product 「內部後台」 / "internal back office" and MUST NOT contain "point table", 「點位表管理」, or any customer or site name.

#### Scenario: Pages exist

- **WHEN** the static export completes
- **THEN** both case pages exist and contain the title 「內部後台：一眼看出問題在哪」 or its en counterpart

#### Scenario: Product name hygiene

- **WHEN** the two case pages are searched for "point table" and 「點位表管理」
- **THEN** no match is found

### Requirement: Article sections with figures

A case with an `article` field SHALL render a lead, then sections in order, each with a trait label, a heading, paragraphs, and an optional figure with caption, then a closing line; cases without `article` MUST render exactly as before. The internal back office article MUST contain four figures covering the overview, a site's collection health, the rule editor, and a time series, each tied to one decision in its section.

#### Scenario: Existing cases unchanged

- **WHEN** a case without `article` is rendered
- **THEN** its page markup matches the layout used before this change

#### Scenario: Four figures with captions

- **WHEN** `/cases/internal-backend/` is rendered
- **THEN** it contains four figure elements, each with an image that exists in the build output and a caption

### Requirement: Shared images, captions in content

Figure images SHALL contain no burned-in explanatory text added by Kevin; captions and alt text SHALL come from the locale content so zh and en reuse the same image files.

#### Scenario: Same image in both locales

- **WHEN** the zh and en case pages are compared
- **THEN** each figure points to the same image path and differs only in caption and alt text

### Requirement: Screens are anonymised

Every published figure MUST show customer sites only as code names (「案場 NN」 or `site-NN`) and MUST NOT include the war-room demo page. Each figure SHALL be inspected after export for real names and for interface words altered by the mask.

#### Scenario: Leak inspection

- **WHEN** a reviewer views each exported figure at full size
- **THEN** no customer, building, or company name is legible and interface labels read correctly

### Requirement: Honest article claims

The article MUST state proposal-to-archive time (about 27 hours) rather than time to production, MUST describe the 21 incident-derived checks as run by hand, MUST attribute rejected designs to Kevin's own trials unless a ticket shows a colleague's request, and MUST date the site count as 34 sites in 2026/10.

#### Scenario: Timing wording

- **WHEN** the article is searched for 「27 小時」
- **THEN** the surrounding sentence refers to proposal and archive, not 上線

### Requirement: Inventory and ordering include five work cases

The case inventory SHALL read 「5 個工作案例＋2 個個人專案」 / "5 work cases + 2 side projects" everywhere it appears. The home shelf, `/portfolio/`, the résumé, and the admin case list SHALL include the new case in rank order, and the home shelf SHALL show five text-free posters.

#### Scenario: Home shelf

- **WHEN** the site output test counts posters on `/` and `/en/`
- **THEN** it finds five work-case posters and the inventory line reads 5＋2

##### Example: Rank order

| Case             | Rank |
| ---------------- | ---- |
| internal-backend | 1    |
| grocery          | 2    |
| ecofirst         | 3    |
| health-app       | 4    |
| cdp              | 5    |
