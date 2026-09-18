import {
  ArrowUpRightIcon,
  SparkleIcon,
  StackIcon,
  StrategyIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SkillsContent } from "@/content/skills";
import styles from "./SkillsRadar.module.css";

const GROUP_ICONS = {
  product: <StrategyIcon size={18} weight="regular" aria-hidden="true" />,
  ai: <SparkleIcon size={18} weight="regular" aria-hidden="true" />,
  systems: <StackIcon size={18} weight="regular" aria-hidden="true" />,
  delivery: <UsersThreeIcon size={18} weight="regular" aria-hidden="true" />,
};

export function SkillsRadar({ content }: { content: SkillsContent }) {
  return (
    <section id="skills" className="content-section" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <header className={styles.header}>
          <h2 id="skills-heading" className="section-title">{content.title}</h2>
          <div>
            <p className={styles.intro}>{content.intro}</p>
            <p className={styles.total}>{content.totalLabel}</p>
          </div>
        </header>

        <div className={styles.sectionBlock}>
          <h3>{content.featuredTitle}</h3>
          <ol className={styles.featured}>
            {content.featured.map((skill) => (
              <li key={skill.id} data-featured-skill={skill.id}>
                <div className={styles.skillName}>
                  <h4>{skill.name}</h4>
                  <p>{skill.summary}</p>
                </div>
                <p className={styles.proof}>{skill.proof}</p>
                <div className={styles.references}>
                  <span>{content.evidenceLabel}</span>
                  <div>
                    {skill.references.map((reference) => (
                      <a key={reference.href} href={reference.href}>
                        {reference.label}
                        <ArrowUpRightIcon size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <details className={`${styles.sectionBlock} ${styles.library}`}>
          <summary className={styles.librarySummary}>
            <h3>{content.libraryTitle}</h3>
            <span>
              <span className={styles.libraryClosedLabel}>{content.expandLibraryLabel}</span>
              <span className={styles.libraryOpenLabel}>{content.collapseLibraryLabel}</span>
              <ArrowUpRightIcon className={styles.libraryIcon} size={16} aria-hidden="true" />
            </span>
          </summary>
          <div className={styles.groups}>
            {content.groups.map((group, index) => {
              const headingId = `skill-group-${index}`;
              return (
                <div key={group.title} className={styles.group} role="group" aria-labelledby={headingId}>
                  <h4 id={headingId}>
                    {GROUP_ICONS[group.kind]}
                    <span>{group.title}</span>
                  </h4>
                  <ul>
                    {group.items.map((skill) => (
                      <li key={skill.name} data-skill={skill.name}>
                        <a href={skill.href}>{skill.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </section>
  );
}
