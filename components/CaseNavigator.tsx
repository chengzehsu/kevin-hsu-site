import type { CaseStudy } from "@/content/types";
import styles from "./CaseNavigator.module.css";

interface CaseNavigatorProps {
  title: string;
  items: CaseStudy[];
}

/** A compact table of contents: each case remains a normal anchor destination. */
export function CaseNavigator({ title, items }: CaseNavigatorProps) {
  return (
    <nav className={styles.navigator} aria-label={title}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li className={styles.item} key={item.id}>
            <a
              className={`${styles.link} ${index === 0 ? styles.flagshipLink : ""}`}
              href={`#${item.id}`}
            >
              <span className={styles.number} aria-hidden="true" />
              <span className={styles.copy}>
                <strong>{item.title}</strong>
                <span>{item.impact}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
