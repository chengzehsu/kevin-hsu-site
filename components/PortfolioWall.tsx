import type { CSSProperties } from "react";
import { casePath, type Locale } from "@/lib/locale";
import { thumb } from "@/lib/thumb";
import styles from "./PortfolioWall.module.css";

/** One real, already-public work product, and the case that explains it. */
interface Tile {
  caseId: string;
  zh: { src: string; label: string };
  en: { src: string; label: string };
}

const same = (caseId: string, src: string, zh: string, en: string): Tile => ({
  caseId,
  zh: { src, label: zh },
  en: { src, label: en },
});

const localized = (
  caseId: string,
  base: string,
  zh: string,
  en: string,
  zhSuffix = ".zh",
): Tile => ({
  caseId,
  zh: { src: `${base}${zhSuffix}.svg`, label: zh },
  en: { src: `${base}.en.svg`, label: en },
});

const A = "/portfolio-artifacts";

const TILES: Tile[] = [
  same(
    "internal-backend",
    `${A}/internal-backend-overview.webp`,
    "內部後台｜資料回傳總覽",
    "Internal platform | Data-collection overview",
  ),
  localized(
    "grocery",
    `${A}/grocery-system`,
    "蔬果電商｜專案系統",
    "E-commerce | Project system",
  ),
  same(
    "internal-backend",
    `${A}/internal-backend-warroom.webp`,
    "內部後台｜節能戰情室",
    "Internal platform | Energy dashboard",
  ),
  localized(
    "ecofirst",
    `${A}/ecofirst-ops`,
    "AI 節能產品｜營運系統",
    "AI energy | Operating model",
  ),
  localized(
    "health-app",
    `${A}/health-spec`,
    "健康 App｜規格與對照表",
    "Health app | Spec and mapping tables",
  ),
  same(
    "internal-backend",
    `${A}/internal-backend-site-health.webp`,
    "內部後台｜資料回傳健康頁",
    "Internal platform | Data-collection health",
  ),
  localized(
    "cdp",
    `${A}/cdp-market-validation`,
    "跨通路資料｜市場驗證",
    "Customer data | Market validation",
    "",
  ),
  same(
    "sensor-naming",
    "/ai-covers/naming-core.svg",
    "點位命名｜共用程式",
    "Sensor naming | Shared tool",
  ),
  same(
    "internal-backend",
    `${A}/internal-backend-timeseries.webp`,
    "內部後台｜時序圖",
    "Internal platform | Time series",
  ),
  localized(
    "namecard",
    `${A}/namecard-journey`,
    "AI 名片管理助手｜使用流程",
    "Card assistant | User journey",
  ),
  same(
    "sales-faq",
    "/ai-covers/faq-entry.svg",
    "Sales FAQ｜問答入口",
    "Sales FAQ | Q&A tool",
  ),
  {
    caseId: "resume-site",
    zh: { src: "/hero-reel-poster-small.zh.webp", label: "這個網站｜開場影片" },
    en: { src: "/hero-reel-poster-small.en.webp", label: "This site | Launch film" },
  },
  same(
    "life-hub",
    "/ai-covers/life-pipeline.svg",
    "生活中控台｜資料流程",
    "Life hub | Data pipeline",
  ),
  same(
    "namecard",
    "/linkedin-posts/post-2.jpg",
    "AI 名片管理助手｜實作紀錄",
    "Card assistant | Build notes",
  ),
];

const ROWS = 5;
const PER_ROW = 9;

/**
 * The tilted wall behind the portfolio hero doubles as an index of real work: every tile names its
 * case on hover and opens it. Pointer-only by design: the same cases are listed as real links below,
 * so the wall stays hidden from assistive tech and out of the keyboard order.
 */
export function PortfolioWall({ locale }: { locale: Locale }) {
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
              const tile = TILES[(row * 5 + index * 3) % TILES.length];
              const { src, label } = tile[locale];
              return (
                <a
                  key={index}
                  className={styles.tile}
                  href={casePath(locale, tile.caseId)}
                  tabIndex={-1}
                >
                  <img
                    src={thumb(src)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={240}
                    height={150}
                  />
                  <span className={styles.label}>{label}</span>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
