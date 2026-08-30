import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProgramaList } from "@/components/programa-list";
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
    title: en ? "Curriculum" : "Programa",
    description: en
      ? "The Vianu AI curriculum in three parts: from Python to deep learning, reinforcement learning and AI ethics."
      : "Cuprinsul programei Vianu AI, în trei părți: de la Python la deep learning, reinforcement learning și etica AI.",
    alternates: alternatesFor(l, "/programa"),
  };
}

export default function ProgramaPage() {
  return (
    <>
      <PageHeader eyebrow="Cuprins" eyebrowEn="Contents" title="Programa" titleEn="Curriculum" />

      <div className="mx-auto max-w-4xl px-5 py-14">
        <ProgramaList />
      </div>
    </>
  );
}
