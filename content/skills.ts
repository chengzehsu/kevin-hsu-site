import type { Locale } from "@/lib/locale";

export interface SkillReference {
  label: string;
  href: string;
}

export interface FeaturedSkill {
  id: string;
  name: string;
  summary: string;
  proof: string;
  references: SkillReference[];
}

export interface SkillGroup {
  kind: "product" | "ai" | "systems" | "delivery";
  title: string;
  items: Array<{ name: string; href: string }>;
}

export interface SkillsContent {
  title: string;
  intro: string;
  totalLabel: string;
  featuredTitle: string;
  libraryTitle: string;
  expandLibraryLabel: string;
  collapseLibraryLabel: string;
  evidenceLabel: string;
  featured: FeaturedSkill[];
  groups: SkillGroup[];
}

/** Skills are included only when the resume contains a role or case that supports them. */
export const skillsContent: Record<Locale, SkillsContent> = {
  zh: {
    title: "技能",
    intro: "以下整理我在專案中實際負責過的能力，以及對應的工作經驗。",
    totalLabel: "共 20 項能力，來自 6 段經歷與 4 個案例",
    featuredTitle: "核心技能",
    libraryTitle: "完整技能庫",
    expandLibraryLabel: "展開完整技能庫",
    collapseLibraryLabel: "收合完整技能庫",
    evidenceLabel: "相關經歷",
    featured: [
      {
        id: "ai-delivery",
        name: "AI 產品交付與內部工具",
        summary: "使用 AI 協助需求、規格、製作與驗收，並把重複工作做成團隊使用的工具。",
        proof: "產品交付效率提升 50%",
        references: [{ label: "台灣愛淨", href: "#experience-ecofirst" }],
      },
      {
        id: "product-strategy",
        name: "產品策略、Roadmap 與優先排序",
        summary: "依商業目標、使用者需求與交付限制，決定產品方向與先後順序。",
        proof: "從 0 到 1 規劃 AI 節能產品與包租代管 SaaS",
        references: [
          { label: "台灣愛淨", href: "#ecofirst" },
          { label: "獨立顧問", href: "#experience-consulting" },
        ],
      },
      {
        id: "operations",
        name: "流程拆解與營運瓶頸改善",
        summary: "找出限制產能的環節，再用流程、規則或工具改善，並確認營運結果。",
        proof: "揀貨 300 到 1,000 單／日，案場效率提升 20%",
        references: [
          { label: "Fable 寓意科技", href: "#grocery" },
          { label: "台灣愛淨", href: "#ecofirst" },
        ],
      },
      {
        id: "discovery",
        name: "使用者研究與 B2B 需求探索",
        summary: "透過訪談、競品研究與工作坊，了解採購者、管理者與使用者各自的需求。",
        proof: "企業培訓平台與健康 App 的研究、優先排序與驗收",
        references: [
          { label: "知識衛星", href: "#experience-sat" },
          { label: "Fable 寓意科技", href: "#health-app" },
        ],
      },
      {
        id: "systems",
        name: "資料產品與系統整合",
        summary: "把前後台、跨通路資料、IoT 與既有系統放在一起規劃，支援完整使用流程。",
        proof: "整合 1,000 萬筆跨通路客戶資料",
        references: [
          { label: "歐可達數據科技", href: "#cdp" },
          { label: "Fable 寓意科技", href: "#health-app" },
        ],
      },
    ],
    groups: [
      {
        kind: "product",
        title: "產品管理",
        items: [
          { name: "產品策略", href: "#ecofirst" },
          { name: "Roadmap 規劃", href: "#ecofirst" },
          { name: "需求探索", href: "#experience-sat" },
          { name: "使用者訪談", href: "#health-app" },
          { name: "競品研究", href: "#health-app" },
        ],
      },
      {
        kind: "ai",
        title: "AI 與工具實作",
        items: [
          { name: "AI 輔助開發流程", href: "#experience-ecofirst" },
          { name: "內部工具規劃", href: "#experience-ecofirst" },
          { name: "工作流程自動化", href: "#ecofirst" },
          { name: "原型與功能驗證", href: "#experience-zhongshuo" },
          { name: "PRD 與驗收", href: "#experience-oakda" },
        ],
      },
      {
        kind: "systems",
        title: "系統與產品領域",
        items: [
          { name: "0 到 1 產品", href: "#experience-ecofirst" },
          { name: "B2B SaaS", href: "#experience-sat" },
          { name: "資料產品與 CDP", href: "#cdp" },
          { name: "B2C App 與電商", href: "#health-app" },
          { name: "IoT 與舊系統整合", href: "#health-app" },
        ],
      },
      {
        kind: "delivery",
        title: "交付與帶領",
        items: [
          { name: "跨部門協作", href: "#experience-ecofirst" },
          { name: "流程與瓶頸分析", href: "#grocery" },
          { name: "平台重構與資料遷移", href: "#health-app" },
          { name: "團隊帶領與 PM 培育", href: "#experience-fable" },
          { name: "商業與市場驗證", href: "#experience-consulting" },
        ],
      },
    ],
  },
  en: {
    title: "Skills",
    intro: "A record of the work I have owned in projects, with the related experience for each area.",
    totalLabel: "20 capabilities across 6 roles and 4 cases",
    featuredTitle: "Core skills",
    libraryTitle: "Full skill set",
    expandLibraryLabel: "View full skill set",
    collapseLibraryLabel: "Hide full skill set",
    evidenceLabel: "Related experience",
    featured: [
      {
        id: "ai-delivery",
        name: "AI product delivery and internal tools",
        summary: "Use AI across requirements, specifications, implementation, and acceptance, then turn repeated work into tools teams use.",
        proof: "Improved product delivery efficiency by 50%",
        references: [{ label: "Ecofirst", href: "#experience-ecofirst" }],
      },
      {
        id: "product-strategy",
        name: "Product strategy, roadmaps, and prioritisation",
        summary: "Use business goals, user needs, and delivery constraints to set product direction and priorities.",
        proof: "Planned 0-to-1 AI energy and rental-management products",
        references: [
          { label: "Ecofirst", href: "#ecofirst" },
          { label: "Independent consulting", href: "#experience-consulting" },
        ],
      },
      {
        id: "operations",
        name: "Workflow mapping and constraint improvement",
        summary: "Find the step limiting throughput, improve it with process, rules, or tools, and check the operating result.",
        proof: "Increased picking from 300 to 1,000 orders/day and site efficiency by 20%",
        references: [
          { label: "Fable", href: "#grocery" },
          { label: "Ecofirst", href: "#ecofirst" },
        ],
      },
      {
        id: "discovery",
        name: "User research and B2B discovery",
        summary: "Use interviews, competitor research, and workshops to understand the needs of buyers, administrators, and end users.",
        proof: "Research, prioritisation, and acceptance for enterprise learning and health products",
        references: [
          { label: "SAT. KNOWLEDGE", href: "#experience-sat" },
          { label: "Fable", href: "#health-app" },
        ],
      },
      {
        id: "systems",
        name: "Data products and systems integration",
        summary: "Plan front and back offices, cross-channel data, IoT, and legacy systems as one complete product flow.",
        proof: "Integrated 10M cross-channel customer records",
        references: [
          { label: "Oakda", href: "#cdp" },
          { label: "Fable", href: "#health-app" },
        ],
      },
    ],
    groups: [
      {
        kind: "product",
        title: "Product management",
        items: [
          { name: "Product strategy", href: "#ecofirst" },
          { name: "Roadmap planning", href: "#ecofirst" },
          { name: "Product discovery", href: "#experience-sat" },
          { name: "User interviews", href: "#health-app" },
          { name: "Competitor research", href: "#health-app" },
        ],
      },
      {
        kind: "ai",
        title: "AI and tool building",
        items: [
          { name: "AI-assisted development workflows", href: "#experience-ecofirst" },
          { name: "Internal tool planning", href: "#experience-ecofirst" },
          { name: "Workflow automation", href: "#ecofirst" },
          { name: "Prototyping and validation", href: "#experience-zhongshuo" },
          { name: "PRDs and acceptance", href: "#experience-oakda" },
        ],
      },
      {
        kind: "systems",
        title: "Systems and product domains",
        items: [
          { name: "0-to-1 products", href: "#experience-ecofirst" },
          { name: "B2B SaaS", href: "#experience-sat" },
          { name: "Data products and CDP", href: "#cdp" },
          { name: "B2C apps and e-commerce", href: "#health-app" },
          { name: "IoT and legacy integration", href: "#health-app" },
        ],
      },
      {
        kind: "delivery",
        title: "Delivery and leadership",
        items: [
          { name: "Cross-functional delivery", href: "#experience-ecofirst" },
          { name: "Process and constraint analysis", href: "#grocery" },
          { name: "Platform rebuilds and data migration", href: "#health-app" },
          { name: "Team leadership and PM development", href: "#experience-fable" },
          { name: "Commercial and market validation", href: "#experience-consulting" },
        ],
      },
    ],
  },
};
