# Recruiter reading flow

User-approved direction: compact homepage summaries, inline expansion, and standalone URLs for sharing. Reading cases on the homepage must not require round-trip navigation. Remove the "Try a decision" entry and its modal.

- Keep the existing palette, content sources, static deployment, and bilingual routes.
- Show profile, three representative outcomes, work-history overview, case summaries, recognition, and contact in that order. Full role details remain available inline; case narratives carry the working method.
- Each case initially shows project, period, ownership, and outcome. Native details exposes the full narrative and evidence without JavaScript. Expanding one does not forcibly close another or change the URL.
- Use intrinsic-size transitions where supported and respect reduced motion. Closing from the bottom returns focus and scroll to the summary before collapsing.
- Inline and standalone cases share the same narrative component. Generate all four cases in both languages at build time.
- Share controls copy the current origin's case URL, acknowledge success, and expose a selectable link if clipboard access fails. Without JavaScript they remain ordinary links.
- Standalone cases have individual canonical and alternate-language URLs. Explicit case URLs are not redirected by the browser-language preference. Switching language preserves the case, and returning to the homepage opens the relevant disclosure.
- Move the workflow film into the grocery case and load it only on request. Remove the decision experiment import, entry, and dialog from the delivered site.

Validation: TypeScript, production static export, existing copy checks, output checks for both languages and all routes, browser checks for expansion/collapse, keyboard focus, clipboard fallback, no-JavaScript disclosure, reduced motion, direct visits, locale changes, return anchors, and mobile overflow.
