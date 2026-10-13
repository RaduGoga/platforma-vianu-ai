"use client";

import { Download } from "lucide-react";
import { hasNotebook } from "@/data/notebooks";
import { notebookPath } from "@/lib/site";
import { useLang, useT } from "@/components/lang-provider";

// Codul lecției ca notebook, de descărcat: îl deschizi în Jupyter de pe
// calculatorul tău sau îl încarci în Colab. Apare doar la lecțiile care au cod.
export function NotebookLink({ slug }: { slug: string }) {
  const t = useT();
  const { lang } = useLang();
  // engleza cade pe varianta română dacă lecția în engleză n-are încă cod
  const nbLang = hasNotebook(slug, lang) ? lang : hasNotebook(slug, "ro") ? "ro" : null;
  if (!nbLang) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <a
        href={notebookPath(slug, nbLang)}
        download={`${slug}.${nbLang}.ipynb`}
        className="focus-ring inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-[13px] font-medium text-foreground transition-colors hover:border-[var(--part)] hover:text-[var(--part)]"
      >
        <Download className="size-3.5" aria-hidden />
        {t("Descarcă notebook-ul", "Download the notebook")}
      </a>
      <span className="text-xs text-muted-foreground">
        {t("Merge în Jupyter sau în Colab, cu File → Upload.", "Opens in Jupyter, or in Colab via File → Upload.")}
      </span>
    </div>
  );
}
