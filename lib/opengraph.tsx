import type { ReactElement } from "react";
import { getContent } from "@/content";
import type { Locale } from "@/lib/locale";

const CARD_CONTENT: Record<Locale, { eyebrow: string; impacts: Array<{ value: string; label: string }> }> = {
  zh: {
    eyebrow: "產品管理 · 將系統化為成果",
    impacts: [
      { value: "1,000", label: "單／日揀貨產能" },
      { value: "+120%", label: "電商平台營業額" },
      { value: "10M", label: "客戶資料整合" },
    ],
  },
  en: {
    eyebrow: "PRODUCT MANAGEMENT · SYSTEMS TO RESULTS",
    impacts: [
      { value: "1,000", label: "orders/day capacity" },
      { value: "+120%", label: "platform revenue" },
      { value: "10M", label: "customer records integrated" },
    ],
  },
};

/**
 * Shared image composition for the statically exported social cards. Keeping it
 * as JSX (rather than an SVG asset) lets the Chinese and English routes use the
 * same visual system while retaining their own message and URL.
 */
export function OpenGraphCard(locale: Locale): ReactElement {
  const content = getContent(locale);
  const card = CARD_CONTENT[locale];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        padding: "68px 76px",
        color: "#edf7f7",
        backgroundColor: "#10262f",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-270px",
          right: "-100px",
          width: "670px",
          height: "670px",
          border: "1px solid rgba(116, 222, 194, 0.42)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-145px",
          right: "25px",
          width: "420px",
          height: "420px",
          border: "1px solid rgba(116, 222, 194, 0.18)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#74dec2",
          fontSize: "23px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {card.eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: "940px", flexShrink: 0 }}>
        <div style={{ display: "flex", fontSize: "58px", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.08 }}>
          {content.nav.brand}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "22px",
            color: "#d5e4e5",
            fontSize: locale === "zh" ? "41px" : "31px",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.23,
          }}
        >
          {content.hero.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0px",
          borderTop: "1px solid rgba(189, 219, 219, 0.32)",
          borderBottom: "1px solid rgba(189, 219, 219, 0.32)",
          flexShrink: 0,
        }}
      >
        {card.impacts.map((impact, index) => (
          <div
            key={impact.value}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "33.333%",
              padding: "25px 28px 26px",
              ...(index === 0 ? {} : { borderLeft: "1px solid rgba(189, 219, 219, 0.24)" }),
            }}
          >
            <div style={{ color: "#74dec2", fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em" }}>
              {impact.value}
            </div>
            <div style={{ display: "flex", marginTop: "7px", color: "#b9ced0", fontSize: "18px", fontWeight: 500 }}>
              {impact.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
