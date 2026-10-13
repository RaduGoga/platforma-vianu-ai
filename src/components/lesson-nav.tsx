"use client";

import Link from "next/link";
import { Check, List } from "lucide-react";
import { modules, parts, lessonNumber, type Part } from "@/data/curriculum";
import { countDone, useProgress, type LessonStatus } from "@/lib/progress";
import { useHref, useLang, useT } from "@/components/lang-provider";

// Semnul de stare de lângă titlul lecției: bifă la cele terminate, un punct
// la cele în lucru, nimic la restul.
export function StatusMark({ status, className = "" }: { status?: LessonStatus; className?: string }) {
  if (status === "done")
    return <Check className={`size-3.5 shrink-0 text-primary ${className}`} aria-hidden />;
  if (status === "reading")
    return <span className={`size-1.5 shrink-0 rounded-full bg-primary/70 ${className}`} aria-hidden />;
  return null;
}

// Arbore de module în stil docs: sticky pe desktop, sertar pe telefon.
// Semnătura de organizare — te muți între lecții fără să treci prin cuprins.
export function LessonNav({
  currentCode,
  variant = "both",
}: {
  currentCode: string;
  variant?: "rail" | "drawer" | "both";
}) {
  const t = useT();
  const href = useHref();
  const { lang } = useLang();
  const en = lang === "en";

  const partKeys = Object.keys(parts) as Part[];
  const current = modules.find((m) => m.code === currentCode);
  const { statuses } = useProgress();

  const tree = (
    <div className="space-y-6">
      {partKeys.map((partKey) => {
        const mods = modules.filter((m) => m.part === partKey);
        const done = countDone(
          statuses,
          mods.map((m) => m.code)
        );
        return (
          <div key={partKey} data-part={partKey}>
            <div className="flex items-baseline justify-between gap-2 px-2">
              <span className="mono-label text-[var(--part)]">
                {en ? parts[partKey].labelEn : parts[partKey].label}
              </span>
              <span
                className="mono-label tabular-nums"
                aria-label={`${done} ${t("din", "of")} ${mods.length} ${t("terminate", "done")}`}
              >
                {done}/{mods.length}
              </span>
            </div>
            <ul className="mt-2">
              {mods.map((m) => {
                const active = m.code === currentCode;
                return (
                  <li key={m.code}>
                    <Link
                      href={href(`/programa/${m.slug}`)}
                      aria-current={active ? "page" : undefined}
                      className={`focus-ring group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active
                          ? "bg-[var(--part-tint)] font-medium text-[var(--part-ink)]"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="w-6 shrink-0 num text-[0.72rem] tabular-nums text-[var(--part)] opacity-80">
                        {lessonNumber(m.code)}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{en ? m.titleEn : m.title}</span>
                      <StatusMark status={statuses[m.code]} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );

  const rail = (
    <nav className="hidden h-full lg:block">
      <div className="scroll-fara-bara sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-2">
        <div className="mb-4 px-2">
          <span className="mono-label">{t("Lecții", "Lessons")}</span>
        </div>
        {tree}
      </div>
    </nav>
  );

  const drawer = (
    <details className="group mb-8 rounded-xl border border-border bg-card lg:hidden">
      <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-3 p-4">
        <span className="flex min-w-0 items-center gap-2.5">
          <List className="size-4 shrink-0 text-primary" aria-hidden />
          <span className="min-w-0">
            <span className="mono-label block">{t("Toate lecțiile", "All lessons")}</span>
            {current && (
              <span className="block truncate text-sm font-medium">
                {t("Lecția", "Lesson")} {lessonNumber(current.code)} · {en ? current.titleEn : current.title}
              </span>
            )}
          </span>
        </span>
        <span className="mono-label shrink-0 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="border-t border-border p-3">{tree}</div>
    </details>
  );

  if (variant === "rail") return rail;
  if (variant === "drawer") return drawer;
  return (
    <>
      {rail}
      {drawer}
    </>
  );
}
