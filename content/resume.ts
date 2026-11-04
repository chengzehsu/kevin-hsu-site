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
  /** Three results to scan, set like the results strip on home: the figure, what it measures, and its caveat or proof. */
  summaryPoints: Array<{ figure: string; label: string; note: string }>;
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
  ecofirst: ["internal-backend", "sensor-naming", "sales-faq"],
  fable: ["grocery", "health-app"],
  oakda: ["cdp"],
};

export const resumeContent: Record<Locale, ResumeContent> = {
  zh: {
    title: "履歷",
    name: "許承澤 Kevin Hsu",
    headline: "資深產品經理 Senior Product Manager｜平台重構與內部系統",
    summary:
      "Senior Product Manager，7 年以上 B2B、AI 與電商產品相關經驗，專注跨部門流程與系統整合的平台重構；進新產業會跟著同事跑現場與展覽，直接了解使用者問題，也能用 Claude Code 自建工具。",
    summaryPoints: [
      {
        figure: "約 2 週 → 約 2 小時",
        label: "客戶導入",
        note: "34 個案場都適用（不含現場接線與控制策略）",
      },
      {
        figure: "300 → 1,000 單／日",
        label: "電商出貨",
        note: "獲 AWS 收錄為案例",
      },
      {
        figure: "專案帶領 10 位工程師",
        label: "團隊規模",
        note: "直屬管理 2 位初階 PM，獲 PMI 標竿專案獎優選",
      },
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
      awards: "獎項與案例收錄",
    },
    detailLabel: "看案例",
    education: {
      school: "元智大學",
      detail: "資訊管理學系",
      period: "2014/9 - 2018/6",
    },
    roleCases,
    skills: [
      {
        label: "產品規劃",
        items: [
          "Product Roadmap",
          "PRD",
          "Prototype",
          "Wireframe",
          "User Story",
          "使用者研究",
        ],
      },
      {
        label: "平台與資料",
        items: [
          "內部系統規劃",
          "CDP 規劃",
          "行銷自動化",
          "API 串接",
          "系統整合",
          "資料遷移",
          "資料品質",
          "埋點規劃",
          "IoT 整合",
        ],
      },
      {
        label: "流程與協作",
        items: ["流程優化", "專案管理", "跨部門協作", "工作坊引導", "QA 驗收"],
      },
      {
        label: "AI 與工具",
        items: [
          "Claude Code",
          "Cursor",
          "Gemini",
          "AI 準確度評估",
          "人工審核流程設計",
          "Notion",
          "Asana",
        ],
      },
    ],
    moreText: "每個成果背後的痛點、決策與量測方式，都寫在作品集的案例頁。",
  },
  en: {
    title: "Résumé",
    name: "Kevin Hsu (許承澤)",
    headline: "Senior Product Manager | Platform rebuilds and internal systems",
    summary:
      "Senior Product Manager with 7+ years in B2B, AI, and e-commerce, focused on platform rebuilds across workflows and systems. I learn new industries at sites and trade shows, and build internal tools with Claude Code.",
    summaryPoints: [
      {
        figure: "~2 weeks → ~2 hours",
        label: "Customer onboarding",
        note: "For all 34 sites (excluding on-site wiring and control strategy)",
      },
      {
        figure: "300 → 1,000 orders/day",
        label: "E-commerce shipping",
        note: "Featured as an AWS case study",
      },
      {
        figure: "Led 10 engineers across projects",
        label: "Team size",
        note: "Directly managed 2 junior PMs; won the 2022 PMI Taiwan Benchmark Project Merit Award",
      },
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
    detailLabel: "Case study",
    education: {
      school: "Yuan Ze University",
      detail: "B.S., Information Management",
      period: "Sep 2014 - Jun 2018",
    },
    roleCases,
    skills: [
      {
        label: "Product planning",
        items: [
          "Product Roadmap",
          "PRD",
          "Prototyping",
          "Wireframes",
          "User Stories",
          "User Research",
        ],
      },
      {
        label: "Platforms and data",
        items: [
          "Internal Systems",
          "CDP",
          "Marketing Automation",
          "API Integration",
          "System Integration",
          "Data Migration",
          "Data Quality",
          "Event Tracking",
          "IoT Integration",
        ],
      },
      {
        label: "Process and teams",
        items: [
          "Process Optimization",
          "Workshops",
          "Project Management",
          "Cross-functional Collaboration",
          "QA",
        ],
      },
      {
        label: "AI and tools",
        items: [
          "Claude Code",
          "Cursor",
          "Gemini",
          "AI Accuracy Evaluation",
          "Human Review Workflows",
          "Notion",
          "Asana",
        ],
      },
    ],
    moreText:
      "The bottleneck, the decisions, and how each result was measured are on the case study pages.",
  },
};
