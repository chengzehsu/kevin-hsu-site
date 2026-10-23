## 1. Data shape for articles and add-ons

- [x] 1.1 Add the optional `CaseStudy.article` (`CaseArticle`: lead, sections with id/trait/heading/paragraphs/optional figure, closing) and `ExperienceItem.extras` (`{ title, bullets }`) types, per "Internal back office as an article-style fifth work case" and "Operations-optimisation add-on under the Ecofirst role". Existing content must still type-check with neither field. Verify with `pnpm exec tsc --noEmit` passing before any content uses the fields.
- [x] 1.2 Render `article` in `CasePage` after the headline and before the decision log (lead, sections with trait label, heading, paragraphs, figure with caption, closing; the chapter rail links to the article with one `#story` anchor), delivering "Article sections with figures". Cases without `article` keep their layout. Verify by building and diffing the generated HTML of `/cases/grocery/` before and after (no change), and by a site-output assertion that a case with `article` renders five `<figure>` elements with captions.
- [x] 1.3 Render `extras` in the experience timeline after a role's bullets, delivering "Operations-optimisation add-on on the Ecofirst role". Verify with a site-output assertion that only the Ecofirst role on `/` and `/en/` contains the add-on title and three bullets.

## 2. Screenshots for the internal back office

- [x] 2.1 Write a script (`scripts/internal-backend-figures.py`) that crops each raw capture to the region carrying its decision, adds a neutral window frame and soft shadow, and writes `public/portfolio-artifacts/internal-backend-{overview,site-health,rules,rule-editor,timeseries}.webp` (≤ 1600 px wide, no burned-in text), per "Screenshot treatment and anonymisation" and "Shared images, captions in content". Verify the five files exist with expected dimensions via `sips -g pixelWidth -g pixelHeight`.
- [x] 2.2 Inspect every exported figure at full size for customer, building, or company names and for interface words altered by the mask, delivering "Screens are anonymised". Verify by a written checklist in the task note (one line per figure: no leak, labels intact); re-capture any figure that fails.

## 3. Internal back office case content

- [x] 3.1 Add the `internal-backend` case to `content/zh.ts` and `content/en.ts` with rank 1 (others shift down) and all standard fields, plus the `article` per the outline in design (lead, 系統與資料, 流程梳理, 成效驗證, AI 應用, 專案推進, closing), delivering "Fifth work case page in both locales" and "Honest article claims". Verify both pages exist in `out/`, and that `grep` finds no "point table", 「點位表管理」, or 「27 小時…上線」 wording in them.
- [x] 3.2 Add the `internal-backend` headline artifact (34 個案場, also 748 次提交) in `content/caseArtifacts.ts` and any evidence entry needed by `content/caseEvidence.ts`, with zh and en captions and alt text pointing at the same image files. Verify the zh and en case pages reference identical figure paths.
- [x] 3.3 Generate a text-free portrait poster `public/case-posters/internal-backend.svg` with `scripts/case-posters.py` and register it in `CASE_POSTERS`, per "Inventory, posters, and ordering for five work cases". Verify the poster renders on the home shelf at 375 px and 1440 px in light and dark without crowding the en copy.

## 4. Site-wide positioning copy

- [x] 4.1 Rewrite the hero profile, meta description, and contact text in zh and en per "Positioning copy: PM core with five traits", delivering "Positioning copy names the PM core" while keeping the headline, kicker, traits, and film unchanged. Verify by diffing built `/` and `/en/` (only the intended blocks change) and reading the profile rows.
- [x] 4.2 Replace the capability block with five cards per "Five core capabilities with evidence links", delivering "Five core capabilities with evidence" and "AI adoption evidence states the guardrail"; adjust the component layout for five cards if it assumes three. Verify with a site-output assertion that each locale has five cards whose links resolve to generated case pages, and a visual check at 375 px and 1440 px.
- [x] 4.3 Add the "AI proposes, a person decides" evidence to the AI habits section without changing its three traits. Verify by reading the rendered section in both locales.
- [x] 4.4 Add the Ecofirst `extras` bullets and the presales entry per "Presales decision-log entry on the Ecofirst case", delivering "Presales decision-log entry". Verify the entry's outcome names the figures a baseline in both locales.
- [ ] 4.5 Update the one-page résumé headline, summary, and keywords in `content/resume.ts` to the new positioning and add the new case's figure. Verify `/resume/` and `/en/resume/` print preview stays one page.
- [x] 4.6 Run a claims sweep over zh and en content for "Claims stay within evidence": no ERP-implementation claim, no hiring-company names, no outcome numbers on org systems, commit counts as 218 → 748. Verify with `grep` checks recorded in the task note and `scripts/check-copy.sh` passing.

