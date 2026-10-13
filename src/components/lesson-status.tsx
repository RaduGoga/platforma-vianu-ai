"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { setStatus, useProgress, type LessonStatus } from "@/lib/progress";
import { useT } from "@/components/lang-provider";

const OPTIONS: { value: LessonStatus; ro: string; en: string }[] = [
  { value: "none", ro: "Neîncepută", en: "Not started" },
  { value: "reading", ro: "În lucru", en: "In progress" },
  { value: "done", ro: "Terminată", en: "Done" },
];

// Starea lecției, ca în USACO Guide: un control segmentat cu trei poziții.
// E un grup de butoane radio (săgețile mută selecția), cu o pastilă care
// alunecă sub opțiunea aleasă.
export function LessonStatusControl({ code }: { code: string }) {
  const t = useT();
  const { statuses } = useProgress();
  const current = statuses[code] ?? "none";
  const index = Math.max(
    0,
    OPTIONS.findIndex((o) => o.value === current)
  );
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const next = OPTIONS[(i + OPTIONS.length) % OPTIONS.length];
    setStatus(code, next.value);
    buttons.current[OPTIONS.indexOf(next)]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(OPTIONS.length - 1);
    }
  };

  const done = current === "done";

  return (
    <div
      role="radiogroup"
      aria-label={t("Starea lecției", "Lesson status")}
      className="relative inline-grid grid-cols-3 rounded-full border border-border bg-secondary p-[3px]"
    >
      <span
        aria-hidden
        className={`absolute inset-y-[3px] left-[3px] w-[calc((100%-6px)/3)] rounded-full shadow-[0_1px_2px_rgba(15,18,17,0.12)] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          done ? "bg-[var(--part)]" : "bg-card"
        }`}
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {OPTIONS.map((o, i) => {
        const selected = i === index;
        return (
          <button
            key={o.value}
            ref={(node) => {
              buttons.current[i] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => setStatus(code, o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative z-10 inline-flex min-h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--part)] ${
              selected
                ? done
                  ? "text-primary-foreground"
                  : "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.value === "done" && selected && <Check className="size-3.5" aria-hidden />}
            {t(o.ro, o.en)}
          </button>
        );
      })}
    </div>
  );
}

// Rândul de la capătul lecției: un singur buton. Lecția următoare e chiar
// dedesubt, în navigarea dintre lecții, așa că nu o mai repetăm aici.
export function LessonDoneRow({ code }: { code: string }) {
  const t = useT();
  const { statuses } = useProgress();
  const done = statuses[code] === "done";

  return (
    <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8">
      {done ? (
        <>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--part-ink)]">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-[var(--part)] text-primary-foreground">
              <Check className="size-3" aria-hidden />
            </span>
            {t("Lecție terminată", "Lesson done")}
          </span>
          <button
            type="button"
            onClick={() => setStatus(code, "reading")}
            className="focus-ring inline-flex min-h-8 items-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            {t("Anulează", "Undo")}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setStatus(code, "done")}
          className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--part)] px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--part-ink)]"
        >
          <Check className="size-4" aria-hidden />
          {t("Am terminat lecția", "I'm done with this lesson")}
        </button>
      )}
    </div>
  );
}
