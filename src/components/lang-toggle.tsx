"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLang, type Lang } from "@/components/lang-provider";

const options: { code: Lang; label: string }[] = [
  { code: "ro", label: "Română" },
  { code: "en", label: "English" },
];

export function LangToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // închide la click în afară și la Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Limbă / Language"
        className="focus-ring flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {lang.toUpperCase()}
        <ChevronDown className="size-3.5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1 min-w-36 rounded-lg border border-border bg-card py-1 shadow-[0_16px_40px_-24px_rgba(15,18,17,0.45)]"
        >
          {options.map((o) => (
            <button
              key={o.code}
              role="menuitemradio"
              aria-checked={lang === o.code}
              onClick={() => {
                setLang(o.code);
                setOpen(false);
              }}
              className="focus-ring flex min-h-11 w-full items-center gap-2 px-3 text-left text-sm text-foreground hover:bg-secondary"
            >
              <Check
                className={`size-3.5 shrink-0 text-primary ${lang === o.code ? "" : "invisible"}`}
              />
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
