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
  /** The résumé wording of each role, keyed by experience id; the home page keeps the longer version. */
  roles: Record<string, { role?: string; summary?: string; bullets: string[] }>;
  /** One line of searchable skills for HR and applicant-tracking systems. */
  skills: string;
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
    headline: "Senior Product Manager｜B2B、AI 與電商產品",
    summary:
      "Senior Product Manager，7 年以上 B2B、AI 與電商產品經驗。擅長從第一線找問題、用 AI 做 Prototype 對齊需求，再串接 API 做成內部工具，將客戶導入從約 2 週縮短到約 2 小時；曾帶領 10 人工程團隊，獲 PMI 標竿專案獎優選。",
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
    roleCases,
    roles: {
      "ecofirst": {
        "summary": "負責 B2B AI 空調節能產品與 Roadmap，帶領 4 位工程師，專案規模約 NT$1 億，客戶平均節能率約 15%。",
        "bullets": [
          "需求處理 約 1 個月 → 約 1 週：用 AI 把需求直接做成 Prototype，讓業務、PM、工程師當場對齊",
          "客戶導入 約 2 週 → 約 2 小時：用 AI 串接 API 做出內部後台，3 位 PM 管理 34 個案場，每輪交接 4 次 → 0 次",
          "客戶儀表板 1 天完成，34 個案場都適用：從醫院需求做原型，再由工程團隊上線，改成設定驅動",
          "相關專案交付時間 -30%（估算）：常用功能做成共用工具、控制策略模組化"
        ]
      },
      "advisory": {
        "role": "Independent Consultant｜營運數位轉型與募資",
        "summary": "",
        "bullets": [
          "約 NT$1.7 億募資進入實質洽談，涵蓋能源、旅宿 2 案",
          "分析 106 間 Airbnb，找出住房率 90%（台北平均 65%）的房型，據此定位 2 棟旅館"
        ]
      },
      "sat": {
        "summary": "",
        "bullets": [
          "首週營業額破 NT$100 萬：3 週內切入香港市場",
          "訪談不同規模企業的人資，規劃企業培訓的學習數據儀表板"
        ]
      },
      "consulting": {
        "role": "Independent Consultant",
        "summary": "",
        "bullets": [
          "替 15 人外包團隊導入 Notion；替跨國 SaaS 公司擬定 Product Roadmap 並對應商業指標"
        ]
      },
      "huayao": {
        "summary": "",
        "bullets": [
          "建立產品資料庫，整合客戶、出貨與採購資訊；重新設計倉儲儲位與產品分類"
        ]
      },
      "fable": {
        "summary": "管理 NT$1,200 萬+ 專案組合，帶領 10 位工程師與 2 位初階 PM，獲 2022 PMI 標竿專案獎優選。",
        "bullets": [
          "揀貨 300 → 1,000 單／日（+233%），重構期間平台營收 +120%，獲 AWS 收錄為案例",
          "健康 App DAU 12,000 → 20,000（+66%）"
        ]
      },
      "oakda": {
        "summary": "",
        "bullets": [
          "管理 12 人產品團隊；整合 3 產業、5 通路、1,000 萬筆客戶資料"
        ]
      },
      "zhongshuo": {
        "role": "Product Assistant",
        "summary": "",
        "bullets": [
          "孵化 2 家早期公司，營收皆破 NT$100 萬"
        ]
      }
    },
    skills: "Product Management、Product Roadmap、PRD、Prototype、User Research、B2B、Generative AI、Claude Code、API Integration、Notion、Cross-functional Collaboration",
    moreText: "每個成果背後的痛點、決策與量測方式，都寫在作品集的案例頁。",
  },
  en: {
    title: "Résumé",
    name: "Kevin Hsu (許承澤)",
    headline: "Senior Product Manager | B2B, AI, and e-commerce products",
    summary:
      "Senior Product Manager with 7+ years across B2B, AI, and e-commerce products. Finds problems on the front line, aligns requirements with AI prototypes, and connects APIs into internal tools, cutting customer onboarding from about 2 weeks to about 2 hours. Led a 10-person engineering team; 2022 PMI Taiwan Benchmark Project Merit Award.",
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
    roleCases,
    roles: {
      "ecofirst": {
        "summary": "Owned the B2B AI HVAC energy-saving product and roadmap, leading 4 engineers on about NT$100M in projects, with an average customer energy saving of about 15%.",
        "bullets": [
          "Requirement handling from about 1 month to about 1 week: turned requirements directly into AI-built prototypes so sales, PMs, and engineers aligned on the spot",
          "Customer onboarding from about 2 weeks to about 2 hours: connected APIs with AI to build an internal back office; 3 PMs manage 34 sites, with handoffs per round down from 4 to 0",
          "Customer dashboard done in 1 day, available across all 34 sites: prototyped from a hospital request, engineers shipped it, and the layout became config-driven",
          "Delivery time on related projects down 30% (estimate): turned common features into shared tools and modularized control strategies"
        ]
      },
      "advisory": {
        "role": "Independent Consultant | Operations digitization and fundraising",
        "summary": "",
        "bullets": [
          "About NT$170M in raises moved into substantive investor talks across 2 engagements in energy and hospitality",
          "Analyzed 106 Airbnb listings to find a room type at 90% occupancy (Taipei average 65%) and positioned 2 hotels around it"
        ]
      },
      "sat": {
        "summary": "",
        "bullets": [
          "First-week revenue above NT$1M: entered the Hong Kong market within 3 weeks",
          "Interviewed HR teams at companies of different sizes and planned a learning-data dashboard for corporate training"
        ]
      },
      "consulting": {
        "role": "Independent Consultant",
        "summary": "",
        "bullets": [
          "Brought Notion to a 15-person outsourcing team; set a product roadmap tied to business metrics for a multinational SaaS company"
        ]
      },
      "huayao": {
        "summary": "",
        "bullets": [
          "Built a product database joining customer, shipping, and purchasing data; redesigned warehouse locations and product categories"
        ]
      },
      "fable": {
        "summary": "Managed an NT$12M+ project portfolio, leading 10 engineers and 2 junior PMs; 2022 PMI Taiwan Benchmark Project Merit Award.",
        "bullets": [
          "Picking from 300 to 1,000 orders a day (+233%), platform revenue +120% during the rebuild, featured as an AWS case",
          "Health app DAU from 12,000 to 20,000 (+66%)"
        ]
      },
      "oakda": {
        "summary": "",
        "bullets": [
          "Managed a 12-person product team; integrated 10M customer records across 3 industries and 5 channels"
        ]
      },
      "zhongshuo": {
        "role": "Product Assistant",
        "summary": "",
        "bullets": [
          "Incubated 2 early-stage companies, each passing NT$1M in revenue"
        ]
      }
    },
    skills: "Product Management, Product Roadmap, PRD, Prototype, User Research, B2B, Generative AI, Claude Code, API Integration, Notion, Cross-functional Collaboration",
    moreText:
      "The bottleneck, decisions, and measurement behind every result are on the case pages.",
  },
};
