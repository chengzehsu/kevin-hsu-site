## Context

The site is a bilingual Next.js static export (`output: "export"`, trailing slashes) on Zeabur static hosting. Content lives in `content/*.ts` and renders through server components, with only a few client islands. Tracked links use `?s=<code>`. An inline script in `components/Analytics.tsx` rewrites them to `utm_source`/`utm_medium` before Umami Cloud loads, on the production host only. Codes follow `^[a-z0-9][a-z0-9_-]{0,39}$`, and `pnpm utm` logs them locally.

A PocketBase 0.40.4 service already exists in `backend/` (Dockerfile, migrations, encryption-key-safe entrypoint). It holds one `applications` collection that only superusers can reach. Kevin tried its built-in dashboard and rejected it: it is English and generic.

The CJK webfont is a subset built from the site copy (`scripts/subset-fonts.py`). Text outside the subset falls back to a system font.

Stakeholders: Kevin (sole operator) and recruiters and hiring managers (visitors through tracked links).

## Goals / Non-Goals

**Goals:**

- A recruiter who opens their tracked link sees copy tuned to their role, for the whole visit.
- Kevin manages applications and variants in a Chinese admin that looks like the site, never in the PocketBase dashboard.
- What each company saw is a stable snapshot: the variant is locked once sent, and the site commit is recorded.
- The public site never breaks or flashes because of variants. The backend being down only means "main copy".
- The Umami API key and all private fields (company names, notes, requirements, PDFs) never reach the browser of anyone but Kevin.

**Non-Goals:**

- Variants for case pages, the launch film, metrics, awards, or the OG image. These stay shared, because per-company changes there multiply consistency risk for little gain.
- Per-variant URLs or per-variant static builds. A variant is applied at runtime from the code.
- Multi-user accounts, roles, or sharing the admin.
- Replacing Umami or building a custom analytics store.
- An English admin UI. The admin is Chinese only (the variants it edits still cover both locales).
- Rewriting `content/*.ts` into the CMS. The main copy stays in code and in git.

## Decisions

### Variants overlay a fixed set of keyed fields at runtime

Each variant stores, per locale, a sparse JSON overlay keyed by stable field keys: `hero.headline`, `resume.headline`, `resume.summary`, `resume.keywords`, `skills.order` (featured card ids), `skills.card.<id>.statement|summary`, `experience.<id>.bullets` (ordered indices into the main bullets plus at most one extra string), and `cases.order`. Missing keys mean "use the main copy".

Alternatives considered:

- Whole-site copies per variant: rejected by Kevin after reviewing the risks (font coverage, number drift, credibility when the same person sees two different sites).
- Build-time pages per code: every new application would need a rebuild and deploy, and codes would appear in public paths.

### Overrides render through client components that start from the main copy (hydration-safe)

Each overridable field is wrapped in a small client component that renders the main copy on the server and in the first client render, so hydration matches. It then re-renders from a shared variant store once the overlay arrives. Reordering uses a client wrapper that takes keyed children and an order list.

Alternative: patching the DOM before hydration from an inline script. Rejected because React 19 treats the text mismatch as a hydration error and re-renders the boundary, which can revert the patch or log errors.

### Hide-until-resolved only for visitors who carry a code

A tiny inline head script resolves the code: `s` param, then `utm_source`, then `sessionStorage`. Only when a code exists does it set `data-variant="pending"` on `<html>`. CSS then hides overridable fields with `visibility: hidden`, which keeps layout so nothing shifts. The store clears the flag when the overlay is applied, when it fails, or after a 1,200 ms timeout, whichever comes first. Visitors without a code never get the flag and never wait.

### Public variant endpoint returns copy only

`GET <backend>/api/variant/{code}` is a PocketBase JS route in `pb_hooks`. It finds the application with that tracking code and returns `{ zh: {...}, en: {...} }` from its variant, or 404. It never returns company, role, notes, status, or ids. CORS allows only the site origin and localhost. Responses carry `Cache-Control: public, max-age=60`.

Codes are guessable (company slugs), so the endpoint is designed to be harmless: it returns only résumé copy that Kevin chose to show that company.

### Owner auth collection instead of superuser tokens in the browser

A dedicated auth collection `owners` (one record, created by CLI) authenticates the admin. All collection rules check `@request.auth.collectionName = "owners"`. The superuser stays for emergency use and is never typed into the site. The admin uses the official `pocketbase` JS SDK with its default local auth store, scoped to the site origin. The admin route is `noindex`, excluded from the sitemap and nav, and served from the static export like other pages. Its HTML contains no data.

