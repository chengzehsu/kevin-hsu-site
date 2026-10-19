import { Fragment, type ReactNode } from "react";
import type { HeroContent } from "@/content/types";
import { HeroHeadline } from "./HeroHeadline";

interface HeroStatementProps {
  eyebrow: string; kicker: string; headline: string; traits: HeroContent["traits"]; actions: ReactNode; chinese: boolean;
}

/** Keep each comma clause whole, so a Chinese line never breaks inside a word. */
function clauses(text: string, chinese: boolean) {
  if (!chinese) return text;
  return text.split(/(?<=[，？])/).map((clause) => <span key={clause} className="inline-block">{clause}</span>);
}

/** Name and years stay on one line each; a narrow screen wraps only after the " · ". */
function eyebrowParts(text: string) {
  return text.split(/(?<= ·) /).map((part, index) => <Fragment key={part}>{index > 0 ? " " : null}<span className="inline-block">{part}</span></Fragment>);
}

/** Essential copy is server-rendered and visible before JavaScript runs. */
export function HeroStatement({ eyebrow, kicker, headline, traits, actions, chinese }: HeroStatementProps) {
  return <div className="hero-statement">
    <p className="hero-eyebrow">{eyebrowParts(eyebrow)}</p>
    <p className="hero-kicker">{clauses(kicker, chinese)}</p>
    <HeroHeadline headline={headline} chinese={chinese} />
    <dl className="hero-traits">
      {traits.map((trait) => (
        <div key={trait.label} className="hero-trait">
          <dt>{trait.label}</dt>
          <dd>
            <p className="hero-trait-text">
              {trait.text}
              {trait.shift ? <>
                {" "}<s className="hero-shift-from">{trait.shift.from}</s>
                <span aria-hidden="true"> → </span>
                <strong className="hero-shift-to">{trait.shift.to}</strong>
              </> : null}
            </p>
            <p className="hero-trait-proof">{trait.proof}</p>
          </dd>
        </div>
      ))}
    </dl>
    <div className="hero-actions">{actions}</div>
  </div>;
}
