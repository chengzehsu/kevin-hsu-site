## Why

Kevin Hsu (許承澤) is a product manager whose track record currently lives in a plain-text résumé. Hiring product leads decide in well under a minute, and a document cannot show *how* he thinks. A bilingual personal site that demonstrates his working method (decompose the flow, find the bottleneck, hypothesise, validate) with real, traceable metrics communicates product sense directly. He is interviewing now, so the site is needed now.

## What Changes

- New statically exported Next.js 15 site: Traditional Chinese (Taiwan) at `/`, English at `/en/`, hreflang alternates, `<html lang>` set in the static HTML, language switch that preserves the current section anchor and remembers the choice.
- Seven sections on one page: sticky nav, asymmetric hero whose visual is the BottleneckFlow animation, impact metrics with count-up, "how I work" method list, four case studies in a fixed situation / bottleneck / hypothesis / result structure, experience timeline, contact.
- One signature effect only: BottleneckFlow, a three-act SVG animation (orders queue at the picking node, a hypothesis card appears, the pipe widens and throughput goes from 300 to 1,000 orders/day). Labels persist once shown; reduced-motion users get the static final frame; a replay button exists.
- Typed bilingual content dictionary (`content/zh.ts`, `content/en.ts` both `satisfies SiteContent`) so TypeScript enforces zh/en parity. Every number traces back to the résumé; Taiwan Mandarin vocabulary only; zero em-dashes.
- Light and dark theme from `prefers-color-scheme`, one locked accent colour, CJK-specific typography rules (no tight tracking, 1.8 line-height, weight instead of italic).
- Zeabur static hosting configured through `zbpack.json` (`build_command` + `output_dir: out`), with GitHub Pages as the documented fallback.

## Capabilities

### New Capabilities

- `bilingual-site-routing`: locale URL structure (`/` zh, `/en/` en), first-visit language detection and redirect, language switch with anchor preservation and remembered preference, hreflang and `lang` attributes.
- `portfolio-content`: the typed bilingual content model and the content requirements of the seven sections (metric traceability, copy rules, TODO placeholders for facts not yet supplied).
- `bottleneck-flow-animation`: the three-act signature animation, label persistence, replay, and reduced-motion behaviour.
- `static-deployment`: static export build output, Zeabur configuration, and the deployment fallback.

### Modified Capabilities

(none)

## Impact

- New code (greenfield, no existing app code): `app/`, `components/`, `content/`, `lib/`, `public/`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `package.json`, `zbpack.json`, `.gitignore`.
- Dependencies: `next`, `react`, `react-dom`, `motion`, `@phosphor-icons/react`, `tailwindcss`, `@tailwindcss/postcss`, `typescript` and type packages.
- Systems: a git repository is initialised in this directory; a Zeabur project is created via `npx zeabur@latest deploy` (interactive login done by Kevin).
- Inputs still owed by Kevin, handled with visible TODO placeholders until supplied: 知識衛星 Senior PM responsibilities, the 蔬果電商 bottleneck/hypothesis sentence, contact email and LinkedIn URL, whether the Heptabase link is public, the two garbled résumé sentences, optional headshot.
