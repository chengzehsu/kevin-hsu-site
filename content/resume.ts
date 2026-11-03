import type { Locale } from "@/lib/locale";

/**
 * The résumé at /resume/ and /en/resume/: a plain, print-ready scan for HR, two A4 pages at most.
 * Roles and bullets are read from the site's experience content, so the two never drift;
 * this file only holds the page's own wording.
 */
export interface ResumeContent {
  /** Page heading and meta title prefix. */
  title: string;
  name: string;
  headline: string;
  /** One sentence: years, domains, and focus. */
  summary: string;
  /** Three results to scan, one line each. */
  summaryPoints: string[];
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
    education: string;
    side: string;
    skills: string;
    awards: string;
  };
  /** Prefix of every link from a résumé line to its case page. */
  detailLabel: string;
  /** Highest education, shown after the experience list. */
  education: { school: string; detail: string; period: string };
  /** Searchable skills for HR and applicant-tracking systems, grouped so a reader can scan them. */
  skills: Array<{ label: string; items: string[] }>;
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
    title: "履歷",
    name: "許承澤 Kevin Hsu",
    headline: "資深產品經理 Senior Product Manager｜平台重構與內部系統",
    summary: "Senior Product Manager，7 年以上 B2B、AI 與電商產品相關經驗，專注平台重構與內部系統。",
    summaryPoints: ["客戶導入 約 2 週 → 約 2 小時（不含現場接線與控制策略），34 個案場都適用", "電商揀貨 300 → 1,000 單／日，獲 AWS 收錄為案例", "專案帶領 10 位工程師、直屬管理 2 位初階 PM，獲 PMI 標竿專案獎優選"],
    entryLabel: "履歷",
    printLabel: "列印／存成 PDF",
    printHint: "在列印視窗選「另存為 PDF」即可下載。",
    portfolioLabel: "看完整作品集",
    websiteLabel: "個人網站",
    sections: {
      summary: "摘要",
      highlights: "代表成果",
      experience: "工作經歷",
      education: "學歷",
      side: "個人專案",
      skills: "技能",
      awards: "獎項與案例收錄",
    },
    detailLabel: "看案例",
    education: { school: "元智大學", detail: "資訊管理學系", period: "2014/9 - 2018/6" },
    roleCases,
    skills: [
      { label: "產品規劃", items: ["Product Roadmap", "PRD", "Prototype", "使用者研究"] },
      { label: "平台與資料", items: ["內部系統規劃", "CDP 規劃", "API 串接", "系統整合", "資料遷移", "資料品質", "IoT 整合"] },
      { label: "流程與協作", items: ["流程優化", "專案管理", "跨部門協作"] },
      { label: "AI 與工具", items: ["Claude Code", "Notion"] },
    ],
    moreText: "每個成果背後的痛點、決策與量測方式，都寫在作品集的案例頁。",
  },
  en: {
    title: "Résumé",
    name: "Kevin Hsu (許承澤)",
    headline: "Senior Product Manager | Platform rebuilds and internal systems",
    summary: "Senior Product Manager with 7+ years of product-related experience in B2B, AI, and e-commerce, focused on platform rebuilds and internal systems.",
    summaryPoints: ["Cut customer onboarding from about 2 weeks to about 2 hours (excluding on-site wiring and control strategy), across 34 sites", "Scaled e-commerce picking from 300 to 1,000 orders a day, featured as an AWS case study", "Led 10 engineers across projects and directly managed 2 junior PMs; won the 2022 PMI Taiwan Benchmark Project Merit Award"],
    entryLabel: "Résumé",
    printLabel: "Print / save as PDF",
    printHint: 'Choose "Save as PDF" in the print dialog to download.',
    portfolioLabel: "View full portfolio",
    websiteLabel: "Website",
    sections: {
      summary: "Summary",
      highlights: "Key results",
      experience: "Experience",
      education: "Education",
      side: "Side projects",
      skills: "Skills",
      awards: "Awards & features",
    },
    detailLabel: "Case study",
    education: { school: "Yuan Ze University", detail: "B.S., Information Management", period: "Sep 2014 - Jun 2018" },
    roleCases,
    skills: [
      { label: "Product planning", items: ["Product Roadmap", "PRD", "Prototyping", "User Research"] },
      { label: "Platforms and data", items: ["Internal Systems", "CDP", "API Integration", "System Integration", "Data Migration", "Data Quality", "IoT Integration"] },
      { label: "Process and teams", items: ["Process Optimization", "Project Management", "Cross-functional Collaboration"] },
      { label: "AI and tools", items: ["Claude Code", "Notion"] },
    ],
    moreText:
      "The bottleneck, the decisions, and how each result was measured are on the case study pages.",
  },
};
