// Raster sources that have a 512x320 tile in /thumbs (see scripts/wall-thumbs.py). SVGs need none.
const THUMBED = new Set([
  ...Array.from(
    { length: 8 },
    (_, index) => `/portfolio-wall/film-${index + 1}.webp`,
  ),
  "/portfolio-artifacts/ecofirst-hvac-platform.webp",
  "/linkedin-posts/post-1.jpg",
  "/linkedin-posts/post-2.jpg",
]);

/** The small tile for a source shown at card size, or the source itself when it has none. */
export function thumb(src: string): string {
  if (!THUMBED.has(src)) return src;
  const name = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
  return `/thumbs/${name}.webp`;
}
