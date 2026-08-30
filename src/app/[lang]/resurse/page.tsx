import type { Metadata } from "next";
import { ResurseView } from "@/components/resurse-view";
import { alternatesFor, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "ro";
  const en = l === "en";
  return {
    title: en ? "Resources" : "Resurse",
    description: en
      ? "The Vianu AI library: notebooks, courses, books and docs for the AI olympiad, grouped by collection, each with a short note."
      : "Biblioteca Vianu AI: notebook-uri, cursuri, cărți și documentație pentru olimpiada de inteligență artificială, pe colecții, cu o notă la fiecare.",
    alternates: alternatesFor(l, "/resurse"),
  };
}

export default function ResursePage() {
  return <ResurseView />;
}
