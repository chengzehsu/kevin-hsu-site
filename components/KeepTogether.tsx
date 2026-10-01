import { Fragment } from "react";

// "300 → 1,000" or "12,000 → 20,000" reads as one figure; a line break inside it splits the claim.
const TRANSITION = /(\d[\d,.]*\s*→\s*\d[\d,.]*)/;
// Break after a clause bar, never inside a clause: "交付效率 +50%｜案場營運效率 +20%", "Delivery +50% | Site ops +20%".
const BAR = /(?<=｜)|(?<=\s\|)\s/;
// Titles also break after their colon: "蔬果電商：重整訂單到交付", "AI energy: from planning to delivery".
// Outcomes do not, or "DAU:" would be stranded on its own line.
const BAR_OR_COLON = /(?<=[｜：])|(?<=\s\||:)\s/;
// A full-width-slash unit such as "單／日" is one word; the browser may otherwise break after the slash.
const SLASH_UNIT = /([^\s／]+／[^\s／(（]+)/;

function Units({ text }: { text: string }) {
  return text.split(SLASH_UNIT).map((part, index) =>
    index % 2 === 1 ? <span key={index} className="whitespace-nowrap">{part}</span> : <Fragment key={index}>{part}</Fragment>,
  );
}

function Figures({ text }: { text: string }) {
  return text.split(TRANSITION).map((part, index) =>
    index % 2 === 1 ? <span key={index} className="whitespace-nowrap">{part}</span> : <Units key={index} text={part} />,
  );
}

export function KeepTogether({ text, title = false }: { text: string; title?: boolean }) {
  const clauses = text.split(title ? BAR_OR_COLON : BAR);
  if (clauses.length === 1) return <Figures text={text} />;
  // Each clause keeps its trailing mark, so the mark ends a line instead of starting the next one.
  return clauses.map((clause, index) => (
    <Fragment key={index}>
      {index > 0 && !/[｜：]$/.test(clauses[index - 1]) ? " " : null}
      <span className="inline-block"><Figures text={clause} /></span>
    </Fragment>
  ));
}