Alternative: superuser login from the site. Rejected, because a stolen superuser token can change schema and settings.

### Locking is enforced on the server

A `pb_hooks` update/delete hook rejects changes to a variant that any application with status ≠ `準備中` references. The admin offers 「複製成新版本」 instead. This rule lives on the server so no client can bypass it.

### Site version and main copy come from the build

The build writes two files: `out/version.json` (`{ "commit": "<short sha>", "builtAt": "<iso>" }`, taken from the git commit available in the build, or Zeabur's commit env var) and `out/admin/base.json` (the main copy for every overridable key, both locales, plus the set of numeric tokens in the site copy). The admin reads both. When it creates an application, it fills `siteVersion` from the live `version.json`.

### Fonts: load the full Noto Sans TC only when an overlay is active

When an overlay is applied, or on the admin page, the store injects the Google Fonts stylesheet for Noto Sans TC. The font stack lists the subset first and the full family second, so the browser fetches only the unicode-range slices for characters missing from the subset. Visitors on the main copy load nothing extra.

### Umami stats through an owner-only proxy

`GET <backend>/api/stats?codes=a,b,c` (owners only) calls the Umami Cloud API with `UMAMI_API_KEY` from env. For each code it returns `{ code, views, visits, lastSeen }`, filtered by `utm_source = code` over the last 180 days. Results are cached in memory for 5 minutes. The exact Umami endpoint and filter syntax are verified against Umami's API docs and one real call during apply. If Umami is unreachable, the admin shows 「無法取得」 and stays usable.

### Admin UI: Chinese, site tokens, two working views

Design Read: a private working tool for one person who checks it daily during a job search. It should feel calm and fast, use the site's own type and color tokens, and show dense but readable lists. It is not a landing page, so the taste-skill landing styles do not apply. The project's tokens in `app/globals.css` set color and type; `~/.claude/docs/ui-craft-distilled.md` covers craft.

Views:

1. 「投遞」: a list with status chips, company and role, applied date, bound variant, open count and last-open time, and a copy-link button. Filter by status and search. Clicking a row opens an editor drawer.
2. 「版本」: a list of variants with locked state and usage count. The editor shows, for each overridable field and locale, the main copy (read-only) next to the override input. It includes number-consistency warnings and 「預覽」, which opens the site with `?preview=<variantId>` for the signed-in owner only. It also has 「複製成新版本」.

All copy is Traditional Chinese with Taiwan usage. Empty states explain the next step.

### Apply-time adjustments

- Case order applies on the home case shelf and the résumé's key results only. The portfolio's full case list keeps the main order, because its rows and table of contents carry index numbers that a re-order would contradict.
- The admin uses a thin fetch client (`lib/adminApi.ts`) instead of the `pocketbase` SDK. It needs only sign-in, list, save, and one upload. The session is stored under the SDK's key and shape, so `?preview=` still recognises the owner.
- The owner account is created with a custom `./pocketbase owner EMAIL PASSWORD` command (from `pb_hooks`), so setup never needs the PocketBase dashboard.
- Featured skill numbers (01, 02, ...) come from a CSS counter, so a tailored order keeps them in display order.
- `PB_ORIGINS` (comma-separated) sets the backend's CORS origins; the default is the production site.

## Implementation Contract

**Behavior**

- A visitor opening `/resume/?s=acme`, where application `acme` is bound to variant V, sees V's overrides in the active locale on the résumé and on any page they open next in the same tab session. The URL still ends up with `utm_source=acme` for Umami, as it does today.
- A visitor with an unknown code, a code without a variant, a slow backend (> 1,200 ms), or the backend down sees the main copy. Overridable fields are hidden for at most 1,200 ms, and the layout does not shift.
- A visitor without any code sees today's site, byte-for-byte equivalent HTML apart from wrapper attributes, with no added network requests.
- `/admin/` without a session shows a Chinese login form. After login, it shows the 投遞 view. Wrong credentials show 「帳號或密碼錯誤」. PocketBase rate limits apply.
- Editing a locked variant is rejected by the backend with HTTP 400 and the message 「這個版本已經寄出，請複製成新版本再修改」, which the admin shows as is.
- 「產生追蹤網址」 validates the code with the shared pattern and refuses a code that already exists in `applications` (codes are unique in the backend). It builds the URL in the same shape as `pnpm utm`, using the page and locale chosen in the form.
- The number check warns, without blocking, when an override contains a numeric token such as `+233%`, `1,000 萬`, or `NT$1 億` that is absent from the main copy's numeric set.

**Interfaces / data shapes**

- `variants` collection: `name` (text, required), `note` (text), `zh` (json), `en` (json), `created` and `updated` (autodate).
- `applications` gains `variant` (relation → variants, single, optional). `trackingCode` gets a unique index when non-empty. All rules become `@request.auth.collectionName = "owners"`.
- `owners` auth collection: email and password only, with no self-registration (create rule null).
- `GET /api/variant/{code}` → `200 { zh: Overlay, en: Overlay }` or `404 { message }`.
- `GET /api/stats?codes=` → `200 [{ code, views, visits, lastSeen | null }]`, `401` without an owner token, and `503 { message }` when Umami fails.
- `out/version.json`: `{ commit, builtAt }`. `out/admin/base.json`: `AdminBase` in `lib/adminBase.ts`, `{ zh: LocaleBase, en: LocaleBase, numbers: string[] }`, where `LocaleBase` is `{ text: Record<TextKey, string>, skills: { id, name, statement, summary }[], experience: { id, org, role, bullets: string[] }[], cases: { id, title }[] }` (work cases only, in main order).
- Site config: one exported constant for the backend origin, next to `SITE_ORIGIN`. When it is empty, variants and the admin are disabled.

**Failure modes**

- The store swallows network and parse errors (console.warn only) and falls back to the main copy.
- An overlay with unknown keys or wrong types ignores those keys field by field and never throws.
- A `?preview=` request without an owner session is ignored.

**Acceptance criteria**

- Unit tests for the overlay merge (sparse keys, bullet index validation, unknown keys, reorder with missing ids) and for code resolution order.
- Build output check: a no-code visitor page has no request to the backend origin, and `version.json` and `admin/base.json` exist.
- Backend tests run with the PocketBase binary and a scratch data dir: anonymous list of `applications` returns empty or forbidden, the variant endpoint never includes private fields, a locked variant update is rejected, and owner-only stats return 401 anonymously.
- Manual check in Chrome at desktop and mobile widths, light and dark: `/resume/?s=<code>` shows the variant with no visible swap, `/admin/` login, both views, lock flow, and copy link.
- `bash scripts/check-copy.sh` and `pnpm typecheck` pass. The admin copy has no mainland vocabulary.

**Scope boundaries**

- In scope: the overridable keys listed above, the admin's two views, the backend collections, routes, and hooks, build artifacts, docs, and Zeabur variables.
- Out of scope: the Non-Goals above, emails or notifications, PDF generation, and migrating existing tracked links (they keep working and simply have no variant).

## Risks / Trade-offs

- [A recruiter compares a variant link with the plain site and sees different emphasis] → Overrides are limited to emphasis fields, numbers are checked against the main copy, and facts stay shared.
- [Hidden fields for up to 1.2 s on slow networks] → Only code-carrying visitors are affected, layout is preserved, and the timeout falls back to the main copy.
- [Guessable codes expose a variant's copy] → The endpoint returns only copy intended for a recruiter, never private fields.
- [Owner token in localStorage is exposed to XSS on the site origin] → The site has no user-generated content, the token only reaches owner-scoped collections, and superuser credentials never touch the site.
- [Umami API shape differs from expectations] → Verify with one real call during apply, and degrade to 「無法取得」.
- [Zeabur build has no `.git`, so the commit is unknown] → Use Zeabur's commit env var if present, otherwise `unknown`, and let the admin field stay editable.
- [Full Noto Sans TC adds weight for variant visitors] → It is loaded only when needed, and unicode-range slicing fetches only the missing glyphs.

## Migration Plan

1. Backend: add the migrations (`owners`, `variants`, the `applications.variant` relation, rules) and `pb_hooks`. Create the owner with `./pocketbase superuser`-style CLI access through a documented one-off command. Set `UMAMI_API_KEY` in Zeabur.
2. Deploy the backend first. The existing site keeps working because it doesn't call the backend yet.
3. Site: ship the wrappers, store, admin route, and build artifacts, with the backend origin set. Deploy.
4. Rollback: clear the backend origin constant and redeploy the site. All visitors then see the main copy and `/admin/` shows a "後台未設定" notice. The backend data is untouched.

## Open Questions

- Backend public domain: a `*.zeabur.app` subdomain or a custom subdomain such as `admin.<domain>`. Kevin decides during deploy. It only affects the config constant and CORS.
- Whether `/admin/` should also exist under `/en/`. The default is no.
