// Id-uri de ancoră din titluri: fără diacritice, litere mici, cratime.
// „Ce cauți când te uiți la date” → „ce-cauti-cand-te-uiti-la-date”.
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Același titlu de două ori pe o pagină primește sufix, ca ancorele să rămână unice.
export function uniqueIds(labels: string[]) {
  const seen = new Map<string, number>();
  return labels.map((label) => {
    const base = slugify(label) || "sectiune";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  });
}
