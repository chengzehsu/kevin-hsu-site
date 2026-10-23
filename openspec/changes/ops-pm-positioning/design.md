## Context

The site is a bilingual (zh at `/`, en at `/en/`) Next.js static export. All copy lives in `content/zh.ts` and `content/en.ts` against the `SiteContent` type; case pages render from `cases.items` plus per-case artifacts in `content/caseArtifacts.ts`. Case order comes from `rank` (`lib/cases.ts`), and the same order feeds the home shelf (text-free portrait posters in `public/case-posters/`), `/portfolio/`, the résumé, and the admin (`lib/adminBase.ts`).

Evidence for the new positioning was gathered on 2026-10-23 from three sources, all read-only:

- The Ecofirst collection-monitoring repo (`~/Documents/01_projects/point_table_management`): intent → Spectra proposal → AI implementation → cross-model review → MR → CI → manual deploy → archive; 748 non-merge commits on main by Kevin (2026-04-14 to 2026-10-23); 21 incident-derived evals run by hand; 18 intents, 11 specs, 317 test files.
- Kevin's Ecofirst handoff pages in Notion: the operating system (ticket templates, 32 h/week capacity baseline, automatic rush-order flag, kickoff rules rewritten after a delay), the presales tier rule built on 735 tasks / ~920 h / 51% single-site customisation, six Notion AI schedules that only propose until three rounds at ≥90% adoption, and the org systems (grading, skill tree, onboarding).
- A market scan (9 full postings, ~10 summaries; 104 AI talent report 2026): transformation PMs and AI-native product engineers ask for process mapping, systems and data, delivery, AI adoption, and measured results; few candidates can explain how they decide whether AI output is trustworthy.

Two real postings prompted this change (a bakery-ingredient supplier's digital-transformation PM, a tea chain's AI-native product engineer). Neither company is named or quoted on the site.

## Goals / Non-Goals

**Goals:**

- A hiring manager for a transformation or AI-native role recognises the five traits they want within the hero, the capability block, and the first case.
- The internal back office becomes a readable illustrated case with five real, anonymised screens.
- Work less related to PM appears as clearly labelled add-on value, not as competing headlines.
- Every number survives interviewer follow-up.

**Non-Goals:**

- Hero headline, kicker, three trait rows, and the launch film (including 「2 個月 218 次提交」) do not change.
- No new tailored variant in the admin; this is the main-site copy.
- No new metric claims for the back office (no before/after speed data exists).
- No case page for the org systems; no screenshot of any Notion page.
- No naming or quoting of any hiring company.

## Decisions

### Positioning copy: PM core with five traits

Rewrite the hero profile, meta description, capability block, contact text, and résumé headline/summary/keywords around five traits. Draft zh copy (en follows in American English):

- Hero profile 定位: 「Product Manager · 營運流程數位化、內部系統與 AI 導入」
- Hero profile 產品領域: 「AI 節能（B2B）、電商訂單到交付、健康 App、跨通路資料平台、企業培訓」
- Hero profile 求職目標: 「正在數位轉型的企業與成長期產品團隊：把現場流程變成系統，讓 AI 真正進到日常營運」
- Contact text: 「正在尋找數位轉型中的企業與成長期產品團隊，特別是想讓 AI 真正進到日常營運的團隊。歡迎聊聊職缺，或你們正在推動的改變。」
- Résumé headline: 「Product Manager｜營運流程數位化、內部系統與 AI 導入」

Alternative considered: a dual headline aimed at both PM and engineer readers. Rejected because Kevin chose PM as the core and building as part of PM work.

### Five core capabilities with evidence links

The capability block grows from three to five cards, each with a statement, one evidence line, and a case link:

