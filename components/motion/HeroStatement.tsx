import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { HeroContent } from "@/content/types";

interface HeroStatementProps {
  eyebrow: string; kicker: string; headline: string; traits: HeroContent["traits"]; actions: ReactNode; chinese: boolean;
}

/** Split at clause punctuation so each line is a deliberate unit, never a mid-word wrap. */
function headlineLines(headline: string, chinese: boolean): string[] {
  if (chinese) return headline.split(/(?<=，)/).filter(Boolean);
  return headline.split(/(?<=\.)\s+/).filter(Boolean);
}

/** 【word】 marks the accent words, the same ones the launch film highlights. */
function accented(line: string) {
  return line.split(/【(.+?)】/).map((part, index) =>
    index % 2 === 1 ? <em key={index} className="hero-accent">{part}</em> : part,
  );
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
    <h1 className={chinese ? "hero-title hero-title-zh" : "hero-title"}>
      {headlineLines(headline, chinese).map((line, index) => (
        <span key={line} className="hero-line" style={{ "--line": index } as CSSProperties}><span>{accented(line)}</span></span>
      ))}
    </h1>
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
