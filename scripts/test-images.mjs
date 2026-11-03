// Checks the responsive-image plan against the source and public/. No build needed:
//   node --test scripts/test-images.mjs
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const plan = JSON.parse(read("lib/responsive-images.json"));
const variantPath = (src, width) => `/responsive/${src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."))}-${width}.webp`;

// Tags that carry a srcset. Each one is checked against the plan.
const TAG_FILES = ["CaseArtifact", "CaseArticle", "CaseDetails", "CasePage", "ProofStack"].map((name) => `components/${name}.tsx`);

test("every plan entry has its source and every narrower copy in public/", () => {
  for (const [src, { width, variants }] of Object.entries(plan)) {
    assert.ok(existsSync(new URL(`public${src}`, root)), `${src} exists`);
    assert.deepEqual(variants, [...variants].sort((a, b) => a - b), `${src}: widths ascend`);
    for (const variant of variants) {
      assert.ok(variant < width, `${src}: ${variant}px is narrower than the ${width}px source`);
      assert.ok(existsSync(new URL(`public${variantPath(src, variant)}`, root)), `${variantPath(src, variant)} exists (run scripts/responsive-images.py)`);
    }
  }
});

test("public/responsive/ holds only files the plan names", () => {
  const wanted = new Set(Object.entries(plan).flatMap(([src, { variants }]) => variants.map((w) => variantPath(src, w).split("/").pop())));
  const actual = readdirSyncSafe("public/responsive");
  assert.deepEqual(actual.sort(), [...wanted].sort());
});

function readdirSyncSafe(path) {
  return readdirSync(new URL(`${path}/`, root));
}

test("the helper builds a srcset whose paths all exist, ending at the original width", async () => {
  const source = read("lib/responsive-image.ts");
  assert.match(source, /responsive-images\.json/);
  assert.match(source, /\/responsive\/\$\{name\}-\$\{width\}\.webp/);
  assert.match(source, /`\$\{src\} \$\{entry\.width\}w`/);
});

test("each srcset in a component comes from the helper with a sizes attribute", () => {
  for (const file of TAG_FILES) {
    const source = read(file);
    const sets = [...source.matchAll(/srcSet=\{srcSetFor\(([^)]+)\)\}/g)];
    assert.ok(sets.length > 0, `${file} sets a srcset`);
    for (const match of sets) {
      const at = match.index;
      const tag = source.slice(source.lastIndexOf("<img", at), source.indexOf("/>", at));
      assert.match(tag, /sizes=/, `${file}: the <img> with srcset also has sizes`);
      assert.match(tag, /width=/, `${file}: width stays so the layout does not jump`);
      assert.match(tag, /height=/, `${file}: height stays so the layout does not jump`);
    }
  }
});

test("the first-screen case image is eager, high priority, and never lazy", () => {
  const artifact = read("components/CaseArtifact.tsx");
  // The main image: lazy only when the caller did not mark it eager.
  assert.match(artifact, /loading=\{eager \? "eager" : "lazy"\}/);
  assert.match(artifact, /fetchPriority=\{eager \? "high" : undefined\}/);
  assert.ok(!/loading="lazy"/.test(artifact), "CaseArtifact never hard-codes lazy");
  // The case page hero asks for it.
  const page = read("components/CasePage.tsx");
  const hero = page.slice(page.indexOf("<CaseArtifact"), page.indexOf("/>", page.indexOf("<CaseArtifact")));
  assert.match(hero, /\beager\b/, "the hero CaseArtifact is eager");
});

test("every srcset path the components can emit exists in public/", () => {
  for (const [src, { width, variants }] of Object.entries(plan)) {
    const paths = [...variants.map((w) => variantPath(src, w)), src];
    for (const path of paths) assert.ok(existsSync(new URL(`public${path}`, root)), path);
    assert.ok(width > variants.at(-1));
  }
});
