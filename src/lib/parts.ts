import type { Part } from "@/data/curriculum";

// Fiecare parte a programei are culoarea ei: Fundamente verde-pin, Machine
// learning clasic ocru, Deep learning albastru-ardezie. În pagină, culoarea
// vine din atributul `data-part` (regulile sunt în globals.css), ca să nu
// scriem stiluri inline. Valorile de mai jos sunt pentru locurile fără CSS:
// imaginile de partajat se desenează pe server, fără variabilele din pagină.
export const PART_HEX: Record<Part, string> = {
  fundamente: "#417544",
  clasic: "#8a6a1c",
  deep: "#3f5a7a",
};
export const CREAM_HEX = "#eae9cb";
