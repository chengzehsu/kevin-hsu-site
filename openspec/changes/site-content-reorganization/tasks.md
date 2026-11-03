## 1. Content source

- [x] 1.1 Add content/facts.ts and string-valued home results linking to cases
- [x] 1.2 Experience is the résumé source: move résumé wording into experience for zh and en, and reduce resume.ts to page copy
- [x] 1.3 One positioning and title: unify positioning and titles, keep topic titles beside result figures, reset ranks, and add Ecofirst related cases
- [x] 1.4 Unconfirmed claims stay off the site: remove the +20% claim and the unused method and builder-loop content

## 2. Pages

- [x] 2.1 Home page supports a quick decision (page jobs): rebuild the home page order with hero screen, results, awards line, and AI picks
- [x] 2.2 Featured cases share one source: feature the first four cases by rank on home and portfolio, with counts from data
- [x] 2.3 Simplify the portfolio hero, drop the wall, and move the full AI section there
- [x] 2.4 Every case follows one skeleton: apply the single case skeleton, remove backdrops and numbering, collapse decision logs
- [x] 2.5 Simplify experience rows and the navigation
- [x] 2.7 Each fact has one main place: trim the AI section, posters, and experience rows, and unify the words
- [x] 2.6 Signature motion stays and carries proof: restore the film, walls, and radar, and make the wall a clickable index

## 3. Verify

- [x] 3.1 Update the site output tests and add the stale claim guard
- [x] 3.2 Regenerate fonts and images, then run typecheck, build, copy checks, and tests
- [x] 3.3 Capture every page on desktop and mobile through Aside and check print page counts

## 5. Card view

- [x] 5.1 Capabilities are written per project: add used and grown capabilities to every case in zh and en
- [x] 5.2 This site is a case: add the `resume-site` side case with cover, headline, and evidence from the repo in zh and en
- [x] 5.3 Portfolio is one card grid: replace the tiers with one grid, two wide cards, compact phone rows, and stable case anchors
- [x] 5.4 Simplify the portfolio hero: shorten it behind the kept wall and remove the facts strip
- [x] 5.5 Turn the AI section into a compact expandable list that keeps the `linkedin-posts` anchor
- [x] 5.6 Case first screen answers value and capability: build the first screen and move the skeleton behind one disclosure, opening it for chapter links
- [x] 5.7 Remove the Stock Gods Fight leftovers and keep its name in the stale guard
- [x] 5.8 Update the site output tests, then run typecheck, build, copy checks, and tests
- [x] 5.10 Foundations: add sitemap, robots, security headers, and theme color with their own tests
- [x] 5.11 Fix review findings: unfilled template in metadata, duplicate ids, wrong film captions, old links, measurement basis on the first screen, and the AI count
- [x] 5.9 One type scale: add the tokens, move every size outside the résumé onto them, and guard literal sizes in the tests
- [x] 5.12 Copy pass: apply the gated wording review in zh and en, one line per result, plain figures, and readable capabilities
- [x] 5.13 Run the tests before every deploy, so the claim about pre-release tests is true

## 4. After all site content is final

- [x] 4.1 Re-check every film claim against the final site: Kevin chose 748 commits over about 6 months, the anonymised platform image, the 2023 row as on the site, and sensor naming in the curious beat (2026-11-03)
- [x] 4.2 Render zh and en: the sandbox blocks the HyperFrames CLI's Chrome, so 2,004 frames per language were captured in Aside at 1600x1000 with the timeline seeked frame by frame; `hyperframes check` has not run
- [x] 4.3 Check the changed frames: the efficiency beat, the 2025 chapter, and the end card, in both languages
- [x] 4.4 Encode public/hero-reel.{zh,en}.{mp4,webm} at 960x600 and refresh hero-reel-poster and its small version from the end card
- [x] 4.5 Re-extract all eight portfolio-wall film frames (film-6 and film-7 also showed retired content), then run scripts/wall-thumbs.py and scripts/responsive-images.py
- [x] 4.6 Put film-8 back on the control-strategy cover with an English frame, drop the guard in scripts/test-site-output.mjs, and guard the film source against retired claims instead
- [x] 4.8 Re-check the `resume-site` figure: 7 weeks holds, 86 commits became "over 90" (98 in git on 2026-11-03), and its cover uses the new end card
- [x] 4.7 Match hero.film summary, caption, and chapters in zh.ts and en.ts to the final film, and update STORYBOARD.md
- [x] 4.9 Film polish Kevin approved: motion in the curious, willing-to-try, and efficiency beats; six axes alone in the rubric scene; every chapter visibly grows its named axes; original music from scripts/film-bgm.py, muted until full screen
- [x] 4.10 Fix the film scrubber: chapter buttons no longer cover it
- [ ] 4.11 Check the live film on Safari and iPhone: Cloudflare static assets ignore Range requests, so seeking or mp4 playback may fail there
- [ ] 4.12 On iPhone, the first press of full screen only starts the film when its sources are not attached yet (reduced motion, before page load); a second press enters. Attaching sources early there changes loading, so verify on a device first
- [ ] 4.13 Ask Kevin: the film's 2025 card says onboarding "works for all 34 sites" without the site's "excluding on-site wiring and control strategy"

## 6. Design tokens (next)

