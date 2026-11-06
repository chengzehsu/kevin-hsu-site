## 1. Verification tooling

- [x] 1.1 (2026-11-06: not fixed. Chrome headless exits with `FATAL ... Failed to get the path for 1001` both inside the Claude Code sandbox and in Kevin's own Terminal, so it is a local Chrome issue, not the sandbox; Aside screenshots also fail with a cdp-sign error. Later steps verify with Aside DOM measurements. Next diagnostic: run Chrome directly with `--headless=new --user-data-dir="$(mktemp -d)" --dump-dom about:blank`.) `inspect.mjs` launches Chrome on this Mac and writes screenshots for the home page at 1440, 768 and 390 (it currently exits with `FATAL ... path_service.cc:264 Failed to get the path for 1001`, inside and outside the sandbox). Verify: the run prints its report and the output folder holds the screenshots. If it cannot be fixed, record why here and use Aside DOM measurements for every later verification step.

## 2. Before and after data

- [x] 2.1 `MetricItem` carries optional `from` and `to` (both or neither), and every changing ledger figure in zh and en has them (2 週/2 小時, 30%/10%, 1 個月/1 週, 300/1,000 單／日 and their English forms); `value` is unchanged. Verify: `npm run typecheck`, and a new `scripts/test-site-output.mjs` assertion that the home HTML contains each `from` and `to` text inside the metrics section. (Requirement: Before and after values for changing figures)
- [x] 2.2 Ledger figures with `from`/`to` render a static before-and-after form in server HTML: the after value shown, the before value beside it struck through, the read-aloud `value` kept for assistive technology. Verify: test assertion that no ledger figure text carries a hidden-by-default class or inline `display:none`, and an Aside measurement that every figure stays on one line at 1440, 900 and 390 in both locales. (Requirement: Before and after values for changing figures)

## 3. Signature move and live toggle

- [x] 3.1 Every changing ledger figure plays before→after as it scrolls into view (before value scales 2→1 and mutes, strike scales in, after value rises from its mask), scrubbed by `animation-timeline: view()` over `entry 0%`–`cover 50%`, only under `@supports` and `no-preference`, transform and colour only. Verify: Aside reads the before value at scale 2 as the row enters and scale 1 with the after value at translateY 0 at mid-screen, at 1440 and 390, with no horizontal scroll. (Requirement: Scroll-driven before-to-after move)
- [x] 3.2 The results section has no before/now control (Kevin rejected the toggle on 2026-11-06); the `LedgerMotion` client component and `metrics.toggle` content are removed. Verify: test assertion that the server HTML has no `impact-toggle`, and `npm run typecheck`. (Requirement: Scroll-driven before-to-after move)

## 4. Scroll scenes

- [x] 4.1 The contact section is uncovered from beneath the page on viewports taller than the contact panel and without reduced motion, and scrolls in normal flow otherwise. Verify: Aside at 1440×900 and 390×844 confirms the contact section is fully reachable and the footer and back-to-top link remain clickable; no horizontal scroll. (Requirement: Curtain contact; design: the curtain contact uses sticky positioning, not script)
- [x] 4.2 Case covers on the home and portfolio pages and each case page's hero image share a unique `view-transition-name` per case, and both documents opt into cross-document view transitions except under reduced motion. Verify: test assertion that each case id's name appears once on the home page, once on the portfolio page and once on its case page; manual check in Chrome that clicking a cover morphs into the case hero. (Requirement: Carried case cover; design: the carried cover uses cross-document view transitions)

## 5. Entrances and feedback

- [x] 5.1 Experience rows arrive one by one, the skills radar axes grow from the centre in order, and AI items arrive item by item, each inside `@supports (animation-timeline: view())` and `no-preference`, replacing the shared fade on those sections; the radar, BottleneckFlow, portfolio wall, case backdrop and hero film still render. Verify: `npm test` (existing assertions for those elements stay green) and an Aside check that all section content is visible with reduced motion emulated. (Requirement: Entrances chosen per section; Requirement: Signature elements preserved; design: entrances are chosen per section and reuse scroll timelines)
- [x] 5.2 Buttons scale to 0.98 on press, text links draw their underline from the left on hover and focus, case cards shift their cover a few pixels on hover, keyboard focus shows a visible ring, and nothing bounces or animates layout properties. Verify: `node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs` on the changed files reports 0 FAIL, and an Aside check of computed styles on hover and focus. (Requirement: Interaction feedback)

## 6. Gate

- [x] 6.1 The finished page meets the motion budget and stays readable. Verify: `npm run typecheck`, `npm run build`, `npm test` pass; `inspect.mjs` (if task 1.1 succeeded) reports 0 FAIL, at least eight moving elements and no blank bands at all three widths, and its screenshots are reviewed; otherwise Aside measurements in both locales at 1440, 900 and 390 show no horizontal scroll and every section's content visible after scrolling.
