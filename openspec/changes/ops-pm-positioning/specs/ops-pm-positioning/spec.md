## Purpose

Positions Kevin on the public site as a product manager for operations digitisation and AI adoption, so hiring managers for transformation and AI-native roles recognise the traits they need at first glance, while every claim stays backed by evidence that survives interview follow-up.

## ADDED Requirements

### Requirement: Positioning copy names the PM core

The hero profile, meta description, contact text, and one-page résumé headline, summary, and keywords SHALL describe Kevin as a Product Manager for operations process digitisation, internal systems, and AI adoption, in both zh and en. The hero tagline 「找出卡點，做出解法，量出成果。」 / its en counterpart, the hero kicker, the three trait rows, and the launch film MUST stay unchanged. No copy SHALL describe the job target as global B2C platforms only.

#### Scenario: Hero profile on the home page

- **WHEN** a visitor opens `/`
- **THEN** the profile's positioning row reads 「Product Manager · 營運流程數位化、內部系統與 AI 導入」 and the job-target row names companies in digital transformation and growth-stage product teams that want AI in daily operations

#### Scenario: Unchanged hero elements

- **WHEN** the built home page in either locale is compared with the previous build
- **THEN** the headline, kicker, three trait rows, and film sources are identical

### Requirement: Five core capabilities with evidence

The capability block SHALL show exactly five cards, in this order: 流程梳理, 系統與資料, 商業判斷, AI 導入, 成效驗證 (en: Process mapping, Systems and data, Business judgment, AI adoption, Measured results). Each card MUST contain a one-sentence statement, one evidence line, and at least one link to a case page that exists in the same locale.

#### Scenario: Card links resolve

- **WHEN** the site output test walks every capability card link on `/` and `/en/`
- **THEN** every link points to a generated case page in the same locale

### Requirement: AI adoption evidence states the guardrail

The AI adoption card and the AI habits section SHALL describe AI as proposing while a person decides, with autonomy granted only after measured accuracy, citing that Notion AI schedules only propose until three consecutive rounds reach at least 90% adoption.

#### Scenario: Guardrail wording present

- **WHEN** a reader scans the AI adoption card in zh
- **THEN** it contains 「AI 先提案、人來拍板」 and the 3 rounds / 90% condition

### Requirement: Operations-optimisation add-on on the Ecofirst role

The Ecofirst experience item SHALL show a block titled 「另外協助公司營運優化」 / "Also improved how the company runs" after its regular bullets, with three bullets covering the grading and skill-tree system, the AI-drafted Sales FAQ with human confirmation, and account on/offboarding plus the handoff. Roles without this block MUST render unchanged.

#### Scenario: Add-on appears only on Ecofirst

- **WHEN** the experience section is rendered
- **THEN** only the Ecofirst role contains the add-on block, placed after its bullets

### Requirement: Presales decision-log entry

The Ecofirst case decision log SHALL include an entry whose signal states 735 tasks, about 920 hours, and 51% single-site customisation between 2026/1 and 2026/7, whose call states S/M/L/XL quoting and contracts counted from data completeness, and whose outcome states that the figures are a pre-change baseline.

#### Scenario: Baseline wording

- **WHEN** the entry is read
- **THEN** its outcome does not present 51% as a result and names it a baseline

### Requirement: Claims stay within evidence

Site copy MUST NOT claim that Kevin built the whole organisational system, MUST NOT attach outcome numbers to the org systems, MUST NOT claim ERP implementation, MUST NOT state a before/after speed gain for the internal back office, and MUST NOT name or quote any hiring company. Commit counts SHALL read as a continuation (218 in the first two months, 748 by 2026/10).

#### Scenario: Copy check

- **WHEN** zh and en content are searched for 「ERP 導入」, "implemented ERP", and the names of the two hiring companies that prompted this change
- **THEN** no match is found

### Requirement: Ecofirst period after the last workday

On or after 2026-10-30 the Ecofirst role and case SHALL show the period 「2025/3 - 2026/10」 / "Mar 2025 - Oct 2026" instead of a current-role label.

#### Scenario: Deploy after the last workday

- **WHEN** the site is built for deployment on 2026-10-30 or later
- **THEN** no Ecofirst entry is labelled 「現在」 or "Present"
