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
    assert.equal((metrics.match(/class="impact-link"/g) ?? []).length, 6);
    for (const label of locale === "zh" ? ["降本", "增效", "商業規模", "過往驗證"] : ["Lower cost", "Higher output", "Business scale", "Earlier proof"]) assert.ok(metrics.includes(label), `Results show ${label}`);
    for (const id of ["internal-backend", "grocery", "sales-faq", "health-app"]) {
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
    // Listed cases are one card each in one grid, in rank order: six from work, then one side project.
    const caseIds = ["internal-backend", "grocery", "health-app", "cdp", "sensor-naming", "sales-faq", "namecard"];
    assert.deepEqual([...cases.matchAll(/<article id="([a-z-]+)"/g)].map((m) => m[1]), caseIds);
    assert.equal((cases.match(/data-case-card="card"/g) ?? []).length, 7);
    // Every card sits on the same navy: a light infographic or a pale plate here reads as a mistake.
    for (const [, id, card] of cases.matchAll(/<article id="([a-z-]+)"([\s\S]*?)<\/article>/g)) {
      const src = card.match(/<img[^>]*\ssrc="([^"]+)"/)?.[1];
      assert.ok(src, `${id} shows a cover`);
      assert.ok(src.endsWith(".svg"), `${id} uses a drawn cover, got ${src}`);
      const cover = await readFile(new URL(`../public${src}`, import.meta.url), "utf8");
      assert.ok(cover.includes('stop-color="#1F3354"'), `${id} cover ${src} is not on the navy frame`);
      assert.ok(!/<text[\s>]/.test(cover), `${id} cover ${src} has words that fight the card's own title`);
    }
    assert.deepEqual([...cases.matchAll(/<article id="([a-z-]+)"[^>]*data-wide/g)].map((m) => m[1]), ["internal-backend", "sales-faq"], "Two wide cards fill the grid");
    assert.ok(cases.replace(/<[^>]+>/g, "").includes(locale === "zh" ? "7 個案例：6 個工作專案、1 個個人專案" : "7 case studies: 6 from work, 1 from side projects"));
    assert.ok(!cases.includes(locale === "zh" ? "關鍵取捨" : "Key decision"), "Cards hold no decision text");
    assert.ok(!portfolio.includes(locale === "zh" ? "管理專案組合" : "project portfolio managed"), "The hero has no facts strip");
    const shelf = html.match(/<section id="work"[\s\S]*?<\/section>/)?.[0];
    assert.ok(shelf, "The home case shelf must render");
    // The home shelf features recent work, in rank order.
    const featured = ["internal-backend", "grocery", "health-app", "sales-faq"];
    const shelfLinks = [...shelf.matchAll(/\/cases\/([a-z-]+)\//g)].map((m) => m[1]);
    assert.deepEqual([...new Set(shelfLinks)], featured, "The home shelf shows the featured cases in rank order");
    assert.ok(shelf.indexOf("internal-backend-overview.webp") < shelf.indexOf("/case-posters/grocery.svg"), "The lead card shows the overview screen");
    // Work outside the product role lives on the Ecofirst case, not in the experience list.
    const extrasTitle = locale === "zh" ? "其他協助公司營運的工作" : "Also improved how the company runs";
    const experience = html.match(/<section id="experience"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.ok(!experience.includes(extrasTitle));
    // Five representative roles, one result each; the résumé holds all eight, so nothing expands here.
    assert.equal((experience.match(/<li[^>]*id="experience-/g) ?? []).length, 5);
    assert.ok(!experience.includes("<details"), "Experience rows do not expand");
    assert.ok(/href="(?:\/en)?\/resume\/"/.test(experience), "Experience points to the résumé");
    assert.ok(!html.includes("data-open-experiment"));
    // The hero film may mount, but no film bytes are requested before load: no sources in the HTML.
    const hero = html.match(/<section id="hero"[\s\S]*?<\/section>/)?.[0] ?? "";
    assert.equal((html.match(/<video/g) ?? []).length, 1, "Only the hero film mounts on the home page");
    assert.ok(/<video[^>]*preload="none"/.test(hero), "The hero film must not preload");
    assert.ok(/<video[^>]*\smuted/.test(hero), "The film has a music track, so it must start muted on the page");
    assert.ok(!html.includes("<source"), "Film sources attach after load, never in the server HTML");
    for (const id of caseIds) {
      const article = cases.match(new RegExp(`<article id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
      assert.ok(article?.includes(locale === "zh" ? "具備" : "Skills"), `${id} card names a capability`);
      assert.ok(!article.includes(locale === "zh" ? "學到" : "Learned"), `${id} card stays short`);
      const path = `${locale === "en" ? "/en" : ""}/cases/${id}/`;
      assert.ok(article.includes(`href="${path}"`), "No-JS sharing must be a working link");
      const detail = await readFile(new URL(`../out${path}index.html`, import.meta.url), "utf8");
      assert.ok(detail.includes("<h1"));
      assert.ok(detail.includes(`rel="canonical" href="https://chengzeresume.kevin492625.workers.dev${path}"`));
      assert.ok(detail.includes(`href="/cases/${id}/"`) || locale === "zh");
      assert.ok(detail.includes(`href="/en/cases/${id}/"`) || locale === "en");
      assert.ok(detail.includes(`href="${locale === "en" ? "/en/portfolio/" : "/portfolio/"}#${id}"`));
      // The first screen answers value and capability; the process follows open, with no button to miss.
      const fold = detail.indexOf("data-case-process");
      assert.ok(fold > 0, `${id} shows its process section`);
      assert.ok(!detail.includes('data-disclosure="case"'), `${id} does not fold its process`);
      assert.match(detail.slice(0, fold), /measureNote[^"]*">[^<]+</, `${id} shows how its figure was measured on the first screen`);
      for (const label of locale === "zh" ? ["具備的能力", "我做的決定", "合作對象"] : ["Proven skills", "The decision I made", "Worked with"]) {
        const at = detail.indexOf(label);
        // A case with scenarios moves role, scope, and team into the process section to keep its first screen short.
        const behind = id === "internal-backend" && (label === "合作對象" || label === "Worked with");
        assert.ok(at > 0 && (behind ? at > fold : at < fold), `${id} shows ${label} ${behind ? "in the process section" : "on the first screen"}`);
      }
      // One skeleton on every case: problem, decision, result, what was built, then the full story.
      const order = ["situation", "decision", "result", "artifacts"].map((anchor) => detail.indexOf(`id="${anchor}"`));
      assert.ok(order.every((at, i) => at > fold && (i === 0 || at > order[i - 1])), `${id} chapter order: ${order}`);
      if (detail.includes('<section id="story"')) assert.ok(detail.indexOf('<section id="story"') > order[3], `${id} tells the story last`);
      assert.ok(detail.includes("backdrop"), "The wall echoes behind every case hero");
      assert.ok(detail.includes(locale === "zh" ? "數字來源" : "How it was measured"));
      // AI projects keep their AI and human split on the case, since the AI section no longer repeats them.
      assert.equal(detail.includes("data-ai-split"), ["internal-backend", "namecard", "sensor-naming", "sales-faq", "life-hub", "resume-site"].includes(id));
      // Interviewers ask which calls were made and on what data; the logs stay open so nobody misses them.
      const log = detail.match(/<div id="decision-log"[\s\S]*?<\/ol>/)?.[0];
      const logSizes = {};
      if (id in logSizes) {
        assert.ok(log, `The ${id} case lists its decisions, server rendered`);
        assert.equal((log.match(/<li/g) ?? []).length, logSizes[id]);
        assert.ok(!log.includes("<details"), "The log stays open");
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
    // Three functions serve three situations: named on the first screen, one story section each.
    const scenarios = detail.match(/<div id="scenarios"[\s\S]*?<\/ul>/)?.[0] ?? "";
    assert.equal((scenarios.match(/<li/g) ?? []).length, 3, "Three situations on the first screen");
    assert.ok(detail.indexOf('id="scenarios"') < detail.indexOf('id="situation"'));
    assert.deepEqual([...story.matchAll(/<section id="([a-z-]+)"/g)].map((m) => m[1]).filter((id) => id !== "story" && id !== "contact"), ["site-management", "data-collection", "customer-view"]);
    // The savings-rate statistics feature stays off this case; its completeness is too low to show.
    // Only the case itself: the contact block names the industry, which is not the feature.
    const text = detail.slice(0, detail.indexOf('<section id="contact"')).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
    for (const gone of ["節能率", "冷凍噸", "energy savings", "Energy-savings", "energy-savings", "refrigeration", "28 of 34"]) {
      assert.ok(!text.includes(gone), `Savings-rate feature: ${gone}`);
    }
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
    assert.ok(ai.includes(locale === "zh" ? "如何用 AI 解決問題" : "How I solve problems with AI"), "The heading says how problems get solved");
    const firstRow = ai.match(/<li[\s\S]*?<\/li>/)?.[0] ?? "";
    assert.ok(firstRow.indexOf(locale === "zh" ? "人工試算" : "tested by hand") < firstRow.indexOf(locale === "zh" ? "1 週" : "1 wk"), "Each row reads problem first, figure after");
    const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";
    assert.deepEqual([...nav.matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]), ["ai"]);
    assert.ok(nav.includes(locale === "zh" ? "作品集" : "Portfolio"));
  });

  test(`${locale}: every page has unique ids, filled templates, and old links that still land`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const ids = ["internal-backend", "grocery", "health-app", "cdp", "sensor-naming", "sales-faq", "namecard", "life-hub", "resume-site"];
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
    assert.ok(redirects.split("\n").includes(`${base}/cases/ecofirst/ ${base}/portfolio/ 301`), "The removed Ecofirst case lands on this language's portfolio");
  });

  test(`${locale}: the film source carries no retired claim or customer name`, async () => {
    const film = await readFile(new URL("../videos/kevin-launch-film/index.html", import.meta.url), "utf8");
    for (const claim of ["+50%", "+20%", "ecofirst-hvac", "ecofirst-app", "218", "約 100 棟", "~100 buildings"]) assert.ok(!film.includes(claim), claim);
  });

  test(`${locale}: film chapter buttons leave the whole scrubber free to press and drag`, async () => {
    const css = await readFile(new URL("../components/motion/HeroFilm.module.css", import.meta.url), "utf8");
    const rule = (name) => css.match(new RegExp(`\\.${name} \\{([^}]*)\\}`))[1];
    assert.match(rule("scrubber"), /z-index: 1/, "The scrubber must sit above the chapter buttons");
    assert.match(rule("chapter"), /height: \.95rem/, "Chapter buttons must stop above the scrubber");
  });

  test(`${locale}: every film chapter visibly grows the radar axes its card names`, async () => {
    const film = await readFile(new URL("../videos/kevin-launch-film/index.html", import.meta.url), "utf8");
    const rows = [...film.matchAll(/grow: \[(\d), (\d)\], shape: \[([^\]]+)\]/g)].map((m) => ({ grow: [+m[1], +m[2]], shape: m[3].split(",").map(Number) }));
    assert.equal(rows.length, 8);
    rows.slice(1).forEach((row, i) => {
      for (const axis of row.grow) assert.ok(row.shape[axis] - rows[i].shape[axis] >= 0.1, `chapter ${i + 1}, axis ${axis}`);
    });
  });

  test(`${locale}: unconfirmed claims and older positioning stay off every page`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const ids = ["internal-backend", "grocery", "health-app", "cdp", "sensor-naming", "sales-faq", "namecard", "life-hub", "resume-site"];
    const pages = [file, portfolioFile, `../out/${prefix}resume/index.html`, ...ids.map((id) => `../out/${prefix}cases/${id}/index.html`)];
    const stale = ["4,491", "31 個案場", "31 sites", "把業務到 RD 接成一條線", "AI 節能產品｜營運系統", "一到兩成", "一成多", "10 to 20%", "10%-plus", "不必設定", "no-setup", "need no configuration", "18 條", "18 human-set", "18 threshold", "+50%", "交付效率", "elivery efficiency", "+20%", "案場營運效率", "ite-ops efficiency", "營運效率提升 20%", "operational efficiency by 20%", "股神打架", "Stock Gods Fight", "−99%", " -30%", "看工作案例", "查看案例詳情", "看細節", "See work cases", "View case details", "營運流程數位化", "Operations digitization, internal", "digitizing operations", "Product Manager（規劃與實作）", "vibe coding"];
    for (const page of pages) {
      const raw = await readFile(new URL(page, import.meta.url), "utf8");
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
    const chapters = ["ai-build"];
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
    const life = ai;
    // Links live in attributes, so the private project names are checked before tags are stripped.
    // The life-hub case page is public; its repository and the finance tracker are not.
    for (const banned of ["github.com", "stock_analysis", "stock-analysis"]) {
      assert.ok(!life.includes(banned), `Chapter 3 must not link to ${banned}`);
    }
    for (const banned of ["九州", "熊本", "Kyushu", "Kumamoto"]) assert.ok(!ai.includes(banned));
  });

  test(`${locale}: corrected counts`, async () => {
    const prefix = locale === "en" ? "en/" : "";
    const pages = [file];
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
    for (const id of ["internal-backend", "grocery", "health-app", "cdp"]) {
      assert.ok(html.includes(`href="${prefix}cases/${id}/"`), `Résumé links to the ${id} case`);
    }
    assert.ok(html.includes("+233%") && html.includes("+66%"), "Canonical figures appear on the résumé");
    assert.ok(html.includes(locale === "zh" ? "2022/8 - 2022/10" : "Aug 2022 - Oct 2022"), "The gap line shows on the résumé");
    const text = (page) => page.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "");
    const shared = locale === "zh" ? "單一案場異常處理從 30 分鐘縮短到 3 分鐘" : "Cut per-site issue handling from 30 to 3 minutes";
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

test("the home timeline stacks on phones and places its parts by name", async () => {
  // Removing the disclosure left .signal as the last child, so a rule meant for its control squeezed the dates
  // into a sliver beside the highlight and the two overlapped on every phone.
  const css = await readFile(new URL("../components/Timeline.module.css", import.meta.url), "utf8");
  assert.ok(!css.includes(":last-child"), "Grid placement must not depend on which child happens to be last");
  const phone = css.match(/@media \(max-width: 767px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(phone, /\.summary \{[^}]*grid-template-columns: minmax\(0, 1fr\);/, "A phone row is one column");
  assert.match(css, /\.year \{[^}]*white-space: nowrap;/, "A date range stays on one line");
});

test("the home shelf's spanning cards keep a shape in two columns", async () => {
  // height: 100% has nothing to fill once a spanning card is alone in its row, and its content is absolutely placed.
  const css = await readFile(new URL("../components/ProofStack.module.css", import.meta.url), "utf8");
  const tablet = css.match(/@media \(min-width: 768px\) and \(max-width: 1023px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(tablet, /\.lead \.link,\s*\.poster:last-child \.link \{[^}]*aspect-ratio: \d+ \/ \d+;/);
});

test("the résumé's phone layout never reaches paper", async () => {
  // An A4 sheet is about 690 px wide, so a bare max-width query collapses the printed rail into one column.
  const css = await readFile(new URL("../components/ResumePage.module.css", import.meta.url), "utf8");
  assert.ok(!/@media \(max-width/.test(css), "Résumé max-width queries must be limited to screen");
  assert.match(css, /@media screen and \(max-width: 767px\)/);
  assert.match(css, /@media print[\s\S]*--rail: \d+mm/, "Paper keeps the date rail");
});

test("on screen and paper the accent marks results, not labels", async () => {
  const css = await readFile(new URL("../components/ResumePage.module.css", import.meta.url), "utf8");
  const rule = (selector) => css.match(new RegExp(`(?:^|\\n)${selector} \\{([^}]*)\\}`))?.[1] ?? "";
  assert.match(rule("\\.figure"), /color: var\(--accent\)/, "All three figures carry the accent");
  assert.match(rule("\\.lead"), /color: var\(--accent\)/, "Each bullet's result carries the accent");
  assert.match(rule("\\.skills dt"), /color: var\(--fg\)/, "Skill labels stay ink");
  assert.ok(!css.includes(".results > li:first-child .figure"), "No single figure is singled out");
  assert.ok(!/@media print[\s\S]*\.(?:figure|lead|skills dt) \{[^}]*(?:^|[\s;])color:/.test(css), "Paper inherits the same colours");
});
