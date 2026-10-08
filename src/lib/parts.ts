import type { CSSProperties } from "react";
import type { Part } from "@/data/curriculum";

// Aceleași valori ca în globals.css, pentru locurile fără CSS (imaginile de
// partajat se desenează pe server, fără variabilele din pagină).
export const PART_HEX: Record<Part, string> = {
  fundamente: "#417544",
  clasic: "#8a6a1c",
  deep: "#3f5a7a",
};
export const CREAM_HEX = "#eae9cb";

// Fiecare parte a programei are culoarea ei (definite în globals.css):
// Fundamente verde-pin, Machine learning clasic ocru, Deep learning albastru-ardezie.
// Componentele primesc culoarea prin variabila `--part`, ca să nu știe care parte e.
export function partVars(part: Part): CSSProperties {
  return {
    "--part": `var(--part-${part})`,
    "--part-ink": `var(--part-${part}-ink)`,
    "--part-tint": `var(--part-${part}-tint)`,
  } as CSSProperties;
}
