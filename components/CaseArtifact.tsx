import Image from "next/image";
import { caseArtifacts } from "@/content/caseArtifacts";
import type { Locale } from "@/lib/locale";
import styles from "./CaseArtifact.module.css";

type Variant = "cover" | "full";

const LABELS = {
  zh: {
    anonymised: { eyebrow: "真實工作產物", privacy: "細節已模糊" },
    published: { eyebrow: "公開工作成果", privacy: "公開發表素材" },
    reconstructed: { eyebrow: "案例資訊重製", privacy: "依工作內容重製" },
  },
  en: {
    anonymised: {
      eyebrow: "REAL WORK ARTIFACT",
      privacy: "DETAILS ANONYMISED",
    },
    published: { eyebrow: "PUBLISHED WORK", privacy: "PUBLIC SOURCE" },
    reconstructed: {
      eyebrow: "CASE RECONSTRUCTION",
      privacy: "REBUILT FROM PROJECT FACTS",
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
}: {
  caseId: string;
  locale: Locale;
  variant?: Variant;
  eager?: boolean;
  sizes?: string;
}) {
  const artifact = caseArtifacts[locale][caseId];
  if (!artifact) return null;

  const labels = LABELS[locale][artifact.treatment ?? "anonymised"];
  const square = artifact.layout === "square";

  return (
    <figure
      className={`${styles.figure} ${variant === "cover" ? styles.cover : styles.full}`}
      data-shape={square ? "square" : "wide"}
    >
      <div className={styles.frame}>
        <Image
          className={styles.image}
          src={artifact.src}
          alt={artifact.alt}
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
