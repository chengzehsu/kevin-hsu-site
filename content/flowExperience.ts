import type { Locale } from "@/lib/locale";
import type { ScenarioId } from "@/lib/flowSimulation";

export interface FlowExperienceCopy {
  title: string;
  intro: string;
  options: Record<ScenarioId, { label: string; title: string; detail: string }>;
  stages: [string, string, string, string, string];
  redesignedStages: [string, string, string, string, string];
  total: string; waiting: string; completed: string; minute: string; compared: string;
  controls: string; pause: string; play: string; replay: string; progress: string; queued: string;
  loading: string; fallback: string; note: string; assumptions: string; assumptionsBody: string; connection: string;
}

export const flowExperience: Record<Locale, FlowExperienceCopy> = {
  zh: {
    title: "你會先改哪裡？",
    intro: "12 筆需求，一起進來。試試不同做法。",
    options: {
      baseline: { label: "原本流程", title: "工作堆在驗收前。", detail: "每筆需求都要等同一個人確認，製作完成後還有一段路。" },
      accelerate: { label: "只加快製作", title: "製作快了，交付只快一點。", detail: "用 AI 縮短製作時間，驗收的處理速度沒變，工作依然在排隊。" },
      redesign: { label: "重組交付流程", title: "先對齊驗收，再把重複檢查工具化。", detail: "減少等待與反覆確認。這個模型裡，瓶頸接著移到了需求釐清。" },
    },
    stages: ["釐清需求", "製作", "等確認", "驗收", "交付"],
    redesignedStages: ["對齊需求", "AI 協作", "即時回饋", "工具輔助驗收", "交付"],
    total: "整批交付時間", waiting: "平均等待", completed: "已交付", minute: "分", compared: "原本",
    controls: "選擇流程改善方式", pause: "暫停模擬", play: "播放模擬", replay: "重播", progress: "模擬時間", queued: "排隊",
    loading: "正在準備互動場景", fallback: "流程比較模式",
    note: "流程示意，時間為模型推算，非專案實測。",
    assumptions: "模型怎麼算？",
    assumptionsBody: "12 筆需求在第 0 分鐘進入。釐清、製作、驗收、交付各有一個處理位置，先進先出；「等確認」是可並行的交接等待。原本每筆耗時為 2 / 3 / 4 / 4 / 1 分鐘。只加快製作：製作改為 1 分鐘。重組流程：沿用加速製作，假設驗收條件能在原有釐清時間內對齊，且工具可輔助重複檢查，使交接等待降為 0.5 分鐘、驗收降為 1 分鐘；不計重工與品質損失。平均等待包含排隊與交接，整批時間取最後一筆的交付時間。動畫使用相同時間倍率。",
    connection: "這套判斷，怎麼用在愛淨？",
  },
  en: {
    title: "What would you change first?",
    intro: "12 requests arrive together. Try a different approach.",
    options: {
      baseline: { label: "Original flow", title: "Work queues up before review.", detail: "Every request needs the same reviewer. Finishing the build is only part of delivery." },
      accelerate: { label: "Build faster", title: "Faster builds. Almost the same delivery time.", detail: "AI reduces build time, but review capacity stays the same. The queue remains." },
      redesign: { label: "Redesign the flow", title: "Agree acceptance early. Automate repeat checks.", detail: "Less waiting and back-and-forth. In this model, the constraint moves to clarification." },
    },
    stages: ["Clarify", "Build", "Handoff", "Review", "Deliver"],
    redesignedStages: ["Align scope", "AI-assisted build", "Fast feedback", "Tool-assisted review", "Deliver"],
    total: "Full batch delivery", waiting: "Average wait", completed: "Delivered", minute: "min", compared: "original",
    controls: "Choose a workflow change", pause: "Pause simulation", play: "Play simulation", replay: "Replay", progress: "Simulation time", queued: "queued",
    loading: "Preparing the interactive scene", fallback: "Workflow comparison",
    note: "Illustrative model. Times are calculated, not measured project results.",
    assumptions: "Model assumptions",
    assumptionsBody: "12 requests arrive at time zero. Clarify, build, review, and delivery each have one FIFO server. Handoff is a concurrent delay. Original times: 2 / 3 / 4 / 4 / 1 minutes per request. Build faster reduces build to 1 minute. Redesign retains this improvement and assumes acceptance can be aligned within the existing clarification time, with tools helping routine checks. Handoff becomes 0.5 minutes; review becomes 1 minute. Rework and quality losses are not modeled. Average wait includes queues and handoff; batch time is the final completion. Animations use the same time scale.",
    connection: "See how I work at Ecofirst",
  },
};
