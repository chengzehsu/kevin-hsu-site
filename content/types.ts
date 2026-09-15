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
  /** Anchor links, e.g. { label: "案例", href: "#cases" }. */
  links: Cta[];
  /** Text shown on the language switch, e.g. "EN" on the zh page, "中" on the en page. */
  switchLabel: string;
  /** Accessible name of the switch, e.g. "Switch to English". */
  switchAria: string;
}

export interface HeroContent {
  /** A short positioning line above the headline. */
  eyebrow: string;
  /** Max two lines at desktop. */
  headline: string;
  /** Max 20 words / 20 characters. */
  subline: string;
  /** Three factual signals that help a hiring reader understand the profile quickly. */
  profile: Array<{
    label: string;
    value: string;
  }>;
  /** The operating loop that differentiates this product practice. */
  builderLoop: {
    label: string;
    steps: [string, string, string, string, string];
    result: string;
  };
  primaryCta: Cta;
  secondaryCta: Cta;
}

/**
 * One impact number. Rendered as `${prefix}${formatted value}${suffix}`,
 * with `value` counted up on scroll. `detail` is a small line under the label.
 * Example (zh picking): prefix "300 → ", value 1000, suffix " 單／日", label "揀貨效率", detail "+233%".
 */
export interface Metric {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  detail?: string;
}

export interface MetricsContent {
  title: string;
  items: Metric[];
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
export type RecognitionItem = RecognitionDetails & (
  | { kind: "award"; year: string }
  | { kind: "feature"; caseId: string }
);

export interface AwardsContent {
  title: string;
  items: RecognitionItem[];
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
  title: string;
  /** The outcome a hiring reader should understand before reading the full case. */
  impact: string;
  /** The work Kevin personally drove, separated from the overall outcome. */
  ownership: string;
  situation: string;
  bottleneck: string;
  hypothesis: string;
  result: string;
}

export interface CasesContent {
  title: string;
  /** Column headings shared by all cases. */
  columns: {
    situation: string;
    bottleneck: string;
    hypothesis: string;
    result: string;
  };
  ownershipLabel: string;
  items: CaseStudy[];
}

export interface ExperienceItem {
  org: string;
  role: string;
  period: string;
  /** The product judgement or practice accumulated in this chapter. */
  skillSignal: string;
  /** One or two sentences; null when the facts are not yet supplied (both locales must declare it). */
  summary: string | null;
  /** Short bullets, max 4; empty array when none. */
  bullets: string[];
}

export interface ExperienceContent {
  title: string;
  skillLabel: string;
  items: ExperienceItem[];
}

export interface ContactContent {
  title: string;
  text: string;
  /** Same label as hero.primaryCta (single contact intent per locale); null until the email is supplied. */
  cta: Cta | null;
  /** Optional external links (LinkedIn, Heptabase). Omit entries whose URL is not yet supplied. */
  links: Cta[];
}

export interface FooterContent {
  text: string;
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
  awards: AwardsContent;
  method: MethodContent;
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
