import type { Locale } from "@/lib/locale";
import type { Metric, MetricRow } from "./types";

/**
 * The results the home page leads with, and the social preview reads. Change a result here first;
 * prose elsewhere repeats them, and scripts/test-site-output.mjs guards the wording that must stay gone.
 */
export const facts: Record<Locale, Metric[]> = {
  zh: [
    {
      value: "約 2 週 → 約 2 小時",
      label: "客戶導入時間",
      detail: "從等工程師處理改成 PM 後台設定，34 個案場（導入系統的現場）都適用（不含現場接線與控制策略）",
      caseId: "internal-backend",
      og: { value: "約 2 週到約 2 小時", label: "客戶導入時間" },
    },
    {
      value: "30% → 10%",
      label: "單一案場客製占比",
      detail: "把重複需求抽象成控制策略，再寫成文件並參數化",
      caseId: "internal-backend",
      og: { value: "30% 到 10%", label: "單一案場客製占比" },
    },
    {
      value: "300 → 1,000 單／日",
      label: "蔬果電商出貨量",
      detail: "重整入庫到出貨流程後 +233%",
      caseId: "grocery",
      og: { value: "300 到 1,000 單／日", label: "蔬果電商出貨量" },
    },
  ],
  en: [
    {
      value: "~2 weeks → ~2 hours",
      label: "Customer onboarding",
      detail: "From waiting on engineers to PM setup in the internal platform; works for all 34 sites (excluding on-site wiring and control strategy)",
      caseId: "internal-backend",
      og: { value: "~2 weeks to ~2 hours", label: "Customer onboarding" },
    },
    {
      value: "30% → 10%",
      label: "Single-site customization",
      detail: "Abstracted repeated requests into control strategies, then documented and parameterized them",
      caseId: "internal-backend",
      og: { value: "30% to 10%", label: "Single-site customization" },
    },
    {
      value: "300 → 1,000 orders a day",
      label: "E-commerce daily shipments",
      detail: "+233% after redesigning inbound-to-shipping",
      caseId: "grocery",
      og: { value: "300 to 1,000 orders/day", label: "E-commerce daily shipments" },
    },
  ],
};

/**
 * The home results, one row per product. Each row opens with the product and Kevin's role in it, so a
 * reader never takes a team or sales result for a personal one; then what he changed in the product,
 * then what the product is worth to the business. The current role leads and is set largest.
 */
export const metricRows: Record<Locale, MetricRow[]> = {
  zh: [
    {
      product: "AI 節能平台",
      role: "我負責產品與交付",
      note: "Ecofirst，現職",
      productValue: [
        { value: "約 2 週 → 約 2 小時", from: "約 2 週", to: "約 2 小時", label: "PM 自己完成客戶導入（不含現場接線與控制策略）", caseId: "internal-backend" },
        { value: "30% → 10%", from: "30%", to: "10%", label: "單一案場客製占比", caseId: "internal-backend" },
        { value: "約 1 個月 → 約 1 週", from: "約 1 個月", to: "約 1 週", label: "需求處理時間", caseId: "internal-backend" },
      ],
      businessValue: [
        { value: "約 NT$1 億", label: "平台合約總額" },
        { value: "約 15%", label: "客戶平均節能率" },
      ],
    },
    {
      product: "蔬果電商平台",
      role: "我帶跨職能團隊交付",
      note: "Fable 寓意科技，團隊成果",
      productValue: [
        { value: "重整入庫到出貨", label: "改出貨模式、出貨單與儲位，再分階段重構系統" },
      ],
      businessValue: [
        { value: "300 → 1,000 單／日", from: "300 單／日", to: "1,000 單／日", label: "每日出貨量 +233%，平台營收 +120%", caseId: "grocery" },
      ],
    },
    {
      product: "健康管理 App",
      role: "我帶團隊重新設計流程",
      note: "Fable 寓意科技，團隊成果",
      productValue: [
        { value: "重新設計使用流程", label: "從使用者訪談出發，串接 IoT 體重計加入上秤打卡" },
      ],
      businessValue: [
        { value: "DAU +66%", label: "一年內日活躍使用者 12,000 → 20,000", caseId: "health-app" },
      ],
    },
  ],
  en: [
    {
      product: "AI energy-saving platform",
      role: "I own product and delivery",
      note: "Ecofirst, current role",
      productValue: [
        { value: "~2 weeks → ~2 hours", from: "~2 weeks", to: "~2 hours", label: "PMs onboard customers themselves (excluding on-site wiring and control strategy)", caseId: "internal-backend" },
        { value: "30% → 10%", from: "30%", to: "10%", label: "Single-site customization", caseId: "internal-backend" },
        { value: "~1 month → ~1 week", from: "~1 month", to: "~1 week", label: "Requirement handling", caseId: "internal-backend" },
      ],
      businessValue: [
        { value: "~NT$100M", label: "Platform contracts in total" },
        { value: "~15%", label: "Average customer energy savings" },
      ],
    },
    {
      product: "Grocery e-commerce platform",
      role: "I led cross-functional delivery",
      note: "Fable, team result",
      productValue: [
        { value: "Inbound-to-shipping redesign", label: "Changed the shipping model, packing slips, and bin layout, then rebuilt the system in phases" },
      ],
      businessValue: [
        { value: "300 → 1,000 orders/day", from: "300 orders/day", to: "1,000 orders/day", label: "Daily shipments +233%; platform revenue +120%", caseId: "grocery" },
      ],
    },
    {
      product: "Health management app",
      role: "I led the team through a flow redesign",
      note: "Fable, team result",
      productValue: [
        { value: "Redesigned user flows", label: "Started from user interviews and added IoT weigh-in check-ins" },
      ],
      businessValue: [
        { value: "DAU +66%", label: "Daily active users 12,000 → 20,000 in one year", caseId: "health-app" },
      ],
    },
  ],
};
