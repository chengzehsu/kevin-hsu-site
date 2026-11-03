import type { Locale } from "@/lib/locale";

/** A secondary frame (launch-film still or published post) that supports one case. */
export interface CaseStill {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** The single outcome a case leads with, split so the number can be set in display size. */
export interface CaseHeadline {
  value: string;
  unit?: string;
  delta?: string;
  label: string;
  /** A second, smaller outcome shown beside the headline. */
  also?: string;
}

export interface CaseArtifact {
  src: string;
  alt: string;
  title: string;
  context: string;
  layout?: "square";
  treatment?: "anonymised" | "published" | "reconstructed";
  /** A raster sharp enough to fill the cover; without it a raster floats small over a blurred copy. */
  sharp?: boolean;
  headline: CaseHeadline;
  stills?: CaseStill[];
}

const FILM = { width: 1600, height: 1000 } as const;

export const caseArtifacts: Record<Locale, Record<string, CaseArtifact>> = {
  zh: {
    "resume-site": {
      src: "/hero-reel-poster.zh.webp",
      alt: "這個網站開場影片的結尾畫面：姓名與能力雷達圖",
      title: "這個網站的開場影片",
      context: "從 HTML 產生，中英文各一版",
      treatment: "published",
      sharp: true,
      headline: { value: "7 週", label: "一個人用 Claude Code 做出中英文網站和開場影片（86 次程式提交）", also: "程式更新後自動上線" },
    },
    "internal-backend": {
      src: "/portfolio-artifacts/internal-backend-plate.webp",
      sharp: true,
      alt: "內部後台的兩個畫面：資料回傳總覽每個案場一行結論；收值健康頁第一行寫出 339 個點位常常缺資料、22 台設備已檢查，下方每個問題寫出實際值和正常範圍，並標明交給工程師或現場",
      title: "收值健康頁（設備資料回傳狀況）：先講結論，再給細節",
      context: "PM 不用等工程師，自行導入案場",
      treatment: "anonymised",
      headline: { value: "約 2 週 → 約 2 小時", label: "新舊案場都能導入，PM 自己完成，不用再等工程師（不含現場接線與控制策略）", also: "每輪點位測試的交接 4 → 0 次" },
    },
    "sensor-naming": {
      src: "/ai-covers/naming-core.svg",
      alt: "示意圖：資料回傳與模擬分析兩條流程都接到同一支命名程式，命名字典由人拍板",
      title: "一支命名程式，兩條流程共用",
      context: "廠商清單不再靠人工對照",
      treatment: "reconstructed",
      headline: { value: "93%", label: "的廠商清單項目，機器一次對到標準名稱（抽 72 筆實測）", also: "「信心很高卻答錯」0 筆" },
    },
    "sales-faq": {
      src: "/ai-covers/faq.svg",
      alt: "示意圖：許多問題經過兩道人工關卡，只剩確認過的答案",
      title: "產出、審核、使用，三段分工",
      context: "業務只拿得到確認過的答案",
      treatment: "reconstructed",
      headline: { value: "51 題", label: "正式答案，業務可直接查（AI 整理 185 題，人工確認才開放）", also: "還有 130 題等主管審核" },
    },
    "life-hub": {
      src: "/ai-covers/life.svg",
      alt: "示意圖：信件變成整理好的單據，行事曆上有一個提醒",
      title: "信件、帳單、提醒，在同一個流程處理",
      context: "帳單和提醒，一個地方管",
      treatment: "reconstructed",
      headline: { value: "每天在用", label: "整理帳單並提醒繳費，從 2026/3 用到現在", also: "不登入網路銀行" },
    },
    grocery: {
      src: "/portfolio-artifacts/grocery-system.zh.svg",
      alt: "蔬果電商專案資訊系統：客戶、工程與設計團隊、同事每週重複問的進度、上版、時數與過往做法，收進資訊流盤點、專案總覽與專案詳細資訊三個模組",
      title: "資訊流盤點、專案總覽與詳細資訊",
      context: "從分散資訊到可追蹤的交付系統",
      treatment: "reconstructed",
      headline: { value: "300 → 1,000", unit: "單／日", delta: "（+233%）", label: "揀貨產能" },
      stills: [
        {
          src: "/portfolio-wall/film-2.webp",
          alt: "介紹影片畫面：2021 Fable 寓意科技，揀貨 300 → 1,000 單／日 (+233%)",
          caption: "介紹影片｜2021 Fable 寓意科技",
          ...FILM,
        },
      ],
    },
    "health-app": {
      src: "/portfolio-artifacts/health-spec.zh.svg",
      alt: "健康 App 規格整理：透過訪談還原 IoT 體重計、活動報名、多國語系與舊資料的情境，整理成 Wireframe、User Story、PRD、參數對照表與翻譯對照表",
      title: "Wireframe、User Story、PRD 與對照表",
      context: "把跨裝置的使用情境，寫成工程師能照著做的規格",
      treatment: "reconstructed",
      headline: { value: "12,000 → 20,000", unit: "DAU", delta: "（+66%）", label: "每日活躍使用者，新平台上線 1 年（團隊成果）" },
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.svg",
      alt: "CDP 市場切入驗證資訊圖，呈現 30 個目標名單、跨部門訪談、MVP 收斂及 1,000 萬筆資料整合成果",
      title: "從 30 個目標名單到 MVP",
      context: "用市場驗證的結果縮小切入點，再串起 5 個通路",
      treatment: "reconstructed",
      headline: { value: "1,000 萬筆", label: "跨 3 個產業、5 個通路的客戶資料，完成串接" },
      stills: [
        {
          src: "/portfolio-wall/film-1.webp",
          alt: "介紹影片畫面：2020 歐可達數據，讓資料說話",
          caption: "介紹影片｜2020 歐可達數據",
          ...FILM,
        },
      ],
    },
    ecofirst: {
      src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
      alt: "Ecofirst HVAC 內部後台成果圖，顯示兩個月 218 次程式提交，以及案場點位、資料匯出與互動查詢整合畫面",
      title: "Ecofirst HVAC 內部後台",
      context: "748 次程式提交，把散落的資料流程整合進同一個後台",
      layout: "square",
      treatment: "published",
      headline: { value: "4～5 輪 → 1～2 輪", label: "需求確認的來回次數（內部估算）", also: "17 個資料庫串起業務到 RD" },
      stills: [
        {
          src: "/portfolio-wall/film-7.webp",
          alt: "介紹影片畫面：用 Claude Code 做出內部平台，2 個月 218 次提交",
          caption: "內部後台｜2 個月 218 次程式提交",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/ecofirst-ops.zh.svg",
          alt: "Notion 營運系統：名片、客戶、專案與業務推進連到售前閘門，再進軟體部專案與需求池，並以 PM 期待日對比 RD 預計日判斷插單；業務推進 1,639 筆、RD 任務 1,829 筆",
          caption: "營運系統｜從業務到 RD，資料都串在一起",
          ...FILM,
        },
      ],
    },
    namecard: {
      src: "/portfolio-artifacts/namecard-journey.zh.svg",
      alt: "AI 名片管理助手的演進：個人原型、欄位對齊公司 CRM 並把判斷欄位留給業務、嘗試多租戶與訂閱方案，最後依實際用量拆掉分散式架構",
      title: "從原型、配合 CRM 欄位，到依用量精簡架構",
      context: "業務不用再手動輸入名片",
      treatment: "reconstructed",
      headline: { value: "縮短 99%", label: "名片建檔時間：手動輸入改成 LINE 拍照", also: "內部工具與 SaaS，兩種架構都親手做過" },
      stills: [
        {
          src: "/portfolio-artifacts/namecard-rightsize.zh.svg",
          alt: "架構盤點前後對照：為分散式多租戶準備的佇列、快取與即時推播元件被拆掉，LINE 到 AI 辨識到 Notion 的流程保留；範例名片為虛構人物",
          caption: "架構盤點｜依實際用量拆掉多餘元件",
          ...FILM,
        },
      ],
    },
  },
  en: {
    "resume-site": {
      src: "/hero-reel-poster.en.webp",
      alt: "The closing frame of this site's launch film: name and capability radar",
      title: "This site's launch film",
      context: "Generated from HTML, in Chinese and English",
      treatment: "published",
      sharp: true,
      headline: { value: "7", unit: "weeks", label: "Built solo with Claude Code: a bilingual site and launch film (86 commits)", also: "Updates deploy automatically" },
    },
    "internal-backend": {
      src: "/portfolio-artifacts/internal-backend-plate.webp",
      sharp: true,
      alt: "Two internal platform screens: the data-collection overview with one conclusion per site, and the collection health page, whose first line reads 339 sensor points often missing data and 22 units checked; each issue below states the actual value and the normal range and is assigned to the data-collection engineer or the site",
      title: "Data-collection health page: conclusion first, detail second",
      context: "PMs onboard sites without waiting on engineers",
      treatment: "anonymised",
      headline: { value: "~2 weeks → ~2 hours", label: "to onboard a new or existing site, done by PMs with no engineer wait (excluding on-site wiring and control strategy)", also: "4 → 0 handoffs per round of testing" },
    },
    "sensor-naming": {
      src: "/ai-covers/naming-core.svg",
      alt: "Illustration: data collection and analysis both call one naming tool, with a person-approved dictionary",
      title: "One naming tool, two workflows",
      context: "No more mapping vendor lists by hand",
      treatment: "reconstructed",
      headline: { value: "93%", label: "of sensors matched correctly on the first try (72-sensor walkthrough)", also: "0 confident-but-wrong answers" },
    },
    "sales-faq": {
      src: "/ai-covers/faq.svg",
      alt: "Illustration: many questions pass two human approval steps, and only confirmed answers come out",
      title: "Draft, review, use",
      context: "Reps only get confirmed answers",
      treatment: "reconstructed",
      headline: { value: "51", unit: "entries", label: "of approved answers sales reps can look up (AI drafted 185; each needs human approval)", also: "130 more waiting on the sales lead" },
    },
    "life-hub": {
      src: "/ai-covers/life.svg",
      alt: "Illustration: mail becomes sorted receipts, with a reminder on the calendar",
      title: "Mail, bills, reminders, one path",
      context: "Bills and reminders in one place",
      treatment: "reconstructed",
      headline: { value: "Daily use", label: "sorting bills and sending payment reminders, since Mar 2026", also: "Never logs in to online banking" },
    },
    grocery: {
      src: "/portfolio-artifacts/grocery-system.en.svg",
      alt: "Fresh-produce e-commerce project information system: the questions about timelines, releases, billable hours, and past decisions that clients, the build team, and colleagues asked every week, gathered into an information-flow map, a project overview, and project detail pages",
      title: "Information-flow map, project overview, and details",
      treatment: "reconstructed",
      context: "Turning fragmented updates into a traceable delivery system",
      headline: { value: "300 → 1,000", unit: "orders/day", delta: "(+233%)", label: "Daily order-picking capacity" },
      stills: [
        {
          src: "/portfolio-wall/film-2.webp",
          alt: "Film still: 2021 at Fable, picking capacity 300 → 1,000 orders/day (+233%)",
          caption: "Launch film | 2021 at Fable",
          ...FILM,
        },
      ],
    },
    "health-app": {
      src: "/portfolio-artifacts/health-spec.en.svg",
      alt: "Health-app scenarios turned into specs: interviews surfaced the IoT scale, event sign-up, language, and legacy-data scenarios, which became a wireframe, user stories, a PRD, a parameter map, and a translation map",
      title: "Wireframe, user stories, PRD, and mapping tables",
      treatment: "reconstructed",
      context:
        "Turning cross-device scenarios into specs engineers can build from",
      headline: { value: "12,000 → 20,000", unit: "DAU", delta: "(+66%)", label: "Daily active users, one year after launch (team result)" },
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.en.svg",
      alt: "CDP market-entry validation graphic showing 30 target accounts, cross-functional interviews, MVP convergence, and 10 million integrated records",
      title: "From 30 target accounts to an MVP",
      context:
        "Narrowing the entry point with evidence before connecting five channels",
      treatment: "reconstructed",
      headline: { value: "10M", unit: "customer records", label: "Connected across 3 industries × 5 channels" },
      stills: [
        {
          src: "/portfolio-wall/film-1.webp",
          alt: "Film still: 2020 at Oakda, letting data speak",
          caption: "Launch film | 2020 at Oakda",
          ...FILM,
        },
      ],
    },
    ecofirst: {
      src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
      alt: "Ecofirst HVAC internal-platform result showing 218 commits in 2 months and an integrated workflow for sensor points, data export, and interactive queries",
      title: "Ecofirst HVAC internal platform",
      context: "748 commits turned scattered data workflows into one platform",
      layout: "square",
      treatment: "published",
      headline: { value: "4-5 → 1-2", unit: "rounds", label: "Requirement sign-off rounds (internal estimate)", also: "17 Notion databases linking sales to engineering" },
      stills: [
        {
          src: "/portfolio-wall/film-7.webp",
          alt: "Film still: an internal platform built with Claude Code, 218 commits in 2 months",
          caption: "Internal platform | 218 commits in 2 months",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/ecofirst-ops.en.svg",
          alt: "Notion operating model: business cards, customers, projects, and sales updates feed a presales gate, then software projects and a requirements queue that flags rush jobs by comparing the PM's date with engineering's estimate; 1,639 sales updates and 1,829 engineering tasks",
          caption: "Operating model | Sales and engineering connected in one data flow",
          ...FILM,
        },
      ],
    },
    namecard: {
      src: "/portfolio-artifacts/namecard-journey.en.svg",
      alt: "How the AI business-card assistant evolved: a personal prototype, fields matched to the company CRM with judgment fields left to sales, a multi-tenant trial with subscription plans, then a version scaled back to match real usage",
      title: "From prototype to CRM fit to right-sized",
      context: "Fixing how sales files business cards",
      treatment: "reconstructed",
      headline: { value: "99% less", label: "Time to log a business card, vs manual entry", also: "Built it both as an internal tool and as a SaaS product" },
      stills: [
        {
          src: "/portfolio-artifacts/namecard-rightsize.en.svg",
          alt: "Infrastructure audit before and after: the queue, cache, and real-time push components built for a distributed multi-tenant service are removed, and the LINE to AI to Notion flow stays; the sample card is a made-up person",
          caption: "Infrastructure audit | Extra components removed to match real usage",
          ...FILM,
        },
      ],
    },
  },
};

/**
 * Home-shelf posters: portrait and text-free, so the card's outcome reads alone over its scrim.
 * The landscape artifacts lose their headlines when cropped to 3:4. No words, so both locales share them.
 */
export const CASE_POSTERS: Record<string, string> = {
  grocery: "/case-posters/grocery.svg",
  ecofirst: "/case-posters/ecofirst.svg",
  "health-app": "/case-posters/health-app.svg",
  cdp: "/case-posters/cdp.svg",
};
export const CASE_POSTER_SIZE = { width: 600, height: 800 } as const;

/**
 * A real screen for the lead shelf card, which spans two columns: a portrait poster leaves most of a
 * wide card empty. The screen sits above the copy, never behind it, so its words do not fight the card text.
 */
export const CASE_SHELF_SHOTS: Record<string, { src: string; width: number; height: number }> = {
  "internal-backend": { src: "/portfolio-artifacts/internal-backend-overview.webp", width: 1648, height: 686 },
};

/** Decorative tiles for the case-page backdrop, echoing the portfolio wall. */
export const CASE_WALL_TILES = [
  "/portfolio-artifacts/internal-backend-overview.webp",
  "/portfolio-artifacts/grocery-system.zh.svg",
  "/portfolio-artifacts/internal-backend-site-health.webp",
  "/portfolio-artifacts/health-spec.zh.svg",
  "/portfolio-wall/film-6.webp",
  "/portfolio-artifacts/cdp-market-validation.svg",
  "/portfolio-artifacts/internal-backend-warroom.webp",
  "/portfolio-artifacts/ecofirst-ops.zh.svg",
  "/portfolio-wall/film-7.webp",
  "/portfolio-artifacts/internal-backend-timeseries.webp",
] as const;
