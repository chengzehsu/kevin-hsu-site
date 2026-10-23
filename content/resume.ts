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
  ecofirst: ["internal-backend", "ecofirst"],
  fable: ["grocery", "health-app"],
  oakda: ["cdp"],
};

export const resumeContent: Record<Locale, ResumeContent> = {
  zh: {
    title: "一頁履歷",
    name: "許承澤 Kevin Hsu",
    headline: "Product Manager｜營運流程數位化、內部系統與 AI 導入",
    summary:
      "5 年以上產品相關經驗，做過 AI 節能、電商、健康 App、跨通路資料平台與企業培訓。進新產業先讀現場資料、訪談第一線，畫出跨部門的現有流程，找出等待、重複作業與資料斷點；把資料定義講清楚，再排定範圍與優先順序，帶跨部門團隊導入，用改善前後的數字驗證成果。原型與內部工具自己用 AI 做：AI 先提案、人來拍板，準了才放手。帶領過 10 人工程團隊與 2 位初階 PM，管理 NT$1,200 萬以上的專案組合。",
    keywords:
      "熟悉流程盤點、內部營運系統與資料整合（Notion、Asana、CDP）、POS 與電商資料串接、AI 與自動化工具導入（Claude Code、Notion AI）、SaaS、Chatbot、儀表板、App 與電商產品場景。",
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
      "internal-backend": "34 個案場",
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
    headline: "Product Manager · Operations digitization, internal systems, and AI adoption",
    summary:
      "5+ years of product-related experience across AI energy products, e-commerce, a health app, a cross-channel data platform, and corporate learning. In a new industry I start with field data and frontline interviews, map the cross-team flow to find waiting, repeated work, and data breaks, define the data clearly, then set scope and priorities, drive cross-functional rollout, and prove the result against a before-and-after baseline. I build prototypes and internal tools with AI myself: AI proposes, a person decides, and it earns autonomy. Led a 10-person engineering team and two junior PMs, and managed a project portfolio of NT$12M+.",
    keywords:
      "Hands-on with process mapping, internal operations systems and data integration (Notion, Asana, CDP), POS and e-commerce data integration, AI and automation adoption (Claude Code, Notion AI), SaaS, chatbots, dashboards, apps, and e-commerce products.",
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
      "internal-backend": "34 sites",
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
