import type { SiteContent } from "./types";

export const en = {
  locale: "en",

  meta: {
    title:
      "Kevin Hsu | Product Manager | Find the bottleneck, build the fix, prove it",
    description:
      "Product Manager with 5+ years of product-related experience, focused on digitizing operations, internal systems, and AI adoption: map the process on site, define the data, build the internal tool with AI, and prove the result in numbers. Led B2C e-commerce re-platforming and a 10-person engineering team with two junior PMs.",
  },

  nav: {
    brand: "Kevin Hsu",
    links: [
      { label: "Work cases", href: "#work" },
      { label: "AI in practice", href: "#linkedin-posts" },
      { label: "Experience", href: "#experience" },
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
    eyebrow: "Kevin Hsu | Product Manager · 5+ years in product",
    kicker: "The spec is written. The meeting is over. Nothing runs yet?",
    headline:
      "Find the 【bottleneck】. Build the 【fix】. Prove it in 【numbers】.",
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
          "Product Manager · Operations digitization, internal systems, and AI adoption",
      },
      {
        label: "Domains",
        value:
          "AI energy savings (B2B), e-commerce order-to-delivery, health apps, cross-channel customer-data platforms, and enterprise learning",
      },
      {
        label: "Looking for",
        value:
          "Companies in digital transformation and growth-stage product teams: turn field processes into systems and bring AI into daily operations",
      },
    ],
    film: {
      caption: "AI energy-saving HVAC: delivery efficiency +50%",
      caseId: "ecofirst",
      pauseLabel: "Pause film",
      playLabel: "Play film",
      seekLabel: "Film progress",
      fullscreenLabel: "Watch full screen",
      exitFullscreenLabel: "Exit full screen",
      chapters: [
        { at: 0, label: "Intro" },
        { at: 12, label: "Six skills" },
        { at: 42.2, label: "Three habits" },
        { at: 56.8, label: "Sign-off" },
      ],
      summary:
        "67-second film. The spec is written, the meeting is over, and nothing runs yet. For a PM in the AI era, building something is no longer the bar. The bar is six skills: problem framing, fast experiments, prototyping, workflow redesign, cross-team delivery, and data judgment; each role widened that chart. Then three working habits. Curious: when a new tool appears, I try it hands-on, from Claude Code and Cursor to Gemini and Notion AI. I built an AI business-card assistant with Cursor and Gemini, through failed OCR and a rebuilt Git setup to deployment: snap a card, Gemini reads it, Notion files it. Experimental: with limited coding background, I built an internal platform with Claude Code, 218 commits in 2 months. Efficient: a control-strategy simulator cut tuning from 1 week to 2 hours, and putting AI into the delivery workflow raised delivery efficiency by 50%. Find the bottleneck. Build the fix. Prove it in numbers. Kevin Hsu, Product Manager · AI, data, and operational products.",
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
    primaryCta: { label: "One-page résumé", href: "/en/resume/" },
    secondaryCta: { label: "See work cases", href: "#work" },
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

  aiPractice: {
    title: "AI in practice",
    intro:
      "AI proposes, a person decides, and AI earns autonomy only once it proves accurate. Each item below says who was stuck, what AI did, what a person decided, and the result.",
    labels: {
      stuck: "Stuck",
      ai: "What AI did",
      human: "What a person decided",
      result: "Result",
      source: "Source",
      caseLink: "From the case",
      read: "Read the build note",
      expand: "How AI and people split the work",
      collapse: "Close",
    },
    chapters: [
      {
        id: "ai-build",
        title: "How I build products with AI",
        lead: {
          title: "Internal back office: spot the problem site at a glance",
          stuck:
            "When a client asked how their air conditioning was doing, the PM asked an engineer, who dug through Excel. When equipment data stopped arriving, the client often noticed first.",
          ai: "I write the requirements and spec, and Claude Code builds it. Every change is reviewed by a second AI model before it merges.",
          human: "I define what \"data complete\" means and which conclusion each screen leads with. A person always presses the deploy button.",
          stat: { value: "34", label: "sites on one screen" },
          result: "Merging alerts with the same cause cut 244 missing-data alerts to 12, so a PM sees at a glance which units need attention.",
          source: "Site count from the back office (2026-10-23). Real data in the screenshot, site names anonymized.",
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
            stuck: "Air-conditioning control strategies have more than 100,000 parameter combinations, and they used to be tested by hand, one at a time.",
            ai: "I built a simulator with AI that runs every combination and ranks the results.",
            human: "The tool only runs and compares. A person decides which strategy goes live.",
            stat: { value: "1 wk → 2 hr", label: "to tune one strategy" },
            result: "Tuning a control strategy went from 1 week to 2 hours.",
            source: "Tuning time before vs after the tool",
            image: { src: "/portfolio-wall/film-8.webp", alt: "Control-strategy tuning cut from 1 week to 2 hours", width: 1600, height: 1000 },
            caseId: "ecofirst",
          },
          {
            title: "AI business-card assistant",
            stuck: "Sales reps typed business cards into the company Notion by hand, records were incomplete, and managers struggled to track accounts.",
            ai: "A rep photographs a card in LINE, Gemini reads it, and the contact lands in the company CRM.",
            human: "Judgment fields such as deal stage and decision influence stay with the rep. AI does not make the rep's calls.",
            stat: { value: "−99%", label: "photo-to-record time" },
            result: "Reps really use it: 80 cards were entered within 4 days.",
            source: "Photo vs manual entry time; record count from the company Notion",
            image: { src: "/linkedin-posts/post-2.jpg", alt: "AI business-card assistant flow: photograph a card, AI reads it, it lands in Notion", width: 800, height: 446 },
            caseId: "namecard",
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7412468258705944576/",
          },
          {
            title: "A clickable prototype as the spec for RD",
            stuck: "Requirements for a new back office went back and forth between the CEO, sales, and PMs, and documents alone did not get everyone aligned.",
            ai: "I built 19 clickable screens in 2 days with AI, all on demo data.",
            human: "What to build and in which order was decided by me and the people involved, clicking through the prototype, then written up as the spec for RD.",
            stat: { value: "19", label: "screens, built in 2 days" },
            result: "Discussions moved from reading documents to clicking screens, and the prototype became the spec handed to RD.",
            source: "Prototype git history (Mar 2026)",
            image: { src: "/ai-covers/prototype.svg", alt: "Illustration: three stacked, clickable back-office screens", width: 800, height: 500 },
          },
          {
            title: "Stock Gods Fight: bull vs bear before you buy",
            stuck: "I wanted to know how finance podcasters saw a stock, but had no time to listen to every episode, and summaries never said who was bullish and who was bearish.",
            ai: "AI pulls every argument out of the episode transcripts, each with its original quote.",
            human: "Testing 90 real claims showed 86% of AI's conviction scores bunched between 0.6 and 0.9 and told nothing apart, so I changed the judgment: bulls and bears side by side, no score without a matching quote, no buy or sell advice.",
            stat: { value: "364", label: "commits, live" },
            result: "Bull and bear arguments for the same stock sit side by side, and every line traces to its quote.",
            source: "Scores from 90 real claims (2026-07-22); commits from the public repo's main branch",
            image: { src: "/portfolio-artifacts/podcast-arena.en.svg", alt: "Stock Gods Fight: bull and bear arguments for one demo ticker side by side, each with a quote and source", width: 1200, height: 674 },
            caseId: "podcast-stock",
          },
        ],
      },
      {
        id: "ai-process",
        title: "How I improve processes with AI",
        lead: {
          title: "Sensor naming without manual mapping",
          stuck:
            "Every vendor sends sensor lists in a different format, and PMs mapped each line to the company's standard names by hand. The 10 to 20% the machine could not match often sat unresolved, so engineers got half-finished lists.",
          ai: "One shared naming program maps vendor names to standard names, then checks whether values are plausible. It only looks at periods when equipment is running, and anything it cannot judge is marked \"can't tell\", never \"normal\".",
          human:
            "When the machine is unsure, it asks one question at a time. When nobody knows, it writes a question to forward to the system integrator instead of guessing. Physical facts, such as shared or separate chilled-water piping and unit counts, are always asked.",
          stat: { value: "93%", label: "matched right the first time" },
          result:
            "A rule change needs a test question first, then ten regression suites, and zero \"confident but wrong\" answers before it ships. 31 sites and 4,491 sensor rows have been inventoried so far.",
          source: "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01)",
          image: { src: "/ai-covers/naming.svg", alt: "Illustration: messy vendor names line up as standard names, and the one the machine is unsure of goes to a person", width: 800, height: 500 },
          caseId: "sensor-naming",
        },
        items: [
          {
            title: "Sales FAQ: confirmed answers only",
            stuck: "Client questions were scattered across 1,500+ meeting notes. Reps couldn't find them or tell which answer was the company's official position.",
            ai: "Each week AI drafts FAQ entries from meeting notes with their sources, and flags pricing, warranty, and subsidy questions as high sensitivity.",
            human: "Two human gates: the sales lead picks the questions, and an owner writes the official answer. AI can only answer reps from authorized entries.",
            stat: { value: "51 / 185", label: "entries authorized" },
            result: "The flow works end to end. To answer more questions, what needs to speed up is human review, not AI.",
            source: "Sales FAQ database in the company Notion (2026-09-30)",
            image: { src: "/ai-covers/faq.svg", alt: "Illustration: many questions pass two human gates, and only confirmed answers come out", width: 800, height: 500 },
            caseId: "sales-faq",
          },
          {
            title: "AI drafts from requirements to dev handoff",
            stuck: "Requirements took several rounds to pin down. Specs were written and meetings held, and development was still stuck.",
            ai: "Meeting follow-ups, requirements, specs, mock-data checks, and dev handoff are drafted by AI first. Every weekday at 5 pm it turns the day's meetings into to-dos.",
            human: "I review and edit every draft before it goes out.",
            stat: { value: "+50%", label: "product delivery efficiency" },
            result: "Delivery efficiency rose 50%, and daily meeting follow-ups reached 110 since Apr 2026.",
            source: "Delivery cycle before vs after; count from the scheduled job's output (Oct 2026)",
            image: { src: "/linkedin-posts/ai-product-workflow.en.svg", alt: "Product workflow diagram: meeting follow-up, requirements, specs, mock-data checks, and dev handoff, each drafted by AI", width: 1200, height: 750 },
            caseId: "ecofirst",
            href: "https://www.linkedin.com/feed/update/urn:li:activity:7448723703296659456/",
          },
          {
            title: "A weekly report for the CEO",
            stuck: "The CEO wanted to move from custom work for every site to a productized offering, but couldn't see what changed across projects each week.",
            ai: "Each week AI reads the commits and Notion, writes the report, and proposes two or three open decisions with options and a recommendation.",
            human: "The CEO decides, and every decision needs an owner and a deadline. In weeks when data was unreachable, the report said so instead of filling in guesses.",
            stat: { value: "26", label: "reports, AI proposes and the CEO decides" },
            result: "The decision log has reached 59 entries.",
            source: "Weekly reports and decision log (2026-10-23)",
            image: { src: "/ai-covers/weekly.svg", alt: "Illustration: a weekly report lists three options and one is chosen; a week without data is marked blank", width: 800, height: 500 },
            caseId: "ecofirst",
          },
          {
            title: "Turning past mistakes into checks",
            stuck: "AI writes code fast, but once a project rule is reworded it can repeat an old mistake while type checks and tests still pass.",
            ai: "Every mistake becomes a test question that checks AI does not repeat it after reading the project rules.",
            human: "I decide which incidents become checks and how the rules are written. Changes to permissions, secrets, or deploys always prompt a person to review them.",
            stat: { value: "21", label: "checks from past incidents" },
            result: "21 checks so far, run by hand on my machine.",
            source: "Test list in the internal back-office project (Oct 2026)",
            image: { src: "/ai-covers/checks.svg", alt: "Illustration: a list of ticked checks beside a shield", width: 800, height: 500 },
            caseId: "internal-backend",
          },
        ],
      },
      {
        id: "ai-life",
        title: "How I automate my own life with AI",
        lead: {
          title: "Life control center: bills and reminders in one place",
          stuck: "Bills and statements arrive as PDFs by email, each one opened, logged, and sorted by hand. Due dates and renewals were easy to miss.",
          ai: "Built with Claude Code from specs: every morning it fetches bills from email, sorts them, flags duplicate or missing charges, and reminds me before due dates. Day to day, one sentence logs or looks up anything.",
          human: "I set the rules, such as never logging in to online banking, and I confirm and fix the sorting rules when they are wrong.",
          stat: { value: "117", label: "commits, in daily use" },
          result: "It runs every morning, and anything that needs my judgment is listed separately.",
          source: "Git history of the personal project (2026-10-23). No screenshots or code links, for privacy.",
          image: { src: "/ai-covers/life.svg", alt: "Illustration: mail becomes sorted receipts, with a reminder on the calendar", width: 800, height: 500 },
          caseId: "life-hub",
        },
        items: [
          {
            title: "Podcast knowledge base",
            stuck: "Long product interviews run for hours, and there is no way to hear every episode.",
            ai: "AI pulls the captions and turns them into notes on people, companies, concepts, and ideas in my own knowledge base.",
            human: "I choose which shows to follow, how notes are organized, and how duplicates merge.",
            stat: { value: "3,500+", label: "notes" },
            result: "When I need a product idea, I search my notes instead of replaying episodes.",
            source: "Note count in the personal knowledge base (2026-10-23)",
            image: { src: "/ai-covers/knowledge.svg", alt: "Illustration: a long audio track becomes linked notes", width: 800, height: 500 },
          },
          {
            title: "Finance channel digest",
            stuck: "I follow more finance channels than I have time to watch.",
            ai: "Every morning it detects new videos, pulls captions, has AI summarize them, and posts the summaries to Discord, with a weekly digest on Sundays.",
            human: "After reading, I decide what to dig into and how to judge it.",
            stat: { value: "8 am daily", label: "summaries posted" },
            result: "Instead of watching every video, a quick read tells me what each channel is talking about.",
            source: "Run log of the personal schedule (2026-10-23)",
            image: { src: "/ai-covers/digest.svg", alt: "Illustration: several videos condensed into one summary sent to a phone", width: 800, height: 500 },
          },
          {
            title: "Building my own AI tools, then measuring them",
            stuck: "I wanted AI to pick skills and thinking effort automatically, but didn't know whether it helped.",
            ai: "I built two Claude Code add-ons: one picks skills and thinking effort, and one shows what each AI helper is doing when several run at once.",
            human: "I set up a comparison group over 839 logged turns, found automatic skill picks barely helped, and raised the threshold based on the data.",
            stat: { value: "839", label: "logged turns compared" },
            result: "The skill-pick threshold went up based on the data, and the other features stay in use.",
            source: "Usage log and review of the tools (2026-10-14 to 10-19)",
            image: { src: "/ai-covers/tools.svg", alt: "Illustration: two sets of results compared side by side, with a setting moved based on them", width: 800, height: 500 },
          },
        ],
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
    title: "Portfolio",
    inventory: "7 work cases + 3 side projects",
    intro:
      "Every case follows one structure: problem, decision, what got built, result.",
    workTitle: "Work cases",
    allLabel: "See the full portfolio (2 more work cases, 3 side projects)",
    copyLabel: "Copy case link",
    copiedLabel: "Link copied",
    copyFallback: "Select and copy the link below.",
    linkLabel: "Open case link",
    backLabel: "Back to portfolio",
    readLabel: "View case details",
    roleLabel: "Role",
    scopeLabel: "Scope",
    collaborationLabel: "Collaboration",
    artifactsLabel: "Deliverables",
    measurementLabel: "How it was measured",
    ownershipLabel: "What I drove",
    decisionLog: {
      title: "Decision log",
      call: "Call",
      signal: "Data watched",
      outcome: "Outcome",
    },
    sideTitle: "Side projects: after-hours vibe coding fixes for real problems",
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
        id: "internal-backend",
        org: "Ecofirst (台灣愛淨)",
        period: "Apr 2026 - Oct 2026",
        rank: 1,
        title: "Internal back office: see where the problem is at a glance",
        role: "Product Manager (planning and build)",
        scope: "34 sites | Equipment-data monitoring, value checks, monitoring rules, energy savings",
        collaboration: "Project PMs, data-collection engineers, and the software team",
        impact: "34 sites on one screen | 748 code commits, built on my own",
        ownership:
          "I owned the problem definition, the data definitions, the screens, and the code: a requirements brief and spec first, then implementation with Claude Code, merged only after a second AI model reviewed it.",
        situation:
          "When a client asked how a site's cooling was doing, the PM asked an engineer, who then dug through Excel. Each site's list of sensor points sat in different files and versions, and when the person who knew it left, no one could pick it up.",
        bottleneck:
          "No one could say right away whether a site's equipment data was coming in. Missing data, dropped connections, and wrong settings looked the same, and clients often noticed first.",
        decision:
          "Define what \"all the data arrived\" means first, then let each screen lead with the conclusion and keep the detail one level down. Anything the system can judge on its own never asks a PM to set a threshold.",
        decisionSummary:
          "Define what complete data means, lead with the conclusion, and never ask people for a threshold the system can work out.",
        hypothesis:
          "One register of sensor points is the single source of truth. For every site and time window, the system counts how many readings should arrive and how many did; \"cannot tell\" is shown apart from \"missing data\"; every issue states the actual value, the normal range, and who should take it; monitoring rules are edited in plain language and run a 7-day trial before going live.",
        decisionLog: [
          {
            call: "The overview counts device by device, and merges missing-data alerts that share a cause into one.",
            signal:
              "At one hotel, counting by rule gave \"37 rules checked, 4 violated, 73 not tested\"; counting by device gave \"17 units checked, 4 with problems\". 244 \"often missing\" alerts merged into 12.",
            outcome: "PMs see at a glance which units need work, and 4 value problems that had been buried move to the top.",
          },
          {
            call: "The system works out which sensor points energy savings should use from their names, instead of asking PMs to set up every site, but its guesses are never pre-checked in a form.",
            signal: "Names alone were enough at 28 of 34 sites; once, a PM took a pre-checked option as a confirmed fact.",
            outcome: "People fill in only contract figures such as targets and baselines; system guesses are labeled for a person to confirm.",
          },
          {
            call: "Energy savings moved to total power ÷ total refrigeration tons, even though it no longer matches how past reports were calculated.",
            signal: "A simple average gives a low-load night and a full-load afternoon one vote each and pushes the figure up; dividing totals is what matches the power bill.",
            outcome: "The old method stayed until there was a clear reason to change it, and both decisions are on record; the jump in the switchover week was explained to the people affected in advance.",
          },
          {
            call: "Figures already sent to clients are never changed: a new baseline takes effect the next day.",
            signal: "Applying the baseline every time data was read meant one edit would also change figures that had already been reported.",
            outcome: "Baselines now live in a history that only adds and never edits, and a rule change only recalculates the most recent full day.",
          },
          {
            call: "Going live is always a person pressing a button; passing the automated tests never ships anything on its own.",
            signal: "The team had been burned before by shipping automatically as soon as tests passed.",
            outcome: "Even after merge, tests, and design checks pass, a person decides when it goes live.",
          },
        ],
        result:
          "34 sites (Oct 2026) show their data status on one screen, and every issue states the actual value, the normal range, and who should take it. I built the whole back office: 218 code commits in the first two months, 748 by Oct 2026, plus 317 test files.",
        artifacts: [
          "Collection overview: one conclusion per site",
          "Collection health page: every issue names who takes it",
          "Plain-language rule editor with a 7-day trial",
          "Energy-savings report that says what is missing when it cannot calculate",
          "AI development flow: requirements brief, spec, AI cross-review, manual go-live",
          "21 checks drawn from past incidents",
        ],
        measurement:
          "Site, commit, and test-file counts come from the back office and git (Oct 23, 2026). There is no before-and-after speed comparison, so no efficiency percentage is claimed. Screens show real data with site names anonymized.",
        measurementSummary: "Site and commit counts: from the back office and git (Oct 2026)",
        article: {
          lead: "A client asks, \"Is our cooling running normally?\" The PM asks an engineer, who goes digging through Excel. The data was always there; no single screen could answer which site had a problem, and what it was.",
          sections: [
            {
              id: "verdict",
              trait: "Systems and data",
              heading: "Define complete data first, so the screen can lead with the conclusion",
              stat: { value: "244 → 12", label: "missing-data alerts, after merging those with the same cause" },
              paragraphs: [
                "I defined how many readings each sensor point should send per time window and counted how many arrived: under 5% missing counts as complete, and anything that cannot be told is labeled as such. The overview also counts device by device, so PMs see at a glance which units to fix.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-overview.webp",
                alt: "Collection overview: one row per site, with the actual value and normal range for any problem, data completeness, and the number of units with problems; sites shown by code name",
                caption: "Collection overview | One conclusion per site; problems state the actual value and the normal range. Site names anonymized.",
                width: 1648,
                height: 686,
              },
            },
            {
              id: "handoff",
              trait: "Process mapping",
              heading: "Every issue goes to the right person",
              paragraphs: [
                "Open a site and the first line is the conclusion. Each issue states the actual value and whether it goes to the data-collection engineer (the person who keeps equipment data flowing in) or to the site, and whoever presses \"I'll take it\" owns it to the end.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-site-health.webp",
                alt: "Collection health page: the first line reads 7 units with problems and 22 units checked; issues below include negative cooling output, power, and flow readings, each assigned to the data-collection engineer",
                caption: "Collection health page | Conclusion first, then the issues, such as CHL03 cooling output reading −16.56 RT.",
                width: 1648,
                height: 549,
              },
            },
            {
              id: "disprove",
              trait: "Measured results",
              heading: "Let the data overturn my own assumption",
              stat: { value: "18 rules → 0", label: "anomalies caught by the rules that needed a hand-set threshold" },
              paragraphs: [
                "An audit of one hotel, 26 rules over 8,129 readings, showed all 5 real problems came from checks that need no setup. So those checks now run by default, and hand-set thresholds are only a last safety net.",
              ],
            },
            {
              id: "judgement",
              trait: "Business judgment",
              heading: "Let the system judge what it can, and keep people for the real decisions",
              stat: { value: "28 / 34", label: "sites where sensor-point names alone were enough" },
              paragraphs: [
                "The system picks the points energy savings should use, and people enter only the contract figures. Monitoring rules are edited as four plain-language conditions, so PMs adjust them without reading code.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-rule-editor.webp",
                alt: "Rule editor with four parts: which units, when to check, what counts as abnormal, and how long it must last, followed by a plain-language summary",
                caption: "Rule editor | Four conditions and one plain-language sentence.",
                width: 1480,
                height: 969,
              },
            },
            {
              id: "ai-workflow",
              trait: "AI adoption",
              heading: "Build the back office with AI, and keep AI in check with process",
              stat: { value: "748", label: "code commits, built on my own" },
              paragraphs: [
                "Every feature starts as a requirements brief, AI implements it, and another AI model reviews it before it merges; going live is always a person pressing a button. Every mistake becomes a check, 21 so far.",
              ],
              figure: {
                src: "/portfolio-artifacts/internal-backend-timeseries.webp",
                alt: "Time series: power draw of 4 chillers over 3.5 days, with data completeness of 98.5% shown above the chart",
                caption: "Time series | Power draw of 4 chillers over 3.5 days, with 98.5% data completeness stated above the chart.",
                width: 1536,
                height: 936,
              },
            },
          ],
          closing:
            "I built this back office from data definitions to code, and it now covers 34 sites (Oct 2026). If you want to talk through the trade-offs behind it, get in touch.",
        },
      },
      {
        id: "grocery",
        org: "Fable (寓意科技)",
        period: "Mar 2021 - Jul 2022",
        rank: 2,
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
        rank: 4,
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
        rank: 5,
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
        rank: 3,
        title: "AI energy product: sales to RD on one line",
        role: "Product Manager",
        scope:
          "4 engineers | 50 sites | About NT$100M in projects | Roadmap, AI development, internal tools",
        collaboration: "Software, project, sales, and site-operations teams",
        impact: "Delivery efficiency +50% | Site-ops efficiency +20%",
        ownership:
          "Planned and maintain the Notion operating architecture for sales and software: 17 databases, 42 relations, 70+ computed fields, plus requirements and pre-sales rules.",
        situation:
          "The AI HVAC product was early, and site information lived in LINE, email, and personal laptops; sales asked about timelines and RD asked about requirements by chasing people.",
        bottleneck:
          "Sales promised dates on gut feel, requirements reached development half written, and rush jobs, overload, and who was waiting on whom had no numbers.",
        decision:
          "Split sales-to-RD into six layers: data, relations, computation, views, rules, and AI; delivery dates start at requirements sign-off.",
        decisionSummary:
          "Sales to RD as a six-layer architecture; delivery dates start at requirements sign-off.",
        hypothesis:
          "17 databases hold cards, accounts, projects, sales updates, and RD tasks; one account card shows the owner, stage, and decision maker; formulas compute sales cycle days, rush jobs, delays, and weekly capacity; sales, PMs, and RD each get a workspace; requirement templates, a ticket calendar, and pre-sales sizing set the rules; AI drafts the FAQ, glossary, and requirements.",
        decisionLog: [
          {
            call: "Data-quality monitoring goes zero-config first: checks that need no human threshold run by default, and hand-set thresholds become the exception.",
            signal:
              "An audit at one hotel site, 26 rules × 8,129 rows: the 18 rules that need a human threshold caught 0 anomalies. Every real issue came from zero-config checks, such as chiller state contradicting power draw (all 8,129 rows) and one chiller missing 97.3% of its power readings.",
            outcome:
              "Written into the monitoring proposal: rule priority flipped. The sample is one site over six days, so thresholds stay as a safety net rather than being cut.",
          },
          {
            call: "Presales quotes a tier, not person-days: S/M/L/XL, and contracts say \"N weeks after specs and data are complete\", never \"N weeks after signing\".",
            signal: "From Jan to Jul 2026, 735 tasks took about 920 hours, and 51% of them went to single-site customization.",
            outcome:
              "No date until scope is locked, and XL starts with a paid assessment. These figures are the pre-change baseline behind the decision, not a result.",
          },
          {
            call: "Delivery dates start at T=0, not the contract date: T=0 is the day data is complete and the PM signs off the requirements doc.",
            signal:
              "Each project's data-complete date, requirements sign-off date, and RD estimate, plus days spent in each of the 8 sales stages.",
            outcome:
              "Delivery dates share one starting point, and a delay can be traced to data, requirements, or development.",
          },
          {
            call: "PM target date and RD estimate are recorded separately instead of merged into one deadline.",
            signal:
              "The gap between the two dates, the rush-job count, and weekly capacity across 4 engineers.",
            outcome:
              "Formulas flag rush jobs automatically, so schedule conflicts are argued with numbers, not memory.",
          },
          {
            call: "Pre-sales work is sized S, M, L, or XL, with three gates: G0, G1, G2.",
            signal:
              "How many back-and-forth rounds a requirement takes before sign-off.",
            outcome:
              "Requirement sign-off dropped from 4 to 5 rounds to 1 to 2 (internal estimate).",
          },
          {
            call: "Every request records its first-reply time, against a 24-hour reply standard.",
            signal: "First-reply time per request.",
            outcome:
              "How long sales waits on RD went from chasing people to a number anyone can track.",
          },
          {
            call: "Scheduled AI only drafts and a person finalizes; on failure it reports instead of faking results, capped at 20 items per run.",
            signal:
              "Whether the schedules actually produce: 110 daily meeting follow-ups and 26 productization weekly reports since Apr 2026.",
            outcome:
              "Meeting follow-ups and the weekly report to the CEO keep running, and a person checks each one before it goes out.",
          },
        ],
        result:
          "Sales and RD now run on one line: requirement sign-off dropped from 4 to 5 rounds to 1 to 2 (internal estimate), and how long sales waits on RD became a number anyone can track. AI across that line's requirements, specs, and dev handoff then raised delivery efficiency by 50%, and site operations by 20%. The system holds 1,639 sales updates and 1,829 RD tasks, and AI drafts FAQ entries from 1,500+ meeting notes each week: 185 entries so far, 51 authorized by sales (Sep 2026).",
        artifacts: [
          "Operating data model across 17 databases",
          "Formulas for rush jobs, delays, and capacity",
          "Workspaces for sales, PMs, and RD",
          "Requirement templates, ticket calendar, and pre-sales rules",
          "AI for FAQ, glossary, and requirements",
          "Internal data platform (218 commits in 2 months)",
          "Control-strategy simulator",
        ],
        measurement:
          "Efficiency compares delivery cycle and site operating time before and after; architecture and counts come from the company Notion (Oct 2026), with no client names or amounts.",
        measurementSummary:
          "Delivery cycle and site operating time: before vs after",
      },
      {
        id: "sensor-naming",
        org: "Ecofirst",
        period: "Aug 2026 - Oct 2026",
        rank: 6,
        title: "Sensor naming: no more mapping vendor lists by hand",
        role: "Product Manager (planning and build)",
        scope: "One shared naming program | Data collection and simulation analysis | Naming dictionary and test bank",
        collaboration: "Project PMs, data-collection engineers, software RD, and system integrators",
        impact: "93% right the first time across 72 sensors | 0 confident-but-wrong answers",
        ownership:
          "I defined the flow, the rules, and the release gate. The naming program was built with Claude Code, and every dictionary change starts with a new test question.",
        situation:
          "Every vendor sends sensor lists in a different format, and PMs mapped each line to the company's standard names by hand. The same naming rule lived in three tool guides and drifted apart.",
        bottleneck:
          "The 10 to 20% the machine could not match often sat undecided, so engineers received half-finished lists, and data gaps showed up only after a 185 MB output file was built.",
        decision:
          "Keep one naming program for the whole company, called by both data collection and analysis. When the machine is unsure it asks a person one question at a time, and physical facts are always asked.",
        decisionSummary: "One naming program; unsure means ask, and physical facts are always asked.",
        hypothesis:
          "Pull the rules out of every tool into one place so a change takes effect everywhere, and add a real test question before every rule change so the bank blocks confident-but-wrong answers.",
        result:
          "In a 72-sensor walkthrough, 93% matched right the first time with 0 confident-but-wrong answers. The PM settled 13 questions on the spot and forwarded 11 to the system integrator. The same rules have inventoried 31 sites and 4,491 sensor rows.",
        artifacts: [
          "One shared naming program",
          "Naming dictionary (9 sheets)",
          "Ten automated test suites and a test bank",
          "One-question-at-a-time review",
          "Questions ready to forward to integrators",
          "Team handbook",
        ],
        measurement:
          "Walkthrough of 72 points from 2 real sites and 1 demo case (2026-09-10); inventory of all sites (2026-09-01); the with-vs-without comparison used 3 test cases. No manual-hours baseline exists, so no time saving is claimed.",
        measurementSummary: "72-point walkthrough and site inventory (Sep 2026)",
        article: {
          lead: "A vendor sends a sensor list where \"CH-1 chilled water supply temp\", \"Chiller1 outlet\", and \"CHL01_TCHS\" are the same point. The PM maps each line to the company's standard name, and the tenth or so the machine cannot match tends to sit there.",
          sections: [
            {
              id: "one-core",
              trait: "Process mapping",
              heading: "One rule, changed in one place",
              stat: { value: "1", label: "naming program shared by data collection and analysis" },
              paragraphs: [
                "The same naming rule used to live in three tool guides; fix one and the other two drifted. I moved the rules and the plausible value ranges into one program that every flow calls, and a caller with an outdated version stops instead of quietly using old rules.",
              ],
              figure: {
                src: "/ai-covers/naming-core.svg",
                alt: "Illustration: data collection and analysis both connect to one naming program in the middle, with a person-approved dictionary on the right",
                caption: "Two flows share one naming program; two maintainers sign off the dictionary.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "ask",
              trait: "AI adoption",
              heading: "When the machine is unsure, it asks one question at a time",
              stat: { value: "93%", label: "of sensors matched right the first time (72-point walkthrough)" },
              paragraphs: [
                "Every point gets a confidence score; low scores go to a review list that asks the PM one question at a time with a suggested answer. When the PM doesn't know either, it writes a question to forward to the system integrator instead of guessing.",
              ],
              figure: {
                src: "/ai-covers/naming.svg",
                alt: "Illustration: messy vendor names line up as standard names, and the one the machine is unsure of goes to a person",
                caption: "In this walkthrough the PM settled 13 questions on the spot and forwarded 11 to the integrator.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "facts",
              trait: "Systems and data",
              heading: "Physical facts are always asked",
              paragraphs: [
                "Whether chilled-water piping is shared or separate, how many units there are, how many flow meters: none of that follows from a name. Written as a rule, it silently goes wrong at the next site, so these points get zero confidence and always need a person.",
              ],
            },
            {
              id: "gate",
              trait: "Measured results",
              heading: "No rule change without a test question first",
              stat: { value: "84 / 189", label: "questions the old tool got wrong, caught before the rewrite" },
              paragraphs: [
                "I turned every rule in the old tool into a test question, and the old version got 84 wrong. Since then every dictionary change needs a new question first, ten automated test suites, and zero confident-but-wrong answers before it ships.",
              ],
              figure: {
                src: "/ai-covers/naming-gate.svg",
                alt: "Illustration: a stack of passed test questions stands in front of a rule change, which goes through only after them",
                caption: "The test bank gates every rule change; three silent failures became questions once they were fixed.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "The point is not to make AI fully automatic, but to make it know when to stop and ask. If you want to do the same with your own field data, let's talk.",
        },
      },
      {
        id: "sales-faq",
        org: "Ecofirst",
        period: "Apr 2026 - Sep 2026",
        rank: 7,
        title: "Sales FAQ: reps only get confirmed answers",
        role: "Product Manager (process design)",
        scope: "Meeting-note mining | Two human gates | Q&A entry for sales",
        collaboration: "Sales, the sales lead, and the manager who owns official answers",
        impact: "185 FAQ entries, 51 authorized | The bottleneck is human review, not AI",
        ownership: "I designed the flow, the gates, and what AI may and may not do, and I write and maintain the instructions for the schedule and the Q&A entry.",
        situation:
          "Client questions were scattered across 1,500+ meeting notes and transcripts. Reps couldn't find them or tell which answer was the company's official position.",
        bottleneck:
          "Letting AI answer reps directly is fast, but a wrong answer becomes a promise to a client, and pricing, warranty, and subsidy questions are expensive to get wrong.",
        decision:
          "Split it into draft, review, and use: the machine only drafts, two human gates set the answer, and the Q&A entry releases only authorized answers.",
        decisionSummary: "Machine drafts, two human gates decide, the entry releases authorized answers only.",
        hypothesis:
          "Picking questions is a sales call (will clients ask this?), and setting the answer is a company commitment (can we say this?), so different people own them, and AI can never raise its own trust level.",
        result:
          "185 valid FAQ entries so far, 51 (28%) authorized and available to reps. Another 130 wait for the sales lead, 78 of them with answers already written. The flow works end to end; what needs to speed up next is human review.",
        artifacts: [
          "Weekly FAQ drafting schedule",
          "Two-layer answers: 30-second and full",
          "Two human gates",
          "A Q&A entry that cites authorized answers only",
          "Process brief for the general manager",
        ],
        measurement:
          "Counts from the Sales FAQ database in the company Notion (live query, 2026-09-30); schedule and entry rules from the 2026-09-21 versions. No client names or outcome figures included.",
        measurementSummary: "Sales FAQ database counts (2026-09-30)",
        article: {
          lead: "When a client asks a rep about security, warranty, or subsidies, the rep needs one answer they can say out loud. The answers were spread over 1,500+ meeting notes, and different people answered the same question differently.",
          sections: [
            {
              id: "draft",
              trait: "AI adoption",
              heading: "The machine drafts, and can never authorize itself",
              paragraphs: [
                "Every Friday a schedule reads up to 12 meeting notes, picks questions clients really asked and will ask again, and writes a 30-second version and a full version with links to the source meeting. It checks existing entries first so duplicates aren't created, and flags pricing, warranty, and subsidy questions as high sensitivity.",
              ],
              figure: {
                src: "/ai-covers/faq.svg",
                alt: "Illustration: many questions pass two human gates, and only confirmed answers come out",
                caption: "Draft, review, use: the machine drafts, two human gates decide, the entry releases authorized answers only.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "gates",
              trait: "Process mapping",
              heading: "Two gates for two kinds of judgment",
              paragraphs: [
                "The sales lead decides which questions are worth keeping, and an owner writes the company's official answer. Picking is a sales call and answering is a company commitment; split, the sales lead doesn't need every technical detail and the owner doesn't need to read every meeting note.",
              ],
            },
            {
              id: "entry",
              trait: "Systems and data",
              heading: "If it isn't there, say so",
              paragraphs: [
                "Reps ask in their own words. AI cites only authorized entries, each answer with its entry number. When nothing matches, it lists what it searched and points to RD, a manager, or legal; with the rep's OK, the question goes into the next round of gates.",
              ],
              figure: {
                src: "/ai-covers/faq-entry.svg",
                alt: "Illustration: a rep's question comes back with a sourced answer, or with the person to ask instead",
                caption: "Answers carry their source; when nothing matches, it points to the right person instead of inventing one.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "bottleneck",
              trait: "Measured results",
              heading: "The data says people need to speed up, not AI",
              stat: { value: "51 / 185", label: "entries authorized and available to reps (Sep 2026)" },
              paragraphs: [
                "130 entries sit at the first gate, and 78 of them already have answers waiting for sign-off. I put that, together with how fast meeting notes should be mined, to the general manager as decisions with options, instead of making AI run faster.",
              ],
              figure: {
                src: "/ai-covers/faq-backlog.svg",
                alt: "Illustration: a tall stack of unprocessed meeting notes and drafted entries queued at the human gate",
                caption: "44 of the 1,500+ meeting notes have been processed so far; most drafted entries are waiting for human review.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "The hard part of letting AI answer client-facing questions is not the prompt. It is deciding who gets to say an answer can be used. If you are setting up gates for your own knowledge base, let's talk.",
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
          "Photo-to-record time −99% | Built both an internal tool and a SaaS",
        ownership:
          "I planned the business models and the product architecture, and built each one: an internal tool, a multi-tenant SaaS, then a lean version sized to real usage.",
        situation:
          "Sales reps typed business cards into the company Notion by hand, so records were patchy and managers could not track accounts, decision influence, or contact KPIs.",
        bottleneck:
          "A card shows name and phone; the CRM needs judgment calls. Letting AI fill them means a model judges for the rep.",
        decision:
          "Start as an internal tool matched to the company CRM, with judgment fields left to sales; then test it as a SaaS with multi-tenancy and subscription plans; when usage showed no need, fold back to a lean architecture.",
        decisionSummary:
          "Settle the business model first; the architecture follows it.",
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
        rank: 9,
        title: "Stock Gods Fight: bull vs bear before you buy",
        role: "Product owner (solo build)",
        scope: "Web product | AI claim extraction | Bull vs bear view",
        collaboration:
          "Built solo with Claude Code; every feature merged through a reviewed PR",
        impact:
          "One stock, bull and bear cases side by side, every line quoted",
        ownership: "Problem definition, scope, and trust rules.",
        situation:
          "Before buying a stock I want to know what finance podcasters think, but I have no time to listen, and summaries never say who is bullish or bearish.",
        bottleneck:
          "AI-extracted claims could not be checked: in 90 real claims, 86% of strength scores sat between 0.6 and 0.9, so the score said nothing.",
        decision:
          "No majority vote, bulls and bears side by side; every argument traces to a verbatim quote; arguments only, never a buy or sell call.",
        decisionSummary:
          "Bulls and bears side by side, every line quoted, no buy or sell calls.",
        hypothesis:
          "I need the arguments on one stock side by side, not a summary; the call stays mine.",
        result:
          "364 commits and 42 PRs, live. Claims that miss the transcript are not scored; thin evidence means abstain.",
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
      {
        id: "life-hub",
        kind: "side",
        org: "Side project",
        period: "Mar 2026 - Oct 2026",
        rank: 10,
        title: "Life control center: bills and reminders in one place",
        role: "Product owner and developer",
        scope: "Bills from email | Payment and renewal reminders | Plain-language logging | Personal dashboard",
        collaboration: "Built solo with Claude Code; every feature starts as a spec",
        impact: "117 commits, runs every day | Never logs in to online banking",
        ownership: "I set the requirements, rules, and architecture; Claude Code builds from the specs, and I confirm and fix the sorting rules.",
        situation:
          "Bills and statements arrive as PDFs by email, each one opened, logged, and sorted by hand. Due dates and renewals live in different places and are easy to miss.",
        bottleneck:
          "Most ready-made tools pull data by logging in to online banking, and I didn't want to hand bank credentials to any program.",
        decision:
          "Read only the bills in my mailbox, never log in to online banking, and keep data in my own database behind one command line.",
        decisionSummary: "Email bills only, no online-banking login, data stays with me.",
        hypothesis:
          "Most of what needs recording already arrives by email, so reading, sorting, and reminding every day removes the need to touch a bank account.",
        result:
          "Every morning it fetches mail, sorts bills, flags duplicate or missing charges, and reminds me before due dates; day to day, one sentence logs or looks up anything. In daily use since Mar 2026, with 117 commits and automated tests guarding every change.",
        artifacts: [
          "Daily mail fetch and bill parsing",
          "Sorting, duplicate, and missed-charge checks",
          "Payment and renewal reminders",
          "Plain-language logging and lookup",
          "Personal dashboard",
          "Specs and automated tests",
        ],
        measurement:
          "Commit count from personal git history (2026-10-23). No screenshots, code links, amounts, or counts, for privacy.",
        measurementSummary: "Personal git history (Oct 2026)",
        article: {
          lead: "Bills arrive by email every month, and each one has to be opened, logged, and sorted, with due dates and renewals to remember. None of it is hard; it is just fiddly enough to slip.",
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
                "Every day it reads mail, parses bill PDFs, sorts them, and writes everything to one database; transfers and duplicates are flagged, and a recurring charge that fails to appear triggers a reminder. Every command can output machine-readable data, so other tools can plug in.",
              ],
              figure: {
                src: "/ai-covers/life-pipeline.svg",
                alt: "Illustration: mail becomes parsed documents, goes into a database, and shows up on a dashboard",
                caption: "Mail, bill parsing, database, dashboard, without touching a bank account.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "roles",
              trait: "AI adoption",
              heading: "Nine roles that connect only when one thing causes another",
              paragraphs: [
                "Claude switches between nine roles by topic, such as bookkeeping, health, legal, and household, but they connect only when events really affect each other. A doctor's visit is logged, added to health records, and checked for a claim; lunch is only logged, without analyzing anything else.",
              ],
              figure: {
                src: "/ai-covers/life-roles.svg",
                alt: "Illustration: nine roles in a ring, with only the three touched by the same event lit and connected",
                caption: "Nine roles in a ring; one event wakes only the roles it really touches.",
                width: 800,
                height: 500,
              },
            },
            {
              id: "catchup",
              trait: "Measured results",
              heading: "When the schedule was blocked, it learned to catch up",
              stat: { value: "117", label: "commits, in daily use since Mar 2026" },
              paragraphs: [
                "From late May 2026 a system permission started blocking the daily mail fetch, and the log filled with failures. Instead of switching the check off, it now catches up every time Claude Code opens; next, it moves to a cloud schedule so the computer doesn't need to be on.",
              ],
              figure: {
                src: "/ai-covers/life-catchup.svg",
                alt: "Illustration: a blocked schedule clock beside a terminal window that caught up successfully",
                caption: "When the schedule fails, it doesn't force the run; it catches up the next time work starts.",
                width: 800,
                height: 500,
              },
            },
          ],
          closing:
            "This project has no growth curve, only one person who uses it every day. It is practice for the same habit: set the rules first, then let AI do the work.",
        },
      },
    ],
  },

  experience: {
    title: "Experience",
    intro:
      "Eight roles, each starting with the same question: where is it stuck?",
    currentLabel: "Now",
    expandLabel: "View role details",
    collapseLabel: "Collapse role",
    expandAllLabel: "Expand all",
    collapseAllLabel: "Collapse all",
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
        bullets: [
          "Consolidated account and site information scattered across LINE, email, and personal laptops into one sales-to-RD operating system in Notion (17 databases, 42 relations), with delivery dates starting at requirements sign-off",
          "Brought AI into requirements, specs, mock-data checks, and dev handoff, raising delivery efficiency by 50% measured as delivery cycle before vs. after",
          "Learned the HVAC domain from field data: audited one hotel site, 26 rules × 8,129 readings, found the 18 rules that need a hand-set threshold caught 0 anomalies, and made zero-config checks the default for monitoring",
          "Coordinated software, project, and sales teams around one development and deployment flow, from requirements sign-off through engineering tests to PM and sales acceptance",
          "AI tools in daily use: sales logged 80 business cards in 4 days with the AI business-card assistant, and a daily meeting follow-up schedule produced 100+ reports in six months",
          "Streamlined internal operations with standard operating procedures, raising site operations efficiency by 20%",
        ],
        extras: {
          title: "Also improved how the company runs",
          bullets: [
            "Maintained the software team's grading and review system and designed its skill tree: every skill is verified on the spot, and a skill counts as covered only with one expert and two people who can do it, so no skill rests on one person",
            "AI drafts an FAQ from sales meetings every week, and only answers sales has confirmed can be cited; pricing and contract topics are flagged as sensitive",
            "Turned account access for joiners and leavers into a process; before leaving, completed an asset inventory, handed over access, and named an owner for every item",
          ],
        },
      },
      {
        id: "advisory",
        org: "Freelance",
        role: "Independent Consultant | Operations Transformation and Fundraising",
        period: "Sep 2024 - Feb 2025",
        focus: "Operations redesign and fundraising in energy and hospitality",
        skillSignal:
          "Starting from operating data and turning the improvement into a story investors can follow.",
        summary:
          "Led two engagements in energy and hospitality, from operations redesign through fundraising; together they moved about NT$170M in raises into substantive investor talks.",
        bullets: [
          "Energy: mapped workflows across 3 departments and rolled out Asana, giving leadership real-time visibility into each department; that foundation supported a ~NT$100M raise into substantive investor talks",
          "Hospitality: analyzed occupancy by room type across 106 Airbnb units and found 3-bedroom family units were rare in Taipei; they hit 90% occupancy at launch against a 65% Taipei average, which positioned 2 hotels and moved a ~NT$70M raise into substantive talks",
          "Fundraising craft: built the DD room, ran valuation models, and turned operating data into an investor-ready narrative",
        ],
      },
      {
        id: "sat",
        org: "SAT. KNOWLEDGE",
        role: "Senior Product Manager",
        period: "Nov 2023 - Aug 2024",
        focus:
          "Enterprise training, online learning, and Hong Kong market entry",
        skillSignal:
          "Clarifying priorities across the differing needs of buyers, administrators, and end users, then testing markets with the smallest viable step.",
        summary:
          "Covered two markets at once: enterprise training, starting from HR interviews and learning data, and online learning, owning new-market entry and the course experience.",
        bullets: [
          "Hong Kong market: partnered with marketing on a third-party platform to enter Hong Kong in three weeks with a minimal launch; first-week revenue passed NT$1M",
          "Internal process optimization: mapped and redesigned HR leave, expense-claim, and customer-service flows, raising operational efficiency by 20%",
          "Enterprise training product: interviewed HR teams at companies of different sizes to learn how training actually runs, then planned a learning-data dashboard so companies could tune training plans with data",
          "Learning experience design: designed in-course quizzes so learners could check their own progress as they studied",
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
          "Across three engagement types (product strategy, SaaS, and fundraising advisory), helped clients break business problems down into how the team works and how the product ships.",
        bullets: [
          "Rental-management SaaS: helped an operator managing about 100 properties define a multi-tenant management product, its requirements, and its product-management flow",
          "Collaboration flow: translated business strategy into product strategy and roadmaps, improving collaboration among engineers, designers, and requesters",
          "Fundraising advisory: helped energy and hospitality businesses map operations, refine pitch decks, and start connecting with investors",
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
        summary:
          "A short operations-management role focused on supply-chain and warehouse flows.",
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
          "Defined client data strategies and built Customer 360 views, turning data into usable product services and a basis for decisions",
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
    text: "Looking for a company in digital transformation or a growth-stage product team, especially one that wants AI working in daily operations. Happy to talk about a role or the digital transformation you are driving.",
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
