## Purpose

Shows, inside the admin, whether each company opened its tracked link, using Umami data fetched through the backend so the Umami API key never reaches a browser.

## ADDED Requirements

### Requirement: Owner-only stats proxy
The backend SHALL serve `GET /api/stats?codes=<comma-separated codes>` to authenticated owners only, returning for each requested code its page views, visits, and last-seen time over the last 180 days, using the Umami API key from the backend environment.

#### Scenario: Anonymous request
- **WHEN** the stats endpoint is called without an owner token
- **THEN** it responds 401 and makes no Umami request

#### Scenario: Code never opened
- **WHEN** stats are requested for a code with no Umami traffic
- **THEN** its entry has `views: 0`, `visits: 0`, and `lastSeen: null`

### Requirement: Key stays on the server
The Umami API key MUST NOT appear in any site build output or response body.

#### Scenario: Build output scan
- **WHEN** the static export is searched for the key value
- **THEN** no file contains it

### Requirement: Degraded display
When Umami cannot be reached, the stats endpoint SHALL respond 503, and the admin SHALL show 「無法取得」 in place of the numbers while every other admin function keeps working.

#### Scenario: Umami outage
- **WHEN** Umami returns an error
- **THEN** the applications list still loads and each open-count cell reads 「無法取得」

### Requirement: Cached lookups
The backend SHALL cache each code's stats for 5 minutes so that reloading the admin does not repeat Umami requests within that window.

#### Scenario: Reload within five minutes
- **WHEN** the admin requests stats for the same codes twice within 5 minutes
- **THEN** Umami is called only for the first request
