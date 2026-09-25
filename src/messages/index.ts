import es from "./es.json";
import en from "./en.json";
import type { Messages } from "@/types/Messages";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const messages: Record<Locale, Messages> = { es, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function getOtherLocale(locale: Locale): Locale {
  return locale === defaultLocale ? "en" : defaultLocale;
}
