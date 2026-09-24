import type { Metadata } from "next";
import es from "@/messages/es.json";

const siteUrl = "https://techtojob.com";

export const metadata: Metadata = {
  title: {
    default: es.meta.title,
    template: "%s | TechToJob",
  },
  description: es.meta.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es",
    url: siteUrl,
    siteName: "TechToJob",
    title: es.meta.ogTitle,
    description: es.meta.ogDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TechToJob — Comunidad de desarrolladores y empresas tech en español",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: es.meta.ogTitle,
    description: es.meta.ogDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechToJob",
  url: siteUrl,
  logo: `${siteUrl}/logos/v2Positivo.svg`,
  sameAs: [
    "https://www.linkedin.com/company/techtojob/",
    "https://x.com/techtojob",
    "https://www.instagram.com/techtojob",
    "https://discord.gg/h9FFgKdkRd",
  ],
  description: es.meta.description,
};