import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title: "Kevin Hsu | AI Product Manager",
    description:
      "AI product manager building internal tools and delivery workflows. At Ecofirst, improved delivery efficiency by 50%, with experience in e-commerce, health apps, and customer data.",
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
    eyebrow: "Kevin Hsu | AI Product Manager",
    headline: "Product thinking. Working software.",
    subline: "At Ecofirst, I build AI-assisted development workflows and internal tools the team uses, improving delivery efficiency by 50%.",
    profile: [
      { label: "Positioning", value: "AI product manager · systems-minded PM" },
      { label: "Where I work best", value: "0-to-1, B2B, data, and operations" },
      { label: "Looking for", value: "A team ready to put AI into real work" },
    ],
    builderLoop: {
      label: "From fieldwork to product",
      steps: ["Map work", "Find the issue", "Set a hypothesis", "Build a tool", "Check impact"],
      result: "Ecofirst: delivery +50%, site operations +20%",
    },
    primaryCta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    secondaryCta: { label: "See the cases", href: "#cases" },
  },

  metrics: {
    title: "Results from the work",
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
  },

  awards: {
    title: "Awards & case features",
    items: [
      {
        id: "pmi",
        kind: "award",
        category: "Project award",
        year: "2022",
        title: "PMI Taiwan Project Management Benchmark Award",
        distinction: "Excellence",
        description: "Project work at Fable, spanning process mapping, system re-platforming, and cross-team delivery.",
        link: { label: "See the experience", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "Case feature",
        year: "2025",
        title: "AWS digital transformation case",
        distinction: "Fresh-produce commerce",
        description: "The News Lens' AWS feature covers the e-commerce rebuild and cloud migration. Article content provided by AWS.",
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
    title: "Cases",
    ownershipLabel: "What I drove",
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
        rank: 2,
        title: "Fresh-produce commerce, rebuilt",
        impact: "300 to 1,000 orders a day, up 233%",
        ownership: "Mapped the order-to-delivery flow; aligned storefront, back office, app, and AWS re-platforming work.",
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
        rank: 3,
        title: "Health app and IoT integration",
        impact: "Daily active users: 12,000 to 20,000, up 66%",
        ownership: "User interviews, competitor research, client workshops, prioritisation, use-case design, and QA acceptance.",
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
        rank: 4,
        title: "Connecting customer data",
        impact: "Integrated 10M customer records",
        ownership: "Product planning for CDP, chatbots, tracking, and dashboards, plus biweekly product-data collaboration.",
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
        rank: 1,
        title: "AI energy: from planning to delivery",
        impact: "Delivery efficiency up 50%; site operations up 20%",
        ownership: "Product roadmap, AI development workflows, internal tools, and cross-functional deployment handoffs.",
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
    skillLabel: "What this chapter added",
    items: [
      {
        org: "Ecofirst Taiwan (台灣愛淨股份有限公司)",
        role: "Product Manager",
        period: "2025/3 - Present",
        skillSignal: "Productising field practice: using roadmaps, AI tools, and delivery systems to make good work repeatable.",
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
        skillSignal: "Building B2B product judgement across buyers, administrators, and end users while validating commercial opportunity.",
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
        skillSignal: "Turning ambiguous business problems into aligned product strategy, roadmaps, and cross-functional operating rhythm.",
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
        skillSignal: "Developing systems product sense under delivery pressure: connecting user flow, technical re-platforming, and operating outcomes.",
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
        skillSignal: "Using data definitions and cross-channel behaviour to turn fragmented information into useful services and decisions.",
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
    title: "Contact",
    text: "If your product is stuck between requests, operations, and the people who need to work together, I would be glad to hear what is happening on the ground.",
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
