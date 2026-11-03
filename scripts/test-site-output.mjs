import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const article = "https://www.thenewslens.com/feature/aws/250301";
const skillsComponent = await readFile(new URL("../components/SkillsRadar.tsx", import.meta.url), "utf8");
const skillsStyles = await readFile(new URL("../components/SkillsRadar.module.css", import.meta.url), "utf8");

test("printing always uses light paper colors", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@media print \{\s*:root,\s*:root\[data-theme="dark"\][\s\S]*?--bg: #ffffff !important/);
});

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

test("case paragraphs use reading sizes, not heading sizes", async () => {
  const css = await readFile(new URL("../components/CasePage.module.css", import.meta.url), "utf8");
  for (const name of ["statement", "quote"]) {
    const rule = css.match(new RegExp(`\\.${name} \\{[^}]+\\}`))?.[0] ?? "";
    assert.match(rule, /font-size: var\(--text-(lead|body)\)/, `.${name} holds whole paragraphs`);
  }
});

test("every font size outside the résumé comes from the type scale", async () => {
  const { readdir } = await import("node:fs/promises");
  const names = (await readdir(new URL("../components/", import.meta.url))).filter((name) => name.endsWith(".module.css") && !/ResumePage|BuilderLoop/.test(name));
  const files = ["../app/globals.css", ...names.map((name) => `../components/${name}`)];
  for (const file of files) {
    const css = await readFile(new URL(file, import.meta.url), "utf8");
    for (const [, value] of css.matchAll(/font-size:\s*([^;}\n]+)/g)) {
      const size = value.trim();
      assert.ok(/^var\(--text-|^var\(--|^[\d.]+em$|^min\(|^inherit$|^[\d.]+%$/.test(size), `${file}: font-size ${size} skips the type scale`);
    }
  }
});

for (const [locale, file, heading] of [
  ["zh", "../out/index.html", "獎項與案例收錄"],
  ["en", "../out/en/index.html", "Awards &amp; case features"],
]) {
  const groceryPeriod = locale === "en" ? "Mar 2021 - Jul 2022" : "2021/3 - 2022/7";
  const portfolioFile = locale === "en" ? "../out/en/portfolio/index.html" : "../out/portfolio/index.html";

  test(`${locale}: results and recognition follow the hero and link to their proof`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const metrics = html.match(/<section id="metrics"[\s\S]*?<\/section>/)?.[0];
    assert.ok(metrics, "The results strip renders without JavaScript");
    assert.equal((metrics.match(/class="impact-link"/g) ?? []).length, 3);
    for (const id of ["internal-backend", "grocery", "health-app"]) {
      assert.ok(metrics.includes(`/cases/${id}/`), `A result links to the ${id} case`);
    }
    assert.ok(metrics.includes("2022"));
    const sourceLink = metrics.match(/<a[^>]*href="https:\/\/www\.thenewslens\.com\/feature\/aws\/250301"[^>]*>/)?.[0];
    assert.ok(sourceLink?.includes(article), "Use the supplied public source");
    assert.ok(sourceLink.includes('target="_blank"'));
    assert.ok(sourceLink.includes('rel="noopener noreferrer"'));
    const grocery = await readFile(new URL(`../out${locale === "en" ? "/en" : ""}/cases/grocery/index.html`, import.meta.url), "utf8");
    assert.ok(grocery.includes(groceryPeriod), "The grocery case shows its execution period");
  });

  test(`${locale}: social previews have production URLs and a large-image card`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /property="og:image" content="https:\/\/chengzeresume\.kevin492625\.workers\.dev\/(en\/)?opengraph-image\?v=20261103"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
  });

  test(`${locale}: company names are consistent across cases and experience`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    assert.ok(!/OKData/i.test(html), "Do not reintroduce the incorrect English company name");
    if (locale === "en") {
      const cdp = await readFile(new URL("../out/en/cases/cdp/index.html", import.meta.url), "utf8");
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
    // The wall behind the portfolio hero is an index of real work: tiles open their case, outside the tab order.
    const wall = portfolio.slice(portfolio.indexOf('aria-hidden="true"'), portfolio.indexOf('id="portfolio-title"'));
    assert.ok(/<a[^>]*tabindex="-1"[^>]*href|<a[^>]*href="[^"]*\/cases\/[^"]*"[^>]*tabindex="-1"/i.test(wall), "Wall tiles link to their case");
    assert.ok(portfolio.includes(locale === "zh" ? "Senior Product Manager｜平台重構與內部系統" : "Senior Product Manager · Platform rebuilds and internal systems"));
    // Every case is one card in one grid, in rank order: seven from work, then three side projects.
    const caseIds = ["internal-backend", "grocery", "health-app", "cdp", "ecofirst", "sensor-naming", "sales-faq", "namecard", "life-hub", "resume-site"];
    assert.deepEqual([...cases.matchAll(/<article id="([a-z-]+)"/g)].map((m) => m[1]), caseIds);
    assert.equal((cases.match(/data-case-card="card"/g) ?? []).length, 10);
    assert.deepEqual([...cases.matchAll(/<article id="([a-z-]+)"[^>]*data-wide/g)].map((m) => m[1]), ["internal-backend", "resume-site"], "Two wide cards fill the grid");
    assert.ok(cases.replace(/<[^>]+>/g, "").includes(locale === "zh" ? "10 個案例：7 個工作專案、3 個個人專案" : "10 case studies: 7 from work, 3 from side projects"));
    assert.ok(!cases.includes(locale === "zh" ? "關鍵取捨" : "Key decision"), "Cards hold no decision text");
    assert.ok(!portfolio.includes(locale === "zh" ? "管理專案組合" : "project portfolio managed"), "The hero has no facts strip");
    const shelf = html.match(/<section id="work"[\s\S]*?<\/section>/)?.[0];
    assert.ok(shelf, "The home case shelf must render");
    // The home shelf features the first four cases by rank.
    const featured = ["internal-backend", "grocery", "health-app", "cdp"];
    const shelfLinks = [...shelf.matchAll(/\/cases\/([a-z-]+)\//g)].map((m) => m[1]);
    assert.deepEqual([...new Set(shelfLinks)], featured, "The home shelf shows the featured cases in rank order");
    assert.ok(shelf.indexOf("internal-backend-overview.webp") < shelf.indexOf("/case-posters/grocery.svg"), "The lead card shows the overview screen");
    // Work outside the product role lives on the Ecofirst case, not in the experience list.
    const extrasTitle = locale === "zh" ? "其他協助公司營運的工作" : "Also improved how the company runs";
    const experience = html.match(/<section id="experience"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(!experience.includes(extrasTitle));
    const ecofirstCase = await readFile(new URL(`../out${locale === "en" ? "/en" : ""}/cases/ecofirst/index.html`, import.meta.url), "utf8");
    assert.ok(ecofirstCase.includes(extrasTitle), "The add-on sits on the Ecofirst case");
    // Eight roles as one line each; results live on the résumé, so nothing expands here.
    assert.equal((experience.match(/<li[^>]*id="experience-/g) ?? []).length, 8);
    assert.ok(!experience.includes("<details"), "Experience rows do not expand");
    assert.ok(/href="(?:\/en)?\/resume\/"/.test(experience), "Experience points to the résumé");
    assert.ok(!html.includes("data-open-experiment"));
    // The hero film may mount, but no film bytes are requested before load: no sources in the HTML.
    const hero = html.match(/<section id="hero"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((html.match(/<video/g) ?? []).length, 1, "Only the hero film mounts on the home page");
    assert.ok(/<video[^>]*preload="none"/.test(hero), "The hero film must not preload");
    assert.ok(!html.includes("<source"), "Film sources attach after load, never in the server HTML");
    for (const id of caseIds) {
      const article = cases.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
      assert.ok(article?.includes(locale === "zh" ? "學到" : "Learned"), `${id} card names a grown capability`);
      const path = `${locale === "en" ? "/en" : ""}/cases/${id}/`;
      assert.ok(article.includes(`href="${path}"`), "No-JS sharing must be a working link");
      const detail = await readFile(new URL(`../out${path}index.html`, import.meta.url), "utf8");
      assert.ok(detail.includes("<h1"));
      assert.ok(detail.includes(`rel="canonical" href="https://chengzeresume.kevin492625.workers.dev${path}"`));
      assert.ok(detail.includes(`href="/cases/${id}/"`) || locale === "zh");
      assert.ok(detail.includes(`href="/en/cases/${id}/"`) || locale === "en");
      assert.ok(detail.includes(`href="${locale === "en" ? "/en/portfolio/" : "/portfolio/"}#${id}"`));
      // The first screen answers value and capability before the one disclosure that holds the rest.
      const fold = detail.indexOf('data-disclosure="case"');
      assert.ok(fold > 0, `${id} keeps its process behind a disclosure`);
      assert.ok(!detail.slice(fold, detail.indexOf(">", fold)).includes(" open"), `${id} starts collapsed`);
      assert.match(detail.slice(0, fold), /measureNote[^"]*">[^<]+</, `${id} shows how its figure was measured on the first screen`);
      for (const label of locale === "zh" ? ["用到的能力", "學到的能力", "我做的決定", "合作對象"] : ["Skills used", "Skills learned", "The decision I made", "Worked with"]) {
        const at = detail.indexOf(label);
        assert.ok(at > 0 && at < fold, `${id} shows ${label} on the first screen`);
      }
      // One skeleton on every case: problem, decision, result, what was built, then the full story.
      const order = ["situation", "decision", "result", "artifacts"].map((anchor) => detail.indexOf(`id="${anchor}"`));
      assert.ok(order.every((at, i) => at > fold && (i === 0 || at > order[i - 1])), `${id} chapter order: ${order}`);
      if (detail.includes('<section id="story"')) assert.ok(detail.indexOf('<section id="story"') > order[3], `${id} tells the story last`);
      assert.ok(detail.includes("backdrop"), "The wall echoes behind every case hero");
      assert.ok(detail.includes(locale === "zh" ? "數字來源" : "How it was measured"));
      // AI projects keep their AI and human split on the case, since the AI section no longer repeats them.
      assert.equal(detail.includes("data-ai-split"), ["internal-backend", "namecard", "sensor-naming", "sales-faq", "life-hub", "resume-site"].includes(id));
      // Interviewers ask which calls were made and on what data; the logs fold away until asked for.
      const log = detail.match(/<div id="decision-log"[\s\S]*?<\/ol>/)?.[0];
      const logSizes = { ecofirst: 6, "internal-backend": 5 };
      if (id in logSizes) {
        assert.ok(log, `The ${id} case lists its decisions, server rendered`);
        assert.equal((log.match(/<li/g) ?? []).length, logSizes[id]);
        assert.ok(log.includes("<details"), "The log starts collapsed");
        assert.ok(log.includes(locale === "zh" ? "依據" : "Evidence"));
      } else {
        assert.ok(!log);
      }
    }
  });

  test(`${locale}: the internal back office case is an illustrated article`, async () => {
    const path = `${locale === "en" ? "/en" : ""}/cases/internal-backend/`;
    const detail = await readFile(new URL(`../out${path}index.html`, import.meta.url), "utf8");
    // Only the article: the page header carries its own figure (the case artifact).
    const story = detail.slice(detail.indexOf('<section id="story"'));
    const figures = [...story.matchAll(/<figure[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[\s\S]*?<figcaption[^>]*>[^<]+/g)].map((m) => m[1]);
    const expected = [locale === "en" ? "flow-en.svg" : "flow.svg", "timeseries.webp", "site-health.webp", "warroom.webp"];
    assert.deepEqual(
      figures.map((src) => src.replace(/^.*internal-backend-/, "")),
      expected,
      "The screens follow the story in order, each with a caption",
    );
    for (const src of figures) await readFile(new URL(`../out${src}`, import.meta.url));
    assert.ok(detail.includes('<section id="story"'), "The article renders without JavaScript");
    // Visitor copy names the product only as the internal back office.
    assert.ok(!/point table|點位表管理/i.test(detail));
    assert.ok(!/27 小時[^。]*上線/.test(detail), "27 hours is proposal to archive, never time to production");
  });

  test(`${locale}: the home page reads in decision order`, async () => {
    const html = await readFile(new URL(file, import.meta.url), "utf8");
    const order = ["hero", "metrics", "work", "ai", "experience", "skills", "contact"].map((id) => html.indexOf(`<section id="${id}"`));
    assert.ok(order.every((at, i) => at >= 0 && (i === 0 || at > order[i - 1])), `Home section order: ${order}`);
    for (const gone of ['<section id="awards"', 'data-ai-chapter=', 'data-featured-skill=']) {
      assert.ok(!html.includes(gone), `${gone} stays off the home page`);
    }
    assert.ok(html.includes('id="linkedin-posts"'), "Links sent earlier still land on the AI section");
    assert.ok(html.indexOf('id="linkedin-posts"') > order[3] && html.indexOf('id="linkedin-posts"') < order[4]);
    const skills = html.match(/<section id="skills"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(skills.includes("<polygon"), "The radar chart stays on the home page");
    assert.ok(!/<text[^>]*>\s*\d/.test(skills), "The skills radar must not print numeric scores");
    const ai = html.match(/<section id="ai"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((ai.match(/<li/g) ?? []).length, 3, "Three AI picks");
    const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";
    assert.deepEqual([...nav.matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]), ["ai"]);
    assert.ok(nav.includes(locale === "zh" ? "作品集" : "Portfolio"));
  });

  test(`${locale}: every page has unique ids, filled templates, and old links that still land`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const ids = ["internal-backend", "ecofirst", "grocery", "health-app", "cdp", "sensor-naming", "sales-faq", "namecard", "life-hub", "resume-site"];
    for (const page of [file, portfolioFile, ...ids.map((id) => `../out/${prefix}cases/${id}/index.html`)]) {
      const raw = (await readFile(new URL(page, import.meta.url), "utf8")).replace(/<script[\s\S]*?<\/script>/g, "");
      const found = [...raw.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(found.filter((id, index) => found.indexOf(id) !== index), [], `${page} repeats an id`);
      assert.ok(!/\{(total|work|side|featured)\}/.test(raw), `${page} prints an unfilled template`);
    }
    const home = await readFile(new URL(file, import.meta.url), "utf8");
    const portfolio = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
    for (const id of ["awards", "ai-build", "ai-process", "ai-life", "linkedin-posts"]) assert.ok(home.includes(`id="${id}"`), `home keeps #${id}`);
    for (const id of ["ai-build", "ai-process", "ai-life", "linkedin-posts"]) assert.ok(portfolio.includes(`id="${id}"`), `portfolio keeps #${id}`);
    const redirects = await readFile(new URL("../out/_redirects", import.meta.url), "utf8");
    const base = locale === "en" ? "/en" : "";
    assert.ok(redirects.split("\n").includes(`${base}/cases/podcast-stock/ ${base}/portfolio/ 301`), "The retired case lands on this language's portfolio");
  });

  test(`${locale}: unconfirmed claims and older positioning stay off every page`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const ids = ["internal-backend", "ecofirst", "grocery", "health-app", "cdp", "sensor-naming", "sales-faq", "namecard", "life-hub", "resume-site"];
    const pages = [file, portfolioFile, `../out/${prefix}resume/index.html`, ...ids.map((id) => `../out/${prefix}cases/${id}/index.html`)];
    const stale = ["一到兩成", "一成多", "10 to 20%", "10%-plus", "不必設定", "no-setup", "need no configuration", "18 條", "18 human-set", "18 threshold", "+50%", "交付效率", "elivery efficiency", "+20%", "案場營運效率", "ite-ops efficiency", "營運效率提升 20%", "operational efficiency by 20%", "股神打架", "Stock Gods Fight", "−99%", " -30%", "看工作案例", "查看案例詳情", "看細節", "See work cases", "View case details", "營運流程數位化", "Operations digitization, internal", "digitizing operations", "Product Manager（規劃與實作）", "vibe coding"];
    for (const page of pages) {
      const raw = await readFile(new URL(page, import.meta.url), "utf8");
      // These frames carry retired claims burned into the image until the film is re-rendered.
      for (const frame of ["film-4", "film-8"]) assert.ok(!raw.includes(`/${frame}.webp`), `${page}: ${frame}`);
      const text = raw.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "").replaceAll("Senior Product Manager（規劃與實作）", "");
      for (const claim of stale) assert.ok(!text.includes(claim), `${page}: ${claim}`);
    }
  });

  test(`${locale}: AI work without a case is a compact list of problems, roles, and results`, async () => {
    const html = await readFile(new URL(portfolioFile, import.meta.url), "utf8");
    const start = html.indexOf('<section id="linkedin-posts"');
    const ai = html.slice(start, html.indexOf('id="contact"', start));
    assert.ok(!html.includes(locale === "zh" ? "三個 AI 工作習慣" : "Three AI work habits"));
    assert.ok(ai.includes(locale === "zh" ? "AI 先提案，人來拍板" : "AI proposes, a person decides"));
    const chapters = ["ai-build", "ai-life"];
    const at = chapters.map((id) => ai.indexOf(`data-ai-chapter="${id}"`));
    assert.ok(at.every((pos, i) => pos > 0 && (i === 0 || pos > at[i - 1])), `Chapter order: ${at}`);
    for (const [i, id] of chapters.entries()) {
      const chapter = ai.slice(at[i], at[i + 1] ?? ai.length);
      const items = (chapter.match(/data-ai-item/g) ?? []).length;
      assert.ok(items >= 3 && items <= 5, `${id} has 3 to 5 rows, found ${items}`);
      // Every row names the AI half and the person half, and stays a text row.
      assert.equal((chapter.match(/data-role="ai"/g) ?? []).length, items);
      assert.equal((chapter.match(/data-role="human"/g) ?? []).length, items);
      assert.equal((chapter.match(/<img /g) ?? []).length, 0, `${id} rows carry no covers`);
    }
    for (const [, href] of ai.matchAll(/href="((?:\/en)?\/cases\/[a-z-]+\/)"/g)) {
      assert.equal(href.startsWith("/en/"), locale === "en", `AI link ${href} stays in its locale`);
      await readFile(new URL(`../out${href}index.html`, import.meta.url));
    }
    // Life automation never shows money, holdings, or links to the private projects.
    const life = ai.slice(at[1]);
    for (const banned of ["NT$", "元", "$", "資產", "淨值", "保費", "持股", "虛擬家族辦公室", "Virtual Family Office"]) {
      assert.ok(!life.replace(/<[^>]+>/g, "").includes(banned), `Chapter 3 must not contain ${banned}`);
    }
    // Links live in attributes, so the private project names are checked before tags are stripped.
    // The life-hub case page is public; its repository and the finance tracker are not.
    for (const banned of ["github.com", "stock_analysis", "stock-analysis"]) {
      assert.ok(!life.includes(banned), `Chapter 3 must not link to ${banned}`);
    }
    for (const banned of ["九州", "熊本", "Kyushu", "Kumamoto"]) assert.ok(!ai.includes(banned));
  });

  test(`${locale}: corrected counts`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const pages = [file, ...["ecofirst"].map((id) => `../out/${prefix}cases/${id}/index.html`)];
    const html = (await Promise.all(pages.map((page) => readFile(new URL(page, import.meta.url), "utf8")))).join("");
    for (const stale of ["1,500 筆以上的業務紀錄已整理成 FAQ", "1,500+ sales records have been distilled", "102 份", "102 reports", "102 daily", "20 份", "20 productization", "424 次", "424 commits", "59 個 PR", "59 PRs"]) {
      assert.ok(!html.includes(stale), `Stale count: ${stale}`);
    }
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
    for (const id of ["internal-backend", "ecofirst", "grocery", "health-app", "cdp"]) {
      assert.ok(html.includes(`href="${prefix}cases/${id}/"`), `Résumé links to the ${id} case`);
    }
    assert.ok(html.includes("+233%") && html.includes("+66%"), "Canonical figures appear on the résumé");
    assert.ok(html.includes(locale === "zh" ? "2022/8 - 2022/10" : "Aug 2022 - Oct 2022"), "The gap line shows on the résumé");
    const text = (page) => page.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
    const shared = locale === "zh" ? "每次省下工程師約 1 小時（估算）" : "each saves engineers about 1 hour (estimate)";
    assert.ok(text(html).includes(shared), "The résumé holds the results");
    assert.ok(!text(homeHtml).includes(shared), "Home does not repeat résumé bullets");
    assert.ok(/<strong class="[^"]*lead/.test(html), "Each result leads its bullet");
    assert.ok(html.includes("mailto:kevin492625@gmail.com"));
    const skills = html.match(/<section[^>]*aria-labelledby="resume-skills"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((skills.match(/<dt/g) ?? []).length, 4, "Skills read in four named groups");
    assert.ok(!/產品經理|Product Management/.test(skills.replace(/<[^>]+>/g, "")), "A job title is not a skill");
    const summary = html.match(/<section[^>]*aria-labelledby="resume-summary"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((summary.match(/<li/g) ?? []).length, 3, "The summary is one sentence and three results");
    assert.ok(!/href="#(experience|contact)"/.test(html), "No in-page anchors that only exist on home");
    assert.ok(!/\b0\d{1,2}-?\d{3,4}-?\d{3,4}\b/.test(html.replace(/<script[\s\S]*?<\/script>/g, "")), "No phone number");
  });
}
