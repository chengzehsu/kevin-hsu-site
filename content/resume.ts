import type { Locale } from "@/lib/locale";

/**
 * The one-page résumé at /resume/ and /en/resume/: a plain, print-ready scan for HR.
 * Roles, case impacts, skills, and awards are read from the site content so numbers never drift;
 * this file only holds the page's own wording and which figure stands for each work case.
 */
export interface ResumeContent {
  /** Page heading and meta title prefix. */
  title: string;
  name: string;
  headline: string;
  /** Three sentences: years and domains, how Kevin works, scale led. */
  summary: string;
  /** Domain keywords HR and applicant-tracking systems scan for. */
  keywords: string;
  facts: Array<[value: string, label: string]>;
  /** Hero / nav entry label pointing at this page. */
  entryLabel: string;
  printLabel: string;
  printHint: string;
  portfolioLabel: string;
  websiteLabel: string;
  sections: {
    summary: string;
    highlights: string;
    experience: string;
    side: string;
    skills: string;
    awards: string;
  };
  /** Prefix of every link from a résumé line to its case page. */
  detailLabel: string;
  /** Large figure shown for each case, keyed by case id; the case's impact line sits beside it. */
  figures: Record<string, string>;
  /** Case pages that hold the detail behind a role, keyed by experience id. */
  roleCases: Record<string, string[]>;
  /** Closing line pointing readers who want depth to the portfolio. */
  moreText: string;
}

const roleCases = {
  ecofirst: ["ecofirst"],
  fable: ["grocery", "health-app"],
  oakda: ["cdp"],
};

export const resumeContent: Record<Locale, ResumeContent> = {
  zh: {
    title: "一頁履歷",
    name: "許承澤 Kevin Hsu",
    headline: "Product Manager｜AI、資料產品與複雜營運系統",
    summary:
      "5 年以上產品相關經驗，做過 AI 節能、電商、健康 App、跨通路資料平台與企業培訓。習慣從營運現場找出卡點、排定優先順序，帶跨部門團隊交付，再用數字驗證成果。帶領過 10 人工程團隊與 2 位初階 PM，管理 NT$1,200 萬以上的專案組合。",
    keywords: "熟悉 AI 工具導入、SaaS、CDP、Chatbot、儀表板、App 與電商產品場景。",
    facts: [
      ["5+ 年", "產品相關經驗"],
      ["8 段", "跨產業經歷"],
      ["12 人", "帶領團隊（工程 10、PM 2）"],
      ["NT$1,200 萬+", "管理專案組合"],
    ],
    entryLabel: "一頁履歷",
    printLabel: "列印／存成 PDF",
    printHint: "在列印視窗選「另存為 PDF」即可下載。",
    portfolioLabel: "看完整作品集",
    websiteLabel: "個人網站",
    sections: {
      summary: "摘要",
      highlights: "代表成果",
      experience: "工作經歷",
      side: "個人專案",
      skills: "技能",
      awards: "獎項與收錄",
    },
    detailLabel: "看細節",
    figures: {
      grocery: "+233%",
      ecofirst: "+50%",
      "health-app": "+66%",
      cdp: "1,000 萬筆",
    },
    roleCases,
    moreText: "每個成果背後的卡點、決策與量測方式，都寫在作品集的案例頁。",
  },
  en: {
    title: "One-page résumé",
    name: "Kevin Hsu (許承澤)",
    headline: "Product Manager · AI, data, and operational products",
    summary:
      "5+ years of product-related experience across AI energy products, e-commerce, a health app, a cross-channel data platform, and corporate learning. I find the bottleneck in the operating flow, set priorities, drive cross-functional delivery, and prove the result in numbers. Led a 10-person engineering team and two junior PMs, and managed a project portfolio of NT$12M+.",
    keywords:
      "Hands-on with AI tool adoption, SaaS, CDP, chatbots, dashboards, apps, and e-commerce products.",
    facts: [
      ["5+ yrs", "product experience"],
      ["8", "roles across industries"],
      ["12", "people led (10 engineers, 2 PMs)"],
      ["NT$12M+", "project portfolio managed"],
    ],
    entryLabel: "One-page résumé",
    printLabel: "Print / save as PDF",
    printHint: 'Choose "Save as PDF" in the print dialog to download.',
    portfolioLabel: "View full portfolio",
    websiteLabel: "Website",
    sections: {
      summary: "Summary",
      highlights: "Key results",
      experience: "Experience",
      side: "Side projects",
      skills: "Skills",
      awards: "Awards & features",
    },
    detailLabel: "Details",
    figures: {
      grocery: "+233%",
      ecofirst: "+50%",
      "health-app": "+66%",
      cdp: "10M records",
    },
    roleCases,
    moreText:
      "The bottleneck, decisions, and measurement behind every result are on the case pages.",
  },
};
