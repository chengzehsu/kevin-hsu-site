## Context

The site is a static Next.js export with zh and en content files. The audience is recruiters and hiring managers scanning quickly. Tailored links select bullets by index but are not in use, so reordering is safe. URLs and existing anchors must keep working.

## Goals / Non-Goals

**Goals:** each page has one job; one positioning and title; one case skeleton; one source for experience and home results; less on the home page.

**Non-Goals:** a new visual language, new routes, updating LinkedIn copy.

## Decisions

### Page jobs

Home decides, portfolio proves, cases explain, résumé checks. Content leaves the home page only when another page still holds it, so the full AI section moves to the portfolio and keeps the `linkedin-posts` id.

### Featured cases come from rank

The first four work cases by rank are the featured set on home and portfolio: internal back office, grocery, health app, CDP. Ecofirst moves to rank 5 as an overview linking its sub-cases.

### One case skeleton

Every case renders problem, decision, result with measurement, what was built, then the article when present. The `standalone` flag goes away. Decision logs collapse by default.

### Experience is the source

Résumé wording moves into `experience`, and `resume.ts` keeps page copy only. Long stray bullets are dropped because the case pages carry that detail.

### Home results use strings

Results such as "about 2 weeks to about 2 hours" cannot be numbers, so metrics become string values from `content/facts.ts`, each linking to a case.

### Signature motion stays

Kevin rejected removing the film and walls: they are how the site shows product craft. They stay and get better. The film text moves to current claims and titles, the portfolio wall becomes a clickable index of real work, and the radar returns with one line per core skill.

### Portfolio is one card grid

Every case sits in one rank-ordered grid with no tiers. The internal back office and this site are wide cards, so ten cases fill a 3 by 4 grid with no empty cell. Each card keeps `id={item.id}` so `/portfolio/#id` links still land. Cards drop the decision text, organization, and period. On phones cards become compact rows. The wall stays behind a shorter hero, and the facts strip goes because home and résumé hold those facts. This replaces the portfolio half of "Featured cases come from rank"; the home page keeps its first four.

### AI section becomes a compact list

The AI-only projects leave the tabs and covers for a compact list below the grid. Each row still expands to its pain point, AI and human split, and source, so no evidence is lost. The section keeps the `linkedin-posts` id.

### Capabilities are written per project

Each case gets `capabilities: { used: string[]; grown: string[] }`, written in project-specific words. Cards show the first two used and the first grown. Case first screens show both lists under their own labels. The first draft came from the case content; Kevin approved it on 2026-11-03 and can correct the wording later.

### Case pages open with a first screen

The first screen holds title, headline figure, `decisionSummary`, capabilities, role, scope, collaboration, and the main image. The existing skeleton stays in order behind one `Disclosure` with the existing server-rendered content. The chapter navigator goes because there is nothing visible to jump to on arrival. Links with a chapter hash open the disclosure.

### This site as a case

A new side case, id `resume-site`. Claims come from the repo: positioning iterations in git history, a film generated from HTML in both languages, a CSS 3D wall of real work that links to cases, push-to-deploy on Cloudflare Workers, and build-output assertions that block retired claims. AI and human roles are stated. The admin is excluded because no host is connected.

### One type scale

Kevin asked for type sizes that follow a design system instead of everything being large. `app/globals.css` defines eight role tokens (caption 12, small 14, body 16, lead 18, h3 20, h2 up to 28, h1 up to 36, display up to 48), and every size outside the résumé uses them. Section titles are h2. On a case page the result figure is the one display element and the title is h1. The résumé keeps its own sizes because they are fitted to two A4 pages, and a test blocks literal sizes elsewhere. Tokens follow role, not old size: a paragraph is always lead or body, whatever it says, and only headings and figures use heading sizes. A chapter heading must never be smaller than the text under it.

### Figures must read alone

A card figure has to make sense to a recruiter who knows nothing about the company: number first, then what it counts. Ratios such as 51 / 185 and commit counts as headlines are out; Sales FAQ reads "51 answers reps can look up", and commit counts move into the caption. `result` is a list of one outcome per line.

## Risks / Trade-offs

- [Unverified visuals] Layout changes cannot be seen from this sandbox. Mitigation: capture every page through Aside before calling it done.
- [Thin figure] 7 weeks and 86 commits shows effort rather than outcome. Mitigation: replace it when Kevin has a recruiter or interview figure; the count must be re-checked at content freeze.
- [Hidden detail] Collapsing most of a case can hide evidence from a reader who does not open it. Mitigation: the measurement summary stays beside the figure, and the content stays in the HTML.
- [Dropped detail] Some experience bullets disappear. Mitigation: git keeps them, and the cases hold the evidence.
- [Unconfirmed claims] +20% is removed until Kevin confirms how it was measured.
