import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | Product Manager",
    description:
      "Product manager Kevin Hsu has experience in 0-to-1 AI products, B2B platforms, and data systems, including e-commerce re-platforming, enterprise learning, IoT integration, and customer data platforms.",
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
    headline: "Turn unclear operational needs into products teams actually adopt.",
    subline: "Experience across 0-to-1 AI products, B2B platforms, and data integration, from process mapping through cross-functional delivery.",
    visualLabel: "E-commerce re-platforming: from order to delivery",
    profile: [
      { label: "Current role", value: "0-to-1 AI energy-saving product and operations tools" },
      { label: "Product experience", value: "B2B platforms, data products, e-commerce, and IoT" },
      { label: "Recent result", value: "AI development workflows improved delivery efficiency by 50%" },
    ],
    primaryCta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "See the cases", href: "#cases" },
  },

  metrics: {
    title: "Product results, with evidence",
    items: [
      {
        prefix: "+",
        value: 50,
        suffix: "%",
        label: "Current product delivery efficiency",
        detail: "Introduced AI tools and development workflows",
      },
      {
        value: 1000,
        suffix: " orders/day",
        label: "Fresh-produce picking capacity",
        detail: "After AWS re-platforming: 300 to 1,000 orders/day",
      },
      {
        prefix: "+",
        value: 120,
        suffix: "%",
        label: "Fresh-produce platform revenue",
        detail: "Grew after re-platforming; client annual revenue: NT$200M",
      },
      {
        prefix: "+",
        value: 66,
        suffix: "%",
        label: "Health app daily active users",
        detail: "After new-platform launch: 12,000 to 20,000/day",
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
    awards: [
      "2022 PMI Taiwan Project Management Benchmark Award, Excellence",
      "Featured AWS digital transformation case",
    ],
  },

  method: {
    title: "From problem definition to delivery",
    steps: [
      {
        verb: "Define the problem",
        text: "Start with user needs, operations, and business goals to clarify the problem worth solving.",
      },
      {
        verb: "Find the constraint",
        text: "Use data, interviews, and process mapping to identify the highest-leverage constraint.",
      },
      {
        verb: "Design the solution",
        text: "Turn needs into a testable product plan, aligned on priorities, resources, and success measures.",
      },
      {
        verb: "Drive delivery",
        text: "Coordinate delivery, acceptance, and iteration, then track whether the outcome improved.",
      },
    ],
    capabilitiesTitle: "What I bring",
    capabilities: [
      {
        name: "0-to-1 AI products and development workflows",
        text: "Use AI tools in product and development work to speed delivery while requirements continue to evolve.",
      },
      {
        name: "B2B platforms and operational flow",
        text: "Understand the distinct workflows of enterprise buyers, administrators, and frontline users to design products and back-office tools that work in practice.",
      },
      {
        name: "Data products and systems integration",
        text: "Clarify data definitions and system boundaries, then connect product, engineering, and operations so data can support decisions and services.",
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
        org: "Fable (寓意科技)",
        period: "2021/3 - 2022/7",
        title: "Fresh-produce e-commerce re-platforming and warehouse-flow improvement",
        impact: "300 to 1,000 orders a day, up 233%",
        situation:
          "During the pandemic, order growth overwhelmed the existing systems of a fresh-produce e-commerce business with NT$200M in annual revenue. Its storefront, back office, and app all needed rebuilding.",
        bottleneck:
          "The end-to-end flow from order to delivery had to be mapped before the warehouse picking constraint and re-platforming priorities could be addressed.",
        hypothesis:
          "Led storefront, back-office, app, and AWS re-platforming, aligning product, engineering, and operations around one order-to-warehouse delivery flow.",
        result:
          "After re-platforming, picking capacity rose from 300 to 1,000 orders per day, up 233%. Platform revenue grew 120%, and the project was featured as an AWS digital transformation case study.",
      },
      {
        id: "health-app",
        org: "Fable (寓意科技)",
        period: "2021/3 - 2022/7",
        title: "Health-management app re-platforming and IoT integration",
        impact: "Daily active users: 12,000 to 20,000, up 66%",
        situation:
          "A health-management app with about NT$800M in annual revenue and 12,000 daily active users needed re-platforming, IoT smart-scale health insights, event registration, and legacy-user-data migration.",
        bottleneck:
          "Legacy and new data fields, IoT device data, and new feature flows had to be consistently defined or user data could not be safely migrated and used.",
        hypothesis:
          "Mapped user journeys, pain points, and personas through interviews; added competitor analysis; aligned priorities with the client in workshops; and led use-case design and QA acceptance.",
        result:
          "Launched the new AWS-based platform and migrated user data. Daily active users grew from about 12,000 to about 20,000, up 66% within a year.",
      },
      {
        id: "cdp",
        org: "OKData (歐可達數據科技有限公司)",
        period: "2020/6 - 2020/12",
        title: "Cross-channel customer data platform",
        impact: "Integrated 10M customer records",
        situation:
          "Clients had customer data spread across LINE, Facebook, websites, e-commerce, and POS systems, so they could not see a user's source, purchase behavior, or frequency in one place.",
        bottleneck:
          "Channel formats and identities were inconsistent. 10M customer records had to be structured and connected before they could form usable 360-degree customer views.",
        hypothesis:
          "Used the CDP roadmap and biweekly Scrum sprints to align product and data teams, leading product requirements and feature design for the CDP, chatbots, web tracking, and data dashboards.",
        result:
          "Integrated 10M customer records across retail, e-commerce, and real estate, connected online e-commerce and offline POS data, and built 360-degree customer views.",
      },
      {
        id: "ecofirst",
        org: "Ecofirst (台灣愛淨)",
        period: "2025/3 - Present",
        title: "0-to-1 AI energy-saving product and operations tools",
        impact: "Delivery efficiency up 50%; site operations up 20%",
        situation:
          "The AI energy-saving air-conditioning product is at the prototype stage. The existing approach was project-led, without reusable back-office systems and internal tools.",
        bottleneck:
          "Incoming demand continued to grow, but development, deployment, and site operations had no standard flow, limiting product completeness and delivery speed.",
        hypothesis:
          "Set the roadmap, used AI development workflows to build internal tools, and coordinated software, project, and sales teams around one development and deployment flow.",
        result:
          "Put a cross-functional development and deployment flow in place. AI workflows raised delivery efficiency by 50%, while standard operating procedures improved site operations efficiency by 20%.",
      },
    ],
  },

  experience: {
    title: "Experience",
    items: [
      {
        org: "Ecofirst Taiwan (台灣愛淨股份有限公司)",
        role: "Product Manager",
        period: "2025/3 - Present",
        summary:
          "Own the roadmap and feature strategy for a 0-to-1 AI energy-saving air-conditioning product. Build internal tools with AI and move a fast-changing, project-led environment toward repeatable product operations.",
        bullets: [
          "Introduced AI tools and development workflows into product delivery, raising delivery efficiency by 50%",
          "Coordinated software, project, and sales teams around one product-development and deployment flow",
          "Streamlined internal operations with standard operating procedures, raising site operations efficiency by 20%",
        ],
      },
      {
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "2023/11 - 2024/8",
        summary:
          "Planned a B2B enterprise-training platform for HR buyers, administrators, and employees, alongside learning-analytics work and market validation.",
        bullets: [
          "Enterprise training: interviewed HR teams at companies of different sizes to understand post-purchase course assignment, new-hire onboarding, and learning-management workflows",
          "Learning analytics: planned a dashboard to help HR teams understand employee progress and capability growth",
          "Hong Kong market: partnered with marketing and used a third-party platform for a lightweight market test in three weeks",
          "Learning outcomes and revenue: planned in-class assessments and explored affiliate marketing and group buying features as new revenue paths",
          "Operations: mapped internal leave, time-off-in-lieu, and payment-request processes, then planned tools and workflows to improve efficiency",
        ],
      },
      {
        org: "Freelance",
        role: "Independent consultant",
        period: "2023/5 - 2023/11",
        summary:
          "During a career transition, took on product strategy, SaaS, and fundraising-advisory work, building practical experience from business strategy and product management through cross-functional collaboration.",
        bullets: [
          "Rental-management SaaS: helped an operator managing about 100 properties plan multi-tenant management software, clarify requirements, and establish a product-management flow",
          "Collaboration flow: translated business strategy into product strategy and roadmaps, improving collaboration among engineers, designers, and requesters",
          "Fundraising advisory: helped energy and aluminum-plastics businesses map operations, refine pitch decks, and connect with investors",
        ],
      },
      {
        org: "Fable (寓意科技)",
        role: "Senior Project Manager",
        period: "2021/3 - 2022/7",
        summary:
          "Managed an NT$12M+ project portfolio with Agile, led a 10-person engineering team and two junior PMs, and delivered storefront, back-office, and app re-platforming across e-commerce, warehouse operations, and IoT. Received the 2022 PMI Taiwan Project Management Benchmark Award, Excellence.",
        bullets: [
          "Fresh-produce e-commerce (NT$200M annual revenue): during rapid order growth, led full-stack and AWS re-platforming; picking capacity rose from 300 to 1,000 orders a day, up 233%; platform revenue grew 120%",
          "Health-management app (about NT$800M annual revenue): rebuilt the platform, migrated user data, and integrated IoT smart scales; daily active users grew from 12,000 to 20,000 within a year",
        ],
      },
      {
        org: "OKData (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "2020/6 - 2020/12",
        summary: "Managed product and data teams, owning the roadmap and biweekly Scrum sprints for a cross-channel customer data platform.",
        bullets: [
          "Integrated 10M customer records across retail, e-commerce, and real estate by connecting LINE, Facebook, websites, e-commerce, and POS data",
          "Led PRDs and feature design for the CDP, LINE and Facebook chatbots, web tracking and data dashboards",
          "Defined client data strategies and built 360-degree customer views",
        ],
      },
      {
        org: "Zhongshuo Investment Consulting",
        role: "Product Associate",
        period: "2019/2 - 2020/6",
        summary:
          "In a venture studio that took equity through technology investment, helped traditional businesses move from product exploration to market validation through research, prototyping, requirements work, and outsourced delivery.",
        bullets: [
          "Worked on e-commerce, fan-community, and video-learning products: created wireframes and prototypes, ran competitive research, mapped flows, and coordinated engineering and design partners",
          "Incubated two companies outside the existing corporate structure, each at the NT$1M scale, and helped take their products to market validation",
        ],
      },
    ],
  },

  contact: {
    title: "Contact",
    text: "If you are looking for a product manager with 0-to-1, B2B platform, data-product, or cross-functional delivery experience, I would be glad to talk.",
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
    hypothesis: "Rebuilt storefront, back office, app, and AWS architecture around the order-to-delivery flow",
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
