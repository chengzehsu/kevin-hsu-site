import type { ReactNode } from "react";
import { HeroHeadline } from "./HeroHeadline";

interface HeroStatementProps {
  name: string; role: string; facts: string; positioning: string; headline: string; actions: ReactNode; chinese: boolean;
}

/** Keep each comma clause whole, so a Chinese line never breaks inside a word. */
function clauses(text: string, chinese: boolean) {
  if (!chinese) return text;
  return text.split(/(?<=[，？：])/).map((clause) => <span key={clause} className="inline-block">{clause}</span>);
}

/**
 * Who first, in the largest type: name and role are the page's h1. The tagline follows as a statement,
 * then the positioning sentence, the actions, and the scope in one line.
 * Essential copy is server-rendered and visible before JavaScript runs.
 */
export function HeroStatement({ name, role, facts, positioning, headline, actions, chinese }: HeroStatementProps) {
  return <div className="hero-statement">
    <h1 className="hero-name">
      <span className="hero-name-line">{name}</span>
      <span className="hero-role">{role}</span>
    </h1>
    <HeroHeadline headline={headline} chinese={chinese} />
    <p className="hero-positioning">{clauses(positioning, chinese)}</p>
    <div className="hero-actions">{actions}</div>
    <p className="hero-facts">{facts}</p>
  </div>;
}
