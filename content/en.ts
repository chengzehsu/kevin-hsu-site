import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | Product Manager",
    description:
      "Kevin Hsu, product manager. I break down flows, find the bottleneck, test a hypothesis, and ship products with measurable impact.",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "Cases", href: "#cases" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    switchLabel: "中文",
    switchAria: "切換到中文",
  },

  hero: {
    headline:
      "Break down flows. Find the bottleneck. Ship products that move the numbers.",
    subline:
      "Product manager. E-commerce, a health app, AI air-conditioning energy savings, and CDP data integration.",
    primaryCta: { label: "Contact me", href: "#contact" },
    secondaryCta: { label: "See the cases", href: "#cases" },
  },

  metrics: {
    title: "Impact",
    items: [
      {
        prefix: "300 → ",
        value: 1000,
        suffix: " orders/day",
        label: "Picking throughput",
        detail: "+233%, fresh-produce e-commerce, AWS re-platform",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "Platform revenue",
        detail: "Fresh-produce e-commerce, NT$200M annual revenue",
      },
      {
        prefix: "+",
        value: 66,
        suffix: "%",
        label: "Daily active users",
        detail: "12,000 → 20,000, health app",
      },
      {
        prefix: "NT$",
        value: 12,
        suffix: "M+",
        label: "Project portfolio",
        detail: "Agile, 10-person engineering team",
      },
      {
        prefix: "+",
        value: 20,
        suffix: "%",
        label: "Site operations efficiency",
        detail: "Standardised operating procedures at Ecofirst",
      },
      {
        value: 2,
        suffix: "",
        label: "Companies incubated",
        detail: "Zhongshuo, each at the NT$1M scale",
      },
    ],
    awards: [
      "2022 PMI Taiwan Project Management Benchmark Award, Excellence",
      "Featured AWS digital transformation case",
    ],
  },

  method: {
    title: "How I work",
    steps: [
      {
        verb: "Decompose",
        text: "Break the flow into observable steps so each hand-off has a clear input and output.",
      },
      {
        verb: "Locate the bottleneck",
        text: "Use data and interviews to find the one step that actually caps throughput.",
      },
      {
        verb: "Hypothesise",
        text: "Write down the hypothesis and the metric it should move, then pick the smallest test.",
      },
      {
        verb: "Validate and improve",
        text: "Validate, keep improving the flow, and make sure the result shows up in operating numbers.",
      },
    ],
    capabilitiesTitle: "Core capabilities",
    capabilities: [
      {
        name: "AI-accelerated delivery",
        text: "Build AI-assisted product workflows that shorten delivery timelines.",
      },
      {
        name: "From planning to building",
        text: "With AI assistance, build internal tools that colleagues use in their daily work.",
      },
      {
        name: "Digital tools for operations",
        text: "Understand each operational bottleneck and pick the right tool to fix it, with measurable benefit.",
      },
    ],
  },

  cases: {
    title: "Cases",
    columns: {
      situation: "Situation",
      bottleneck: "Bottleneck",
      hypothesis: "Hypothesis and approach",
      result: "Result",
    },
    items: [
      {
        id: "grocery",
        org: "Fable",
        period: "2021/3 - 2022/7",
        title: "Fresh-produce e-commerce, AWS re-platform",
        situation:
          "A fresh-produce e-commerce business with NT$200M in annual revenue. Picking handled 300 orders a day.",
        // TODO(kevin): 確認怎麼發現揀貨是瓶頸、驗證了什麼
        bottleneck:
          "Picking was the capacity bottleneck of the whole fulfilment flow.",
        hypothesis:
          "Led the re-platform onto AWS, with the goal of lifting the picking capacity limit.",
        result:
          "Picking went from 300 to 1,000 orders a day (+233%). Platform revenue grew 120%, and the project was featured as an official AWS digital transformation case.",
      },
      {
        id: "health-app",
        org: "Fable",
        period: "2021/3 - 2022/7",
        title: "Health-management app, new platform",
        situation:
          "A health-management app with about NT$800M in annual revenue and about 12,000 daily active users. It needed a redesign, scale-based health analysis and event sign-up, plus a migration of existing user data.",
        bottleneck:
          "Data fields in the old and new systems had to be defined precisely; otherwise the user data migration would fail.",
        hypothesis:
          "Ran requirement interviews to map user journeys, pain points and personas, added competitor analysis, then aligned priorities with the client in workshops. Led use-case design and QA acceptance.",
        result:
          "Launched the new AWS-based platform and migrated user data. Daily active users went from about 12,000 to about 20,000, up 66% within a year.",
      },
      {
        id: "cdp",
        org: "Fable",
        period: "2021/3 - 2022/7",
        title: "CDP and data team",
        situation:
          "Led two teams, product and data, building a CDP, LINE and Facebook chatbots, web tracking, data dashboards and social listening for brand clients.",
        bottleneck:
          "Client data was split across online e-commerce, offline POS and foot-traffic sources; tens of millions of customer records had to be cleaned and inventoried before use.",
        hypothesis:
          "Clean and inventory the customer records first and build models on them, then integrate online and offline data. Use social crawlers to analyse brand topics.",
        result:
          "Cleaned, inventoried and modelled tens of millions of customer records, integrated e-commerce, POS and foot-traffic data, and delivered the CDP, chatbots, dashboards and social listening.",
      },
      {
        id: "ecofirst",
        org: "Ecofirst",
        period: "2025/3 - Present",
        title: "AI air-conditioning energy savings and operations",
        situation:
          "Own the roadmap for an AI energy-saving product for air conditioning; delivery needs the software, project and sales teams working together to deploy at customer sites.",
        bottleneck:
          "The cross-team development and deployment flow was not yet standardised, and site operations had room to improve.",
        hypothesis:
          "Coordinate the software, project and sales teams on one development and deployment flow, and write standard operating procedures for internal operations.",
        result:
          "A cross-team development and deployment flow is in place, and standardised procedures raised site operations efficiency by 20%.",
      },
    ],
  },

  experience: {
    title: "Experience",
    items: [
      {
        org: "Ecofirst",
        role: "Product Manager",
        period: "2025/3 - Present",
        summary:
          "Own and execute the roadmap for an AI energy-saving product for air conditioning, setting product direction and feature strategy.",
        bullets: [
          "Coordinate the software, project and sales teams on one product development and deployment flow",
          "Streamlined internal operations with standard operating procedures, raising site operations efficiency by 20%",
        ],
      },
      {
        // TODO(kevin): 知識衛星職責與成果
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
      },
      {
        org: "Freelance",
        role: "Independent consultant",
        period: "2023/5 - 2023/11",
        // TODO(kevin): Heptabase 產品指標整理連結是否公開
        bullets: [
          "Product management process: helped a multinational SaaS company cascade business strategy into product strategy, with a product roadmap tied to metrics",
          "Business model: worked with a hospitality operator at the NT$100M+ scale and its FA to organise operating and financial data, find a market entry point and close a fundraising round",
          "Venture process: mapped the firm's investment process and built a Notion dashboard so the owner could see the stage of every deal",
        ],
      },
      {
        org: "Fable",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        summary:
          "Managed an NT$12M+ project portfolio with Agile, led a 10-person engineering team (web and app), mentored 2 junior PMs, and owned project initiation, execution, resourcing and gross margin. Won the 2022 PMI Taiwan Project Management Benchmark Award, Excellence.",
        bullets: [
          "Fresh-produce e-commerce (NT$200M annual revenue): led the AWS re-platform; picking went from 300 to 1,000 orders a day (+233%), revenue grew 120%, featured as an official AWS digital transformation case",
          "Health-management app (about NT$800M annual revenue): built the new AWS-based platform and migrated user data; daily active users 12,000 → 20,000, up 66% within a year",
          "Product and data teams: built a CDP, LINE and Facebook chatbots, web tracking, dashboards and social listening; cleaned, inventoried and modelled tens of millions of customer records",
        ],
      },
      {
        org: "Zhongshuo Investment Consulting",
        role: "Product Associate",
        period: "2019/2 - 2020/6",
        summary:
          "Ran user interviews with companies, learned their industries, found improvement opportunities, and validated them with minimum viable tests while collecting feedback.",
        bullets: [
          "Incubated 2 companies outside the corporate structure, each at the NT$1M scale, and took their products to market validation",
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    text: "If you are hiring a product manager, or want to talk through a flow and its bottleneck, I would like to hear from you.",
    // TODO(kevin): email, then cta = { label: "Contact me", href: "mailto:..." }
    // TODO(kevin): LinkedIn 網址
    links: [],
  },

  footer: {
    text: "© 2026 Kevin Hsu",
  },

  animation: {
    nodes: {
      intake: "Orders",
      picking: "Picking",
      packing: "Packing",
      shipping: "Shipping",
    },
    bottleneckLabel: "Bottleneck",
    hypothesis: "Hypothesis: picking is the bottleneck",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders pile up at picking: 300 a day.",
      "Hypothesis: picking is the bottleneck. Validated through the AWS re-platform.",
      "1,000 orders a day, and platform revenue up 120%.",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing and shipping; picking becomes the bottleneck, and after the AWS re-platform daily throughput rises from 300 to 1,000 orders.",
  },
} satisfies SiteContent;
