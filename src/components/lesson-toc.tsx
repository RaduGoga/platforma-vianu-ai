"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/lang-provider";

export interface TocEntry {
  id: string;
  label: string;
  numeral?: string;
}

// Secțiunea activă e ultima al cărei început a trecut de linia de citire,
// cam la o treime de la marginea de sus. La capătul paginii e ultima, ca
// secțiunile scurte de la final să poată fi și ele active.
function useActiveId(key: string) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = key ? key.split("|") : [];
    let ticking = false;

    const update = () => {
      ticking = false;
      const line = Math.min(window.innerHeight * 0.3, 240) + 48;
      let current = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
        else break;
      }
      const h = document.documentElement;
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 2) current = ids[ids.length - 1] ?? current;
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}

// Cuprinsul lecției. Pe ecrane late e o coloană fixă în dreapta, cu un
// marcaj care alunecă pe secțiunea curentă; pe restul, o listă pliabilă
// deasupra textului.
export function LessonToc({ entries, variant }: { entries: TocEntry[]; variant: "rail" | "inline" }) {
  const t = useT();
  const active = useActiveId(entries.map((e) => e.id).join("|"));
  const listRef = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    setMarker({ top: link.offsetTop, height: link.offsetHeight });
  }, [active]);

  if (variant === "inline") {
    return (
      <details className="group">
        <summary className="focus-ring flex min-h-12 cursor-pointer list-none items-center justify-between gap-3">
          <span className="kicker">{t("Pe pagina asta", "On this page")}</span>
          <span className="mono-label transition-transform group-open:rotate-180">▾</span>
        </summary>
        <ol className="pb-3">
          {entries.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`} className="focus-ring flex min-h-10 items-center gap-3 text-sm text-foreground">
                <span className="w-6 shrink-0 font-mono text-xs tabular-nums text-primary/70">{e.numeral ?? "·"}</span>
                {e.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    );
  }

  return (
    <nav aria-label={t("Pe pagina asta", "On this page")} className="hidden xl:block">
      <div className="scroll-fara-bara sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
        <div className="mono-label mb-3">{t("Pe pagina asta", "On this page")}</div>
        <ul ref={listRef} className="relative border-l border-border">
          <span
            aria-hidden
            className="absolute -left-px w-[2px] rounded-full bg-primary transition-[top,height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ top: marker.top, height: marker.height, opacity: marker.height ? 1 : 0 }}
          />
          {entries.map((e) => {
            const isActive = active === e.id;
            return (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  data-id={e.id}
                  aria-current={isActive ? "location" : undefined}
                  className={`focus-ring flex gap-2 py-1.5 pl-4 text-[0.82rem] leading-snug transition-colors duration-200 ${
                    isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {e.numeral && (
                    <span className="pt-px font-mono text-[0.68rem] tabular-nums text-primary/70">{e.numeral}</span>
                  )}
                  <span>{e.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
