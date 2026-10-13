"use client";

import Link from "next/link";
import type { Module } from "@/data/curriculum";
import { modules, lessonNumber } from "@/data/curriculum";
import { useProgress } from "@/lib/progress";
import { StatusMark } from "@/components/lesson-nav";
import { LessonToc, type TocEntry } from "@/components/lesson-toc";
import { useHref, useLang, useT } from "@/components/lang-provider";

// Fișa de la începutul lecției: ce înveți și de ce lecții ai nevoie înainte.
// Pe ecranele fără coloană de cuprins, tot aici stă și lista secțiunilor.
export function LessonBrief({ m, toc }: { m: Module; toc: TocEntry[] }) {
  const t = useT();
  const href = useHref();
  const { lang } = useLang();
  const en = lang === "en";
  const { statuses } = useProgress();

  const topics = en ? m.topicsEn : m.topics;
  const prereqs = (m.requires ?? [])
    .map((code) => modules.find((x) => x.code === code))
    .filter((x): x is Module => Boolean(x));

  return (
    <div className="mt-10 max-w-[var(--measure)] border-y border-border">
      <div className="grid gap-x-10 gap-y-7 py-6 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div>
          <div className="kicker">{t("Ce înveți", "What you'll learn")}</div>
          <ul className="mt-3 space-y-2">
            {topics.map((tp, i) => (
              <li key={i} className="sidenote flex gap-3">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--part)]" aria-hidden />
                {tp}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="kicker">{t("Ai nevoie de", "You'll need")}</div>
          {prereqs.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {prereqs.map((p) => (
                <li key={p.code} data-part={p.part}>
                  <Link
                    href={href(`/programa/${p.slug}`)}
                    className="focus-ring group flex items-baseline gap-2 text-sm"
                  >
                    <span className="shrink-0 num text-xs tabular-nums text-[var(--part)]/80">
                      {t("Lecția", "Lesson")} {lessonNumber(p.code)}
                    </span>
                    <span className="text-foreground transition-colors group-hover:text-[var(--part)]">
                      {en ? p.titleEn : p.title}
                    </span>
                    <StatusMark status={statuses[p.code]} className="self-center" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="sidenote mt-3">
              {t("Poți începe direct.", "You can start right away.")}
            </p>
          )}
        </div>
      </div>

      {toc.length > 0 && (
        <div className="border-t border-border xl:hidden">
          <LessonToc entries={toc} variant="inline" />
        </div>
      )}
    </div>
  );
}
