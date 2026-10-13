"use client";

import Link from "next/link";
import { modules, parts, lessonNumber, type Part } from "@/data/curriculum";
import { lessonByModule } from "@/data/lessons";
import { lessonByModuleEn } from "@/data/lessons-en";
import { countDone, useProgress } from "@/lib/progress";
import { StatusMark } from "@/components/lesson-nav";
import { useHref, useLang, useT } from "@/components/lang-provider";

// Intervalul de lecții al fiecărei părți, calculat din aceleași numere — dacă
// se adaugă un modul, eticheta se mută singură. Înainte era scris de mână în
// curriculum.ts ("Sesiunile 1–7") și nu mai corespundea cu numerotarea.
function intervalParte(codes: string[]) {
  const nums = codes.map((c) => lessonNumber(c) ?? 0).filter(Boolean);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  return min === max ? `${min}` : `${min}–${max}`;
}

export function ProgramaList() {
  const { lang } = useLang();
  const href = useHref();
  const t = useT();
  const en = lang === "en";
  const { statuses } = useProgress();

  return (
    <>
      {(Object.keys(parts) as Part[]).map((partKey, si) => {
        const part = parts[partKey];
        const mods = modules.filter((m) => m.part === partKey);
        const done = countDone(
          statuses,
          mods.map((m) => m.code)
        );
        const pct = Math.round((done / mods.length) * 100);
        return (
          <section key={partKey} className={si > 0 ? "mt-14" : ""} data-part={partKey}>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="mono-label text-[var(--part)]">
                {en ? "Lessons" : "Lecțiile"} {intervalParte(mods.map((m) => m.code))}
              </span>
            </div>
            <h2 className="display text-2xl">{en ? part.labelEn : part.label}</h2>
            <p className="serif mt-1.5 text-[color:var(--prose)]">{en ? part.goalEn : part.goal}</p>

            {/* cât din partea asta e bifat ca terminat; se umple pe măsură ce marchezi lecții */}
            <div className="mt-5 flex items-center gap-3">
              <div
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-secondary"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={mods.length}
                aria-valuenow={done}
                aria-label={`${done} ${t("din", "of")} ${mods.length} ${t("lecții terminate", "lessons done")}`}
              >
                <div
                  className="h-full rounded-full bg-[var(--part)] transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="mono-label tabular-nums">
                {done}/{mods.length} {t("terminate", "done")}
              </span>
            </div>

            <ul className="mt-4">
              {mods.map((m) => {
                const lesson = en ? lessonByModuleEn(m.code) ?? lessonByModule(m.code) : lessonByModule(m.code);
                return (
                  <li key={m.code}>
                    <Link
                      href={href(`/programa/${m.slug}`)}
                      className="focus-ring group flex items-baseline gap-1 border-b border-border py-3.5"
                    >
                      <span className="w-10 shrink-0 num text-sm text-[var(--part)]">{lessonNumber(m.code)}</span>
                      <span className="display text-lg text-foreground transition-colors group-hover:text-[var(--part)]">
                        {en ? m.titleEn : m.title}
                      </span>
                      <StatusMark status={statuses[m.code]} className="ml-2 self-center" />
                      <span className="toc-leader hidden sm:block" aria-hidden />
                      {lesson && (
                        <span className="ml-auto hidden shrink-0 sm:block">
                          <span className="rounded-full bg-[var(--part-tint)] px-2.5 py-0.5 text-xs font-medium text-[var(--part-ink)]">
                            {lesson.duration}
                          </span>
                        </span>
                      )}
                    </Link>

                    {m.checkpoint && (
                      <div className="flex items-center gap-3 border-b border-border bg-[color-mix(in_srgb,var(--part)_5%,transparent)] py-3 pl-1">
                        <span className="ml-1 h-2 w-2 rotate-45 bg-[var(--part)]" aria-hidden />
                        <span className="text-xs text-muted-foreground">
                          {en ? m.checkpointEn ?? m.checkpoint : m.checkpoint}
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
