"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { countDone, getLast, useProgress, PROGRESS_EVENT, type LastLesson } from "@/lib/progress";
import { useHref, useT } from "@/components/lang-provider";
import { lessonNumber, modules } from "@/data/curriculum";

// Apare pe pagina de start doar dacă ai deschis deja o lecție.
export function ContinueCard() {
  const [last, setLast] = useState<LastLesson | null>(null);
  const t = useT();
  const href = useHref();
  const { statuses } = useProgress();
  const done = countDone(
    statuses,
    modules.map((m) => m.code)
  );

  useEffect(() => {
    const sync = () => setLast(getLast());
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!last) return null;

  return (
    <p className="mt-6 text-sm text-muted-foreground">
      {t("Ai rămas la", "You left off at")}{" "}
      <Link href={href(`/programa/${last.slug}`)} className="link-amber focus-ring font-medium">
        {t("Lecția", "Lesson")} {lessonNumber(last.code) ?? last.code} · {last.title}
      </Link>
      {done > 0 && (
        <span className="tabular-nums">
          {" "}
          · {done}/{modules.length} {t("terminate", "done")}
        </span>
      )}
    </p>
  );
}
