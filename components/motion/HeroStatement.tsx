import type { ReactNode } from "react";

interface HeroStatementProps {
  eyebrow: string; headline: string; subline: string; actions: ReactNode; chinese: boolean;
}

/** Essential copy is server-rendered and visible before JavaScript runs. */
export function HeroStatement({ eyebrow, headline, subline, actions, chinese }: HeroStatementProps) {
  return <div className="hero-statement">
    <p className="hero-eyebrow">{eyebrow}</p>
    <h1 className={chinese ? "hero-title hero-title-zh" : "hero-title"}>{chinese && headline.includes("，") ? headline.split("，").map((clause, index) => <span key={clause} className="block">{clause}{index === 0 ? "，" : ""}</span>) : headline}</h1>
    <p className="hero-subline">{subline}</p>
    <div className="hero-actions">{actions}</div>
  </div>;
}
