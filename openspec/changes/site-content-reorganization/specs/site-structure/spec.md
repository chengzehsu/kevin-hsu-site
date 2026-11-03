## Purpose

Defines what each page of the portfolio site is responsible for, so a hiring manager can judge fit quickly and every claim has one source.

## ADDED Requirements

### Requirement: Signature motion stays and carries proof

The launch film, the portfolio wall, and the case backdrop SHALL stay on the site, because they show how Kevin builds product. Portfolio wall tiles SHALL show real work products, name their case on hover, and open that case. No wall or still MUST show a retired claim.

#### Scenario: Wall opens the work

- **WHEN** a visitor clicks a tile on the portfolio wall
- **THEN** the case that tile comes from opens

#### Scenario: Retired frames stay off the walls

- **WHEN** the built pages are searched for the film frames that carry retired claims
- **THEN** no match is found

### Requirement: Home page supports a quick decision

The home page SHALL present, in order, the hero with the launch film, three results with awards, the featured cases, three AI picks, an experience summary, the skills radar with one line per core skill, and contact. It MUST NOT render the full AI section or the skill library.

#### Scenario: Section order

- **WHEN** the static export of `/` or `/en/` is inspected
- **THEN** its section ids appear in the order hero, metrics, work, ai, experience, skills, contact

#### Scenario: Earlier links still land

- **WHEN** a visitor opens `/#linkedin-posts`
- **THEN** the page contains an element with that id inside the AI section

### Requirement: Featured cases share one source

The home page SHALL feature the first four work cases by rank, and counts shown to visitors SHALL derive from the case data.

#### Scenario: Home featured set

- **WHEN** the home page is rendered
- **THEN** it features the internal back office, grocery, health app, and CDP cases

### Requirement: Portfolio is one card grid

The portfolio SHALL list every case as a card in one grid in rank order. Each card SHALL show a cover, the case name, one result figure, and two or three capabilities, and SHALL NOT show decision text. Each card SHALL keep the case id as its anchor. The hero SHALL keep the portfolio wall and SHALL NOT show the facts strip.

#### Scenario: Every case is a card

- **WHEN** the portfolio page is rendered
- **THEN** it holds one card per case, each with an element whose id is that case's id

#### Scenario: Card stays short

- **WHEN** a card is rendered
- **THEN** it contains no key decision text

### Requirement: Capabilities are written per project

Every case SHALL state the capabilities the project used and the capabilities it grew, in both languages.

#### Scenario: Both lists exist

- **WHEN** the case data is read for either language
- **THEN** every case has a non-empty used list and a non-empty grown list

### Requirement: Case first screen answers value and capability

Every case page SHALL open with the title, result figure, decision summary, capabilities used, capabilities grown, role, scope, collaboration, and main image. All other case content SHALL sit behind one disclosure, stay in the delivered HTML, and open when a visitor arrives with a link to a chapter inside it.

#### Scenario: Reader arrives

- **WHEN** a case page loads without a hash
- **THEN** the capabilities are visible outside the disclosure and the disclosure is closed

#### Scenario: Chapter link

- **WHEN** a case page loads with a hash naming an element inside the disclosure
- **THEN** the disclosure opens and that element scrolls into view

### Requirement: Every case follows one skeleton

Inside the disclosure, every case page SHALL render problem, decision, result, measurement, and what was built in that order, followed by the article when one exists. Every case hero SHALL keep the moving wall of work behind it.

#### Scenario: Article case keeps the skeleton

- **WHEN** a case with an article is rendered
- **THEN** the problem, decision, result, and measurement appear before the full story

### Requirement: One type scale

Every font size outside the résumé page SHALL come from the type scale tokens in `app/globals.css`, and a page SHALL use the display token for at most one kind of element.

#### Scenario: Literal size

- **WHEN** a stylesheet outside the résumé sets a font size in rem or px
- **THEN** the site output test fails

### Requirement: This site is a case

The portfolio SHALL include the résumé site as a side project case. Its claims SHALL be traceable to the repository, and it MUST NOT claim the tailored-link admin as a result while no backend host is connected.

#### Scenario: Case page exists

- **WHEN** the static export is built
- **THEN** `/cases/resume-site/` and `/en/cases/resume-site/` exist

### Requirement: Each fact has one main place

The home page SHALL state each headline result once, in the results strip. The AI section SHALL list only projects without their own case, and AI cases SHALL show their AI and human split on the case page. The site SHALL call the work "cases" and only the page "portfolio".

#### Scenario: No look-alike entries

- **WHEN** the portfolio is rendered
- **THEN** no AI item shares a case's name

### Requirement: One positioning and title

The site SHALL use one positioning line and the title Senior Product Manager for Kevin's Ecofirst work on every page.

#### Scenario: No older positioning

- **WHEN** the built pages are searched for the earlier positioning wording
- **THEN** no visible match is found

### Requirement: Unconfirmed claims stay off the site

Visible pages MUST NOT show delivery efficiency +50%, site-ops efficiency +20%, or the retired Stock Gods Fight case, and the SAT role MUST NOT claim a 20% efficiency gain.

#### Scenario: Stale claim guard

- **WHEN** the site output test scans the built pages
- **THEN** none of these claims is found

### Requirement: Experience is the résumé source

The résumé page SHALL read role titles, summaries, and bullets from the experience content, and it SHALL show the 2022/8 to 2022/10 gap line.

#### Scenario: Same wording

- **WHEN** the home experience section is rendered
- **THEN** it lists company, title, and period, and links to the résumé for results
