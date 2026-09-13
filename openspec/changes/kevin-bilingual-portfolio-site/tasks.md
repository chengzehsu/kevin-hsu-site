## 1. Scaffold and contracts (Phase 0, main agent)

- [ ] 1.1 Initialise the project for Zeabur static hosting via zbpack output_dir: `package.json`, `.npmrc` with project-local pnpm store/cache/state dirs, `.gitignore`, `zbpack.json`, `git init`, install next 16 / react 19 / motion 13 / tailwindcss 4 / @tailwindcss/postcss / @phosphor-icons/react / typescript 5 and types
- [x] 1.2 Configure Static export with two locale roots: `next.config.ts` (`output: 'export'`, `trailingSlash`, `images.unoptimized`), `postcss.config.mjs`, `tsconfig.json`, `app/(zh)/layout.tsx`, `app/en/layout.tsx`, minimal `page.tsx` in both, `lib/locale.ts`; run `pnpm build` once and fall back to `app/[[...locale]]` if two root layouts are rejected
- [x] 1.3 Write the Typed bilingual content dictionary contract `content/types.ts` (`SiteContent` covering nav, hero, metrics, method, cases, experience, contact, animation labels) and an empty `content/index.ts` export shape
- [x] 1.4 Write Theme and accent tokens and System CJK fonts with self-hosted Geist in `app/globals.css` (Tailwind v4 import, zinc neutrals, brick-orange accent variable, 8px radius, `:lang(zh-Hant)` typography, reduced-motion overrides) and load Geist through `next/font/google` in both layouts
- [x] 1.5 Create empty-shell section components with `content` and `locale` props (`Site`, `Nav`, `Hero`, `Metrics`, `Method`, `CaseStudies`, `Timeline`, `Contact`, `Footer`, `LocaleSwitch`, placeholder `BottleneckFlow`) so the page builds green before Parallel implementation by three subagents starts

## 2. Content (Phase 1, Agent A)

- [x] 2.1 Write `content/zh.ts` and `content/en.ts` with `satisfies SiteContent`, enforcing Content parity across locales, and export `getContent(locale)` from `content/index.ts`
- [x] 2.2 Fill metrics, cases, and timeline honouring Metric traceability (300 → 1,000 orders/day, +233%, +120%, +66% DAU 12,000 → 20,000, NT$12M+, +20%, 2 companies; no "2.33" anywhere)
- [x] 2.3 Apply Copy rules: Taiwan Mandarin only (使用者 not 用戶), zero em-dash or en-dash, single contact label 「聯絡我」 / "Contact me", at most two eyebrow labels
- [x] 2.4 Implement Placeholder for unsupplied facts as source comments beside 知識衛星, 蔬果電商 bottleneck/hypothesis, email, LinkedIn, Heptabase, headshot fields, rendering only confirmed facts
- [x] 2.5 Provide Localised animation text (node names, bottleneck label, hypothesis card, throughput label, act captions, replay label) in both locales

## 3. Signature animation (Phase 1, Agent B)

- [ ] 3.1 Build `components/motion/BottleneckFlow.tsx` as the Signature animation as hero visual: SVG viewBox 640×240, four nodes, `useInView` + `useAnimate`, Three-act sequence within 4 to 5 seconds, transforms and opacity only
- [ ] 3.2 Implement Persistent labels so bottleneck label, hypothesis card, and throughput label stay visible after appearing
- [ ] 3.3 Add the Replay control button (keyboard focusable, accessible name from content)
- [ ] 3.4 Implement Reduced motion fallback: static final frame plus three captions, no replay button, via `useReducedMotion`
- [ ] 3.5 Build `components/motion/Reveal.tsx` (whileInView once, amount 0.3) and `components/motion/CountUp.tsx` (counts on inView, respects reduced motion) and verify all three on a temporary `app/(zh)/lab/page.tsx`

## 4. Layout and routing (Phase 1, Agent C)

- [x] 4.1 Implement Section structure in `Site.tsx` and section components with ids `hero`, `metrics`, `method`, `cases`, `experience`, `contact`; asymmetric hero (text left, animation right) with at most four text elements fitting 1280×800; metrics as a typographic strip; method as a single-column list; cases with sticky left titles and situation / bottleneck / hypothesis / result columns; two-column timeline; contact
- [x] 4.2 Implement Locale URL structure and First-visit language redirect: inline head script on `/` only (stored preference, then `navigator.language`), keeping the hash
- [x] 4.3 Implement `LocaleSwitch.tsx` so Language switch preserves anchor and stores the preference in `localStorage`
- [x] 4.4 Add `generateMetadata` with title, description, Open Graph, and Hreflang alternates (`zh-Hant-TW`, `en`, `x-default`) using the site origin constant
- [ ] 4.5 Ensure `dark:` variants, single accent usage, 8px radius, `:active` press feedback, no card containers, one-line nav at 1024px, and explicit single-column collapse below 768px

## 5. Integration and verification (Phase 2, main agent)

- [ ] 5.1 Wire Agent A content into Agent C components, replace the placeholder with the real `BottleneckFlow`, delete `app/(zh)/lab/`, and confirm Static export build produces `out/index.html` and `out/en/index.html`
- [ ] 5.2 Run copy checks: grep for `—` and `–` in `content/`, `components/`, `app/`; grep `用戶` in `content/`; count eyebrow labels; `pnpm tsc --noEmit`
- [ ] 5.3 Screenshot `/` and `/en/` in light and dark at 1280×800 and 390×844 at 1× scale into the scratchpad; confirm hero within first viewport, single-line nav, no CTA wrap, no horizontal scroll
- [ ] 5.4 Verify First-visit language redirect, Language switch preserves anchor, Reduced motion fallback, and Persistent labels in a browser; run Lighthouse on `/` targeting performance and accessibility ≥ 90
- [ ] 5.5 Run `sd0x-dev-flow:precommit-fast` and commit

## 6. Deployment (Phase 2)

- [ ] 6.1 Confirm Zeabur static configuration (`zbpack.json` with `build_command` and `output_dir`), have Kevin run `npx zeabur@latest auth login`, then run `npx zeabur@latest deploy` and generate the `*.zeabur.app` domain
- [ ] 6.2 Run Deployment verification on the live URL (`/`, `/en/`, `/#cases`, language switch, mobile); if the Free plan refuses a domain, document the Dev plan or GitHub Pages fallback
