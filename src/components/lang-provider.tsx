"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Lang = "ro" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "ro", setLang: () => {} });

// Limba vine din rută (/ro, /en) și e dată de layout-ul de limbă. Schimbarea
// limbii înseamnă navigare la același drum cu celălalt prefix, nu localStorage,
// ca pagina să fie corectă pe server (fără flash, indexabilă, partajabilă).
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (l: Lang) => {
    document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
    const rest = pathname.replace(/^\/(ro|en)(?=\/|$)/, "");
    router.push(`/${l}${rest}`);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

// Alege între două variante de text în funcție de limbă.
export function T({ ro, en }: { ro: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : ro}</>;
}

// Helper pentru string simplu.
export function useT() {
  const { lang } = useLang();
  return (ro: string, en: string) => (lang === "en" ? en : ro);
}

// Prefixează un drum intern cu limba curentă: „/programa” → „/ro/programa”.
export function useHref() {
  const { lang } = useLang();
  return (path: string) => (path === "/" ? `/${lang}` : `/${lang}${path}`);
}
