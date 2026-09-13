import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | Product Manager",
    description:
      "Kevin Hsu, product manager. I map the process, find what is getting in the way, then use data and practical tools to make it work better.",
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
    eyebrow: "Kevin Hsu | Product Manager",
    headline: "Find bottlenecks. Improve products.",
    subline: "I map the work, find what is stuck, then use data, AI, and practical tools to make it better.",
    visualLabel: "AWS re-platform: from constraint to outcome",
    primaryCta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "See the cases", href: "#cases" },
  },

  metrics: {
    title: "Selected product results",
    items: [
      {
        value: 1000,
        suffix: " orders/day",
        label: "Fresh-produce picking capacity",
        detail: "300 to 1,000 orders/day, up 233%",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "Fresh-produce platform revenue",
        detail: "B2C e-commerce with NT$200M annual revenue",
      },
      {
        prefix: "+",
        value: 66,
        suffix: "%",
        label: "Health app DAU",
        detail: "12,000 to 20,000 within one year",
      },
      {
        value: 10,
        suffix: "M records",
        label: "CDP customer-data integration",
        detail: "Online e-commerce and offline POS data",
      },
    ],
    awards: [
      "2022 PMI Taiwan Project Management Benchmark Award, Excellence",
      "Featured AWS digital transformation case",
    ],
  },

  method: {
    title: "How I get work moving",
    steps: [
      {
        verb: "Map the flow",
        text: "Lay out the steps so it is clear how the work moves from one person or system to the next.",
      },
      {
        verb: "Find the sticking point",
        text: "Use data and interviews to find the part that is actually slowing things down.",
      },
      {
        verb: "Try a hypothesis",
        text: "Get clear on what to change, what should improve, and the smallest way to try it.",
      },
      {
        verb: "See what changed",
        text: "Check the result, then keep adjusting the flow until it works better.",
      },
    ],
    capabilitiesTitle: "Core capabilities",
    capabilities: [
      {
        name: "Using AI to move faster",
        text: "Put AI into the product workflow to shorten the path from idea to delivery.",
      },
      {
        name: "Taking plans through to delivery",
        text: "Use AI to build internal tools that teams use in their day-to-day work.",
      },
      {
        name: "Using tools to fix operational snags",
        text: "Understand where the work gets stuck, then use the right tool to improve it step by step.",
      },
    ],
  },

  cases: {
    title: "Cases",
    columns: {
      situation: "Situation",
      bottleneck: "Bottleneck",
      hypothesis: "My contribution",
      result: "Result",
    },
    items: [
      {
        id: "grocery",
        org: "Fable",
        period: "2021/3 - 2022/7",
        title: "AWS re-platforming for fresh-produce e-commerce",
        impact: "300 to 1,000 orders a day, up 233%",
        situation:
          "A fresh-produce e-commerce business with NT$200M in annual revenue. Its picking operation handled 300 orders per day.",
        // TODO(kevin): 確認怎麼發現揀貨是瓶頸、驗證了什麼
        bottleneck:
          "Picking was the capacity bottleneck of the whole fulfilment flow.",
        hypothesis:
          "Led AWS re-platforming to relieve the picking capacity constraint.",
        result:
          "Picking capacity rose from 300 to 1,000 orders per day, up 233%. Platform revenue grew 120%, and the project was featured as an AWS digital transformation case study.",
      },
      {
        id: "health-app",
        org: "Fable",
        period: "2021/3 - 2022/7",
        title: "Health management app re-platforming",
        impact: "Daily active users: 12,000 to 20,000, up 66%",
        situation:
          "A health management app with about NT$800M in annual revenue and about 12,000 daily active users. It needed a redesign, body-scale health analysis, event registration, and a migration of legacy user data.",
        bottleneck:
          "Data fields in the legacy and new platforms had to be defined precisely; otherwise, the user-data migration would fail.",
        hypothesis:
          "Conducted requirements interviews to map user journeys, pain points, and personas; added competitor analysis; aligned priorities with the client in workshops; and led use-case design and QA acceptance.",
        result:
          "Launched the new AWS-based platform and migrated user data. Daily active users grew from about 12,000 to about 20,000, up 66% within a year.",
      },
      {
        id: "cdp",
        org: "OKData",
        period: "2020/6 - 2020/12",
        title: "CDP product and data teams",
        impact: "Integrated 10M customer records",
        situation:
          "Managed product and data teams, owned the CDP roadmap and biweekly Scrum sprints, and built data products for retail, e-commerce, and real estate clients.",
        bottleneck:
          "Online e-commerce and offline POS data lived in separate systems. 10M customer records had to be structured before they could form a usable 360-degree customer view.",
        hypothesis:
          "Managed product and data teams, using the CDP roadmap and biweekly Scrum sprints to drive integration. Led PRDs and feature design.",
        result:
          "Integrated 10M customer records across retail, e-commerce, and real estate, connected online e-commerce and offline POS data, and built 360-degree customer views.",
      },
      {
        id: "ecofirst",
        org: "Ecofirst",
        period: "2025/3 - Present",
        title: "AI energy-saving product for air conditioning",
        impact: "Site operations efficiency up 20%",
        situation:
          "Own the roadmap for an AI energy-saving air-conditioning product. Delivery requires the software, project, and sales teams to work together on customer-site deployments.",
        bottleneck:
          "The cross-team development and deployment flow was not yet standardized, and site operations had room to improve.",
        hypothesis:
          "Coordinate the software, project, and sales teams on one development and deployment flow, and write standard operating procedures for internal operations.",
        result:
          "A cross-team development and deployment flow is in place, and standardized procedures have raised site operations efficiency by 20%.",
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
          "Own and execute the roadmap for an AI energy-saving air-conditioning product, setting product direction and feature strategy.",
        bullets: [
          "Coordinate the software, project and sales teams on one product development and deployment flow",
          "Streamlined internal operations with standard operating procedures, raising site operations efficiency by 20%",
        ],
      },
      {
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        summary:
          "Across enterprise training and consumer learning, conducted HR research, planned learning analytics, tested entry into Hong Kong, and improved internal workflows.",
        bullets: [
          "Enterprise learning: interviewed HR teams at companies of different sizes to understand training operations, then planned a learning dashboard for employee progress",
          "Hong Kong market: partnered with marketing and used a third-party platform for a lightweight market test in three weeks",
          "Learning outcomes and revenue: planned in-class assessments and explored affiliate marketing and group buying features as new revenue paths",
          "Operations: mapped internal leave, time-off-in-lieu, and payment-request processes, then planned tools and workflows to improve efficiency",
        ],
      },
      {
        org: "Freelance",
        role: "Independent consultant",
        period: "2023/5 - 2023/11",
        summary: null,
        // TODO(kevin): Heptabase 產品指標整理連結是否公開
        bullets: [
          "Product strategy: helped a multinational SaaS company translate business strategy into product strategy, with a product roadmap tied to metrics",
          "Business model: worked with a hospitality operator at the NT$100M+ scale and its financial adviser to organize operating and financial data, find a market entry point, and close a fundraising round",
          "Investment process: mapped the firm's investment process and built a Notion dashboard so the owner could see the stage of every deal",
        ],
      },
      {
        org: "Fable",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        summary:
          "Managed an NT$12M+ project portfolio using Agile methods, led a 10-person engineering team across web and app, mentored two junior PMs, and owned project initiation, execution, resourcing, and gross margin. Received the 2022 PMI Taiwan Project Management Benchmark Award, Excellence.",
        bullets: [
          "Fresh-produce e-commerce (NT$200M annual revenue): led AWS re-platforming; picking capacity rose from 300 to 1,000 orders per day, up 233%; revenue grew 120%; featured as an AWS digital transformation case study",
          "Health management app (about NT$800M annual revenue): launched the new AWS-based platform and migrated user data; daily active users grew from 12,000 to 20,000, up 66% within a year",
        ],
      },
      {
        org: "OKData",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        summary: "Managed product and data teams, owning the CDP roadmap and biweekly Scrum sprints.",
        bullets: [
          "Integrated 10M customer records across retail, e-commerce, and real estate by connecting online e-commerce and offline POS data",
          "Led PRDs and feature design for the CDP, LINE and Facebook chatbots, web tracking and data dashboards",
          "Defined client data strategies and built 360-degree customer views",
        ],
      },
      {
        org: "Zhongshuo Investment Consulting",
        role: "Product Associate",
        period: "2019/2 - 2020/6",
        summary:
          "Ran user interviews with companies, learned their industries, found improvement opportunities, and validated them with minimum viable tests while collecting feedback.",
        bullets: [
          "Incubated two companies outside the existing corporate structure, each at the NT$1M scale, and took their products to market validation",
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    text: "If you are hiring a product manager, or working through a process that is stuck, I would be glad to talk.",
    cta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/cheng-ze-hsu-126611118/" }],
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
    hypothesis: "Led the AWS re-platform to improve the picking workflow",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders queue at picking: 300 orders per day.",
      "Led the AWS re-platform to improve the picking workflow.",
      "Picking reached 1,000 orders per day, while platform revenue grew 120%.",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing and shipping; picking becomes the bottleneck, and after the AWS re-platform daily throughput rises from 300 to 1,000 orders.",
  },
} satisfies SiteContent;
