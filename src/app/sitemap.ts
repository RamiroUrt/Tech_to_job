import type { MetadataRoute } from "next";
import { locales } from "@/messages";
import { siteUrl } from "./metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
