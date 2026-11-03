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
      eyebrow: "流程成果",
      title: "從訂單到交付，重畫整條營運流程",
      measure: "揀貨日產能",
      before: { label: "重構前", value: "300 單／日", width: 30 },
      after: { label: "重構後", value: "1,000 單／日", width: 100 },
    },
    "health-app": {
      kind: "comparison",
      eyebrow: "使用成果",
      title: "先統一資料定義，新功能才能長期用下去",
      measure: "每日活躍使用者",
      before: { label: "新平台上線時", value: "12,000", width: 60 },
      after: { label: "一年後", value: "20,000", width: 100 },
    },
    cdp: {
      kind: "sources",
      eyebrow: "資料成果",
      title: "把散在各通路的資料，整理成同一位客戶的完整資料",
      inputs: ["LINE", "Facebook", "官網", "電商", "POS"],
      output: "Customer 360 客戶輪廓",
      measure: "1,000 萬筆資料整合",
    },
  },
  en: {
    grocery: {
      kind: "comparison",
      eyebrow: "Evidence",
      title: "Redesigned the operations flow from order to delivery",
      measure: "Daily picking capacity",
      before: { label: "Before", value: "300 orders/day", width: 30 },
      after: { label: "After", value: "1,000 orders/day", width: 100 },
    },
    "health-app": {
      kind: "comparison",
      eyebrow: "Evidence",
      title: "Aligned data definitions first, so new features would stay usable",
      measure: "Daily active users",
      before: { label: "At launch", value: "12,000", width: 60 },
      after: { label: "After one year", value: "20,000", width: 100 },
    },
    cdp: {
      kind: "sources",
      eyebrow: "Evidence",
      title: "Turned fragmented touchpoints into one customer view",
      inputs: ["LINE", "Facebook", "Website", "E-commerce", "POS"],
      output: "Customer 360 view",
      measure: "10M customer records integrated",
    },
  },
};
