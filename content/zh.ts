import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜Product Manager｜B2C 平台重構與交付",
    description:
      "具 5 年以上產品相關經驗的 Product Manager。曾主導 B2C 電商重構、參與健康 App 重構，並負責跨團隊交付與資料產品規劃；帶領過 10 人工程團隊與 2 位初階 PM。",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "經歷", href: "#experience" },
      { label: "能力", href: "#skills" },
      { label: "作品集", href: "/portfolio/" },
      { label: "聯絡", href: "#contact" },
    ],
    switchLabel: "EN",
    switchAria: "Switch to English",
    skipLabel: "跳至主要內容",
  },

  hero: {
    eyebrow: "許承澤 Kevin Hsu｜Product Manager",
    headline: "拆解問題，把產品做出來。",
    subline: "從使用者訪談、競品研究與流程拆解釐清優先順序，再與產品、工程和營運團隊一起交付。",
    profile: [
      { label: "定位", value: "Product Manager · B2C 平台重構與跨團隊交付" },
      { label: "產品領域", value: "B2C 電商、健康 App、B2B 企業培訓與跨通路資料平台" },
      { label: "求職目標", value: "面向全球市場的 B2C 平台與成長期產品團隊" },
    ],
    builderLoop: {
      label: "從現場到產品",
      steps: ["看流程", "找問題", "定假設", "做工具", "看成效"],
      result: "愛淨：交付效率 +50%，案場營運效率 +20%",
    },
    primaryCta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "看作品集", href: "/portfolio/" },
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
        label: "平台重整期間的營收成長",
        detail: "客戶年營收規模約 NT$2 億",
      },
      {
        prefix: "+",
        value: 66,
        featured: true,
        suffix: "%",
        label: "健康 App 的每日活躍使用者",
        detail: "新版上線後一年內，12,000 → 20,000／日",
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
    title: "精選案例",
    intro: "四案採相同結構：範圍、取捨、成果、證據。",
    copyLabel: "複製案例連結",
    copiedLabel: "已複製連結",
    copyFallback: "請選取並複製下方連結。",
    linkLabel: "開啟案例連結",
    backLabel: "回到作品集",
    filmLabel: "觀看流程示意",
    readLabel: "查看案例詳情",
    roleLabel: "角色",
    scopeLabel: "範圍",
    collaborationLabel: "協作範圍",
    artifactsLabel: "實際產出",
    measurementLabel: "成果量測",
    ownershipLabel: "我實際主導",
    columns: {
      situation: "情境",
      bottleneck: "瓶頸",
      decision: "關鍵取捨",
      hypothesis: "推進方式",
      result: "成果",
    },
    items: [
      {
        id: "grocery",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 1,
        title: "蔬果電商：重整訂單到交付",
        role: "Senior Project Manager",
        scope: "NT$620 萬｜Web／App｜訂單、倉儲、AWS",
        collaboration: "產品、工程、客戶營運、倉儲物流與 AWS 團隊",
        impact: "揀貨日產能 300 → 1,000（+233%）",
        ownership: "盤點訂單到交付流程；協調前後台、App 與 AWS 重構。",
        situation:
          "疫情期間訂單暴增，年營收約 NT$2 億的蔬果電商前台、後台與 App 無法支撐營運。",
        bottleneck:
          "端到端盤點後，確認揀貨站與運輸產能是主要瓶頸。",
        decision:
          "先解決揀貨與運輸產能，再依訂單到交付流程同步重構前台、後台、App 與 AWS。",
        decisionSummary: "先解倉儲與運輸瓶頸，再同步重構前台、後台與 AWS。",
        hypothesis:
          "以同一份優先序協調產品、工程、倉儲與營運，分階段完成旺季改善與系統重構。",
        result:
          "揀貨日產能由 300 提升至 1,000 單（+233%）；重構期間平台營收成長 120%，並獲 AWS 案例收錄。",
        artifacts: ["專案總覽", "訂單資訊流盤點", "產業與商品資料分析", "測試腳本", "專案知識庫"],
        measurement: "比較重構前後的揀貨日產能；AWS 數位轉型報導提供公開佐證。營收成長為重構期間的團隊成果。",
        measurementSummary: "揀貨日產能：重構前後比較",
      },
      {
        id: "health-app",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 3,
        title: "健康 App：整合服務與 IoT 資料",
        role: "Senior Project Manager",
        scope: "健康 App｜IoT 體重計｜資料遷移｜多國語系",
        collaboration: "客戶產品、工程、資料遷移、IoT 與在地化夥伴",
        impact: "DAU 12,000 → 20,000（1 年 +66%）",
        ownership: "主導訪談、競品分析、工作坊、優先排序與 QA 驗收。",
        situation:
          "年營收約 NT$8 億的健康 App 需要重構，並整合 IoT 體重計、活動報名、多國語系與舊資料。",
        bottleneck:
          "新舊欄位、IoT 資料與功能流程未對齊，會阻礙資料遷移與使用。",
        decision:
          "先把訪談情境轉成 Wireframe、User Story 與 PRD；開發前完成參數與翻譯對照。",
        decisionSummary: "先把真實情境規格化，再處理資料遷移與多國語系風險。",
        hypothesis:
          "以訪談、競品研究與客戶工作坊排優先序，再依使用情境設計測試與驗收。",
        result:
          "新平台上線並完成資料遷移；DAU 一年內由約 12,000 增至 20,000（+66%）。",
        artifacts: ["使用者訪談", "Wireframe", "User Story", "PRD", "參數與翻譯對照表"],
        measurement: "比較新平台上線時與一年後的每日活躍使用者；12,000 → 20,000 為整體產品與團隊成果。",
        measurementSummary: "DAU：上線與一年後比較",
      },
      {
        id: "cdp",
        org: "歐可達數據科技有限公司",
        period: "2020/6 - 2020/12",
        rank: 4,
        title: "跨通路資料：串起線上與線下",
        role: "Product Manager",
        scope: "CDP｜Chatbot｜網站埋點｜儀表板｜POS",
        collaboration: "UX、Sales、Marketing、產品與資料團隊",
        impact: "3 產業 × 5 通路｜整合 1,000 萬筆資料",
        ownership: "規劃 CDP、Chatbot、埋點與儀表板；帶領產品與資料團隊雙週協作。",
        situation:
          "LINE、Facebook、官網、電商與 POS 資料分散，客戶無法辨識同一使用者的來源與消費行為。",
        bottleneck:
          "通路格式與身分識別規則不同，資料必須先結構化與串接才能形成 Customer 360。",
        decision:
          "先以 30 個目標名單及跨部門訪談驗證切入點，再調整既有能力形成 MVP。",
        decisionSummary: "先用 30 個目標名單與跨部門訪談驗證切入點，再收斂 MVP。",
        hypothesis:
          "以雙週節奏推進 CDP、Chatbot、埋點與儀表板需求，對齊產品與資料團隊。",
        result:
          "串接 5 個通路，整合零售、電商與不動產共 1,000 萬筆資料，建立 Customer 360。",
        artifacts: ["Product Roadmap", "MVP 訪談計畫", "客戶資料策略提案", "指標知識體系", "資料產品 PRD"],
        measurement: "以完成結構化與串接的資料量及通路覆蓋計算；1,000 萬筆為跨產業整合規模。",
        measurementSummary: "資料規模與通路覆蓋：完成串接後計算",
      },
      {
        id: "ecofirst",
        org: "台灣愛淨 Ecofirst",
        period: "2025/3 - 現在",
        rank: 2,
        title: "AI 節能產品：從規劃到交付",
        role: "Product Manager",
        scope: "Roadmap｜AI 開發｜內部工具｜部署、案場營運",
        collaboration: "軟體、專案、業務與案場營運團隊",
        impact: "交付效率 +50%｜案場營運效率 +20%",
        ownership: "產品 Roadmap、AI 開發工作流程、內部工具與跨部門部署交接。",
        situation:
          "AI 空調節能產品仍在早期階段，專案式推進缺少可重用的後台與內部工具。",
        bottleneck:
          "開發、部署與案場交接沒有共通流程，需求容易卡在單點經驗與跨部門交接。",
        decision:
          "先把開發、部署與案場交接標準化，再將高頻作業做成內部工具。",
        decisionSummary: "先把開發、部署與案場交接做成可重複流程，再擴充功能。",
        hypothesis:
          "以 Roadmap 對齊優先序，並與軟體、專案、業務共同建立交付流程。",
        result:
          "建立跨部門的開發與部署流程，交付效率提升 50%，案場營運效率提升 20%。",
        artifacts: ["產品 Roadmap", "AI 開發工作流程", "內部營運工具", "部署交接流程", "標準作業程序"],
        measurement: "比較導入前後的內部交付週期與案場作業時間；數據來自團隊營運紀錄，不公開客戶資料。",
        measurementSummary: "交付週期與案場作業時間：導入前後比較",
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
        role: "Product Manager",
        period: "2025/3 - 現在",
        focus: "AI 節能產品、內部工具與跨團隊交付",
        skillSignal: "將現場做法整理成 Roadmap、AI 工具與交付流程，讓跨部門團隊有共同的推進方式。",
        summary:
          "負責仍處於早期階段的 AI 空調節能產品。除了規劃產品方向，也將原本仰賴個人經驗的做法逐步整理為工具與流程。",
        bullets: [
          "導入 AI 工具與開發工作流程，產品交付效率提升 50%",
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
        skillSignal: "在採購者、管理者與使用者的不同需求中釐清優先順序，並進行市場驗證。",
        summary:
          "規劃企業培訓平台時，需兼顧人資人員、管理者與員工三種不同的使用情境，也負責學習資料與市場驗證。",
        bullets: [
          "企業培訓：訪談不同規模企業的人資人員，定義企業採購後的課程指派、新人到職訓練（onboarding）與學習管理流程",
          "學習資料：規劃儀表板與課堂測驗，協助企業人資掌握員工學習狀況與能力成長",
          "香港市場：與行銷夥伴透過第三方平台，以最小可行方式在 3 週內驗證市場切入方式",
          "成長與營運：研究聯盟行銷與團購功能，並規劃內部請假、補休與請款流程的工具化",
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
          "包租代管 SaaS：協助管理約 100 棟房源的業者，從商業問題定義多住戶管理軟體的需求與產品管理流程",
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
          "管理 NT$1,200 萬以上的 B2C 專案組合，帶領 10 人工程團隊與 2 位初階 PM；負責電商、倉儲、App 與 IoT 整合，獲 2022 PMI 專案管理標竿獎卓越獎。",
        bullets: [
          "蔬果電商（客戶年營收約 NT$2 億）：在訂單暴增期間主導全端與 AWS 架構重構，揀貨從日處理 300 單到 1,000 單（+233%）；重構期間平台營收成長 120%",
          "健康管理 App（年營收約 NT$8 億）：以使用者訪談、競品研究與客戶工作坊定義優先順序，重構平台、轉移資料並整合 IoT 體重計；每日活躍使用者一年內由 12,000 成長至 20,000（+66%）",
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
