import type { AnchorHTMLAttributes, ReactNode } from "react";

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { children: ReactNode }

/** Keep action feedback in CSS so the primary links need no client bundle. */
export function MagneticLink({ children, className, ...props }: MagneticLinkProps) {
  return <a {...props} className={["action-link", className].filter(Boolean).join(" ")}>{children}</a>;
}
