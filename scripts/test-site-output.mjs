import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const article = "https://www.thenewslens.com/feature/aws/250301";

for (const [locale, file, heading] of [
  ["zh", "../out/index.html", "獎項與案例收錄"],
  ["en", "../out/en/index.html", "Awards &amp; case features"],
]) {
  test(`${locale}: awards and case features are separate, server-rendered evidence`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const awards = html.match(/<section id="awards"[\s\S]*?<\/section>/)?.[0];
    const metrics = html.match(/<section id="metrics"[\s\S]*?<\/section>/)?.[0];
    assert.ok(awards, "Dedicated awards section must be present without JavaScript");
    assert.ok(awards.includes(heading));
    assert.ok(metrics);
    assert.ok(!metrics.includes("PMI"), "Awards must not remain in the metrics strip");
    assert.equal((awards.match(/data-recognition="award"/g) ?? []).length, 1);
    assert.equal((awards.match(/data-recognition="feature"/g) ?? []).length, 1);
    assert.ok(awards.includes("2022"));
    assert.ok(awards.includes("2025"));
    const sourceLink = awards.match(/<a[^>]*href="https:\/\/www\.thenewslens\.com\/feature\/aws\/250301"[^>]*>/)?.[0];
    assert.ok(sourceLink?.includes(article), "Use the supplied public source");
    assert.ok(sourceLink.includes('target="_blank"'));
    assert.ok(sourceLink.includes('rel="noopener noreferrer"'));
    assert.ok(html.indexOf('<section id="awards"') > html.indexOf('<section id="cases"'));
    assert.ok(html.indexOf('<section id="awards"') < html.indexOf('<section id="method"'));
  });

  test(`${locale}: social previews have production URLs and a large-image card`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /property="og:image" content="https:\/\/chengzeresume\.zeabur\.app\/(en\/)?opengraph-image\?v=20260915"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
  });
}
