"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useHref, useT } from "@/components/lang-provider";

export default function NotFound() {
  const t = useT();
  const href = useHref();

  // not-found nu poate exporta metadata, așa că punem titlul din client
  useEffect(() => {
    document.title = t("Pagina nu există", "Page not found") + " - Vianu AI";
  }, [t]);
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center px-5 py-20">
      <span className="font-mono text-sm text-primary">404</span>
      <h1 className="display-xl mt-3 text-5xl sm:text-6xl">
        {t("Pagina nu există.", "Page not found.")}
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        {t(
          "Linkul e greșit sau pagina a fost mutată. Programa e tot acolo, în ordine.",
          "The link is wrong or the page moved. The curriculum is still there, in order."
        )}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href={href("/programa")}
          className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 font-display font-semibold text-primary-foreground transition-colors hover:bg-[var(--pine-deep)]"
        >
          {t("Deschide programa", "Open the curriculum")}
        </Link>
        <Link href={href("/")} className="focus-ring text-sm font-medium text-primary hover:text-[var(--pine-deep)]">
          {t("Acasă", "Home")}
        </Link>
      </div>
    </div>
  );
}
