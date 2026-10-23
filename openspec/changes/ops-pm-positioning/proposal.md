## Why

Kevin is job hunting, and the roles that fit him best are companies in digital transformation that need a PM (process mapping, systems and data, delivery, AI adoption, measured results) and AI-native product engineering roles. The site still pitches him as a PM for "global B2C platforms": the hero's job target, the contact copy, and the core capabilities lean B2C. The strongest evidence for what these employers want, the Ecofirst internal back office he built, the business calls inside the Notion operating system, and how he lets AI into daily operations with guardrails, is barely on the site. A hiring manager who does not recognise what they need at first glance does not read further. Kevin leaves Ecofirst on 2026-10-30, so the site is about to be sent out widely.

## What Changes

- Reposition the site copy (zh and en) around a PM core: process mapping, systems and data, business judgement, AI adoption (AI proposes, a person decides, autonomy only after it proves accurate), and measured results. Building prototypes himself counts as PM work. B2C results stay as proof but stop being the headline.
  - Hero profile: positioning and job target rewritten; the tagline 「找出卡點，做出解法，量出成果。」 stays.
  - Core capabilities: three items become five, one per core trait, each with one piece of evidence and a link to its case.
  - AI habits: the three traits stay; the evidence adds "AI proposes, a person decides".
  - Contact: the job target is rewritten without a vendor-pitch ending and without a "first 90 days" promise.
  - One-page résumé: headline, summary, and keywords follow the new positioning.
- Add a short 「協助公司營運優化」 block to the Ecofirst role for work less related to PM (grading and skill tree, onboarding handbook, Sales FAQ knowledge base, account and on/offboarding flow, verification-code forwarding, handoff). It is an add-on, not a case.
- Add one Ecofirst decision-log entry: 735 tasks, about 920 hours, 51% single-site customisation, so presales quotes moved to S/M/L/XL tiers and contracts count from "data complete", not from signing.
- Add a fifth work case, an illustrated article about the Ecofirst collection-monitoring back office, always called 「內部後台」 / "internal back office" on the site. It walks five real, anonymised screens in one usage scenario. **BREAKING** for the site vocabulary: the inventory becomes 「5 個工作案例＋2 個個人專案」 / "5 work cases + 2 side projects", and the home shelf shows five posters.
- After 2026-10-30 the Ecofirst period reads 2025/3 - 2026/10 instead of "now".

## Non-Goals (optional)

See design.md.

## Capabilities

### New Capabilities

- `ops-pm-positioning`: the site-wide positioning copy, the five core capabilities, the operations-optimisation add-on, and the honesty limits every claim must respect.
- `internal-backend-case`: the fifth work case as an illustrated article, its anonymised screenshots, and how it joins the case inventory, posters, and ordering.

### Modified Capabilities

(none)

## Impact

- Affected specs: `ops-pm-positioning`, `internal-backend-case` (both new).
- Affected code:
  - Content: `content/zh.ts`, `content/en.ts`, `content/types.ts` (optional article sections on a case), `content/caseArtifacts.ts`, `content/caseEvidence.ts`, `content/resume.ts`.
  - Components: `components/CasePage.tsx` (render article sections and figures), possibly `components/CaseStudies.tsx` and `components/PortfolioWall.tsx` for five posters.
  - Assets: `public/case-posters/` (new poster via `scripts/case-posters.py`), new screenshots under `public/portfolio-artifacts/`, `public/portfolio-wall/` thumbs if the wall needs one.
  - Admin: `lib/adminBase.ts` reads cases by rank; the new case must appear there.
  - Tests and tooling: `scripts/test-site-output.mjs` (poster count, inventory), `scripts/check-copy.sh`, `scripts/subset-fonts.py` re-run.
- No new dependency. Build stays `pnpm exec next build --webpack`; deploy stays the Cloudflare Worker static assets.
