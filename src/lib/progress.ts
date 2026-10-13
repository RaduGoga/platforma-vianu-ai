// Ultima lecție deschisă, ținută local în browser (fără cont, merge offline).
// Un eveniment custom sincronizează componentele când se schimbă ceva.

const LAST_KEY = "vianu.last.v1";
export const PROGRESS_EVENT = "vianu:progress";

export interface LastLesson {
  slug: string;
  code: string;
  title: string;
}

// Copia din memorie: dacă localStorage e blocat (mod privat, cotă plină),
// „Ai rămas la” merge măcar cât e pagina deschisă, iar scrierea nu aruncă.
let memory: LastLesson | null = null;

export function getLast(): LastLesson | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as LastLesson) : memory;
  } catch {
    return memory;
  }
}

export function setLast(l: LastLesson) {
  if (typeof window === "undefined") return;
  memory = l;
  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify(l));
  } catch {
    // stocare blocată: rămâne copia din memorie
  }
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}
