import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { DespreView } from "@/components/despre-view";
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
    title: en ? "About" : "Despre",
    description: en
      ? "Who runs the AI club at \"Tudor Vianu\" National College of Computer Science, and why we put the curriculum out in the open."
      : "Cine ține clubul de AI de la Colegiul Național de Informatică \"Tudor Vianu\" și de ce am pus programa pe net.",
    alternates: alternatesFor(l, "/despre"),
  };
}

export default function DesprePage() {
  return (
    <>
      <PageHeader
        eyebrow="Despre"
        eyebrowEn="About"
        title="Vianu AI"
        intro="Clubul de AI din cadrul Colegiului Național de Informatică Tudor Vianu"
        introEn="The AI club at Tudor Vianu National College of Computer Science"
      />
      <DespreView />
    </>
  );
}
