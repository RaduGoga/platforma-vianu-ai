"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { modules, parts, type Part } from "@/data/curriculum";
import { lessonByModule } from "@/data/lessons";
import { lessonByModuleEn } from "@/data/lessons-en";
import { useHref, useLang, useT } from "@/components/lang-provider";

export function ProgramaList() {
  const { lang } = useLang();
  const t = useT();
  const href = useHref();
  const en = lang === "en";

  return (
    <>
      {(Object.keys(parts) as Part[]).map((partKey, si) => {
        const part = parts[partKey];
        const mods = modules.filter((m) => m.part === partKey);
        return (
          <section key={partKey} className={si > 0 ? "mt-14" : ""}>
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-mono text-sm text-primary">
                {t("partea", "part")} {si + 1}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="mono-label">{en ? part.weeksEn : part.weeks}</span>
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
                      <span className="w-16 shrink-0 font-mono text-sm text-primary">{m.code}</span>
                      <span className="display text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                        {en ? m.titleEn : m.title}
                      </span>
                      <span className="toc-leader hidden sm:block" aria-hidden />
                      <span className="ml-auto hidden shrink-0 items-center gap-2 sm:flex">
                        <span className="mono-label">
                          {t("sesiunea", "session")} {m.weeks}
                        </span>
                        <Badge variant="secondary">
                          {t("lecție", "lesson")}
                          {lesson ? ` · ${lesson.duration}` : ""}
                        </Badge>
                      </span>
                    </Link>

                    {m.checkpoint && (
                      <div className="flex items-center gap-3 border-b border-border bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] py-3 pl-1">
                        <span className="ml-1 h-2 w-2 rotate-45 bg-primary" aria-hidden />
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

      <div className="mt-12 rounded-lg border border-border bg-card p-6">
        <span className="mono-label text-primary">{t("notă", "note")}</span>
        <p className="serif mt-2 leading-relaxed text-[color:var(--prose)]">
          {t(
            "În vacanța de iarnă rămâne o temă opțională: două probleme din arhivă, fără termen strict.",
            "Over the winter break there's one optional task: two archive problems, no hard deadline."
          )}
        </p>
      </div>
    </>
  );
}
