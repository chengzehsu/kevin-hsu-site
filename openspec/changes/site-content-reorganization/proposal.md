## Summary

Reorganize the site so a hiring manager can judge fit in 30 seconds: the home page decides, the portfolio proves, every case follows one skeleton, and the résumé is for checking.

## Motivation

Kevin finds the site too busy to read as a hiring manager. The home page carries cases, AI work, experience, skills, and awards with 80 links and 27 disclosures. Positioning and job titles differ across pages, the home and portfolio pick different cases, case pages follow three structures, and the résumé and experience copy are duplicated, so one number change creates contradictions.

## Proposed Solution

- Home: hero with positioning and one real screen, three results with awards, four platform cases, three AI picks, experience summary, contact.
- Portfolio: featured cases, the Ecofirst overview with its sub-cases, side projects, then the full AI section. Decorative image walls go away.
- Cases: one skeleton of problem, decision, result, what was built, then an optional full story.
- One positioning line and one job title (Senior Product Manager) everywhere.
- Experience becomes the single source for résumé roles; home results come from one facts file; counts derive from data.
- Remove the unconfirmed +20% claim and the unused method and builder-loop blocks, and keep the film, walls, and radar with current claims.

### Card view (2026-11-03)

Kevin still found the portfolio bloated and easy to get distracted by, and asked for a card view of every project where opening one quickly shows his value and capabilities.

- Portfolio: one grid holding every case, each card showing cover, name, one result figure, and two or three capabilities. The hero keeps the wall and loses the facts strip. The AI section becomes a compact list below the grid.
- Cases: the first screen holds the title, result figure, decision, capabilities used, capabilities grown, role, scope, collaboration, and the main image. Everything else moves behind one "see the full process" disclosure.
- New case: this résumé site, reverse-engineered as a side project. Its figure is 7 weeks and 86 commits until Kevin supplies a better one. The tailored-link admin is off and is not claimed as a result.
- Remove the leftovers of the retired Stock Gods Fight case.

## Alternatives Considered

- Restyling alone: the problem is what each page carries, so a visual pass would keep the clutter.
- Keeping the lead, featured, and list tiers with shorter copy: readers would still take the listed cases as less important.
- Capability tags from the radar axes or article traits: Kevin asked for what each project used or grew, which those shared words cannot say.
- A facts file referenced by every sentence: too invasive for prose in two languages, so a test guards stale strings instead.

## Impact

- Affected specs: site-structure (new)
- Affected code: components/Site.tsx, Hero, Metrics, ProofStack, Timeline, Nav, PortfolioPage, CaseStudies, CasePage, CaseDetails, ResumePage, a new home AI block, content/zh.ts, en.ts, resume.ts, caseArtifacts.ts, types.ts, new content/facts.ts, lib/cases.ts, app opengraph images, scripts/test-site-output.mjs
