"use client";

import { useEffect, useState } from "react";
import styles from "./CaseNavigator.module.css";

interface CaseNavigatorProps {
  label: string;
  links: { href: `#${string}`; label: string }[];
}

/**
 * Sticky chapter navigator for a case page. Plain anchors work without JavaScript; once hydrated,
 * the chapter in view is marked with aria-current. Reading progress lives only in the site header,
 * so the rail never shows a second indicator that disagrees with the current chapter.
 */
export function CaseNavigator({ label, links }: CaseNavigatorProps) {
  const [active, setActive] = useState<string>(links[0]?.href ?? "");

  useEffect(() => {
    const targets = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!targets.length) return;

    // A thin band at ~35% of the viewport: whichever chapter covers it is the one being read.
    // IntersectionObserver only fires on crossings, so nothing runs per scroll frame.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-35% 0px -64% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className={styles.navigator} aria-label={label}>
      <ol className={styles.list}>
        {links.map((link, index) => (
          <li key={link.href}>
            <a
              className={styles.link}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
            >
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
