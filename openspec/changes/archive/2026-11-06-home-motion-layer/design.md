## Context

The home page (`app/page.tsx`, `app/en/page.tsx`) is a static export (`output: "export"`). Its results section (`components/Metrics.tsx`) is a ledger, one row per product, each row naming Kevin's role before its numbers. Existing motion: the hero film, masked tagline lines (`.hero-line`), `soft-rise` hero entrances, scroll-driven `metric-rise` on ledger rows, `MagneticLink`, `Reveal`, `ScrollProgress`, the portfolio wall, the case backdrop, the skills radar and `BottleneckFlow`. Kevin asked that the film, wall, backdrop, radar and BottleneckFlow be kept and improved, never removed.

Case links (`CaseStudies`, `Metrics`, `PortfolioWall`, `CaseDetails`) are plain `<a>` elements, so moving to a case is a full document navigation, not a React transition.

Guidance: `design-taste-frontend` `references/motion.md` — one signature move, a live thing, two or three scroll scenes, per-section entrances, feedback under the hand, one moving picture (the film); transform, opacity and clip-path only; every move inside `prefers-reduced-motion: no-preference`; no content hidden when script fails.

## Goals / Non-Goals

**Goals:**

- One signature move that states the site's idea: a figure's "before" value is struck and rolls to its "after" value.
- The change shown by scrolling alone, with no control to operate.
- Two scroll scenes: the curtain contact, and the cover carried into the case hero.
- Entrances that differ by content in the experience, skills and AI sections.
- Consistent press, focus and hover feedback.
- Every move has a finished, readable reduced-motion state and a no-script state.

**Non-Goals:**

- Custom cursor, scroll hijacking, smooth-scroll libraries, preloaders, gates, sound.
- Hover zoom on every card; infinite decorative loops.
- New dependencies.
- Redesigning case pages beyond giving their hero image a transition name.

## Decisions

### Before and after values are data, not parsed from the display string

Each `MetricItem` that shows a change gains `from` and `to` strings (for example `from: "約 2 週"`, `to: "約 2 小時"`). `value` stays the read-aloud form (`"約 2 週 → 約 2 小時"`) and is what assistive technology and the no-script page read. Parsing `value` on the arrow was rejected: business figures (`約 NT$1 億`, `DAU +66%`) have no arrow, and wording like `300 → 1,000 單／日` carries its unit on only one side.

### The before-to-after move is scrubbed by scroll, with no control

Kevin rejected a before/now toggle: the change should show itself as the page is scrolled. Each changing figure's before value, its strike line and its after value carry `animation-timeline: view()` over `entry 0%` to `cover 50%`: the before value scales from 2 to 1 (origin at its left baseline) and turns muted, the strike scales in from the left, and the after value rises from its mask. Transform and colour only, inside `@supports (animation-timeline: view())` and `no-preference`, so the static finished form is what every other case gets. No client component is needed.

### The curtain contact uses sticky positioning, not script

The contact section sits under the page: `main` gets an opaque background and a higher stacking order; the contact section is `position: sticky; bottom: 0` at the end, so it is uncovered as the visitor scrolls the last screen. It only applies where the contact panel fits in the viewport height (`@media (min-height: …)`); otherwise it scrolls normally. Reduced motion keeps normal flow.

### The carried cover uses cross-document view transitions

Because case links are full navigations in a static export, React's `<ViewTransition>` (which needs client transitions) does not apply. Instead both documents opt in with `@view-transition { navigation: auto; }`, and the case card cover and the case page hero image share `view-transition-name: case-<id>`. Names are set inline per element so each is unique on its page. Browsers without cross-document support navigate normally. Reduced motion disables the opt-in.

### Entrances are chosen per section and reuse scroll timelines

Experience rows rise one by one (stagger by index via a CSS custom property), skills radar axes grow from the centre in order (SVG `transform: scale` per axis, origin at the centre), AI items arrive item by item. All use `animation-timeline: view()` inside `@supports`, so unsupported browsers show the finished state.

### Feedback is one shared set of states

Buttons scale to 0.98 on press; text links draw their underline from the left on hover and focus (`background-size` on a 1px underline image is a layout-free paint change); case cards move their cover by a few pixels on hover. Focus rings stay visible. Nothing bounces.

## Implementation Contract

- **Behavior:** On the home page (zh and en), the current-role row's product-value figures play the before→after move once when the row first enters the screen; every changing ledger figure plays before→after as it scrolls into view; the contact section is uncovered at the end of the page on screens tall enough to hold it; clicking a case card cover morphs it into the case page hero in supporting browsers; experience, skills and AI sections enter in their own manner; buttons, links and case cards give press, hover and focus feedback.
- **Interface / data shape:** `MetricItem` gains optional `from: string` and `to: string`, both present or both absent.
- **Failure modes:** No script or no scroll-timeline support → figures show `to` with `from` struck beside it; no scroll-timeline support → finished states; no cross-document view transitions → normal navigation; reduced motion → no travel, scale or morph, content in its finished state.
- **Acceptance criteria:** `npm run typecheck`, `npm run build`, `npm test` pass; new assertions in `scripts/test-site-output.mjs` check that the server HTML contains both `from` and `to` text for each changing figure, that no figure text is hidden by default, that the server HTML has no before/now control, and that case covers and case heroes carry matching `view-transition-name` values; Aside measurements show no horizontal scroll at 1440, 900 and 390 in both locales; `inspect.mjs` (once Chrome launches) reports at least eight moving elements and no blank bands.
- **Scope boundaries:** In scope: home page sections, the portfolio page's case cards, and case page hero images. Out of scope: case page layouts, the résumé page, the hero film's own controls, and any new library.

## Risks / Trade-offs

- [Cross-document view transitions are Chromium 126+ and Safari 18.2+] → Unsupported browsers navigate normally; nothing depends on the morph.
- [Sticky curtain can hide the contact panel on short screens] → Only applied above a minimum viewport height; tested at 390×844 and 1440×900.
- [More motion competes with the hero film] → The signature move sits below the first screen; the hero gains no new motion.
- [Chrome headless does not launch on this Mac, so `inspect.mjs` cannot count moving elements yet] → Fix the launch first (task 1); until then verify with Aside DOM measurements.
