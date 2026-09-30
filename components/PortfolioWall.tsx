import type { CSSProperties } from "react";
import styles from "./PortfolioWall.module.css";

// Every tile is a real, already-public artifact: case deliverables, LinkedIn build notes, and launch-film frames.
const TILES = [
  "/portfolio-artifacts/ecofirst-hvac-platform.webp",
  "/portfolio-wall/film-5.webp",
  "/portfolio-artifacts/grocery-system.webp",
  "/linkedin-posts/post-1.jpg",
  "/portfolio-wall/film-7.webp",
  "/portfolio-artifacts/health-spec.webp",
  "/portfolio-wall/film-2.webp",
  "/linkedin-posts/post-2.jpg",
  "/portfolio-wall/film-4.webp",
  "/portfolio-artifacts/cdp-market-validation.svg",
  "/portfolio-wall/film-6.webp",
  "/flow-preview-small.webp",
  "/portfolio-wall/film-1.webp",
  "/linkedin-posts/post-3.jpg",
  "/portfolio-wall/film-8.webp",
  "/portfolio-wall/film-3.webp",
];
const ROWS = 5;
const PER_ROW = 9;

/** Decorative tilted wall of the work behind the portfolio hero; hidden from assistive tech. */
export function PortfolioWall() {
  return (
    <div className={styles.wall} aria-hidden="true">
      <div className={styles.plane}>
        {Array.from({ length: ROWS }, (_, row) => (
          <div
            key={row}
            className={styles.row}
            style={{ "--row": row } as CSSProperties}
          >
            {Array.from({ length: PER_ROW }, (_, index) => {
              // Offset each row by a prime step so the same tile never stacks directly above itself.
              const src = TILES[(row * 5 + index * 3) % TILES.length];
              return (
                <img
                  key={index}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={240}
                  height={150}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
