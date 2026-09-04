"use client";

import Link from "next/link";
import { List } from "lucide-react";
import { modules, parts, lessonNumber, type Part } from "@/data/curriculum";
import { useHref, useLang, useT } from "@/components/lang-provider";

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

  const tree = (
    <div className="space-y-6">
      {partKeys.map((partKey) => {
        const mods = modules.filter((m) => m.part === partKey);
        return (
          <div key={partKey}>
            <div className="px-2">
              <span className="mono-label text-primary">
                {en ? parts[partKey].labelEn : parts[partKey].label}
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
                          ? "bg-[var(--accent-tint)] font-medium text-[var(--accent-ink)]"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="w-6 shrink-0 font-mono text-[0.72rem] tabular-nums text-primary/80">
                        {lessonNumber(m.code)}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{en ? m.titleEn : m.title}</span>
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
    <nav className="hidden lg:block">
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
            <span className="mono-label block">{t("Toate modulele", "All modules")}</span>
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
