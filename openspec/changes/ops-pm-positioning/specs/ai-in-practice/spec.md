## Purpose

Shows hiring managers how Kevin uses AI to solve real problems, in three chapters (building products, improving processes, automating his own life), so that AI reads as solved problems with a person still deciding, not as a list of habits.

## ADDED Requirements

### Requirement: AI section replaces the habits section

The home page in both locales SHALL render one section titled 「用 AI 解決問題」 / "AI in practice" in place of 「三個 AI 工作習慣」, with an intro that opens 「AI 先提案，人來拍板」 and its en counterpart. The section MUST keep the anchor id `linkedin-posts`. No home section SHALL be titled 「三個 AI 工作習慣」 or "Three AI work habits".

#### Scenario: Section title and anchor

- **WHEN** a visitor opens `/` or `/en/`
- **THEN** exactly one `<section id="linkedin-posts">` exists, its heading is the new title, and no element reads 「三個 AI 工作習慣」

### Requirement: Three chapters in fixed order

The section SHALL contain exactly three chapters in this order, each with its own anchor: `ai-build` 「我如何用 AI 打造產品」, `ai-process` 「我如何用 AI 改善流程」, `ai-life` 「我如何用 AI 自動化我的生活」 (en: How I build products with AI, How I improve processes with AI, How I automate my own life with AI). Each chapter MUST contain one lead item and between two and four further items.

#### Scenario: Chapter order and item counts

- **WHEN** the site output test reads the AI section on `/` and `/en/`
- **THEN** it finds the three chapter anchors in order, and each chapter holds one lead item plus two to four items

### Requirement: Every item states problem, AI role, human role, and result

Every item SHALL show who was stuck and where, what AI did, what a person decided or guarded, one result, and the source of that result. An item that has a case page MUST link to it in the same locale.

#### Scenario: Item fields present

- **WHEN** any item in the section is rendered
- **THEN** it contains the four labelled parts and a source line, and every case link resolves to a generated case page in the same locale

### Requirement: Home cards stay short

Each item on the home page SHALL show only a cover image, its title, one figure, and a one-line label. The problem, the AI half, the human half, the result, the source, and the links MUST sit behind a disclosure labelled 「看 AI 和人怎麼分工」 / "How AI and people split the work". The three chapters SHALL be tabs, with the first chapter shown by default and `#ai-build`, `#ai-process`, `#ai-life` opening their tab.

#### Scenario: One chapter at a time

- **WHEN** a visitor opens `/` and scrolls to the section
- **THEN** only the first chapter's cards are visible, every card has a cover image, and its details are collapsed

### Requirement: Home order puts AI right after the work cases

The home page SHALL order its sections as work cases, the AI section, experience, skills, awards, contact. The nav SHALL list the anchors `work`, `linkedin-posts`, `experience` in that order, with the AI link labelled 「用 AI 解決問題」 / "AI in practice".

#### Scenario: Order and nav

- **WHEN** the site output test reads `/` and `/en/`
- **THEN** `#work` precedes `#linkedin-posts`, which precedes `#experience` and `#skills`, and the nav anchors equal `["work", "linkedin-posts", "experience"]`

### Requirement: Life automation reveals no money or private details

Chapter 3 MUST NOT state any amount, asset, savings rate, premium, budget, or transaction, account, card, or bank count; any health, family, holding, ticker, or position detail; any financial institution name; or the phrase 「虛擬家族辦公室」. It MUST NOT link to the life-hub or finance-tracker repositories or show screenshots of either; the life-hub case page with text-free figures is allowed. The life-hub project SHALL appear as 「生活中控台」.

#### Scenario: Privacy sweep

- **WHEN** chapter 3 copy in both locales is searched for currency markers (NT$, 元, $), the words 資產, 淨值, 保費, 持股, and links to GitHub or `stock_analysis`
- **THEN** no match is found

### Requirement: Excluded and unshipped work stays out

The section MUST NOT include the Kyushu market dashboard, vulnerability findings from scans of employer code, or prototypes that never shipped (the knowledge-base bot, the meeting-notes app). A prototype handed to RD SHALL be described as a spec, without claiming RD built from it.

#### Scenario: Exclusion check

- **WHEN** the section copy is searched for 九州, 熊本, Kyushu, Kumamoto, and the scan's severity counts
- **THEN** no match is found
