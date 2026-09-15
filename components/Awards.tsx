import { ArrowRightIcon, ArrowUpRightIcon, ArticleIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { Reveal } from "./motion/Reveal";
import styles from "./Awards.module.css";

export function Awards({ content }: SectionProps) {
  const { title, items } = content.awards;

  return (
    <section id="awards" aria-labelledby="awards-heading" className="content-section">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <h2 id="awards-heading" className="section-title">{title}</h2>
        <ul className={styles.list}>
          {items.map((item, index) => {
            const Icon = item.kind === "award" ? TrophyIcon : ArticleIcon;
            const external = item.link.href.startsWith("https://");
            const Arrow = external ? ArrowUpRightIcon : ArrowRightIcon;

            return (
              <li key={item.id} className={styles.item} data-recognition={item.kind}>
                <Reveal delay={index * 0.06}>
                  <div className={styles.meta}>
                    <span><time dateTime={item.year}>{item.year}</time><span aria-hidden="true"> · </span>{item.category}</span>
                    <Icon size={24} weight="regular" aria-hidden="true" />
                  </div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={`${styles.distinction} ${item.kind === "award" ? styles.award : ""}`}>
                    {item.distinction}
                  </p>
                  <p className={styles.description}>{item.description}</p>
                  <a
                    className={`${styles.link} action-link`}
                    href={item.link.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.link.label}
                    <Arrow size={18} aria-hidden="true" />
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
