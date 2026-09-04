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
    title: en ? "Lessons" : "Lecții",
    description: en
      ? "The Vianu AI course in three parts: from Python to deep learning, reinforcement learning and AI ethics."
      : "Cursul de AI Vianu, în trei părți: de la Python la deep learning, reinforcement learning și etica AI.",
    alternates: alternatesFor(l, "/programa"),
  };
}

export default function ProgramaPage() {
  return (
    <>
      <PageHeader eyebrow="Cuprins" eyebrowEn="Contents" title="Lecții" titleEn="Lessons" />

      <div className="mx-auto max-w-4xl px-5 py-14">
        <ProgramaList />
      </div>
    </>
  );
}
