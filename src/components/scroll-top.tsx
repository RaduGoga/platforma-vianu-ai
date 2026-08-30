"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useT } from "@/components/lang-provider";

// Buton „sus”, apare după ce derulezi. Util pe pagini lungi, mai ales pe telefon.
export function ScrollTop() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("Înapoi sus", "Back to top")}
      className="focus-ring fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:border-primary hover:text-primary"
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
