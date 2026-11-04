import type { Locale } from "@/lib/locale";
import type { Metric, MetricGroup } from "./types";

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

/** The home results strip, grouped by the kind of value each result shows. */
export const metricGroups: Record<Locale, MetricGroup[]> = {
  zh: [
    {
      label: "降本",
      items: [
        { value: "30% → 10%", label: "單一案場客製占比", caseId: "internal-backend" },
        { value: "30 分鐘 → 3 分鐘", label: "單一案場異常處理", caseId: "internal-backend" },
      ],
    },
    {
      label: "增效",
      items: [
        { value: "約 2 週 → 約 2 小時", label: "客戶導入（不含現場接線與控制策略）", caseId: "internal-backend" },
        { value: "一天 → 10 分鐘", label: "業務回覆客戶", caseId: "sales-faq" },
      ],
    },
    {
      label: "商業規模",
      items: [
        { value: "約 NT$1 億", label: "負責的產品合約總額" },
        { value: "約 15%", label: "客戶平均節能率" },
        { value: "約 NT$1.7 億", label: "2 個募資案進入盡職調查（DD）" },
      ],
    },
    {
      label: "過往驗證",
      items: [
        { value: "300 → 1,000 單／日 (+233%)", label: "蔬果電商出貨量", caseId: "grocery" },
        { value: "DAU +66%", label: "健康管理 App（團隊成果）", caseId: "health-app" },
      ],
    },
  ],
  en: [
    {
      label: "Lower cost",
      items: [
        { value: "30% → 10%", label: "Single-site customization", caseId: "internal-backend" },
        { value: "30 min → 3 min", label: "Per-site issue handling", caseId: "internal-backend" },
      ],
    },
    {
      label: "Higher output",
      items: [
        { value: "~2 weeks → ~2 hours", label: "Customer onboarding (excluding on-site wiring and control strategy)", caseId: "internal-backend" },
        { value: "1 day → 10 min", label: "Sales response to customers", caseId: "sales-faq" },
      ],
    },
    {
      label: "Business scale",
      items: [
        { value: "~NT$100M", label: "Product contracts I owned" },
        { value: "~15%", label: "Average customer energy savings" },
        { value: "~NT$170M", label: "2 fundraising deals reaching due diligence" },
      ],
    },
    {
      label: "Earlier proof",
      items: [
        { value: "300 → 1,000 orders/day (+233%)", label: "Grocery e-commerce shipments", caseId: "grocery" },
        { value: "DAU +66%", label: "Health management app (team result)", caseId: "health-app" },
      ],
    },
  ],
};
