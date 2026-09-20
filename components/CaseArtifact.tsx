import Image from "next/image";
import { caseArtifacts } from "@/content/caseArtifacts";
import type { Locale } from "@/lib/locale";
import styles from "./CaseArtifact.module.css";

export function CaseArtifact({ caseId, locale, compact = false }: { caseId: string; locale: Locale; compact?: boolean }) {
  const artifact = caseArtifacts[locale][caseId];

  if (!artifact) return null;

  const treatment = artifact.treatment ?? "anonymised";
  const labels = {
    zh: {
      anonymised: { eyebrow: "真實工作產物", privacy: "細節已模糊" },
      published: { eyebrow: "公開工作成果", privacy: "公開發表素材" },
      reconstructed: { eyebrow: "案例資訊重製", privacy: "依工作內容重製" },
    },
    en: {
      anonymised: { eyebrow: "REAL WORK ARTIFACT", privacy: "DETAILS ANONYMISED" },
      published: { eyebrow: "PUBLISHED WORK", privacy: "PUBLIC SOURCE" },
      reconstructed: { eyebrow: "CASE RECONSTRUCTION", privacy: "REBUILT FROM PROJECT FACTS" },
    },
  }[locale][treatment];

  return (
    <figure className={styles.figure}>
      <div className={`${styles.frame} ${artifact.layout === "square" ? styles.squareFrame : ""} ${compact ? styles.compactFrame : ""}`}>
        <Image
          className={styles.image}
          src={artifact.src}
          alt={artifact.alt}
          width={artifact.layout === "square" ? 1208 : 1200}
          height={artifact.layout === "square" ? 1236 : 674}
          sizes="(max-width: 767px) 88vw, (max-width: 1023px) 70vw, 38vw"
        />
        <span className={styles.privacy}>{labels.privacy}</span>
      </div>
      <figcaption className={styles.caption}>
        <span>{labels.eyebrow}</span>
        <strong>{artifact.title}</strong>
        <p>{artifact.context}</p>
      </figcaption>
    </figure>
  );
}
