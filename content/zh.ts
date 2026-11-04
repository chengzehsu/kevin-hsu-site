import { facts, metricGroups } from "./facts";
import type { SiteContent } from "./types";

export const zh = {
  locale: "zh",

  meta: {
    title: "許承澤 Kevin Hsu｜Senior Product Manager｜平台重構與內部系統",
    description:
      "Senior Product Manager，7 年以上產品相關經驗，專注平台重構與內部系統：把要等工程師的事，變成 PM 能自己完成的流程，再用數字驗證。曾在專案中帶領 10 位工程師，也直屬管理 2 位初階 PM。",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "如何用 AI 解決問題", href: "#ai" },
      { label: "履歷", href: "/resume/", depth: true },
      { label: "作品集", href: "/portfolio/", depth: true },
    ],
    contact: { label: "聯絡我", href: "#contact" },
    menuLabel: "選單",
    switchLabel: "EN",
    switchAria: "Switch to English",
    skipLabel: "跳至主要內容",
  },

  hero: {
    eyebrow: "許承澤 Kevin Hsu｜Senior Product Manager · 7 年以上｜帶過 10 位工程師｜負責的產品合約總額約 NT$1 億",
    kicker: "我找出卡住產能的那一步，親手做出工具拿掉它：用 Claude Code 開發內部後台，748 次提交。",
    headline: "找出【痛點】，做出【解法】，量出【成果】。",
    profile: [
      {
        label: "規模",
        value: "帶過 10 位工程師、直屬管理 2 位初階 PM；負責的產品合約總額約 NT$1 億",
      },
      {
        label: "產品領域",
        value: "AI 節能（B2B）、電商訂單到交付、健康管理 App、跨通路資料平台與企業培訓",
      },
      {
        label: "獎項",
        value: "2022 PMI 台灣分會標竿專案獎優選、AWS 數位轉型案例",
      },
    ],
    film: {
      caption: "看內部後台案例",
      caseId: "internal-backend",
      pauseLabel: "暫停影片",
      playLabel: "播放影片",
      seekLabel: "影片進度",
      fullscreenLabel: "全螢幕觀看",
      exitFullscreenLabel: "離開全螢幕",
      muteLabel: "關閉聲音",
      unmuteLabel: "開啟聲音",
      chapters: [
        { at: 0, label: "開場" },
        { at: 11, label: "現在" },
        { at: 17, label: "成果" },
        { at: 41, label: "成長" },
        { at: 50, label: "收尾" },
      ],
      summary:
        "60 秒影片：許承澤 Kevin Hsu，Senior Product Manager。我找出卡住產能的那一步，親手做出工具拿掉它。以前，PM 改一格資料都要等工程師：文件來回、排工程師、做完才驗證。現在，釐清需求、做出 Prototype、確認需求、再正式實作，需求處理從約 1 個月縮短到約 1 週。用 Claude Code 親手開發內部後台，748 次提交；客戶導入約 2 週 → 約 2 小時，PM 自己完成（不含現場接線與控制策略）。回覆客戶一天 → 10 分鐘。單一案場客製占比 30% → 10%，單一案場異常處理 30 分鐘 → 3 分鐘。控制策略調整 1 週 → 2 小時，一次試算超過 10 萬種組合。2019 到 2024 年帶團隊交付：帶過 10 位工程師，出貨量 300 → 1,000 單／日 (+233%)，2022 PMI 台灣分會標竿專案獎優選。2025 年起親手做出工具，從釐清需求到 Prototype 自己跑完。找出痛點，做出解法，量出成果。看履歷與案例。",
    },
    primaryCta: { label: "看履歷", href: "/resume/" },
    secondaryCta: { label: "看案例", href: "#work" },
  },

  metrics: {
    title: "代表成果",
    items: facts.zh,
    groups: metricGroups.zh,
  },

  aiPractice: {
    title: "如何用 AI 解決問題",
    highlightsTitle: "如何用 AI 解決問題",
    intro:
      "AI 先提案，人來拍板；確認它做得準，才交給它自動跑。每一項都寫出痛點是什麼、AI 做了什麼、人決定了什麼。",
    highlights: [
      {
        problem: "超過 10 萬種控制參數，只能人工試算",
        solution: "用 AI 做模擬工具，一次算完並排出結果。",
        stat: { value: "1 週 → 2 小時", label: "調整一次控制策略" },
      },
      {
        problem: "每家廠商命名不同，兩百個點位靠肉眼比對",
        solution: "釐清命名規則後做成 AI 工具，PM 上傳點位表就自動轉換。",
        stat: { value: "1 小時 → 5 分鐘", label: "製作一份點位表" },
        caseId: "sensor-naming",
      },
      {
        problem: "實體名片留在桌邊，業務要手動輸入 CRM",
        solution: "親手打造 LINE bot，拍照後 AI 辨識並寫進 Notion CRM。",
        stat: { value: "2,000 張", label: "實體名片記進 Notion CRM" },
        caseId: "namecard",
      },
    ],
    labels: {
      stuck: "痛點",
      ai: "AI 做的事",
      human: "人拍板的事",
      result: "結果",
      source: "出處",
      caseLink: "看完整案例",
      read: "看 LinkedIn 貼文",
      expand: "看 AI 和人怎麼分工",
      collapse: "收合",
    },
    chapters: [
      {
        id: "ai-build",
        title: "用 AI 做產品",
        lead: {
          title: "內部後台：一眼看出哪個案場出問題",
          stuck:
            "客戶問空調最近正不正常，PM 得先問工程師，工程師再去翻 Excel；資料有問題，常常到做報告才發現。",
          ai: "我先寫需求說明與規格，再交給 Claude Code 實作；每次修改都要先經過另一個 AI 模型審查，才能放進正式版本。",
          human:
            "什麼叫「資料到齊」、畫面先講哪個結論，由我定義；正式上線一律由人按下按鈕。",
          stat: { value: "34", label: "個案場，一個畫面看完" },
          result:
            "把同一個原因造成的缺資料提醒合併成一張後，提醒從 244 張降到 12 張，PM 一眼就知道該處理哪幾台設備。",
          source:
            "案場數取自後台（2026/10/23）；截圖為真實資料，案場名稱已匿名。",
          caseId: "internal-backend",
          href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
          image: {
            src: "/portfolio-artifacts/internal-backend-overview.webp",
            alt: "收值總覽（各案場設備資料的回傳狀況）：每個案場一行，列出有問題的實際值與正常範圍、資料完整度，以及有問題的設備台數；案場名稱以代號顯示",
            width: 1648,
            height: 686,
          },
        },
        items: [
          {
            title: "控制策略模擬工具",
            stuck:
              "空調控制策略有超過 10 萬種參數組合，過去要靠人工一組一組試算。",
            ai: "用 AI 做出模擬工具，一次試算所有組合並排出比較結果。",
            human: "工具只負責試算和比較，哪一組策略上線由人決定。",
            stat: { value: "1 週 → 2 小時", label: "調整一次控制策略" },
            result: "調整一次控制策略的時間，從 1 週縮短到 2 小時。",
            source: "導入前後的策略調整時間比較",
            image: {
              src: "/portfolio-wall/film-8.webp",
              alt: "開場影片畫面：控制策略調整 2 小時，一次試算超過 10 萬種組合",
              width: 1600,
              height: 1000,
            },
          },
          {
            title: "AI 名片管理助手",
            stuck:
              "業務拿到名片要手動輸入公司 Notion，資料常常不齊，主管很難追客戶進度。",
            ai: "業務在 LINE 拍下名片，Gemini 辨識內容，自動寫進公司的客戶資料庫。",
            human:
              "客戶階段、決策影響力這類判斷欄位留給業務填，不讓 AI 替業務下判斷。",
            stat: { value: "2,000 張", label: "實體名片記進 Notion CRM" },
            result: "業務實際採用：80 筆名片集中在 4 天內建檔完成。",
            source: "拍照與手動輸入的時間比較；建檔筆數取自公司 Notion",
            image: {
              src: "/linkedin-posts/post-2.jpg",
              alt: "AI 名片管理助手的流程示意圖：拍名片、AI 辨識、寫進 Notion",
              width: 800,
              height: 446,
            },
            caseId: "namecard",
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
          },
          {
            title: "後台可點原型，當成給 RD 的規格",
            stuck:
              "新後台的需求在執行長、業務和 PM 之間來回溝通，光看文件很難有共識。",
            ai: "用 AI 在 2 天內做出 19 個可以實際點擊的畫面，資料全部是示範用的假資料。",
            human:
              "哪些功能要做、先做哪個，由我和執行長、業務看著原型一起決定，再整理成給 RD 的規格。",
            stat: { value: "19", label: "個畫面，2 天做完" },
            result: "討論從讀文件改成直接點畫面，原型也成為交給 RD 的規格。",
            source: "原型的 git 紀錄（2026/3）",
            image: {
              src: "/ai-covers/prototype.svg",
              alt: "示意圖：三個疊在一起、可以點擊的後台畫面",
              width: 800,
              height: 500,
            },
          },
          {
            title: "這個網站：規格我定，程式 AI 寫",
            stuck: "我要一個能當場證明產品能力的網站，但沒有工程團隊。",
            ai: "Claude Code 依規格寫程式、動畫和測試，也幫我檢查內容是否前後一致。",
            human:
              "定位、內容取捨、版面和每個數字的出處，由我決定；上線前由我驗收。",
            stat: { value: "7 週", label: "一個人做出中英文網站和開場影片" },
            result:
              "一個人做出中英文網站、開場影片和動畫牆，程式更新後自動上線。",
            source: "這個網站的 git 紀錄（2026/11）",
            image: {
              src: "/hero-reel-poster.zh.webp",
              alt: "這個網站開場影片的結尾畫面",
              width: 1200,
              height: 750,
            },
            caseId: "resume-site",
          },
        ],
      },
      {
        id: "ai-process",
        title: "用 AI 改善工作流程",
        lead: {
          title: "點位命名：不再靠人工對照",
          stuck:
            "每家廠商交來的點位清單（設備上每一個要讀取的數值）命名都不一樣，一個案場約兩百個點位，肉眼看不完，對錯一個數據報告就會出問題。",
          ai: "我做了一支全公司共用的命名程式：先把廠商的命名對成標準名稱，再檢查數值合不合理。它只看設備開機時段的數值，判斷不了就標「無法判定」，不當成正常。",
          human:
            "機器沒把握的點一次問一題；沒人知道答案時，就寫成一句可以直接轉給系統整合商的問句，不自己補答案。冰水管路是共用還是分開、設備有幾台這類現場事實，永遠問人。",
          stat: { value: "93%", label: "機器一次就對" },
          result:
            "每次改規則，都要先補一題測驗，再通過十套自動測試，確認舊的對照沒被改壞；「機器信心很高卻答錯」必須是 0 筆才能上線。截至 2026/9 已盤點 34 個案場、7,110 個點位。",
          source:
            "72 個點位的逐筆檢查，取自 2 個真實案場與 1 個示範案例（2026/9/10）；盤點數取自全案場盤點（2026/9/1）",
          image: {
            src: "/ai-covers/naming.svg",
            alt: "示意圖：格式雜亂的廠商命名排成標準名稱，沒把握的一項交給人確認",
            width: 800,
            height: 500,
          },
          caseId: "sensor-naming",
        },
        items: [
          {
            title: "Sales FAQ：只給確認過的答案",
            stuck:
              "客戶問過的問題散在 1,500 多份會議紀錄裡，業務找不到，也不確定哪個講法是公司的正式說法。",
            ai: "AI 每週從會議紀錄整理出 FAQ 草稿並附上來源；碰到價格、保固、補助的題目，自動標成高敏感。",
            human:
              "兩道人工關卡：業務主管挑題，負責人寫下正式答案；只有人工確認過的題目，AI 才能拿來回答業務。",
            stat: {
              value: "約 50 題",
              label: "正式答案，業務可直接查（AI 整理 185 題，人工確認才開放）",
            },
            result:
              "流程已經跑起來了。要讓 AI 回答更多業務的問題，下一步要加快的是人工審核。",
            source: "公司 Notion 的 Sales FAQ 資料庫（2026/9/30）",
            image: {
              src: "/ai-covers/faq.svg",
              alt: "示意圖：許多問題經過兩道人工關卡，只剩確認過的答案",
              width: 800,
              height: 500,
            },
            caseId: "sales-faq",
          },
          {
            title: "需求到開發交接，AI 先寫初稿",
            stuck:
              "需求要來回好幾輪才講得清楚；規格寫完了、會議開完了，開發還是卡住。",
            ai: "會議追蹤、需求、規格、用假資料驗證，到開發交接，都先由 AI 寫初稿；每個平日 17:00 自動整理當天會議的待辦。",
            human: "每一份都由我判斷、修改後才定稿送出。",
            stat: {
              value: "110 份",
              label: "每日會議待辦，AI 起草、由我確認（2026/4 起）",
            },
            result:
              "每日會議追蹤從 2026/4 起已累積 110 份，每份都由人確認後才送出。",
            source: "份數取自排程產出（2026/10）",
            image: {
              src: "/linkedin-posts/ai-product-workflow.zh.svg",
              alt: "產品管理流程圖：會議追蹤、需求、規格、假資料驗證到開發交接，各段由 AI 寫初稿",
              width: 1200,
              height: 750,
            },
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
          },
        ],
      },
      {
        id: "ai-life",
        title: "用 AI 自動處理生活雜事",
        lead: {
          title: "生活中控台：帳單和提醒一起管",
          stuck:
            "帳單和對帳單以 PDF 寄到信箱，要一份份打開記錄、分類；繳費期限和合約到期也很容易漏掉。",
          ai: "用 Claude Code 依規格做出來：自動從信箱抓帳單，整理分類，標出重複或漏掉的扣款，到期前提醒；平常用一句話就能記錄或查詢。",
          human:
            "規則由我訂，例如不登入網路銀行；分類有錯時，由我確認後修正規則。",
          stat: {
            value: "每天在用",
            label: "整理帳單並提醒繳費，從 2026/3 用到現在",
          },
          result: "自動執行；需要我判斷的項目，系統會另外列出來。",
          source:
            "個人專案的 git 紀錄（2026/10/23）。為保護隱私，不放截圖和程式碼連結。",
          image: {
            src: "/ai-covers/life.svg",
            alt: "示意圖：信件變成整理好的單據，行事曆上有一個提醒",
            width: 800,
            height: 500,
          },
          caseId: "life-hub",
        },
        items: [],
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
        title: "PMI 台灣分會標竿專案獎",
        distinction: "優選",
        description:
          "在 Fable 寓意科技負責的專案，工作包含流程盤點、系統重構與跨團隊交付。",
        link: { label: "看相關經歷", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "案例收錄",
        caseId: "grocery",
        title: "AWS 數位轉型案例",
        distinction: "蔬果電商",
        description:
          "在寓意科技主導蔬果電商的系統重構，並把系統搬上雲端；AWS 將此案列為數位轉型案例，刊登於關鍵評論網。",
        link: {
          label: "看關鍵評論網報導",
          href: "https://www.thenewslens.com/feature/aws/250301",
        },
      },
    ],
  },

  cases: {
    title: "作品集",
    inventory: "{total} 個案例：{work} 個工作專案、{side} 個個人專案",
    intro: "每個案例的成果，以及我具備的能力。",
    workTitle: "案例",
    allLabel: "看全部 {total} 個案例",
    copyLabel: "複製案例連結",
    copiedLabel: "已複製連結",
    copyFallback: "請選取並複製下方連結。",
    linkLabel: "開啟案例連結",
    backLabel: "回到作品集",
    capabilityLabels: {
      used: "具備的能力",
      grown: "學到的能力",
      cardUsed: "具備",
      cardGrown: "學到",
    },
    decisionLabel: "我做的決定",
    readLabel: "看案例",
    roleLabel: "角色",
    scopeLabel: "範圍",
    collaborationLabel: "合作對象",
    artifactsLabel: "實際產出",
    dataMap: {
      title: "整合了哪些資料，看出什麼",
      sources: "整合的資料",
      insight: "看出什麼",
    },
    measurementLabel: "數字來源",
    ownershipLabel: "我主導的部分",
    decisionLog: {
      title: "我做過的決定",
      call: "決定",
      signal: "依據",
      outcome: "結果",
    },
    sourceLabel: "看公開原始碼",
    columns: {
      situation: "情境",
      bottleneck: "痛點",
      decision: "我做的決定",
      hypothesis: "做法與假設",
      result: "成果",
    },
    items: [
      {
        id: "internal-backend",
        org: "台灣愛淨 Ecofirst",
        period: "2026/4 - 2026/10",
        rank: 1,
        title: "內部後台：PM 不用等工程師，2 小時讓客戶看到畫面",
        homeTitle: "內部後台：客戶導入從約 2 週縮短到約 2 小時",
        role: "Senior Product Manager（規劃與實作）",
        scope:
          "34 個案場（導入系統的現場）｜案場管理、設備資料回傳管理、客戶戰情室",
        collaboration: "專案部 PM、負責收設備資料的工程師、業務與軟體部 RD",
        impact:
          "導入案場：等工程師約 2 週 → PM 約 2 小時自行完成（不含現場接線與控制策略）｜34 個案場（2026/10）",
        scenarios: [
          {
            name: "案場管理",
            stuck: "PM 改一格點位，都要等工程師",
            now: "PM 自己下載、修改、上傳、檢查",
          },
          {
            name: "設備資料回傳管理",
            stuck: "資料有問題，常到做報告才發現",
            now: "打開總覽就知道哪台有問題、該交給誰",
          },
          {
            name: "數據管理",
            stuck: "節能成果出來前，客戶決策者沒有畫面可看",
            now: "導入階段就有畫面可看",
          },
        ],
        capabilities: {
          used: ["問題定義", "訂資料檢查規則"],
          grown: ["用 AI 做出可操作原型", "和 RD 合作把原型做成正式功能"],
        },
        ownership:
          "我定義問題和成功標準，寫平台藍圖給總經理，決定先做什麼、不做什麼；接著用可操作的原型和 AI 開發做出來，再和 RD 一起做成正式功能；到 2026/10 累積 748 次程式提交。",
        situation:
          "每個案場的點位清單散在不同檔案。PM 要改一格、要回答客戶案場狀況，都得先問工程師。",
        bottleneck:
          "導入一個案場要等工程師約 2 週；資料有問題常常到做報告才發現；節能成果出來前，客戶的決策者沒有畫面可看。",
        decision:
          "拿掉 PM 和工程師之間的交接，下載、上傳、檢查都放在同一個地方；節能成果出來前，先做出給客戶看的畫面。",
        decisionSummary: "拿掉 PM 和工程師之間的交接，讓 PM 自己完成案場導入。",
        hypothesis:
          "PM 能自己完成點位測試，導入就不再受工程師排程限制。",
        result: ["PM 導入案場：約 2 週 → 約 2 小時（不含現場接線與控制策略）", "每輪點位測試的交接：4 次 → 0 次", "納入平台的案場：9 個 → 34 個（2026/5～10）", "單一案場客製占比：30% → 10%", "需求處理：約 1 個月 → 約 1 週（先做 Prototype 驗證）"],
        artifacts: ["點位清單的下載、上傳與檢查", "資料回傳總覽與健康頁", "客戶節能戰情室原型"],
        measurement:
          "案場數與提交數取自後台與 git（2026/10）；約 2 週與約 2 小時是我的實際經驗，不含現場接線與控制策略；上傳次數取自上線以來的紀錄，每次省下約 1 小時是我的估算。截圖案場名稱已匿名。",
        measurementSummary:
          "導入時間：我的實際經驗；任務與工時：公司任務資料庫",
        article: {
          lead: "三個功能，各自解決不同人卡住的地方。",
          sections: [
            {
              id: "site-management",
              trait: "案場管理",
              heading: "問題不是工程師慢，是每改一格都要經過工程師",
              stat: {
                value: "20 次以上",
                label:
                  "PM 自助上傳（上線以來），每次省下工程師約 1 小時（估算）",
              },
              paragraphs: ["PM 要改一格點位清單，得先請工程師下載、改好交回、等工程師上傳，錯了再來一輪。我直接拿掉這段交接：PM 自己下載、修改、上傳，接著看收回來的資料對不對。"],
              figure: {
                src: "/portfolio-artifacts/internal-backend-flow.svg",
                alt: "前後流程對照圖：以前 PM 和工程師之間每輪來回交接 4 次；現在 PM 自己下載、修改、上傳、檢查，交接 0 次",
                caption:
                  "以前每輪交接 4 次，現在 PM 自己跑完。",
                width: 1480,
                height: 760,
              },
              moreFigures: [
                {
                  src: "/portfolio-artifacts/internal-backend-timeseries.webp",
                  alt: "時序圖：4 台冰水主機 3.5 天的耗電曲線，上方標示資料到齊率 98.5%",
                  caption:
                    "上傳後直接看數值與資料到齊率。",
                  width: 1536,
                  height: 936,
                },
              ],
            },
            {
              id: "data-collection",
              trait: "設備資料回傳管理",
              heading: "先定義什麼叫資料到齊，再讓 PM 自己判斷",
              stat: {
                value: "244 → 12",
                label: "張缺資料提醒（同原因的合併後）",
              },
              paragraphs: ["以前問題常到做報告才發現。我先定義什麼叫到齊：缺不到 5% 才算；再把提醒從「幾條規則」改成「幾台設備」，每個問題寫出實際值和該交給誰。"],
              figure: {
                src: "/portfolio-artifacts/internal-backend-site-health.webp",
                alt: "收值健康頁：第一行寫出 7 台設備有問題、22 台已檢查，下方列出製冷量、耗電與流量出現負值等問題，每個都標明交給收值工程師",
                caption:
                  "先講結論，再列問題。案場名稱已匿名。",
                width: 1648,
                height: 549,
              },
            },
            {
              id: "customer-view",
              trait: "數據管理",
              heading: "節能成果出來前，先讓決策者看到畫面",
              stat: { value: "1 天", label: "做出第二家潛在客戶的戰情室" },
              paragraphs: ["「要有可以讓院長看到畫面。」一家醫院這樣說。我先做出可操作的戰情室原型，再由 RD 做成正式功能。第二家電子廠改成只要改設定就能換內容，一天做完；所有效益都標「預估」。"],
              figure: {
                src: "/portfolio-artifacts/internal-backend-warroom.webp",
                alt: "節能戰情室示範畫面：依序是即時掌握冰水系統、導入後預估效益、預先排定未來一週、附屬設備自動控制四區，效益都標示預估",
                caption:
                  "示範畫面，數字為模擬，客戶名稱已替換。",
                width: 1632,
                height: 1000,
              },
            },
          ],
          closing:
            "這個後台接上 34 個案場（2026/10）。想聊背後的取捨，歡迎聯絡我。",
        },
      },
      {
        id: "grocery",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 2,
        title: "蔬果電商：重整入庫到出貨",
        homeTitle: "蔬果電商：出貨 300 → 1,000 單／日 (+233%)",
        role: "Senior Project Manager",
        scope: "NT$620 萬｜Web／App｜訂單、倉儲、AWS",
        collaboration: "產品、工程、客戶的營運團隊、倉儲物流與 AWS 團隊",
        impact: "出貨量 300 → 1,000 單／日（+233%）",
        capabilities: {
          used: ["流程盤點找瓶頸", "跨系統協調"],
          grown: ["判斷倉儲的產能瓶頸"],
        },
        ownership: "駐點現場，直接與客戶營運長對接各部門；盤點入庫到出貨流程，重新設計出貨模式、出貨單、儲位與揀貨流程；協調前後台、App 與 AWS 重構。",
        situation:
          "疫情期間訂單暴增，年營收約 NT$2 億的蔬果電商前台、後台與 App 無法支撐營運。",
        bottleneck:
          "把從入庫、揀貨到出貨配送的每一步都盤點過後，確認揀貨站是主要瓶頸；運輸外包，不在這次要解的範圍。",
        decision:
          "先解決揀貨瓶頸：出貨模式從隔日配改為當日配，並重新設計出貨單、儲位與揀貨流程；再沿著同一條流程優化既有網站架構，分階段重構前台、後台、App 與 AWS。",
        decisionSummary: "先改出貨模式、出貨單與儲位，解開揀貨瓶頸，再分階段重構系統。",
        hypothesis:
          "產品、工程、倉儲和營運都照同一份優先順序做事，先撐過旺季，再分階段重構系統。",
        result: [
          "出貨量：300 → 1,000 單／日（+233%）",
          "揀貨效率提升 30%（每筆訂單平均出貨時間）",
          "重構期間平台營收成長 120%（團隊成果）",
          "獲 AWS 收錄為案例",
        ],
        artifacts: [
          "專案總覽",
          "訂單資訊流盤點",
          "產業與商品資料分析",
          "測試腳本",
          "專案知識庫",
        ],
        measurement:
          "比較重構前後的每日出貨量；揀貨效率比較導入儲位設計與優化出貨單前後，每筆訂單的平均出貨時間；AWS 數位轉型報導提供公開佐證。營收成長為重構期間的團隊成果。",
        measurementSummary: "每日出貨量：重構前後比較",
      },
      {
        id: "health-app",
        org: "Fable 寓意科技",
        period: "2021/3 - 2022/7",
        rank: 3,
        title: "健康管理 App：重新設計使用者流程",
        homeTitle: "健康管理 App：日活躍使用者一年 +66%（團隊成果）",
        role: "Senior Project Manager",
        scope: "健康管理 App｜使用者流程｜IoT 體重計｜資料遷移｜多國語系",
        collaboration: "客戶的產品團隊、工程、資料遷移、IoT 與在地化夥伴",
        impact: "DAU 12,000 → 20,000（1 年 +66%，團隊成果）",
        capabilities: {
          used: ["使用者訪談", "使用者流程設計", "優先排序", "QA 驗收"],
          grown: ["控管資料遷移的風險", "規劃 IoT 裝置的資料串接"],
        },
        ownership: "主導訪談、競品分析、工作坊、需求聚焦、優先排序與 QA 驗收。",
        situation:
          "年營收約 NT$8 億的健康管理 App 需要重構：使用者黏著度有待提升，分享健康數據不夠方便完整，也增加健康教練的負擔；同時要整合 IoT 體重計、活動報名、多國語系與舊資料。",
        bottleneck:
          "新舊系統的欄位對不上，體重計傳來的資料也沒跟 App 流程對齊；不先處理，舊資料搬不過來，使用者也用不順。",
        decision:
          "先把訪談到的使用情境寫成 Wireframe、User Story 和 PRD，聚焦需求：串接體重計加入上秤打卡提升黏著度，並改善分享流程；開發前先把參數和翻譯對照表做完。",
        decisionSummary:
          "先從訪談聚焦需求，重新設計上秤打卡與分享流程，再處理資料遷移和多國語系的風險。",
        hypothesis:
          "用訪談、競品分析與客戶工作坊排優先順序，再依使用情境設計測試與驗收。",
        result: [
          "新版 App 重新上架並完成資料遷移",
          "健康數據分享更方便完整，減輕健康教練的負擔",
          "DAU：約 12,000 → 20,000（一年 +66%，團隊成果）",
        ],
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
        capabilities: {
          used: ["用目標名單驗證切入點", "跨部門訪談"],
          grown: ["規劃客戶資料怎麼串起來", "埋點規劃"],
        },
        ownership:
          "規劃 CDP、Chatbot、埋點與儀表板；帶產品與資料團隊每兩週對一次進度。",
        situation:
          "Chatbot（LINE、Facebook）、官網、電商與 POS 資料分散，客戶無法辨識同一使用者的來源與消費行為，也難以針對不同客群做行銷。",
        bottleneck:
          "每個通路的資料格式和辨認客戶的方式都不同，要先整理成一致格式再串起來，才拼得出 Customer 360。",
        decision:
          "先用 30 個目標名單和跨部門訪談確認從哪裡切入，再用公司現有的功能拼出 MVP。",
        decisionSummary:
          "先用 30 個目標名單與跨部門訪談驗證切入點，再用現有功能拼出 MVP。",
        hypothesis:
          "每兩週推進一次 CDP、Chatbot、埋點與儀表板需求，和產品與資料團隊對進度。",
        result: [
          "串接 5 個通路",
          "整合零售、電商與不動產共 1,000 萬筆資料",
          "建立 Customer 360 客戶輪廓",
          "讓客戶能針對不同客群做行銷自動化",
        ],
        artifacts: [
          "Product Roadmap",
          "MVP 訪談計畫",
          "客戶資料策略提案",
          "指標知識庫",
          "資料產品 PRD",
        ],
        measurement:
          "依完成整理和串接的資料筆數與通路數計算；1,000 萬筆是零售、電商、不動產三個產業加起來的規模。",
        measurementSummary: "資料規模與通路覆蓋：完成串接後計算",
      },
      {
        id: "sensor-naming",
        org: "台灣愛淨 Ecofirst",
        period: "2026/8 - 2026/10",
        rank: 6,
        title: "點位命名：PM 自己轉成內部格式",
        role: "Senior Product Manager（規劃與實作）",
        scope:
          "34 個案場、7,110 個點位（2026/9）｜資料回傳與模擬分析共用",
        collaboration:
          "專案部 PM、負責收設備資料的工程師、軟體部 RD 與系統整合商",
        impact:
          "點位表製作：1 小時 → 5 分鐘｜抽 72 個點位，93% 一次正確",
        capabilities: {
          used: ["空調現場知識", "命名規則設計"],
          grown: ["評估 AI 準確度", "設計機器沒把握就問人的流程"],
        },
        ownership:
          "我整理點位對照 Excel，定義流程、規則與驗收門檻；用 Claude Code 把對照寫成命名規則，字典改版前一定先補測驗題。",
        situation:
          "每個案場的點位清單（設備上每一個要讀取的數值）由不同廠商提供，每個人命名都不一樣，同一個點有好幾種寫法。",
        bottleneck:
          "一個案場約兩百個點位，肉眼看不完；對錯一個，數據報告就會出問題。",
        decision:
          "把標準名稱和廠商寫法做成對照表，讓 Claude 寫成規則，再做成 PM 可直接用的 AI 工具。",
        decisionSummary:
          "把命名規則做成 AI 工具，PM 上傳點位表就自動轉換。",
        hypothesis:
          "命名規則集中在一個地方，改一次就全部生效；只有現場才知道的事一律問人。",
        result: ["點位表製作：1 小時 → 5 分鐘", "抽 72 個點位實際跑一遍：93% 一次正確", "全案場盤點：34 個案場、7,110 個點位（2026/9）"],
        artifacts: ["點位對照 Excel", "全公司共用的命名程式", "自動測試與題庫"],
        measurement:
          "72 點逐筆檢查取自 2 個真實案場與 1 個示範案例（2026/9/10）；盤點數取自全案場盤點（2026/9/1）；1 小時與 5 分鐘是我的實際經驗。",
        measurementSummary: "製作時間：我的實際經驗；正確率：72 點逐筆檢查",
        article: {
          lead: "同一個點，廠商可能寫成「CH-1 冰水出水溫度」或「CHL01_TCHS」；一個案場約兩百個點位，肉眼看不完。",
          sections: [
            {
              id: "rules",
              trait: "AI 導入",
              heading: "把命名規則寫成 AI 工具",
              stat: {
                value: "1 支",
                label: "命名程式，資料回傳與模擬分析兩條流程共用",
              },
              paragraphs: ["我把標準名稱和廠商可能的寫法整理成對照表，讓 Claude 寫成規則，再做成 PM 可直接使用的 AI 工具。規則集中在一支程式，改一次就全部生效。"],
              figure: {
                src: "/ai-covers/naming-core.svg",
                alt: "示意圖：資料回傳與模擬分析兩條流程都接到中間同一支命名程式，右邊是由人拍板的命名字典",
                caption: "兩條流程共用一支命名程式；字典由兩位維護者拍板。",
                width: 800,
                height: 500,
              },
            },
            {
              id: "self-serve",
              trait: "流程重構",
              heading: "PM 上傳點位表，AI 自動轉換",
              paragraphs: ["PM 拿到新的點位表，上傳後由 AI 依規則轉換，不用再肉眼比對。從名稱推不出來的項目，例如設備台數，一律由人確認。"],
            },
          ],
          closing:
            "想聊聊怎麼在你們的現場資料上做同樣的事，歡迎聯絡我。",
        },
      },
      {
        id: "sales-faq",
        org: "台灣愛淨 Ecofirst",
        period: "2026/4 - 2026/9",
        rank: 7,
        title: "Sales FAQ：業務只拿得到確認過的答案",
        homeTitle: "Sales FAQ：回覆客戶從一天縮短到 10 分鐘",
        role: "Senior Product Manager（流程設計）",
        scope: "會議紀錄整理｜兩道人工關卡｜業務問答入口",
        collaboration: "業務部、業務主管與負責定答案的主管",
        impact:
          "業務回覆客戶：一天 → 10 分鐘｜約 50 題正式答案可直接查",
        capabilities: {
          used: ["審核流程設計", "設計答案的放行規則"],
          grown: ["從數字找出流程真正的瓶頸"],
        },
        ownership:
          "流程、關卡與 AI 的權限都由我設計；排程與問答入口的指令由我撰寫和維護。",
        situation:
          "客戶問過的問題散在 1,500 多份會議紀錄和逐字稿裡，業務找不到，也不確定哪個講法是公司的正式說法。",
        bottleneck:
          "讓 AI 直接回答業務很快，但答錯就是公司對客戶的承諾；價格、保固、補助這類題目，錯一次的代價很高。",
        decision:
          "拆成產出、審核、使用三段：機器只寫草稿，兩道人工關卡定答案，問答入口只放行確認過的答案。",
        decisionSummary:
          "機器寫草稿，兩道人工關卡定答案，入口只放行確認過的答案。",
        hypothesis:
          "挑題是業務判斷，定答案是公司承諾，分給不同的人做。",
        result: ["業務回覆客戶：一天 → 10 分鐘", "業務上手時間變短", "約 50 題正式答案可直接查（AI 整理 185 題，人工確認才開放）"],
        artifacts: ["每週 FAQ 草稿排程", "兩道人工關卡", "只引用確認過答案的問答入口"],
        measurement:
          "題數取自公司 Notion 的 Sales FAQ 資料庫（2026/9/30）；回覆時間是我的實際經驗。不含任何客戶名稱。",
        measurementSummary: "回覆時間：我的實際經驗；題數：Sales FAQ 資料庫（2026/9/30）",
        article: {
          lead: "業務在客戶面前被問到資安、保固或補助，需要一句能直接講的答案，但答案散在 1,500 多份會議紀錄裡。",
          sections: [
            {
              id: "draft",
              trait: "AI 導入",
              heading: "機器只負責整理，不能自己確認",
              paragraphs: ["每週排程讀會議紀錄，挑出客戶真的問過的問題寫成草稿，附上來源；價格、保固、補助類的題目自動標成高敏感。"],
              figure: {
                src: "/ai-covers/faq.svg",
                alt: "示意圖：許多問題經過兩道人工關卡，只剩確認過的答案",
                caption:
                  "機器產生草稿，兩道人工關卡確認答案，問答入口只放行人工確認過的答案。",
                width: 800,
                height: 500,
              },
            },
            {
              id: "gates",
              trait: "流程重構",
              heading: "兩道關卡，分給兩種判斷",
              paragraphs: ["業務主管決定哪些題目值得留，負責人寫下公司的正式說法。"],
            },
            {
              id: "entry",
              trait: "系統與資料",
              heading: "查不到，就說查不到",
              paragraphs: ["業務用自己的話問，AI 只引用確認過的答案；查不到時，指出該找誰，不自己編。"],
              figure: {
                src: "/ai-covers/faq-entry.svg",
                alt: "示意圖：業務提問後拿到附來源的答案，查不到時改指向該找的人",
                caption: "答案附上來源；查不到時指向該找的人，不自己編。",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "想聊聊你們的知識庫怎麼設關卡，歡迎聯絡我。",
        },
      },
      {
        id: "namecard",
        kind: "side",
        org: "個人專案",
        period: "2025/7 - 2026/7",
        rank: 8,
        title: "AI 名片管理助手：架構跟著商業模式走",
        role: "產品負責人兼開發者",
        scope: "LINE 拍名片 → AI 辨識 → 寫進公司 Notion",
        collaboration:
          "使用者是公司業務與幾位朋友；用 Cursor 與 Claude Code 開發，Gemini 辨識名片",
        impact: "2,000 張實體名片記進 Notion CRM｜內部工具與 SaaS 兩種架構都親手做過",
        capabilities: {
          used: ["商業模式規劃", "產品架構"],
          grown: ["用實際用量決定架構該做多大"],
        },
        ownership:
          "商業模式和產品架構都由我規劃，也親手做出來：從內部工具、多租戶 SaaS（多家公司共用一套系統），到依實際用量退回精簡版本。",
        situation:
          "業務拿到名片要人工輸入公司 Notion，資料不齊，主管很難追客戶進度，看不出窗口有沒有決策權，也很難算業務的 KPI。",
        bottleneck:
          "名片只有姓名電話，CRM 要的判斷欄位得靠人。讓 AI 填，等於替業務下判斷。",
        decision:
          "先做成欄位對應公司 CRM 的內部工具，判斷欄位留給業務；再驗證能不能做成 SaaS，設計多租戶與訂閱方案；用量證明不需要，就退回精簡架構。",
        decisionSummary: "先想清楚商業模式，架構跟著商業模式走。",
        hypothesis:
          "以前 PM 只能寫規格、等工程排程；現在我能把不同商業模式直接做成可運作的架構，用真實用量決定留哪一個。",
        result: [
          "業務拍照就能建檔",
          "主管在 Notion 就能追客戶",
          "SaaS 版本拿真實用量測試過，用量證明還不需要，所以退回精簡架構",
        ],
        artifacts: [
          "LINE 名片 Bot",
          "公司 CRM 欄位對照",
          "多租戶與訂閱方案後台",
          "架構盤點報告",
          "精簡後的單一服務架構",
        ],
        measurement:
          "名片數取自 Notion CRM。另有開發紀錄佐證：欄位對齊（2025/8）、判斷改由業務填（2025/9）、架構盤點（2026/7）。",
        measurementSummary: "名片數：Notion CRM",
      },
      {
        id: "life-hub",
        kind: "side",
        org: "個人專案",
        period: "2026/3 - 2026/10",
        rank: 10,
        title: "生活中控台：帳單和提醒，一個地方管",
        role: "產品負責人兼開發者",
        scope: "信箱帳單整理｜繳費與到期提醒｜口語記錄與查詢｜個人儀表板",
        collaboration: "獨立開發，與 Claude Code 協作；每個功能先寫規格再實作",
        impact: "每天在用，從 2026/3 用到現在｜不登入網路銀行",
        capabilities: {
          used: ["資料流程設計", "判斷隱私風險"],
          grown: ["排程自動化", "長期維護"],
        },
        ownership:
          "需求、規則與架構由我決定；程式用 Claude Code 依規格實作，分類規則由我確認後修正。",
        situation:
          "帳單和對帳單以 PDF 寄到信箱，要一份份打開記錄、分類；繳費期限和合約到期散在不同地方，很容易漏掉。",
        bottleneck:
          "現成工具多半要登入網路銀行才能自動抓資料，我不想把銀行帳密交給任何程式。",
        decision:
          "只讀信箱裡的帳單，不登入網路銀行；資料只存在自己的資料庫，所有讀寫都透過同一支指令。",
        decisionSummary: "只讀信箱帳單、不登入網路銀行，資料只存在自己這裡。",
        hypothesis:
          "多數該記的事其實都已經寄到信箱了，只要每天自動讀信、整理、提醒，就不需要碰銀行帳號。",
        result: [
          "自動抓信、分類，標出重複或漏掉的扣款，到期前提醒（排程被擋後，改成開啟 Claude Code 時補抓）",
          "平常說一句話就能記錄或查詢",
          "從 2026/3 用到現在，累積 117 次程式提交，每次修改都有自動測試把關",
        ],
        artifacts: [
          "每日抓信與帳單解析",
          "分類、重複與漏扣偵測",
          "繳費與到期提醒",
          "口語記錄與查詢",
          "個人儀表板",
          "規格與自動測試",
        ],
        dataMap: [
          {
            sources: "信用卡帳單、銀行的入帳與轉帳通知、電子支付紀錄",
            insight:
              "每個月的收入、支出和結餘一頁看完；自己帳戶之間互轉不會重複計算，該出現的定期扣款沒出現也會提醒。",
          },
          {
            sources:
              "券商寄來的成交回報與對帳單、證交所公開的除權息資料、每日收盤價和匯率",
            insight:
              "持股市值自動更新，不必再自己開表格記；買賣股票算成資產轉換，不會被當成花費。",
          },
          {
            sources: "近一年的實際刷卡紀錄、查證過的各卡回饋規則（含有效期限）",
            insight:
              "算出每筆定期扣款綁哪張卡回饋最多；海外消費會先扣掉國外交易手續費再比，過期或沒查證的規則不列入。",
          },
          {
            sources: "薪資、利息、股利，加上當年度的所得稅與二代健保規定",
            insight:
              "試算明年要繳多少所得稅，並提醒利息有沒有超過儲蓄投資特別扣除額、哪一筆股利會被扣二代健保補充保費。",
          },
          {
            sources: "利息、股利、配息紀錄，加上近 12 個月的平均生活費",
            insight:
              "依目前的持股推估一年會有多少被動收入、各在哪幾個月入帳，以及這筆錢能支付幾成的生活開銷。",
          },
        ],
        measurement:
          "提交數取自個人 git 紀錄（2026/10/23）。為保護隱私，不放截圖、程式碼連結，也不寫任何金額或筆數。",
        measurementSummary: "個人 git 紀錄（2026/10）",
        article: {
          lead: "每個月的帳單都會寄到信箱，但要一份份打開、記下來、分好類，還要記得哪天要繳、哪份合約快到期。事情不難，只是瑣碎到很容易漏。",
          sections: [
            {
              id: "rule",
              trait: "商業判斷",
              heading: "先定一條規則：不登入網路銀行",
              paragraphs: [
                "很多理財工具靠登入網路銀行抓資料。我評估過一套開源專案，系統架設的方式做得很好，但它也是用瀏覽器自動登入網路銀行，所以我只參考它的架設方式。資料來源只限信箱裡的帳單。",
              ],
            },
            {
              id: "pipeline",
              trait: "系統與資料",
              heading: "一條路徑：信件、帳單、資料庫、儀表板",
              paragraphs: [
                "自動讀信、解析帳單 PDF、整理分類，寫進同一個資料庫；系統會標出自己帳戶之間的互轉和重複的交易，定期扣款沒出現也會提醒。所有指令都能輸出成程式讀得懂的格式，方便再接其他工具。",
              ],
              figure: {
                src: "/ai-covers/life-pipeline.svg",
                alt: "示意圖：信件變成解析好的單據，寫進資料庫，再呈現在儀表板上",
                caption:
                  "信件 → 帳單解析 → 資料庫 → 儀表板，全程不碰銀行帳號。",
                width: 800,
                height: 500,
              },
            },
            {
              id: "roles",
              trait: "AI 導入",
              heading: "九個角色，事情真的相關才一起動",
              paragraphs: [
                "我讓 Claude 依話題切換成記帳、保健、法律、管家等九個角色，但規定只有事情真的互相影響時才連動：看醫生要同時記帳、記健康紀錄、查能不能理賠；買午餐就只記帳，不浪費力氣分析其他事。",
              ],
              figure: {
                src: "/ai-covers/life-roles.svg",
                alt: "示意圖：九個角色排成一圈，只有被同一件事牽動的三個亮起並連線",
                caption: "九個角色排成一圈；一件事只牽動真正相關的角色。",
                width: 800,
                height: 500,
              },
            },
            {
              id: "catchup",
              trait: "成效驗證",
              heading: "排程被擋住，就改成補抓",
              paragraphs: [
                "2026/5 底，系統權限開始擋住每天的自動抓信，紀錄裡全是失敗。我沒有關掉權限檢查硬跑，改成每次開啟 Claude Code 時自動補抓；下一步打算搬上雲端排程，連電腦都不用開。",
              ],
              figure: {
                src: "/ai-covers/life-catchup.svg",
                alt: "示意圖：被擋下的排程時鐘，旁邊是一個成功補抓的終端機視窗",
                caption: "排程失敗時不硬跑，改在下次開工時補抓。",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "這個專案沒有使用者成長曲線，只有一個每天都在用的人。我在這裡反覆練的是先定規則，再讓 AI 去做。",
        },
      },
      {
        id: "resume-site",
        kind: "side",
        org: "個人專案",
        period: "2026/9 - 2026/11",
        rank: 11,
        title: "履歷網站：把求職當產品做",
        role: "產品負責人兼開發者",
        scope: "中英文網站｜開場影片｜動畫牆｜列印版履歷｜自動部署",
        collaboration: "獨立開發，與 Claude Code 協作；重要變更先寫規格再實作",
        impact: "7 週、超過 90 次程式提交｜程式更新後自動部署到 Cloudflare",
        capabilities: {
          used: ["定位與資訊架構", "查核內容與數字"],
          grown: ["用程式做動畫和動畫牆", "Cloudflare 自動部署"],
        },
        ownership:
          "定位、內容取捨、版面和驗收標準由我決定；程式用 Claude Code 依規格實作，每個數字由我確認出處。",
        situation:
          "我有 8 段經歷和一批案例，但履歷只放得下結論。用人主管想知道的是我怎麼判斷、做出了什麼，這些在一份文件裡看不到。",
        bottleneck:
          "東西越加越多：同一批案例有好幾個入口，自己當用人主管也看不下去；數字散在不同檔案，一改就矛盾。",
        decision:
          "把網站當產品持續改：定位不對就重做，內容太滿就刪；撤下的說法寫進上線前的測試，避免再跑回網站。",
        decisionSummary:
          "把網站當產品持續改：定位不對就重做，內容太滿就刪，撤下的說法用測試擋住。",
        hypothesis:
          "讀者會當場用到這個網站，所以它本身就是作品：動畫、效能和內容一致性，都在示範我怎麼做產品。",
        result: [
          "7 週內完成超過 90 次程式提交",
          "中英文各一版，含開場影片、動畫牆和可列印的履歷",
          "程式更新後自動部署到 Cloudflare Workers",
          "定位改過數次，git 紀錄都留著：從證據導向、AI builder、營運 PM 到現在的平台重構與內部系統",
        ],
        artifacts: [
          "用 HyperFrames 從 HTML 產生的中英文開場影片",
          "只用 CSS 的 3D 動畫牆，每格連到對應案例",
          "Cloudflare Workers 自動部署，設定放在 repo",
          "上線前檢查建置結果的測試，抓出撤下的說法",
          "中英文內容與可列印的履歷頁",
        ],
        measurement:
          "提交數與日期取自這個網站的 git 紀錄（2026/9/14～2026/11/3）。這些數字代表投入，不代表求職成效；專屬連結後台目前沒有接上主機，不列為成果。",
        measurementSummary: "這個網站的 git 紀錄（2026/11）",
      },
    ],
  },

  experience: {
    title: "經歷",
    intro: "",
    currentLabel: "現在",
    expandLabel: "看工作內容",
    collapseLabel: "收合工作內容",
    expandAllLabel: "全部展開",
    collapseAllLabel: "全部收合",
    items: [
      {
        id: "ecofirst",
        org: "台灣愛淨節能科技股份有限公司 Ecofirst",
        role: "Senior Product Manager",
        period: "2025/3 - 2026/10",
        focus: "AI 節能產品、內部工具與跨團隊交付",
        homeHighlight: "客戶導入從約 2 週縮短到約 2 小時，客製占比從 30% 降到 10%",
        summary:
          "負責 B2B AI 空調節能產品、Roadmap 與內部後台，帶領 4 位工程師，合約總額約 NT$1 億，客戶平均節能率約 15%。",
        bullets: [
          "單一案場客製占比從 30% 降到 10%，換算每年約省下 370 小時（估算）：把重複需求抽象成控制策略，再寫成文件並參數化",
          "單一案場異常處理從 30 分鐘縮短到 3 分鐘：寫好判斷規則，2 位 PM 監看的 34 個案場，異常集中在同一頁",
          "點位表製作從 1 小時縮短到 5 分鐘，抽測 93% 一次正確：釐清命名規則後做成 AI 工具，PM 上傳點位表就自動轉換，不用再肉眼比對",
          "客戶導入從約 2 週縮短到約 2 小時：用 Claude Code 開發內部後台（748 次提交），PM 不用再等工程師（不含現場接線與控制策略）",
          "業務回覆客戶從一天縮短到 10 分鐘：錄下全部會議，收斂常見約 50 題做成 AI Q&A bot，業務也更快上手",
          "控制策略調整從 1 週縮短到 2 小時：用 AI 開發模擬工具，一次試算 10 萬種以上組合",
          "親手打造 AI 名片 LINE bot，2,000 張實體名片改記進 Notion CRM：業務在 LINE 拍照，AI 辨識後自動寫入，不用再手動建檔",
        ],
        bulletGroups: [{ label: "降本：客製占比從 30% 降到 10%，異常處理與點位製作時間減少 90% 以上", count: 3 }, { label: "增效：客戶導入從約 2 週縮短到約 2 小時，回覆客戶從一天縮短到 10 分鐘", count: 4 }],
      },
      {
        id: "advisory",
        org: "個人接案",
        role: "Independent Consultant｜營運數位轉型與募資",
        period: "2024/9 - 2025/2",
        focus: "能源與旅宿業的營運改造與募資",
        homeHighlight: "2 個募資案、約 NT$1.7 億進入盡職調查（DD）",
        summary: "",
        bullets: [
          "2 個募資案、約 NT$1.7 億進入盡職調查（DD）階段：協助能源與旅宿業準備募資，從梳理商業模式、輔導募資簡報到建置 DD room",
          "分析 106 間 Airbnb：找出住房率 90%（台北平均 65%）的房型，作為 2 棟旅館的定位依據",
          "為能源業客戶盤點 3 個部門的流程並導入 Asana",
        ],
      },
      {
        id: "sat",
        org: "知識衛星 SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        focus: "企業培訓、線上學習與香港市場驗證",
        homeHighlight: "首週營業額突破 NT$100 萬，3 週內進入香港市場",
        summary: "",
        bullets: [
          "首週營業額突破 NT$100 萬：3 週內進入香港市場",
          "盤點並重新規劃人資請假補休、請款與客服流程",
          "訪談不同規模企業的人資，釐清培訓實際運作方式，規劃學習數據儀表板",
        ],
      },
      {
        id: "consulting",
        org: "個人接案",
        role: "Independent Consultant｜產品與專案管理流程",
        period: "2023/6 - 2023/11",
        focus: "專案管理流程、產品管理流程與內部工作坊",
        summary: "",
        bullets: [
          "專案管理效率提升約 20%（估算）：PM 原本各用各的管理工具，難以向老闆回報進度；為 15 人外包團隊導入 Notion，進度都在同一個地方回報",
          "為跨國包租代管 SaaS 公司梳理產品管理流程：從商業目標、產品 Roadmap 到日常需求與交付，並舉辦內部工作坊優化流程",
        ],
      },
      {
        id: "huayao",
        org: "華曜興業有限公司",
        role: "Senior Operations Manager",
        period: "2022/11 - 2023/5",
        focus: "供應鏈與倉儲流程優化",
        summary: "",
        gapAfter: "2022/8 - 2022/10｜休息與接案",
        bullets: [
          "建立產品資料庫，整合客戶、出貨與採購資訊；重新設計倉儲儲位與產品分類",
        ],
      },
      {
        id: "fable",
        org: "Fable 寓意科技",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        focus: "電商與健康管理 App 重構、跨職能團隊交付",
        homeHighlight: "蔬果電商出貨 300 → 1,000 單／日 (+233%)，獲 PMI 標竿專案獎優選",
        summary:
          "管理超過 NT$1,200 萬的客戶專案組合，帶領 10 位工程師執行專案，直屬管理 2 位初階 PM，獲 2022 PMI 標竿專案獎優選。",
        bullets: [
          "蔬果電商每日出貨量從 300 單提升到 1,000 單（+233%）：駐點現場梳理入庫到出貨流程，讓各部門照同一份優先順序，先撐過旺季再分階段重構；獲 AWS 收錄為案例",
          "揀貨效率提升 30%（以每筆訂單平均出貨時間計）：出貨模式從隔日配改為當日配，並重新設計出貨單、儲位與揀貨流程",
          "健康管理 App 日活躍使用者從 12,000 成長到 20,000（一年 +66%，團隊成果）：從使用者訪談重新設計流程，串接 IoT 體重計加入上秤打卡",
        ],
      },
      {
        id: "oakda",
        org: "歐可達數據科技有限公司",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        focus: "跨通路客戶資料平台、聊天機器人與儀表板",
        homeHighlight: "帶領 12 人團隊上線 CDP，整合 1,000 萬筆客戶資料",
        summary: "",
        bullets: [
          "整合 3 個產業、1,000 萬筆客戶資料：帶領 12 人團隊規劃並上線 CDP，串接 5 個通路，讓客戶能分群做行銷自動化",
        ],
      },
      {
        id: "zhongshuo",
        org: "眾碩投資諮詢顧問股份有限公司",
        role: "Product Assistant",
        period: "2019/2 - 2020/6",
        focus: "市場研究、原型設計與早期產品驗證",
        summary: "",
        bullets: [
          "參與孵化的 2 家公司營收皆突破 NT$100 萬：分析商業模式與競品，找出新的成長方向，並規劃如何運用既有資源降低風險",
        ],
      },
    ],
  },

  contact: {
    kicker: "找出痛點，做出解法，量出成果。",
    title: "聊聊下一個產品機會。",
    text: "團隊卡在交付或跨部門流程、想讓 AI 真正進到日常工作，來聊聊。",
    cta: { label: "寫信給我", href: "mailto:kevin492625@gmail.com" },
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/chengze-hsu/",
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
    hypothesis: "改出貨模式、出貨單與儲位\n再重構前台、後台、App 與 AWS",
    throughputLabel: "300 → 1,000 單／日",
    captions: [
      "訂單堆在揀貨環節，每日只能處理 300 單。",
      "改出貨模式、出貨單與儲位，再重構前台、後台、App 與 AWS。",
      "日處理 1,000 單，平台營收成長 120%（團隊成果）。",
    ],
    replay: "重播",
    ariaLabel:
      "動畫示意圖：訂單流經接單、揀貨、包裝、出貨四個環節，揀貨出現瓶頸，調整出貨模式、出貨單與儲位並重構系統後，每日處理量從 300 單提升到 1,000 單。",
  },
} satisfies SiteContent;
