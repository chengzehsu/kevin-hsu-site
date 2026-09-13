## ADDED Requirements

### Requirement: Content parity across locales

All visible copy SHALL come from `content/zh.ts` and `content/en.ts`, both typed against a single `SiteContent` type with `satisfies`. Section components MUST NOT contain literal visible strings. A key present in one locale and missing in the other MUST fail type checking.

#### Scenario: Missing English key

- **WHEN** a field exists in `content/zh.ts` but not in `content/en.ts`
- **THEN** `tsc --noEmit` reports an error and the build fails

#### Scenario: Component literal

- **WHEN** section components are searched for visible string literals
- **THEN** none are found; every visible string is read from the content object

### Requirement: Section structure

The page SHALL render, in order, a sticky single-line navigation, a hero, an impact metrics strip, a method section, a case studies section, an experience timeline, and a contact section, with section ids `hero`, `metrics`, `method`, `cases`, `experience`, `contact`. The hero MUST contain at most four text elements (headline, subline, primary CTA, secondary CTA) and MUST fit within the initial viewport at 1280×800.

#### Scenario: Anchor navigation

- **WHEN** the visitor opens `/#cases`
- **THEN** the viewport scrolls to the section with id `cases`

#### Scenario: Hero within first viewport

- **WHEN** `/` is rendered at 1280×800
- **THEN** both hero CTAs are visible without scrolling

### Requirement: Metric traceability

Every number displayed on the page SHALL equal a value stated in Kevin's résumé or LinkedIn profile. The picking improvement MUST be rendered as the raw figures "300 → 1,000 orders/day" with "+233%" (Chinese: 「300 → 1,000 單／日（+233%）」), and MUST NOT be rendered as "×2.33" or "2.33 倍".

#### Scenario: Picking metric wording

- **WHEN** the metrics strip and the animation label are inspected in both locales
- **THEN** the picking figure reads 300 → 1,000 per day with +233%, and no "2.33" appears anywhere on the page

#### Scenario: Metric list

- **WHEN** the metrics strip is inspected
- **THEN** it shows only: 300 → 1,000 orders/day (+233%), +120% platform revenue, +66% DAU (12,000 → 20,000), NT$12M+ project portfolio, +20% site operations efficiency, 2 incubated companies

### Requirement: Copy rules

Visible copy SHALL use Taiwan Mandarin vocabulary (for example 使用者, never 用戶), SHALL contain no em-dash (—) or en-dash (–) characters, SHALL use one label for the contact intent in each locale (「聯絡我」 / "Contact me") everywhere it appears, and SHALL NOT contain more than two small-caps eyebrow labels across the whole page.

#### Scenario: Dash scan

- **WHEN** `content/`, `components/`, and `app/` are searched for `—` or `–`
- **THEN** no matches are found

#### Scenario: Vocabulary scan

- **WHEN** `content/zh.ts` is searched for 用戶
- **THEN** no matches are found

#### Scenario: Single contact label

- **WHEN** all CTA labels in one locale are listed
- **THEN** every contact-intent CTA carries the identical label

### Requirement: Placeholder for unsupplied facts

Facts not yet supplied by Kevin (知識衛星 responsibilities, the 蔬果電商 bottleneck and hypothesis sentences, contact email, LinkedIn URL, Heptabase link, headshot) SHALL be recorded as source comments beside the relevant content field. The rendered page MUST show only confirmed facts for those items and MUST NOT display placeholder text such as "coming soon" or a marker word.

#### Scenario: Unsupplied role details

- **WHEN** 知識衛星 responsibilities have not been supplied
- **THEN** the timeline entry shows company, title, and period only, with no visible placeholder text

#### Scenario: Unsupplied contact channel

- **WHEN** the LinkedIn URL has not been supplied
- **THEN** the contact section renders without a LinkedIn link and without an empty or broken link

### Requirement: Localised animation text

All labels used by the signature animation (node names, bottleneck label, hypothesis card text, throughput label, act captions, replay button label) SHALL be part of `SiteContent` and SHALL be rendered in the page's locale.

#### Scenario: English animation

- **WHEN** `/en/` renders the animation
- **THEN** every label inside the animation is English and matches `content/en.ts`
