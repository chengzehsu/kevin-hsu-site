## Why

Kevin is job hunting and each role stresses different strengths (process redesign, systems rollout, AI adoption), but the site ships one copy for everyone. The existing tracked links (`?s=code` → Umami) only reveal whether a link was opened. Nothing records who received which link, what the role asked for, or which version they saw. The stopgap PocketBase dashboard is English-only and generic, and Kevin finds it unusable for daily work.

## What Changes

- Add **variants**: named overrides for the few fields a recruiter reads first (headline, résumé summary and keywords, featured skill order and copy, highlighted experience bullets, case order), one set per locale. All other content stays shared with the main site.
- Bind each **application** (company, role, job link, requirements, status, applied date, résumé PDF, notes) to one variant and one tracking code. The site version (commit) live at send time is recorded automatically.
- The site renders the bound variant when a visitor arrives through that application's tracked link and keeps it for the rest of the visit. Visitors without a code, or whose code fails to resolve, always see the main site with no broken layout and no visible content swap.
- A variant is locked once an application that uses it has been sent. Changes create a copy, so what a company saw stays a snapshot.
- Add a Chinese admin at `/admin/` on the site, styled with the site's design language, behind an owner-only login. It lists applications with open counts and last-open time from Umami, and lets Kevin edit variants side by side with the main copy, preview them, and generate tracking links under the same rules as `pnpm utm`. Day-to-day work never needs the PocketBase dashboard.
- The backend (`backend/`, PocketBase) gains an owner auth collection, a variants collection, a public read-only variant endpoint that returns copy only, and an owner-only Umami stats proxy that keeps the API key server-side.

## Non-Goals (optional)

See design.md.

## Capabilities

### New Capabilities

- `tailored-variants`: how the public site resolves a tracking code to a variant, applies its overrides, persists it for the visit, and falls back to the main copy.
- `application-admin`: the owner-only Chinese admin for applications and variants, including login, locking, number-consistency warnings, preview, and tracking-link generation.
- `link-analytics`: per-application open counts and last-open time pulled from Umami through the backend.

### Modified Capabilities

(none)

## Impact

- Affected specs: `tailored-variants`, `application-admin`, `link-analytics` (all new).
- Affected code:
  - Site: `components/` (variant-aware wrappers on hero, résumé, skills, timeline, case order), `app/(zh)/admin/` (new route), `lib/analytics.ts` (shared code resolution), `content/` (stable keys for bullets and cards), `app/globals.css`, build step that emits public base copy and the site version.
  - Backend: `backend/pb_migrations/` (owners, variants, application relation and rules), new `backend/pb_hooks/` (variant endpoint, stats proxy, lock enforcement), `backend/README.md`.
- No new dependency: the admin uses a thin fetch client (`lib/adminApi.ts`) that stores the session under the `pocketbase` SDK's key and shape (see design.md, Apply-time adjustments).
- New secrets in Zeabur: `UMAMI_API_KEY` on the backend service.
- Deploy: the static site keeps its current Zeabur setup. It reads the backend URL from one config value and degrades to the main copy if the backend is down.