1. 流程梳理｜走進現場，畫出跨部門流程，找出等待、重複作業與資料斷點。證據：業務到 RD 接成一條線；揀貨 300 → 1,000 單／日 (+233%)。→ ecofirst, grocery
2. 系統與資料｜先把資料定義講清楚，系統才判得準。證據：內部後台把應收、實收、無法判定分開；1,000 萬筆跨通路資料。→ internal-backend, cdp
3. 商業判斷｜用數據決定先做什麼、不做什麼。證據：735 張任務裡 51% 是單一案場客製，報價改成 S/M/L/XL；18 條人設門檻規則抓到 0 個異常，改成零設定優先。→ ecofirst, internal-backend
4. AI 導入｜AI 先提案、人來拍板，準了才放手；原型自己用 Claude Code 做。證據：Notion AI 排程先只提案，連續 3 輪採納率 90% 以上才自動寫入；內部後台由我獨立完成，到 2026/10 累積 748 次提交。→ internal-backend, ecofirst
5. 成效驗證｜每個成果都寫明怎麼量。證據：+233%、+66%、交付效率 +50%，都附導入前後的比較方式。→ grocery, health-app, ecofirst

If the capability component's layout assumes three cards, it is adjusted to five without changing the section's visual language.

### Operations-optimisation add-on under the Ecofirst role

Add an optional `extras` block to an experience item (`{ title: string; bullets: string[] }`) rendered after the role's bullets, titled 「另外協助公司營運優化」 / "Also improved how the company runs". Three bullets:

- 維護軟體部職等與考核制度，設計技能樹：每項技能要當場驗收，達標＝至少 1 人精熟、2 人能做，降低單點人員風險。
- 業務會議的問答由 AI 每週起草成 FAQ，只有業務確認過的答案才能被引用，價格、合約類標記高敏感。
- 入離職帳號權限流程化；離職前完成資產盤點、權限移交與具名接手人。

Alternative considered: a separate section or case. Rejected: Kevin framed this as add-on value.

### Presales decision-log entry on the Ecofirst case

Add to `decisionLog`: call 「售前不報人天，改報 S/M/L/XL 等級；合約寫『資料齊備後 N 週』，不寫『簽約後 N 週』。」, signal 「2026/1～7 共 735 張任務、約 920 小時，51% 花在單一案場客製。」, outcome 「範疇沒鎖就不報日期；XL 先走付費評估。這組數字是導入前的基準，用來做判斷，不是成果。」

### Internal back office as an article-style fifth work case

