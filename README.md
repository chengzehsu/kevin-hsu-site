# Kevin Hsu · 許承澤 personal site

Bilingual portfolio for a product manager. Traditional Chinese at `/`, English at `/en/`.

- Next.js 16 (App Router, `output: 'export'`), Tailwind v4, native CSS motion
- Content lives in `content/zh.ts` and `content/en.ts`; both must satisfy `content/types.ts`
- Homepage: concise profile, three outcome metrics, expandable work history, and inline case studies
- Case summaries expose ownership and outcomes. Native `<details>` reveals the full text without leaving the page, including without JavaScript.
- Shareable cases at `/cases/[id]/` and `/en/cases/[id]/` use the same content and evidence as the inline version.
- The optional 8-second workflow film loads only after clicking its control inside the grocery case. The decision experiment is no longer part of the site.
- Off-white/cobalt tokens in `app/globals.css`; locally hosted Geist and Noto Sans TC
- Light and dark themes follow the system initially; the navigation switch stores an explicit visitor choice.

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck
pnpm build          # static output in out/
bash scripts/check-copy.sh
node --test scripts/test-site-output.mjs
node --experimental-strip-types --test scripts/test-flow-simulation.mjs
```

## Deploy

Zeabur hosts `out/` as a static site via `zbpack.json` (`build_command` + `output_dir`). A Cloudflare Worker named `chengzeresume` serves the same build in parallel as a trial: Workers Builds runs `npx wrangler deploy` on each push to `main`, and `wrangler.jsonc` sets the build command, its variables, and `out/` as static assets (`https://chengzeresume.kevin492625.workers.dev`). `public/_headers` sets the Open Graph image type and caches hashed assets there; other hosts ignore it.

Build variables:

- `NEXT_PUBLIC_SITE_ORIGIN`: the host for canonical and hreflang URLs, Umami counting, and `pnpm utm` links (default `https://chengzeresume.zeabur.app`). The Cloudflare build pins it to the Zeabur origin in `wrangler.jsonc`, so the mirror points every canonical and tracking link at Zeabur and never loads Umami.
- `NEXT_PUBLIC_BACKEND_ORIGIN`: the PocketBase service; empty turns tailored links and `/admin/` off. A host only reaches it once its origin is listed in the backend's `PB_ORIGINS`.

Cloudflare build variables belong in `wrangler.jsonc`, not the dashboard: dashboard variables under Variables & Secrets are runtime-only and never reach `pnpm build`. To cut over, point the Cloudflare `NEXT_PUBLIC_SITE_ORIGIN` at its own domain and keep Zeabur serving links already sent on `chengzeresume.zeabur.app` until those applications close.

## Media and accessibility

Video is downloaded after an explicit request to view the workflow, when visible and idle. Reduced-motion and data-saving preferences keep the static poster unless the visitor explicitly plays it. Video pauses when hidden; all primary content remains server-rendered and readable without JavaScript. Disclosures respect reduced motion and return keyboard focus to their summary when closed from the bottom. Clipboard failures expose a selectable URL; without JavaScript the share control is a normal link.

Case links preserve their chosen language on direct visits. The language switch opens the equivalent case, and the return link expands that case on the homepage. The browser-language redirect applies only to the homepage.

`scripts/flow-film-scene.js` is the offline Three.js film source, served by `node scripts/serve-flow-film.mjs`. It exposes `window.flowFilm.frame(time)` for deterministic capture. Capture 336 frames at 24 frames per scene-second, then encode at 42 input frames per second and 24 output frames per second for the faster 8-second edit. Crop `(0, 160, 1200, 750)`, scale to 960 × 600, and export H.264 MP4 with `faststart` plus VP9 WebM. These offline scripts are never imported by the site.

After copy changes, regenerate the font subsets with `scripts/subset-fonts.py` and `scripts/subset-og-fonts.py`; both accept a directory containing the OFL font sources listed in the scripts. Generated fonts are committed so deployment does not need network font downloads.
