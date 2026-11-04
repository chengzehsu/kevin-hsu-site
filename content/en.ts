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
      { label: "Solved with AI", href: "#ai" },
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
    kicker:
      "Platform rebuilds and internal systems: I turn work that waits on engineers into workflows PMs can finish on their own.",
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
      muteLabel: "Mute",
      unmuteLabel: "Unmute",
      chapters: [
        { at: 0, label: "Intro" },
        { at: 12, label: "Six skills" },
        { at: 42.2, label: "Three habits" },
        { at: 56.8, label: "Closing" },
      ],
      summary:
        "67-second film. The spec is written, the meeting is over, and nothing runs yet. For a PM in the AI era, building is no longer the hard part. These six skills are: problem framing, rapid experimentation, prototyping, workflow redesign, cross-team delivery, and data interpretation; each role expanded that chart. By 2025, customer onboarding fell from about 2 weeks to about 2 hours and works for all 34 sites (excluding on-site wiring and control strategy). Then three working habits. Curious: when a new tool appears, I try it hands-on, from Claude Code and Cursor to Gemini and Notion AI. Any vendor format, one standard name: the machine gets 93% right on the first try (72-sensor walkthrough), with 0 confident-but-wrong answers, and asks a person when unsure. Willing to try: with limited coding background, I built an internal platform with Claude Code, 748 commits in about 6 months. Chasing efficiency: a control-strategy simulator tests 100,000+ combinations at once and cut tuning from 1 week to 2 hours. Find the bottleneck. Build the fix. Prove it in numbers. Kevin Hsu, Senior Product Manager · Platform rebuilds and internal systems.",
    },
    primaryCta: { label: "Résumé", href: "/en/resume/" },
    secondaryCta: { label: "See case studies", href: "#work" },
  },

  metrics: {
    title: "Key results",
    items: facts.en,
  },

  aiPractice: {
    title: "Problems I solved with AI this year",
    intro:
      "AI proposes, a person decides, and AI earns autonomy only once it proves accurate. Each project below shows the problem, what AI did, what a person decided, and the result.",
    highlights: [
      {
        problem: "100,000+ control settings, tested by hand",
        solution: "Built a simulator with AI that runs and ranks them all.",
        stat: { value: "1 wk → 2 hr", label: "to tune one strategy" },
      },
      {
        problem: "A hospital director wanted a screen before any savings",
        solution:
          "Prototyped it with AI, then built it with the software team.",
        stat: {
          value: "1 day",
          label: "to build the second prospect's dashboard",
        },
        caseId: "internal-backend",
        anchor: "customer-view",
      },
      {
        problem: "PMs waited on engineers to change one cell",
        solution:
          "Built the platform with Claude Code, so PMs edit and check it themselves. 748 commits.",
        stat: { value: "4 → 0", label: "handoffs per test round" },
        caseId: "internal-backend",
        anchor: "site-management",
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
              alt: "Launch film frame: tuning a strategy took 2 hours, with 100,000+ combinations tested at once with AI",
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
              value: "99% less",
              label: "time to log a card, vs manual entry",
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
              value: "51 entries",
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
            stat: {
              value: "839",
              label:
                "logged turns compared, showing automatic skill selection barely helped",
            },
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
    inventory:
      "{total} case studies: {work} from work, {side} from side projects",
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
          "I defined the problem and what success meant, wrote the platform blueprint for the general manager, and decided what to build and what to leave out. I built it with working prototypes and AI, then turned it into production features with the software team, reaching 748 commits by Oct 2026.",
        situation:
          "Each site's list of sensor points (every value read from the equipment) sat in different files. Changing one cell, or answering a customer's question about a site, meant asking an engineer first.",
        bottleneck:
          "Onboarding a site meant waiting about 2 weeks on engineers. Data problems often surfaced only when reports were being prepared. Until savings accumulated, the customer's executives had no screen to look at.",
        decision:
          "Remove the handoff between PMs and engineers by putting download, upload, and checks in one place, and give customers a screen before savings results arrive.",
        decisionSummary:
          "Remove the handoff between PMs and engineers, so PMs onboard sites themselves.",
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
          "AI-assisted development process",
        ],
        measurement:
          "Task counts and hours come from the company task database (Jan to Jul 2026; some hours were never logged, so these are minimums). Site and commit counts come from the internal platform and git (Oct 2026). About 2 weeks and about 2 hours are my first-hand experience and exclude on-site wiring and control strategy. Upload counts cover about 1 month after launch; about 1 hour saved per upload is my estimate. Site names in screenshots are anonymized.",
        measurementSummary:
          "Onboarding time: first-hand experience; tasks and hours: company task database",
        article: {
          lead: "This platform's three functions each solve a problem for different people, so here they are one at a time.",
          sections: [
            {
              id: "site-management",
              trait: "Site management",
              heading:
                "Engineers weren't slow; every cell edit just had to go through them",
              stat: {
                value: "20+ uploads",
                label:
                  "by PMs on their own in about 1 month, each saving engineers about 1 hour (estimate)",
              },
              paragraphs: [
                "Each site has a sensor list recording every value read from its equipment. Lists are rarely right the first time, yet to change one cell a PM had to ask an engineer for the current version, hand back the edits, wait for the upload, and go around again if the check failed. Task records show at least 54 such tasks in six months but only 32 logged hours, because the time PMs spent waiting was never recorded.",
                "So instead of optimizing the ticket flow, I removed the handoff: a PM now downloads, edits, and uploads the list, then checks the incoming data directly. I once added per-minute aggregation to make the files easier to read, and removed it the same week, because downloads must reconcile row by row with the source.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-flow-en.svg",
                alt: "Before and after flow: previously a PM and an engineer handed work back and forth 4 times per round; now the PM downloads, edits, uploads, and checks alone, with 0 handoffs",
                caption:
                  "Before and after | 4 handoffs per round of testing became a loop the PM runs alone.",
                width: 1480,
                height: 760,
              },
              moreFigures: [
                {
                  src: "/portfolio-artifacts/internal-backend-timeseries.webp",
                  alt: "Time-series chart: 3.5 days of power use for 4 chillers, with data completeness of 98.5% marked above",
                  caption:
                    "Time series | Check the values right after uploading: 3.5 days of power for 4 chillers, with 98.5% data completeness marked above.",
                  width: 1536,
                  height: 936,
                },
              ],
            },
            {
              id: "data-collection",
              trait: "Data collection",
              heading:
                "Define what complete data means, then let PMs judge it themselves",
              stat: {
                value: "244 → 12",
                label: "missing-data alerts (after merging by cause)",
              },
              paragraphs: [
                "PMs used to read site emails, pull data, and report errors to the software team, so problems often surfaced only when reports were being prepared. Data-collection tasks alone came to at least 64 tickets and 62.5 hours in six months. Now issues sit on one page, and PMs diagnose them first. I started by defining complete data: under 5% missing, with anything that can't be determined marked separately. Then I changed alerts from counting rules to counting equipment, and every issue now states the actual value and who should handle it.",
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
              trait: "Customer data",
              heading:
                "Show decision makers a screen before the savings arrive",
              stat: {
                value: "1 day",
                label: "to build the second prospect's energy dashboard",
              },
              paragraphs: [
                '"We need a screen the hospital director can look at." A hospital said this in a sales meeting. Savings take time to accumulate, and sales only had slides. So I built a working dashboard prototype that puts outdoor air conditions, cooling load, the AI\'s suggested supply temperature, and projected savings on one screen. The prototype defined the layout and the calculations, and the software team turned it into a production feature.',
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
        title: "Fresh-produce e-commerce, rebuilt",
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
        title: "Health app: user flows redesigned",
        role: "Senior Project Manager",
        scope: "Health app | User flows | IoT scales | Data migration | Localization",
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
          "A health app with about NT$800M in annual revenue needed a rebuild: engagement had room to grow, and sharing health data was inconvenient and incomplete, adding to health coaches' workload. It also needed IoT scales, event registration, localization, and legacy-data migration.",
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
          "Sensor naming: PMs convert vendor sensor lists to our format themselves",
        role: "Senior Product Manager (planning and build)",
        scope:
          "34 sites, 7,110 sensor points (Sep 2026) | Mapping workbook and naming rules | Shared by data collection and simulation analysis",
        collaboration:
          "Project PMs, data-collection engineers, software engineers, and system integrators",
        impact:
          "93% correct on the first try across 72 sensors | 0 confident-but-wrong answers",
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
          "A site has about 200 points, too many to check by eye, and one wrong match puts errors in the data reports. The lines automated matching could not handle also often sat unresolved, so engineers received half-finished lists.",
        decision:
          "Put the standard names and the keywords vendors may use into one mapping workbook, and have Claude read it and write the rules. With a new sensor list, a PM converts it to our format and uploads it on their own.",
        decisionSummary:
          "Build a mapping workbook, have Claude write the rules, and let PMs convert and upload lists themselves.",
        hypothesis:
          "Keep the naming rules in one place so a change takes effect everywhere. When the tool is unsure, it asks a person one question at a time, and it always asks about site facts. Add a test case before every rule change to block confident-but-wrong answers.",
        result: [
          "In a 72-sensor walkthrough, 93% matched right the first time, with 0 confident-but-wrong answers",
          "The PM settled 13 questions on the spot and forwarded 11 to the system integrator",
          "Inventory of all sites: 34 sites, 7,110 sensor points (Sep 2026)",
        ],
        artifacts: [
          "Sensor mapping workbook (30 equipment codes, 50 standard parameters)",
          "One shared naming tool",
          "Naming dictionary (9 sheets)",
          "Ten automated test suites and a test set",
          "One-question-at-a-time review",
          "Questions ready to forward to integrators",
          "Team handbook",
        ],
        measurement:
          "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01); equipment and parameter counts from mapping workbook v1 (Aug 2026); the comparison with and without the tool used 3 test cases. No manual-hours baseline exists, so no time saving is claimed.",
        measurementSummary:
          "72-point walkthrough and site inventory (Sep 2026)",
        article: {
          lead: 'A vendor sends a sensor list where "CH-1 chilled water supply temp", "Chiller1 outlet", and "CHL01_TCHS" are the same point. Everyone writes these differently, a site has about 200 points, too many to check by eye, and one wrong match puts errors in the data reports.',
          sections: [
            {
              id: "mapping",
              trait: "Problem framing",
              heading: "List every spelling first, in one mapping workbook",
              stat: {
                value: "30 codes, 50 parameters",
                label:
                  "of standard names in the workbook, each listing the spellings vendors may use",
              },
              paragraphs: [
                "I listed every point and matched each standard name to the keywords vendors may use. Chilled-water supply temperature, for example, may appear as CHW Supply Temp, CHWS, or Chilled Water Supply. The workbook also settles conversations with vendors: anyone can look up what their spelling maps to.",
              ],
            },
            {
              id: "rules",
              trait: "AI adoption",
              heading:
                "Have Claude read the workbook and write rules PMs can use",
              stat: {
                value: "1 tool",
                label:
                  "for naming, shared by data collection and simulation analysis",
              },
              paragraphs: [
                "Claude reads the workbook and writes the mapping as naming rules, packaged as a skill (a reusable AI tool) PMs can run directly. The same rule once lived in three tool guides and drifted apart. Now the rules and plausible value ranges sit in one tool, which stops if its version is too old instead of quietly applying old rules.",
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
              id: "self-serve",
              trait: "Workflow redesign",
              heading:
                "PMs convert and upload on their own, and the tool asks when unsure",
              paragraphs: [
                "With a new sensor list, a PM runs the skill to convert it to our format, then uploads it to the internal platform to complete data collection. Every point gets a confidence score. Below the threshold, the tool asks the PM one question at a time with a suggested answer. If the PM does not know, it writes a question to forward to the system integrator instead of guessing.",
                "Shared or separate chilled-water piping, unit counts, and flow-meter counts can't be inferred from a name, so these points get a confidence of zero and always go to a person.",
              ],
            },
            {
              id: "gate",
              trait: "Measured results",
              heading: "Add a test case before changing a rule",
              stat: {
                value: "84 cases",
                label:
                  "the old tool got wrong out of 189, caught before the rewrite",
              },
              paragraphs: [
                "I turned every rule in the old tool into a test case, and the old version failed 84 of them. Every dictionary change now adds a case first and must pass ten automated test suites, with zero confident-but-wrong answers, before it ships.",
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
        scope:
          "Meeting-note analysis | Two human approval steps | Q&A tool for sales",
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
                value: "78 entries",
                label: "already have answers written, waiting for sign-off",
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
        summary:
          "Owned the B2B AI HVAC energy-saving product, roadmap, and internal platform, leading 4 engineers. Contracts totaled about NT$100M, and customers saved about 15% on energy on average.",
        bullets: [
          "Grew sites on the platform from 9 to 34 with no added engineers: built a data platform with Claude Code (748 commits) that replaced per-project customization, removed 4 handoffs per test round, and cut onboarding from about 2 weeks to about 2 hours; PMs self-served 20+ uploads in the first month; each saves engineers about 1 hour (estimate)",
          "Cut control-strategy tuning from 1 week to 2 hours: built an AI simulator that tests 100,000+ combinations; modular strategies cut delivery time on related projects by about 30% (estimate)",
          "Gave customer executives a screen before savings came in: prototyped with Claude Code, cutting requirement handling from about 1 month to about 1 week; built an energy dashboard for a second prospect in 1 day, which reached sales talks",
          "Cut single-site customization from 51% to about 30%: analyzed 735 tasks (about 920 hours) from the task database and took the sales-speed vs delivery-readiness trade-off to the general manager",
          "Caught data problems before customers saw them: detection rules cut per-site issue handling from 30 minutes to 3 minutes and merged one site's 244 alerts into 12; report rework and requirement-clarification time fell about 30% (estimate)",
          "In a 72-point sample, 93% right first time, 0 confident errors: about 200 points per site, and one error affects the report; turned 7,110 point mappings into an AI skill that asks a person when unsure, cutting sheet creation from 1 hour to 5 minutes",
          "Cut sales response time from 1 hour to 1 minute: built an AI Q&A bot with 51 official answers, sales leads choosing questions and an owner setting answers; an AI assistant moved business cards from salespeople's desks into Notion, logging 80 in 4 days",
          "Closed the data gap from sales to R&D: merged customer and site data scattered across LINE, email, and laptops into one shared Notion operations system (17 databases)",
        ],
      },
      {
        id: "advisory",
        org: "Freelance",
        role: "Independent Consultant | Operations digitization and fundraising",
        period: "Sep 2024 - Feb 2025",
        focus: "Operations redesign and fundraising in energy and hospitality",
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
        focus: "E-commerce and health app rebuilds, cross-functional delivery",
        summary:
          "Managed an NT$12M+ client project portfolio, leading 10 engineers across projects and directly managing 2 junior PMs; won the 2022 PMI Taiwan Benchmark Project Merit Award.",
        bullets: [
          "Scaled grocery shipments from 300 to 1,000 orders a day (+233%): worked on site with the client's COO across departments during the pandemic surge, mapped inbound to shipping, and set one priority list for a phased rebuild; revenue grew 120% during the rebuild (team result), and AWS featured the project as a case study",
          "Improved picking efficiency 30% (average time to ship an order): moved shipping from next-day to same-day delivery and redesigned shipping slips, storage locations, and the picking flow",
          "Grew health app daily active users from 12,000 to 20,000 (+66% in a year, team result): redesigned the user flows of an app with about NT$800M annual revenue; added IoT weigh-in check-ins and better health-data sharing, easing the load on health coaches",
        ],
      },
      {
        id: "oakda",
        org: "Oakda (歐可達數據科技有限公司)",
        role: "Product Manager",
        period: "Jun 2020 - Dec 2020",
        focus: "Customer data platforms, chatbots, and dashboards",
        summary: "",
        bullets: [
          "Integrated 10M customer records across 3 industries: directly managed a 12-person team and launched a CDP connecting chatbots (LINE, Facebook), website, e-commerce, and POS for segment-based marketing automation",
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
