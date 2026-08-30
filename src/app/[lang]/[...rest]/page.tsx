import { notFound } from "next/navigation";

// Orice drum sub o limbă care nu se potrivește cu o rută reală cade pe 404-ul
// nostru (stilizat, în limba curentă), nu pe cel implicit din Next.
export default function CatchAll() {
  notFound();
}
