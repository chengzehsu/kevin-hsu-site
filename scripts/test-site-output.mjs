import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const article = "https://www.thenewslens.com/feature/aws/250301";
const skillsComponent = await readFile(new URL("../components/SkillsRadar.tsx", import.meta.url), "utf8");
const skillsStyles = await readFile(new URL("../components/SkillsRadar.module.css", import.meta.url), "utf8");

test("skills library keeps native details out of the section grid", () => {
  assert.match(skillsComponent, /<details className=\{styles\.library\}>/);
  assert.doesNotMatch(skillsComponent, /<details className=\{`\$\{styles\.sectionBlock\}/);
  assert.match(skillsStyles, /\.library\s*\{\s*display: block;/);
  assert.match(skillsStyles, /\.groups\s*\{[\s\S]*?margin-left: calc\(10rem \+ 2\.5rem\);/);
});

for (const [locale, file, heading] of [
  ["zh", "../out/index.html", "獎項與案例收錄"],
  ["en", "../out/en/index.html", "Awards &amp; case features"],
]) {
  const portfolioFile = locale === "en" ? "../out/en/portfolio/index.html" : "../out/portfolio/index.html";

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
    const portfolio = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
    const grocery = portfolio.match(/<article id="grocery"[\s\S]*?<\/article>/)?.[0];
    assert.ok(feature?.includes("2021/3 - 2022/7"), "Show the project execution period, not the article publication date");
    assert.ok(grocery?.includes("2021/3 - 2022/7"), "Feature dates must agree with the associated case");
    assert.ok(!feature.includes("2025"));
    const sourceLink = awards.match(/<a[^>]*href="https:\/\/www\.thenewslens\.com\/feature\/aws\/250301"[^>]*>/)?.[0];
    assert.ok(sourceLink?.includes(article), "Use the supplied public source");
    assert.ok(sourceLink.includes('target="_blank"'));
    assert.ok(sourceLink.includes('rel="noopener noreferrer"'));
    assert.ok(html.indexOf('<section id="awards"') < html.indexOf('<section id="contact"'));
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
      const portfolio = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
      const cdp = portfolio.match(/<article id="cdp"[\s\S]*?<\/article>/)?.[0];
      const experience = html.match(/<section id="experience"[\s\S]*?<\/section>/)?.[0];
      assert.ok(cdp?.includes("Oakda"));
      assert.ok(experience?.includes("Oakda"));
    }
  });

  test(`${locale}: summaries and complete cases are usable without JavaScript`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const portfolio = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
    const cases = portfolio.match(/<section id="cases"[\s\S]*?<\/section>/)?.[0];
    assert.ok(cases);
    assert.ok(portfolio.includes(locale === "zh" ? "Senior Product Manager｜AI、資料產品與複雜營運系統" : "Senior Product Manager · AI, data, and operational products"));
    assert.equal((cases.match(/data-case-card=/g) ?? []).length, 4);
    assert.equal((cases.match(/data-case-card="ledger"/g) ?? []).length, 4);
    assert.equal((cases.match(/data-case-card="featured"/g) ?? []).length, 0);
    assert.equal((html.match(/data-disclosure="experience"/g) ?? []).length, 6);
    assert.ok(!/<details[^>]*\sopen(?:[\s=>])/.test(html), "Default visit stays compact");
    assert.ok(!html.includes("data-open-experiment"));
    assert.ok(!html.includes("<video"), "Do not fetch or mount the film before a request");
    for (const id of ["ecofirst", "grocery", "health-app", "cdp"]) {
      const article = cases.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
      assert.ok(article?.includes(locale === "zh" ? "查看案例詳情" : "View case details"));
      const path = `${locale === "en" ? "/en" : ""}/cases/${id}/`;
      assert.ok(article.includes(`href="${path}"`), "No-JS sharing must be a working link");
      const detail = await readFile(new URL(`../out${path}index.html`, import.meta.url), "utf8");
      assert.ok(detail.includes("<h1"));
      assert.ok(detail.includes(`rel="canonical" href="https://chengzeresume.zeabur.app${path}"`));
      assert.ok(detail.includes(`href="/cases/${id}/"`) || locale === "zh");
      assert.ok(detail.includes(`href="/en/cases/${id}/"`) || locale === "en");
      assert.ok(detail.includes(`href="${locale === "en" ? "/en/portfolio/" : "/portfolio/"}#${id}"`));
      assert.ok(detail.includes(locale === "zh" ? "實際產出" : "Work products"));
      assert.ok(detail.includes(locale === "zh" ? "成果量測" : "How it was measured"));
      assert.ok(detail.includes(locale === "zh" ? "協作範圍" : "Collaboration"));
      assert.ok(detail.includes('href="#decision"'));
      assert.ok(detail.includes('href="#measurement"'));
    }
  });

  test(`${locale}: the skills index is evidence-led, server rendered, and precedes work history`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const skills = html.match(/<section id="skills"[\s\S]*?<\/section>/)?.[0];
    assert.ok(skills, "Skills must remain visible before hydration");
    assert.equal((skills.match(/data-featured-skill=/g) ?? []).length, 5);
    assert.equal((skills.match(/data-skill=/g) ?? []).length, 20);
    assert.ok(skills.includes(locale === "zh" ? "完整技能庫" : "Full skill set"));
    assert.ok(skills.includes(locale === "zh" ? "以下整理我在專案中實際負責過的能力" : "A record of the work I have owned in projects"));
    assert.ok(!skills.includes("<polygon"), "Skills should not use a subjective radar chart");
    assert.ok(html.indexOf('<section id="skills"') < html.indexOf('<section id="experience"'));
  });

  test(`${locale}: theme choice is available before and after hydration`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.ok(html.includes("portfolio-theme"), "Inline theme script must prevent a colour flash");
    assert.ok(html.includes(locale === "zh" ? "切換為深色模式" : "Switch to dark mode"));
  });
}
