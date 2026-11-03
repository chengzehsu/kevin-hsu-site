// Checks the built site's crawl files, response headers, and browser colour. Run after `pnpm build`.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8");

test("the sitemap lists every public page in both languages and never the admin", async () => {
  const xml = await read("sitemap.xml");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert.equal(new Set(urls).size, urls.length, "No page is listed twice");
  for (const path of ["/", "/en/", "/portfolio/", "/en/portfolio/", "/resume/", "/en/resume/", "/cases/resume-site/", "/en/cases/resume-site/"]) {
    assert.ok(urls.includes(path), `${path} is listed`);
  }
  assert.ok(!urls.some((path) => path.includes("admin")));
  // Every listed URL has to resolve to a page the export actually produced.
  for (const path of urls) await read(`${path.slice(1)}index.html`);
});

test("robots.txt points to the sitemap and keeps crawlers out of the admin", async () => {
  const robots = await read("robots.txt");
  assert.match(robots, /Disallow: \/admin\//);
  assert.match(robots, /Sitemap: https:\/\/[^\s]+\/sitemap\.xml/);
});

test("every response carries the baseline security headers", async () => {
  const headers = await read("_headers");
  // The site-wide rule is a line of its own; "/_next/static/*" also ends in "/*".
  const start = headers.indexOf("\n/*\n");
  assert.notEqual(start, -1, "A rule covers every path");
  const block = headers.slice(start);
  for (const name of ["X-Content-Type-Options: nosniff", "Referrer-Policy:", "X-Frame-Options: DENY", "Strict-Transport-Security:", "Content-Security-Policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'"]) {
    assert.ok(block.includes(name), name);
  }
});

test("the browser colour matches the page background in both themes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const light = css.match(/--bg:\s*(#[0-9a-f]+)/i)?.[1];
  const dark = css.match(/\[data-theme="dark"\]\s*\{\s*--bg:\s*(#[0-9a-f]+)/i)?.[1];
  for (const page of ["index.html", "en/index.html"]) {
    const html = await read(page);
    assert.ok(html.includes(`content="${light}" media="(prefers-color-scheme: light)"`) || html.includes(`media="(prefers-color-scheme: light)" content="${light}"`), `${page} light`);
    assert.ok(html.includes(`content="${dark}" media="(prefers-color-scheme: dark)"`) || html.includes(`media="(prefers-color-scheme: dark)" content="${dark}"`), `${page} dark`);
  }
});

test("the browser colour has one source and it equals --bg in both themes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const { THEME_COLORS } = await import("../lib/theme.ts");
  assert.equal(THEME_COLORS.light, css.match(/--bg:\s*(#[0-9a-f]+)/i)?.[1]);
  assert.equal(THEME_COLORS.dark, css.match(/\[data-theme="dark"\]\s*\{\s*--bg:\s*(#[0-9a-f]+)/i)?.[1]);
  for (const file of ["../app/(zh)/layout.tsx", "../app/en/layout.tsx", "../app/global-not-found.tsx"]) {
    const src = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(src, /THEME_SCRIPT/, `${file} uses the shared script`);
    assert.doesNotMatch(src, /#f5f7fa|#171e28|const THEME_SCRIPT/i, `${file} does not repeat the colours or script`);
  }
});

// Runs the real pre-paint script against a minimal fake DOM.
async function runThemeScript({ saved, systemDark, storageThrows = false, metas = 2 }) {
  const { THEME_SCRIPT } = await import("../lib/theme.ts");
  const observers = [];
  const root = { dataset: {} };
  const metaList = Array.from({ length: metas }, () => {
    const attrs = { content: "stale" };
    return { getAttribute: (n) => attrs[n], setAttribute: (n, v) => { attrs[n] = v; } };
  });
  const document = {
    documentElement: root,
    head: {},
    querySelectorAll: (q) => (q === 'meta[name="theme-color"]' ? metaList : []),
  };
  class MutationObserver {
    constructor(cb) { this.cb = cb; observers.push(this); }
    observe() {}
  }
  const localStorage = {
    getItem: () => { if (storageThrows) throw new Error("blocked"); return saved ?? null; },
  };
  const matchMedia = () => ({ matches: systemDark });
  new Function("document", "localStorage", "matchMedia", "MutationObserver", THEME_SCRIPT)(document, localStorage, matchMedia, MutationObserver);
  const colours = () => metaList.map((m) => m.getAttribute("content"));
  // A data-theme change (manual switch or system change) notifies the observers.
  const setTheme = (t) => { root.dataset.theme = t; observers.forEach((o) => o.cb()); };
  return { root, colours, setTheme, metaList, observers };
}

test("theme-color follows the stored choice, then the system, then manual switches", async () => {
  const { THEME_COLORS: C } = await import("../lib/theme.ts");
  // System light, saved dark: both media metas carry the dark colour so the browser cannot pick the light one.
  let r = await runThemeScript({ saved: "dark", systemDark: false });
  assert.equal(r.root.dataset.theme, "dark");
  assert.deepEqual(r.colours(), [C.dark, C.dark]);
  // System dark, saved light.
  r = await runThemeScript({ saved: "light", systemDark: true });
  assert.equal(r.root.dataset.theme, "light");
  assert.deepEqual(r.colours(), [C.light, C.light]);
  // No saved choice follows the system.
  r = await runThemeScript({ saved: null, systemDark: true });
  assert.deepEqual(r.colours(), [C.dark, C.dark]);
  // Manual switch afterwards, and a route change that resets the metas.
  r.setTheme("light");
  assert.deepEqual(r.colours(), [C.light, C.light]);
  r.metaList.forEach((m) => m.setAttribute("content", "stale"));
  r.observers.forEach((o) => o.cb());
  assert.deepEqual(r.colours(), [C.light, C.light]);
  // Blocked storage: no throw, data-theme stays unset, and the media metas are left to follow the system.
  r = await runThemeScript({ saved: null, systemDark: false, storageThrows: true });
  assert.equal(r.root.dataset.theme, undefined);
  assert.deepEqual(r.colours(), ["stale", "stale"]);
  // A manual switch still works in that state.
  r.setTheme("dark");
  assert.deepEqual(r.colours(), [C.dark, C.dark]);
});
