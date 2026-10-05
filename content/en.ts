import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | Product Manager | Find the bottleneck, build the fix, prove it",
    description:
      "Product Manager with 5+ years of product-related experience. Led B2C e-commerce re-platforming, led discovery and QA for a health-app re-platforming, and owned cross-functional delivery and data-product planning; led a 10-person engineering team and two junior PMs.",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "Portfolio", href: "/en/portfolio/" },
      { label: "AI builds", href: "#linkedin-posts" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    switchLabel: "中文",
    switchAria: "切換到中文",
    skipLabel: "Skip to main content",
  },

  hero: {
    eyebrow: "Kevin Hsu | Product Manager · 5+ years in product",
    kicker: "The spec is written. The meeting is over. Nothing runs yet?",
    headline: "Find the 【bottleneck】. Build the 【fix】. Prove it in 【numbers】.",
    traits: [
      {
        label: "Curious",
        text: "New tool? I try it hands-on first.",
        proof: "Built an AI business-card assistant with Cursor and Gemini",
      },
      {
        label: "Experimental",
        text: "Limited coding background; built an internal platform anyway.",
        proof: "218 commits in 2 months with Claude Code",
      },
      {
        label: "Efficient",
        text: "Control-strategy tuning",
        shift: { from: "1 week", to: "2 hours" },
        proof: "AI in the delivery workflow: delivery efficiency +50%",
      },
    ],
    profile: [
      {
        label: "Positioning",
        value:
          "Product Manager · B2C re-platforming, cross-functional delivery, and AI workflows",
      },
      {
        label: "Domains",
        value:
          "AI energy savings (B2B), B2C e-commerce, health apps, enterprise learning, and cross-channel customer-data platforms",
      },
      {
        label: "Looking for",
        value: "Global B2C platforms and growth-stage product teams",
      },
    ],
    film: {
      caption: "AI energy-saving HVAC: delivery efficiency +50%",
      caseId: "ecofirst",
      pauseLabel: "Pause film",
      playLabel: "Play film",
      seekLabel: "Film progress",
      chapters: [{ at: 0, label: "Intro" }, { at: 12, label: "Six skills" }, { at: 35.4, label: "Three habits" }, { at: 50, label: "Sign-off" }],
      summary:
        "60-second film. The spec is written, the meeting is over, and nothing runs yet. For a PM in the AI era, building something is no longer the bar. The bar is six skills: problem framing, fast experiments, prototyping, workflow redesign, cross-team delivery, and data judgment; each role widened that chart. Then three working habits. Curious: when a new tool appears, I try it hands-on, from Claude Code and Cursor to Gemini and Notion AI. I built an AI business-card assistant with Cursor and Gemini, through failed OCR and a rebuilt Git setup to deployment: snap a card, Gemini reads it, Notion files it. Experimental: with limited coding background, I built an internal platform with Claude Code, 218 commits in 2 months. Efficient: a control-strategy simulator cut tuning from 1 week to 2 hours, and putting AI into the delivery workflow raised delivery efficiency by 50%. Find the bottleneck. Build the fix. Prove it in numbers. Kevin Hsu, Product Manager · AI · B2C platforms · cross-team delivery.",
    },
    builderLoop: {
      label: "From fieldwork to product",
      steps: [
        "Map the flow",
        "Find the constraint",
        "Form a hypothesis",
        "Build a tool",
        "Check impact",
      ],
      result: "Ecofirst: delivery efficiency +50%, site-ops efficiency +20%",
    },
    primaryCta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "See portfolio", href: "/en/portfolio/" },
  },

  metrics: {
    title: "Results from the work",
    items: [
      {
        prefix: "+",
        value: 50,
        featured: true,
        suffix: "%",
        label: "Ecofirst product delivery efficiency",
        detail: "AI from specs to dev handoff; delivery cycle, before vs after",
      },
      {
        value: 1000,
        featured: true,
        suffix: " orders/day",
        label: "Fresh-produce picking capacity",
        detail: "After AWS re-platforming: 300 → 1,000 orders/day (+233%)",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "Platform revenue growth during re-platforming",
        detail: "Team outcome; client annual revenue about NT$200M",
      },
      {
        prefix: "+",
        value: 66,
        featured: true,
        suffix: "%",
        label: "Health app daily active users",
        detail: "Within a year of launch: DAU 12,000 → 20,000",
      },
      {
        value: 10,
        suffix: "M records",
        label: "Cross-industry customer-data integration",
        detail: "Connected online e-commerce and offline POS data",
      },
      {
        prefix: "NT$",
        value: 12,
        suffix: "M+",
        label: "B2C project portfolio managed",
        detail: "At Fable, leading 10 engineers and 2 junior PMs",
      },
    ],
  },

  linkedinPosts: {
    title: "Three habits, four builds",
    intro:
      "When something is stuck, I try a different AI tool hands-on until the team can use the result.",
    author: "Kevin Hsu",
    platform: "LinkedIn",
    readLabel: "Read the build note",
    items: [
      {
        trait: "Experimental",
        stat: "218",
        statLabel: "commits in 2 months",
        title: "An internal platform built with Claude Code",
        description:
          "Started from an API integration and turned site-data lookups into a tool, improving it while using it.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
        image: {
          src: "/portfolio-artifacts/ecofirst-hvac-platform.webp",
          alt: "Site data lookup tool interface",
          width: 1208,
          height: 1236,
        },
      },
      {
        trait: "Curious",
        stat: "0 → 1",
        statLabel: "built it myself",
        title: "An AI business-card assistant that feeds the CRM",
        description:
          "Fields match the company Notion CRM, so a scanned card becomes an account record and reps add only the judgment.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
        image: {
          src: "/linkedin-posts/post-2.jpg",
          alt: "AI business-card assistant workflow illustration",
          width: 800,
          height: 446,
        },
      },
      {
        trait: "Efficient",
        stat: "1 wk → 2 hr",
        statLabel: "control-strategy tuning",
        title: "Control-strategy simulator",
        description:
          "Built a simulator that tests 100,000+ control combinations, replacing manual one-at-a-time tuning.",
        image: {
          src: "/portfolio-wall/film-7.webp",
          alt: "Control-strategy tuning cut from 1 week to 2 hours",
          width: 1600,
          height: 1000,
        },
      },
      {
        trait: "Efficient",
        stat: "+50%",
        statLabel: "product delivery efficiency",
        title: "Automating product management with Claude",
        description:
          "Meetings, proposals, requirements, specs, and mock-data checks: AI drafts, I make the calls. A 5 pm job turns the day's meetings into follow-ups, 102 reports so far.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
        image: {
          src: "/linkedin-posts/ai-product-workflow.en.svg",
          alt: "Product workflow diagram: meeting follow-up, proposal draft, discovery, spec, mock-data check, and hand-off, each automated with Claude; product delivery efficiency +50%",
          width: 1200,
          height: 750,
        },
      },
    ],
  },

  awards: {
    title: "Awards & case features",
    items: [
      {
        id: "pmi",
        kind: "award",
        category: "Award",
        year: "2022",
        title: "PMI Taiwan Project Management Benchmark Award",
        distinction: "Excellence Award",
        description:
          "Project work at Fable, spanning process mapping, system re-platforming, and cross-team delivery.",
        link: { label: "See the experience", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "Case feature",
        caseId: "grocery",
        title: "AWS digital transformation case",
        distinction: "Fresh-produce commerce",
        description:
          "Led the e-commerce rebuild and AWS migration at Fable; AWS featured it as a digital-transformation case on The News Lens.",
        link: {
          label: "Read the article (Chinese)",
          href: "https://www.thenewslens.com/feature/aws/250301",
        },
      },
    ],
  },

  method: {
    title: "From a field problem to a usable product",
    steps: [
      {
        verb: "Map the flow",
        text: "Start in the work itself, with users, operations, and the delivery team, until the actual constraint is clear.",
      },
      {
        verb: "Find the constraint",
        text: "Use process mapping, data, and frontline feedback to identify the constraint worth solving first.",
      },
      {
        verb: "Form a hypothesis",
        text: "Turn the problem into a testable product hypothesis and make explicit what to build first and what to defer.",
      },
      {
        verb: "Build and validate",
        text: "Ship tools and products with engineering, design, and operations, then validate impact through speed, errors, and adoption.",
      },
    ],
    capabilitiesTitle: "Core capabilities",
    capabilities: [
      {
        name: "Faster delivery with AI",
        text: "Bring AI into requirements, specs, mock-data checks, and dev handoff, so ideas become something the team can use sooner.",
      },
      {
        name: "From product planning to building",
        text: "Go beyond a roadmap: turn high-frequency internal needs into tools that software, project, and sales partners can use directly.",
      },
      {
        name: "Digital tools for operational constraints",
        text: "Understand where the work is stuck and what it costs, then intervene with workflow, data, or tools and validate through efficiency, errors, and adoption.",
      },
    ],
  },

  cases: {
    title: "Selected case studies",
    intro: "Six cases, one structure: problem, decision, what got built, result.",
    copyLabel: "Copy case link",
    copiedLabel: "Link copied",
    copyFallback: "Select and copy the link below.",
    linkLabel: "Open case link",
    backLabel: "Back to portfolio",
    filmLabel: "Watch the workflow",
    readLabel: "View case details",
    roleLabel: "Role",
    scopeLabel: "Scope",
    collaborationLabel: "Collaboration",
    artifactsLabel: "Deliverables",
    measurementLabel: "How it was measured",
    ownershipLabel: "What I drove",
    sideTitle: "After hours: vibe coding fixes for real problems",
    sideIntro:
      "Problems at work and in my own life, turned into products with AI after hours.",
    sourceLabel: "View public source",
    columns: {
      situation: "Situation",
      bottleneck: "Bottleneck",
      decision: "Decision",
      hypothesis: "Execution",
      result: "Result",
    },
    items: [
      {
        id: "grocery",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 1,
        title: "Fresh-produce commerce, rebuilt",
        role: "Senior Project Manager",
        scope: "NT$6.2M | Web/app | Orders, warehouse, AWS",
        collaboration:
          "Product, engineering, client operations, warehouse logistics, and AWS teams",
        impact: "Picking capacity: 300 → 1,000 orders/day (+233%)",
        ownership:
          "Mapped order-to-delivery; aligned storefront, back office, app, and AWS re-platforming.",
        situation:
          "Pandemic demand overwhelmed the storefront, back office, and app of a fresh-produce business with about NT$200M in annual revenue.",
        bottleneck:
          "End-to-end mapping identified picking and transport capacity as the primary constraints.",
        decision:
          "Fixed picking and transport capacity first, then rebuilt the storefront, back office, app, and AWS around the order-to-delivery flow.",
        decisionSummary:
          "Removed warehouse and transport constraints first, then rebuilt the storefront, back office, and AWS stack together.",
        hypothesis:
          "Used one priority sequence across product, engineering, warehouse, and operations to phase peak-season fixes and re-platforming.",
        result:
          "Picking capacity rose from 300 → 1,000 orders/day (+233%). Platform revenue grew 120% during the program, and AWS later featured the project.",
        artifacts: [
          "Project overview",
          "Order-flow map",
          "Industry and product analysis",
          "QA scripts",
          "Project knowledge base",
        ],
        measurement:
          "Compared daily picking capacity before and after the rebuild. The AWS digital-transformation feature provides public evidence; revenue growth was a team outcome during the program.",
        measurementSummary: "Daily picking capacity: before vs after",
      },
      {
        id: "health-app",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 3,
        title: "Health app and IoT integration",
        role: "Senior Project Manager",
        scope: "Health app | IoT scales | Data migration | Localization",
        collaboration:
          "Client product, engineering, data migration, IoT, and localization partners",
        impact: "DAU: 12,000 → 20,000 in one year (+66%)",
        ownership:
          "Led interviews, competitor analysis, workshops, prioritization, and QA acceptance.",
        situation:
          "A health app with about NT$800M in annual revenue needed re-platforming, IoT scales, event registration, localization, and legacy-data migration.",
        bottleneck:
          "Legacy fields, IoT data, and new feature flows were inconsistent, blocking safe migration and use.",
        decision:
          "Turned interview scenarios into wireframes, user stories, and PRDs; aligned parameter and translation tables before development.",
        decisionSummary:
          "Specified real user situations first, then reduced migration and localization risk.",
        hypothesis:
          "Used interviews, competitor research, and client workshops to prioritize work, then designed QA around real use cases.",
        result:
          "Launched the new platform and completed migration. DAU grew from about 12,000 to 20,000 within one year (+66%).",
        artifacts: [
          "User interviews",
          "Wireframes",
          "User stories",
          "PRDs",
          "Parameter and translation tables",
        ],
        measurement:
          "Compared daily active users at launch and one year later. Growth from 12,000 to 20,000 was an overall product and team outcome.",
        measurementSummary: "DAU: launch vs one year later",
      },
      {
        id: "cdp",
        org: "Oakda (歐可達數據科技有限公司)",
        period: "Jun 2020 - Dec 2020",
        rank: 4,
        title: "Connecting customer data",
        role: "Product Manager",
        scope: "CDP | Chatbots | Web tracking | Dashboards | POS",
        collaboration: "UX, sales, marketing, product, and data teams",
        impact: "3 industries × 5 channels | 10M records integrated",
        ownership:
          "Planned the CDP, chatbots, tracking, and dashboards; led biweekly product-data delivery.",
        situation:
          "LINE, Facebook, website, e-commerce, and POS data were fragmented, hiding each customer's source and purchase behavior.",
        bottleneck:
          "Channel formats and identity rules differed; the data needed structuring and matching before it could form Customer 360 views.",
        decision:
          "Validated the entry point through 30 target accounts and cross-functional interviews, then adapted existing capabilities into an MVP.",
        decisionSummary:
          "Tested the entry point with 30 target accounts and cross-functional interviews before converging on the MVP.",
        hypothesis:
          "Used a biweekly cadence to align product and data delivery across the CDP, chatbots, tracking, and dashboards.",
        result:
          "Connected five channels and integrated 10M records across retail, e-commerce, and real estate into Customer 360 views.",
        artifacts: [
          "Product roadmap",
          "MVP interview plan",
          "Customer-data strategy",
          "Metrics knowledge base",
          "Data-product PRDs",
        ],
        measurement:
          "Measured structured and connected records plus channel coverage; 10M records is the cross-industry integration scale.",
        measurementSummary:
          "Record volume and channel coverage after integration",
      },
      {
        id: "ecofirst",
        org: "Ecofirst (台灣愛淨)",
        period: "Mar 2025 - Present",
        rank: 2,
        title: "AI energy product: sales to RD on one line",
        role: "Product Manager",
        scope:
          "4 engineers | 50 sites | About NT$100M in projects | Roadmap, AI development, internal tools",
        collaboration: "Software, project, sales, and site-operations teams",
        impact: "Delivery efficiency +50% | Site-ops efficiency +20%",
        ownership:
          "Designed the Notion operating system from sales to RD, the requirements flow, and the AI development workflow.",
        situation:
          "The AI HVAC product was early, and site information lived in LINE, email, and personal laptops; sales asked about timelines and RD asked about requirements by chasing people.",
        bottleneck:
          "Sales promised delivery dates from a capacity sheet, requirements reached development half written, and nobody could say who caused a rush job or a delay.",
        decision:
          "Link cards, accounts, projects, and sales updates in Notion to software projects and the requirements queue; delivery dates start when data is complete and the requirements doc is signed, and nothing is scheduled before it is written.",
        decisionSummary:
          "One data chain from sales to RD; delivery dates start at requirements sign-off.",
        hypothesis:
          "Recording the PM's wanted date apart from RD's estimate lets the system flag rush jobs; AI sits on the flow to handle meetings, requirements, and specs.",
        result:
          "AI across requirements, specs, and dev handoff raised delivery efficiency by 50%, and site operations by 20%. The system holds 1,639 sales updates and 1,829 RD tasks, and 59 delivery projects link to software projects.",
        artifacts: [
          "Sales-to-RD Notion data model",
          "Pre-sales sizing and gates",
          "Requirements queue with rush-job flags",
          "Internal data platform (218 commits in 2 months)",
          "Control-strategy simulator",
          "Standard operating procedures",
        ],
        measurement:
          "Efficiency compares delivery cycle and site operating time before and after; database counts come from the company Notion (Oct 2026), with no client names or amounts.",
        measurementSummary:
          "Delivery cycle and site operating time: before vs after",
      },
      {
        id: "namecard",
        kind: "side",
        org: "Side project",
        period: "Jul 2025 - Jul 2026",
        rank: 5,
        title: "AI business-card assistant: architecture follows the business model",
        role: "Product owner and builder",
        scope: "Snap a card in LINE → AI reads it → it lands in the company Notion",
        collaboration: "Used by the sales team and a few friends; built with Cursor and Claude Code, with Gemini reading the cards",
        impact: "Photo-to-record time −99% | Built both an internal tool and a SaaS",
        ownership:
          "I planned the business models and the product architecture, and built each one: an internal tool, a multi-tenant SaaS, then a lean version sized to real usage.",
        situation:
          "Sales reps typed business cards into the company Notion by hand, so records were patchy and managers could not track accounts, decision influence, or contact KPIs.",
        bottleneck:
          "A card shows name and phone; the CRM needs judgment calls. Letting AI fill them means a model judges for the rep.",
        decision:
          "Start as an internal tool matched to the company CRM, with judgment fields left to sales; then test it as a SaaS with multi-tenancy and subscription plans; when usage showed no need, fold back to a lean architecture.",
        decisionSummary: "Settle the business model first; the architecture follows it.",
        hypothesis:
          "PMs used to write specs and wait for engineering; now I can turn each business model into a working architecture and let real usage pick the one to keep.",
        result:
          "Reps add a contact with a photo, and managers track accounts in Notion. The SaaS bet was tested against real usage before folding it back.",
        artifacts: [
          "LINE business-card assistant",
          "Company CRM field map",
          "Multi-tenant admin with subscription plans",
          "Infrastructure audit report",
          "Single-service architecture after the cut",
        ],
        measurement:
          "Photo-to-record time, comparing manual entry with a photo. The build history backs the rest: field mapping (Aug 2025), judgment handed to sales (Sep 2025), audit (Jul 2026).",
        measurementSummary: "Photo-to-record time: manual entry vs a photo",
      },
      {
        id: "podcast-stock",
        kind: "side",
        org: "Side project",
        period: "Jun 2026 - Sep 2026",
        rank: 6,
        title: "Stock Gods Fight: bull vs bear before you buy",
        role: "Product owner (solo build)",
        scope: "Web product | AI claim extraction | Bull vs bear view",
        collaboration: "Built solo with Claude Code; every feature merged through a reviewed PR",
        impact: "One stock, bull and bear cases side by side, every line quoted",
        ownership: "Problem definition, scope, and trust rules.",
        situation:
          "Before buying a stock I want to know what finance podcasters think, but I have no time to listen, and summaries never say who is bullish or bearish.",
        bottleneck:
          "AI-extracted claims could not be checked: in 90 real claims, 86% of strength scores sat between 0.6 and 0.9, so the score said nothing.",
        decision:
          "No majority vote, bulls and bears side by side; every argument traces to a verbatim quote; arguments only, never a buy or sell call.",
        decisionSummary: "Bulls and bears side by side, every line quoted, no buy or sell calls.",
        hypothesis:
          "I need the arguments on one stock side by side, not a summary; the call stays mine.",
        result:
          "424 commits and 59 PRs, live. Claims that miss the transcript are not scored; thin evidence means abstain.",
        artifacts: [
          "Product specs (OpenSpec)",
          "Claim-extraction evals",
          "Backtest anti-leakage rules",
          "Bull vs bear debate design doc",
          "Public GitHub repo",
        ],
        measurement:
          "Score spread from 90 real claims (2026-07-22); commit and PR counts from the public repo.",
        measurementSummary: "Strength-score spread across 90 real claims",
        source: "https://github.com/chengzehsu/podcast-stock",
      },
    ],
  },

  experience: {
    title: "Experience",
    intro: "Seven roles, each starting with the same question: where is it stuck?",
    currentLabel: "Now",
    expandLabel: "View role details",
    collapseLabel: "Collapse role",
    skillLabel: "What this chapter added",
    items: [
      {
        id: "ecofirst",
        org: "Ecofirst Taiwan (台灣愛淨節能科技股份有限公司)",
        role: "Product Manager",
        period: "Mar 2025 - Present",
        focus:
          "AI energy-saving HVAC, internal tools, and cross-functional delivery",
        skillSignal:
          "Turning field practice into a roadmap, AI tools, and one delivery workflow that software, project, and sales teams all use.",
        summary:
          "Own the roadmap, requirements, and specs for a 0-to-1 AI energy-saving HVAC product, leading 4 engineers across 50 deployed sites and about NT$100M in projects, and turn practices that lived in individual experience into tools and processes.",
        gapAfter: "Sep 2024 - Feb 2025 | Break and freelance work",
        bullets: [
          "Introduced AI tools and development workflows into product delivery, raising delivery efficiency by 50%",
          "Coordinated software, project, and sales teams around one product-development and deployment flow",
          "Streamlined internal operations with standard operating procedures, raising site operations efficiency by 20%",
        ],
      },
      {
        id: "sat",
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "Nov 2023 - Aug 2024",
        focus: "Enterprise training, online learning, and Hong Kong market entry",
        skillSignal:
          "Clarifying priorities across the differing needs of buyers, administrators, and end users, then testing markets with the smallest viable step.",
        summary:
          "Covered two markets at once: enterprise training, starting from HR interviews and learning data, and online learning, owning new-market entry and the course experience.",
        bullets: [
          "Hong Kong market: partnered with marketing on a third-party platform to enter Hong Kong in three weeks with a minimal launch; first-week revenue passed NT$1M",
          "Internal operations: mapped and redesigned HR leave, expense-claim, and customer-service flows, raising operational efficiency by 20%",
          "Enterprise training: interviewed HR teams at companies of different sizes to learn how training actually runs, then planned a learning-data dashboard so companies could tune training plans with data",
          "Learning outcomes: designed in-course quizzes so learners could check their own progress as they studied",
        ],
      },
      {
        id: "consulting",
        org: "Freelance",
        role: "Independent Consultant",
        period: "Jun 2023 - Nov 2023",
        focus: "Product strategy, rental SaaS, and fundraising advisory",
        skillSignal:
          "Distilling business goals, user flows, and delivery constraints into one roadmap, so engineering, design, and requesters share the same priorities.",
        summary:
          "In 2023, took on product-strategy, SaaS, and fundraising-advisory engagements as an independent consultant; each one ran from the business problem down to how the team would work.",
        bullets: [
          "Rental-management SaaS: helped an operator managing about 100 properties define a multi-tenant management product, its requirements, and its product-management flow",
          "Collaboration flow: translated business strategy into product strategy and roadmaps, improving collaboration among engineers, designers, and requesters",
          "Fundraising advisory: helped energy and hospitality businesses map operations, refine pitch decks, and connect with investors",
        ],
      },
      {
        id: "huayao",
        org: "Hua Yao Industrial (華曜興業有限公司)",
        role: "Senior Operations Manager",
        period: "Nov 2022 - May 2023",
        focus: "Supply-chain and warehouse operations",
        skillSignal:
          "Applying product practice to operations: get the data and the flow straight first, then improve shipping speed and cost.",
        summary: "A short operations-management role focused on supply-chain and warehouse flows.",
        gapAfter: "Aug 2022 - Oct 2022 | Break and freelance work",
        bullets: [
          "Built a product database joining customer, shipping, and purchasing data, cutting coordination overhead and order errors",
          "Redesigned warehouse slotting and product categories to speed up shipping",
          "Analyzed historical financials and proposed cost-structure hypotheses and strategy options",
        ],
      },
      {
        id: "fable",
        org: "Fable (寓意科技)",
        role: "Senior Project Manager",
        period: "Mar 2021 - Jul 2022",
        focus: "E-commerce and health app rebuilds, cross-functional delivery",
        skillSignal:
          "Building systems-level product judgment under delivery pressure: user flows, technical re-platforming, and operating results tied into one decision.",
        summary:
          "Managed an NT$12M+ B2C project portfolio with Agile, led a 10-person engineering team and two junior PMs, and was responsible for storefront, back-office, and app re-platforming across e-commerce, warehouse operations, and IoT. Received the 2022 PMI Taiwan Project Management Benchmark Award (Excellence Award).",
        bullets: [
          "Fresh-produce e-commerce (about NT$200M annual revenue): during rapid order growth, led order-to-delivery mapping and coordinated full-stack and AWS re-platforming; picking went from 300 → 1,000 orders/day (+233%); platform revenue grew 120% during the re-platforming period",
          "Health-management app (about NT$800M annual revenue): used interviews, competitor research, and client workshops to set priorities; rebuilt the platform, migrated user data, and integrated IoT smart scales; daily active users grew from 12,000 to 20,000 within a year (+66%)",
        ],
      },
      {
        id: "oakda",
        org: "Oakda (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "Jun 2020 - Dec 2020",
        focus: "Customer data platforms, chatbots, and dashboards",
        skillSignal:
          "Using data definitions and cross-channel behavior to turn fragmented information into useful services and decisions.",
        summary:
          "Managed product and data teams, owning the roadmap and biweekly sprints for a cross-channel customer data platform.",
        bullets: [
          "Integrated 10M customer records across retail, e-commerce, and real estate by connecting LINE, Facebook, websites, e-commerce, and POS data",
          "Led PRDs and feature design for the CDP, LINE and Facebook chatbots, web tracking, and data dashboards",
          "Defined client data strategies and built Customer 360 views",
        ],
      },
      {
        id: "zhongshuo",
        org: "Zhongshuo Investment Consulting",
        role: "Product Associate",
        period: "Feb 2019 - Jun 2020",
        focus: "Market research, prototyping, and early product validation",
        skillSignal:
          "Building product instinct through market exploration, prototyping, and competitor research: validate the problem before delivery.",
        summary:
          "At a venture studio that contributed technology in exchange for equity, helped traditional businesses move from product exploration to market validation through research, prototyping, requirements work, and outsourced delivery.",
        bullets: [
          "Worked on e-commerce, fan-community, and video-learning products: created wireframes and prototypes, ran competitive research, mapped flows, and coordinated engineering and design partners",
          "Drove product strategy and market validation for two early-stage companies incubated through the tech-for-equity model; both reached NT$1M+ in revenue",
        ],
      },
    ],
  },

  contact: {
    kicker: "Find the bottleneck. Build the fix. Prove it in numbers.",
    title: "Let's talk about the next product.",
    text: "Looking for a global B2C platform or a growth-stage product team, especially one that wants AI in everyday work. Happy to discuss a role, your product direction, or the problems you are working on.",
    cta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/",
      },
    ],
  },

  footer: {
    text: "© 2026 Kevin Hsu",
    backToTop: "Back to top",
  },

  animation: {
    nodes: {
      intake: "Orders",
      picking: "Picking",
      packing: "Packing",
      shipping: "Shipping",
    },
    bottleneckLabel: "Bottleneck",
    hypothesis:
      "Rebuilt the storefront, back office, app, and AWS\naround one order-to-delivery flow",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders queue at picking: 300 orders/day.",
      "Rebuilt storefront, back office, app, and AWS architecture around the delivery flow.",
      "Picking reached 1,000 orders/day, while platform revenue grew 120%.",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing, and shipping; picking becomes the bottleneck, and after AWS re-platforming, throughput rises from 300 → 1,000 orders/day.",
  },
} satisfies SiteContent;
