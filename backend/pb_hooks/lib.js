// Shared by the hooks in main.pb.js. PocketBase runs each handler in its own isolated context,
// so handlers load this file with require() instead of closing over top-level values.
module.exports = {
  // Same pattern as lib/analytics.ts SHORT_CODE_PATTERN and scripts/share-link.mjs.
  CODE: /^[a-z0-9][a-z0-9_-]{0,39}$/,
  // Every code in lib/share-channels.json (this service cannot read the site's files);
  // scripts/test-variants.mjs fails when the two lists drift apart.
  CHANNELS: [
    "threads",
    "ig",
    "instagram",
    "fb",
    "facebook",
    "linkedin",
    "x",
    "twitter",
    "dcard",
    "medium",
    "104",
    "1111",
    "cake",
    "cakeresume",
    "yourator",
    "meetjob",
    "glints",
    "line",
    "email",
    "mail",
    "messenger",
    "telegram",
  ],
  BAD_CODE: "追蹤代碼只能用英文小寫、數字、- 或 _，最長 40 字",
  CHANNEL_CODE:
    "追蹤代碼不能用分享渠道的名稱開頭（例如 line、104），改用公司名開頭",

  /** Why a tracking code cannot be saved, or null. Mirrors codeProblem in components/admin/ApplicationsView.tsx. */
  codeProblem(code) {
    if (!this.CODE.test(code)) return this.BAD_CODE;
    if (this.CHANNELS.indexOf(code.split("-")[0]) !== -1)
      return this.CHANNEL_CODE;
    return null;
  },
  DRAFT: "準備中",
  LOCKED: "這個版本已經寄出，請複製成新版本再修改",
  SENT: "這筆投遞已經寄出，綁定的版本和追蹤代碼不能再改，狀態也不能改回準備中",
  UMAMI_API: "https://api.umami.is/v1",
  // The site's Umami website id (lib/analytics.ts UMAMI_WEBSITE_ID); UMAMI_WEBSITE_ID in the env overrides it.
  UMAMI_WEBSITE: "43329ffa-00ef-4c70-afef-7150de6ed1ae",
  STATS_DAYS: 180,
  STATS_TTL_MS: 5 * 60 * 1000,

  /** JSON field values come back as raw bytes or strings; always hand the client a plain object. */
  overlay(record, locale) {
    const raw = record.get(locale);
    if (raw == null) return {};
    try {
      const value =
        typeof raw === "string" ? JSON.parse(raw) : JSON.parse(toString(raw));
      return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : {};
    } catch (_) {
      return {};
    }
  },

  /** True when an application that is no longer a draft points at this variant. */
  isSent(app, variantId, draft) {
    const sent = app.findRecordsByFilter(
      "applications",
      "variant = {:id} && status != {:draft}",
      "",
      1,
      0,
      { id: variantId, draft },
    );
    return sent.length > 0;
  },
};
