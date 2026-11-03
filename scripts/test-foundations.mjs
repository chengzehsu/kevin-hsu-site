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
  for (const name of ["X-Content-Type-Options: nosniff", "Referrer-Policy:", "X-Frame-Options: DENY", "Strict-Transport-Security:"]) {
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
