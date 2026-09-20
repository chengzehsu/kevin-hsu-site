import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | Product Manager | B2C Re-platforming & Delivery",
    description:
      "Product Manager with 5+ years of product-related experience. Led B2C e-commerce re-platforming, contributed to health-app re-platforming, and owned cross-functional delivery and data-product planning; led a 10-person engineering team and two junior PMs.",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Portfolio", href: "/en/portfolio/" },
      { label: "Contact", href: "#contact" },
    ],
    switchLabel: "中文",
    switchAria: "切換到中文",
    skipLabel: "Skip to main content",
  },

  hero: {
    eyebrow: "Kevin Hsu | Product Manager",
    headline: "Break down problems. Build the product.",
    subline: "I use user interviews, competitive research, and process mapping to clarify priorities, then work with product, engineering, and operations teams to deliver.",
    profile: [
      { label: "Positioning", value: "Product Manager · B2C re-platforming and cross-functional delivery" },
      { label: "Product environments", value: "B2C e-commerce, health apps, B2B enterprise learning, and cross-channel customer-data platforms" },
      { label: "Looking for", value: "Global B2C platforms and growth-stage product teams" },
    ],
    builderLoop: {
      label: "From fieldwork to product",
      steps: ["Map work", "Find the issue", "Set a hypothesis", "Build a tool", "Check impact"],
      result: "Ecofirst: delivery +50%, site operations +20%",
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
        label: "Current product delivery efficiency",
        detail: "Introduced AI tools and development workflows",
      },
      {
        value: 1000,
        featured: true,
        suffix: " orders/day",
        label: "Fresh-produce picking capacity",
        detail: "After AWS re-platforming: 300 to 1,000 orders/day",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "Fresh-produce platform revenue growth",
        detail: "During re-platforming; client annual revenue: about NT$200M",
      },
      {
        prefix: "+",
        value: 66,
        featured: true,
        suffix: "%",
        label: "Health app daily active users",
        detail: "Within one year of launch: 12,000 to 20,000/day",
      },
      {
        value: 10,
        suffix: "M records",
        label: "Cross-industry customer-data integration",
        detail: "Connected online e-commerce and offline POS data",
      },
      {
        value: 100,
        suffix: " properties",
        label: "Rental-management SaaS portfolio",
        detail: "Clarified multi-tenant management needs and product flow",
      },
    ],
  },

  linkedinPosts: {
    title: "Selected LinkedIn posts",
    intro: "Practical notes on a PM building tools and bringing AI into everyday workflows.",
    author: "Kevin Hsu",
    platform: "LinkedIn",
    readLabel: "Read the post",
    items: [
      {
        title: "218 commits in two months",
        description: "Started by connecting APIs, then iterated on a tool that made site-data work easier with Claude Code.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
        image: { src: "/linkedin-posts/post-1.jpg", alt: "Site-tool interface with 218 commits", width: 800, height: 819 },
      },
      {
        title: "An AI business-card assistant with Cursor and Gemini",
        description: "A 0-to-1 build through OCR failures, rebuilding version control, and getting the app deployed.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
        image: { src: "/linkedin-posts/post-2.jpg", alt: "AI business-card assistant workflow illustration", width: 800, height: 446 },
      },
      {
        title: "Using AI to move meetings forward",
        description: "Notion AI and Claude Cowork Schedule automatically organise action items and proposal drafts.",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
        image: { src: "/linkedin-posts/post-3.jpg", alt: "Daily PM meeting follow-up flow diagram", width: 856, height: 838 },
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
        distinction: "Excellence",
        description: "Project work at Fable, spanning process mapping, system re-platforming, and cross-team delivery.",
        link: { label: "See the experience", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "Project period",
        caseId: "grocery",
        title: "AWS digital transformation case",
        distinction: "Fresh-produce commerce",
        description: "Led the e-commerce rebuild and AWS migration at Fable. The project was later featured by The News Lens, with content provided by AWS.",
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
        name: "AI-accelerated delivery",
        text: "Use AI to reshape the workflow from clarification and specification through making and acceptance, shortening the path from idea to a shippable outcome.",
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
    intro: "Four cases, one structure: scope, decision, outcome, evidence.",
    copyLabel: "Copy case link",
    copiedLabel: "Link copied",
    copyFallback: "Select and copy the link below.",
    linkLabel: "Open case link",
    backLabel: "Back to portfolio",
    filmLabel: "Watch the workflow",
    readLabel: "Read full case",
    roleLabel: "Role",
    scopeLabel: "Scope",
    collaborationLabel: "Collaboration",
    artifactsLabel: "Work products",
    measurementLabel: "How it was measured",
    ownershipLabel: "What I drove",
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
        period: "2021/3 - 2022/7",
        rank: 1,
        title: "Fresh-produce commerce, rebuilt",
        role: "Senior Project Manager",
        scope: "NT$6.2M | Web/app | Orders, warehouse, AWS",
        collaboration: "Product, engineering, client operations, warehouse logistics, and AWS teams",
        impact: "Picking capacity: 300 → 1,000/day (+233%)",
        ownership: "Mapped order-to-delivery; aligned storefront, back office, app, and AWS re-platforming.",
        situation:
          "Pandemic demand overwhelmed the storefront, back office, and app of a fresh-produce business with about NT$200M in annual revenue.",
        bottleneck:
          "End-to-end mapping identified picking and transport capacity as the primary constraints.",
        decision:
          "Fixed picking and transport capacity first, then rebuilt the storefront, back office, app, and AWS around the order-to-delivery flow.",
        decisionSummary: "Removed warehouse and transport constraints first, then rebuilt the storefront, back office, and AWS stack together.",
        hypothesis:
          "Used one priority sequence across product, engineering, warehouse, and operations to phase peak-season fixes and re-platforming.",
        result:
          "Picking capacity rose from 300 to 1,000 orders per day (+233%). Revenue grew 120% during the programme, which AWS later featured.",
        artifacts: ["Project overview", "Order-flow map", "Industry and product analysis", "QA scripts", "Project knowledge base"],
        measurement: "Compared daily picking capacity before and after the rebuild. The AWS digital-transformation feature provides public evidence; revenue growth was a team outcome during the programme.",
        measurementSummary: "Daily picking capacity: before vs after",
      },
      {
        id: "health-app",
        org: "Fable (寓意科技)",
        period: "2021/3 - 2022/7",
        rank: 3,
        title: "Health app and IoT integration",
        role: "Senior Project Manager",
        scope: "Health app | IoT scales | Data migration | Localisation",
        collaboration: "Client product, engineering, data migration, IoT, and localisation partners",
        impact: "DAU: 12,000 → 20,000 in one year (+66%)",
        ownership: "Led interviews, competitor analysis, workshops, prioritisation, and QA acceptance.",
        situation:
          "A health app with about NT$800M in annual revenue needed re-platforming, IoT scales, event registration, localisation, and legacy-data migration.",
        bottleneck:
          "Legacy fields, IoT data, and new feature flows were inconsistent, blocking safe migration and use.",
        decision:
          "Turned interview scenarios into wireframes, user stories, and PRDs; aligned parameter and translation tables before development.",
        decisionSummary: "Specified real user situations first, then reduced migration and localisation risk.",
        hypothesis:
          "Used interviews, competitor research, and client workshops to prioritise work, then designed QA around real use cases.",
        result:
          "Launched the new platform and completed migration. DAU grew from about 12,000 to 20,000 within one year (+66%).",
        artifacts: ["User interviews", "Wireframes", "User stories", "PRDs", "Parameter and translation tables"],
        measurement: "Compared daily active users at launch and one year later. Growth from 12,000 to 20,000 was an overall product and team outcome.",
        measurementSummary: "DAU: launch vs one year later",
      },
      {
        id: "cdp",
        org: "Oakda (歐可達數據科技有限公司)",
        period: "2020/6 - 2020/12",
        rank: 4,
        title: "Connecting customer data",
        role: "Product Manager",
        scope: "CDP | Chatbots | Web tracking | Dashboards | POS",
        collaboration: "UX, Sales, Marketing, product, and data teams",
        impact: "3 industries × 5 channels | 10M records integrated",
        ownership: "Planned the CDP, chatbots, tracking, and dashboards; led biweekly product-data delivery.",
        situation:
          "LINE, Facebook, website, e-commerce, and POS data were fragmented, hiding each customer's source and purchase behaviour.",
        bottleneck:
          "Channel formats and identity rules differed; the data needed structuring and matching before it could form Customer 360 views.",
        decision:
          "Validated the entry point through 30 target accounts and cross-functional interviews, then adapted existing capabilities into an MVP.",
        decisionSummary: "Tested the entry point with 30 target accounts and cross-functional interviews before converging on the MVP.",
        hypothesis:
          "Used a biweekly cadence to align product and data delivery across the CDP, chatbots, tracking, and dashboards.",
        result:
          "Connected five channels and integrated 10M records across retail, e-commerce, and real estate into Customer 360 views.",
        artifacts: ["Product roadmap", "MVP interview plan", "Customer-data strategy", "Metrics knowledge base", "Data-product PRDs"],
        measurement: "Measured structured and connected records plus channel coverage; 10M records is the cross-industry integration scale.",
        measurementSummary: "Record volume and channel coverage after integration",
      },
      {
        id: "ecofirst",
        org: "Ecofirst (台灣愛淨)",
        period: "2025/3 - Present",
        rank: 2,
        title: "AI energy: from planning to delivery",
        role: "Product Manager",
        scope: "Roadmap | AI development | Internal tools | Deployment, site ops",
        collaboration: "Software, project, sales, and site-operations teams",
        impact: "Delivery efficiency +50% | Site operations +20%",
        ownership: "Product roadmap, AI development workflows, internal tools, and cross-functional deployment handoffs.",
        situation:
          "The early-stage AI HVAC product relied on project-led delivery without reusable back-office systems or internal tools.",
        bottleneck:
          "Development, deployment, and site handoffs lacked a shared process, concentrating knowledge and delaying delivery.",
        decision:
          "Standardised development, deployment, and site handoffs before turning frequent operating work into internal tools.",
        decisionSummary: "Made development, deployment, and site handoffs repeatable before expanding the feature set.",
        hypothesis:
          "Used the roadmap to align priorities and built one delivery flow with software, project, and sales teams.",
        result:
          "Put a cross-functional development and deployment flow in place. AI workflows raised delivery efficiency by 50%, while standard operating procedures improved site operations efficiency by 20%.",
        artifacts: ["Product roadmap", "AI development workflow", "Internal operations tools", "Deployment handoff", "Standard operating procedures"],
        measurement: "Compared internal delivery cycles and site operating time before and after adoption; figures come from team operating records, with client data kept private.",
        measurementSummary: "Delivery cycle and site operating time: before vs after",
      },
    ],
  },

  experience: {
    title: "Experience",
    expandLabel: "View role details",
    collapseLabel: "Collapse role",
    skillLabel: "What this chapter added",
    items: [
      {
        id: "ecofirst",
        org: "Ecofirst Taiwan (台灣愛淨股份有限公司)",
        role: "Product Manager",
        period: "2025/3 - Present",
        focus: "AI energy products, internal tools, and cross-functional delivery",
        skillSignal: "Turning field practice into roadmaps, AI tools, and delivery workflows that give cross-functional teams a shared way to move work forward.",
        summary:
          "Own the roadmap and feature strategy for a 0-to-1 AI energy-saving air-conditioning product. Build internal tools with AI and move a fast-changing, project-led environment toward repeatable product operations.",
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
        period: "2023/11 - 2024/8",
        focus: "B2B learning, learning analytics, and market validation",
        skillSignal: "Clarifying priorities across the differing needs of buyers, administrators, and end users, then testing market opportunities.",
        summary:
          "Planned a B2B enterprise-training platform for HR buyers, administrators, and employees, alongside learning-analytics work and market validation.",
        bullets: [
          "Enterprise training: interviewed HR teams at companies of different sizes and defined post-purchase course assignment, new-hire onboarding, and learning-management workflows",
          "Learning analytics: planned dashboards and in-class assessments to help HR teams understand employee progress and capability growth",
          "Hong Kong market: partnered with marketing and used a third-party platform to test an entry approach in three weeks",
          "Growth and operations: explored affiliate and group-buying features, and planned tools for internal leave, time-off-in-lieu, and payment-request flows",
        ],
      },
      {
        id: "consulting",
        org: "Freelance",
        role: "Independent consultant",
        period: "2023/5 - 2023/11",
        focus: "Product strategy, rental SaaS, and fundraising advisory",
        skillSignal: "Turning ambiguous business problems into aligned product strategy, roadmaps, and cross-functional operating rhythm.",
        summary:
          "During a career transition, took on product strategy, SaaS, and fundraising-advisory work, building practical experience from business strategy and product management through cross-functional collaboration.",
        bullets: [
          "Rental-management SaaS: helped an operator managing about 100 properties define a multi-tenant management product, its requirements, and its product-management flow",
          "Collaboration flow: translated business strategy into product strategy and roadmaps, improving collaboration among engineers, designers, and requesters",
          "Fundraising advisory: helped energy and aluminum-plastics businesses map operations, refine pitch decks, and connect with investors",
        ],
      },
      {
        id: "fable",
        org: "Fable (寓意科技)",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        focus: "E-commerce and health app rebuilds, cross-functional delivery",
        skillSignal: "Developing systems product sense under delivery pressure: connecting user flow, technical re-platforming, and operating outcomes.",
        summary:
          "Managed an NT$12M+ B2C project portfolio with Agile, led a 10-person engineering team and two junior PMs, and was responsible for storefront, back-office, and app re-platforming across e-commerce, warehouse operations, and IoT. Received the 2022 PMI Taiwan Project Management Benchmark Award, Excellence.",
        bullets: [
          "Fresh-produce e-commerce (about NT$200M annual revenue): during rapid order growth, led full-stack and AWS re-platforming; picking capacity rose from 300 to 1,000 orders a day, up 233%; platform revenue grew 120% during the re-platforming period",
          "Health-management app (about NT$800M annual revenue): used interviews, competitor research, and client workshops to set priorities; rebuilt the platform, migrated user data, and integrated IoT smart scales; daily active users grew from 12,000 to 20,000 within a year (+66%)",
        ],
      },
      {
        id: "oakda",
        org: "Oakda (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        focus: "Customer data platforms, chatbots, and dashboards",
        skillSignal: "Using data definitions and cross-channel behaviour to turn fragmented information into useful services and decisions.",
        summary: "Managed product and data teams, owning the roadmap and biweekly Scrum sprints for a cross-channel customer data platform.",
        bullets: [
          "Integrated 10M customer records across retail, e-commerce, and real estate by connecting LINE, Facebook, websites, e-commerce, and POS data",
          "Led PRDs and feature design for the CDP, LINE and Facebook chatbots, web tracking and data dashboards",
          "Defined client data strategies and built 360-degree customer views",
        ],
      },
      {
        id: "zhongshuo",
        org: "Zhongshuo Investment Consulting",
        role: "Product Associate",
        period: "2019/2 - 2020/6",
        focus: "Market research, prototyping, and early product validation",
        skillSignal: "Building product instinct through market exploration, prototyping, and competitor research: validate the problem before delivery.",
        summary:
          "In a venture studio that took equity through technology investment, helped traditional businesses move from product exploration to market validation through research, prototyping, requirements work, and outsourced delivery.",
        bullets: [
          "Worked on e-commerce, fan-community, and video-learning products: created wireframes and prototypes, ran competitive research, mapped flows, and coordinated engineering and design partners",
          "Incubated two early-stage companies outside the existing corporate structure and helped take their products to market validation",
        ],
      },
    ],
  },

  contact: {
    title: "Let's talk about the next product.",
    text: "Looking for a product team ready to put AI into real work. Happy to discuss a role, your product direction, or the problems you are working on.",
    cta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/" }],
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
    hypothesis: "Rebuilt the storefront, back office, app & AWS\naround one order-to-delivery flow",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders queue at picking: 300 orders per day.",
      "Rebuilt storefront, back office, app, and AWS architecture around the delivery flow.",
      "Picking reached 1,000 orders per day, while platform revenue grew 120%.",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing and shipping; picking becomes the bottleneck, and after the AWS re-platform daily throughput rises from 300 to 1,000 orders.",
  },
} satisfies SiteContent;
