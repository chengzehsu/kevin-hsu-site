import { ArrowRightIcon, ArrowUpRightIcon, ArticleIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import styles from "./Awards.module.css";

export function Awards({ content }: SectionProps) {
  const { title, items } = content.awards;

  return (
    <section id="awards" aria-labelledby="awards-heading" className="content-section">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 id="awards-heading" className="section-title scroll-rise">{title}</h2>
        <ul className={styles.list}>
          {items.map((item) => {
            const Icon = item.kind === "award" ? TrophyIcon : ArticleIcon;
            const external = item.link.href.startsWith("https://");
            const Arrow = external ? ArrowUpRightIcon : ArrowRightIcon;
            const period = item.kind === "award"
              ? item.year
              : content.cases.items.find((project) => project.id === item.caseId)?.period;

            return (
              <li
                key={item.id}
                className={`${styles.item} ${item.kind === "award" ? styles.awardItem : ""} scroll-rise`}
                data-recognition={item.kind}
              >
                <div className={styles.meta}>
                  <span className={styles.icon}>
                    <Icon size={22} weight="regular" aria-hidden="true" />
                  </span>
                  <span>{item.category}</span>
                  {period ? <span className={styles.period}>{period}</span> : null}
                </div>
                <p className={styles.distinction}>{item.distinction}</p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <a
                  className={`${styles.link} action-link`}
                  href={item.link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.link.label}
                  <Arrow size={18} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