- [x] 6.1 Spacing: replace about 218 distinct padding, margin, and gap values with an 8-step scale, in reviewable batches, checking each batch in Aside
- [x] 6.2 Text rhythm: reduce line-height (28 values), letter-spacing (36), and font-weight (13) to role tokens
- [x] 6.3 Surfaces: reduce box-shadow (17 values) to 2 or 3 levels and use the radius tokens everywhere
- [x] 6.4 Motion: reduce durations and easing curves to a few tokens
- [x] 6.5 Layout: reduce breakpoints (767, 768, 860, 560, 380, 640, 1023, 1024) to 640, 768, and 1024, and name the z-index layers
- [x] 6.6 Color: replace the 32 hard-coded colors with tokens and check both themes
- [x] 6.7 Add a test for each token group, as the type scale has, and keep the résumé out of scope because it is fitted to A4

## 7. Frontend basics (next)

- [x] 7.1 Responsive images: generate several widths with srcset and stop lazy-loading the first-screen image
- [x] 7.2 Check hover and focus-visible states match on every interactive element
- [x] 7.3 Update theme-color when a visitor switches theme by hand; it follows only the system setting now
- [x] 7.4 Decide on a Content-Security-Policy; the theme, language, and analytics scripts are inline
- [x] 7.5 Align the home hero with the page grid; it starts further left than the sections below it

## 8. Copy and facts to settle

- [x] 8.1 Ask Kevin: are "machine misses one to two tenths" and "93% right first time" different scopes, and which of 一成多 and 一到兩成 is right
- [x] 8.2 Ask Kevin to confirm: the AI energy figure (4-5 rounds to 1-2, internal estimate), the wording of 34 sites, and C111 as a company process
- [x] 8.3 Ask Kevin: what A32 "reversed order" became is written as "run the no-setup checks first"; confirm it
- [x] 8.4 Stop page stats repeating the hero figure on sales-faq, life-hub, and internal-backend
- [x] 8.5 Add "team result" where only meta descriptions and next-case links lack it (health-app impact, grocery 120%)
- [x] 8.6 Compare the résumé skill lists: zh has 7 under platform and data, en has 5
- [x] 8.7 Update content/linkedin-sync.md, which still has +50%, +20%, and the old positioning
- [x] 8.8 Have a reviewer read the last copy fixes (new and existing sites, life-hub wording), which only had automated checks
- [ ] 8.9 Ask Kevin, then fix: "新舊案場" and "a new or existing site" (caseArtifacts.ts:55, 178) mix first-time setup with later list changes; what were the about 2 weeks and about 2 hours measured on, and was it both. The same claim is in facts.ts, resume.ts, zh.ts, en.ts, and linkedin-sync.md, so change them together
- [x] 8.10 Align the English "across 34 sites" with the "works for all 34" wording Kevin confirmed
- [ ] 8.11 Ask Kevin, then fix: the internal-backend title says a customer sees a screen in 2 hours, but the body stops at PM upload and data check, and the customer dashboard took 1 day and used simulated figures
- [ ] 8.12 Ask Kevin, then fix: when uploads launched, how much of 9 to 34 came after it, and whether to split that sentence so it does not read as cause and effect
- [ ] 8.13 Ask Kevin: life-hub says daily runs and "runs automatically", but the same case says the daily schedule has been blocked since late May 2026 and now catches up when Claude Code opens; is "daily use" true, and are "data stays with me" and the holdings, tax, and doctor examples fine to publish
- [x] 8.14 Fix the English privacy note on life-hub, which gives a commit count and then says no counts
- [ ] 8.15 Ask Kevin: keep the "4 to 0" chapter stat on internal-backend (it repeats the hero's supporting line), and confirm the LinkedIn file changes: 卓越獎 to 優選, and whether 218 commits there should become 748, and the 93% chapter stat on sensor-naming, which repeats its hero figure
- [ ] 8.16 Remove the orphaned flow scene as one chain: FlowReconfigurationScene.tsx, BuilderLoop.module.css, motion/flowScene.ts, content/flowExperience.ts, lib/flowSimulation.ts, scripts/test-flow-simulation.mjs, and the three dependency, after checking nothing else uses them

- [x] 8.17 Internal-backend case: remove the savings-rate feature and tell the story as three situations (site management, data collection, customer data), per Kevin 2026-11-03. This also drops the repeated "4 to 0" chapter stat from 8.15, and moves its role, scope, and collaboration behind the disclosure so the first screen stays short
- [x] 8.18 Remove the `ecofirst` case per Kevin 2026-11-03: old links redirect to the portfolio, skill links move to the internal-backend and sales-faq cases or the experience row, and its files are deleted. The Ecofirst experience row and resume stay
- [x] 8.19 Retell the sensor-naming case as Kevin described it (mapping workbook, Claude writes the rules, PMs convert and upload themselves), and correct the inventory to 34 sites and 7,110 points per the workbook
- [x] 8.20 Mapping workbook v1 names the skill's dictionary as its source, while the case says Claude wrote the rules from the workbook; Kevin chose to keep the case wording as written (2026-11-03)

## 9. After deploy

- [ ] 9.1 Confirm the first Workers build passes with tests in the build command
- [ ] 9.2 Check headers, /sitemap.xml, /robots.txt, and the /cases/podcast-stock/ redirect with curl
- [ ] 9.3 Refresh the share previews in LinkedIn Post Inspector, because the OG image changed
- [ ] 9.4 Run spectra archive once the sections above are done
