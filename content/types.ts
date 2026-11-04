import type { Locale } from "@/lib/locale";

/** A link-style call to action. `href` is a hash anchor, mailto:, or absolute URL. */
export interface Cta {
  label: string;
  href: string;
}

export interface MetaContent {
  /** <title> and OG title. */
  title: string;
  /** Meta description, one or two sentences. */
  description: string;
}

export interface NavContent {
  brand: string;
  /**
   * Home-page sections (`#…`) first, in the order they appear on the page and named as their headings; links
   * marked `depth` are separate pages (résumé, portfolio) and sit after a divider.
   */
  links: Array<Cta & { depth?: boolean }>;
  /** The one action the site exists for; a button on every page and width. */
  contact: Cta;
  /** Mobile menu button: accessible name and visible text. */
  menuLabel: string;
  /** Text shown on the language switch, e.g. "EN" on the zh page, "中" on the en page. */
  switchLabel: string;
  /** Accessible name of the switch, e.g. "Switch to English". */
  switchAria: string;
  /** Keyboard-only link that moves focus past the persistent navigation. */
  skipLabel: string;
}

export interface HeroContent {
  /** A short positioning line above the headline. */
  eyebrow: string;
  /** The hook from the launch film, set above the headline: the gap most PMs leave open. */
  kicker: string;
  /** Max two lines at desktop. Words wrapped in 【】 take the accent colour. */
  headline: string;
  /** Three factual signals that help a hiring reader understand the profile quickly. */
  profile: Array<{
    label: string;
    value: string;
  }>;
  /** Hero film: the rendered workflow study, tied to the case it illustrates. */
  film: {
    /** Visible caption under the film; the picking metric keeps its canonical wording. */
    caption: string;
    caseId: string;
    pauseLabel: string;
    playLabel: string;
    /** Accessible name of the scrubber. */
    seekLabel: string;
    /** Fullscreen toggle: the film is 1600×1000 at source, so it holds up at full size. */
    fullscreenLabel: string;
    exitFullscreenLabel: string;
    /** Sound control, shown only in full screen; the film stays muted on the page. */
    muteLabel: string;
    unmuteLabel: string;
    /** Chapter starts (seconds) of the launch film, shown as jump points on the timeline. */
    chapters: Array<{ at: number; label: string }>;
    /** Screen-reader narration of the on-screen film text; the film is burned-in per locale. */
    summary: string;
  };
  /** The résumé: what a recruiter opens first. Contact stays in the nav, not the hero. */
  primaryCta: Cta;
  /** Jumps to the work cases on the same page. */
  secondaryCta: Cta;
}

/**
 * One impact number. Rendered as `${prefix}${formatted value}${suffix}`,
 * with `value` counted up on scroll. `detail` is a small line under the label.
 * Example (zh picking): prefix "300 → ", value 1000, suffix " 單／日", label "揀貨效率", detail "+233%".
 */
export interface Metric {
  /** A result as read aloud; strings because "about 2 weeks to about 2 hours" is not a number. */
  value: string;
  label: string;
  detail: string;
  /** The case that proves it. */
  caseId: string;
  /** Short forms for the social preview image. */
  og: { value: string; label: string };
}

export interface MetricGroup {
  label: string;
  items: Array<{ value: string; label: string; caseId?: string }>;
}

export interface MetricsContent {
  title: string;
  /** Short list the social preview reads. */
  items: Metric[];
  groups: MetricGroup[];
}

interface RecognitionDetails {
  id: string;
  category: string;
  title: string;
  distinction: string;
  description: string;
  link: Cta;
}

/** Features inherit the execution period from their case, never the article publication date. */
export type RecognitionItem = RecognitionDetails &
  ({ kind: "award"; year: string } | { kind: "feature"; caseId: string });

export interface AwardsContent {
  title: string;
  items: RecognitionItem[];
}

/** One problem solved with AI: who was stuck, what AI did, what a person decided, and the result. */
export interface AiPracticeItem {
  title: string;
  /** Who was stuck and where, in one sentence. */
  stuck: string;
  ai: string;
  /** What a person decided or guarded; the reason the item belongs here. */
  human: string;
  /** The one figure a reader should remember; public facts only. */
  stat?: { value: string; label: string };
  result: string;
  /** Where the figure comes from, shown small. */
  source: string;
  caseId?: string;
  /** Public build note, e.g. a LinkedIn post. */
  href?: string;
  /** Cover shown on the home card; items without a public screen use a text-free cover from scripts/ai-covers.py. */
  image: { src: string; alt: string; width: number; height: number };
}

