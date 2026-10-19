/**
 * Short share links: `/?s=threads` instead of a full UTM string. The code must look like a slug;
 * its first segment (before "-") picks the medium, so `threads-launch` and `threads` both read as social.
 * Kept free of imports so scripts and tests can load it directly; scripts/share-link.mjs and
 * backend/pb_hooks/lib.js repeat the same pattern.
 */
export const SHORT_PARAM = "s";
export const SHORT_CODE_PATTERN = "^[a-z0-9][a-z0-9_-]{0,39}$";

/**
 * True when a code reads as a share channel (its first segment is one), so it can never name a company:
 * the analytics rewrite would file `line-pm` under LINE, and the tailored overlay skips channel visitors.
 */
export function isChannelCode(
  code: string,
  channels: Readonly<Record<string, string>>,
): boolean {
  return Object.prototype.hasOwnProperty.call(channels, code.split("-")[0]);
}

/**
 * A visitor's tailored code: `s`, then `utm_source`, then the code saved earlier this visit. A present but
 * invalid parameter wins over the saved code and yields null; channel codes yield null too.
 * Self-contained on purpose (no outside names): TailoredBoot inlines its source as the
 * head script, so the tested function and the shipped one are the same text.
 */
export function resolveTailoredCode(
  search: string,
  saved: string | null,
  pattern: string,
  channels: Readonly<Record<string, string>>,
): string | null {
  const query = new URLSearchParams(search);
  // "s" is SHORT_PARAM, spelled out because the inlined source cannot see module constants
  let raw = query.get("s");
  if (raw === null) raw = query.get("utm_source");
  const code = (raw === null ? saved || "" : raw).trim().toLowerCase();
  if (!new RegExp(pattern).test(code)) return null;
  if (Object.prototype.hasOwnProperty.call(channels, code.split("-")[0]))
    return null;
  return code;
}
