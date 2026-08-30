// Cele două limbi ale site-ului. Limba vine din segmentul de rută (/ro, /en),
// ca să fie corectă pe server: crawlerii, tab-ul și preview-urile de link o văd.
export const LOCALES = ["ro", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";

export const isLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);

// hreflang pentru un drum dat (fără prefixul de limbă). „” = pagina de start.
export function altLanguages(path: string) {
  return {
    ro: `/ro${path}`,
    en: `/en${path}`,
    "x-default": `/ro${path}`,
  };
}

// Metadata de alternate pentru o pagină: canonical pe limba curentă + hreflang.
export function alternatesFor(lang: Locale, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: altLanguages(path),
  };
}
