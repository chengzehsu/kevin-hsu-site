import {
  ArrowUpRightIcon,
  PlusIcon,
  SparkleIcon,
  StackIcon,
  StrategyIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { SkillsContent, SkillsRadarContent } from "@/content/skills";
import styles from "./SkillsRadar.module.css";

const GROUP_ICONS = {
  product: <StrategyIcon size={18} weight="regular" aria-hidden="true" />,
  ai: <SparkleIcon size={18} weight="regular" aria-hidden="true" />,
  systems: <StackIcon size={18} weight="regular" aria-hidden="true" />,
  delivery: <UsersThreeIcon size={18} weight="regular" aria-hidden="true" />,
};

/* Radar geometry in a 400 x 400 viewBox; axis 0 points straight up, as in the launch film. */
const SIZE = 400;
const C = SIZE / 2;
const R = 136;
const angle = (k: number) => -Math.PI / 2 + (k * Math.PI * 2) / 6;
const point = (k: number, v: number, r = R) => [
  C + Math.cos(angle(k)) * r * v,
  C + Math.sin(angle(k)) * r * v,
];
const shape = (values: number[], r = R) =>
  values
    .map((v, k) =>
      point(k, v, r)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");
const RINGS = [0.25, 0.5, 0.75, 1];
const AXIS_KEYS = [0, 1, 2, 3, 4, 5];

function Radar({ radar }: { radar: SkillsRadarContent }) {
  return (
    <figure className={styles.radar}>
      <div className={styles.radarPlot}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`${radar.label}: ${radar.axes.join(" / ")}`}
        >
          {RINGS.map((v) => (
            <polygon
              key={v}
              className={styles.ring}
              points={shape(AXIS_KEYS.map(() => v))}
            />
          ))}
          {AXIS_KEYS.map((k) => {
            const [x, y] = point(k, 1);
            return (
              <line
                key={k}
                className={styles.spoke}
                x1={C}
                y1={C}
                x2={x}
                y2={y}
              />
            );
          })}
          <polygon className={styles.from} points={shape(radar.from.values)} />
          <g className={styles.to}>
            <polygon points={shape(radar.to.values)} />
            {radar.to.values.map((v, k) => {
              const [x, y] = point(k, v);
              return <circle key={k} cx={x} cy={y} r={5} />;
            })}
          </g>
        </svg>
        {radar.axes.map((axis, k) => {
          const [x, y] = point(k, 1, R + 34);
          return (
            <span
              key={axis}
              className={styles.axis}
              style={{
                left: `${(x / SIZE) * 100}%`,
                top: `${(y / SIZE) * 100}%`,
              }}
              aria-hidden="true"
            >
              {axis}
            </span>
          );
        })}
      </div>
      <figcaption>
        <span className={styles.legend}>
          <span className={styles.legendFrom}>{radar.from.label}</span>
          <span className={styles.legendTo}>{radar.to.label}</span>
        </span>
        <strong>{radar.caption}</strong>
        <span className={styles.note}>{radar.note}</span>
      </figcaption>
    </figure>
  );
}

export function SkillsRadar({ content }: { content: SkillsContent }) {
  return (
    <section
      id="skills"
      className="content-section"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <header className={`${styles.header} scroll-rise`}>
          <h2 id="skills-heading" className="section-title">
            {content.title}
          </h2>
          <p className={styles.intro}>{content.intro}</p>
        </header>

        <div className={styles.stage}>
          <div className={`${styles.radarColumn} scroll-rise`}>
            <Radar radar={content.radar} />
          </div>

          <div>
            <h3 className={styles.featuredTitle}>{content.featuredTitle}</h3>
            <ol className={styles.featured}>
              {content.featured.map((skill, index) => (
                <li
                  key={skill.id}
                  data-featured-skill={skill.id}
                  className="scroll-rise"
                >
                  <p className={styles.skillLabel}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {skill.name}
                  </p>
                  <h4 className={styles.statement}>{skill.statement}</h4>
                  <p className={styles.summary}>{skill.summary}</p>
                  <p className={styles.proof}>{skill.proof}</p>
                  <p className={styles.references}>
                    <span>{content.evidenceLabel}</span>
                    {skill.references.map((reference) => (
                      <a key={reference.href} href={reference.href}>
                        {reference.label}
                        <ArrowUpRightIcon size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <details className={styles.library}>
          <summary className={styles.librarySummary}>
            <span className={styles.libraryAction}>
              <PlusIcon
                className={styles.libraryIcon}
                size={16}
                weight="bold"
                aria-hidden="true"
              />
              <span className={styles.libraryClosedLabel}>
                {content.expandLibraryLabel}
              </span>
              <span className={styles.libraryOpenLabel}>
                {content.collapseLibraryLabel}
              </span>
            </span>
            <span className={styles.total}>{content.totalLabel}</span>
          </summary>
          <div className={styles.libraryBody}>
            <h3 className={styles.libraryTitle}>{content.libraryTitle}</h3>
            <div className={styles.groups}>
              {content.groups.map((group, index) => {
                const headingId = `skill-group-${index}`;
                return (
                  <div
                    key={group.title}
                    className={styles.group}
                    data-kind={group.kind}
                    role="group"
                    aria-labelledby={headingId}
                  >
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
          </div>
        </details>
      </div>
    </section>
  );
}
