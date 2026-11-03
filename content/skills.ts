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
 * AXES and the first / last of CHAPTERS). Values are relative depth across roles, never shown as scores.
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
  /** Summary of each core-skill card's collapsed explanation and related roles. */
  moreLabel: string;
  radar: SkillsRadarContent;
  featured: FeaturedSkill[];
  groups: SkillGroup[];
}

/** Skills are included only when the resume contains a role or case that supports them. */
export const skillsContent: Record<Locale, SkillsContent> = {
  zh: {
    title: "能力",
    intro: "我在專案中實際用過的能力，以及對應的工作經驗。",
    totalLabel: "共 20 項能力，來自 8 段經歷與 7 個工作案例",
    featuredTitle: "核心能力",
    libraryTitle: "完整能力清單",
    expandLibraryLabel: "看完整能力清單",
    collapseLibraryLabel: "收合能力清單",
    evidenceLabel: "相關經歷",
    moreLabel: "看說明與相關經歷",
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
        id: "operations",
        name: "流程重構",
        statement: "先找到卡住產能的那一步。",
        summary: "走進現場、訪談第一線，畫出跨部門的現有流程，找出等待、重複作業與資料斷點，再用規則、系統或工具解開瓶頸。",
        proof: "揀貨 300 → 1,000 單／日 (+233%)",
        references: [
          { label: "Fable 寓意科技", href: "/cases/grocery/" },
          { label: "台灣愛淨", href: "/cases/ecofirst/" },
        ],
      },
      {
        id: "systems",
        name: "系統與資料",
        statement: "先把資料講清楚，系統才判得準。",
        summary: "釐清資料在 LINE、Email、Excel 與各系統之間怎麼流動，定義清楚每個數字怎麼算，再和工程師談好怎麼串接。以內部後台為例：先定義什麼叫「資料到齊」，再把「無法判斷」和「缺資料」分開。",
        proof: "34 個案場一個畫面看完；整合 1,000 萬筆跨通路資料",
        references: [
          { label: "內部後台", href: "/cases/internal-backend/" },
          { label: "歐可達數據科技", href: "/cases/cdp/" },
        ],
      },
      {
        id: "product-strategy",
        name: "商業判斷",
        statement: "用數據決定先做什麼、不做什麼。",
        summary: "依商業目標、使用者需求與交付限制排出 Roadmap。在愛淨分析 735 張任務、約 920 小時的去向，合約也改成從資料齊備那天起算。",
        proof: "51% 的工作花在單一案場客製，所以售前改用 S/M/L/XL 四種規模報價",
        references: [
          { label: "台灣愛淨", href: "/cases/ecofirst/" },
        ],
      },
      {
        id: "ai-delivery",
        name: "AI 導入",
        statement: "AI 先提案、人來拍板，準了才放手。",
        summary: "找出 AI 幫得上的環節：從需求、規格、用假資料驗證，到開發交接，都先讓 AI 寫初稿。Notion 上的 AI 排程一開始只提建議，連續 3 輪有 90% 以上被採納，才讓它自動寫入；原型則用 Claude Code 自己做。",
        proof: "交付時間縮短 30%（估算）；PM 導入案場從約 2 週到約 2 小時（不含現場接線與控制策略）",
        references: [
          { label: "內部後台", href: "/cases/internal-backend/" },
          { label: "台灣愛淨", href: "#experience-ecofirst" },
        ],
      },
      {
        id: "measured-results",
        name: "成效驗證",
        statement: "每個成果都寫明怎麼量。",
        summary: "改善前先定基準，上線後用同一把尺比較；沒有前後數字的，就只寫規模與做法，不寫百分比。",
        proof: "+233%、+66%（團隊成果），都附量測方式",
        references: [
          { label: "蔬果電商", href: "/cases/grocery/" },
          { label: "健康 App", href: "/cases/health-app/" },
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
    intro: "The skills I have used on real projects, with the related experience for each.",
    totalLabel: "20 skills across 8 roles and 7 case studies from work",
    featuredTitle: "Core skills",
    libraryTitle: "Full skills list",
    expandLibraryLabel: "See full skills list",
    collapseLibraryLabel: "Hide skills list",
    evidenceLabel: "Related experience",
    moreLabel: "See details and related experience",
    radar: {
      label: "Skills map",
      caption: "Every role made the shape bigger.",
      note: "Axis length shows relative depth across roles, not a score.",
      axes: ["Problem framing", "Rapid experimentation", "Prototyping", "Workflow redesign", "Cross-team delivery", "Data interpretation"],
      from: { label: "2019", values: [0.36, 0.2, 0.3, 0.12, 0.15, 0.12] },
      to: { label: "2025", values: [0.9, 0.93, 0.9, 0.92, 0.88, 0.8] },
    },
    featured: [
      {
        id: "operations",
        name: "Process mapping",
        statement: "Find the step that caps throughput.",
        summary: "Walk the floor and interview frontline staff to map the cross-team workflow, find wait times, repeated work, and data gaps, then clear the bottleneck with rules, systems, or tools.",
        proof: "Picking 300 → 1,000 orders/day (+233%)",
        references: [
          { label: "Fable", href: "/en/cases/grocery/" },
          { label: "Ecofirst", href: "/en/cases/ecofirst/" },
        ],
      },
      {
        id: "systems",
        name: "Systems and data",
        statement: "Define the data first so the system can make the right call.",
        summary: "Trace how data moves between chat apps, email, Excel, and systems, define how every number is calculated, then work with engineers on integration. The internal platform started here: define what complete data means, and keep \"cannot tell\" apart from \"missing data\".",
        proof: "34 sites on one screen; 10M cross-channel customer records integrated",
        references: [
          { label: "Internal platform", href: "/en/cases/internal-backend/" },
          { label: "Oakda", href: "/en/cases/cdp/" },
        ],
      },
      {
        id: "product-strategy",
        name: "Business judgment",
        statement: "Let data decide what to do first and what not to do.",
        summary: "Build the roadmap from business goals, user needs, and delivery constraints. At Ecofirst, I traced where 735 tasks and about 920 hours went, and contract timelines now start when the data is complete.",
        proof: "51% of the work went to single-site customization, so presales moved to S/M/L/XL tiers",
        references: [
          { label: "Ecofirst", href: "/en/cases/ecofirst/" },
        ],
      },
      {
        id: "ai-delivery",
        name: "AI adoption",
        statement: "AI proposes, a person decides, and AI earns autonomy once it proves accurate.",
        summary: "Find where AI actually helps: requirements, specs, mock-data checks, and dev handoff start as AI drafts. Scheduled Notion AI jobs only make suggestions until at least 90% of them are accepted three rounds in a row, and only then write on their own. I build prototypes myself with Claude Code.",
        proof: "Delivery time down 30% (estimate); PM site onboarding from about 2 weeks to about 2 hours (excluding on-site wiring and control strategy)",
        references: [
          { label: "Internal platform", href: "/en/cases/internal-backend/" },
          { label: "Ecofirst", href: "#experience-ecofirst" },
        ],
      },
      {
        id: "measured-results",
        name: "Measured results",
        statement: "Every result says how it was measured.",
        summary: "Set the baseline before the change and measure the same way after it. Without a before-and-after figure, I state scale and method, never a percentage.",
        proof: "+233% and +66% (team result), each with its measurement basis",
        references: [
          { label: "Fresh-produce e-commerce", href: "/en/cases/grocery/" },
          { label: "Health app", href: "/en/cases/health-app/" },
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
