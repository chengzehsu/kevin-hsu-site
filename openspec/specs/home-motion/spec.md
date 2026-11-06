# home-motion Specification

## Purpose

The home page's motion layer and the home-to-case navigation. It shows the site's idea, before versus now, through one signature move and one control a visitor can operate, and gives the page considered entrances and feedback, while every state stays readable without script or motion.

## Requirements

### Requirement: Before and after values for changing figures

A results figure that shows a change SHALL carry both its before value and its after value as separate data, and the page SHALL render both in the server HTML.

#### Scenario: A changing figure renders both values

- **WHEN** the home page is rendered for either locale
- **THEN** each ledger figure with a before value contains its before text and its after text in the HTML, and its read-aloud value is unchanged

##### Example: current-role figures

| value (read aloud)  | from      | to           |
| ------------------- | --------- | ------------ |
| 約 2 週 → 約 2 小時 | 約 2 週   | 約 2 小時    |
| 30% → 10%           | 30%       | 10%          |
| 約 1 個月 → 約 1 週 | 約 1 個月 | 約 1 週      |
| 300 → 1,000 單／日  | 300       | 1,000 單／日 |

#### Scenario: A figure with no change stays static

- **WHEN** a ledger figure has no before value (for example 約 NT$1 億 or DAU +66%)
- **THEN** it renders as today and takes no part in the before-to-after move


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Scroll-driven before-to-after move

Every changing figure in the ledger SHALL play its change as the visitor scrolls it into view: the before value starts at full size, is struck through and shrinks, then the after value rises beside it. The move SHALL follow scroll progress in both directions and SHALL need no control and no script.

#### Scenario: Scrolling a figure into view

- **WHEN** a changing figure scrolls from the bottom of the viewport to the middle in a browser with scroll-driven animations and without reduced motion
- **THEN** its before value goes from twice its resting size to its resting size and is struck through, and its after value rises from below its mask to its place

#### Scenario: Scrolling back

- **WHEN** the visitor scrolls the figure back down out of view
- **THEN** the move plays in reverse

#### Scenario: Reduced motion, no support, or no script

- **WHEN** reduced motion is requested, scroll-driven animations are unsupported, or script does not run
- **THEN** each changing figure shows its after value with its before value small and struck through beside it, with no travel or scale

#### Scenario: No control

- **WHEN** the home page is rendered
- **THEN** the results section contains no before/now control


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Curtain contact

The contact section SHALL be uncovered from beneath the page as the visitor reaches the end, where the screen is tall enough to hold it.

#### Scenario: Tall enough screen

- **WHEN** the viewport is taller than the contact panel and reduced motion is not requested
- **THEN** the page above slides away to reveal the contact section, which holds in place

#### Scenario: Short screen or reduced motion

- **WHEN** the viewport is shorter than the contact panel or reduced motion is requested
- **THEN** the contact section scrolls in normal flow and is fully reachable


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Carried case cover

A case card's cover SHALL carry into the case page's hero image on navigation in browsers that support cross-document view transitions.

#### Scenario: Supported browser

- **WHEN** the visitor opens a case from a case card on the home page or the portfolio page in a supporting browser without reduced motion
- **THEN** the cover morphs into the case hero image

#### Scenario: Matching names

- **WHEN** the home, portfolio and case pages are rendered
- **THEN** each case cover and its case page hero carry the same unique view-transition name, and no page repeats a name

#### Scenario: Unsupported browser

- **WHEN** the browser does not support cross-document view transitions
- **THEN** navigation happens normally with no visual difference beyond the missing morph


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Entrances chosen per section

The experience, skills and AI sections SHALL each enter in a manner suited to their content instead of one shared fade.

#### Scenario: Supported browser without reduced motion

- **WHEN** each section scrolls into view
- **THEN** experience rows arrive one by one, the skills radar axes grow from the centre in order, and AI items arrive item by item

#### Scenario: Unsupported browser or reduced motion

- **WHEN** scroll-driven animations are unsupported or reduced motion is requested
- **THEN** each section shows its finished state with all content visible


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Interaction feedback

Buttons, text links and case cards SHALL give feedback on press, hover and focus without bounce, zoom or layout changes.

#### Scenario: Pointer and keyboard

- **WHEN** a button is pressed, a text link is hovered or focused, or a case card is hovered
- **THEN** the button scales to 0.98, the link's underline draws from the left, the card's cover shifts a few pixels, and a visible focus ring shows for keyboard focus


<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->

---
### Requirement: Signature elements preserved

The hero film, portfolio wall, case backdrop, skills radar and BottleneckFlow SHALL remain on the pages where they appear today.

#### Scenario: After the motion layer ships

- **WHEN** the site is built
- **THEN** each of those elements renders where it did before this change

<!-- @trace
source: home-motion-layer
updated: 2026-11-06
code:
  - content/evonne-dt-pm-answers.md
  - content/linkedin-plan-2026-11/images/week-1.html
  - content/linkedin-plan-2026-11/images/shared.css
  - content/linkedin-plan-2026-11/images/week-1.png
  - content/linkedin-plan-2026-11/images/week-3.png
  - content/linkedin-plan-2026-11/images/week-4.html
  - content/linkedin-plan-2026-11/images/week-4.png
  - content/linkedin-plan-2026-11/images/week-3.html
  - content/linkedin-plan-2026-11/README.md
  - content/linkedin-plan-2026-11/images/week-2.html
  - content/linkedin-plan-2026-11/images/week-2.png
-->