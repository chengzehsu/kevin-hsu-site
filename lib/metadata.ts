import type { Metadata } from "next";
import { getContent } from "@/content";
import type { CaseStudy } from "@/content/types";
import { casePath, localePath, portfolioPath, SITE_ORIGIN, type Locale } from "@/lib/locale";

/**
 * Page metadata per locale. Consumed by app/(zh)/page.tsx and app/en/page.tsx.
 * hreflang uses "zh-Hant" because Next's Languages type is a closed union that
 * does not include "zh-Hant-TW"; it also matches the :lang(zh-Hant) rules in globals.css.
 */
export function buildMetadata(locale: Locale, item?: CaseStudy): Metadata {
  const content = getContent(locale);
  const title = item ? `${item.title} | ${content.nav.brand}` : content.meta.title;
  const description = item ? `${item.impact}. ${item.ownership}` : content.meta.description;
  const url = item ? casePath(locale, item.id) : localePath(locale);
  const zhPath = item ? casePath("zh", item.id) : "/";
  const enPath = item ? casePath("en", item.id) : "/en/";
  const socialImage = `${SITE_ORIGIN}${locale === "zh" ? "/opengraph-image" : "/en/opengraph-image"}?v=20260915`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: url,
      languages: {
        "zh-Hant": zhPath,
        en: enPath,
        "x-default": zhPath,
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

export function buildPortfolioMetadata(locale: Locale): Metadata {
  const content = getContent(locale);
  const title = `${content.cases.title} | ${content.nav.brand}`;
  const url = portfolioPath(locale);
  const zhPath = portfolioPath("zh");
  const enPath = portfolioPath("en");
  const socialImage = `${SITE_ORIGIN}${locale === "zh" ? "/opengraph-image" : "/en/opengraph-image"}?v=20260915`;

  return {
    title,
    description: content.cases.intro,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: url,
      languages: { "zh-Hant": zhPath, en: enPath, "x-default": zhPath },
    },
    openGraph: {
      title,
      description: content.cases.intro,
      url,
      locale: locale === "zh" ? "zh_TW" : "en_US",
      type: "website",
      siteName: content.nav.brand,
      images: [{ url: socialImage, width: 1200, height: 630, alt: title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.cases.intro,
      images: [socialImage],
    },
  };
}
