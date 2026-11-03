import { facts } from "./facts";
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
      { label: "AI in practice", href: "#ai" },
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
    eyebrow: "Kevin Hsu | Senior Product Manager · 7+ years in product",
    kicker: "Platform rebuilds and internal systems: I turn work that waits on engineers into workflows PMs can finish on their own.",
    headline:
      "Find the 【bottleneck】. Build the 【fix】. Prove it in 【numbers】.",
    profile: [
      {
        label: "Focus",
        value:
          "Senior Product Manager · Platform rebuilds and internal systems",
      },
      {
        label: "Domains",
        value:
          "AI energy savings (B2B), e-commerce order-to-delivery, health apps, cross-channel customer-data platforms, and enterprise learning",
      },
      {
        label: "Looking for",
        value:
          "A company with clearly defined team roles, data-driven product decisions, and an active effort to redesign how people work with AI",
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
      chapters: [
        { at: 0, label: "Intro" },
        { at: 12, label: "Six skills" },
        { at: 42.2, label: "Three habits" },
        { at: 56.8, label: "Closing" },
      ],
      summary:
        "67-second film. The spec is written, the meeting is over, and nothing runs yet. For a PM in the AI era, building is no longer the hard part. These six skills are: problem framing, rapid experimentation, prototyping, workflow redesign, cross-team delivery, and data interpretation; each role expanded that chart. Then three working habits. Curious: when a new tool appears, I try it hands-on, from Claude Code and Cursor to Gemini and Notion AI. I built an AI business-card assistant with Cursor and Gemini, working through failed OCR and a rebuilt Git setup all the way to deployment: snap a card, Gemini reads it, Notion files it. Willing to try: with limited coding background, I built an internal platform with Claude Code, 218 commits in 2 months. Chasing efficiency: a control-strategy simulator cut tuning from 1 week to 2 hours, and customer onboarding fell from about 2 weeks to about 2 hours, done by PMs themselves. Find the bottleneck. Build the fix. Prove it in numbers. Kevin Hsu, Senior Product Manager · Platform rebuilds and internal systems.",
    },
    primaryCta: { label: "Résumé", href: "/en/resume/" },
    secondaryCta: { label: "See case studies", href: "#work" },
  },

  metrics: {
    title: "Key results",
    items: facts.en,
  },

  aiPractice: {
    title: "AI in practice",
    intro:
      "AI proposes, a person decides, and AI earns autonomy only once it proves accurate. Each project below shows the problem, what AI did, what a person decided, and the result.",
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
              src: "/ai-covers/tools.svg",
              alt: "Illustration: two sets of figures side by side, with settings adjusted from the result",
              width: 800,
              height: 500,
            },
            caseId: "ecofirst",
          },
          {
            title: "AI business-card assistant",
            stuck:
              "Sales reps typed business cards into the company Notion by hand, records were incomplete, and managers struggled to track accounts.",
            ai: "A rep photographs a card in LINE, Gemini reads it, and the contact lands in the company CRM.",
            human:
              "Reps still fill in fields that take judgment, such as deal stage and decision-making influence. AI doesn't make those calls for them.",
            stat: { value: "99% less", label: "time to log a card, vs manual entry" },
            result: "Reps actually use it: they entered 80 cards within 4 days.",
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
            stuck: "I wanted a site that shows my product skills firsthand, and I had no engineering team.",
            ai: "Claude Code writes the code, motion, and tests from specs, and helps check that the content stays consistent.",
            human: "I decide the positioning, what content stays, the layout, and the source of every figure, and I sign off on each release.",
            stat: { value: "7 weeks", label: "a bilingual site and launch film, built solo" },
            result: "Working alone, I shipped a bilingual site, a launch film, and an animated portfolio wall, and every push to main deploys automatically.",
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
            "Every vendor sends sensor lists in a different format, and PMs mapped each line to the company's standard names by hand. The 10 to 20% automated matching could not handle often sat unresolved, so engineers got half-finished lists.",
          ai: 'One shared naming tool maps vendor names to standard names, then checks whether values are plausible. It looks only at periods when equipment is running, and anything it cannot judge is marked "can\'t tell", never "normal".',
          human:
            "When the tool is unsure, it asks one question at a time. When nobody knows, it writes a question to forward to the system integrator instead of guessing. It always asks a person about site facts, such as shared or separate chilled-water piping and unit counts.",
          stat: { value: "93%", label: "of sensors matched correctly on the first try" },
          result:
            'A rule change must add a test case first, pass ten automated test suites, and produce zero "confident but wrong" answers before it ships. As of Sep 2026, 31 sites and 4,491 sensor rows have been inventoried.',
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
            stat: { value: "51 entries", label: "approved answers reps can look up (AI drafted 185)" },
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
              label: "daily meeting follow-ups, drafted by AI and confirmed by me (since Apr 2026)",
            },
            result:
              "Daily meeting follow-ups have reached 110 since Apr 2026, and a person confirms each one before it goes out.",
            source:
              "Count from the scheduled job's output (Oct 2026)",
            image: {
              src: "/linkedin-posts/ai-product-workflow.en.svg",
              alt: "Product workflow diagram: meeting follow-up, requirements, specs, mock-data checks, and dev handoff, each drafted by AI",
              width: 1200,
              height: 750,
            },
            caseId: "ecofirst",
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
          stat: { value: "Daily use", label: "sorting bills and sending reminders, since Mar 2026" },
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
        items: [
          {
            title: "Podcast knowledge base",
            stuck:
              "Long product interviews run for hours, and I can't listen to every episode.",
            ai: "AI pulls the captions and turns them into notes on people, companies, concepts, and ideas in my own knowledge base.",
            human:
              "I choose which shows to follow, how notes are organized, and how duplicates merge.",
            stat: { value: "3,500+", label: "notes" },
            result:
              "When I need a product idea, I search my notes instead of replaying episodes.",
            source: "Note count in the personal knowledge base (2026-10-23)",
            image: {
              src: "/ai-covers/knowledge.svg",
              alt: "Illustration: a long audio track becomes linked notes",
              width: 800,
              height: 500,
            },
          },
          {
            title: "Finance channel digest",
            stuck: "I follow more finance channels than I have time to watch.",
            ai: "Every morning it detects new videos, pulls captions, has AI summarize them, and posts the summaries to Discord, with a weekly digest on Sundays.",
            human:
              "After reading, I decide what to dig into and how to judge it.",
            stat: { value: "8 am daily", label: "summaries posted" },
            result:
              "Instead of watching every video, I skim the summaries to see what each channel is covering.",
            source: "Run log of the personal schedule (2026-10-23)",
            image: {
              src: "/ai-covers/digest.svg",
              alt: "Illustration: several videos condensed into one summary sent to a phone",
              width: 800,
              height: 500,
            },
          },
          {
            title: "Building my own AI tools, then measuring them",
            stuck:
              "I wanted AI to choose on its own which skills (pre-written procedures) to use and how hard to think, but didn't know whether that helped.",
            ai: "I built two Claude Code add-ons: one picks skills and thinking effort, and one shows what each AI helper is doing when several run at once.",
            human:
              "Using a control group, I compared 839 logged turns, found that automatic skill selection barely helped, and raised the threshold based on the data.",
            stat: { value: "839", label: "logged turns compared, showing automatic skill selection barely helped" },
            result:
              "The skill-pick threshold went up based on the data, and the other features stay in use.",
            source: "Usage log and review of the tools (2026-10-14 to 10-19)",
            image: {
              src: "/ai-covers/tools.svg",
              alt: "Illustration: two sets of results compared side by side, with a setting moved based on them",
              width: 800,
              height: 500,
            },
          },
        ],
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
    inventory: "{total} case studies: {work} from work, {side} from side projects",
    intro: "Each project's result, and the skills I used and learned.",
    workTitle: "Case studies", 
    allLabel: "See all {total} case studies",
    copyLabel: "Copy case study link",
    copiedLabel: "Link copied",
    copyFallback: "Select and copy the link below.",
    linkLabel: "Open case study",
    backLabel: "Back to portfolio",
    capabilityLabels: {
      used: "Skills used",
      grown: "Skills learned",
      cardUsed: "Used",
      cardGrown: "Learned",
    },
    decisionLabel: "The decision I made",
    fullProcessLabel: "See the full process",
    fullProcessCollapse: "Collapse",
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
        role: "Senior Product Manager (planning and build)",
        scope:
          "34 sites | Site management, data collection, customer energy dashboard, energy savings",
        collaboration:
          "Project PMs, data-collection engineers, sales, and the software team",
        impact:
          "Onboarding: about 2 weeks waiting on engineers → about 2 hours, PM self-serve (excluding on-site wiring and control strategy) | 34 sites (Oct 2026)",
        capabilities: {
          used: ["Problem framing", "Data definitions"],
          grown: ["AI-assisted prototyping", "Taking prototypes to production with engineering"],
        },
        ownership:
          "I defined the problem and what success meant, wrote the platform blueprint for the general manager, and decided what to build and what to leave out. I built it with working prototypes and AI, then turned it into production features with the software team.",
        situation:
          "Each site's list of sensor points (every value read from the equipment) sat in different files and versions. A PM who wanted to change one cell had to go through an engineer, and answering any customer question about a site meant asking an engineer first.",
        bottleneck:
          "Onboarding a site meant waiting about 2 weeks on engineers. Data problems often surfaced only when reports were being prepared. Until savings accumulated, the customer's executives had no screen to look at.",
        decision:
          "Instead of speeding up the ticket process, remove the handoff: put download, upload, and checks in one place, and give customers a screen before savings results arrive.",
        decisionSummary:
          "Remove the handoff between PMs and engineers, and give decision makers a screen before savings results arrive.",
        hypothesis:
          "If PMs can test sensor points themselves, onboarding stops depending on engineers' schedules. If data is defined before it is checked, problems surface before customers see them. A working prototype confirms what a customer wants faster than a slide deck.",
        decisionLog: [
          {
            call: "Count by equipment on the overview, and merge missing-data alerts with the same cause into one.",
            signal:
              'At one hotel, counting by rule read "37 judged, 4 in violation, 73 untested"; counting by equipment read "17 checked, 4 with issues". 244 "often missing" alerts merged into 12.',
            outcome:
              "PMs see at a glance which units need work, and the 4 real problems with readings, previously buried, move to the top.",
          },
          {
            call: "The system picks energy-savings points by name, so PMs don't configure each site, but its guesses are never pre-selected on the form.",
            signal:
              "Savings can be calculated for 28 of 34 sites; a PM once took a pre-selected guess as fact.",
            outcome:
              "People enter only contract numbers such as targets and baselines; the system's guesses are marked separately until someone confirms them.",
          },
          {
            call: "Calculate savings as total power ÷ total refrigeration tons, even though it differs from past reports.",
            signal:
              "A simple average gives low-load nights and full-load days one vote each and inflates the number; dividing totals matches the electricity bill.",
            outcome:
              "The old method stayed until there was a clear reason to change, and both decisions are on record.",
          },
          {
            call: "Days already calculated stay as they were: each change to refrigeration-ton settings is logged as a version and takes effect the next day.",
            signal:
              "Applying new settings at read time would change past numbers with every edit.",
            outcome:
              "Every change leaves an effective date, and earlier days keep their original results.",
          },
          {
            call: "A person presses the button for every production release; passing tests alone never trigger a release.",
            signal: 'The team had been burned by "tests pass, so it deploys".',
            outcome:
              "After merge, tests, and design checks pass, a person still decides when it goes live.",
          },
        ],
        result: [
          "PM onboarding: about 2 weeks → about 2 hours, self-serve (excluding on-site wiring and control strategy)",
          "Handoffs per round of sensor-point testing: 4 → 0",
          "Sites on the platform: 9 → 34 (May to Oct 2026)",
          "Alerts at one site: 244 merged into 12",
        ],
        artifacts: [
          "Sensor-list download, upload, and checks",
          "Data-collection overview and health page",
          "Monitoring rules PMs can write themselves",
          "Customer energy dashboard prototype",
          "Energy-savings statistics",
          "AI-assisted development process",
        ],
        measurement:
          "Task counts and hours come from the company task database (Jan to Jul 2026; some hours were never logged, so these are minimums). Site and commit counts come from the internal platform and git (Oct 2026). About 2 weeks and about 2 hours are my first-hand experience and exclude on-site wiring and control strategy. Upload counts cover about 1 month after launch; about 1 hour saved per upload is my estimate. Site names in screenshots are anonymized.",
        measurementSummary:
          "Onboarding time: first-hand experience; tasks and hours: company task database",
        article: {
          lead: '"We need a screen the hospital director can look at." A hospital said this in a sales meeting. Savings take time to accumulate, and back then a PM had to wait about 2 weeks on engineers just to get a site\'s data in place. I treated that wait as a product problem.',
          sections: [
            {
              id: "no-handoff",
              trait: "Problem framing",
              heading:
                "Engineers weren't slow; every cell edit just had to go through them",
              stat: {
                value: "4 → 0",
                label: "handoffs per round of sensor-point testing",
              },
              paragraphs: [
                "Each site has a sensor list recording every value read from its equipment. Lists are rarely right the first time, yet to change one cell a PM had to ask an engineer for the current version, hand back the edits, wait for the upload, and go around again if the check failed.",
                "Task records show at least 54 such tasks in six months but only 32 logged hours, because the time PMs spent waiting was never recorded. So instead of optimizing the ticket flow, I removed the handoff.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-flow-en.svg",
                alt: "Before and after flow: previously a PM and an engineer handed work back and forth 4 times per round; now the PM downloads, edits, uploads, and checks alone, with 0 handoffs",
                caption:
                  "Before and after | 4 handoffs per round of testing became a loop the PM runs alone.",
                width: 1480,
                height: 760,
              },
            },
            {
              id: "self-serve",
              trait: "Workflow redesign",
              heading: "Download, upload, and check in one place",
              stat: {
                value: "~2 weeks → ~2 hours",
                label:
                  "PM self-serve onboarding (excludes on-site wiring and control strategy)",
              },
              paragraphs: [
                "Now a PM downloads the list, edits it, and uploads it; the system updates itself, and the PM checks the incoming data on the same page. If something is wrong, the PM repeats the loop. Engineers are freed from repetitive upkeep, and sites on the platform grew from 9 to 34 (May to Oct 2026).",
                "There were tradeoffs too. I added per-minute aggregation to make the files easier to read, and removed it the same week. Downloads must reconcile row by row with the source; convenience can't come at the cost of verifiability.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-timeseries.webp",
                alt: "Time-series chart: 3.5 days of power use for 4 chillers, with data completeness of 98.5% marked above",
                caption:
                  "Time series | Check the values right after uploading: 3.5 days of power for 4 chillers, with 98.5% data completeness marked above.",
                width: 1536,
                height: 936,
              },
            },
            {
              id: "disprove",
              trait: "Measured results",
              heading: "Define what complete data means, then let the data prove me wrong",
              stat: {
                value: "244 → 12",
                label: "missing-data alerts (after merging by cause)",
              },
              paragraphs: [
                "PMs used to read site emails, pull data, and report errors to the software team, so problems often surfaced only when reports were being prepared. Data-collection tasks alone came to at least 64 tickets and 62.5 hours in six months. Now issues sit on one page, and PMs diagnose them first. I started by defining complete data: under 5% missing, with anything that can't be determined marked separately. Then I changed alerts from counting rules to counting equipment, and every issue now states the actual value and who should handle it.",
                "I had planned to let PMs set thresholds. Then I audited 8,129 readings at one hotel and found that the 18 human-set rules had caught 0 anomalies; every real problem came from checks that need no setup. So I put the no-setup checks first.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-site-health.webp",
                alt: "Data-collection health page: the first line reads 7 units with issues out of 22 checked, followed by negative cooling, power, and flow readings, each marked for the data-collection engineer",
                caption:
                  "Data-collection health | Conclusion first, then the issues, such as CHL03 cooling output reading −16.56 RT. Site names anonymized.",
                width: 1648,
                height: 549,
              },
            },
            {
              id: "customer-view",
              trait: "Business judgment",
              heading:
                "Show decision makers a screen before the savings arrive",
              stat: {
                value: "1 day",
                label: "to build the second prospect's energy dashboard",
              },
              paragraphs: [
                "Savings take time, but a customer's executives want to see something now, and sales only had slides. So I built a working dashboard prototype that puts outdoor air conditions, cooling load, the AI's suggested supply temperature, and projected savings on one screen. The prototype defined the layout and the calculations, and the software team turned it into a production feature.",
                'The second prospect was an electronics manufacturer. I made the layout configuration-driven, built it in a day, and numbered four steps in the order a decision maker reads the screen, so sales could walk through them. Every benefit is labeled "estimated": a prospect is seeing a promise, not a track record.',
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-warroom.webp",
                alt: "Energy dashboard demo screen with four numbered areas: live chilled-water status, estimated benefit after adoption, the coming week's plan, and automatic control of auxiliary equipment, with every benefit labeled as estimated",
                caption:
                  "Energy dashboard | Demo screen with simulated numbers; customer name and building photo replaced. The four areas follow the order a decision maker reads the screen.",
                width: 1632,
                height: 1000,
              },
            },
            {
              id: "ai-workflow",
              trait: "AI adoption",
              heading: "Built with AI, kept in check by process",
              paragraphs: [
                "Each feature starts with a requirements brief, goes to AI to build, and merges only after a second AI model reviews it; a person presses the button for every release. That process added up to 748 commits without taking time from the software team's schedule.",
              ],
            },
          ],
          closing:
            "The internal platform covers 34 sites (Oct 2026). In the roughly 1 month since uploads launched, PMs have uploaded on their own 20+ times, each saving engineers about 1 hour (estimate). If you want to talk through the tradeoffs, get in touch.",
        },
      },
      {
        id: "grocery",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 2,
        title: "Fresh-produce e-commerce, rebuilt",
        role: "Senior Project Manager",
        scope: "NT$6.2M | Web/app | Orders, warehouse, AWS",
        collaboration:
          "Product, engineering, client operations, warehouse logistics, and AWS teams",
        impact: "Picking capacity: 300 → 1,000 orders/day (+233%)",
        capabilities: {
          used: ["Bottleneck analysis", "Cross-system coordination"],
          grown: ["Warehouse and delivery capacity assessment"],
        },
        ownership:
          "Mapped order-to-delivery; aligned storefront, back office, app, and AWS rebuild.",
        situation:
          "Pandemic demand overwhelmed the storefront, back office, and app of a fresh-produce business with about NT$200M in annual revenue.",
        bottleneck:
          "End-to-end mapping identified picking and transport capacity as the primary constraints.",
        decision:
          "Fixed picking and transport capacity first, then rebuilt the storefront, back office, app, and AWS architecture around the order-to-delivery flow.",
        decisionSummary:
          "Removed warehouse and transport constraints first, then rebuilt the storefront, back office, and AWS stack together.",
        hypothesis:
          "Used one shared priority list across product, engineering, warehouse, and operations to get through peak season first, then rebuild in phases.",
        result: [
          "Picking capacity: 300 → 1,000 orders/day (+233%)",
          "Platform revenue grew 120% during the program",
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
        capabilities: {
          used: ["User interviews", "Prioritization", "QA and acceptance testing"],
          grown: ["Data migration risk management", "IoT data integration"],
        },
        ownership:
          "Led interviews, competitor analysis, workshops, prioritization, and QA acceptance.",
        situation:
          "A health app with about NT$800M in annual revenue needed rebuild, IoT scales, event registration, localization, and legacy-data migration.",
        bottleneck:
          "Legacy fields, IoT data, and new feature flows didn't match, which blocked a safe migration and made the app hard to use.",
        decision:
          "Turned interview scenarios into wireframes, user stories, and PRDs; aligned parameter and translation tables before development.",
        decisionSummary:
          "Wrote specs from real user scenarios first, then reduced migration and localization risk.",
        hypothesis:
          "Used interviews, competitor research, and client workshops to prioritize work, then designed QA around real use cases.",
        result: [
          "Launched the new platform and completed migration",
          "DAU: about 12,000 → 20,000 within one year (+66%)",
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
        title: "Connecting customer data",
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
          "LINE, Facebook, website, e-commerce, and POS data were fragmented, hiding each customer's source and purchase behavior.",
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
        id: "ecofirst",
        org: "Ecofirst (台灣愛淨)",
        period: "Mar 2025 - Oct 2026",
        rank: 5,
        relatedCases: ["internal-backend", "sensor-naming", "sales-faq"],
        alsoDid: {
          title: "Also improved how the company runs",
          bullets: [
            "Maintained the software team's job-level and performance-review system and designed its skills matrix: every skill is verified in person, and a skill counts as covered only with at least one expert and two people who can do it, so no skill depends on one person",
            "AI drafts an FAQ from sales meetings every week, and only human-approved answers can be cited; pricing and contract topics are flagged as sensitive",
            "Created a standard process for opening and closing accounts when people join or leave; before someone leaves, it requires an asset inventory, an access handover, and a named owner for every item",
          ],
        },
        title: "AI energy product: connecting sales and engineering in one workflow",
        role: "Senior Product Manager",
        scope:
          "4 engineers | About NT$100M in contracts | Roadmap, AI development, internal tools",
        collaboration: "Software, project, sales, and site-operations teams",
        impact:
          "17 databases linking sales to engineering | Delivery time down 30% (estimate)",
        capabilities: {
          used: ["Operating model design", "Requirements standards"],
          grown: ["Data-driven management of the sales-to-engineering handoff"],
        },
        ownership:
          "Designed and maintained the Notion operating model for the sales and software teams, plus the requirements and presales rules.",
        situation:
          "The AI HVAC product was at an early stage, and site information lived in LINE, email, and personal laptops; sales and engineering had to chase people for timelines and requirements.",
        bottleneck:
          "Sales promised dates on gut feel, requirements reached development half written, and nobody could measure rush jobs, overload, or who was waiting on whom.",
        decision:
          "Split the sales-to-engineering system into six layers: data, relations, computation, views, rules, and AI; delivery dates start at requirements sign-off.",
        decisionSummary:
          "Sales to engineering as a six-layer architecture; delivery dates start at requirements sign-off.",
        hypothesis:
          "17 databases hold business cards, accounts, projects, sales updates, and engineering tasks. One account card shows the owner, stage, and decision maker. Formulas calculate sales cycle days, rush jobs, delays, and weekly capacity, and sales, PMs, and engineering each get a workspace. Requirement templates, a ticket calendar, and presales sizing set the rules, and AI drafts the FAQ, glossary, and requirements.",
        decisionLog: [
          {
            call: 'Presales quotes a tier, not person-days: S/M/L/XL, and contracts say "N weeks after specs and data are complete", never "N weeks after signing".',
            signal:
              "From Jan to Jul 2026, 735 tasks took about 920 hours, and 51% of that work went to single-site customization.",
            outcome:
              "No date until scope is locked, and XL starts with a paid assessment. These figures are the pre-change baseline behind the decision, not a result.",
          },
          {
            call: "Delivery dates start at T=0, not the contract date: T=0 is the day data is complete and the PM signs off on the requirements doc.",
            signal:
              "Each project's data-complete date, requirements sign-off date, and engineering estimate, plus days spent in each of the 8 sales stages.",
            outcome:
              "Delivery dates share one starting point, and a delay can be traced to data, requirements, or development.",
          },
          {
            call: "The PM's target date and engineering's estimate are recorded separately instead of being merged into one deadline.",
            signal:
              "The gap between the two dates, the rush-job count, and weekly capacity across 4 engineers.",
            outcome:
              "Formulas flag rush jobs automatically, so schedule conflicts are argued with numbers, not memory.",
          },
          {
            call: "Presales work is sized S, M, L, or XL, with three gates: G0, G1, G2.",
            signal:
              "How many back-and-forth rounds a requirement takes before sign-off.",
            outcome:
              "Requirement sign-off dropped from 4-5 rounds to 1-2 (internal estimate).",
          },
          {
            call: "Every request records its first-reply time, against a 24-hour reply standard.",
            signal: "First-reply time per request.",
            outcome:
              "Instead of chasing people, sales can now track engineering's reply time as a number.",
          },
          {
            call: "Scheduled AI jobs only draft, and a person finalizes. If a run fails, the job reports the failure instead of making up results, and each run is capped at 20 items.",
            signal:
              "Whether the scheduled jobs actually deliver: 110 daily meeting follow-ups since Apr 2026.",
            outcome:
              "Meeting follow-ups keep running, and a person checks each one before it goes out.",
          },
        ],
        result: [
          "Requirement sign-off: 4-5 rounds → 1-2 (internal estimate)",
          "Sales can now track engineering's reply time instead of chasing people",
          "Shared tools and modular control strategies cut delivery time on related projects by 30% (estimate)",
          "The system holds 1,639 sales updates and 1,829 engineering tasks",
          "AI drafts FAQ entries from a pool of 1,500+ meeting notes: 44 notes processed, 185 entries drafted, 51 approved through human review (Sep 2026)",
        ],
        artifacts: [
          "Operating data model across 17 databases",
          "Formulas for rush jobs, delays, and capacity",
          "Workspaces for sales, PMs, and engineering",
          "Requirement templates, ticket calendar, and presales rules",
          "AI drafting for the FAQ, glossary, and requirements",
          "Internal platform (has its own case study)",
          "Control-strategy simulator",
        ],
        measurement:
          "Delivery time is an estimate; architecture and counts come from the company Notion (Oct 2026), with no customer names or amounts.",
        measurementSummary:
          "Delivery time: estimate; architecture and counts: company Notion",
      },
      {
        id: "sensor-naming",
        org: "Ecofirst",
        period: "Aug 2026 - Oct 2026",
        rank: 6,
        title: "Sensor naming: no more mapping vendor lists by hand",
        role: "Senior Product Manager (planning and build)",
        scope:
          "One shared naming tool | Data collection and simulation analysis | Naming dictionary and test set",
        collaboration:
          "Project PMs, data-collection engineers, software engineers, and system integrators",
        impact:
          "93% correct on the first try across 72 sensors | 0 confident-but-wrong answers",
        capabilities: {
          used: ["HVAC domain knowledge", "Naming rule design"],
          grown: ["Evaluating AI accuracy", "Designing human review for low-confidence cases"],
        },
        ownership:
          "I defined the flow, the rules, and the release gate. The naming tool was built with Claude Code, and every dictionary change starts with a new test case.",
        situation:
          "Every vendor sends sensor lists in a different format, and PMs mapped each line to the company's standard names by hand. The same naming rule lived in three tool guides and drifted apart.",
        bottleneck:
          "The 10 to 20% automated matching could not handle often sat unresolved, so engineers received half-finished lists, and data gaps showed up only after a 185 MB output file was built.",
        decision:
          "Keep one naming tool for the whole company, called by both data collection and analysis. When the tool is unsure, it asks a person one question at a time, and it always asks a person about site facts.",
        decisionSummary:
          "One naming tool: when it is unsure, it asks a person, and it always asks about site facts.",
        hypothesis:
          "Pull the rules out of every tool into one place so a change takes effect everywhere, and add a real test case before every rule change so the test set blocks confident-but-wrong answers.",
        result: [
          "In a 72-sensor walkthrough, 93% matched right the first time, with 0 confident-but-wrong answers",
          "The PM settled 13 questions on the spot and forwarded 11 to the system integrator",
          "The same rules have been used to inventory 31 sites and 4,491 sensor rows",
        ],
        artifacts: [
          "One shared naming tool",
          "Naming dictionary (9 sheets)",
          "Ten automated test suites and a test set",
          "One-question-at-a-time review",
          "Questions ready to forward to integrators",
          "Team handbook",
        ],
        measurement:
          "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01); the comparison with and without the tool used 3 test cases. No manual-hours baseline exists, so no time saving is claimed.",
        measurementSummary:
          "72-point walkthrough and site inventory (Sep 2026)",
        article: {
          lead: 'A vendor sends a sensor list where "CH-1 chilled water supply temp", "Chiller1 outlet", and "CHL01_TCHS" are the same point. The PM maps each line to the company\'s standard name, and the 10%-plus that automated matching can\'t handle tends to sit unresolved.',
          sections: [
            {
              id: "one-core",
              trait: "Process mapping",
              heading: "One rule, changed in one place",
              stat: {
                value: "1",
                label: "naming tool shared by data collection and analysis",
              },
              paragraphs: [
                "The same naming rule used to live in three tool guides; fixing one left the other two out of date. I moved the rules and the plausible value ranges into one tool that every workflow calls, and a workflow on an outdated version stops instead of quietly using old rules.",
              ],
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
              id: "ask",
              trait: "AI adoption",
              heading:
                "When the tool is unsure, it asks one question at a time",
              stat: {
                value: "93%",
                label:
                  "of sensors matched right the first time (72-point walkthrough)",
              },
              paragraphs: [
                "Every point gets a confidence score; low scores go to a review list that asks the PM one question at a time with a suggested answer. When the PM doesn't know either, it writes a question to forward to the system integrator instead of guessing.",
              ],
              figure: {
                src: "/ai-covers/naming.svg",
                alt: "Illustration: messy vendor names line up as standard names, and the one the tool is unsure of goes to a person",
                caption:
                  "In this walkthrough the PM settled 13 questions on the spot and forwarded 11 to the integrator.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "facts",
              trait: "Systems and data",
              heading: "Always ask a person about site facts",
              paragraphs: [
                "Whether chilled-water piping is shared or separate, how many units there are, how many flow meters: none of that follows from a name. Written as a rule, that assumption silently goes wrong at the next site, so these points get a confidence score of zero and always need a person.",
              ],
            },
            {
              id: "gate",
              trait: "Measured results",
              heading: "No rule change without a test case first",
              stat: {
                value: "84 of 189",
                label: "test cases the old tool failed, caught before the rewrite",
              },
              paragraphs: [
                "I turned every rule in the old tool into a test case, and the old version got 84 wrong. Since then every dictionary change needs a new test case first, ten automated test suites, and zero confident-but-wrong answers before it ships.",
              ],
              figure: {
                src: "/ai-covers/naming-gate.svg",
                alt: "Illustration: a stack of passed test cases stands in front of a rule change, which goes through only after them",
                caption:
                  "Every rule change must pass the test set; three failures that had gone unnoticed became test cases once they were fixed.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "The hardest part was teaching the AI when to stop and ask a person. If you want to do the same with your own field data, let's talk.",
        },
      },
      {
        id: "sales-faq",
        org: "Ecofirst",
        period: "Apr 2026 - Sep 2026",
        rank: 7,
        title: "Sales FAQ: reps only get confirmed answers",
        role: "Senior Product Manager (process design)",
        scope: "Meeting-note analysis | Two human approval steps | Q&A tool for sales",
        collaboration:
          "Sales, the sales lead, and the manager who owns official answers",
        impact:
          "51 approved answers reps can look up (AI drafted 185) | Human review is the bottleneck",
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
          "Picking questions is a sales judgment (will customers ask this?), and setting the answer is a company commitment (can we say this?), so different people own them, and AI can never mark its own answer as usable.",
        result: [
          "185 valid FAQ entries so far, 51 (28%) approved and available to reps",
          "Another 130 are waiting for the sales lead, 78 of them with answers already written",
          "The workflow runs end to end; the next step is faster human review",
        ],
        artifacts: [
          "Weekly FAQ drafting schedule",
          "Answers in two lengths: 30-second and full",
          "Two human approval steps",
          "A Q&A tool that cites approved answers only",
          "Process brief for the general manager",
        ],
        measurement:
          "Counts from the Sales FAQ database in the company Notion (live query, 2026-09-30); schedule and entry rules from the 2026-09-21 versions. No client names or outcome figures included.",
        measurementSummary: "Sales FAQ database counts (2026-09-30)",
        article: {
          lead: "When a customer asks a rep about security, warranty, or subsidies, the rep needs one answer they can give on the spot. The answers were spread over 1,500+ meeting notes, and different people answered the same question differently.",
          sections: [
            {
              id: "draft",
              trait: "AI adoption",
              heading: "AI drafts, and can never approve its own answers",
              paragraphs: [
                "Every Friday a scheduled job reads up to 12 meeting notes, picks questions customers actually asked and will ask again, and writes a 30-second version and a full version with links to the source meeting. It checks existing entries first so duplicates aren't created, and flags pricing, warranty, and subsidy questions as highly sensitive.",
              ],
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
              paragraphs: [
                "The sales lead decides which questions are worth keeping, and an owner writes the company's official answer. Picking questions is a sales judgment and answering them is a company commitment. With the two separated, the sales lead doesn't need every technical detail and the owner doesn't need to read every meeting note.",
              ],
            },
            {
              id: "entry",
              trait: "Systems and data",
              heading: "If it isn't there, say so",
              paragraphs: [
                "Reps ask in their own words. AI cites only approved entries, and each answer includes its entry number. When nothing matches, it lists what it searched and points the rep to engineering, a manager, or legal; with the rep's OK, the question goes into the next round of review.",
              ],
              figure: {
                src: "/ai-covers/faq-entry.svg",
                alt: "Illustration: a rep's question comes back with a sourced answer, or with the person to ask instead",
                caption:
                  "Answers cite their source; when nothing matches, the tool points to the right person instead of making up an answer.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "human-bottleneck",
              trait: "Measured results",
              heading: "The data shows human review is what needs to speed up",
              stat: {
                value: "51 entries",
                label: "approved answers reps can look up (AI drafted 185)",
              },
              paragraphs: [
                "130 entries sit at the first approval step, and 78 of them already have answers waiting for sign-off. Instead of making AI run faster, I brought this to the general manager, along with how quickly meeting notes should be processed, as decisions with options.",
              ],
              figure: {
                src: "/ai-covers/faq-backlog.svg",
                alt: "Illustration: a tall stack of unprocessed meeting notes and drafted entries queued for human approval",
                caption:
                  "44 of the 1,500+ meeting notes have been processed so far; most drafted entries are waiting for human review.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "Writing the prompt is the easy part of letting AI answer customer-facing questions. The hard part is deciding who can approve an answer. If you are setting up approval steps for your own knowledge base, let's talk.",
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
          "Time to log a card down 99% | Built both an internal tool and a SaaS product",
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
          "Photo-to-record time, comparing manual entry with a photo. The build history backs the rest: field mapping (Aug 2025), judgment handed to sales (Sep 2025), audit (Jul 2026).",
        measurementSummary: "Photo-to-record time: manual entry vs a photo",
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
          "Commit count from personal git history (2026-10-23). No screenshots, code links, amounts, or counts, for privacy.",
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
              stat: {
                value: "Daily use",
                label: "sorting bills and sending reminders, since Mar 2026",
              },
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
        title: "This site: treating a job search as a product",
        role: "Product owner and developer",
        scope: "Bilingual site | Launch film | Animated wall | Printable résumé | Automatic deploys",
        collaboration: "Built solo with Claude Code; important changes start as a spec",
        impact: "7 weeks, 86 commits | Every push to main deploys to Cloudflare",
        capabilities: {
          used: ["Positioning and information architecture", "Content fact-checking"],
          grown: ["Motion design and CSS 3D animation", "Cloudflare deployment"],
        },
        ownership:
          "I decide positioning, what stays, layout, and acceptance; Claude Code builds from the specs, and I confirm the source of every figure.",
        situation:
          "I have eight roles and a set of case studies, but a résumé only holds conclusions. Hiring managers want to see how I make decisions and what I built, and one document can't show that.",
        bottleneck:
          "The site kept growing: the same projects had several entry points, and as a hiring manager I wouldn't have read it myself. Figures sat in different files and contradicted each other after every edit.",
        decision:
          "Iterate the site like a product: rebuild when the positioning is wrong, cut when it's too full, and write retired claims into a test that runs before each release.",
        decisionSummary: "Iterate the site like a product: rebuild when the positioning is wrong, cut when it's too full, and test that retired claims stay gone.",
        hypothesis:
          "Readers use this site as they judge it, so the site is itself a work sample: motion, speed, and consistent content all show how I build products.",
        result: [
          "86 commits in 7 weeks",
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
    intro:
      "",
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
        summary:
          "Owned the B2B AI HVAC energy-saving product, roadmap, and internal platform, leading 4 engineers. Contracts totaled about NT$100M, and customers saved about 15% on energy on average.",
        bullets: [
          "Cut customer onboarding from about 2 weeks to about 2 hours: 3 PMs now set up sensor points in the internal platform across 34 sites (excluding wiring and control strategy), and handoffs per round dropped from 4 to 0",
          "20+ self-serve uploads in about 1 month: each saves engineers about 1 hour (estimate); led the work from requirements through build with Claude Code, across 748 commits",
          "Cut requirement handling from about 1 month to about 1 week: switched a data-management project from PRD-first to prototype-first to align on problems and solutions; built the second prospect's energy dashboard in 1 day",
          "Cut delivery time on related projects by 30% (estimate): built shared tools and modular control strategies instead of one-off internal tools",
          "PMs diagnose data issues themselves: a data-collection overview puts issues across 34 sites on one page, replacing email alerts and manual data pulls; alerts at one site dropped from 244 to 12",
        ],
      },
      {
        id: "advisory",
        org: "Freelance",
        role: "Independent Consultant | Operations digitization and fundraising",
        period: "Sep 2024 - Feb 2025",
        focus: "Operations redesign and fundraising in energy and hospitality",
        summary:
          "",
        bullets: [
          "Brought about NT$170M in fundraising across 2 deals, in energy and hospitality, into substantive investor talks; mapped workflows for 3 departments at the energy company and rolled out Asana",
          "Analyzed 106 Airbnb listings: found a room type at 90% occupancy (Taipei average 65%) and positioned 2 hotels around it",
        ],
      },
      {
        id: "sat",
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "Nov 2023 - Aug 2024",
        focus:
          "Enterprise training, online learning, and Hong Kong market entry",
        summary:
          "",
        bullets: [
          "First-week revenue above NT$1M: entered the Hong Kong market within 3 weeks",
          "Mapped and redesigned HR leave, expense-claim, and customer-service flows",
          "Interviewed HR teams at companies of different sizes and planned a learning-data dashboard for corporate training",
        ],
      },
      {
        id: "consulting",
        org: "Freelance",
        role: "Independent Consultant | Product workflows and roadmaps",
        period: "Jun 2023 - Nov 2023",
        focus:
          "Development workflows, product roadmaps, and a personal playbook",
        summary:
          "",
        bullets: [
          "Brought Notion to a 15-person outsourcing team; set a product roadmap tied to business metrics for a multinational SaaS company",
        ],
      },
      {
        id: "huayao",
        org: "Hua Yao Industrial (華曜興業有限公司)",
        role: "Senior Operations Manager",
        period: "Nov 2022 - May 2023",
        focus: "Supply-chain and warehouse operations",
        summary:
          "",
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
        focus: "E-commerce and health app rebuilds, cross-functional delivery",
        summary:
          "Managed an NT$12M+ client project portfolio, leading 10 engineers across projects and directly managing 2 junior PMs; won the 2022 PMI Taiwan Benchmark Project Merit Award.",
        bullets: [
          "Scaled picking from 300 to 1,000 orders a day (+233%): mapped order-to-delivery during the pandemic surge and coordinated storefront, app, and AWS rebuilds; revenue grew 120% during the rebuild (team result), and AWS featured the project as a case study",
          "Health app DAU from 12,000 to 20,000 (+66% in a year, team result): rebuilt an app with about NT$800M annual revenue, migrated data, and integrated IoT scales",
        ],
      },
      {
        id: "oakda",
        org: "Oakda (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "Jun 2020 - Dec 2020",
        focus: "Customer data platforms, chatbots, and dashboards",
        summary:
          "",
        bullets: [
          "10M customer records integrated across 3 industries: directly managed 12 people in data and product, and launched a CDP across 5 channels",
        ],
      },
      {
        id: "zhongshuo",
        org: "Zhongshuo Investment Consulting",
        role: "Product Assistant",
        period: "Feb 2019 - Jun 2020",
        focus: "Market research, prototyping, and early product validation",
        summary:
          "",
        bullets: [
          "2 companies I helped incubate each passed NT$1M in revenue: mapped business models and competitors, identified second growth curves, and planned how to use existing resources to lower risk",
        ],
      },
    ],
  },

  contact: {
    kicker: "Find the bottleneck. Build the fix. Prove it in numbers.",
    title: "Let's talk about the next product opportunity.",
    text: "Looking for a company with clearly defined team roles, data-driven product decisions, and an active effort to redesign how people work with AI. Happy to talk about a role or the changes you are making to how your team works.",
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
      "Rebuilt the storefront, back office, app, and AWS architecture\naround one order-to-delivery flow",
    throughputLabel: "300 → 1,000 orders/day",
    captions: [
      "Orders queue at picking: 300 orders/day.",
      "Rebuilt the storefront, back office, app, and AWS architecture around the delivery flow.",
      "Picking reached 1,000 orders/day, while platform revenue grew 120%.",
    ],
    replay: "Replay",
    ariaLabel:
      "Animated diagram: orders flow through intake, picking, packing, and shipping; picking becomes the bottleneck, and after the AWS rebuild, throughput rises from 300 to 1,000 orders/day.",
  },
} satisfies SiteContent;
