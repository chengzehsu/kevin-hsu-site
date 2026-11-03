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

- [ ] 4.1 Re-check every film claim against the final site: positioning, title, the +20% and -30% decisions, and 218 versus 748 commits
- [ ] 4.2 Run `hyperframes check`, then render zh and en from videos/kevin-launch-film with `--variables` lang (needs Chrome, so outside the sandbox)
- [ ] 4.3 Check the changed frames: the efficiency beat, the 2025 chapter, and the end card, in both languages
- [ ] 4.4 Encode public/hero-reel.{zh,en}.{mp4,webm} at 960x600 and refresh hero-reel-poster and its small version from the end card
- [ ] 4.5 Re-extract portfolio-wall film-4 and film-8, then run scripts/wall-thumbs.py
- [ ] 4.6 Put film-8 back on the control-strategy cover (it now shares tools.svg), allow both frames on the walls, and drop their guard in scripts/test-site-output.mjs
- [ ] 4.8 Re-check the `resume-site` figure (7 weeks, 86 commits) against git at content freeze, and check its cover and wall tile show the new end card
- [ ] 4.7 Match hero.film summary, caption, and chapters in zh.ts and en.ts to the final film, and update STORYBOARD.md

## 6. Design tokens (next)

- [ ] 6.1 Spacing: replace about 218 distinct padding, margin, and gap values with an 8-step scale, in reviewable batches, checking each batch in Aside
- [ ] 6.2 Text rhythm: reduce line-height (28 values), letter-spacing (36), and font-weight (13) to role tokens
- [ ] 6.3 Surfaces: reduce box-shadow (17 values) to 2 or 3 levels and use the radius tokens everywhere
- [ ] 6.4 Motion: reduce durations and easing curves to a few tokens
- [ ] 6.5 Layout: reduce breakpoints (767, 768, 860, 560, 380, 640, 1023, 1024) to 640, 768, and 1024, and name the z-index layers
- [ ] 6.6 Color: replace the 32 hard-coded colors with tokens and check both themes
- [ ] 6.7 Add a test for each token group, as the type scale has, and keep the résumé out of scope because it is fitted to A4

## 7. Frontend basics (next)

- [ ] 7.1 Responsive images: generate several widths with srcset and stop lazy-loading the first-screen image
- [ ] 7.2 Check hover and focus-visible states match on every interactive element
- [ ] 7.3 Update theme-color when a visitor switches theme by hand; it follows only the system setting now
- [ ] 7.4 Decide on a Content-Security-Policy; the theme, language, and analytics scripts are inline
- [ ] 7.5 Align the home hero with the page grid; it starts further left than the sections below it

## 8. Copy and facts to settle

- [ ] 8.1 Ask Kevin: are "machine misses one to two tenths" and "93% right first time" different scopes, and which of 一成多 and 一到兩成 is right
- [ ] 8.2 Ask Kevin to confirm: the AI energy figure (4-5 rounds to 1-2, internal estimate), the wording of 34 sites, and C111 as a company process
- [ ] 8.3 Ask Kevin: what A32 "reversed order" became is written as "run the no-setup checks first"; confirm it
- [ ] 8.4 Stop page stats repeating the hero figure on sales-faq, life-hub, and internal-backend
- [ ] 8.5 Add "team result" where only meta descriptions and next-case links lack it (health-app impact, grocery 120%)
- [ ] 8.6 Compare the résumé skill lists: zh has 7 under platform and data, en has 5
- [ ] 8.7 Update content/linkedin-sync.md, which still has +50%, +20%, and the old positioning
- [ ] 8.8 Have a reviewer read the last copy fixes (new and existing sites, life-hub wording), which only had automated checks

## 9. After deploy

- [ ] 9.1 Confirm the first Workers build passes with tests in the build command
- [ ] 9.2 Check headers, /sitemap.xml, /robots.txt, and the /cases/podcast-stock/ redirect with curl
- [ ] 9.3 Refresh the share previews in LinkedIn Post Inspector, because the OG image changed
- [ ] 9.4 Run spectra archive once the sections above are done
