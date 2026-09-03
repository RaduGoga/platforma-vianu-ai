"use client";

import Link from "next/link";
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
      {/* HERO */}
      <section className="hero-glow">
        <div className="mx-auto max-w-2xl px-5 pb-20 pt-20 text-center lg:pb-24 lg:pt-28">
          <CircuitRule />
          <h1 className="display-xl mt-7 text-6xl sm:text-7xl" translate="no">
            Vianu AI
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t(
              "Platforma clubului de AI de la Colegiul Național de Informatică \"Tudor Vianu\".",
              "The AI club platform at \"Tudor Vianu\" National College of Computer Science."
            )}
          </p>
          <div className="mt-9">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href={href("/programa")}>{t("Deschide programa", "Open the curriculum")}</Link>
            </Button>
          </div>
          <ContinueCard />
        </div>
      </section>

      {/* CE E ÎNĂUNTRU — rânduri alternante, cu un exemplu real la fiecare */}
      <section className="mx-auto max-w-6xl px-5">
        <Row
          n="01"
          title={t("Lecții clare, cu snippeturi de cod", "Clear lessons, with code snippets")}
          body={t(
            "Fiecare modul are lecția lui: explicația, codul, și resursele la sfârșit.",
            "Every module has its lesson: the explanation, the code, and the resources at the end."
          )}
          visual={<CodeSample t={t} />}
        />
        <Row
          n="02"
          flip
          title={t("Tips and tricks", "Tips and tricks")}
          body={t(
            "Sfaturi de la elevi cu experiență și rezultate in concursuri.",
            "Advice from students with real competition experience and results."
          )}
          visual={<PitfallSample t={t} />}
        />
        <Row
          n="03"
          title={t("Lecțiile, după programa oficială", "Lessons that follow the official syllabus")}
          body={t(
            "De la Python basic la deep learning. Vezi mereu unde ești și ce urmează.",
            "From basic Python to deep learning. You always see where you are and what's next."
          )}
          visual={<CurriculumSample t={t} en={en} />}
        />
      </section>
    </>
  );
}

// Ornament de deschidere: trasee de cablaj cu pad-uri la capete, în limbajul
// plăcii din marcă — fără să repete logo-ul, care e deja în navbar și în footer.
function CircuitRule() {
  return (
    <svg viewBox="0 0 160 44" className="mx-auto h-11 w-40 text-primary" fill="none" aria-hidden>
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

function Row({
  n,
  title,
  body,
  visual,
  flip = false,
}: {
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="rise grid items-center gap-8 border-t border-border py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
      <div className={flip ? "lg:order-2" : ""}>
        <span className="font-mono text-sm text-primary/50">{n}</span>
        <h2 className="display mt-2 text-3xl sm:text-4xl">{title}</h2>
        <p className="serif mt-3 max-w-md text-lg leading-relaxed text-[color:var(--prose)]">{body}</p>
      </div>
      <div className={flip ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}

// Exemplele de mai jos sunt luate din lecțiile reale (S3, S11), ca să nu fie
// capturi inventate.

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
      <div className="mono-label">S11 · {t("greșeli comune", "pitfalls")}</div>
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

function CurriculumSample({
  t,
  en,
}: {
  t: (ro: string, en: string) => string;
  en: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="space-y-5">
        {(Object.keys(parts) as Part[]).map((key, i) => {
          const mods = modules.filter((m) => m.part === key);
          return (
            <div key={key}>
              <div className="flex items-baseline gap-2">
                <span className="mono-label text-primary">
                  {t("partea", "part")} {i + 1}
                </span>
                <span className="text-sm text-foreground">
                  {en ? parts[key].labelEn : parts[key].label}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mods.map((m) => (
                  <span key={m.code} className="chip">
                    {lessonNumber(m.code)}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