## 5. Inventory, ordering, and tests

- [x] 5.1 Change `cases.inventory` and every count mention to 「5 個工作案例＋2 個個人專案」 / "5 work cases + 2 side projects", delivering "Inventory and ordering include five work cases". Verify with `grep` that no 「4 個工作案例」 or "4 work cases" remains in content or components.
- [x] 5.2 Update `scripts/test-site-output.mjs`: five home-shelf posters, the new case pages in both locales, the article figure count, the capability card links, and the add-on placement. Verify `node scripts/test-site-output.mjs` passes after `pnpm exec next build --webpack`.
- [x] 5.3 Confirm the admin case list (`lib/adminBase.ts`) and `admin/base.json` include `internal-backend` in rank order. Verify by reading the generated `out/admin/base.json`.

## 6. Build, fonts, and visual verification

- [x] 6.1 Re-run `python3 scripts/subset-fonts.py <dir with NotoSansTC.ttf>` so the CJK subset covers the new copy. Verify no tofu in the new case page and hero profile in Chrome.
- [x] 6.2 Build with `pnpm exec next build --webpack` and run the site-output and variant tests. Verify both commands exit 0.
- [ ] 6.3 Visual check of every page on desktop and mobile, light and dark, through the user's local `serve out`, with special attention to the new case article, the five-poster shelf, and the five capability cards. Verify by a checklist of pages × viewports × themes in the task note.

## 7. Ecofirst end date

- [ ] 7.1 On or after 2026-10-30, change the Ecofirst role and case period to 「2025/3 - 2026/10」 / "Mar 2025 - Oct 2026" and remove the current-role label, per "Ecofirst end date after 2026-10-30", delivering "Ecofirst period after the last workday". Verify the built pages show no 「現在」 / "Present" on Ecofirst and the site-output test passes.

## Notes

- 2.2 inspection (2026-10-23, full-size review): overview: no leak, labels intact; site-health: no leak, labels intact; rules: no leak (ECO-329 is an internal ticket id); rule-editor: no leak; timeseries: no leak, cropped to the chart panel to drop the point list.
- 4.6 sweep (2026-10-23): no ERP-implementation claim, no hiring-company names, no "point table" or 點位表管理, no 「27 小時…上線」 in content or built pages; commit counts read 218 → 748. Wording pass with speak-human-tw applied 11 zh changes (判決→結論, 裁示→拍板, 比較句→實際值和正常範圍, intent explained, etc.) and their en counterparts.
- 6.1 blocked in the sandbox: pip cannot reach PyPI (SSL verification fails through the proxy), so fontTools is unavailable; the user runs the subset command.
- 6.1 done by the user outside the sandbox (2026-10-23): noto-sans-tc-portfolio.woff2 now 900 characters; rebuild and site-output tests pass.
- UX-writer pass (2026-10-23, user request): rewrote the zh internal-backend page so domain terms are explained or replaced (收值 → 設備資料, 點位 → 感測點, 封存 → 結案, CI → 自動測試), fixed fragment sentences, title shortened to 「內部後台：一眼看出問題在哪」 for phone line breaks; article layout changed to copy above full-width figures, headings break only after commas, figures open full size on tap.
- 6.3 partial: internal-backend case checked on desktop (dark, light) and at 375 px (dark); home shelf and core-skill cards at 375 px. Not yet checked: en pages, /portfolio/, résumé print preview (task 4.5). Seen but out of scope: core-skill statements on phones can break inside a word (e.g. 產／能), same as before this change.
- Review gate (2026-10-23): Codex CLI could not start in the sandbox (`failed to initialize in-process app-server client: Operation not permitted`), so the fallback contract-neutral reviewer ran the fast-review template: ✅ Ready, gate_reason=NONE, 3 P2 + 2 Nit, all fixed (en heading spaces, figure assertion scoped to the article, shelf layout, judgment spelling, task/design wording). Also added internal-backend to `pnpm utm` pages and the admin link pages (reviewer's out-of-scope note).
- Shelf layout: five across crowded the en copy into the motifs, so desktop is now a 3-column grid with the lead case spanning two columns (2 cols on tablets, swipe row on phones); checked zh and en at desktop width and zh at 375 px.
- Second visual pass (2026-10-23, user: blurry screens, too much text, no focus, too much empty space on case cards): re-captured four screens as native-resolution region captures at 150% page zoom (rule list dropped as text-heavy); article cut to one stat plus one short paragraph per section; for article cases the page skips the problem and decision chapters (and the decision log) so nothing repeats; desktop shelf cards are square, and the lead card shows the real overview screen in its top half instead of a poster.
