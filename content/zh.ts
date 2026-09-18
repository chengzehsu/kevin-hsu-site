import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜AI 產品經理",
    description:
      "擅長拆解流程、找出瓶頸，透過 AI 打造產品與內部工具。在愛淨推動產品交付效率提升 50%；具生鮮電商、健康 App 與跨通路資料整合經驗。",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "經歷", href: "#experience" },
      { label: "能力", href: "#skills" },
      { label: "案例", href: "#cases" },
      { label: "聯絡", href: "#contact" },
    ],
    switchLabel: "EN",
    switchAria: "Switch to English",
  },

  hero: {
    eyebrow: "許承澤 Kevin Hsu｜AI 產品經理",
    headline: "拆解問題，把產品做出來。",
    subline: "在愛淨，我用 AI 建立產品開發流程，打造團隊實際使用的內部工具，交付效率提升 50%。",
    profile: [
      { label: "定位", value: "AI 產品經理 · 系統型 PM" },
      { label: "產品領域", value: "0 到 1 與產品重構，橫跨 B2B SaaS、B2C App 與數據產品" },
      { label: "求職目標", value: "能將 AI 導入真實工作流程的產品團隊" },
    ],
    builderLoop: {
      label: "從現場到產品",
      steps: ["看流程", "找問題", "定假設", "做工具", "看成效"],
      result: "愛淨：交付效率 +50%，案場營運效率 +20%",
    },
    primaryCta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "看案例", href: "#cases" },
  },

  metrics: {
    title: "做出的成果",
    items: [
      {
        prefix: "+",
        value: 50,
        featured: true,
        suffix: "%",
        label: "愛淨的產品交付效率",
        detail: "把 AI 工具放進開發流程後",
      },
      {
        value: 1000,
        featured: true,
        suffix: " 單／日",
        label: "生鮮電商的每日履約產能",
        detail: "系統重整後，300 → 1,000 單／日",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "平台重整後的營收成長",
        detail: "客戶原本年營收約 NT$2 億",
      },
      {
        prefix: "+",
        value: 66,
        featured: true,
        suffix: "%",
        label: "健康 App 的每日活躍使用者",
        detail: "新版上線後，12,000 → 20,000／日",
      },
      {
        value: 1000,
        suffix: " 萬筆",
        label: "整理過的客戶資料",
        detail: "把電商和實體 POS 的資料接起來",
      },
      {
        value: 100,
        suffix: " 棟",
        label: "協助規劃的房源規模",
        detail: "先把多住戶管理的流程理清楚",
      },
    ],
  },

  linkedinPosts: {
    title: "LinkedIn 精選貼文",
    intro: "從產品經理親手做工具，到把 AI 放進日常工作流程的實作紀錄。",
    author: "許承澤 Kevin Hsu",
    platform: "LinkedIn",
    readLabel: "前往貼文",
    items: [
      {
        title: "2 個月內完成 218 次提交",
        description: "從串接 API 開始，將案場資料查詢流程做成工具，並用 Claude Code 持續迭代。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
        image: { src: "/linkedin-posts/post-1.jpg", alt: "218 次提交的案場工具介面", width: 800, height: 819 },
      },
      {
        title: "用 Cursor 與 Gemini 做 AI 名片管理助手",
        description: "從 OCR 辨識失敗、重建版控，到部署上線的一次 0 到 1 實作。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
        image: { src: "/linkedin-posts/post-2.jpg", alt: "AI 名片管理助手的流程示意圖", width: 800, height: 446 },
      },
      {
        title: "用 AI 讓會議真的推進",
        description: "透過 Notion AI 與 Claude Cowork 排程，自動整理待辦事項與提案初稿。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
        image: { src: "/linkedin-posts/post-3.jpg", alt: "PM 每日會議追蹤流程優化圖", width: 856, height: 838 },
      },
    ],
  },

  awards: {
    title: "獎項與案例收錄",
    items: [
      {
        id: "pmi",
        kind: "award",
        category: "獲獎紀錄",
        year: "2022",
        title: "PMI 專案管理標竿獎",
        distinction: "卓越獎",
        description: "Fable 寓意科技期間的專案成果，從流程盤點、系統重構到跨團隊交付。",
        link: { label: "看相關經歷", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "專案期間",
        caseId: "grocery",
        title: "AWS 數位轉型案例",
        distinction: "放心初蔬果網",
        description: "在寓意科技主導放心初的系統重構與上雲，後續由 AWS 提供內容、刊登於關鍵評論網。",
        link: {
          label: "閱讀案例報導",
          href: "https://www.thenewslens.com/feature/aws/250301",
        },
      },
    ],
  },

  method: {
    title: "從現場問題到可用產品",
    steps: [
      {
        verb: "拆解流程",
        text: "先走進使用者、營運與團隊的工作現場，釐清工作流程中的卡點。",
      },
      {
        verb: "找到瓶頸",
        text: "用流程、資料與第一線回饋，找出真正值得優先處理的限制。",
      },
      {
        verb: "提出假設",
        text: "把問題轉成可驗證的產品假設，排出該先做什麼、暫時不做什麼。",
      },
      {
        verb: "做出並驗證",
        text: "和工程、設計、營運一起交付工具與產品，再以速度、錯誤率與採用情況驗證成效。",
      },
    ],
    capabilitiesTitle: "我的核心能力",
    capabilities: [
      {
        name: "AI 驅動的交付加速",
        text: "將 AI 導入需求釐清、規格、製作與驗收流程，縮短從想法到交付成果的距離。",
      },
      {
        name: "從產品規劃到實際交付",
        text: "將高頻、重複的內部需求做成工具，供軟體、專案與業務團隊直接使用。",
      },
      {
        name: "用數位工具優化營運瓶頸",
        text: "先理解哪個環節卡住、成本在哪裡，再選擇流程、資料或工具介入，並用效率、錯誤與採用情況驗證。",
      },
    ],
  },

  cases: {
    title: "案例",
    intro: "從成果開始，有興趣再展開看我怎麼做。",
    expandLabel: "看我怎麼做",
    collapseLabel: "收合案例",
    copyLabel: "複製案例連結",
    copiedLabel: "已複製連結",
    copyFallback: "請選取並複製下方連結。",
    linkLabel: "開啟案例連結",
    backLabel: "返回經歷與案例",
    filmLabel: "觀看流程示意",
    ownershipLabel: "我實際主導",
    columns: {
      situation: "當時的狀況",
      bottleneck: "真正卡住的地方",
      hypothesis: "我怎麼處理",
      result: "後來怎麼樣",
    },
    items: [
      {
        id: "grocery",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 2,
        title: "蔬果電商：重整訂單到交付",
        impact: "300 → 1,000 單／日，提升 233%",
        ownership: "訂單到交付流程盤點、前後台／App 重構協作與 AWS 架構整合。",
        situation:
          "疫情讓訂單一下子變多。年營收 NT$2 億的蔬果電商撐不住，前台、後台和 App 都得重做。",
        bottleneck:
          "盤點接單到出貨的流程後，確認揀貨站是優先處理的瓶頸。",
        hypothesis:
          "我帶著產品、工程和營運一起排重做順序；前台、後台、App 和 AWS 架構也一起整理。",
        result:
          "揀貨從一天 300 單變成 1,000 單（+233%），平台營收也成長 120%，後來被 AWS 選為數位轉型案例。",
      },
      {
        id: "health-app",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 3,
        title: "健康 App：整合服務與 IoT 資料",
        impact: "每日活躍使用者 12,000 → 20,000，成長 66%",
        ownership: "使用者訪談、競品整理、客戶工作坊、優先排序、使用情境與 QA 驗收。",
        situation:
          "年營收約 NT$8 億的健康 App 要重做平台，還要整合 IoT 體重計、活動報名，並搬回舊平台的使用者資料。",
        bottleneck:
          "新舊系統的欄位、IoT 資料與新功能流程若未先對齊，資料遷移將無法順利進行，使用者也會受阻。",
        hypothesis:
          "我先訪談使用者、進行競品研究，再與客戶召開工作坊安排優先順序，並依使用情境進行 QA 與驗收。",
        result:
          "新平台上線、資料搬完後，每日活躍使用者從約 12,000 變成約 20,000，一年成長 66%。",
      },
      {
        id: "cdp",
        org: "歐可達數據科技有限公司",
        period: "2020/6 - 2020/12",
        rank: 4,
        title: "跨通路資料：串起線上與線下",
        impact: "整合跨產業 1,000 萬筆客戶資料",
        ownership: "CDP、聊天機器人、埋點與儀表板的產品規劃，以及產品與資料團隊的雙週協作。",
        situation:
          "客戶的 LINE、Facebook、官網、電商和 POS 資料散在各處，看不出是不是同一個人、從哪來、買了什麼。",
        bottleneck:
          "資料格式和身分辨識都不一樣；1,000 萬筆資料得先整理好、接起來，才看得到完整的客戶樣子。",
        hypothesis:
          "我以雙週節奏與產品及資料團隊協作，規劃 CDP、聊天機器人、網站埋點與儀表板。",
        result:
          "最後整合零售、電商與不動產領域共 1,000 萬筆客戶資料，並串接線上電商與線下 POS 資料。",
      },
      {
        id: "ecofirst",
        org: "台灣愛淨 Ecofirst",
        period: "2025/3 - 現在",
        rank: 1,
        title: "AI 節能產品：從規劃到交付",
        impact: "交付效率提升 50%，案場營運效率提升 20%",
        ownership: "產品 Roadmap、AI 開發工作流程、內部工具與跨部門部署交接。",
        situation:
          "AI 空調節能產品仍處於早期階段；原本以單一專案方式推進，缺少可重複使用的後台與內部工具。",
        bottleneck:
          "需求一直來，但開發、部署和案場怎麼運作還沒有一套共通做法，事情容易卡在交接。",
        hypothesis:
          "我先規劃產品後續方向，並導入 AI 開發流程製作內部工具，與軟體、專案及業務團隊梳理交接流程。",
        result:
          "建立跨部門的開發與部署流程，交付效率提升 50%，案場營運效率提升 20%。",
      },
    ],
  },

  experience: {
    title: "經歷速覽",
    expandLabel: "工作內容",
    collapseLabel: "收合經歷",
    skillLabel: "這段經歷讓我累積",
    items: [
      {
        id: "ecofirst",
        org: "台灣愛淨股份有限公司 Ecofirst",
        role: "產品經理",
        period: "2025/3 - 現在",
        focus: "AI 節能產品、內部工具與交付流程",
        skillSignal: "從現場做法抽象出可複製的產品系統：用 Roadmap、AI 工具與交付系統，讓團隊能持續複製。",
        summary:
          "負責仍處於早期階段的 AI 空調節能產品。除了規劃產品方向，也將原本仰賴個人經驗的做法逐步整理為工具與流程。",
        bullets: [
          "將 AI 工具與開發工作流程導入產品交付，交付效率提升 50%",
          "協調軟體部、專案部、業務部跨部門合作，建立產品開發與部署流程",
          "優化內部營運流程，制定標準化作業程序，案場營運效率提升 20%",
        ],
      },
      {
        id: "sat",
        org: "知識衛星 SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        focus: "B2B 企業培訓、學習資料與新市場驗證",
        skillSignal: "在採購者、管理者與使用者的需求衝突中取捨，建立 B2B 產品判斷並驗證商業機會。",
        summary:
          "規劃企業培訓平台時，需兼顧人資人員、管理者與員工三種不同的使用情境，也負責學習資料與市場驗證。",
        bullets: [
          "企業培訓：訪談不同規模企業的人資人員，釐清企業採購後的課程指派、新人到職訓練（onboarding）與學習管理流程",
          "學習資料：規劃學習資料儀表板，協助企業人資人員掌握員工能力成長與學習狀況",
          "香港市場：與行銷夥伴透過第三方平台，以最小可行方式在 3 週內切入香港市場",
          "學習成效與營收：規劃課堂測驗驗證學習成效；研究聯盟行銷與團購，設計新的營收成長功能",
          "營運流程：梳理內部人資請假、補休與請款流程，規劃工具與流程以提升營運效率",
        ],
      },
      {
        id: "consulting",
        org: "個人接案",
        role: "獨立顧問",
        period: "2023/5 - 2023/11",
        focus: "產品策略、包租代管 SaaS 與募資顧問",
        skillSignal: "將商業目標、使用者流程與交付限制收斂成 Roadmap，讓工程、設計與需求方按同一套優先順序協作。",
        summary:
          "職涯空窗期間，我承接產品策略、SaaS 與募資顧問案。每個案子都必須從商業問題一路拆解到團隊協作方式。",
        bullets: [
          "包租代管 SaaS：協助管理約 100 棟房源的業者規劃多住戶管理軟體，釐清需求並建立產品管理流程",
          "協作流程：從商業策略展開產品策略與 Roadmap，優化工程師、設計師與需求方的協作流程",
          "募資顧問：協助能源業與旅宿業梳理營運流程、調整 Pitch Deck，並對接投資人",
        ],
      },
      {
        id: "fable",
        org: "Fable 寓意科技",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        focus: "電商與健康 App 重構、跨職能團隊交付",
        skillSignal: "在高壓交付裡練出系統產品觀：從使用者流程、技術重構到營運結果，串成同一個決策。",
        summary:
          "管過 NT$1,200 萬以上的案子，也帶過 10 人工程團隊和 2 位初階 PM。做過電商、倉儲、App 和 IoT 整合，拿過 2022 PMI 專案管理標竿獎卓越獎。",
        bullets: [
          "蔬果電商（年營收 NT$2 億）：在訂單暴增期間主導全端與 AWS 架構重構，揀貨從日處理 300 單到 1,000 單（+233%），平台營收成長 120%",
          "健康管理 App（年營收約 NT$8 億）：重構新平台、轉移使用者資料並整合 IoT 體重計，每日活躍使用者 12,000 → 20,000，一年內成長 66%",
        ],
      },
      {
        id: "oakda",
        org: "歐可達數據科技有限公司",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        focus: "跨通路客戶資料平台、聊天機器人與儀表板",
        skillSignal: "從資料定義、身分識別與跨通路行為出發，知道資料如何產品化成可用的服務與決策。",
        summary: "帶領產品與資料團隊，釐清跨通路資料平台的範圍，並以雙週節奏推進開發。",
        bullets: [
          "整合零售、電商與不動產領域 1,000 萬筆客戶資料，串接 LINE、Facebook、官網、電商與 POS 資料",
          "主導 CDP、LINE 與 Facebook Chatbot、網站埋點與資料儀表板的 PRD 撰寫與功能設計",
          "為客戶制定資料策略，建立客戶 360 度視圖",
        ],
      },
      {
        id: "zhongshuo",
        org: "眾碩投資諮詢顧問股份有限公司",
        role: "產品助理",
        period: "2019/2 - 2020/6",
        focus: "市場研究、原型設計與早期產品驗證",
        skillSignal: "從市場探索、原型與競品研究開始，建立先驗證問題、再投入交付的產品直覺。",
        summary:
          "在技術入股型創投裡，陪傳統企業從想法走到市場測試；研究、原型、需求和外包協作都做過。",
        bullets: [
          "參與電商、粉絲與影音教學平台專案，完成 Wireframe、Prototype、競品分析與流程梳理，並協作工程與設計夥伴交付",
          "參與以技術入股模式孵化的 2 家早期公司，並協助產品進入市場驗證",
        ],
      },
    ],
  },

  contact: {
    title: "聊聊下一個產品機會。",
    text: "正在尋找能把 AI 推進真實工作的產品團隊。歡迎聊聊職缺、產品方向，或你們正在解決的問題。",
    cta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/" }],
  },

  footer: {
    text: "© 2026 許承澤 Kevin Hsu",
    backToTop: "返回頂端",
  },

  animation: {
    nodes: {
      intake: "接單",
      picking: "揀貨",
      packing: "包裝",
      shipping: "出貨",
    },
    bottleneckLabel: "瓶頸",
    hypothesis: "重構前台、後台、App 與 AWS 架構\n串起訂單到交付流程",
    throughputLabel: "300 → 1,000 單／日",
    captions: [
      "訂單堆在揀貨環節，每日只能處理 300 單。",
      "重構前台、後台、App 與 AWS 架構，重新串起交付流程。",
      "日處理 1,000 單，平台營收成長 120%。",
    ],
    replay: "重播",
    ariaLabel:
      "動畫示意圖：訂單流經接單、揀貨、包裝、出貨四個環節，揀貨出現瓶頸，經 AWS 上雲重構後，每日處理量從 300 單提升到 1,000 單。",
  },
} satisfies SiteContent;