export interface AiPracticeChapter {
  id: "ai-build" | "ai-process" | "ai-life";
  title: string;
  lead: AiPracticeItem;
  /** Three or four; the lead widens so the grid has no empty cell. */
  items: AiPracticeItem[];
}

/** A home-page row: the problem first, then the fix in one short line. */
export interface AiHighlight {
  problem: string;
  solution: string;
  stat: { value: string; label: string };
  /** Case page the row opens; rows without one open the AI list on the portfolio. */
  caseId?: string;
  /** Chapter on the case page. */
  anchor?: string;
}

export interface AiPracticeContent {
  title: string;
  intro: string;
  /** The three problems the home page shows. */
  /** Heading of the home list, which shows tools rather than the whole AI practice. */
  highlightsTitle: string;
  highlights: AiHighlight[];
  labels: {
    stuck: string;
    ai: string;
    human: string;
    result: string;
    source: string;
    /** Prefix for the link back to the case an item belongs to. */
    caseLink: string;
    read: string;
    /** Disclosure on compact items. */
    expand: string;
    collapse: string;
  };
  chapters: AiPracticeChapter[];
}

export interface MethodStep {
  /** Short verb label, e.g. 拆解 / Decompose. Never "Step 1". */
  verb: string;
  text: string;
}

export interface Capability {
  name: string;
  text: string;
}

export interface MethodContent {
  title: string;
  steps: MethodStep[];
  capabilitiesTitle: string;
  capabilities: Capability[];
}

/** Every case study uses the same four columns so the reader learns the pattern once. */
export interface CaseStudy {
  /** Stable id used for anchors, e.g. "grocery". */
  id: string;
  org: string;
  period: string;
  /** Display order; lower comes first. */
  rank: number;
  /** Cases that go deeper on one part of this one. */
  relatedCases?: string[];
  /** Work beyond the product role, kept with the case rather than the experience list. */
  alsoDid?: { title: string; bullets: string[] };
  title: string;
  /** Role held while making the decisions described in this case. */
  role: string;
  /** Product and organisational surface covered by the work. */
  scope: string;
  /** Functions and partners involved, so readers can see the leadership boundary. */
  collaboration: string;
  /** The outcome a hiring reader should understand before reading the full case. */
  impact: string;
  /** What this project drew on and what it added, in project-specific words. */
  /** When one product serves different situations: who is stuck on what, and what changed, one row each. */
  scenarios?: Array<{ name: string; stuck: string; now: string }>;
  capabilities: { used: string[]; grown: string[] };
  /** Result-led card title on the home shelf; the case page keeps its own title. */
  homeTitle?: string;
  /** The work Kevin personally drove, separated from the overall outcome. */
  ownership: string;
  situation: string;
  bottleneck: string;
  /** The choice that shaped the work, including what was prioritised first. */
  decision: string;
  /** One-line version of the decision for the portfolio index. */
  decisionSummary: string;
  hypothesis: string;
  /**
   * The individual product calls behind the case, each with the data that drove it and what changed.
   * Optional: only cases with verifiable signals carry one. Self-reported figures say so in-line.
   */
  decisionLog?: Array<{ call: string; signal: string; outcome: string }>;
  /** One outcome per line, so a reader can scan them. */
  result: string[];
  /** Concrete work products that support the narrative without exposing private files. */
  artifacts: string[];
  /**
   * Optional data story shown in place of the artifacts grid: which data sources are combined,
   * and what each combination tells the owner. Sources and insights stay free of private figures.
   */
  dataMap?: Array<{ sources: string; insight: string }>;
  /** Baseline, period, or source used to interpret the outcome. */
  measurement: string;
  /** Short measurement basis shown in the portfolio index. */
  measurementSummary: string;
  /**
   * "side" marks after-hours projects: kept off the home shelf and grouped after the work cases on
   * /portfolio/. Omitted means a work case.
   */
  kind?: "side";
  /** URL of a public source readers can check the case against, linked from the case page. */
  source?: string;
  /**
   * Long-form, illustrated version of the case. When present the case page renders it as the main
   * chapter; every other case keeps the column layout.
   */
  article?: CaseArticle;
}

