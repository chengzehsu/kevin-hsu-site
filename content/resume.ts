import type { Locale } from "@/lib/locale";

/**
 * The résumé at /resume/ and /en/resume/: a plain, print-ready scan for HR, two A4 pages at most.
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
    education: string;
    side: string;
    skills: string;
    awards: string;
  };
  /** Prefix of every link from a résumé line to its case page. */
  detailLabel: string;
  /** Large figure shown for each case, keyed by case id; the case's impact line sits beside it. */
  figures: Record<string, string>;
  /** Highest education, shown after the experience list. */
  education: { school: string; detail: string; period: string };
  /** Which experience bullets the résumé keeps and in what order, by index; a role left out keeps them all. */
  roleBullets: Record<string, number[]>;
  /** Case pages that hold the detail behind a role, keyed by experience id. */
  roleCases: Record<string, string[]>;
  /** Closing line pointing readers who want depth to the portfolio. */
  moreText: string;
}

const roleBullets = {
  ecofirst: [1, 3, 0],
  advisory: [0, 1],
  sat: [0, 2, 1],
  consulting: [0, 1],
  huayao: [0, 1],
  oakda: [0, 1],
  zhongshuo: [1],
};

const roleCases = {
  ecofirst: ["internal-backend", "ecofirst"],
  fable: ["grocery", "health-app"],
  oakda: ["cdp"],
};

export const resumeContent: Record<Locale, ResumeContent> = {
  zh: {
    title: "履歷",
    name: "許承澤 Kevin Hsu",
    headline: "Product Manager｜營運流程數位化、內部系統與 AI 導入",
    summary:
      "7 年以上產品經驗，專注營運流程數位化、內部系統與 AI 導入。把蔬果電商揀貨從 300 提升到 1,000 單／日，帶過 10 人工程團隊與 2 位初階 PM。近期把 AI 放進開發流程，交付效率 +50%，並用 Claude Code 自己做出管理 34 個案場的內部後台。",
    keywords:
      "熟悉流程盤點、內部營運系統與資料整合（Notion、Asana、CDP）、POS 與電商資料串接、AI 與自動化工具導入（Claude Code、Notion AI）、SaaS、Chatbot、儀表板、App 與電商產品。",
    facts: [
      ["7+ 年", "產品相關經驗"],
      ["8 段", "跨產業經歷"],
      ["12 人", "帶領團隊（工程 10、PM 2）"],
      ["NT$1,200 萬+", "管理專案組合"],
    ],
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
      awards: "獎項與收錄",
    },
    detailLabel: "看細節",
    education: { school: "元智大學", detail: "資訊管理學系", period: "2014/9 - 2018/6" },
    figures: {
      "internal-backend": "34 個案場",
      grocery: "+233%",
      ecofirst: "+50%",
      "health-app": "+66%",
      cdp: "1,000 萬筆",
    },
    roleCases,
    roleBullets,
    moreText: "每個成果背後的痛點、決策與量測方式，都寫在作品集的案例頁。",
  },
  en: {
    title: "Résumé",
    name: "Kevin Hsu (許承澤)",
    headline: "Product Manager · Operations digitization, internal systems, and AI adoption",
    summary:
      "Product Manager with 7+ years in product, focused on digitizing operations, internal systems, and AI adoption. Raised grocery e-commerce picking from 300 to 1,000 orders a day and led a 10-person engineering team with two junior PMs. Recently brought AI into the development flow for +50% delivery efficiency, and built an internal back office covering 34 sites with Claude Code.",
    keywords:
      "Hands-on with process mapping, internal operations systems and data integration (Notion, Asana, CDP), POS and e-commerce data integration, AI and automation adoption (Claude Code, Notion AI), SaaS, chatbots, dashboards, apps, and e-commerce products.",
    facts: [
      ["7+ yrs", "product experience"],
      ["8", "roles across industries"],
      ["12", "people led (10 engineers, 2 PMs)"],
      ["NT$12M+", "project portfolio managed"],
    ],
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
    detailLabel: "Details",
    education: { school: "Yuan Ze University", detail: "B.S., Information Management", period: "Sep 2014 - Jun 2018" },
    figures: {
      "internal-backend": "34 sites",
      grocery: "+233%",
      ecofirst: "+50%",
      "health-app": "+66%",
      cdp: "10M records",
    },
    roleCases,
    roleBullets,
    moreText:
      "The bottleneck, decisions, and measurement behind every result are on the case pages.",
  },
};
