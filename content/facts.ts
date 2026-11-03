import type { Locale } from "@/lib/locale";
import type { Metric } from "./types";

/**
 * The results the home page leads with, and the social preview reads. Change a result here first;
 * prose elsewhere repeats them, and scripts/test-site-output.mjs guards the wording that must stay gone.
 */
export const facts: Record<Locale, Metric[]> = {
  zh: [
    {
      value: "約 2 週 → 約 2 小時",
      label: "客戶導入時間",
      detail: "從工程師開發改成 PM 後台設定，34 個案場（導入系統的現場）都適用（不含現場接線與控制策略）",
      caseId: "internal-backend",
      og: { value: "約 2 週到約 2 小時", label: "客戶導入時間" },
    },
    {
      value: "300 → 1,000 單／日",
      label: "蔬果電商揀貨產能",
      detail: "重構訂單到交付流程後 +233%",
      caseId: "grocery",
      og: { value: "300 到 1,000 單／日", label: "蔬果電商揀貨產能" },
    },
    {
      value: "DAU +66%",
      label: "健康 App 每日活躍使用者",
      detail: "重構上線一年，12,000 → 20,000（團隊成果）",
      caseId: "health-app",
      og: { value: "DAU +66%", label: "健康 App 每日活躍使用者" },
    },
  ],
  en: [
    {
      value: "~2 weeks → ~2 hours",
      label: "Customer onboarding",
      detail: "From engineering work to PM setup in the internal platform, across 34 sites (excluding on-site wiring and control strategy)",
      caseId: "internal-backend",
      og: { value: "~2 weeks to ~2 hours", label: "Customer onboarding" },
    },
    {
      value: "300 → 1,000 orders a day",
      label: "E-commerce order-picking capacity",
      detail: "+233% after the order-to-delivery rebuild",
      caseId: "grocery",
      og: { value: "300 to 1,000 orders/day", label: "E-commerce order-picking capacity" },
    },
    {
      value: "DAU +66%",
      label: "Health app daily active users",
      detail: "One year after the rebuild, 12,000 → 20,000 (team result)",
      caseId: "health-app",
      og: { value: "DAU +66%", label: "Health app daily active users" },
    },
  ],
};
