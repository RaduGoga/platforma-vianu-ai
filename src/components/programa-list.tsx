"use client";

import Link from "next/link";
import { modules, parts, lessonNumber, type Part } from "@/data/curriculum";
import { lessonByModule } from "@/data/lessons";
import { lessonByModuleEn } from "@/data/lessons-en";
import { useHref, useLang } from "@/components/lang-provider";

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
  const en = lang === "en";

  return (
    <>
      {(Object.keys(parts) as Part[]).map((partKey, si) => {
        const part = parts[partKey];
        const mods = modules.filter((m) => m.part === partKey);
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

            <ul className="mt-6">
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