New case id `internal-backend`, title 「內部後台：一眼看出問題在哪」, org 台灣愛淨 Ecofirst, period 2026/4 - 2026/10, rank 1 (Kevin's strongest evidence for the target readers; the other work cases shift down one). It keeps every existing `CaseStudy` field so the wall, résumé, and admin keep working, and adds an optional `article` field:

```ts
interface CaseArticle {
  lead: string; // the scene a reader recognises from their own company
  sections: Array<{
    id: string; // anchor
    trait: string; // e.g. 「流程梳理」
    heading: string;
    paragraphs: string[];
    figure?: {
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    };
  }>;
  closing: string; // evidence plus a plain invitation to talk
}
```

`CasePage` renders `article` (when present) as the main chapter after the headline, before the decision log; other cases render exactly as today.

Article outline (zh; en mirrors it):

- Lead: 客戶問 → PM 問工程師 → 工程師翻 Excel 才能回答；點位表散在各案場、各版本，工程師離職就斷了。
- 系統與資料｜先給判決，再給資料 — figure: 收值總覽 (each site one verdict line; 「1 台有問題 · 21 台已檢查」). Why devices, not rules, are the unit (17 台已檢查／4 台有問題 vs 判 37、違規 4、沒測到 73; 244 cards merged into 12).
- 流程梳理｜問題要交到對的人手上 — figure: 案場收值健康 (「339 個點位常常缺值 · 22 台已檢查」, cards like 「CHL01 流量出現負值 −126.67 LPM」 tagged 交給收值工程師／交給現場). One-visit collection plan for field PMs.
- 成效驗證｜用數據推翻自己 — figure: 監控規則 (new rules trial for 7 days before going live). 26 rules × 8,129 rows; 18 threshold rules caught 0; the five-pillar overview Kevin built and then rejected after trying it.
- 商業判斷｜系統能判斷的交給系統 — figure: 規則編輯器 (對誰／什麼時候判／什麼情況算異常／持續多久, plus a plain-language reading).
- AI 導入｜用 AI 把後台做出來，也用流程管住 AI — figure: 時序圖 (4 chillers, 資料到齊 98.5%). intent → proposal → cross-model review → manual deploy → archive; 21 incidents turned into checks run by hand; one feature took about 27 hours from proposal to archive, with field acceptance honestly left unchecked; 218 commits in the first two months, 748 by 2026/10.
- Closing: one line of evidence and an invitation to talk; no pitch, no 90-day plan.

Headline artifact (`caseArtifacts`): value 「34」, unit 「個案場」, label 「一個畫面判讀收值（2026/10）」, also 「748 次提交，獨立完成」. Poster: a new text-free portrait poster from `scripts/case-posters.py`.

Alternative considered: extending the Ecofirst case. Rejected by Kevin in favour of a fifth case.

### Screenshot treatment and anonymisation

Raw captures (1568 px wide, anonymised in the browser by replacing every site name, slug, cloud site id, and edge id with 「案場 NN」/`site-NN`) are kept outside the repo. A script crops each to the region that carries its decision, adds a neutral window frame and soft shadow, and writes WebP (one size, ≤ 1600 px wide) to `public/portfolio-artifacts/internal-backend-*.webp`. No text is burned in; captions live in content so zh and en share images. Before publishing, every final image is inspected for real customer names and for UI words the mask may have corrupted (tokens split from site names such as 主機房).

### Inventory, posters, and ordering for five work cases

`cases.inventory` becomes 「5 個工作案例＋2 個個人專案」 / "5 work cases + 2 side projects"; every place that states the count follows. The home shelf shows five posters; `scripts/test-site-output.mjs` changes its four-poster assertion to five and checks the new case page exists in both locales.

### Ecofirst end date after 2026-10-30

The Ecofirst role and case period switch from 「現在」 to 「2025/3 - 2026/10」 in a separate commit deployed on or after 2026-10-30.

## Implementation Contract

- **Behavior**: `/` and `/en/` show the new hero profile, five capability cards with working case links, the AI habits evidence line, the Ecofirst add-on block, and the new contact text. `/cases/internal-backend/` and `/en/cases/internal-backend/` render the article with five figures and captions, plus the usual header, decision log, and back links. `/portfolio/`, the home shelf, and `/resume/` list five work cases in rank order; the inventory line reads 5＋2 everywhere.
- **Data shape**: `CaseStudy.article?: CaseArticle` and `ExperienceItem.extras?: { title: string; bullets: string[] }` are optional; existing cases and roles without them render unchanged.
- **Failure modes**: a case without `article` renders the existing layout; a missing figure file fails the build-time output test rather than shipping a broken image.
- **Acceptance**: `pnpm exec next build --webpack` passes; `node scripts/test-site-output.mjs` passes with the five-poster and new-case assertions; `scripts/check-copy.sh` passes (no en dashes in en); the CJK font subset is regenerated; a visual check of every page on desktop and mobile, light and dark, through the user's local `serve out`; each figure inspected for anonymisation leaks.
- **In scope**: copy in zh and en, the two optional fields and their rendering, the new case and its assets, inventory/poster/test updates, the dated period change.
- **Out of scope**: hero headline/kicker/traits, the launch film, admin variants, any new metric claim, Notion screenshots.

## Risks / Trade-offs

- [Claims outrun evidence] → Each claim maps to a source in `intent/ops-pm-positioning.md`; org systems are worded as "maintained/designed", the 51% figure as a baseline, the 27 hours as proposal-to-archive.
- [Screens leak customer identity] → Mask in the browser before capture, then inspect every exported image; never use the war-room page (its numbers are demo data).
- [Five posters crowd the home shelf on mobile] → Verify at 375 px; posters stay text-free and sized for the longer en copy.
- [Site counts look inconsistent (34 vs 50)] → State 「平台接上 34 個案場（2026/10）」 with its date.
- [Font subset misses new characters] → Re-run `scripts/subset-fonts.py` after copy changes.
- [Commit counts collide (218 vs 748)] → Write them as a continuation: first two months 218, 748 by 2026/10.

## Migration Plan

Ship as normal commits on `main` and deploy the static build to the Cloudflare Worker. Rollback is a revert of those commits. The period change ships separately on or after 2026-10-30.

## Open Questions

- Whether the back office should take rank 1 or sit after the existing four is Kevin's call; this design assumes rank 1.
