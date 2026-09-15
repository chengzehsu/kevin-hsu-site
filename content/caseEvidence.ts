import type { Locale } from "@/lib/locale";

export type CaseEvidence =
  | {
      kind: "comparison";
      eyebrow: string;
      title: string;
      measure: string;
      before: { label: string; value: string; width: number };
      after: { label: string; value: string; width: number };
    }
  | {
      kind: "sources";
      eyebrow: string;
      title: string;
      inputs: string[];
      output: string;
      measure: string;
    }
  | {
      kind: "loop";
      eyebrow: string;
      title: string;
      steps: string[];
      measure: string;
    };

export const caseEvidence: Record<Locale, Record<string, CaseEvidence>> = {
  zh: {
    grocery: {
      kind: "comparison",
      eyebrow: "流程證據 01",
      title: "從訂單到交付，重畫整條營運流程",
      measure: "揀貨日產能",
      before: { label: "重構前", value: "300 單／日", width: 30 },
      after: { label: "重構後", value: "1,000 單／日", width: 100 },
    },
    "health-app": {
      kind: "comparison",
      eyebrow: "流程證據 02",
      title: "先對齊資料定義，再讓新功能可持續使用",
      measure: "每日活躍使用者",
      before: { label: "新平台上線時", value: "12,000", width: 60 },
      after: { label: "一年後", value: "20,000", width: 100 },
    },
    cdp: {
      kind: "sources",
      eyebrow: "資料證據 03",
      title: "將分散接觸點整理成同一位客戶的視圖",
      inputs: ["LINE", "Facebook", "官網", "電商", "POS"],
      output: "客戶 360 度視圖",
      measure: "1,000 萬筆資料整合",
    },
    ecofirst: {
      kind: "loop",
      eyebrow: "交付證據 04",
      title: "把專案導向的協作，變成可複製的產品交付",
      steps: ["產品", "軟體", "專案", "業務", "案場"],
      measure: "交付效率 +50% · 案場營運 +20%",
    },
  },
  en: {
    grocery: {
      kind: "comparison",
      eyebrow: "Evidence 01",
      title: "Redesigned the operating flow from order to delivery",
      measure: "Daily picking capacity",
      before: { label: "Before", value: "300 orders/day", width: 30 },
      after: { label: "After", value: "1,000 orders/day", width: 100 },
    },
    "health-app": {
      kind: "comparison",
      eyebrow: "Evidence 02",
      title: "Aligned data definitions before scaling the new experience",
      measure: "Daily active users",
      before: { label: "At launch", value: "12,000", width: 60 },
      after: { label: "After one year", value: "20,000", width: 100 },
    },
    cdp: {
      kind: "sources",
      eyebrow: "Evidence 03",
      title: "Turned fragmented touchpoints into one customer view",
      inputs: ["LINE", "Facebook", "Website", "E-commerce", "POS"],
      output: "Customer 360 view",
      measure: "10M customer records integrated",
    },
    ecofirst: {
      kind: "loop",
      eyebrow: "Evidence 04",
      title: "Turned project-led collaboration into repeatable delivery",
      steps: ["Product", "Software", "Project", "Sales", "Site"],
      measure: "Delivery +50% · Site operations +20%",
    },
  },
};
