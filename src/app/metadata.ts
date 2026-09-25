import type { Metadata } from "next";
import { getMessages, locales, type Locale } from "@/messages";

export const siteUrl = "https://techtojob.com";

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "TechToJob",
};

const isPreview = process.env.VERCEL_ENV === "preview";

const languagePaths = Object.fromEntries(
  locales.map((locale) => [locale, `/${locale}`]),
) as Record<Locale, string>;

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getMessages(locale);

  return {
    title: {
      default: meta.title,
      template: "%s | TechToJob",
    },
    description: meta.description,
    metadataBase: new URL(siteUrl),
    applicationName: "TechToJob",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: languagePaths[locale],
      languages: { ...languagePaths, "x-default": languagePaths.es },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: languagePaths[locale],
      siteName: "TechToJob",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: "@techtojob",
      creator: "@techtojob",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [ogImage.url],
    },
    robots: isPreview
      ? { index: false, follow: false }
      : { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export function buildJsonLd(locale: Locale) {
  const { meta } = getMessages(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "TechToJob",
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        image: `${siteUrl}/og-image.png`,
        inLanguage: locale,
        description: meta.description,
        sameAs: [
          "https://www.linkedin.com/company/techtojob/",
          "https://x.com/techtojob",
          "https://www.instagram.com/techtojob",
          "https://discord.gg/h9FFgKdkRd",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "TechToJob",
        inLanguage: locale,
        description: meta.description,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}
