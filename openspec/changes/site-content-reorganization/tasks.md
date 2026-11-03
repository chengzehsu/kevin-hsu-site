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
