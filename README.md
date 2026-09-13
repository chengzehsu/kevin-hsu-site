# Kevin Hsu · 許承澤 personal site

Bilingual one-page portfolio for a product manager. Traditional Chinese at `/`, English at `/en/`.

- Next.js 16 (App Router, `output: 'export'`), Tailwind v4, `motion`
- Content lives in `content/zh.ts` and `content/en.ts`; both must satisfy `content/types.ts`
- Signature effect: `components/motion/BottleneckFlow.tsx`

## Develop

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck
pnpm build          # static output in out/
bash scripts/check-copy.sh
```

## Deploy

Zeabur hosts `out/` as a static site via `zbpack.json` (`build_command` + `output_dir`).

Set `NEXT_PUBLIC_SITE_ORIGIN` (e.g. `https://kevin-hsu.zeabur.app`) as a build-time variable in Zeabur so canonical and hreflang URLs point at the real domain; the fallback in `lib/locale.ts` is only a default.
