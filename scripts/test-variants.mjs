// Run: node --experimental-strip-types --test scripts/test-variants.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { isChannelCode, resolveTailoredCode, SHORT_CODE_PATTERN } from "../lib/shortCode.ts";
import {
  applyBullets,
  applyOrder,
  numericTokens,
  resolveCode,
  sanitizeOverlay,
} from "../lib/variants.ts";

test("partial overlay keeps only the keys it sets", () => {
  const overlay = sanitizeOverlay({ "resume.summary": "新摘要", "skills.order": ["systems", "operations"] });
  assert.deepEqual(overlay.text, { "resume.summary": "新摘要" });
  assert.deepEqual(overlay.skillsOrder, ["systems", "operations"]);
  assert.equal(overlay.casesOrder, undefined);
  assert.deepEqual(overlay.bullets, {});
});

test("unknown keys, wrong types and malformed ids are dropped one field at a time", () => {
  const overlay = sanitizeOverlay({
    "hero.subtitle": "unknown",
    "resume.summary": 42,
    "resume.keywords": "   ",
    "resume.headline": "留下來",
    "cases.order": ["cdp", "Ghost Case", "grocery"],
    "skills.card.systems.summary": "卡片摘要",
    "skills.card.systems.title": "不支援的欄位",
  });
  assert.deepEqual(overlay.text, { "resume.headline": "留下來" });
  assert.equal(overlay.casesOrder, undefined, "an order list with a malformed id is ignored whole");
  assert.deepEqual(overlay.cards, { systems: { summary: "卡片摘要" } });
});

test("garbage input never throws", () => {
  for (const raw of [null, undefined, 42, "x", [], [1, 2], { "experience.x.bullets": "nope" }]) {
    assert.doesNotThrow(() => sanitizeOverlay(raw));
  }
});

test("bullet pick example: [b1, b0, X]", () => {
  const overlay = sanitizeOverlay({ "experience.ecofirst.bullets": { pick: [1, 0], extra: "X" } });
  assert.deepEqual(applyBullets(["b0", "b1", "b2", "b3"], overlay.bullets.ecofirst), ["b1", "b0", "X"]);
});

test("bullet indices out of range are skipped; an empty result keeps the main bullets", () => {
  const main = ["b0", "b1"];
  assert.deepEqual(applyBullets(main, { pick: [5, 1] }), ["b1"]);
  assert.deepEqual(applyBullets(main, { pick: [9] }), ["b0", "b1"]);
  assert.deepEqual(applyBullets(main, undefined), ["b0", "b1"]);
  const parsed = sanitizeOverlay({ "experience.a.bullets": { pick: [1, 1, -1, 2.5, "0"] } });
  assert.deepEqual(parsed.bullets.a.pick, [1]);
});

test("case order: known ids first, unknown skipped, the rest in main order", () => {
  const main = ["grocery", "ecofirst", "health-app", "cdp"];
  assert.deepEqual(applyOrder(main, ["cdp", "ghost", "grocery"]), ["cdp", "grocery", "ecofirst", "health-app"]);
  assert.deepEqual(applyOrder(main, undefined), main);
});

const channelsJson = JSON.parse(readFileSync(new URL("../lib/share-channels.json", import.meta.url), "utf8"));
const CHANNELS = Object.fromEntries(
  ["social", "job-board", "message"].flatMap((medium) => channelsJson[medium].map((code) => [code, medium])),
);

const RESOLUTION_ROWS = [
  ["?s=acme", null, "acme"],
  ["?utm_source=acme&utm_medium=direct", null, "acme"],
  ["", "acme", "acme"],
  ["?s=ACME%20PM", null, null],
  ["?s=beta", "acme", "beta"],
  ["?s=Acme", null, "acme"],
  ["", "bad code", null],
  // Channel codes, and codes whose first segment is a channel, never resolve to a tailored code.
  ["?s=line", null, null],
  ["?utm_source=line-pm", null, null],
  ["?s=threads-launch", "acme", null],
  ["", "104", null],
  ["?s=linecorp", null, "linecorp"],
];

test("code resolution order", () => {
  for (const [search, saved, expected] of RESOLUTION_ROWS)
    assert.equal(resolveCode(search, saved, CHANNELS), expected, `${search} / ${saved}`);
});

test("the head script's inlined resolver is self-contained and resolves the same table", () => {
  // TailoredBoot ships resolveTailoredCode.toString(); rebuilt with no surrounding scope it must still work.
  const shipped = new Function(`return (${resolveTailoredCode.toString()})`)();
  for (const [search, saved, expected] of RESOLUTION_ROWS)
    assert.equal(shipped(search, saved, SHORT_CODE_PATTERN, CHANNELS), expected, `${search} / ${saved}`);
});

test("channel codes are refused by name or first segment", () => {
  for (const code of ["line", "line-pm", "104-design", "threads"]) assert.ok(isChannelCode(code, CHANNELS), code);
  for (const code of ["acme", "linecorp", "acme-line"]) assert.ok(!isChannelCode(code, CHANNELS), code);
});

test("the backend's channel list matches lib/share-channels.json", () => {
  const backend = createRequire(import.meta.url)("../backend/pb_hooks/lib.js");
  assert.deepEqual([...backend.CHANNELS].sort(), Object.keys(CHANNELS).sort());
  assert.equal(backend.codeProblem("acme-pm"), null);
  assert.equal(backend.codeProblem("line-pm"), backend.CHANNEL_CODE);
  assert.equal(backend.codeProblem("Bad Code"), backend.BAD_CODE);
});

test("numeric tokens as the site writes them", () => {
  const tokens = numericTokens("揀貨 300 → 1,000 單／日 (+233%)，交付效率 +50%，NT$1 億，12 人");
  for (const t of ["300", "1,000", "+233%", "+50%", "NT$1 億", "12 人"]) assert.ok(tokens.includes(t), `${t} in ${tokens}`);
});

test("tracked URLs match pnpm utm", async () => {
  const { trackedUrl } = await import("../lib/trackedLink.ts");
  const origin = "https://chengzeresume.zeabur.app";
  assert.equal(trackedUrl(origin, "acme", "resume", false), "https://chengzeresume.zeabur.app/resume/?s=acme");
  assert.equal(trackedUrl(origin, "acme", "home", true), "https://chengzeresume.zeabur.app/en/?s=acme");
  assert.equal(trackedUrl(origin, "acme", "portfolio", true), "https://chengzeresume.zeabur.app/en/portfolio/?s=acme");
  assert.equal(trackedUrl(origin, "acme", "case-ecofirst", false), "https://chengzeresume.zeabur.app/cases/ecofirst/?s=acme&m=manager");
});
