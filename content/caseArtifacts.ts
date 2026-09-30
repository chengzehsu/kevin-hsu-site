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
  headline: CaseHeadline;
  stills?: CaseStill[];
}

const FILM = { width: 480, height: 300 } as const;

export const caseArtifacts: Record<Locale, Record<string, CaseArtifact>> = {
  zh: {
    grocery: {
      src: "/portfolio-artifacts/grocery-system.webp",
      alt: "蔬果電商專案的資訊流盤點、專案總覽與詳細資訊畫面，內容已模糊處理",
      title: "專案總覽、資訊流與知識庫",
      context: "從分散資訊到可追蹤的交付系統",
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
      src: "/portfolio-artifacts/health-spec.webp",
      alt: "健康 App 專案由 Wireframe、User Story 到 PRD 的工作畫面，內容已模糊處理",
      title: "Wireframe、User Story 與 PRD",
      context: "把跨裝置情境轉成工程可執行規格",
      headline: {
        value: "12,000 → 20,000",
        unit: "DAU",
        delta: "(+66%)",
        label: "新平台上線後 1 年",
      },
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.svg",
      alt: "CDP 市場切入驗證資訊圖，呈現三十個目標名單、跨部門訪談、MVP 收斂及一千萬筆資料整合成果",
      title: "從 30 個目標名單到 MVP",
      context: "用市場證據縮小切入點，再串起五個資料來源",
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
      alt: "EcoFirst HVAC 內部平台成果圖，顯示兩個月 218 次提交，以及案場點位、資料匯出與互動查詢整合畫面",
      title: "EcoFirst HVAC 內部平台",
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
          src: "/portfolio-wall/film-4.webp",
          alt: "介紹影片畫面：2025 台灣愛淨，交付效率 +50%，案場營運效率 +20%",
          caption: "介紹影片｜2025 台灣愛淨",
          ...FILM,
        },
      ],
    },
  },
  en: {
    grocery: {
      src: "/portfolio-artifacts/grocery-system.webp",
      alt: "An anonymised work-in-progress view of the grocery programme's information map, project overview, and detail system",
      title: "Programme overview, information flow, and knowledge base",
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
          alt: "Film still: 2021 at Fable, picking capacity 300 → 1,000 orders per day (+233%)",
          caption: "Launch film | 2021 at Fable",
          ...FILM,
        },
      ],
    },
    "health-app": {
      src: "/portfolio-artifacts/health-spec.webp",
      alt: "An anonymised work-in-progress view spanning wireframes, user stories, and the health-app PRD",
      title: "Wireframes, user stories, and PRD",
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
      src: "/portfolio-artifacts/cdp-market-validation.svg",
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
      alt: "EcoFirst HVAC internal-platform result showing 218 commits in two months and an integrated site-point, data-export, and interactive-query workflow",
      title: "EcoFirst HVAC internal platform",
      context: "218 commits turned three data workflows into one query tool",
      layout: "square",
      treatment: "published",
      headline: {
        value: "+50%",
        label: "Delivery efficiency",
        also: "Site operations +20%",
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
          src: "/portfolio-wall/film-4.webp",
          alt: "Film still: 2025 at Ecofirst, delivery efficiency +50%, site operations +20%",
          caption: "Launch film | 2025 at Ecofirst",
          ...FILM,
        },
      ],
    },
  },
};

/** Decorative tiles for the case-page backdrop, echoing the portfolio wall. */
export const CASE_WALL_TILES = [
  "/portfolio-artifacts/grocery-system.webp",
  "/portfolio-wall/film-5.webp",
  "/portfolio-artifacts/health-spec.webp",
  "/portfolio-wall/film-6.webp",
  "/portfolio-artifacts/cdp-market-validation.svg",
  "/portfolio-wall/film-2.webp",
  "/flow-preview-small.webp",
  "/portfolio-wall/film-7.webp",
  "/portfolio-wall/film-1.webp",
  "/portfolio-wall/film-4.webp",
] as const;
