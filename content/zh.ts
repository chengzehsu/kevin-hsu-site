import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜Product Manager｜找出卡點，做出解法，量出成果",
    description:
      "具 5 年以上產品相關經驗的 Product Manager。曾主導 B2C 電商重構、負責健康 App 重構的需求訪談與驗收，並負責跨團隊交付與資料產品規劃；帶領過 10 人工程團隊與 2 位初階 PM。",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "作品集", href: "/portfolio/" },
      { label: "AI 習慣", href: "#linkedin-posts" },
      { label: "能力", href: "#skills" },
      { label: "經歷", href: "#experience" },
      { label: "聯絡", href: "#contact" },
    ],
    switchLabel: "EN",
    switchAria: "Switch to English",
    skipLabel: "跳至主要內容",
  },

  hero: {
    eyebrow: "許承澤 Kevin Hsu｜Product Manager · 5 年以上產品經驗",
    kicker: "規格寫完了，會議開完了，東西還沒跑起來？",
    headline: "找出【卡點】，做出【解法】，量出【成果】。",
    traits: [
      {
        label: "好奇",
        text: "看到新工具，我先動手試。",
        proof: "用 Cursor 與 Gemini 做出 AI 名片管理助手",
      },
      {
        label: "勇於嘗試",
        text: "程式經驗不多，照樣做出內部平台。",
        proof: "用 Claude Code，2 個月 218 次提交",
      },
      {
        label: "追求效率",
        text: "控制策略調整",
        shift: { from: "1 週", to: "2 小時" },
        proof: "把 AI 放進開發流程，交付效率 +50%",
      },
    ],
    profile: [
      {
        label: "定位",
        value: "Product Manager · B2C 平台重構、跨團隊交付與 AI 工作流程",
      },
      {
        label: "產品領域",
        value: "AI 節能（B2B）、B2C 電商、健康 App、企業培訓與跨通路資料平台",
      },
      { label: "求職目標", value: "面向全球市場的 B2C 平台與成長期產品團隊" },
    ],
    film: {
      caption: "AI 節能產品：交付效率 +50%",
      caseId: "ecofirst",
      pauseLabel: "暫停影片",
      playLabel: "播放影片",
      seekLabel: "影片進度",
      chapters: [{ at: 0, label: "開場" }, { at: 12, label: "六項能力" }, { at: 35.4, label: "三個習慣" }, { at: 50, label: "收尾" }],
      summary:
        "60 秒影片：規格寫完了，會議開完了，東西還沒跑起來。AI 時代的 PM，做出東西不再是門檻，要看的是六項能力：問題定義、快速實驗、原型實作、流程重構、跨團隊交付、資料判讀；每一段經歷，都讓這張能力圖再大一圈。接著是三個工作習慣。好奇：看到新工具，我先動手試，Claude Code、Cursor、Gemini、Notion AI；用 Cursor 與 Gemini 自己做出 AI 名片管理助手，從 OCR 辨識失敗、重建版控到部署上線，流程是拍名片、Gemini 辨識、Notion 建檔。勇於嘗試：程式經驗不多的產品經理，用 Claude Code 做出內部平台，2 個月 218 次提交。追求效率：控制策略模擬工具把策略調整從 1 週縮短到 2 小時；把 AI 放進開發流程後，交付效率 +50%。找出卡點，做出解法，量出成果。許承澤 Kevin Hsu，Product Manager · AI · B2C 平台 · 跨團隊交付。",
    },
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
        detail: "AI 導入需求到開發協作，交付週期前後比較",
      },
      {
        value: 1000,
        featured: true,
        suffix: " 單／日",
        label: "蔬果電商的揀貨日產能",
        detail: "系統重構後，300 → 1,000 單／日 (+233%)",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "重構期間的平台營收成長",
        detail: "團隊成果；客戶年營收約 NT$2 億",
      },
      {
        prefix: "+",
        value: 66,
        featured: true,
        suffix: "%",
        label: "健康 App 的每日活躍使用者",
        detail: "新版上線一年內，DAU 12,000 → 20,000",
      },
      {
        value: 1000,
        suffix: " 萬筆",
        label: "整理過的客戶資料",
        detail: "把電商和實體 POS 的資料接起來",
      },
      {
        prefix: "NT$",
        value: 1200,
        suffix: " 萬+",
        label: "管理的 B2C 專案組合",
        detail: "Fable 寓意科技，帶領 10 人工程團隊與 2 位初階 PM",
      },
    ],
  },

  linkedinPosts: {
    title: "三個 AI 工作習慣",
    intro: "每次卡住，就換一種 AI 工具親手試，做到團隊能用為止。",
    author: "許承澤 Kevin Hsu",
    platform: "LinkedIn",
    readLabel: "看實作紀錄",
    caseLabel: "出自案例",
    items: [
      {
        caseId: "ecofirst",
        trait: "勇於嘗試",
        stat: "218",
        statLabel: "次提交，2 個月",
        title: "程式經驗不多，用 Claude Code 做出內部平台",
        description: "從串接 API 開始，把案場資料查詢流程做成工具，邊用邊改。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
        image: {
          src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
          alt: "案場資料查詢工具的介面",
          width: 1208,
          height: 1236,
        },
      },
      {
        caseId: "namecard",
        trait: "好奇",
        stat: "0 → 1",
        statLabel: "自己做出來",
        title: "AI 名片管理助手，掃完直接進 CRM",
        description:
          "欄位對齊公司 Notion CRM，名片掃完直接成為客戶資料，業務只補判斷。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
        image: {
          src: "/linkedin-posts/post-2.jpg",
          alt: "AI 名片管理助手的流程示意圖",
          width: 800,
          height: 446,
        },
      },
      {
        caseId: "ecofirst",
        trait: "追求效率",
        stat: "1 週 → 2 小時",
        statLabel: "控制策略調整",
        title: "控制策略模擬工具",
        description:
          "把超過 10 萬種控制組合的試算做成工具，不再靠人工一組一組調。",
        image: {
          src: "/portfolio-wall/film-7.webp",
          alt: "控制策略調整從 1 週縮短到 2 小時",
          width: 1600,
          height: 1000,
        },
      },
      {
        caseId: "ecofirst",
        trait: "追求效率",
        stat: "+50%",
        statLabel: "產品交付效率",
        title: "用 Claude 把產品管理流程自動化",
        description:
          "會議、提案、需求、規格到 mock data 驗證，都先由 AI 起草，我判斷定稿。每天 17:00 自動整理會議待辦，已累積 102 份。",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
        image: {
          src: "/linkedin-posts/ai-product-workflow.zh.svg",
          alt: "產品管理流程圖：會議追蹤、提案初稿、需求釐清、規格撰寫、mock data 驗證到開發協作，各段由 Claude 自動化，產品交付效率 +50%",
          width: 1200,
          height: 750,
        },
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
        title: "PMI 台灣分會專案管理標竿獎",
        distinction: "卓越獎",
        description:
          "Fable 寓意科技期間的專案成果，從流程盤點、系統重構到跨團隊交付。",
        link: { label: "看相關經歷", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "案例收錄",
        caseId: "grocery",
        title: "AWS 數位轉型案例",
        distinction: "生鮮電商",
        description:
          "在寓意科技主導生鮮電商的系統重構與上雲；AWS 將此案列為數位轉型案例，刊登於關鍵評論網。",
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
        name: "用 AI 加快交付",
        text: "將 AI 導入需求釐清、規格撰寫、mock data 驗證與開發協作，讓想法更快變成團隊能用的成果。",
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
    title: "作品集",
    inventory: "4 個工作案例＋2 個個人專案",
    intro: "每個案例同一套結構：問題、決策、做出來的東西、成果。",
    workTitle: "工作案例",
    allLabel: "看完整作品集（另有 2 個個人專案）",
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
    sideTitle: "個人專案：工作之餘用 vibe coding 解決身邊的困擾",
    sideIntro:
      "公司和自己卡住的地方，下班後用 AI 做成產品。",
    sourceLabel: "看公開原始碼",
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
        impact: "揀貨日產能 300 → 1,000 單／日 (+233%)",
        ownership: "盤點訂單到交付流程；協調前後台、App 與 AWS 重構。",
        situation:
          "疫情期間訂單暴增，年營收約 NT$2 億的蔬果電商前台、後台與 App 無法支撐營運。",
        bottleneck: "端到端盤點後，確認揀貨站與運輸產能是主要瓶頸。",
        decision:
          "先解決揀貨與運輸產能，再依訂單到交付流程同步重構前台、後台、App 與 AWS。",
        decisionSummary: "先解倉儲與運輸瓶頸，再同步重構前台、後台與 AWS。",
        hypothesis:
          "以同一份優先序協調產品、工程、倉儲與營運，分階段完成旺季改善與系統重構。",
        result:
          "揀貨日產能 300 → 1,000 單／日 (+233%)；重構期間平台營收成長 120%，並獲 AWS 案例收錄。",
        artifacts: [
          "專案總覽",
          "訂單資訊流盤點",
          "產業與商品資料分析",
          "測試腳本",
          "專案知識庫",
        ],
        measurement:
          "比較重構前後的揀貨日產能；AWS 數位轉型報導提供公開佐證。營收成長為重構期間的團隊成果。",
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
        impact: "DAU 12,000 → 20,000 (1 年 +66%)",
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
          "新平台上線並完成資料遷移；DAU 一年內由約 12,000 增至 20,000 (+66%)。",
        artifacts: [
          "使用者訪談",
          "Wireframe",
          "User Story",
          "PRD",
          "參數與翻譯對照表",
        ],
        measurement:
          "比較新平台上線時與一年後的每日活躍使用者；12,000 → 20,000 為整體產品與團隊成果。",
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
        ownership:
          "規劃 CDP、Chatbot、埋點與儀表板；帶領產品與資料團隊雙週協作。",
        situation:
          "LINE、Facebook、官網、電商與 POS 資料分散，客戶無法辨識同一使用者的來源與消費行為。",
        bottleneck:
          "通路格式與身分識別規則不同，資料必須先結構化與串接才能形成 Customer 360。",
        decision:
          "先以 30 個目標名單及跨部門訪談驗證切入點，再調整既有能力形成 MVP。",
        decisionSummary:
          "先用 30 個目標名單與跨部門訪談驗證切入點，再收斂 MVP。",
        hypothesis:
          "以雙週節奏推進 CDP、Chatbot、埋點與儀表板需求，對齊產品與資料團隊。",
        result:
          "串接 5 個通路，整合零售、電商與不動產共 1,000 萬筆資料，建立 Customer 360 客戶輪廓。",
        artifacts: [
          "Product Roadmap",
          "MVP 訪談計畫",
          "客戶資料策略提案",
          "指標知識體系",
          "資料產品 PRD",
        ],
        measurement:
          "以完成結構化與串接的資料量及通路覆蓋計算；1,000 萬筆為跨產業整合規模。",
        measurementSummary: "資料規模與通路覆蓋：完成串接後計算",
      },
      {
        id: "ecofirst",
        org: "台灣愛淨 Ecofirst",
        period: "2025/3 - 現在",
        rank: 2,
        title: "AI 節能產品：把業務到 RD 接成一條線",
        role: "Product Manager",
        scope: "4 位 RD｜50 個案場｜專案規模約 NT$1 億｜Roadmap、AI 開發、內部工具",
        collaboration: "軟體、專案、業務與案場營運團隊",
        impact: "交付效率 +50%｜案場營運效率 +20%",
        ownership: "規劃並維護業務部與軟體部的 Notion 營運架構：17 個資料庫、42 條關聯、70 多個自動計算欄位，以及需求與售前規範。",
        situation:
          "AI 空調節能產品還在早期，案場資訊散在 LINE、Email 和個人電腦；業務問交期、RD 問需求，都靠問人。",
        bottleneck:
          "業務憑感覺承諾交期，需求沒寫清楚就進開發；插單、超載、誰在等誰，都沒有數字。",
        decision: "把業務到 RD 拆成六層架構：資料、關聯、計算、檢視、規則、AI；交期從需求確認那天起算。",
        decisionSummary: "業務到 RD 拆成六層架構，交期從需求確認那天起算。",
        hypothesis:
          "17 個資料庫放名片、客戶、專案、業務推進與 RD 任務；一張客戶卡看得到負責業務、階段與決策者；公式自動算出推進天數、插單、延遲與每週產能；業務、PM、RD 各有工作台；需求模板、開票時程與售前工期分級訂規則；AI 整理 FAQ、名詞與需求。",
        result:
          "AI 導入需求、規格與開發交接，交付效率 +50%；案場營運效率 +20%。系統累積 1,639 筆業務推進、1,829 筆 RD 任務，其中 1,500 筆以上的業務紀錄已整理成 FAQ。",
        artifacts: [
          "17 個資料庫的營運資料模型",
          "自動算插單、延遲與產能的公式",
          "業務、PM、RD 各自的工作台",
          "需求模板、開票時程與售前規範",
          "AI 整理 FAQ、名詞與需求",
          "內部資料平台（2 個月 218 次提交）",
          "控制策略模擬工具",
        ],
        measurement:
          "效率以導入前後的交付週期與案場作業時間比較；架構與筆數取自公司 Notion（2026-10），不含客戶與金額。",
        measurementSummary: "交付週期與案場作業時間：導入前後比較",
      },
      {
        id: "namecard",
        kind: "side",
        org: "個人專案",
        period: "2025/7 - 2026/7",
        rank: 5,
        title: "AI 名片管理助手：架構跟著商業模式走",
        role: "產品負責人兼開發者",
        scope: "LINE 拍名片 → AI 辨識 → 寫進公司 Notion",
        collaboration: "使用者是公司業務與幾位朋友；用 Cursor 與 Claude Code 開發，Gemini 辨識名片",
        impact: "拍照到建檔時間 −99%｜內部工具與 SaaS 兩種架構都親手做過",
        ownership:
          "商業模式和產品架構都由我規劃，也親手做出來：內部工具、多租戶 SaaS，到依實際用量收斂。",
        situation:
          "業務拿到名片要人工輸入公司 Notion，資料不齊，主管很難追客戶進度、決策影響力與窗口的 KPI。",
        bottleneck:
          "名片只有姓名電話，CRM 要的判斷欄位得靠人。讓 AI 填，等於替業務下判斷。",
        decision:
          "先做成對齊公司 CRM 的內部工具，判斷欄位留給業務；再驗證能不能做成 SaaS，設計多租戶與訂閱方案；用量證明不需要，就收斂回輕量架構。",
        decisionSummary: "先想清楚商業模式，架構跟著商業模式走。",
        hypothesis:
          "以前 PM 只能寫規格、等工程排程；現在我能把不同商業模式直接做成可運作的架構，用真實用量決定留哪一個。",
        result:
          "業務拍照就能建檔，主管在 Notion 就能追客戶。SaaS 的商業假設也用真實用量驗證過，再決定收斂。",
        artifacts: [
          "LINE 名片 Bot",
          "公司 CRM 欄位對照",
          "多租戶與訂閱方案後台",
          "架構盤點報告",
          "瘦身後的單一服務架構",
        ],
        measurement:
          "拍照到建檔時間：比較手動輸入與拍照建檔。另有開發紀錄佐證：欄位對齊（2025/8）、判斷改由業務填（2025/9）、架構盤點（2026/7）。",
        measurementSummary: "拍照到建檔時間：手動輸入與拍照比較",
      },
      {
        id: "podcast-stock",
        kind: "side",
        org: "個人專案",
        period: "2026/6 - 2026/9",
        rank: 6,
        title: "股神打架：買股前，先看多空",
        role: "產品負責人（獨立開發）",
        scope: "Web 產品｜AI 觀點抽取｜多空並排",
        collaboration: "獨立開發，與 Claude Code 協作，每個功能經 PR 審查",
        impact: "同一檔股票，多空論點並排，每句附原話",
        ownership: "問題定義、產品範圍與可信度規則。",
        situation:
          "買股前想知道財經 podcaster 怎麼看，但沒空一集一集聽，摘要也說不出誰看多、誰看空。",
        bottleneck:
          "AI 抽出的觀點無法驗證：90 筆實測中，86% 的強度分數擠在 0.6 到 0.9，沒有鑑別力。",
        decision:
          "不做多數決，多空並排；每個論點都要找得到原話；只攤開論點，不給買賣建議。",
        decisionSummary: "多空並排、每句附原話，不給買賣建議。",
        hypothesis:
          "我要的不是摘要，是同一檔股票的論點對照；判斷還是自己下。",
        result:
          "424 次 commit、59 個 PR，已上線。對不上原文不計分，證據不足就棄權。",
        artifacts: [
          "產品規格（OpenSpec）",
          "觀點抽取評測",
          "回測防前視偏誤規則",
          "多空辯論設計文件",
          "公開 GitHub repo",
        ],
        measurement:
          "強度分數取自 90 筆實際觀點（2026-07-22）；commit 與 PR 數取自公開 repo。",
        measurementSummary: "90 筆實際觀點的強度分數分布",
        source: "https://github.com/chengzehsu/podcast-stock",
      },
    ],
  },

  experience: {
    title: "經歷速覽",
    intro: "八段經歷，每段都從同一個問題開始：卡在哪裡？",
    currentLabel: "現在",
    expandLabel: "工作內容",
    collapseLabel: "收合經歷",
    skillLabel: "這段經歷讓我累積",
    items: [
      {
        id: "ecofirst",
        org: "台灣愛淨節能科技股份有限公司 Ecofirst",
        role: "Product Manager",
        period: "2025/3 - 現在",
        focus: "AI 節能產品、內部工具與跨團隊交付",
        skillSignal:
          "將現場做法整理成 Roadmap、AI 工具與交付流程，讓跨部門團隊有共同的推進方式。",
        summary:
          "負責仍處於早期階段的 AI 空調節能產品，帶領 4 位 RD，產品部署於 50 個案場、專案規模約 NT$1 億。除了規劃產品方向，也將原本仰賴個人經驗的做法逐步整理為工具與流程。",
        bullets: [
          "導入 AI 工具與開發工作流程，產品交付效率提升 50%",
          "協調軟體部、專案部、業務部跨部門合作，建立產品開發與部署流程",
          "優化內部營運流程，制定標準化作業程序，案場營運效率提升 20%",
        ],
      },
      {
        id: "advisory",
        org: "個人接案",
        role: "獨立顧問｜營運數位轉型與募資策略",
        period: "2024/9 - 2025/2",
        focus: "能源與旅宿業的營運改造與募資",
        skillSignal: "從營運數據出發，把改善成果寫成投資人看得懂的商業故事。",
        summary:
          "以獨立顧問承接能源與旅宿兩個案子，從營運改造做到募資，兩案合計約 NT$1.7 億的募資進入投資人實質洽談。",
        bullets: [
          "能源業：盤點 3 個部門的營運流程並導入 Asana，管理階層能即時掌握各部門進度；以此支撐約 NT$1 億的募資進入實質洽談",
          "旅宿業：分析 106 間 Airbnb 的房型住房率，發現台北 3 房家庭式房型稀少，推出時住房率達 90%，高於台北平均 65%；據此定位 2 棟旅館，推動約 NT$7,000 萬的募資進入實質洽談",
          "募資實務：建置 DD room（盡職調查資料室）、試算估值模型，把營運數據寫成投資人願意買單的商業故事",
        ],
      },
      {
        id: "sat",
        org: "知識衛星 SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        focus: "企業培訓、線上學習與香港市場驗證",
        skillSignal:
          "在採購者、管理者與使用者的不同需求中釐清優先順序，並用最小可行的方式驗證市場。",
        summary:
          "同時負責企業端與線上學習兩個市場：企業端從人資訪談與學習數據切入，線上學習端負責新市場驗證與課程體驗。",
        bullets: [
          "香港市場：與行銷夥伴利用第三方平台，以最小可行方式在 3 週內切入香港市場，首週營業額突破 NT$100 萬",
          "內部流程：盤點人資請假補休、請款與客服流程並重新規劃，營運效率提升 20%",
          "企業培訓：訪談不同規模企業的人資，釐清培訓實際的運作方式；規劃學習數據儀表板，讓企業依數據優化培訓計畫",
          "學習成效：在課程中設計測驗，讓學員在學習過程中自行驗證學習成效",
        ],
      },
      {
        id: "consulting",
        org: "個人接案",
        role: "獨立顧問",
        period: "2023/6 - 2023/11",
        focus: "產品策略、包租代管 SaaS 與募資顧問",
        skillSignal:
          "將商業目標、使用者流程與交付限制收斂成 Roadmap，讓工程、設計與需求方按同一套優先順序協作。",
        summary:
          "2023 年以獨立顧問身分，承接產品策略、SaaS 與募資顧問案。每個案子都必須從商業問題一路拆解到團隊協作方式。",
        bullets: [
          "包租代管 SaaS：協助管理約 100 棟房源的業者，從商業問題定義多住戶管理軟體的需求與產品管理流程",
          "協作流程：從商業策略展開產品策略與 Roadmap，優化工程師、設計師與需求方的協作流程",
          "募資顧問：協助能源業與旅宿業梳理營運流程、調整 Pitch Deck，並開始對接投資人",
        ],
      },
      {
        id: "huayao",
        org: "華曜興業有限公司",
        role: "Senior Operations Manager",
        period: "2022/11 - 2023/5",
        focus: "供應鏈與倉儲流程優化",
        skillSignal:
          "把產品方法用在營運現場：先把資料與流程理清楚，再改善出貨效率與成本。",
        summary: "短期營運管理職，聚焦供應鏈與倉儲流程。",
        gapAfter: "2022/8 - 2022/10｜休息與接案",
        bullets: [
          "打造產品資料庫，整合客戶、出貨與採購資訊，降低訂單處理的溝通成本與出錯率",
          "重新設計倉儲儲位與產品分類邏輯，提高出貨效率",
          "分析歷史財報，提出成本結構假設與策略建議",
        ],
      },
      {
        id: "fable",
        org: "Fable 寓意科技",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        focus: "電商與健康 App 重構、跨職能團隊交付",
        skillSignal:
          "在高壓交付裡練出系統產品觀：從使用者流程、技術重構到營運結果，串成同一個決策。",
        summary:
          "管理 NT$1,200 萬以上的 B2C 專案組合，帶領 10 人工程團隊與 2 位初階 PM；負責電商、倉儲、App 與 IoT 整合，獲 2022 PMI 台灣分會專案管理標竿獎卓越獎。",
        bullets: [
          "蔬果電商（客戶年營收約 NT$2 億）：在訂單暴增期間主導訂單到交付的流程盤點，協調全端與 AWS 架構重構，揀貨 300 → 1,000 單／日 (+233%)；重構期間平台營收成長 120%",
          "健康管理 App（年營收約 NT$8 億）：以使用者訪談、競品研究與客戶工作坊定義優先順序，重構平台、轉移資料並整合 IoT 體重計；每日活躍使用者一年內由 12,000 成長至 20,000(+66%)",
        ],
      },
      {
        id: "oakda",
        org: "歐可達數據科技有限公司",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        focus: "跨通路客戶資料平台、聊天機器人與儀表板",
        skillSignal:
          "從資料定義、身分識別與跨通路行為出發，知道資料如何產品化成可用的服務與決策。",
        summary:
          "帶領產品與資料團隊，釐清跨通路資料平台的範圍，並以雙週節奏推進開發。",
        bullets: [
          "整合零售、電商與不動產領域 1,000 萬筆客戶資料，串接 LINE、Facebook、官網、電商與 POS 資料",
          "主導 CDP、LINE 與 Facebook Chatbot、網站埋點與資料儀表板的 PRD 撰寫與功能設計",
          "為客戶制定資料策略，建立 Customer 360 客戶輪廓",
        ],
      },
      {
        id: "zhongshuo",
        org: "眾碩投資諮詢顧問股份有限公司",
        role: "產品助理",
        period: "2019/2 - 2020/6",
        focus: "市場研究、原型設計與早期產品驗證",
        skillSignal:
          "從市場探索、原型與競品研究開始，建立先驗證問題、再投入交付的產品直覺。",
        summary:
          "在技術入股型創投裡，陪傳統企業從想法走到市場測試；研究、原型、需求和外包協作都做過。",
        bullets: [
          "參與電商、粉絲與影音教學平台專案，完成 Wireframe、Prototype、競品分析與流程梳理，並協作工程與設計夥伴交付",
          "推動以技術入股模式孵化的 2 家早期公司完成產品策略與市場驗證，2 家營收皆突破 NT$100 萬",
        ],
      },
    ],
  },

  contact: {
    kicker: "找出卡點，做出解法，量出成果。",
    title: "聊聊下一個產品機會。",
    text: "正在尋找面向全球市場的 B2C 平台與成長期產品團隊，尤其是想把 AI 放進日常工作的團隊。歡迎聊聊職缺、產品方向，或你們正在解決的問題。",
    cta: { label: "聯絡我", href: "mailto:kevin492625@gmail.com" },
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/",
      },
    ],
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
