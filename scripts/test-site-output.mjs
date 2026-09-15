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
    const feature = awards.match(/<li[^>]*data-recognition="feature"[\s\S]*?<\/li>/)?.[0];
    const grocery = html.match(/<article id="grocery"[\s\S]*?<\/article>/)?.[0];
    assert.ok(feature?.includes("2021/3 - 2022/7"), "Show the project execution period, not the article publication date");
    assert.ok(grocery?.includes("2021/3 - 2022/7"), "Feature dates must agree with the associated case");
    assert.ok(!feature.includes("2025"));
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

  test(`${locale}: company names are consistent across cases and experience`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.ok(!/OKData/i.test(html), "Do not reintroduce the incorrect English company name");
    if (locale === "en") {
      const cdp = html.match(/<article id="cdp"[\s\S]*?<\/article>/)?.[0];
      const experience = html.match(/<section id="experience"[\s\S]*?<\/section>/)?.[0];
      assert.ok(cdp?.includes("Oakda"));
      assert.ok(experience?.includes("Oakda"));
    }
  });
}