/** A figure inside a case article. Captions live in content so both locales share one image. */
export interface ArticleFigure {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface CaseArticle {
  /** The opening scene a reader recognises from their own company. */
  lead: string;
  sections: Array<{
    /** Anchor id on the case page. */
    id: string;
    /** The trait this section proves, e.g. 「流程梳理」. */
    trait: string;
    heading: string;
    /** The one number this section is about, set large so the point lands before the prose. */
    stat?: { value: string; label: string };
    paragraphs: string[];
    figure?: ArticleFigure;
    /** Further screens for a section that needs more than one. */
    moreFigures?: ArticleFigure[];
  }>;
  /** Evidence plus a plain invitation to talk; never a pitch. */
  closing: string;
}

export interface CasesContent {
  /** Portfolio page name; also the /portfolio/ meta title. */
  title: string;
  /** The one phrase that states what the portfolio holds, identical on home and /portfolio/. */
  inventory: string;
  intro: string;
  /** Heading for the work-case group: the home shelf and the first group on /portfolio/. */
  workTitle: string;
  /** Home shelf link to /portfolio/, naming what the shelf leaves out. */
  allLabel: string;
  copyLabel: string;
  copiedLabel: string;
  copyFallback: string;
  linkLabel: string;
  backLabel: string;
  readLabel: string;
  roleLabel: string;
  scopeLabel: string;
  collaborationLabel: string;
  artifactsLabel: string;
  /** Heading and row labels for a case's data story. */
  dataMap: { title: string; sources: string; insight: string };
  measurementLabel: string;
  /** Column headings shared by all cases. */
  columns: {
    situation: string;
    bottleneck: string;
    decision: string;
    hypothesis: string;
    result: string;
  };
  ownershipLabel: string;
  /** Heading and row labels for a case's decision log. */
  decisionLog: {
    title: string;
    call: string;
    signal: string;
    outcome: string;
  };
  /** Labels for a case's capabilities: full on the case page, short on its card. */
  capabilityLabels: {
    used: string;
    grown: string;
    cardUsed: string;
    cardGrown: string;
  };
  decisionLabel: string;
  /** Label for a case's public source link. */
  sourceLabel: string;
  items: CaseStudy[];
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  /** Short scope visible before expanding the role. */
  focus: string;
  /** One or two sentences; null when the facts are not yet supplied (both locales must declare it). */
  summary: string | null;
  /** One line for the home rail; only roles with one appear there, and the résumé keeps them all. */
  homeHighlight?: string;
  /** Short bullets, max 4; empty array when none. */
  bullets: string[];
  /** Optional headings over consecutive runs of bullets, in order; counts add up to bullets.length. Ignored when a variant picks its own bullets. */
  bulletGroups?: Array<{ label: string; count: number }>;
  /** Explains the break between this role and the previous (older) one, e.g. "2024/9 - 2025/2｜休息與接案". */
  gapAfter?: string;
  /** True only for a role held today; the timeline shows the current-role badge from this, never from list order. */
  current?: boolean;
}

export interface ExperienceContent {
  title: string;
  expandLabel: string;
  collapseLabel: string;
  /** Section-level button that opens or closes every role at once. */
  expandAllLabel: string;
  collapseAllLabel: string;
  /** Optional one-line lead under the section title. */
  intro?: string;
  /** Marker on the current role, e.g. 現在 / Now. */
  currentLabel?: string;
  items: ExperienceItem[];
}

export interface ContactContent {
  /** Optional closing line above the title, e.g. the site tagline. */
  kicker?: string;
  title: string;
  text: string;
  /** Same label as nav.contact (single contact intent per locale); null until the email is supplied. */
  cta: Cta | null;
  /** Optional external links (LinkedIn, Heptabase). Omit entries whose URL is not yet supplied. */
  links: Cta[];
}

export interface FooterContent {
  text: string;
  backToTop: string;
}

/** All strings used inside the BottleneckFlow animation. */
export interface AnimationContent {
  nodes: {
    intake: string;
    picking: string;
    packing: string;
    shipping: string;
  };
  /** Label shown on the picking node when it becomes the bottleneck. */
  bottleneckLabel: string;
  /** Text of the hypothesis card, one or two short lines. */
  hypothesis: string;
  /** Throughput label after optimisation, e.g. "300 → 1,000 單／日". */
  throughputLabel: string;
  /** Captions for act 1, 2, 3 (also used by the reduced-motion fallback). */
  captions: [string, string, string];
  /** Replay button label. */
  replay: string;
  /** Description of the whole figure for screen readers. */
  ariaLabel: string;
}

export interface SiteContent {
  locale: Locale;
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  metrics: MetricsContent;
  aiPractice: AiPracticeContent;
  awards: AwardsContent;
  cases: CasesContent;
  experience: ExperienceContent;
  contact: ContactContent;
  footer: FooterContent;
  animation: AnimationContent;
}

/** Props every section component receives. No visible string literals inside components. */
export interface SectionProps {
  content: SiteContent;
  locale: Locale;
}
