import type { ReactNode } from "react";

const KEY_TERMS =
  /(?:AI|AWS|CDP|PRD|Scrum|SaaS|LINE|Facebook|Chatbot|POS|App|Roadmap|Agile|QA|MVP|NT\$[\d,.]+(?:\s?(?:萬|M\+?))?|\+?[\d][\d,]*(?:\s?[％%]|　?單[／/]日|　?(?:人|週|間|萬\+?|度|筆|天|月|年)))/u;

/** Surfaces product scope, delivery methods, and evidence for a fast hiring scan. */
export function Highlight({ children }: { children: string }): ReactNode {
  const fragments = children.split(KEY_TERMS);

  return fragments.map((fragment, index) =>
    KEY_TERMS.test(fragment) ? (
      <mark key={`${fragment}-${index}`} className="keyword">
        {fragment}
      </mark>
    ) : (
      fragment
    ),
  );
}
