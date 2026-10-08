"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { hasNotebook } from "@/data/notebooks";
import { colabUrl, notebookPath } from "@/lib/site";
import { useLang, useT } from "@/components/lang-provider";

// Codul lecției ca notebook: îl deschizi în Colab sau îl descarci pentru
// Jupyter de pe calculatorul tău. Apare doar la lecțiile care au cod.
export function NotebookLinks({ slug }: { slug: string }) {
  const t = useT();
  const { lang } = useLang();
  // engleza cade pe varianta română dacă lecția în engleză n-are încă cod
  const nbLang = hasNotebook(slug, lang) ? lang : hasNotebook(slug, "ro") ? "ro" : null;
  if (!nbLang) return null;

  const pill =
    "focus-ring inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={colabUrl(slug, nbLang)} target="_blank" rel="noopener noreferrer" className={pill}>
        {t("Deschide în Colab", "Open in Colab")}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
      <a href={notebookPath(slug, nbLang)} download className={pill}>
        <Download className="size-3.5" aria-hidden />
        {t("Descarcă notebook", "Download notebook")}
      </a>
    </div>
  );
}
