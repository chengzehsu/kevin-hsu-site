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
});

test("analytics loads only on the production host and keeps UTM parameters", async () => {
  const html = await readFile(new URL("../out/resume/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /<script[^>]*src="[^"]*umami[^"]*"/, "No static tracker tag: localhost must not load it");
  const loader = html.match(/<script>\(function\(\)\{if\(location\.hostname!==[^<]*umami[^<]*<\/script>/)?.[0];
  if (loader) {
    assert.match(loader, /location\.hostname!=="chengzeresume\.kevin492625\.workers\.dev"/);
    assert.match(loader, /websiteId="[0-9a-f-]{36}"/);
    assert.doesNotMatch(loader, /excludeSearch/, "UTM parameters must reach Umami");
  }
  assert.match(html, /data-umami-event="resume-print"/);
});

test("short share links become UTM parameters before the tracker loads", async () => {
  const { runInNewContext } = await import("node:vm");
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const loader = html.match(/<script>(\(function\(\)\{try\{var q=new URLSearchParams[\s\S]*?)<\/script>/)?.[1];
  assert.ok(loader, "The loader with the short-link rewrite must be inline in the page");
  const visit = (href, hostname = "localhost") => {
    const url = new URL(href, "https://chengzeresume.kevin492625.workers.dev");
    const appended = [];
    const sandbox = {
      URLSearchParams,
      location: { hostname, pathname: url.pathname, search: url.search, hash: url.hash },
      history: { state: null, replaceState: (_s, _t, next) => { const n = new URL(next, url); sandbox.location.search = n.search; sandbox.location.hash = n.hash; } },
      document: { createElement: () => ({ dataset: {} }), head: { appendChild: (el) => appended.push(el) } },
    };
    runInNewContext(loader, sandbox);
    return { query: Object.fromEntries(new URLSearchParams(sandbox.location.search)), hash: sandbox.location.hash, loaded: appended.length };
  };
  assert.deepEqual(visit("/?s=threads").query, { utm_source: "threads", utm_medium: "social" });
  assert.deepEqual(visit("/resume/?s=Acme").query, { utm_source: "acme", utm_medium: "direct" });
  assert.deepEqual(visit("/?s=104-pm&c=autumn").query, { utm_source: "104-pm", utm_medium: "job-board", utm_campaign: "autumn" });
  assert.deepEqual(visit("/?s=acme&m=linkedin").query, { utm_source: "acme", utm_medium: "linkedin" });
  assert.equal(visit("/?s=threads#experience").hash, "#experience", "The hash survives the rewrite");
  // Explicit UTM links win, and anything that is not a slug is left alone.
  assert.deepEqual(visit("/?s=threads&utm_source=x").query, { s: "threads", utm_source: "x" });
  assert.deepEqual(visit("/?s=<script>").query, { s: "<script>" });
  assert.equal(visit("/?s=threads").loaded, 0, "localhost never loads the tracker");
  assert.equal(visit("/?s=threads", "chengzeresume.kevin492625.workers.dev").loaded, 1, "production loads it once");
});

for (const [locale, file, heading] of [
  ["zh", "../out/index.html", "獎項與案例收錄"],
  ["en", "../out/en/index.html", "Awards &amp; case features"],
]) {
  const groceryPeriod = locale === "en" ? "Mar 2021 - Jul 2022" : "2021/3 - 2022/7";
  const portfolioFile = locale === "en" ? "../out/en/portfolio/index.html" : "../out/portfolio/index.html";

  test(`${locale}: awards and case features are separate, server-rendered evidence`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const awards = html.match(/<section id="awards"[\s\S]*?<\/section>/)?.[0];
    assert.ok(awards, "Dedicated awards section must be present without JavaScript");
    assert.ok(awards.includes(heading));
    // The metrics strip was retired; its numbers now live on the case posters.
    assert.ok(!html.includes('id="metrics"'), "The duplicated metrics strip stays retired");
    assert.equal((awards.match(/data-recognition="award"/g) ?? []).length, 1);
    assert.equal((awards.match(/data-recognition="feature"/g) ?? []).length, 1);
    assert.ok(awards.includes("2022"));
    const feature = awards.match(/<li[^>]*data-recognition="feature"[\s\S]*?<\/li>/)?.[0];
    const portfolio = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
    const grocery = portfolio.match(/<article id="grocery"[\s\S]*?<\/article>/)?.[0];
    assert.ok(feature?.includes(groceryPeriod), "Show the project execution period, not the article publication date");
    assert.ok(grocery?.includes(groceryPeriod), "Feature dates must agree with the associated case");
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
    assert.match(html, /property="og:image" content="https:\/\/chengzeresume\.kevin492625\.workers\.dev\/(en\/)?opengraph-image\?v=20260915"/);
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
    assert.ok(portfolio.includes(locale === "zh" ? "Product Manager｜AI、資料產品與複雜營運系統" : "Product Manager · AI, data, and operational products"));
    // Four work cases plus two after-hours projects, which come last under their own heading.
    assert.equal((cases.match(/data-case-card=/g) ?? []).length, 6);
    assert.equal((cases.match(/data-case-card="ledger"/g) ?? []).length, 6);
    const sideTitle = locale === "zh" ? "個人專案：" : "Side projects:";
    assert.ok(cases.indexOf(sideTitle) < cases.indexOf('<article id="namecard"'), "Side projects sit under their own heading");
    assert.ok(cases.indexOf('<article id="cdp"') < cases.indexOf(sideTitle), "Work cases come before side projects");
    const shelf = html.match(/<section id="work"[\s\S]*?<\/section>/)?.[0];
    assert.ok(shelf, "The home case shelf must render");
    for (const id of ["namecard", "podcast-stock"]) {
      assert.ok(!shelf.includes(`/cases/${id}/`), "The home shelf keeps the four work cases only");
    }
    assert.equal((cases.match(/data-case-card="featured"/g) ?? []).length, 0);
    // Eight roles: 華曜興業 joined on 2026-10-02 and the 2024/9 - 2025/2 consulting role on 2026-10-05.
    assert.equal((html.match(/data-disclosure="experience"/g) ?? []).length, 8);
    // Every role, the current one included, starts as one compact line of equal weight (user decision, 2026-10-01).
    const openDetails = html.match(/<details[^>]*\sopen(?:[\s=>])[^>]*>/g) ?? [];
    assert.equal(openDetails.length, 0, "No experience entry opens by default");
    assert.ok(!html.includes("data-open-experiment"));
    // The hero film may mount, but no film bytes are requested before load: no sources in the HTML.
    const hero = html.match(/<section id="hero"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((html.match(/<video/g) ?? []).length, 1, "Only the hero film mounts on the home page");
    assert.ok(/<video[^>]*preload="none"/.test(hero), "The hero film must not preload");
    assert.ok(!html.includes("<source"), "Film sources attach after load, never in the server HTML");
    for (const id of ["ecofirst", "grocery", "health-app", "cdp", "namecard", "podcast-stock"]) {
      const article = cases.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
      assert.ok(article?.includes(locale === "zh" ? "查看案例詳情" : "View case details"));
      const path = `${locale === "en" ? "/en" : ""}/cases/${id}/`;
      assert.ok(article.includes(`href="${path}"`), "No-JS sharing must be a working link");
      const detail = await readFile(new URL(`../out${path}index.html`, import.meta.url), "utf8");
      assert.ok(detail.includes("<h1"));
      assert.ok(detail.includes(`rel="canonical" href="https://chengzeresume.kevin492625.workers.dev${path}"`));
      assert.ok(detail.includes(`href="/cases/${id}/"`) || locale === "zh");
      assert.ok(detail.includes(`href="/en/cases/${id}/"`) || locale === "en");
      assert.ok(detail.includes(`href="${locale === "en" ? "/en/portfolio/" : "/portfolio/"}#${id}"`));
      assert.ok(detail.includes(locale === "zh" ? "實際產出" : "Deliverables"));
      assert.ok(detail.includes(locale === "zh" ? "成果量測" : "How it was measured"));
      assert.ok(detail.includes(locale === "zh" ? "協作範圍" : "Collaboration"));
      assert.ok(detail.includes('href="#decision"'));
      assert.ok(detail.includes('href="#measurement"'));
      // Interviewers asked which product calls were made and on what data; only Ecofirst carries a log.
      const log = detail.match(/<div id="decision-log"[\s\S]*?<\/ol>/)?.[0];
      if (id === "ecofirst") {
        assert.ok(log, "The Ecofirst case lists its decisions, server rendered");
        assert.equal((log.match(/<li/g) ?? []).length, 6);
        assert.ok(log.includes(locale === "zh" ? "看的數據" : "Data watched"));
        assert.ok(detail.includes('href="#decision-log"'));
      } else {
        assert.ok(!log && !detail.includes('href="#decision-log"'));
      }
    }
  });

  test(`${locale}: the skills index is evidence-led, server rendered, and follows work history`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const skills = html.match(/<section id="skills"[\s\S]*?<\/section>/)?.[0];
    assert.ok(skills, "Skills must remain visible before hydration");
    assert.equal((skills.match(/data-featured-skill=/g) ?? []).length, 4);
    assert.equal((skills.match(/data-skill=/g) ?? []).length, 20);
    assert.ok(skills.includes(locale === "zh" ? "完整能力清單" : "Full skill set"));
    assert.ok(skills.includes(locale === "zh" ? "以下整理我在專案中實際用過的能力" : "A record of the work I have owned in projects"));
    // The radar mirrors the launch film: shape only, never scores.
    assert.ok(!/<text[^>]*>\s*\d/.test(skills), "The skills radar must not print numeric scores");
    // Recruiter reading order: cases → experience → skills → AI habits, and the nav lists them in that order.
    const order = ["work", "experience", "skills", "linkedin-posts"].map((id) => html.indexOf(`<section id="${id}"`));
    assert.ok(order.every((at, i) => at > 0 && (i === 0 || at > order[i - 1])), `Home section order: ${order}`);
    const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";
    const anchors = [...nav.matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]);
    assert.deepEqual(anchors, ["work", "experience", "linkedin-posts"]);
  });

  test(`${locale}: theme choice is available before and after hydration`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.ok(html.includes("portfolio-theme"), "Inline theme script must prevent a colour flash");
    assert.ok(html.includes(locale === "zh" ? "切換為深色模式" : "Switch to dark mode"));
  });
}

for (const [locale, file, home] of [
  ["zh", "../out/resume/index.html", "../out/index.html"],
  ["en", "../out/en/resume/index.html", "../out/en/index.html"],
]) {
  test(`${locale}: one-page résumé is reachable and links every result to its case`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const homeHtml = await readFile(new URL(home, import.meta.url), "utf8");
    const prefix = locale === "en" ? "/en/" : "/";
    assert.ok(homeHtml.includes(`href="${prefix}resume/"`), "Hero and nav link to the résumé");
    for (const id of ["grocery", "health-app", "cdp", "ecofirst", "namecard", "podcast-stock"]) {
      assert.ok(html.includes(`href="${prefix}cases/${id}/"`), `Résumé links to the ${id} case`);
    }
    assert.ok(html.includes("+233%") && html.includes("+66%"), "Canonical figures appear on the résumé");
    assert.ok(html.includes("mailto:kevin492625@gmail.com"));
    assert.ok(!/href="#(experience|contact)"/.test(html), "No in-page anchors that only exist on home");
    assert.ok(!/\b0\d{1,2}-?\d{3,4}-?\d{3,4}\b/.test(html.replace(/<script[\s\S]*?<\/script>/g, "")), "No phone number");
  });
}
