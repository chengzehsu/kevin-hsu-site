## ADDED Requirements

### Requirement: Locale URL structure

The site SHALL serve Traditional Chinese (Taiwan) at `/` and English at `/en/` as prerendered static HTML. Each page's `<html>` element MUST carry the matching `lang` attribute (`zh-Hant-TW` or `en`) in the static markup, not only after hydration.

#### Scenario: Chinese homepage

- **WHEN** a client requests `/`
- **THEN** the response is static HTML with `<html lang="zh-Hant-TW">` and all visible copy in Traditional Chinese

#### Scenario: English page

- **WHEN** a client requests `/en/`
- **THEN** the response is static HTML with `<html lang="en">` and all visible copy in English

### Requirement: First-visit language redirect

On `/` only, before first paint, the page SHALL redirect to `/en/` (preserving any URL hash) when the stored language preference is `en`, or when no preference is stored and `navigator.language` does not start with `zh`. The English page MUST NOT redirect automatically.

#### Scenario: English browser without preference

- **WHEN** a visitor with `navigator.language` `en-US` and no stored preference opens `/#cases`
- **THEN** the browser location is replaced with `/en/#cases`

#### Scenario: Chinese browser without preference

- **WHEN** a visitor with `navigator.language` `zh-TW` and no stored preference opens `/`
- **THEN** the page stays on `/`

#### Scenario: Stored preference wins

- **WHEN** a visitor whose stored preference is `en` opens `/` with a `zh-TW` browser
- **THEN** the browser location is replaced with `/en/`

#### Scenario: English page is stable

- **WHEN** a visitor whose browser language is `zh-TW` opens `/en/`
- **THEN** the page stays on `/en/`

### Requirement: Language switch preserves anchor

The navigation SHALL contain a language switch linking to the same section in the other locale. Activating it MUST store the chosen locale as the preference and MUST navigate to the other locale's URL with the current hash retained.

#### Scenario: Switch from a section

- **WHEN** the visitor is at `/#cases` and activates the English switch
- **THEN** the browser navigates to `/en/#cases` and the stored preference becomes `en`

#### Scenario: Switch back

- **WHEN** the visitor is at `/en/#experience` and activates the Chinese switch
- **THEN** the browser navigates to `/#experience` and the stored preference becomes `zh`

### Requirement: Hreflang alternates

Both pages SHALL declare `<link rel="alternate">` entries for `zh-Hant` (pointing to `/`; Next's `Languages` type has no `zh-Hant-TW` key), `en` (pointing to `/en/`), and `x-default` (pointing to `/`), using absolute URLs built from the configured site origin.

#### Scenario: Alternates present

- **WHEN** the static HTML of `/` or `/en/` is inspected
- **THEN** it contains alternate links for `zh-Hant`, `en`, and `x-default` with the correct targets
