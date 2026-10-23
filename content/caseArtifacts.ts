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
    "internal-backend": {
      src: "/portfolio-artifacts/internal-backend-plate.webp",
      sharp: true,
      alt: "內部後台的兩個畫面：收值總覽每個案場一行結論；收值健康頁第一行寫出 339 個點位常常缺資料、22 台設備已檢查，下方每個問題寫出實際值和正常範圍，並標明交給收值工程師或現場",
      title: "收值健康頁：先講結論，再給細節",
      context: "34 個案場，一個畫面看完",
      treatment: "anonymised",
      headline: {
        value: "34",
        unit: "個案場",
        label: "在同一個畫面看資料狀態（2026/10）",
        also: "748 次提交，由我獨立完成",
      },
    },
    "sensor-naming": {
      src: "/ai-covers/naming-core.svg",
      alt: "示意圖：收值與模擬分析兩條流程都接到同一支命名程式，命名字典由人拍板",
      title: "一支命名程式，兩條流程共用",
      context: "廠商清單不再靠人工對照",
      treatment: "reconstructed",
      headline: { value: "93%", label: "的點位機器一次就對（72 點走查）", also: "「信心很高卻答錯」0 筆" },
    },
    "sales-faq": {
      src: "/ai-covers/faq.svg",
      alt: "示意圖：許多問題經過兩道人工關卡，只剩確認過的答案",
      title: "產、審、用三段分工",
      context: "業務只拿得到確認過的答案",
      treatment: "reconstructed",
      headline: { value: "51 / 185", label: "題通過授權，業務現在問得到（2026/9）", also: "瓶頸在人工審核，不在 AI" },
    },
    "life-hub": {
      src: "/ai-covers/life.svg",
      alt: "示意圖：信件變成整理好的單據，行事曆上有一個提醒",
      title: "信件、帳單、提醒，一條路徑",
      context: "帳單和提醒，一個地方管",
      treatment: "reconstructed",
      headline: { value: "117", label: "次提交，從 2026/3 用到現在", also: "不登入網路銀行" },
    },
    grocery: {
      src: "/portfolio-artifacts/grocery-system.zh.svg",
      alt: "蔬果電商專案資訊系統：客戶、工程與設計團隊、同事每週重複問的進度、上版、時數與過往做法，收進資訊流盤點、專案總覽與專案詳細資訊三個模組",
      title: "資訊流盤點、專案總覽與詳細資訊",
      context: "從分散資訊到可追蹤的交付系統",
      treatment: "reconstructed",
      headline: {
        value: "300 → 1,000",
        unit: "單／日",
        delta: "(+233%)",
        label: "揀貨日產能",
      },
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
      alt: "健康 App 情境規格化：訪談還原 IoT 體重計、活動報名、多國語系與舊資料的情境，整理成 Wireframe、User Story、PRD、參數對照表與翻譯對照表",
      title: "Wireframe、User Story、PRD 與對照表",
      context: "把跨裝置情境轉成工程可執行規格",
      treatment: "reconstructed",
      headline: {
        value: "12,000 → 20,000",
        unit: "DAU",
        delta: "(+66%)",
        label: "新平台上線後 1 年",
      },
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.svg",
      alt: "CDP 市場切入驗證資訊圖，呈現 30 個目標名單、跨部門訪談、MVP 收斂及 1,000 萬筆資料整合成果",
      title: "從 30 個目標名單到 MVP",
      context: "用市場證據縮小切入點，再串起 5 個通路",
      treatment: "reconstructed",
      headline: {
        value: "1,000 萬筆",
        label: "資料整合｜3 產業 × 5 通路",
      },
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
      alt: "Ecofirst HVAC 內部平台成果圖，顯示兩個月 218 次提交，以及案場點位、資料匯出與互動查詢整合畫面",
      title: "Ecofirst HVAC 內部平台",
      context: "218 次提交，把三段資料流程整合成一個查詢工具",
      layout: "square",
      treatment: "published",
      headline: { value: "+50%", label: "交付效率", also: "案場營運效率 +20%" },
      stills: [
        {
          src: "/portfolio-wall/film-6.webp",
          alt: "介紹影片畫面：用 Claude Code 做出內部平台，2 個月 218 次提交",
          caption: "內部平台｜2 個月 218 次提交",
          ...FILM,
        },
        {
          src: "/portfolio-wall/film-7.webp",
          alt: "介紹影片畫面：控制策略調整從 1 週縮短到 2 小時",
          caption: "控制策略調整｜1 週 → 2 小時",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/ecofirst-ops.zh.svg",
          alt: "Notion 營運系統：名片、客戶、專案與業務推進連到售前閘門，再進軟體部專案與需求池，並以 PM 期待日對比 RD 預計日判斷插單；業務推進 1,639 筆、RD 任務 1,829 筆",
          caption: "營運系統｜業務到 RD 接成一條資料鏈",
          ...FILM,
        },
      ],
    },
    namecard: {
      src: "/portfolio-artifacts/namecard-journey.zh.svg",
      alt: "AI 名片管理助手的演進：個人原型、欄位對齊公司 CRM 並把判斷欄位留給業務、嘗試多租戶與訂閱方案，最後依實際用量拆掉分散式架構",
      title: "從原型、對齊 CRM 到依用量瘦身",
      context: "解決公司業務的名片建檔",
      treatment: "reconstructed",
      headline: {
        value: "−99%",
        label: "拍照到建檔時間",
        also: "內部工具與 SaaS，兩種架構都親手做過",
      },
      stills: [
        {
          src: "/portfolio-artifacts/namecard-rightsize.zh.svg",
          alt: "架構盤點前後對照：為分散式多租戶準備的佇列、快取與即時推播元件被拆掉，LINE 到 AI 辨識到 Notion 的流程保留；範例名片為虛構人物",
          caption: "架構盤點｜依實際用量拆掉多餘元件",
          ...FILM,
        },
      ],
    },
    "podcast-stock": {
      src: "/portfolio-artifacts/podcast-arena.zh.svg",
      alt: "股神打架：同一檔示範標的，多方三個節目、空方一個節目並排，各附原話與出處；不採用 3 比 1 多數決，只攤開論點，不給買賣建議。圖中資料皆為示範",
      title: "同一檔股票，多空論點並排",
      context: "買股前，沒空聽 podcast",
      treatment: "reconstructed",
      headline: {
        value: "不做多數決",
        label: "多空並排，每句都附原話",
      },
      stills: [
        {
          src: "/portfolio-artifacts/podcast-trail.zh.svg",
          alt: "同一個節目對示範標的的看法從看多、沒選邊到看空，每一步都留著原話、集數與時間點",
          caption: "觀點有出處｜看法變了也查得到",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/podcast-honesty.zh.svg",
          alt: "三條誠實規則：對不上原文不計分、沒選邊不算輸贏、樣本不足顯示資料不足；另有 90 筆實際觀點中 86% 強度分數擠在 0.6 到 0.9 的示意直方圖",
          caption: "誠實規則｜證據不夠，就不給分",
          ...FILM,
        },
      ],
    },
  },
  en: {
    "internal-backend": {
      src: "/portfolio-artifacts/internal-backend-plate.webp",
      sharp: true,
      alt: "Two internal back office screens: the collection overview with one conclusion per site, and the collection health page, whose first line reads 339 sensor points often missing data and 22 units checked; each issue below states the actual value and the normal range and is assigned to the data-collection engineer or the site",
      title: "Collection health page: conclusion first, detail second",
      context: "34 sites on one screen",
      treatment: "anonymised",
      headline: {
        value: "34",
        unit: "sites",
        label: "data status on one screen (Oct 2026)",
        also: "748 commits, built on my own",
      },
    },
    "sensor-naming": {
      src: "/ai-covers/naming-core.svg",
      alt: "Illustration: data collection and analysis both call one naming program, with a person-approved dictionary",
      title: "One naming program, two flows",
      context: "No more mapping vendor lists by hand",
      treatment: "reconstructed",
      headline: { value: "93%", label: "of sensors right the first time (72-point walkthrough)", also: "0 confident-but-wrong answers" },
    },
    "sales-faq": {
      src: "/ai-covers/faq.svg",
      alt: "Illustration: many questions pass two human gates, and only confirmed answers come out",
      title: "Draft, review, use",
      context: "Reps only get confirmed answers",
      treatment: "reconstructed",
      headline: { value: "51 / 185", label: "entries authorized for reps (Sep 2026)", also: "The bottleneck is human review, not AI" },
    },
    "life-hub": {
      src: "/ai-covers/life.svg",
      alt: "Illustration: mail becomes sorted receipts, with a reminder on the calendar",
      title: "Mail, bills, reminders, one path",
      context: "Bills and reminders in one place",
      treatment: "reconstructed",
      headline: { value: "117", label: "commits, in daily use since Mar 2026", also: "Never logs in to online banking" },
    },
    grocery: {
      src: "/portfolio-artifacts/grocery-system.en.svg",
      alt: "Grocery program information system: the timeline, release, billable-hours, and past-decision questions clients, the build team, and colleagues asked every week, gathered into an information-flow map, a project overview, and project detail pages",
      title: "Information-flow map, project overview, and details",
      treatment: "reconstructed",
      context: "Turning fragmented updates into a traceable delivery system",
      headline: {
        value: "300 → 1,000",
        unit: "orders/day",
        delta: "(+233%)",
        label: "Daily picking capacity",
      },
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
      alt: "Health-app situations into specs: interviews recovered the IoT scale, event sign-up, language, and legacy-data situations, which became a wireframe, user stories, a PRD, a parameter map, and a translation map",
      title: "Wireframe, user stories, PRD, and mapping tables",
      treatment: "reconstructed",
      context:
        "Translating cross-device situations into buildable specifications",
      headline: {
        value: "12,000 → 20,000",
        unit: "DAU",
        delta: "(+66%)",
        label: "One year after the new platform launched",
      },
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.en.svg",
      alt: "CDP market-entry validation graphic showing 30 target accounts, cross-functional interviews, MVP convergence, and 10 million integrated records",
      title: "From 30 target accounts to an MVP",
      context:
        "Narrowing the entry point with evidence before connecting five data sources",
      treatment: "reconstructed",
      headline: {
        value: "10M",
        unit: "records",
        label: "Connected across 3 industries × 5 channels",
      },
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
      alt: "Ecofirst HVAC internal-platform result showing 218 commits in two months and an integrated site-point, data-export, and interactive-query workflow",
      title: "Ecofirst HVAC internal platform",
      context: "218 commits turned three data workflows into one query tool",
      layout: "square",
      treatment: "published",
      headline: {
        value: "+50%",
        label: "Delivery efficiency",
        also: "Site-ops efficiency +20%",
      },
      stills: [
        {
          src: "/portfolio-wall/film-6.webp",
          alt: "Film still: an internal platform built with Claude Code, 218 commits in 2 months",
          caption: "Internal platform | 218 commits in 2 months",
          ...FILM,
        },
        {
          src: "/portfolio-wall/film-7.webp",
          alt: "Film still: control-strategy tuning cut from 1 week to 2 hours",
          caption: "Control-strategy tuning | 1 week → 2 hours",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/ecofirst-ops.en.svg",
          alt: "Notion operating system: cards, clients, projects, and sales updates feed a presales gate, then software projects and a requirements queue that flags rush jobs by comparing the PM's date with RD's estimate; 1,639 sales updates and 1,829 RD tasks",
          caption: "Operating system | Sales to RD on one data chain",
          ...FILM,
        },
      ],
    },
    namecard: {
      src: "/portfolio-artifacts/namecard-journey.en.svg",
      alt: "How the AI business-card assistant evolved: a personal prototype, fields matched to the company CRM with judgment fields left to sales, a multi-tenant try with subscription plans, then a cut to real usage",
      title: "From prototype to CRM fit to right-sized",
      context: "Fixing how sales files business cards",
      treatment: "reconstructed",
      headline: {
        value: "−99%",
        label: "Photo-to-record time",
        also: "Built it both as an internal tool and as a SaaS",
      },
      stills: [
        {
          src: "/portfolio-artifacts/namecard-rightsize.en.svg",
          alt: "Infrastructure audit before and after: the queue, cache, and real-time push pieces built for a distributed multi-tenant service come out, and the LINE to AI to Notion flow stays; the sample card is a made-up person",
          caption: "Infrastructure audit | Extra pieces cut to real usage",
          ...FILM,
        },
      ],
    },
    "podcast-stock": {
      src: "/portfolio-artifacts/podcast-arena.en.svg",
      alt: "Stock Gods Fight: for one demo ticker, three bullish shows and one bearish show side by side, each with a quote and source; no 3 to 1 majority vote, arguments only, never a buy or sell call. All data is demo data",
      title: "One stock, bull and bear cases side by side",
      context: "No time for podcasts before buying",
      treatment: "reconstructed",
      headline: {
        value: "No majority vote",
        label: "Bulls and bears side by side, every line quoted",
      },
      stills: [
        {
          src: "/portfolio-artifacts/podcast-trail.en.svg",
          alt: "One show's view on a demo ticker moves from bullish to no side to bearish, and each step keeps its quote, episode, and timestamp",
          caption: "Claims with sources | A changed view stays on the record",
          ...FILM,
        },
        {
          src: "/portfolio-artifacts/podcast-honesty.en.svg",
          alt: "Three honesty rules: no match, no score; no side, no win or loss; thin samples show not enough data; plus a schematic histogram where 86% of 90 real claims' strength scores sit between 0.6 and 0.9",
          caption: "Honesty rules | Abstain rather than guess",
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
  "/portfolio-artifacts/grocery-system.zh.svg",
  "/portfolio-wall/film-5.webp",
  "/portfolio-artifacts/health-spec.zh.svg",
  "/portfolio-wall/film-6.webp",
  "/portfolio-artifacts/cdp-market-validation.svg",
  "/portfolio-wall/film-2.webp",
  "/flow-preview-small.webp",
  "/portfolio-wall/film-7.webp",
  "/portfolio-wall/film-1.webp",
  "/portfolio-wall/film-4.webp",
] as const;
