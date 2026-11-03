import { caseArtifacts } from "@/content/caseArtifacts";
import type { Locale } from "@/lib/locale";
import { srcSetFor } from "@/lib/responsive-image";
import styles from "./CaseArtifact.module.css";

type Variant = "cover" | "full";

const LABELS = {
  zh: {
    anonymised: { eyebrow: "實際工作畫面", privacy: "細節已匿名" },
    published: { eyebrow: "公開發表的成果", privacy: "可公開查看" },
    reconstructed: { eyebrow: "依案例重新製作", privacy: "非原始畫面" },
  },
  en: {
    anonymised: {
      eyebrow: "REAL WORK SAMPLE",
      privacy: "ANONYMIZED",
    },
    published: { eyebrow: "PUBLISHED WORK", privacy: "PUBLIC" },
    reconstructed: {
      eyebrow: "RECREATED CASE VISUAL",
      privacy: "RECREATED",
    },
  },
} as const;

/**
 * The real work product behind a case. `cover` is a captionless poster for the portfolio list;
 * `full` is the large, captioned plate on the case page.
 */
export function CaseArtifact({
  caseId,
  locale,
  variant = "full",
  eager = false,
  sizes = "(max-width: 767px) 92vw, (max-width: 1023px) 80vw, 60vw",
  image,
}: {
  caseId: string;
  locale: Locale;
  variant?: Variant;
  eager?: boolean;
  sizes?: string;
  /** Shows this picture instead of the artifact's own, keeping its label. The portfolio grid uses it. */
  image?: { src: string; alt: string };
}) {
  const artifact = caseArtifacts[locale][caseId];
  if (!artifact) return null;

  const { src, alt } = image ?? artifact;
  const labels = LABELS[locale][artifact.treatment ?? "anonymised"];
  const square = artifact.layout === "square";
  // Raster sources top out at ~1,200px. On a wide cover they sit at a sharp size over a blurred
  // copy of themselves, so the row still reads full-bleed without upscaling the real pixels.
  const ambient =
    variant === "cover" && !src.endsWith(".svg") && !artifact.sharp;

  return (
    <figure
      className={`${styles.figure} ${variant === "cover" ? styles.cover : styles.full}`}
      data-shape={square ? "square" : "wide"}
    >
      <div className={styles.frame} data-ambient={ambient ? "" : undefined}>
        {ambient ? (
          <img
            className={styles.backdrop}
            src={src}
            srcSet={srcSetFor(src)}
            alt=""
            aria-hidden="true"
            width={square ? 1208 : 1200}
            height={square ? 1236 : 674}
            sizes="10vw"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : null}
        {/* A plain <img>: the static export has no image optimiser, so next/image would write no srcset. */}
        <img
          className={styles.image}
          src={src}
          srcSet={srcSetFor(src)}
          alt={alt}
          width={square ? 1208 : 1200}
          height={square ? 1236 : 674}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
        <span className={styles.privacy}>{labels.privacy}</span>
      </div>
      {variant === "full" ? (
        <figcaption className={styles.caption}>
          <span>{labels.eyebrow}</span>
          <strong>{artifact.title}</strong>
          <p>{artifact.context}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
