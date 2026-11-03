// Literal values outside the design tokens in app/globals.css fail here.
// One agent or one file at a time: node --test --test-name-pattern="CasePage" scripts/test-tokens.mjs
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../", import.meta.url);

// Fitted to two A4 pages, not part of the public site, and the film player with its own dark stage.
const EXCLUDED = new Set(["ResumePage.module.css", "admin/admin.module.css", "motion/HeroFilm.module.css"]);
// The wall loops and the radar choreography are signature motion and keep their own durations.
const SIGNATURE_MOTION = new Set(["PortfolioWall.module.css", "SkillsRadar.module.css"]);

const names = (await readdir(new URL("components/", ROOT), { recursive: true }))
  .filter((name) => name.endsWith(".module.css") && !EXCLUDED.has(name));
const files = ["app/globals.css", ...names.map((name) => `components/${name}`)];

const globals = await readFile(new URL("app/globals.css", ROOT), "utf8");
const defined = new Set([...globals.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));

const stripVars = (value) => {
  let out = value;
  let previous;
  do {
    previous = out;
    out = out.replace(/var\([^()]*\)/g, " ");
  } while (out !== previous);
  return out;
};

const declarations = (css) => [...css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/@font-face\s*\{[^}]*\}/g, "")
  .matchAll(/(?:^|[;{\s])(-{0,2}[a-zA-Z][\w-]*)\s*:\s*([^;{}]+)(?=[;}])/g)]
  .map(([, property, value]) => [property, value.replace(/\s*!important\s*$/, "").trim()]);

const LITERAL_LENGTH = /(?<![\w.-])-?(\d*\.?\d+)(rem|px)\b/g;
const hasLiteralLength = (value) => [...stripVars(value).matchAll(LITERAL_LENGTH)]
  .some(([, number, unit]) => unit === "rem" ? Number(number) !== 0 : ![0, 1, 2].includes(Number(number)));
const LITERAL_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(|\b(?:ok)?lch\(\s*[\d.]|\b(?:white|black)\b/;
const LITERAL_DURATION = /(?<![\w.-])(\d*\.?\d+)m?s\b/g;
const hasLiteralDuration = (value) => [...stripVars(value).matchAll(LITERAL_DURATION)].some(([, number]) => Number(number) !== 0);
const hasLiteralEasing = (value) => /cubic-bezier\(|(?<![\w-])ease(?:-in|-out|-in-out)?(?![\w-])/.test(stripVars(value));

function violations(file, css) {
  const found = [];
  const report = (property, value, why) => found.push(`${property}: ${value} (${why})`);
  const isGlobals = file === "app/globals.css";
  const signature = SIGNATURE_MOTION.has(file.replace("components/", ""));

  for (const [property, value] of declarations(css)) {
    const custom = property.startsWith("--");

    if (custom) {
      // Tokens are defined in globals.css. A module may alias a token but not invent a value.
      if (isGlobals) continue;
      if (/gutter|gap|space|pad/.test(property) && hasLiteralLength(value)) report(property, value, "use --space-*");
      if (LITERAL_COLOR.test(value)) report(property, value, "use a color token");
      continue;
    }

    if (/^(padding|margin|gap|row-gap|column-gap|scroll-padding|scroll-margin)(-|$)/.test(property) && hasLiteralLength(value)) {
      report(property, value, "use --space-*");
    }
    if (property === "line-height" && !/^(var\(--leading-[\w-]+\)|inherit|normal)$/.test(value)) report(property, value, "use --leading-*");
    if (property === "letter-spacing" && !/^(var\(--tracking-[\w-]+\)|inherit|normal|0)$/.test(value)) report(property, value, "use --tracking-*");
    if (property === "font-weight" && !/^(var\(--weight-[\w-]+\)|inherit)$/.test(value)) report(property, value, "use --weight-*");

    if (property === "box-shadow") {
      const ok = /^(none|inherit)$/.test(value) || value.split(/,(?![^()]*\))/).every((layer) => /^\s*(var\(--shadow-[\w-]+\)|inset\s.*)\s*$/.test(layer));
      if (!ok) report(property, value, "use --shadow-*");
    }
    if (property === "border-radius" && hasLiteralLength(value.replace(/\b1px\b/g, "0"))) report(property, value, "use --radius-*");
    if (property === "z-index" && !/^(var\(--z-[\w-]+\)|calc\(var\(--z-[\w-]+\)[^)]*\)|auto|inherit)$/.test(value)) report(property, value, "use --z-*");

    if (/^(transition|transition-timing-function|animation|animation-timing-function)$/.test(property) && hasLiteralEasing(value)) report(property, value, "use --ease-*");
    if (/^(transition|transition-duration)$/.test(property) && hasLiteralDuration(value)) report(property, value, "use --duration-*");
    if (/^(animation|animation-duration)$/.test(property) && !signature && hasLiteralDuration(value)) report(property, value, "use --duration-*");

    // Mask gradients use black as an alpha channel, not as a color anyone sees.
    if (!/mask/.test(property) && LITERAL_COLOR.test(value)) report(property, value, "use a color token");
  }

  for (const [query] of css.matchAll(/@media[^{]*/g)) {
    for (const [, side, width] of query.matchAll(/(max|min)-width:\s*([^)\s]+)/g)) {
      const allowed = side === "max" ? ["639px", "767px", "1023px"] : ["640px", "768px", "1024px"];
      // The brand flow mark hides only on the narrowest phones: 639 would remove this signature mark on every phone.
      if (isGlobals && side === "max" && width === "380px" && css.includes("@media (max-width: 380px) { .site-nav .brand-flow { display: none; } }")) continue;
      if (!allowed.includes(width)) report(query.trim(), width, `${side}-width must be ${allowed.join(", ")}`);
    }
  }

  for (const [, name] of css.matchAll(/var\((--(?:space|leading|tracking|weight|shadow|duration|ease|z|radius|stage)-[\w-]+)/g)) {
    if (!defined.has(name)) report("var()", name, "this token does not exist, so the declaration silently fails");
  }
  return found;
}

for (const file of files) {
  test(`tokens: ${file}`, async () => {
    const found = violations(file, await readFile(new URL(file, ROOT), "utf8"));
    assert.equal(found.length, 0, `${found.length} literal values in ${file}:\n  ${found.join("\n  ")}`);
  });
}

test("only the main case disclosure is styled as the primary button", async () => {
  const details = await readFile(new URL("components/CaseDetails.tsx", ROOT), "utf8");
  assert.doesNotMatch(details, /kind="case"/, "The decision log sits inside the main disclosure and keeps the quiet style");
});

test("the spacing scale has eight steps", () => {
  const steps = [...defined].filter((name) => /^--space-\d+$/.test(name));
  assert.equal(steps.length, 8);
});

test("elevation has at most three levels", () => {
  const levels = [...defined].filter((name) => /^--shadow-(?!color)[\w-]+$/.test(name));
  assert.ok(levels.length <= 3, levels.join(", "));
});

test("the dark theme overrides the shadow color in both of its blocks", () => {
  assert.equal(globals.match(/--glow: transparent; --shadow-color:/g)?.length, 2);
});
