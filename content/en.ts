import { facts, metricGroups } from "./facts";
import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title:
      "Kevin Hsu | Senior Product Manager | Platform rebuilds and internal systems",
    description:
      "Senior Product Manager with 7+ years of product-related experience, focused on platform rebuilds and internal systems: turning work that used to wait on engineers into workflows PMs can complete on their own, then proving the impact in numbers. Led 10 engineers across projects and directly managed 2 junior PMs.",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "How I use AI", href: "#ai" },
      { label: "Résumé", href: "/en/resume/", depth: true },
      { label: "Portfolio", href: "/en/portfolio/", depth: true },
    ],
    contact: { label: "Contact me", href: "#contact" },
    menuLabel: "Menu",
    switchLabel: "中文",
    switchAria: "切換到中文",
    skipLabel: "Skip to main content",
  },

  hero: {
    eyebrow: "Kevin Hsu | Senior Product Manager · 7+ years | Led 10 engineers | Product contracts about NT$100M",
    kicker:
      "I find the step that caps throughput, then build the tool that removes it: an internal platform built with Claude Code, 748 commits.",
    headline:
      "Find the 【bottleneck】. Build the 【fix】. Prove it in 【numbers】.",
    profile: [
      {
        label: "Scale",
        value: "Led 10 engineers and directly managed 2 junior PMs; product contracts about NT$100M",
      },
      {
        label: "Domains",
        value: "AI energy savings (B2B), e-commerce order-to-delivery, health management apps, cross-channel customer-data platforms, and enterprise training",
      },
      {
        label: "Recognition",
        value: "2022 PMI Taiwan Benchmark Project Merit Award; AWS digital transformation case study",
      },
    ],
    film: {
      caption: "See the internal platform case study",
      caseId: "internal-backend",
      pauseLabel: "Pause film",
      playLabel: "Play film",
      seekLabel: "Film progress",
      fullscreenLabel: "Watch full screen",
      exitFullscreenLabel: "Exit full screen",
      muteLabel: "Mute",
      unmuteLabel: "Unmute",
      chapters: [
        { at: 0, label: "Intro" },
        { at: 11, label: "Now" },
        { at: 17, label: "Results" },
        { at: 41, label: "Growth" },
        { at: 50, label: "Closing" },
      ],
      summary:
        "60-second film. Kevin Hsu, Senior Product Manager. I find the step that caps throughput, then build the tool that removes it. Before: change one cell of data and wait for an engineer, with docs going back and forth, a queue for engineers, and validation only at the end. Now: clarify, prototype, confirm, build, which cut handling a requirement from about 1 month to about 1 week. Hand-built with Claude Code: an internal platform, 748 commits. Customer onboarding fell from about 2 weeks to about 2 hours, and PMs do it themselves (excluding on-site wiring and control strategy). Replying to customers fell from 1 day to 10 minutes. Per site, customization fell from 30% to 10% and issue handling from 30 minutes to 3. Tuning a control strategy fell from 1 week to 2 hours, with 100,000+ combinations tested at once. From 2019 to 2024, leading team delivery: 10 engineers led, shipments of 300 → 1,000 orders/day (+233%), and a 2022 PMI Taiwan Benchmark Project Merit Award. From 2025, building the tools myself, from clarifying needs to a working prototype. Find the bottleneck. Build the fix. Prove it in numbers. See résumé and case studies.",
    },
    primaryCta: { label: "Résumé", href: "/en/resume/" },
    secondaryCta: { label: "See case studies", href: "#work" },
  },

  metrics: {
    title: "Key results",
    items: facts.en,
    groups: metricGroups.en,
  },

  aiPractice: {
    title: "How I solve problems with AI",
    highlightsTitle: "How I solve problems with AI",
    intro:
      "AI proposes, a person decides, and AI earns autonomy only once it proves accurate. Each project below shows the problem, what AI did, what a person decided, and the result.",
    highlights: [
      {
        problem: "100,000+ control settings, tested by hand",
        solution: "Built a simulator with AI that runs and ranks them all.",
        stat: { value: "1 wk → 2 hr", label: "to tune one strategy" },
      },
      {
        problem: "Vendors name sensors differently, and 200 per site were checked by eye",
        solution: "Turned naming rules into an AI tool: PMs upload a list and it converts automatically.",
        stat: { value: "1 hr → 5 min", label: "to build a sensor sheet" },
        caseId: "sensor-naming",
      },
      {
        problem: "Business cards sat on desks and reps typed them into the CRM",
        solution: "Built a LINE bot: snap a photo, and AI files it in Notion CRM.",
        stat: { value: "2,000 cards", label: "moved into Notion CRM" },
        caseId: "namecard",
      },
    ],
    labels: {
      stuck: "Problem",
      ai: "What AI did",
      human: "What a person decided",
      result: "Result",
      source: "Source",
      caseLink: "See the case study",
      read: "Read the post on LinkedIn",
      expand: "How AI and people split the work",
      collapse: "Collapse",
    },
    chapters: [
      {
        id: "ai-build",
        title: "How I build products with AI",
        lead: {
          title: "Internal platform: see which site has a problem at a glance",
          stuck:
            "When a customer asked how their air conditioning was doing, the PM asked an engineer, who dug through Excel. Data problems often surfaced only when reports were being prepared.",
          ai: "I write the requirements and spec, and Claude Code builds it. Every change is reviewed by a second AI model before it merges.",
          human:
            'I define what "data complete" means and which conclusion each screen leads with. A person always presses the deploy button.',
          stat: { value: "34", label: "sites on one screen" },
          result:
            "Merging alerts with the same cause cut 244 missing-data alerts to 12, so a PM sees at a glance which units need attention.",
          source:
            "Site count from the internal platform (2026-10-23). Real data in the screenshot, site names anonymized.",
          caseId: "internal-backend",
          href: "https://www.linkedin.com/feed/update/urn:li:activity:7469732610550976512/",
          image: {
            src: "/portfolio-artifacts/internal-backend-overview.webp",
            alt: "Data overview: one row per site with the out-of-range value and its normal range, data completeness, and the number of units with issues; sites shown as codes",
            width: 1648,
            height: 686,
          },
        },
        items: [
          {
            title: "Control-strategy simulator",
            stuck:
              "Air-conditioning control strategies have more than 100,000 parameter combinations, and they used to be tested by hand, one at a time.",
            ai: "I built a simulator with AI that runs every combination and ranks the results.",
            human:
              "The tool only runs and compares. A person decides which strategy goes live.",
            stat: { value: "1 wk → 2 hr", label: "to tune one strategy" },
            result: "Tuning a control strategy went from 1 week to 2 hours.",
            source: "Tuning time before vs after the tool",
            image: {
              src: "/portfolio-wall/film-8.en.webp",
              alt: "Launch film frame: tuning a control strategy takes 2 hours, with 100,000+ combinations tested at once",
              width: 1600,
              height: 1000,
            },
          },
          {
            title: "AI business-card assistant",
            stuck:
              "Sales reps typed business cards into the company Notion by hand, records were incomplete, and managers struggled to track accounts.",
            ai: "A rep photographs a card in LINE, Gemini reads it, and the contact lands in the company CRM.",
            human:
              "Reps still fill in fields that take judgment, such as deal stage and decision-making influence. AI doesn't make those calls for them.",
            stat: {
              value: "2,000 cards",
              label: "moved from paper into Notion CRM",
            },
            result:
              "Reps actually use it: they entered 80 cards within 4 days.",
            source:
              "Photo vs manual entry time; record count from the company Notion",
            image: {
              src: "/linkedin-posts/post-2.jpg",
              alt: "AI business-card assistant flow: photograph a card, AI reads it, it lands in Notion",
              width: 800,
              height: 446,
            },
            caseId: "namecard",
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
          },
          {
            title: "A clickable prototype as the spec for engineering",
            stuck:
              "Requirements for a new internal platform went back and forth between the CEO, sales, and PMs, and documents alone did not get everyone aligned.",
            ai: "I built 19 clickable screens in 2 days with AI, all on demo data.",
            human:
              "I decided what to build and in what order with the CEO and sales, clicking through the prototype together, then wrote it up as the spec for engineering.",
            stat: { value: "19", label: "screens, built in 2 days" },
            result:
              "Discussions moved from reading documents to clicking through screens, and the prototype became the spec handed to engineering.",
            source: "Prototype git history (Mar 2026)",
            image: {
              src: "/ai-covers/prototype.svg",
              alt: "Illustration: three stacked, clickable internal-platform screens",
              width: 800,
              height: 500,
            },
          },
          {
            title: "This site: I set the spec, AI writes the code",
            stuck:
              "I wanted a site that shows my product skills firsthand, and I had no engineering team.",
            ai: "Claude Code writes the code, motion, and tests from specs, and helps check that the content stays consistent.",
            human:
              "I decide the positioning, what content stays, the layout, and the source of every figure, and I sign off on each release.",
            stat: {
              value: "7 weeks",
              label: "a bilingual site and launch film, built solo",
            },
            result:
              "Working alone, I shipped a bilingual site, a launch film, and an animated portfolio wall, and every push to main deploys automatically.",
            source: "This site's git history (Nov 2026)",
            image: {
              src: "/hero-reel-poster.en.webp",
              alt: "The closing frame of this site's launch film",
              width: 1200,
              height: 750,
            },
            caseId: "resume-site",
          },
        ],
      },
      {
        id: "ai-process",
        title: "How I improve processes with AI",
        lead: {
          title: "Sensor naming without manual mapping",
          stuck:
            "Every vendor names sensor points differently. A site has about 200 points, too many to check by eye, and one wrong match puts errors in the data reports.",
          ai: 'One shared naming tool maps vendor names to standard names, then checks whether values are plausible. It looks only at periods when equipment is running, and anything it cannot judge is marked "can\'t tell", never "normal".',
          human:
            "When the tool is unsure, it asks one question at a time. When nobody knows, it writes a question to forward to the system integrator instead of guessing. It always asks a person about site facts, such as shared or separate chilled-water piping and unit counts.",
          stat: {
            value: "93%",
            label: "of sensors matched correctly on the first try",
          },
          result:
            'A rule change must add a test case first, pass ten automated test suites, and produce zero "confident but wrong" answers before it ships. As of Sep 2026, 34 sites and 7,110 sensor points have been inventoried.',
          source:
            "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01)",
          image: {
            src: "/ai-covers/naming.svg",
            alt: "Illustration: messy vendor names line up as standard names, and the one the tool is unsure of goes to a person",
            width: 800,
            height: 500,
          },
          caseId: "sensor-naming",
        },
        items: [
          {
            title: "Sales FAQ: confirmed answers only",
            stuck:
              "Customer questions were scattered across 1,500+ meeting notes. Reps couldn't find them or tell which answer was the company's official position.",
            ai: "Each week AI drafts FAQ entries from meeting notes with their sources, and flags pricing, warranty, and subsidy questions as highly sensitive.",
            human:
              "Two human approval steps: the sales lead picks the questions, and an answer owner writes the official answer. AI can answer reps only from approved entries.",
            stat: {
              value: "About 50 entries",
              label: "approved answers reps can look up (AI drafted 185)",
            },
            result:
              "The workflow runs end to end. To answer more questions, the next step is faster human review.",
            source: "Sales FAQ database in the company Notion (2026-09-30)",
            image: {
              src: "/ai-covers/faq.svg",
              alt: "Illustration: many questions pass two human approval steps, and only confirmed answers come out",
              width: 800,
              height: 500,
            },
            caseId: "sales-faq",
          },
          {
            title: "AI-written first drafts, from requirements to dev handoff",
            stuck:
              "Requirements took several rounds to pin down. Specs were written and meetings held, and development was still stuck.",
            ai: "Meeting follow-ups, requirements, specs, mock-data checks, and dev handoff are drafted by AI first. Every weekday at 5 pm it turns the day's meetings into to-dos.",
            human: "I review and edit every draft before it goes out.",
            stat: {
              value: "110",
              label:
                "daily meeting follow-ups, drafted by AI and confirmed by me (since Apr 2026)",
            },
            result:
              "Daily meeting follow-ups have reached 110 since Apr 2026, and a person confirms each one before it goes out.",
            source: "Count from the scheduled job's output (Oct 2026)",
            image: {
              src: "/linkedin-posts/ai-product-workflow.en.svg",
              alt: "Product workflow diagram: meeting follow-up, requirements, specs, mock-data checks, and dev handoff, each drafted by AI",
              width: 1200,
              height: 750,
            },
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
          },
        ],
      },
      {
        id: "ai-life",
        title: "How I automate my own life with AI",
        lead: {
          title: "Personal life hub: bills and reminders in one place",
          stuck:
            "Bills and statements arrive by email as PDFs, and I had to open, log, and sort each one by hand. Due dates and renewals were easy to miss.",
          ai: "Built with Claude Code from specs: it fetches bills from email, sorts them, flags duplicate or missing charges, and reminds me before due dates. Day to day, I can log or look up anything with one sentence.",
          human:
            "I set the rules, such as never logging in to online banking, and I confirm and fix the sorting rules when they are wrong.",
          stat: {
            value: "Daily use",
            label: "sorting bills and sending reminders, since Mar 2026",
          },
          result:
            "It runs automatically, and anything that needs my judgment is listed separately.",
          source:
            "Git history of the personal project (2026-10-23). No screenshots or code links, for privacy.",
          image: {
            src: "/ai-covers/life.svg",
            alt: "Illustration: mail becomes sorted receipts, with a reminder on the calendar",
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
    title: "Awards & features",
    items: [
      {
        id: "pmi",
        kind: "award",
        category: "Award",
        year: "2022",
        title: "PMI Taiwan Benchmark Project Award",
        distinction: "Merit Award",
        description:
          "Project work at Fable, spanning process mapping, system rebuilds, and cross-team delivery.",
        link: { label: "See related experience", href: "#experience" },
      },
      {
        id: "aws",
        kind: "feature",
        category: "Featured case study",
        caseId: "grocery",
        title: "AWS digital transformation case study",
        distinction: "Fresh-produce e-commerce",
        description:
          "Led the e-commerce rebuild and AWS migration at Fable; AWS featured it as a digital-transformation case study on The News Lens.",
        link: {
          label: "Read the article (Chinese)",
          href: "https://www.thenewslens.com/feature/aws/250301",
        },
      },
    ],
  },

  cases: {
    title: "Portfolio",
    inventory:
      "{total} case studies: {work} from work, {side} from side projects",
    intro: "Each project's result, and the skills it proves.",
    workTitle: "Case studies",
    allLabel: "See all {total} case studies",
    copyLabel: "Copy case study link",
    copiedLabel: "Link copied",
    copyFallback: "Select and copy the link below.",
    linkLabel: "Open case study",
    backLabel: "Back to portfolio",
    capabilityLabels: {
      used: "Proven skills",
      grown: "Skills learned",
      cardUsed: "Skills",
      cardGrown: "Learned",
    },
    decisionLabel: "The decision I made",
    readLabel: "See case study",
    roleLabel: "Role",
    scopeLabel: "Scope",
    collaborationLabel: "Worked with",
    artifactsLabel: "Deliverables",
    dataMap: {
      title: "What data it combines, and what that shows",
      sources: "Data combined",
      insight: "What it shows",
    },
    measurementLabel: "How it was measured",
    ownershipLabel: "What I owned",
    decisionLog: {
      title: "Decision log",
      call: "Decision",
      signal: "Evidence",
      outcome: "Outcome",
    },
    sourceLabel: "View source code",
    columns: {
      situation: "Situation",
      bottleneck: "Bottleneck",
      decision: "Decision",
      hypothesis: "Execution",
      result: "Result",
    },
    items: [
      {
        id: "internal-backend",
        org: "Ecofirst (台灣愛淨)",
        period: "Apr 2026 - Oct 2026",
        rank: 1,
        title:
          "Internal platform: from waiting on engineers to a customer-ready screen in 2 hours",
        homeTitle: "Internal platform: onboarding from about 2 weeks to about 2 hours",
        role: "Senior Product Manager (planning and build)",
        scope:
          "34 sites | Site management, data collection, customer energy dashboard",
        collaboration:
          "Project PMs, data-collection engineers, sales, and the software team",
        impact:
          "Onboarding: about 2 weeks waiting on engineers → about 2 hours, PM self-serve (excluding on-site wiring and control strategy) | 34 sites (Oct 2026)",
        scenarios: [
          {
            name: "Site management",
            stuck: "PMs waited on an engineer to change one cell",
            now: "PMs download, edit, upload, and check on their own",
          },
          {
            name: "Data collection",
            stuck:
              "Data problems often surfaced only when reports were being prepared",
            now: "The overview shows which unit has a problem and who should handle it",
          },
          {
            name: "Customer data",
            stuck:
              "Until savings accumulated, the customer's executives had no screen to look at",
            now: "Customers have a screen to look at during onboarding",
          },
        ],
        capabilities: {
          used: ["Problem framing", "Data definitions"],
          grown: [
            "AI-assisted prototyping",
            "Taking prototypes to production with engineering",
          ],
        },
        ownership:
          "I defined the problem and what success meant, wrote the platform blueprint for the general manager, and decided what to build and what to leave out. I built it with working prototypes and AI, listened to the people who would use it, revised it, then turned it into production features with the software team, reaching 748 commits by Oct 2026.",
        situation:
          "Each site's sensor list sat in a different file. To change one cell or answer a client about a site, a PM had to ask an engineer first.",
        bottleneck:
          "Onboarding a site meant waiting about 2 weeks on engineers. Data problems often surfaced only when reports were being prepared. Until savings accumulated, the customer's executives had no screen to look at.",
        decision:
          "Remove the handoff between PMs and engineers by putting download, upload, and checks in one place, and give customers a screen before savings results arrive.",
        decisionSummary:
          "Remove the handoff between PMs and engineers, so PMs onboard sites themselves.",
        hypothesis:
          "If PMs can finish sensor testing themselves, onboarding no longer waits on engineers' schedules.",
        result: ["PM onboarding a site: about 2 weeks → about 2 hours (excluding on-site wiring and control strategy)", "Handoffs per round of sensor-point testing: 4 → 0", "Sites on the platform: 9 → 34 (May to Oct 2026)", "Single-site customization: 30% → 10%", "Requirement handling: about 1 month → about 1 week (validated with prototypes first)"],
        artifacts: ["Sensor-list download, upload, and checks", "Data-return overview and health page", "Customer energy dashboard prototype"],
        measurement:
          "Site and commit counts come from the internal platform and git (Oct 2026). About 2 weeks and about 2 hours are my first-hand experience and exclude on-site wiring and control strategy. Upload counts cover the period since launch; about 1 hour saved per upload is my estimate. Site names in screenshots are anonymized.",
        measurementSummary:
          "Onboarding time: first-hand experience; tasks and hours: company task database",
        article: {
          lead: "Three problems came one after another: PMs waiting on engineers to change data, data errors found too late, and customer decision makers with no screen to look at. Each time, I built a working version, listened to the people who would use it, revised it, and then made it a real feature with R&D.",
          sections: [
            {
              id: "site-management",
              trait: "Site management",
              heading:
                "Engineers weren't slow; every cell edit just had to go through them",
              stat: {
                value: "20+ uploads",
                label:
                  "by PMs on their own since launch, each saving engineers about 1 hour (estimate)",
              },
              paragraphs: ["To change one cell in a sensor list, a PM had to ask an engineer for the file, hand back the edits, wait for the upload, and repeat on any error. I removed that handoff: PMs now download, edit, upload, and check the returned data themselves."],
              figure: {
                src: "/portfolio-artifacts/internal-backend-flow-en.svg",
                alt: "Before and after flow: previously a PM and an engineer handed work back and forth 4 times per round; now the PM downloads, edits, uploads, and checks alone, with 0 handoffs",
                caption:
                  "4 handoffs per round before; PMs now finish it alone.",
                width: 1480,
                height: 760,
              },
              moreFigures: [
                {
                  src: "/portfolio-artifacts/internal-backend-timeseries.webp",
                  alt: "Time-series chart: 3.5 days of power use for 4 chillers, with data completeness of 98.5% marked above",
                  caption:
                    "Values and data completeness right after upload.",
                  width: 1536,
                  height: 936,
                },
              ],
            },
            {
              id: "data-collection",
              trait: "Data collection",
              heading:
                "The first standard was too strict, so I redefined what complete data means",
              stat: {
                value: "244 → 12",
                label: "missing-data alerts (after merging by cause)",
              },
              paragraphs: ["Once PMs could upload on their own, the next problem was data errors surfacing only at report time. The first version of the checks stalled because its standard was too strict. I redefined complete data as under 5% missing, then counted alerts by unit instead of by rule, with each problem showing the actual value and who should take it."],
              figure: {
                src: "/portfolio-artifacts/internal-backend-site-health.webp",
                alt: "Data-collection health page: the first line reads 7 units with issues out of 22 checked, followed by negative cooling, power, and flow readings, each marked for the data-collection engineer",
                caption:
                  "Conclusion first, then the problems. Site name anonymized.",
                width: 1648,
                height: 549,
              },
            },
            {
              id: "customer-view",
              trait: "Customer data",
              heading:
                "Show decision makers a screen before the savings arrive",
              stat: {
                value: "1 day",
                label: "to build the second prospect's energy dashboard",
              },
              paragraphs: ["\"We need something the hospital director can see,\" one hospital said. I built a working dashboard prototype. Sales saw it and said two things were missing: how the results translate into money saved, and how control would work going forward. To reassure customers, we had to make the business value and the forecast clear, so I added the estimated benefit after adoption and the coming week's plan, and R&D made it a real feature. For a second prospect, an electronics plant, config changes alone rebuilt it in a day; every benefit is labeled as an estimate."],
              figure: {
                src: "/portfolio-artifacts/internal-backend-warroom.webp",
                alt: "Energy dashboard demo screen with four numbered areas: live chilled-water status, estimated benefit after adoption, the coming week's plan, and automatic control of auxiliary equipment, with every benefit labeled as estimated",
                caption:
                  "Demo screen with simulated figures; client name replaced.",
                width: 1632,
                height: 1000,
              },
            },
          ],
          closing:
            "The internal platform covers 34 sites (Oct 2026). If you want to talk through the tradeoffs, get in touch.",
        },
      },
      {
        id: "grocery",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 2,
        title: "Grocery e-commerce: 300 → 1,000 orders/day (+233%)",
        homeTitle: "Grocery e-commerce: 300 → 1,000 orders/day (+233%)",
        role: "Senior Project Manager",
        scope: "NT$6.2M | Web/app | Orders, warehouse, AWS",
        collaboration:
          "Product, engineering, client operations, warehouse logistics, and AWS teams",
        impact: "Shipments: 300 → 1,000 orders/day (+233%)",
        capabilities: {
          used: ["Bottleneck analysis", "Cross-system coordination"],
          grown: ["Warehouse capacity assessment"],
        },
        ownership:
          "Worked on site with the client's COO across departments; mapped inbound-to-shipping; redesigned the shipping mode, slips, storage locations, and picking flow; aligned the storefront, back office, app, and AWS rebuild.",
        situation:
          "Pandemic demand overwhelmed the storefront, back office, and app of a fresh-produce business with about NT$200M in annual revenue.",
        bottleneck:
          "Mapping every step from inbound through picking to delivery identified picking as the primary constraint; transport was outsourced and outside this work.",
        decision:
          "Tackled the picking bottleneck first, moving from next-day to same-day delivery and redesigning shipping slips, storage locations, and the picking flow; then improved the existing site's architecture and rebuilt the storefront, back office, app, and AWS stack in phases.",
        decisionSummary:
          "Changed the shipping mode, slips, and storage locations to clear the picking bottleneck, then rebuilt the systems in phases.",
        hypothesis:
          "Used one shared priority list across product, engineering, warehouse, and operations to get through peak season first, then rebuild in phases.",
        result: [
          "Shipments: 300 → 1,000 orders/day (+233%)",
          "Picking efficiency up 30% (average time to ship an order)",
          "Platform revenue grew 120% during the program (team result)",
          "AWS later featured the project",
        ],
        artifacts: [
          "Project overview",
          "Order-flow map",
          "Industry and product analysis",
          "QA scripts",
          "Project knowledge base",
        ],
        measurement:
          "Compared daily shipments before and after the rebuild, and average time to ship an order before and after the storage and shipping-slip redesign. The AWS digital-transformation feature provides public evidence; revenue growth was a team outcome during the program.",
        measurementSummary: "Daily shipments: before vs after",
      },
      {
        id: "health-app",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 3,
        title: "Health management app: DAU +66% in a year (team result)",
        homeTitle: "Health management app: DAU +66% in a year (team result)",
        role: "Senior Project Manager",
        scope: "Health management app | User flows | IoT scales | Data migration | Localization",
        collaboration:
          "Client product, engineering, data migration, IoT, and localization partners",
        impact: "DAU: 12,000 → 20,000 in one year (+66%, team result)",
        capabilities: {
          used: [
            "User interviews",
            "User flow design",
            "Prioritization",
            "QA and acceptance testing",
          ],
          grown: ["Data migration risk management", "IoT data integration"],
        },
        ownership:
          "Led interviews, competitor analysis, workshops, requirement focus, prioritization, and QA acceptance.",
        situation:
          "A health management app with about NT$800M in annual revenue needed a rebuild: engagement had room to grow, and sharing health data was inconvenient and incomplete, adding to health coaches' workload. It also needed IoT scales, event registration, localization, and legacy-data migration.",
        bottleneck:
          "Legacy fields, IoT data, and new feature flows didn't match, which blocked a safe migration and made the app hard to use.",
        decision:
          "Turned interview scenarios into wireframes, user stories, and PRDs to focus requirements: connected scales for weigh-in check-ins to lift engagement and improved the sharing flow; aligned parameter and translation tables before development.",
        decisionSummary:
          "Focused requirements through interviews, redesigned weigh-in check-ins and sharing, then reduced migration and localization risk.",
        hypothesis:
          "Used interviews, competitor research, and client workshops to prioritize work, then designed QA around real use cases.",
        result: [
          "Relaunched the app and completed migration",
          "Made health-data sharing easier and more complete, easing the load on health coaches",
          "DAU: about 12,000 → 20,000 within one year (+66%, team result)",
        ],
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
        title: "Customer data: 5 channels and 10 million records connected",
        role: "Product Manager",
        scope: "CDP | Chatbots | Web tracking | Dashboards | POS",
        collaboration: "UX, sales, marketing, product, and data teams",
        impact: "3 industries × 5 channels | 10M records integrated",
        capabilities: {
          used: ["Target-account validation", "Cross-functional interviews"],
          grown: ["Customer data architecture", "Tracking plans"],
        },
        ownership:
          "Planned the CDP, chatbots, tracking, and dashboards; led biweekly alignment across the product and data teams.",
        situation:
          "Chatbot (LINE, Facebook), website, e-commerce, and POS data were fragmented, hiding each customer's source and purchase behavior and making segment-based marketing hard.",
        bottleneck:
          "Channel formats and identity rules differed; the data needed structuring and matching before it could form Customer 360 views.",
        decision:
          "Validated the entry point through 30 target accounts and cross-functional interviews, then combined existing product features into an MVP.",
        decisionSummary:
          "Tested the entry point with 30 target accounts and cross-functional interviews before settling on the MVP.",
        hypothesis:
          "Used a biweekly cadence to align product and data delivery across the CDP, chatbots, tracking, and dashboards.",
        result: [
          "Connected five channels",
          "Integrated 10M records across retail, e-commerce, and real estate",
          "Built Customer 360 views",
          "Enabled clients to target customer segments with marketing automation",
        ],
        artifacts: [
          "Product roadmap",
          "MVP interview plan",
          "Customer-data strategy",
          "Metrics knowledge base",
          "Data-product PRDs",
        ],
        measurement:
          "Measured structured and connected records plus channel coverage; the 10M figure is the total across all three industries.",
        measurementSummary:
          "Record volume and channel coverage after integration",
      },
      {
        id: "sensor-naming",
        org: "Ecofirst",
        period: "Aug 2026 - Oct 2026",
        rank: 6,
        title:
          "Sensor naming: building a sensor list went from 1 hour to 5 minutes",
        role: "Senior Product Manager (planning and build)",
        scope:
          "34 sites, 7,110 sensors (Sep 2026) | Shared by data return and simulation",
        collaboration:
          "Project PMs, data-collection engineers, software engineers, and system integrators",
        impact:
          "Sensor-sheet creation: 1 hour → 5 minutes | 93% right first time across 72 sensors",
        capabilities: {
          used: ["HVAC domain knowledge", "Naming rule design"],
          grown: [
            "Evaluating AI accuracy",
            "Designing human review for low-confidence cases",
          ],
        },
        ownership:
          "I built the sensor mapping workbook and defined the flow, the rules, and the release gate. I used Claude Code to turn the mapping into naming rules, and every dictionary change starts with a new test case.",
        situation:
          "Each site's list of sensor points (every value read from the equipment) comes from a different vendor. Everyone names points differently, so the same point has several spellings.",
        bottleneck:
          "A site has about 200 sensors, too many to check by eye, and one wrong match breaks the data report.",
        decision:
          "Mapped standard names to vendor spellings, had Claude turn the map into rules, and made it an AI tool PMs can use directly.",
        decisionSummary:
          "Turned naming rules into an AI tool: PMs upload a list and it converts automatically.",
        hypothesis:
          "Keep naming rules in one place so one change applies everywhere; anything only the site knows goes to a person.",
        result: ["Sensor-sheet creation: 1 hour → 5 minutes", "72 sensors run end to end: 93% right first time", "Inventory of all sites: 34 sites, 7,110 sensors (Sep 2026)"],
        artifacts: ["Sensor mapping workbook", "Company-wide naming program", "Automated tests and question bank"],
        measurement:
          "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01); 1 hour and 5 minutes are my first-hand experience.",
        measurementSummary:
          "Creation time: my first-hand experience; accuracy: 72-point walkthrough",
        article: {
          lead: "One sensor might arrive as \"CH-1 chilled water outlet temp\" or \"CHL01_TCHS\". A site has about 200 of them, too many to check by eye.",
          sections: [
            {
              id: "rules",
              trait: "AI adoption",
              heading:
                "Turning naming rules into an AI tool",
              stat: {
                value: "1 tool",
                label:
                  "for naming, shared by data collection and simulation analysis",
              },
              paragraphs: ["I mapped standard names to the ways vendors write them, had Claude turn the map into rules, and made it an AI tool PMs can use directly. The rules live in one program, so one change applies everywhere."],
              figure: {
                src: "/ai-covers/naming-core.svg",
                alt: "Illustration: data collection and analysis both connect to one naming tool in the middle, with a person-approved dictionary on the right",
                caption:
                  "Two workflows share one naming tool; two maintainers sign off on the dictionary.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "self-serve",
              trait: "Workflow redesign",
              heading:
                "PMs upload a list and AI converts it",
              paragraphs: ["PMs upload a new sensor list and AI converts it by rule, so nobody checks it by eye. Anything a name can't reveal, such as unit counts, always goes to a person. Some sensor points are new to the dictionary, so I clarify them with the PM and then add them."],
            },
          ],
          closing:
            "Want to talk about doing this on your site data? Get in touch.",
        },
      },
      {
        id: "sales-faq",
        org: "Ecofirst",
        period: "Apr 2026 - Sep 2026",
        rank: 7,
        title: "Sales FAQ: reps only get confirmed answers",
        homeTitle: "Sales FAQ: customer response from 1 day to 10 minutes",
        role: "Senior Product Manager (process design)",
        scope:
          "Meeting-note analysis | Two human approval steps | Q&A tool for sales",
        collaboration:
          "Sales, the sales lead, and the manager who owns official answers",
        impact:
          "Customer response: 1 day → 10 minutes | About 50 approved answers reps can look up",
        capabilities: {
          used: ["Review workflow design", "Approval management"],
          grown: ["Finding bottlenecks in human-in-the-loop workflows"],
        },
        ownership:
          "I designed the workflow, the approval steps, and what AI may and may not do, and I write and maintain the prompts for the scheduled job and the Q&A tool.",
        situation:
          "Customer questions were scattered across 1,500+ meeting notes and transcripts. Reps couldn't find them or tell which answer was the company's official position.",
        bottleneck:
          "Letting AI answer reps directly is fast, but a wrong answer becomes a promise to a customer, and pricing, warranty, and subsidy questions are expensive to get wrong.",
        decision:
          "Split it into draft, review, and use: AI only drafts, two human approval steps set the answer, and the Q&A tool returns only approved answers.",
        decisionSummary:
          "AI drafts, two people decide, and the Q&A tool returns only approved answers.",
        hypothesis:
          "Choosing questions is a sales call and setting answers is a company commitment, so different people do each.",
        result: ["Customer response: 1 day → 10 minutes", "Faster ramp-up for reps", "About 50 approved answers reps can look up (AI drafted 185; people approve before release)"],
        artifacts: ["Weekly FAQ draft schedule", "Two human review gates", "Q&A entry that cites only confirmed answers"],
        measurement:
          "Counts from the Sales FAQ database in the company Notion (2026-09-30); response time is my first-hand experience. No client names included.",
        measurementSummary: "Response time: my first-hand experience; counts: Sales FAQ database (2026-09-30)",
        article: {
          lead: "When a client asks about security, warranty, or subsidies, a rep needs one answer they can say on the spot, but answers were buried in 1,500+ meeting notes.",
          sections: [
            {
              id: "draft",
              trait: "AI adoption",
              heading: "AI drafts, and can never approve its own answers",
              paragraphs: ["A weekly job reads meeting notes, picks questions clients really asked, and drafts answers with sources; pricing, warranty, and subsidy questions are flagged as sensitive."],
              figure: {
                src: "/ai-covers/faq.svg",
                alt: "Illustration: many questions pass two human approval steps, and only confirmed answers come out",
                caption:
                  "AI drafts, two people decide, and the Q&A tool returns only approved answers.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "gates",
              trait: "Process mapping",
              heading: "Two approval steps for two kinds of judgment",
              paragraphs: ["Sales leads decide which questions stay, and an owner writes the company's official answer. I first planned to send each question to a manager and update answers as they came in, but that wouldn't hold up long term. So I built up a set of guidelines instead: answer every question from them first, then keep adding to them."],
            },
            {
              id: "entry",
              trait: "Systems and data",
              heading: "If it isn't there, say so",
              paragraphs: ["Reps ask in their own words and AI cites only confirmed answers; when nothing matches, it names who to ask instead of guessing."],
              figure: {
                src: "/ai-covers/faq-entry.svg",
                alt: "Illustration: a rep's question comes back with a sourced answer, or with the person to ask instead",
                caption:
                  "Answers cite their source; when nothing matches, the tool points to the right person instead of making up an answer.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "Want to talk about gates for your knowledge base? Get in touch.",
        },
      },
      {
        id: "namecard",
        kind: "side",
        org: "Side project",
        period: "Jul 2025 - Jul 2026",
        rank: 8,
        title:
          "AI business-card assistant: architecture follows the business model",
        role: "Product owner and builder",
        scope:
          "Snap a card in LINE → AI reads it → it lands in the company Notion",
        collaboration:
          "Used by the sales team and a few friends; built with Cursor and Claude Code, with Gemini reading the cards",
        impact:
          "2,000 paper business cards moved into Notion CRM | Built both an internal tool and a SaaS product",
        capabilities: {
          used: ["Business model planning", "Product architecture"],
          grown: ["Scaling back architecture based on usage data"],
        },
        ownership:
          "I planned the business models and the product architecture, and built each one: an internal tool, a multi-tenant SaaS, then a lean version sized to real usage.",
        situation:
          "Sales reps typed business cards into the company Notion by hand, so records were patchy, and managers couldn't track accounts, tell whether a contact had decision-making power, or calculate sales KPIs.",
        bottleneck:
          "A card shows a name and phone number, but the CRM needs judgment calls. Letting AI fill those fields would mean a model judging for the rep.",
        decision:
          "Start as an internal tool matched to the company CRM, with judgment fields left to sales. Then test it as a SaaS product with multi-tenancy and subscription plans. When usage showed no need for that, scale back to a lean architecture.",
        decisionSummary:
          "Settle the business model first; the architecture follows it.",
        hypothesis:
          "PMs used to write specs and wait for engineering; now I can turn each business model into a working architecture and let real usage pick the one to keep.",
        result: [
          "Reps add a contact with a photo",
          "Managers track accounts in Notion",
          "I tested the SaaS bet against real usage before scaling it back",
        ],
        artifacts: [
          "LINE business-card assistant",
          "Company CRM field map",
          "Multi-tenant admin with subscription plans",
          "Infrastructure audit report",
          "Single-service architecture after the cut",
        ],
        measurement:
          "Card count from the Notion CRM. The build history backs the rest: field mapping (Aug 2025), judgment handed to sales (Sep 2025), audit (Jul 2026).",
        measurementSummary: "Card count: Notion CRM",
      },
      {
        id: "life-hub",
        kind: "side",
        org: "Side project",
        period: "Mar 2026 - Oct 2026",
        rank: 10,
        title: "Personal life hub: bills and reminders in one place",
        role: "Product owner and developer",
        scope:
          "Bills from email | Payment and renewal reminders | Plain-language logging | Personal dashboard",
        collaboration:
          "Built solo with Claude Code; every feature starts as a spec",
        impact: "In daily use since Mar 2026 | Never logs in to online banking",
        capabilities: {
          used: ["Data pipeline design", "Privacy-first design"],
          grown: ["Scheduled automation", "Long-term maintenance"],
        },
        ownership:
          "I set the requirements, rules, and architecture; Claude Code builds from the specs, and I confirm and fix the sorting rules.",
        situation:
          "Bills and statements arrive by email as PDFs, and I had to open, log, and sort each one by hand. Due dates and renewals live in different places and are easy to miss.",
        bottleneck:
          "Most ready-made tools pull data by logging in to online banking, and I didn't want to hand bank credentials to any program.",
        decision:
          "Read only the bills in my mailbox, never log in to online banking, and keep data in my own database, with all reads and writes going through a single command.",
        decisionSummary:
          "Email bills only, no online-banking login, data stays with me.",
        hypothesis:
          "Most of what needs recording already arrives by email, so reading, sorting, and reminding every day removes the need to touch a bank account.",
        result: [
          "It fetches mail, sorts bills, flags duplicate or missing charges, and reminds me before due dates (since the schedule was blocked, it catches up when Claude Code opens)",
          "Day to day, I can log or look up anything with one sentence",
          "In daily use since Mar 2026, with 117 commits and automated tests guarding every change",
        ],
        artifacts: [
          "Daily mail fetch and bill parsing",
          "Sorting, duplicate, and missed-charge checks",
          "Payment and renewal reminders",
          "Plain-language logging and lookup",
          "Personal dashboard",
          "Specs and automated tests",
        ],
        dataMap: [
          {
            sources:
              "Credit card statements, bank deposit and transfer notices, e-wallet records",
            insight:
              "Monthly income, spending, and balance on one page; transfers between my own accounts are never counted twice, and a recurring charge that fails to show up gets flagged.",
          },
          {
            sources:
              "Broker trade confirmations and statements, public ex-dividend data from the stock exchange, daily closing prices and exchange rates",
            insight:
              "Holdings are valued automatically, with no spreadsheet, and buying or selling shares counts as moving assets, not spending.",
          },
          {
            sources:
              "A year of real card spending, plus verified reward rules for each card with their valid dates",
            insight:
              "Which card each recurring charge should go on to earn the most; foreign charges are compared after the foreign transaction fee, and expired or unverified rules are left out.",
          },
          {
            sources:
              "Salary, interest, and dividends, plus this year's income tax and supplementary health insurance rules",
            insight:
              "An estimate of next year's income tax, plus a warning when interest passes the savings deduction or a single dividend triggers the supplementary health insurance premium.",
          },
          {
            sources:
              "Interest, dividend, and fund payout records, plus average living costs over the last 12 months",
            insight:
              "How much passive income current holdings should bring in a year, which months it lands in, and what share of living costs it covers.",
          },
        ],
        measurement:
          "Commit count from personal git history (2026-10-23). No screenshots, code links, amounts, or transaction counts, for privacy.",
        measurementSummary: "Personal git history (Oct 2026)",
        article: {
          lead: "Bills arrive by email every month, and each one has to be opened, logged, and sorted, with due dates and renewals to remember. None of it is hard; it is just tedious enough to slip through the cracks.",
          sections: [
            {
              id: "rule",
              trait: "Business judgment",
              heading: "One rule first: never log in to online banking",
              paragraphs: [
                "Many finance tools pull data by logging in to online banking. I studied an open-source project with a clean deployment setup, but it signs in to banks through an automated browser, so I borrowed only its deployment approach and not its data collection. Data comes only from the bills in my mailbox.",
              ],
            },
            {
              id: "pipeline",
              trait: "Systems and data",
              heading: "One path: mail, bills, database, dashboard",
              paragraphs: [
                "It reads mail, parses bill PDFs, sorts them, and writes everything to one database; transfers and duplicates are flagged, and a recurring charge that fails to appear triggers a reminder. Every command can output machine-readable data, so other tools can plug in.",
              ],
              figure: {
                src: "/ai-covers/life-pipeline.svg",
                alt: "Illustration: mail becomes parsed documents, goes into a database, and shows up on a dashboard",
                caption:
                  "Mail, bill parsing, database, dashboard, without touching a bank account.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "roles",
              trait: "AI adoption",
              heading:
                "Nine roles that connect only when events really affect each other",
              paragraphs: [
                "Claude switches between nine roles by topic, such as bookkeeping, health, legal, and household, but they connect only when events really affect each other. A doctor's visit is logged, added to health records, and checked for a claim; lunch is only logged, without analyzing anything else.",
              ],
              figure: {
                src: "/ai-covers/life-roles.svg",
                alt: "Illustration: nine roles in a ring, with only the three touched by the same event lit and connected",
                caption:
                  "Nine roles in a ring; one event wakes only the roles it really touches.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "catchup",
              trait: "Measured results",
              heading: "When the schedule was blocked, it learned to catch up",
              paragraphs: [
                "From late May 2026 a system permission started blocking the daily mail fetch, and the log filled with failures. Instead of switching the check off, I made it catch up every time Claude Code opens; next, I plan to move it to a cloud schedule so the computer doesn't need to be on.",
              ],
              figure: {
                src: "/ai-covers/life-catchup.svg",
                alt: "Illustration: a blocked schedule clock beside a terminal window that caught up successfully",
                caption:
                  "When the schedule fails, it doesn't force the run; it catches up the next time I start work.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "This project has no growth curve, only one person who uses it every day. It is practice for the same habit: set the rules first, then let AI do the work.",
        },
      },
      {
        id: "resume-site",
        kind: "side",
        org: "Side project",
        period: "Sep 2026 - Nov 2026",
        rank: 11,
        title: "Resume site: treating a job search as a product",
        role: "Product owner and developer",
        scope:
          "Bilingual site | Launch film | Animated wall | Printable résumé | Automatic deploys",
        collaboration:
          "Built solo with Claude Code; important changes start as a spec",
        impact:
          "7 weeks, 90+ commits | Every push to main deploys to Cloudflare",
        capabilities: {
          used: [
            "Positioning and information architecture",
            "Content fact-checking",
          ],
          grown: [
            "Motion design and CSS 3D animation",
            "Cloudflare deployment",
          ],
        },
        ownership:
          "I decide positioning, what stays, layout, and acceptance; Claude Code builds from the specs, and I confirm the source of every figure.",
        situation:
          "I have eight roles and a set of case studies, but a résumé only holds conclusions. Hiring managers want to see how I make decisions and what I built, and one document can't show that.",
        bottleneck:
          "The site kept growing: the same projects had several entry points, and as a hiring manager I wouldn't have read it myself. Figures sat in different files and contradicted each other after every edit.",
        decision:
          "Iterate the site like a product: rebuild when the positioning is wrong, cut when it's too full, and write retired claims into a test that runs before each release.",
        decisionSummary:
          "Iterate the site like a product: rebuild when the positioning is wrong, cut when it's too full, and test that retired claims stay gone.",
        hypothesis:
          "Readers use this site as they judge it, so the site is itself a work sample: motion, speed, and consistent content all show how I build products.",
        result: [
          "90+ commits in 7 weeks",
          "Chinese and English versions, with a launch film, an animated wall, and a printable résumé",
          "Every push to main deploys to Cloudflare Workers",
          "The positioning changed several times and git keeps each version: evidence-led, AI builder, operations PM, and now platform rebuilds and internal systems",
        ],
        artifacts: [
          "A bilingual launch film generated from HTML with HyperFrames",
          "A CSS-only 3D wall where every tile opens its case study",
          "Automatic Cloudflare Workers deploys, configured in the repo",
          "Pre-release tests on the built site that catch retired claims",
          "Bilingual content and a printable résumé page",
        ],
        measurement:
          "Commit counts and dates come from this site's git history (Sep 14 to Nov 3, 2026). They show effort, not job-search results. The admin tool for tailored links isn't hosted yet, so it is not counted as a result.",
        measurementSummary: "This site's git history (Nov 2026)",
      },
    ],
  },

  experience: {
    title: "Experience",
    intro: "",
    currentLabel: "Now",
    expandLabel: "View role details",
    collapseLabel: "Hide role details",
    expandAllLabel: "Expand all",
    collapseAllLabel: "Collapse all",
    items: [
      {
        id: "ecofirst",
        org: "Ecofirst Taiwan (台灣愛淨節能科技股份有限公司)",
        role: "Senior Product Manager",
        period: "Mar 2025 - Oct 2026",
        focus:
          "AI energy-saving HVAC, internal tools, and cross-functional delivery",
        homeHighlight: "Cut onboarding from about 2 weeks to about 2 hours and customization from 30% to 10%",
        summary:
          "Owned the B2B AI HVAC energy-saving product, roadmap, and internal platform, leading 4 engineers. Contracts totaled about NT$100M, and customers saved about 15% on energy on average.",
        bullets: [
          "Cut customization from 30% to 10%, saving ~370 hours a year (estimate): abstracted repeated requests into control strategies, then documented and parameterized them",
          "Cut per-site issue handling from 30 to 3 minutes: detection rules put issues from 34 sites on one page for 2 PMs",
          "Cut sensor-sheet creation from 1 hour to 5 minutes: turned naming rules into an AI tool, so PMs upload a list and it converts automatically (72-point sample: 93% right first time)",
          "Cut onboarding from about 2 weeks to about 2 hours: built an internal platform with Claude Code (748 commits) so PMs no longer wait on engineers (excludes on-site wiring and control strategy)",
          "Cut customer response from 1 day to 10 minutes: distilled recorded meetings into an AI Q&A bot of about 50 questions, which also shortens ramp-up",
          "Cut control-strategy tuning from 1 week to 2 hours: built an AI simulator that tests 100,000+ combinations",
          "Built an AI business-card LINE bot, moving 2,000 cards into Notion CRM: salespeople snap a photo and AI files it, replacing manual entry",
        ],
        bulletGroups: [{ label: "Lower cost: customization from 30% to 10%, issue handling and sensor-sheet time down 90%+", count: 3 }, { label: "Higher output: onboarding from about 2 weeks to about 2 hours, customer response from 1 day to 10 minutes", count: 4 }],
      },
      {
        id: "advisory",
        org: "Freelance",
        role: "Independent Consultant | Operations digitization and fundraising",
        period: "Sep 2024 - Feb 2025",
        focus: "Operations redesign and fundraising in energy and hospitality",
        homeHighlight: "Brought 2 fundraising deals worth about NT$170M into due diligence",
        summary: "",
        bullets: [
          "Brought 2 fundraising deals worth about NT$170M into investor due diligence: clarified business models, coached pitch decks, and built data rooms for energy and hospitality companies",
          "Analyzed 106 Airbnb listings: found a 90%-occupancy room type (Taipei average 65%) to position 2 hotels",
          "Mapped workflows for 3 departments at the energy company and rolled out Asana",
        ],
      },
      {
        id: "sat",
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "Nov 2023 - Aug 2024",
        focus:
          "Enterprise training, online learning, and Hong Kong market entry",
        homeHighlight: "First-week revenue above NT$1M, entering Hong Kong within 3 weeks",
        summary: "",
        bullets: [
          "First-week revenue above NT$1M: entered the Hong Kong market within 3 weeks",
          "Mapped and redesigned HR leave, expense-claim, and customer-service flows",
          "Interviewed HR teams and planned a learning-data dashboard for corporate training",
        ],
      },
      {
        id: "consulting",
        org: "Freelance",
        role: "Independent Consultant | Product and project management workflows",
        period: "Jun 2023 - Nov 2023",
        focus:
          "Project management workflows, product management workflows, and internal workshops",
        summary: "",
        bullets: [
          "Raised project management efficiency about 20% (estimate): PMs on a 15-person outsourcing team used separate tools and struggled to report progress; moved all reporting into Notion",
          "Mapped product management for a multinational rental-management SaaS, from business goals and roadmap to delivery, and ran internal workshops to improve it",
        ],
      },
      {
        id: "huayao",
        org: "Hua Yao Industrial (華曜興業有限公司)",
        role: "Senior Operations Manager",
        period: "Nov 2022 - May 2023",
        focus: "Supply-chain and warehouse operations",
        summary: "",
        gapAfter: "Aug 2022 - Oct 2022 | Career break and freelance work",
        bullets: [
          "Built a product database joining customer, shipping, and purchasing data; redesigned warehouse locations and product categories",
        ],
      },
      {
        id: "fable",
        org: "Fable (寓意科技)",
        role: "Senior Project Manager",
        period: "Mar 2021 - Jul 2022",
        focus: "E-commerce and health management app rebuilds, cross-functional delivery",
        homeHighlight: "Grocery shipments 300 → 1,000 orders/day (+233%); PMI Benchmark Project Merit Award",
        summary:
          "Managed an NT$12M+ client project portfolio, leading 10 engineers across projects and directly managing 2 junior PMs; won the 2022 PMI Taiwan Benchmark Project Merit Award.",
        bullets: [
          "Scaled grocery shipments from 300 to 1,000 orders a day (+233%): mapped inbound to shipping on site and set one priority list across departments, surviving peak season before a phased rebuild; AWS featured it as a case study",
          "Improved picking efficiency 30% (average time to ship an order): moved shipping from next-day to same-day delivery and redesigned shipping slips, storage locations, and the picking flow",
          "Health management app DAU: 12,000 → 20,000 (+66%, team result): in one year, redesigned the user flows from user interviews and added IoT weigh-in check-ins",
        ],
      },
      {
        id: "oakda",
        org: "Oakda (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "Jun 2020 - Dec 2020",
        focus: "Customer data platforms, chatbots, and dashboards",
        homeHighlight: "Led a 12-person team to launch a CDP integrating 10M customer records",
        summary: "",
        bullets: [
          "Integrated 10M customer records across 3 industries: led a 12-person team to launch a CDP across 5 channels for segment-based marketing automation",
        ],
      },
      {
        id: "zhongshuo",
        org: "Zhongshuo Investment Consulting",
        role: "Product Assistant",
        period: "Feb 2019 - Jun 2020",
        focus: "Market research, prototyping, and early product validation",
        summary: "",
        bullets: [
          "2 companies I helped incubate each passed NT$1M in revenue: mapped business models and competitors, found new growth directions, and planned lower-risk use of existing resources",
        ],
      },
    ],
  },

  contact: {
    kicker: "Find the bottleneck. Build the fix. Prove it in numbers.",
    title: "Let's talk about the next product opportunity.",
    text: "If your team is stuck on delivery or cross-team workflows and wants AI in daily work, let's talk.",
    cta: { label: "Contact me", href: "mailto:kevin492625@gmail.com" },
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/chengze-hsu/",
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
      "Redesigned shipping, slips, and storage locations\nthen rebuilt the site, app, and AWS stack",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders queue at picking: 300 orders/day.",
      "Changed the shipping mode, slips, and storage locations, then rebuilt the site, app, and AWS stack.",
      "Shipments reached 1,000 orders/day, while platform revenue grew 120% (team result).",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing, and shipping; picking becomes the bottleneck, and after changing the shipping mode, slips, and storage locations and rebuilding the systems, throughput rises from 300 to 1,000 orders/day.",
  },
} satisfies SiteContent;
