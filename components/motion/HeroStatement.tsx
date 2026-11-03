import { Fragment, type ReactNode } from "react";
import { HeroHeadline } from "./HeroHeadline";

interface HeroStatementProps {
  eyebrow: string; positioning: string; headline: string; actions: ReactNode; chinese: boolean;
}

/** Keep each comma clause whole, so a Chinese line never breaks inside a word. */
function clauses(text: string, chinese: boolean) {
  if (!chinese) return text;
  return text.split(/(?<=[，？：])/).map((clause) => <span key={clause} className="inline-block">{clause}</span>);
}

/** Name and years stay on one line each; a narrow screen wraps only after the " · ". */
function eyebrowParts(text: string) {
  return text.split(/(?<= ·) /).map((part, index) => <Fragment key={part}>{index > 0 ? " " : null}<span className="inline-block">{part}</span></Fragment>);
}

/** Essential copy is server-rendered and visible before JavaScript runs. */
export function HeroStatement({ eyebrow, positioning, headline, actions, chinese }: HeroStatementProps) {
  return <div className="hero-statement">
    <p className="hero-eyebrow">{eyebrowParts(eyebrow)}</p>
    <HeroHeadline headline={headline} chinese={chinese} />
    <p className="hero-positioning">{clauses(positioning, chinese)}</p>
    <div className="hero-actions">{actions}</div>
  </div>;
}
