"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContinueCard } from "@/components/continue-card";
import { useHref, useLang, useT } from "@/components/lang-provider";
import { modules, parts, lessonNumber, type Part } from "@/data/curriculum";

export function HomeView() {
  const t = useT();
  const href = useHref();
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <>
      {/* HERO: titlul, o frază și intrarea în curs */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 lg:pb-20 lg:pt-24">
          <CircuitRule />
          <h1 className="display-xl mt-7 text-6xl sm:text-7xl" translate="no">
            Vianu AI
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t(
              "Platforma clubului de AI de la Colegiul Național de Informatică „Tudor Vianu”.",
              "The AI club platform at “Tudor Vianu” National College of Computer Science."
            )}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href={href("/programa")}>{t("Deschide cursul", "Open the course")}</Link>
            </Button>
          </div>
          <ContinueCard />
        </div>
      </section>

      {/* PROGRAMA: cele trei părți, fiecare cu lecțiile ei */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <h2 className="display text-3xl sm:text-4xl">{t("Programa, în trei părți", "The syllabus, in three parts")}</h2>
        <CurriculumMap en={en} />
      </section>
    </>
  );
}

// Ornament de deschidere: trasee de cablaj cu pad-uri la capete, în limbajul
// plăcii din marcă — fără să repete logo-ul, care e deja în navbar și în footer.
function CircuitRule() {
  return (
    <svg viewBox="0 0 160 44" className="h-11 w-40 text-primary" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <path d="M8 22h144" />
        <path d="M56 22V9h-20" />
        <path d="M56 22v13h-20" />
        <path d="M104 22V9h20" />
        <path d="M104 22v13h20" />
      </g>
      <g fill="currentColor">
        <circle cx="8" cy="22" r="2.5" opacity="0.4" />
        <circle cx="152" cy="22" r="2.5" opacity="0.4" />
        <circle cx="36" cy="9" r="2.5" opacity="0.65" />
        <circle cx="36" cy="35" r="2.5" opacity="0.65" />
        <circle cx="124" cy="9" r="2.5" opacity="0.65" />
        <circle cx="124" cy="35" r="2.5" opacity="0.65" />
        <circle cx="80" cy="22" r="4.5" />
      </g>
    </svg>
  );
}

// Cele trei părți, una lângă alta, fiecare cu linia ei de culoare deasupra:
// doar numele părții și lecțiile, ca listă numerotată.
function CurriculumMap({ en }: { en: boolean }) {
  const href = useHref();

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
      {(Object.keys(parts) as Part[]).map((key) => {
        const mods = modules.filter((m) => m.part === key);
        return (
          <div key={key} data-part={key} className="border-t-2 border-[var(--part)] pt-4">
            <h3 className="display text-xl">{en ? parts[key].labelEn : parts[key].label}</h3>
            <ol className="mt-4 border-t border-border">
              {mods.map((m) => (
                <li key={m.code} className="border-b border-border">
                  <Link
                    href={href(`/programa/${m.slug}`)}
                    className="focus-ring group flex min-h-10 items-center gap-3 py-1.5 text-sm"
                  >
                    <span className="w-6 shrink-0 num text-xs tabular-nums text-[var(--part)]">
                      {lessonNumber(m.code)}
                    </span>
                    <span className="min-w-0 flex-1 text-foreground transition-colors group-hover:text-[var(--part)]">
                      {en ? m.titleEn : m.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
