import type { CSSProperties } from "react";
import { CASE_WALL_TILES } from "@/content/caseArtifacts";
import { thumb } from "@/lib/thumb";
import styles from "./CasePage.module.css";

const ROWS = 3;
const PER_ROW = 7;

/**
 * A quieter echo of the portfolio wall behind each case hero. The case's own artifact and stills
 * lead the sequence; decorative only, hidden from assistive tech.
 */
export function CaseBackdrop({ lead }: { lead: (string | undefined)[] }) {
  const own = lead.filter((src): src is string => Boolean(src));
  const tiles = [...own, ...CASE_WALL_TILES.filter((src) => !own.includes(src))].map(thumb);
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.backdropPlane}>
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className={styles.backdropRow} style={{ "--row": row } as CSSProperties}>
            {Array.from({ length: PER_ROW }, (_, index) => (
              <img
                key={index}
                src={tiles[(row * 3 + index * 2) % tiles.length]}
                alt=""
                width={240}
                height={150}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
