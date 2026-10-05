import type { Locale } from "@/lib/locale";

export interface SkillReference {
  label: string;
  href: string;
}

export interface FeaturedSkill {
  id: string;
  /** Short capability label above the statement. */
  name: string;
  /** One display-sized idea per capability. */
  statement: string;
  summary: string;
  /** One public fact; the picking metric keeps its canonical wording. */
  proof: string;
  references: SkillReference[];
}

export interface SkillGroup {
  kind: "product" | "ai" | "systems" | "delivery";
  title: string;
  items: Array<{ name: string; href: string }>;
}

/**
 * The same six axes and shapes the hero launch film draws (videos/kevin-launch-film/index.html,
 * AXES and CHAPTERS[0] / CHAPTERS[5]). Values are relative depth across roles, never shown as scores.
 */
export interface SkillsRadarContent {
  label: string;
  caption: string;
  note: string;
  axes: [string, string, string, string, string, string];
  from: { label: string; values: number[] };
  to: { label: string; values: number[] };
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
  radar: SkillsRadarContent;
  featured: FeaturedSkill[];
  groups: SkillGroup[];
}

/** Skills are included only when the resume contains a role or case that supports them. */
export const skillsContent: Record<Locale, SkillsContent> = {
  zh: {
    title: "能力",
    intro: "以下整理我在專案中實際用過的能力，以及對應的工作經驗。",
    totalLabel: "共 20 項能力，來自 8 段經歷與 4 個工作案例",
    featuredTitle: "核心能力",
    libraryTitle: "完整能力清單",
    expandLibraryLabel: "看完整能力清單",
    collapseLibraryLabel: "收合能力清單",
    evidenceLabel: "相關經歷",
    radar: {
      label: "能力圖",
      caption: "每一段經歷，都讓這張圖再大一圈。",
      note: "軸長是依經歷排的相對程度，不是分數。",
      axes: ["問題定義", "快速實驗", "原型實作", "流程重構", "跨團隊交付", "資料判讀"],
      from: { label: "2019", values: [0.36, 0.2, 0.3, 0.12, 0.15, 0.12] },
      to: { label: "2025", values: [0.9, 0.93, 0.9, 0.92, 0.88, 0.8] },
    },
    featured: [
      {
        id: "ai-delivery",
        name: "AI 交付",
        statement: "把 AI 放進每天的交付流程。",
        summary: "需求、規格、mock data 驗證到開發交接都用 AI 加速，重複的工作做成團隊天天在用的工具。",
        proof: "交付效率 +50%",
        references: [{ label: "台灣愛淨", href: "#experience-ecofirst" }],
      },
      {
        id: "operations",
        name: "流程與營運",
        statement: "先找到卡住產能的那一步。",
        summary: "走進現場拆流程，用規則、系統或工具解開瓶頸，再回頭確認營運結果。",
        proof: "揀貨 300 → 1,000 單／日 (+233%)",
        references: [{ label: "Fable 寓意科技", href: "/cases/grocery/" }],
      },
      {
        id: "product-strategy",
        name: "產品策略",
        statement: "從商業問題，排出做得完的 Roadmap。",
        summary: "依商業目標、使用者需求與交付限制，決定先做什麼、暫時不做什麼。",
        proof: "從 0 到 1 規劃 AI 節能產品與包租代管 SaaS",
        references: [
          { label: "台灣愛淨", href: "/cases/ecofirst/" },
          { label: "獨立顧問", href: "#experience-consulting" },
        ],
      },
      {
        id: "systems",
        name: "資料與系統",
        statement: "把分散的資料接成一條流程。",
        summary: "前後台、跨通路資料、IoT 與既有系統放在一起規劃，支援完整使用流程。",
        proof: "整合 1,000 萬筆跨通路客戶資料",
        references: [
          { label: "歐可達數據科技", href: "/cases/cdp/" },
          { label: "Fable 寓意科技", href: "/cases/health-app/" },
        ],
      },
    ],
    groups: [
      {
        kind: "product",
        title: "產品管理",
        items: [
          { name: "產品策略", href: "/cases/ecofirst/" },
          { name: "Roadmap 規劃", href: "/cases/ecofirst/" },
          { name: "需求探索", href: "#experience-sat" },
          { name: "使用者訪談", href: "/cases/health-app/" },
          { name: "競品研究", href: "/cases/health-app/" },
        ],
      },
      {
        kind: "ai",
        title: "AI 與工具實作",
        items: [
          { name: "AI 輔助開發流程", href: "#experience-ecofirst" },
          { name: "內部工具規劃", href: "#experience-ecofirst" },
          { name: "工作流程自動化", href: "/cases/ecofirst/" },
          { name: "原型與功能驗證", href: "#experience-zhongshuo" },
          { name: "PRD 與驗收", href: "/cases/health-app/" },
        ],
      },
      {
        kind: "systems",
        title: "系統與產品領域",
        items: [
          { name: "0 到 1 產品", href: "#experience-ecofirst" },
          { name: "B2B SaaS", href: "#experience-consulting" },
          { name: "資料產品與 CDP", href: "/cases/cdp/" },
          { name: "B2C App 與電商", href: "/cases/health-app/" },
          { name: "IoT 與舊系統整合", href: "/cases/health-app/" },
        ],
      },
      {
        kind: "delivery",
        title: "交付與帶領",
        items: [
          { name: "跨部門協作", href: "#experience-ecofirst" },
          { name: "流程與瓶頸分析", href: "/cases/grocery/" },
          { name: "平台重構與資料遷移", href: "/cases/health-app/" },
          { name: "團隊帶領與 PM 培育", href: "#experience-fable" },
          { name: "商業與市場驗證", href: "#experience-sat" },
        ],
      },
    ],
  },
  en: {
    title: "Skills",
    intro: "A record of the work I have owned in projects, with the related experience for each area.",
    totalLabel: "20 capabilities across 8 roles and 4 work cases",
    featuredTitle: "Core skills",
    libraryTitle: "Full skill set",
    expandLibraryLabel: "See full skills list",
    collapseLibraryLabel: "Hide skills list",
    evidenceLabel: "Related experience",
    radar: {
      label: "Capability map",
      caption: "Every chapter made the shape bigger.",
      note: "Axis length shows relative depth across roles, not a score.",
      axes: ["Problem framing", "Fast experiments", "Prototyping", "Workflow redesign", "Cross-team delivery", "Data judgment"],
      from: { label: "2019", values: [0.36, 0.2, 0.3, 0.12, 0.15, 0.12] },
      to: { label: "2025", values: [0.9, 0.93, 0.9, 0.92, 0.88, 0.8] },
    },
    featured: [
      {
        id: "ai-delivery",
        name: "AI delivery",
        statement: "Put AI into everyday delivery.",
        summary: "Requirements, specs, mock-data checks, and dev handoff all run faster with AI, and repeated work becomes tools the team uses daily.",
        proof: "Delivery efficiency +50%",
        references: [{ label: "Ecofirst", href: "#experience-ecofirst" }],
      },
      {
        id: "operations",
        name: "Workflow and operations",
        statement: "Find the step that caps throughput.",
        summary: "Walk the floor, map the flow, clear the bottleneck with rules, systems, or tools, then check the operating result.",
        proof: "Picking 300 → 1,000 orders/day (+233%)",
        references: [{ label: "Fable", href: "/en/cases/grocery/" }],
      },
      {
        id: "product-strategy",
        name: "Product strategy",
        statement: "Turn business problems into a roadmap that ships.",
        summary: "Use business goals, user needs, and delivery constraints to decide what comes first and what waits.",
        proof: "Planned a 0-to-1 AI energy-saving product and a rental property-management SaaS",
        references: [
          { label: "Ecofirst", href: "/en/cases/ecofirst/" },
          { label: "Independent consulting", href: "#experience-consulting" },
        ],
      },
      {
        id: "systems",
        name: "Data and systems",
        statement: "Connect scattered data into one flow.",
        summary: "Plan customer-facing apps, back-office systems, cross-channel data, IoT, and legacy systems as one complete product flow.",
        proof: "Integrated 10M cross-channel customer records",
        references: [
          { label: "Oakda", href: "/en/cases/cdp/" },
          { label: "Fable", href: "/en/cases/health-app/" },
        ],
      },
    ],
    groups: [
      {
        kind: "product",
        title: "Product management",
        items: [
          { name: "Product strategy", href: "/en/cases/ecofirst/" },
          { name: "Roadmap planning", href: "/en/cases/ecofirst/" },
          { name: "Product discovery", href: "#experience-sat" },
          { name: "User interviews", href: "/en/cases/health-app/" },
          { name: "Competitor research", href: "/en/cases/health-app/" },
        ],
      },
      {
        kind: "ai",
        title: "AI and tool building",
        items: [
          { name: "AI-assisted development workflows", href: "#experience-ecofirst" },
          { name: "Internal tool planning", href: "#experience-ecofirst" },
          { name: "Workflow automation", href: "/en/cases/ecofirst/" },
          { name: "Prototyping and validation", href: "#experience-zhongshuo" },
          { name: "PRDs and acceptance criteria", href: "/en/cases/health-app/" },
        ],
      },
      {
        kind: "systems",
        title: "Systems and product domains",
        items: [
          { name: "0-to-1 products", href: "#experience-ecofirst" },
          { name: "B2B SaaS", href: "#experience-consulting" },
          { name: "Data products and CDP", href: "/en/cases/cdp/" },
          { name: "B2C apps and e-commerce", href: "/en/cases/health-app/" },
          { name: "IoT and legacy integration", href: "/en/cases/health-app/" },
        ],
      },
      {
        kind: "delivery",
        title: "Delivery and leadership",
        items: [
          { name: "Cross-functional delivery", href: "#experience-ecofirst" },
          { name: "Process and bottleneck analysis", href: "/en/cases/grocery/" },
          { name: "Platform rebuilds and data migration", href: "/en/cases/health-app/" },
          { name: "Team leadership and PM mentoring", href: "#experience-fable" },
          { name: "Commercial and market validation", href: "#experience-sat" },
        ],
      },
    ],
  },
};
