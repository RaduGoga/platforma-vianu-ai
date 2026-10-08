import type { CSSProperties } from "react";
import type { Part } from "@/data/curriculum";

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
