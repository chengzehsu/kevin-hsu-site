## Why

The home page now answers who Kevin is and what each product he owned is worth, but it barely moves beyond the hero film and masked headline. Gallery-grade portfolios carry one memorable, subject-specific motion moment plus considered feedback; the site's whole story is "before → now" (about 2 weeks → about 2 hours, 30% → 10%), and nothing on the page lets a visitor see or feel that change.

## What Changes

- **Signature move — before/after figures, driven by scroll:** each changing figure in the results ledger starts on its "before" value, strikes it through and shrinks it, then raises the "after" value as the visitor scrolls it into view; scrolling back reverses it. No control (a before/now toggle was considered and rejected).
- **Curtain contact:** the contact section is revealed from under the page as the visitor reaches the end (sticky, no script).
- **Carried cover:** a case card's cover on the home page and the portfolio page carries into the case page's hero image on navigation, using cross-document view transitions (CSS only; browsers without support navigate normally).
- **Entrances chosen per section:** experience rows arrive one by one, the skills radar's axes grow in order, the AI list arrives item by item, replacing the single fade-up the sections share now.
- **Feedback under the hand:** press, focus and hover states for buttons, text links (underline drawn from the left) and case cards (cover shifts slightly; no zoom).
- Results data gains `from` and `to` values for each figure that has a change, so the signature move reads real numbers.
- The hero film, portfolio wall, case backdrop, skills radar and BottleneckFlow stay as they are.

## Non-Goals

- No custom cursor, scroll hijacking or smooth-scroll library.
- No preloader, entry gate or sound.
- No hover zoom on every card, no infinite decorative loops (pulsing, floating, shimmering).
- No new animation library; CSS scroll-driven animations, the View Transitions API and small client components only.
- Case pages' own layout and motion are not redesigned; only the hero image takes part in the carried cover.

## Capabilities

### New Capabilities

- `home-motion`: the motion layer of the home page and the home-to-case navigation — the scroll-driven before/after move, the curtain contact, the carried cover, per-section entrances, interaction feedback, and the reduced-motion and no-script states for each.

### Modified Capabilities

(none)

## Impact

- Affected specs: `home-motion` (new)
- Affected code: `content/facts.ts`, `content/types.ts`, `content/zh.ts`, `content/en.ts`, `components/Metrics.tsx`, `components/motion/CountUp.tsx` (or a new `BeforeAfter` component), `components/Contact.tsx`, `components/Contact.module.css`, `components/CaseStudies.tsx`, `components/CaseStudies.module.css`, `components/PortfolioPage.tsx`, `components/CasePage.tsx`, `components/CasePage.module.css`, `components/Timeline.tsx`, `components/SkillsRadar.tsx`, `components/AiHighlights.tsx`, `app/globals.css`, `scripts/test-site-output.mjs`
- No new dependencies.
