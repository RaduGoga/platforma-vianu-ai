"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContinueCard } from "@/components/continue-card";
import { useHref, useLang, useT } from "@/components/lang-provider";
import { CodeBlock } from "@/components/code-block";
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
          <div>
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
        </div>
      </section>

      {/* PROGRAMA: cele trei părți, fiecare cu lecțiile ei */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <h2 className="display text-3xl sm:text-4xl">{t("Programa, în trei părți", "The syllabus, in three parts")}</h2>
        <CurriculumMap en={en} />
      </section>

      {/* CE E ÎNĂUNTRU: două rânduri cu exemple reale din lecții */}
      <section className="mx-auto max-w-6xl px-5">
        <Row
          from="S4"
          title={t("Lecții clare, cu snippeturi de cod", "Clear lessons, with code snippets")}
          body={t(
            "Fiecare modul are lecția lui: explicația, codul și resursele la sfârșit.",
            "Every module has its lesson: the explanation, the code, and the resources at the end."
          )}
          visual={<CodeSample t={t} />}
        />
        <Row
          from="S11"
          flip
          title={t("Greșeli de evitat", "Mistakes to avoid")}
          body={t(
            "Sfaturi de la elevi cu experiență și rezultate în concursuri.",
            "Advice from students with real competition experience and results."
          )}
          visual={<PitfallSample t={t} />}
        />
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

// Un rând cu un exemplu luat dintr-o lecție; eticheta de sus duce la lecția
// din care e luat.
function Row({
  from,
  title,
  body,
  visual,
  flip = false,
}: {
  from: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
}) {
  const t = useT();
  const href = useHref();
  const { lang } = useLang();
  const m = modules.find((x) => x.code === from);

  return (
    <div className="rise grid items-center gap-8 border-t border-border py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
      <div className={flip ? "lg:order-2" : ""}>
        {m && (
          <Link
            href={href(`/programa/${m.slug}`)}
            data-part={m.part}
            className="kicker focus-ring inline-flex items-center gap-1 text-[var(--part)] hover:underline"
          >
            {t("Din lecția", "From lesson")} {lessonNumber(m.code)} · {lang === "en" ? m.titleEn : m.title}
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        )}
        <h2 className="display mt-2 text-3xl sm:text-4xl">{title}</h2>
        <p className="serif mt-3 max-w-md text-lg leading-relaxed text-[color:var(--prose)]">{body}</p>
      </div>
      <div className={flip ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}

// Exemplele de mai jos sunt luate din lecțiile reale (lecția 4 și lecția 8),
// ca să nu fie capturi inventate.

function CodeSample({ t }: { t: (ro: string, en: string) => string }) {
  return (
    <CodeBlock
      code={`import numpy as np

# ${t("lent, în Python pur", "slow, in pure Python")}
total = 0
for x in range(1_000_000):
    total += x * x

# ${t("rapid, vectorizat cu numpy", "fast, vectorized with numpy")}
v = np.arange(1_000_000)
total = (v * v).sum()`}
    />
  );
}

function PitfallSample({ t }: { t: (ro: string, en: string) => string }) {
  const items = [
    t(
      "Optimizezi pe clasamentul public și te trezești că ai făcut overfit pe el.",
      "You optimize on the public leaderboard and end up overfitting to it."
    ),
    t(
      "K-fold nestratificat pe clase rare: unele fold-uri nu conțin clasa deloc.",
      "Unstratified k-fold on rare classes: some folds don't contain the class at all."
    ),
    t(
      "Raportezi acuratețea pe o problemă cu dataset imbalanced și crezi că modelul e bun.",
      "You report accuracy on an imbalanced problem and think the model is good."
    ),
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mono-label">{t("Greșeli comune", "Common mistakes")}</div>
      <ul className="mt-4 space-y-3">
        {items.map((p, i) => (
          <li key={i} className="sidenote flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--clay)]" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
