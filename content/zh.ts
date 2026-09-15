import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜產品經理",
    description:
      "產品經理許承澤，具 0 到 1 AI 產品、B2B 平台與資料系統經驗。曾推動電商全端重構、企業培訓平台、IoT 整合與跨通路數據中台。",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "案例", href: "#cases" },
      { label: "經歷", href: "#experience" },
      { label: "聯絡", href: "#contact" },
    ],
    switchLabel: "EN",
    switchAria: "Switch to English",
  },

  hero: {
    eyebrow: "許承澤 Kevin Hsu｜產品經理",
    headline: "把模糊的營運需求，做成團隊真正採用的產品。",
    subline: "具 0 到 1 AI 產品、B2B 平台與資料整合經驗；從流程梳理到跨部門交付。",
    visualLabel: "電商重構：從訂單到交付的流程",
    profile: [
      { label: "現職", value: "0 到 1 AI 節能產品與營運工具" },
      { label: "產品經驗", value: "B2B 平台、數據中台、電商與 IoT" },
      { label: "近期成果", value: "導入 AI 工作流程，交付效率提升 50%" },
    ],
    primaryCta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "看案例", href: "#cases" },
  },

  metrics: {
    title: "可驗證的產品成果",
    items: [
      {
        prefix: "+",
        value: 50,
        suffix: "%",
        label: "現職產品交付效率",
        detail: "導入 AI 工具與開發工作流程",
      },
      {
        value: 1000,
        suffix: " 單／日",
        label: "生鮮電商揀貨產能",
        detail: "AWS 上雲重構後，300 → 1,000 單／日",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "生鮮電商平台營業額",
        detail: "重構後成長；客戶年營收 NT$2 億",
      },
      {
        prefix: "+",
        value: 66,
        suffix: "%",
        label: "健康管理 App 日活躍使用者",
        detail: "新平台上線後，12,000 → 20,000／日",
      },
      {
        value: 1000,
        suffix: " 萬筆",
        label: "跨產業客戶資料整合",
        detail: "串接線上電商與線下 POS 資料",
      },
      {
        value: 100,
        suffix: " 棟",
        label: "包租代管 SaaS 房源管理規模",
        detail: "協助釐清多住戶管理需求與產品流程",
      },
    ],
    awards: ["2022 PMI 專案管理標竿獎 卓越獎", "AWS 官方數位轉型案例"],
  },

  method: {
    title: "從問題定義到產品交付",
    steps: [
      {
        verb: "定義問題",
        text: "從使用者、營運與商業目標出發，釐清真正需要解的問題。",
      },
      {
        verb: "找出關鍵限制",
        text: "用資料、訪談與流程盤點，判斷最值得優先處理的限制。",
      },
      {
        verb: "設計解法",
        text: "將需求轉為可驗證的產品方案，對齊優先序、資源與成功指標。",
      },
      {
        verb: "推動落地",
        text: "協調團隊交付、驗收與迭代，持續追蹤成果是否改善。",
      },
    ],
    capabilitiesTitle: "我能帶來的價值",
    capabilities: [
      {
        name: "0 到 1 AI 產品與開發工作流程",
        text: "在需求仍持續演進的情況下，將 AI 工具導入產品與開發流程，加快交付速度。",
      },
      {
        name: "B2B 平台與營運流程",
        text: "理解企業採購、管理者與第一線使用者各自的流程，設計能落地的產品與後台工具。",
      },
      {
        name: "資料產品與跨系統整合",
        text: "釐清資料定義與系統邊界，串連產品、工程與營運，讓資料能支持決策與服務。",
      },
    ],
  },

  cases: {
    title: "案例",
    columns: {
      situation: "情境",
      bottleneck: "瓶頸",
      hypothesis: "我的做法",
      result: "結果",
    },
    items: [
      {
        id: "grocery",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        title: "蔬果電商全端重構與倉儲流程優化",
        impact: "300 → 1,000 單／日，提升 233%",
        situation:
          "疫情期間訂單快速成長，年營收 NT$2 億的蔬果電商既有系統無法負荷，前台、後台與 App 都需要重構。",
        bottleneck:
          "必須先梳理從訂單到貨品交付的完整流程，才能找出倉儲揀貨的產能限制並安排重構優先序。",
        hypothesis:
          "主導前台、後台、App 與 AWS 架構重構，串連產品、工程與營運，將訂單與倉儲流程納入同一套交付設計。",
        result:
          "重構後，揀貨從日處理 300 單提升至 1,000 單（+233%），平台營業額成長 120%，並入選 AWS 官方數位轉型案例。",
      },
      {
        id: "health-app",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        title: "健康管理 App 重構與 IoT 整合",
        impact: "每日活躍使用者 12,000 → 20,000，成長 66%",
        situation:
          "年營收約 NT$8 億的健康管理 App 需要重新規劃與重構，整合 IoT 體重計健康分析、活動報名，並轉移舊平台使用者資料。",
        bottleneck:
          "新舊系統資料欄位、IoT 裝置資料與新功能流程必須一致定義，否則使用者資料無法安全轉移或持續使用。",
        hypothesis:
          "以訪談梳理使用者旅程、痛點與 Persona；完成競品分析後，透過工作坊與客戶對齊優先序，並主導使用案例設計與 QA 驗收。",
        result:
          "以 AWS 為基礎上線新平台並完成資料轉移，每日活躍使用者從約 12,000 到約 20,000，一年內成長 66%。",
      },
      {
        id: "cdp",
        org: "歐可達數據科技有限公司",
        period: "2020/6 - 2020/12",
        title: "跨通路數據中台（CDP）",
        impact: "整合跨產業 1,000 萬筆客戶資料",
        situation:
          "客戶的 LINE、Facebook、官網、電商與 POS 資料分散，無法辨識同一使用者的來源、購買行為與消費頻率。",
        bottleneck:
          "跨通路資料格式與身分識別不一致；1,000 萬筆客戶資料必須先整理與串接，才能成為可用的客戶視圖。",
        hypothesis:
          "以產品 Roadmap 與 Scrum 雙週迭代協調產品、數據團隊，主導 CDP、聊天機器人、網站埋點與數據儀表板的 PRD 與功能設計。",
        result:
          "整合零售、電商與不動產領域 1,000 萬筆客戶資料，串接線上電商與線下 POS 資料，並建立客戶 360 度視圖。",
      },
      {
        id: "ecofirst",
        org: "台灣愛淨 Ecofirst",
        period: "2025/3 - 現在",
        title: "0 到 1 AI 空調節能產品與營運工具",
        impact: "交付效率提升 50%，案場營運效率提升 20%",
        situation:
          "AI 空調節能產品仍在原型階段；既有作法偏專案導向，缺少可重複使用的後台與內部工具。",
        bottleneck:
          "需求持續湧入，但開發、部署與案場營運尚未形成標準流程，限制產品完整度與交付速度。",
        hypothesis:
          "制定產品路線圖，結合 AI 開發工作流程打造內部小工具，並協調軟體、專案、業務三個部門建立開發與部署流程。",
        result:
          "建立跨部門開發與部署流程；AI 工作流程讓交付效率提升 50%，標準作業程序讓案場營運效率提升 20%。",
      },
    ],
  },

  experience: {
    title: "經歷",
    items: [
      {
        org: "台灣愛淨股份有限公司 Ecofirst",
        role: "產品經理",
        period: "2025/3 - 現在",
        summary:
          "負責 0 到 1 AI 空調節能產品的路線圖與功能策略；在需求快速演進的環境中，結合 AI 打造內部工具並推進流程產品化。",
        bullets: [
          "將 AI 工具與開發工作流程導入產品交付，交付效率提升 50%",
          "協調軟體部、專案部、業務部跨部門合作，建立產品開發與部署流程",
          "優化內部營運流程，制定標準化作業程序，案場營運效率提升 20%",
        ],
      },
      {
        org: "知識衛星 SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        summary:
          "負責 to B 企業培訓平台的產品規劃，服務企業人資採購、管理與員工學習流程，並進行學習數據產品與市場驗證。",
        bullets: [
          "企業培訓：訪談不同規模企業的人資，釐清企業採購後的課程指派、新人 onboarding 與學習管理流程",
          "學習數據：規劃學習數據儀表板，協助企業人資掌握員工能力成長與學習狀況",
          "香港市場：與行銷夥伴透過第三方平台，以最小可行方式在 3 週內切入香港市場",
          "學習成效與營收：規劃課堂測驗驗證學習成效；研究聯盟行銷與團購，設計新的營收成長功能",
          "營運流程：梳理內部人資請假、補休與請款流程，規劃工具與流程以提升營運效率",
        ],
      },
      {
        org: "個人接案",
        role: "獨立顧問",
        period: "2023/5 - 2023/11",
        summary:
          "職涯轉換期間持續承接產品策略、SaaS 與募資顧問專案，累積從商業策略、產品管理到跨角色協作的實務經驗。",
        bullets: [
          "包租代管 SaaS：協助管理約 100 棟房源的業者規劃多住戶管理軟體，釐清需求並建立產品管理流程",
          "協作流程：從商業策略展開產品策略與 Roadmap，優化工程師、設計師與需求方的協作方式",
          "募資顧問：協助能源業與鋁塑業梳理營運流程、調整 Pitch Deck，並對接投資人",
        ],
      },
      {
        org: "Fable 寓意科技",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        summary:
          "以 Agile 管理 NT$1,200 萬+ 專案組合，領導 10 人工程團隊與 2 名初階 PM。負責前台、後台與 App 的產品重構，串連電商、倉儲與 IoT 整合。獲 2022 PMI 專案管理標竿獎卓越獎。",
        bullets: [
          "蔬果電商（年營收 NT$2 億）：在訂單暴增期間主導全端與 AWS 架構重構，揀貨從日處理 300 單到 1,000 單（+233%），平台營業額成長 120%",
          "健康管理 App（年營收約 NT$8 億）：重構新平台、轉移使用者資料並整合 IoT 體重計，每日活躍使用者 12,000 → 20,000，一年內成長 66%",
        ],
      },
      {
        org: "歐可達數據科技有限公司",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        summary: "管理產品與數據兩個團隊，規劃跨通路數據中台（CDP）的產品 Roadmap 與 Scrum 雙週迭代。",
        bullets: [
          "整合零售、電商與不動產領域 1,000 萬筆客戶資料，串接 LINE、Facebook、官網、電商與 POS 資料",
          "主導 CDP、LINE 與 Facebook Chatbot、網站埋點與數據儀表板的 PRD 撰寫與功能設計",
          "為客戶制定數據策略，建立客戶 360 度視圖",
        ],
      },
      {
        org: "眾碩投資諮詢顧問股份有限公司",
        role: "產品助理",
        period: "2019/2 - 2020/6",
        summary:
          "在技術入股型創投環境中，協助傳統企業從產品探索走向市場驗證，參與研究、原型、需求梳理與外包協作。",
        bullets: [
          "參與電商、粉絲與影音教學平台專案，完成 Wireframe、Prototype、競品分析與流程梳理，並協作工程與設計夥伴交付",
          "體制外孵化 2 間規模 100 萬的公司，並協助產品進入市場驗證",
        ],
      },
    ],
  },

  contact: {
    title: "聯絡",
    text: "若你正在尋找具 0 到 1、B2B 平台、資料產品或跨部門交付經驗的產品經理，歡迎聯絡我。",
    cta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/" }],
  },

  footer: {
    text: "© 2026 許承澤 Kevin Hsu",
  },

  animation: {
    nodes: {
      intake: "接單",
      picking: "揀貨",
      packing: "包裝",
      shipping: "出貨",
    },
    bottleneckLabel: "瓶頸",
    hypothesis: "重構前台、後台、App 與 AWS 架構，串起訂單到交付流程",
    throughputLabel: "300 → 1,000 單／日",
    captions: [
      "訂單堆在揀貨環節，每日只能處理 300 單。",
      "重構前台、後台、App 與 AWS 架構，重新串起交付流程。",
      "日處理 1,000 單，平台營業額成長 120%。",
    ],
    replay: "重播",
    ariaLabel:
      "動畫示意圖：訂單流經接單、揀貨、包裝、出貨四個環節，揀貨出現瓶頸，經 AWS 上雲重構後，每日處理量從 300 單提升到 1,000 單。",
  },
} satisfies SiteContent;
