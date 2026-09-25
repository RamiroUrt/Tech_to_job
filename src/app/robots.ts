import type { MetadataRoute } from "next";
import { siteUrl } from "./metadata";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  return {
    rules: isPreview
      ? [{ userAgent: "*", disallow: "/" }]
      : [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
