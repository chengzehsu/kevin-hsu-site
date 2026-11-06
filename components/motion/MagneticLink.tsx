import type { AnchorHTMLAttributes, ReactNode } from "react";

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { children: ReactNode }

/** Keep action feedback in CSS so the primary links need no client bundle. */
export function MagneticLink({ children, className, ...props }: MagneticLinkProps) {
  // A button: it shares the arrow nudge of action links (data-magnetic keeps it out of the text-link underline).
  return <a {...props} data-magnetic="" className={["action-link", className].filter(Boolean).join(" ")}>{children}</a>;
}
