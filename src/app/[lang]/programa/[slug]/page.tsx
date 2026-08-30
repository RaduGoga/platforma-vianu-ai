import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { modules, parts } from "@/data/curriculum";
import { resourceById } from "@/data/resources";
import { lessonByModule } from "@/data/lessons";
import { lessonByModuleEn } from "@/data/lessons-en";
import { LessonView, type LinkedResource } from "@/components/lesson-view";
import { alternatesFor, isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l: Locale = isLocale(lang) ? lang : "ro";
  const m = modules.find((x) => x.slug === slug);
  if (!m) return {};
  const en = l === "en";
  return {
    title: en ? m.titleEn : m.title,
    description: en ? m.summaryEn ?? m.summary : m.summary,
    alternates: alternatesFor(l, `/programa/${slug}`),
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const idx = modules.findIndex((m) => m.slug === slug);
  if (idx === -1) notFound();

  const m = modules[idx];
  const prevM = modules[idx - 1];
  const nextM = modules[idx + 1];
  const part = parts[m.part];

  const resources: LinkedResource[] = m.resourceIds
    .map((id) => resourceById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({ id: r.id, title: r.title, author: r.author, type: r.type, url: r.url }));

  return (
    <LessonView
      m={m}
      partLabel={part.label}
      partLabelEn={part.labelEn}
      lessonRo={lessonByModule(m.code) ?? null}
      lessonEn={lessonByModuleEn(m.code) ?? null}
      prev={prevM ? { slug: prevM.slug, title: prevM.title, titleEn: prevM.titleEn, code: prevM.code } : null}
      next={nextM ? { slug: nextM.slug, title: nextM.title, titleEn: nextM.titleEn, code: nextM.code } : null}
      resources={resources}
    />
  );
}
