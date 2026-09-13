import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜產品經理",
    description:
      "產品經理許承澤。把流程拆開看，找出卡住的地方，再用資料和工具把事情做得更好。",
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
    headline: "把流程拆開，讓產品真的解決問題。",
    subline: "我習慣先找出卡住的地方，再用資料、AI 和合適的工具一步步改善。",
    visualLabel: "AWS 上雲重構：從瓶頸到成果",
    primaryCta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "看案例", href: "#cases" },
  },

  metrics: {
    title: "做過的產品成果",
    items: [
      {
        value: 1000,
        suffix: " 單／日",
        label: "生鮮電商揀貨量",
        detail: "300 → 1,000 單／日，提升 233%",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "生鮮電商營業額",
        detail: "年營收 NT$2 億的 B2C 電商",
      },
      {
        prefix: "+",
        value: 66,
        suffix: "%",
        label: "健康管理 App DAU",
        detail: "12,000 → 20,000，一年內成長",
      },
      {
        value: 1000,
        suffix: " 萬筆",
        label: "CDP 客戶資料整合",
        detail: "線上 EC × 線下 POS，跨產業客戶資料",
      },
    ],
    awards: ["2022 PMI 專案管理標竿獎 卓越獎", "AWS 官方數位轉型案例"],
  },

  method: {
    title: "我怎麼把事情往前推",
    steps: [
      {
        verb: "把流程攤開",
        text: "先把事情拆成幾個環節，看清楚每一步怎麼接起來。",
      },
      {
        verb: "找出卡點",
        text: "用資料和訪談，找出真正讓事情慢下來的那一段。",
      },
      {
        verb: "先做假設",
        text: "想清楚要解什麼、預期會改變什麼，再挑一個最小的方法試。",
      },
      {
        verb: "做了再調整",
        text: "看結果有沒有變好，繼續把流程調到更順。",
      },
    ],
    capabilitiesTitle: "核心能力",
    capabilities: [
      {
        name: "用 AI 把交付做快",
        text: "把 AI 放進產品工作流程，縮短從想法到交付的時間。",
      },
      {
        name: "從規劃做到落地",
        text: "用 AI 協助做出內部夥伴真的會用的工具。",
      },
      {
        name: "用工具處理營運卡點",
        text: "先理解哪個環節卡住，再用合適的工具一個個改善。",
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
        title: "蔬果電商 AWS 上雲重構",
        impact: "300 → 1,000 單／日，提升 233%",
        situation: "年營收 NT$2 億的蔬果電商，揀貨每日處理 300 單。",
        // TODO(kevin): 確認怎麼發現揀貨是瓶頸、驗證了什麼
        bottleneck: "揀貨環節是整條流程的產能瓶頸。",
        hypothesis: "主導 AWS 上雲重構，目標是解開揀貨的產能限制。",
        result:
          "揀貨從日處理 300 單到 1,000 單（+233%），營業額成長 120%，入選 AWS 官方數位轉型案例。",
      },
      {
        id: "health-app",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        title: "健康管理 App 新平台",
        impact: "每日活躍使用者 12,000 → 20,000，成長 66%",
        situation:
          "年營收約 NT$8 億的健康管理 App，要重新規劃產品、新增體重計健康分析與活動報名，並轉移舊平台使用者資料。",
        bottleneck:
          "困難點在新舊系統的資料欄位定義，定義不清，使用者資料就無法成功轉移。",
        hypothesis:
          "需求訪談梳理使用者旅程、痛點與 Persona，競品分析後用工作坊與客戶對焦優先序，主導使用案例設計與 QA 驗收。",
        result:
          "以 AWS 為基礎上線新平台並完成資料轉移，每日活躍使用者從約 12,000 到約 20,000，一年內成長 66%。",
      },
      {
        id: "cdp",
        org: "歐可達數據科技有限公司",
        period: "2020/6 - 2020/12",
        title: "CDP 與資料團隊",
        impact: "整合跨產業 1,000 萬筆客戶資料",
        situation:
          "管理產品與數據兩個團隊，負責 CDP 產品 Roadmap 與 Scrum 雙週迭代，為零售、電商與不動產客戶建立資料產品。",
        bottleneck:
          "客戶的線上電商與線下 POS 資料分散在不同系統，1,000 萬筆客戶資料需要先整理，才能成為可用的客戶視圖。",
        hypothesis:
          "管理產品與數據兩個團隊，以 CDP 產品 Roadmap 與 Scrum 雙週迭代推進整合，並主導 PRD 撰寫與功能設計。",
        result:
          "整合零售、電商與不動產領域 1,000 萬筆客戶資料，串接線上電商與線下 POS 資料，並建立客戶 360 度視圖。",
      },
      {
        id: "ecofirst",
        org: "台灣愛淨 Ecofirst",
        period: "2025/3 - 現在",
        title: "AI 空調節能產品與營運流程",
        impact: "案場營運效率提升 20%",
        situation:
          "制定並執行 AI 空調節能產品路線圖，需要軟體部、專案部、業務部協作，把產品部署到案場。",
        bottleneck:
          "跨部門的開發與部署流程尚未標準化，案場營運流程有優化空間。",
        hypothesis:
          "協調軟體、專案、業務三個部門建立產品開發與部署流程，並為內部營運制定標準化作業程序。",
        result:
          "建立跨部門的開發與部署流程，標準化作業程序讓案場營運效率提升 20%。",
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
          "制定並執行 AI 空調節能產品路線圖，引導產品方向與功能開發策略。",
        bullets: [
          "協調軟體部、專案部、業務部跨部門合作，建立產品開發與部署流程",
          "優化內部營運流程，制定標準化作業程序，案場營運效率提升 20%",
        ],
      },
      {
        org: "知識衛星 SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        summary:
          "負責企業培訓產品與線上學習市場的產品探索，從企業人資訪談、學習數據產品到香港市場驗證與內部流程優化。",
        bullets: [
          "企業端：訪談不同規模企業的人資，理解培訓如何運作；規劃學習數據儀表板，讓企業掌握員工學習狀況",
          "香港市場：與行銷夥伴透過第三方平台，以最小可行方式在 3 週內切入香港市場",
          "學習成效與營收：規劃課堂測驗驗證學習成效；研究聯盟行銷與團購，設計新的營收成長功能",
          "營運流程：梳理內部人資請假、補休與請款流程，規劃工具與流程以提升營運效率",
        ],
      },
      {
        org: "個人接案",
        role: "獨立顧問",
        period: "2023/5 - 2023/11",
        summary: null,
        // TODO(kevin): Heptabase 產品指標整理連結是否公開
        bullets: [
          "產品管理流程梳理：替一家跨國 SaaS 公司從商業策略展開至產品策略，制定 Product Roadmap 並對應到指標，提高產品與商業的關聯",
          "商業模式梳理：協助一家規模上億的旅宿業者，與 FA 整理內部營運和財務資料，找到市場切入點而完成募資",
          "創投流程梳理：釐清創投流程後建立 Notion 儀表板，讓老闆一眼掌握所有投資案的階段",
        ],
      },
      {
        org: "Fable 寓意科技",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        summary:
          "以 Agile 管理 NT$1,200 萬+ 專案組合，領導 10 人工程團隊（Web + App）並指導 2 名初階 PM，負責開案、執行、資源安排與專案毛利控制。獲 2022 PMI 專案管理標竿獎 卓越獎。",
        bullets: [
          "蔬果電商（年營收 NT$2 億）：主導 AWS 上雲重構，揀貨從日處理 300 單到 1,000 單（+233%），營業額成長 120%，入選 AWS 官方數位轉型案例",
          "健康管理 App（年營收約 NT$8 億）：以 AWS 開發新平台並轉移使用者資料，每日活躍使用者 12,000 → 20,000，一年內成長 66%",
        ],
      },
      {
        org: "歐可達數據科技有限公司",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        summary: "管理產品與數據兩個團隊，負責 CDP 產品 Roadmap 與 Scrum 雙週迭代。",
        bullets: [
          "整合零售、電商與不動產垂直領域 1,000 萬筆客戶資料，串接線上電商與線下 POS 資料",
          "主導 CDP、LINE 與 Facebook Chatbot、網站埋點與數據儀表板的 PRD 撰寫與功能設計",
          "為客戶制定數據策略，建立客戶 360 度視圖",
        ],
      },
      {
        org: "眾碩投資諮詢顧問股份有限公司",
        role: "產品助理",
        period: "2019/2 - 2020/6",
        summary:
          "與企業做使用者訪談、了解產業知識、找出優化機會點，做最小可行驗證並同步收集回饋。",
        bullets: [
          "體制外孵化成功 2 間規模 100 萬的公司，並打造產品進入市場驗證",
        ],
      },
    ],
  },

  contact: {
    title: "聯絡",
    text: "正在找產品經理，或想聊流程與瓶頸的問題，歡迎聯絡我。",
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
    hypothesis: "主導 AWS 上雲重構，改善揀貨流程",
    throughputLabel: "300 → 1,000 單／日",
    captions: [
      "訂單堆在揀貨環節，每日只能處理 300 單。",
      "主導 AWS 上雲重構，改善揀貨流程。",
      "日處理 1,000 單，平台營業額成長 120%。",
    ],
    replay: "重播",
    ariaLabel:
      "動畫示意圖：訂單流經接單、揀貨、包裝、出貨四個環節，揀貨出現瓶頸，經 AWS 上雲重構後，每日處理量從 300 單提升到 1,000 單。",
  },
} satisfies SiteContent;
