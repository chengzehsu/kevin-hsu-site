import type { Metadata } from "next";
import { getContent } from "@/content";
import { localePath, SITE_ORIGIN, type Locale } from "@/lib/locale";

/**
 * Page metadata per locale. Consumed by app/(zh)/page.tsx and app/en/page.tsx.
 * hreflang uses "zh-Hant" because Next's Languages type is a closed union that
 * does not include "zh-Hant-TW"; it also matches the :lang(zh-Hant) rules in globals.css.
 */
export function buildMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const { title, description } = content.meta;
  const url = localePath(locale);
  const socialImage = `${locale === "zh" ? "/opengraph-image" : "/en/opengraph-image"}?v=20260915`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: url,
      languages: {
        "zh-Hant": "/",
        en: "/en/",
        "x-default": "/",
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === "zh" ? "zh_TW" : "en_US",
      type: "website",
      siteName: content.nav.brand,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
