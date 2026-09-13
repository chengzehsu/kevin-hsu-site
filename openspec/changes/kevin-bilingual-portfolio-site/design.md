## Context

Greenfield: the directory holds only Spectra scaffolding, no application code and no git repository. Node 22 and pnpm 10 are installed. Registry lookups on 2026-09-13 give next 16.3, react 19.3, motion 13.2, tailwindcss 4.3, @phosphor-icons/react 2.1. The approved plan lives at `~/.claude/plans/sense-kevin-refactored-raven.md` and is the source for content, sections, and visual rules.

Stakeholder: Kevin Hsu, the site owner. Audience: hiring product leads in Taiwan (primary, Chinese) and abroad (English).

Constraints: Zeabur Free plan puts Node services to sleep and lists "0 domains", so the output must be static; all visible copy is Taiwan Mandarin with zero em-dashes; every number must trace to the résumé; the sandbox cannot write to pnpm's global store, so the store lives inside the project.

## Goals / Non-Goals

**Goals:**

- One page, two locales, static HTML with correct `lang`, hreflang, and a language switch that keeps the reader's place.
- One signature animation that explains Kevin's method in under five seconds and still reads correctly as a still frame.
- Content model that makes zh/en drift a compile error.
- Deployable to Zeabur static hosting with a single CLI command, portable to GitHub Pages without code changes.

**Non-Goals:**

- CMS, blog, contact form backend, analytics, manual dark-mode toggle, multi-page routing.
- Reproducing the full résumé; the page is a curated argument, not an archive.

## Decisions

### Static export with two locale roots

`/` renders Traditional Chinese, `/en/` renders English, via `next.config.ts` with `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`. Two root layouts (`app/(zh)/layout.tsx`, `app/en/layout.tsx`, no `app/layout.tsx`) each emit `<html lang>` in the static HTML; switching locale is a full page load, which is what a language switch is expected to do. The default locale sits at `/` so the homepage carries content for crawlers instead of a redirect stub. First-visit detection is an inline `<head>` script on `/` only (stored preference, then `navigator.language`), replacing the URL with `/en/` plus the current hash. Alternative considered: `/zh/` + `/en/` with a redirecting root, rejected because it wastes the root URL and adds a blank flash. Fallback if Next 16 refuses two root layouts: a single `app/[[...locale]]/layout.tsx` with `generateStaticParams` returning `[{ locale: [] }, { locale: ['en'] }]`, same URLs, decided by the first `pnpm build` during scaffolding.

### Typed bilingual content dictionary

`content/types.ts` defines `SiteContent` (every section's fields, including animation labels); `content/zh.ts` and `content/en.ts` end with `satisfies SiteContent`, so a missing or extra key fails `tsc`. Components take `content` and `locale` props only, no string literals inside components. Facts Kevin has not supplied yet are source comments next to the field, never rendered text. Alternative considered: JSON files with a runtime schema, rejected because TypeScript already gives parity checking for free.

### Signature animation as hero visual

`components/motion/BottleneckFlow.tsx` is a `'use client'` SVG (viewBox 640×240) driven by `useInView` plus `useAnimate` from `motion/react`. Three acts: orders queue before the picking node and it turns accent-coloured; a hypothesis card appears; the picking segment widens and the throughput label shows 300 → 1,000 orders/day. Labels persist once shown so the final frame carries the whole story; total length 4 to 5 seconds; a replay button re-runs the sequence. `useReducedMotion()` renders the final frame plus the three act captions, no animation. Only `transform` and `opacity` animate; no scroll listeners. This is the only signature effect on the page; everything else is `Reveal` (whileInView, once) and `CountUp` on the metrics. Alternative considered: a photo or illustration hero, rejected because the animation is content about how Kevin works, not decoration.

### System CJK fonts with self-hosted Geist

Latin display and body use Geist through `next/font/google` (downloaded at build time, works with static export). Chinese text falls to `"PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif` with no web font download. CJK web fonts cost hundreds of kilobytes even with unicode-range slicing; the system stack is the faster product choice. `:lang(zh-Hant)` rules set body line-height 1.8, no negative tracking on headings, one step smaller heading scale, weight instead of italic for emphasis.

### Theme and accent tokens

Tailwind v4 through `@tailwindcss/postcss`; `dark:` follows `prefers-color-scheme` with no toggle. Neutral zinc scale (zinc-50 light background, zinc-950 dark background, never pure black or white). One accent, brick orange near `oklch(0.66 0.17 45)`, used for the bottleneck highlight, primary CTA, links, and metric emphasis everywhere. One radius (8px) on interactive elements; no card containers, grouping by spacing and single hairlines. Tokens live as CSS variables in `app/globals.css` so all three implementation agents read the same values.

### Zeabur static hosting via zbpack output_dir

zbpack classifies any project with a `next` dependency as a Node server and does not read `output: 'export'`. `zbpack.json` at the project root with `{"build_command": "pnpm build", "output_dir": "out"}` switches Zeabur to static hosting (Caddy, SPA fallback to `index.html`). Deployment is `npx zeabur@latest auth login` (interactive, run by Kevin) then `npx zeabur@latest deploy`; a `*.zeabur.app` domain is generated in the dashboard. Alternative considered: running Next as a Node service on Zeabur, rejected because the Free plan sleeps idle services and a hiring manager would hit a cold start.

### Parallel implementation by three subagents

Phase 0 (serial, main agent): scaffold, install, the three contract files (`content/types.ts`, `app/globals.css`, `lib/locale.ts`), both root layouts, empty-shell section components, and one green `pnpm build`. Phase 1 (parallel, disjoint files): Agent A writes `content/zh.ts`, `content/en.ts`, `content/index.ts`; Agent B writes the three motion components plus a temporary `app/(zh)/lab/page.tsx` for visual checking; Agent C writes the section components, `Site.tsx`, `LocaleSwitch.tsx`, and `generateMetadata`. Contract files change only through the main agent. Phase 2 (serial): integrate, delete `lab/`, build, verify, commit, deploy. No git worktrees are needed because the file sets do not overlap.

## Risks / Trade-offs

- [Next 16 rejects two root layouts at build] → switch to the `[[...locale]]` single-layout fallback during Phase 0 before any agent starts.
- [Zeabur Free plan refuses to generate a domain] → Dev plan (US$5/month) or GitHub Pages workflow; the static `out/` directory needs no code change.
- [zbpack ignores `output_dir` for Next projects] → remove `output: 'export'` and let Zeabur run the Node server, accepting cold starts, or deploy from a GitHub repository instead.
- [pnpm global store is not writable in the sandbox] → project-local `.npmrc` with `store-dir`, `cache-dir`, `state-dir` inside the repository, all git-ignored.
- [Animation reads as decoration] → labels persist and the still frame is designed first; the animation is cut if it cannot be understood from its final frame.
- [Résumé says "↑2.33 倍" while 300 → 1,000 is +233%] → the site shows the raw figures "300 → 1,000 orders/day (+233%)", which is unambiguous and stronger.
- [Facts still owed by Kevin] → rendered sections show only confirmed facts; missing details are source comments, so the site is publishable at any point.

## Migration Plan

Greenfield: no migration. Rollback is redeploying the previous static build; Zeabur keeps deployment history.

## Open Questions

- Exact wording of the 蔬果電商 bottleneck and hypothesis (one or two sentences from Kevin).
- 知識衛星 Senior Product Manager responsibilities and results.
- Contact email, LinkedIn URL, whether the Heptabase link is public, optional headshot.
- Original text of the two garbled résumé sentences.
