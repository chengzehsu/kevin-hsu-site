## Purpose

Lets a recruiter who opens a tracked link see copy tuned to their role. The site resolves the link's code to a variant and overlays a fixed set of emphasis fields on the shared main copy, falling back to the main copy whenever anything is missing.

## ADDED Requirements

### Requirement: Code resolution

The site SHALL resolve a visitor's tracking code from, in order, the `s` query parameter, the `utm_source` query parameter, and the code saved earlier in the same tab session, SHALL accept only codes matching `^[a-z0-9][a-z0-9_-]{0,39}$`, and SHALL NOT resolve a code whose first segment (before `-`) is a share channel in `lib/share-channels.json`, because such links are channel traffic, not a company's link.

#### Scenario: Short link on first page

- **WHEN** a visitor opens `/resume/?s=acme`
- **THEN** the resolved code is `acme` and it is saved for the tab session

#### Scenario: Later page in the same visit

- **WHEN** the same visitor navigates to `/portfolio/` without any query string
- **THEN** the resolved code is still `acme`

##### Example: resolution order

| URL query                            | Session code | Resolved       |
| ------------------------------------ | ------------ | -------------- |
| `?s=acme`                            | none         | `acme`         |
| `?utm_source=acme&utm_medium=direct` | none         | `acme`         |
| none                                 | `acme`       | `acme`         |
| `?s=ACME PM`                         | none         | none (invalid) |
| `?s=beta`                            | `acme`       | `beta`         |
| `?s=line`                            | none         | none (channel) |
| `?utm_source=line-pm`                | none         | none (channel) |
| `?s=threads-launch`                  | `acme`       | none (channel) |
| `?s=linecorp`                        | none         | `linecorp`     |

### Requirement: Overlay application

When a resolved code maps to an application bound to a variant, the site SHALL replace only the overridable fields present in that variant's overlay for the active locale, and SHALL keep the main copy for every other field.

#### Scenario: Partial overlay

- **WHEN** the variant's `zh` overlay sets only `resume.summary` and `skills.order`
- **THEN** the résumé summary and featured skill order change, and the headline, keywords, bullets, and case order stay identical to the main site

#### Scenario: Locale without overlay

- **WHEN** the variant has a `zh` overlay but an empty `en` overlay and the visitor is on `/en/resume/`
- **THEN** the English page shows the main English copy

##### Example: bullet selection

- **GIVEN** experience `ecofirst` has main bullets `[b0, b1, b2, b3]`
- **WHEN** the overlay sets `experience.ecofirst.bullets` to `{ "pick": [1, 0], "extra": "X" }`
- **THEN** the rendered bullets are `[b1, b0, X]`

### Requirement: Invalid overlay data is ignored per field

The site MUST ignore any overlay key it does not know, any value of the wrong type, any bullet index outside the main bullets, and any id in an order list that does not exist, without throwing and without affecting other fields.

#### Scenario: Unknown and malformed keys

- **WHEN** the overlay contains `hero.subtitle` (unknown), `resume.summary: 42` (wrong type), and `cases.order: ["cdp", "ghost", "grocery"]`
- **THEN** `hero.subtitle` and `resume.summary` are ignored, and the cases render in the order `cdp`, `grocery`, followed by the remaining main-order cases

### Requirement: Safe fallback without visible swap

For visitors with a resolved code, the site SHALL hide overridable fields without changing layout until the overlay is applied, fails, or 1,200 ms pass, and SHALL then show either the overlay or the main copy. Visitors without a code SHALL NOT have any field hidden and SHALL NOT trigger any request to the backend.

#### Scenario: Backend unavailable

- **WHEN** a visitor opens `/resume/?s=acme` and the backend does not answer within 1,200 ms
- **THEN** the main copy is shown and the page remains fully usable

#### Scenario: Visitor without a code

- **WHEN** a visitor opens `/resume/` with no code in the URL or session
- **THEN** no request is sent to the backend origin and no field is hidden

### Requirement: Public variant endpoint exposes copy only

The backend SHALL serve `GET /api/variant/{code}` returning only the bound variant's `zh` and `en` overlays, and MUST NOT return company, role, requirements, notes, status, files, or record ids. It SHALL return 404 for unknown codes and for applications without a variant.

#### Scenario: Known code

- **WHEN** the endpoint is called with a code bound to a variant
- **THEN** the response body has exactly the keys `zh` and `en`

#### Scenario: Unknown code

- **WHEN** the endpoint is called with a code that matches no application
- **THEN** it responds 404

### Requirement: Owner preview

The site SHALL apply the variant named by `?preview=<variantId>` only when the browser holds a valid owner session, and SHALL ignore the parameter otherwise.

#### Scenario: Anonymous preview attempt

- **WHEN** a visitor without an owner session opens `/resume/?preview=abc123`
- **THEN** the main copy is shown
