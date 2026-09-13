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
