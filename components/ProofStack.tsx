import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { SectionProps } from "@/content/types";
import { caseArtifacts } from "@/content/caseArtifacts";
import { casePath } from "@/lib/locale";
import { KeepTogether } from "./KeepTogether";
import styles from "./ProofStack.module.css";

/** Home case index: four posters, one artifact and one outcome each. The full cases live on /portfolio/. */
export function ProofStack({ content, locale }: SectionProps) {
  const { cases, hero } = content;
  const items = [...cases.items].sort((a, b) => a.rank - b.rank);

  return (
    <section id="work" className={`content-section ${styles.section}`} aria-labelledby="work-heading">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8">
        <div className={`${styles.header} scroll-rise`}>
          <h2 id="work-heading" className="section-title">{cases.title}</h2>
          <a className={`${styles.all} action-link`} href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
            <ArrowRightIcon size={18} aria-hidden="true" />
          </a>
        </div>
        <ol className={styles.row}>
          {items.map((item) => {
            const artifact = caseArtifacts[locale][item.id];
            // The first clause is the headline outcome; the rest stays on the case page.
            const outcome = item.impact.split("｜")[0];
            return (
              <li key={item.id} className={`${styles.poster} scroll-rise`}>
                <a className={styles.link} href={casePath(locale, item.id)} aria-label={`${cases.readLabel}: ${item.title}`}>
                  {artifact ? (
                    <Image
                      src={artifact.poster ?? artifact.src}
                      alt=""
                      width={artifact.poster ? 1600 : artifact.layout === "square" ? 1208 : 1200}
                      height={artifact.poster ? 1000 : artifact.layout === "square" ? 1236 : 674}
                      sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 22vw"
                      className={styles.image}
                      style={artifact.posterPosition ? { objectPosition: artifact.posterPosition } : undefined}
                    />
                  ) : null}
                  <span className={styles.copy}>
                    <span className={styles.meta}>{item.org}</span>
                    <span className={styles.outcome}><KeepTogether text={outcome} /></span>
                    <span className={styles.title}><KeepTogether text={item.title} title /></span>
                    <ArrowUpRightIcon className={styles.arrow} size={20} aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
