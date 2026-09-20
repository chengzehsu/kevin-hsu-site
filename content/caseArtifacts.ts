import type { Locale } from "@/lib/locale";

export interface CaseArtifact {
  src: string;
  alt: string;
  title: string;
  context: string;
  layout?: "square";
  treatment?: "anonymised" | "published" | "reconstructed";
}

export const caseArtifacts: Record<Locale, Record<string, CaseArtifact>> = {
  zh: {
    grocery: {
      src: "/portfolio-artifacts/grocery-system.webp",
      alt: "蔬果電商專案的資訊流盤點、專案總覽與詳細資訊畫面，內容已模糊處理",
      title: "專案總覽、資訊流與知識庫",
      context: "從分散資訊到可追蹤的交付系統",
    },
    "health-app": {
      src: "/portfolio-artifacts/health-spec.webp",
      alt: "健康 App 專案由 Wireframe、User Story 到 PRD 的工作畫面，內容已模糊處理",
      title: "Wireframe、User Story 與 PRD",
      context: "把跨裝置情境轉成工程可執行規格",
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.svg",
      alt: "CDP 市場切入驗證資訊圖，呈現三十個目標名單、跨部門訪談、MVP 收斂及一千萬筆資料整合成果",
      title: "從 30 個目標名單到 MVP",
      context: "用市場證據縮小切入點，再串起五個資料來源",
      treatment: "reconstructed",
    },
    ecofirst: {
      src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
      alt: "EcoFirst HVAC 內部平台成果圖，顯示兩個月 218 次提交，以及案場點位、資料匯出與互動查詢整合畫面",
      title: "EcoFirst HVAC 內部平台",
      context: "218 次提交，把三段資料流程整合成一個查詢工具",
      layout: "square",
      treatment: "published",
    },
  },
  en: {
    grocery: {
      src: "/portfolio-artifacts/grocery-system.webp",
      alt: "An anonymised work-in-progress view of the grocery programme's information map, project overview, and detail system",
      title: "Programme overview, information flow, and knowledge base",
      context: "Turning fragmented updates into a traceable delivery system",
    },
    "health-app": {
      src: "/portfolio-artifacts/health-spec.webp",
      alt: "An anonymised work-in-progress view spanning wireframes, user stories, and the health-app PRD",
      title: "Wireframes, user stories, and PRD",
      context: "Translating cross-device situations into buildable specifications",
    },
    cdp: {
      src: "/portfolio-artifacts/cdp-market-validation.svg",
      alt: "CDP market-entry validation graphic showing 30 target accounts, cross-functional interviews, MVP convergence, and 10 million integrated records",
      title: "From 30 target accounts to an MVP",
      context: "Narrowing the entry point with evidence before connecting five data sources",
      treatment: "reconstructed",
    },
    ecofirst: {
      src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
      alt: "EcoFirst HVAC internal-platform result showing 218 commits in two months and an integrated site-point, data-export, and interactive-query workflow",
      title: "EcoFirst HVAC internal platform",
      context: "218 commits turned three data workflows into one query tool",
      layout: "square",
      treatment: "published",
    },
  },
};
