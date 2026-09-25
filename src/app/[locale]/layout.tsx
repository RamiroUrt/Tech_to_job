import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sora } from "next/font/google";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { buildJsonLd, buildMetadata } from "../metadata";
import { isLocale, locales } from "@/messages";
import "../../global/style.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-sora",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={sora.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
