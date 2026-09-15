# Kevin Hsu · 許承澤 personal site

Bilingual one-page portfolio for a product manager. Traditional Chinese at `/`, English at `/en/`.

- Next.js 16 (App Router, `output: 'export'`), Tailwind v4, native CSS motion
- Content lives in `content/zh.ts` and `content/en.ts`; both must satisfy `content/types.ts`
- First screen: an 8-second pre-rendered workflow film in `components/FlowPreview.tsx`
- Optional Three.js experiment loads only when opened; its deterministic model is in `lib/flowSimulation.ts`
- Off-white/cobalt tokens in `app/globals.css`; locally hosted Manrope and Noto Sans TC

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck
pnpm build          # static output in out/
bash scripts/check-copy.sh
node --experimental-strip-types --test scripts/test-flow-simulation.mjs
```

## Deploy

Zeabur hosts `out/` as a static site via `zbpack.json` (`build_command` + `output_dir`).

`NEXT_PUBLIC_SITE_ORIGIN` can override the default `https://chengzeresume.zeabur.app` used for canonical and hreflang URLs.

## Media and accessibility

The hero poster is immediately available. Video is downloaded after page load, when visible and idle. Reduced-motion and data-saving preferences keep the static poster unless the visitor explicitly plays it. Video and the optional experiment pause when hidden; all primary content remains server-rendered and readable without JavaScript.

`scripts/flow-film-scene.js` is the offline Three.js film source, served by `node scripts/serve-flow-film.mjs`. It exposes `window.flowFilm.frame(time)` for deterministic capture. Capture 336 frames at 24 frames per scene-second, then encode at 42 input frames per second and 24 output frames per second for the faster 8-second edit. Crop `(0, 160, 1200, 750)`, scale to 960 × 600, and export H.264 MP4 with `faststart` plus VP9 WebM. These offline scripts are never imported by the site.

After copy changes, regenerate the font subsets with `scripts/subset-fonts.py` and `scripts/subset-og-fonts.py`; both accept a directory containing the OFL font sources listed in the scripts. Generated fonts are committed so deployment does not need network font downloads.
