// Ultima lecție deschisă, ținută local în browser (fără cont, merge offline).
// Un eveniment custom sincronizează componentele când se schimbă ceva.

const LAST_KEY = "vianu.last.v1";
export const PROGRESS_EVENT = "vianu:progress";

export interface LastLesson {
  slug: string;
  code: string;
  title: string;
}

export function getLast(): LastLesson | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_KEY);
    return raw ? (JSON.parse(raw) as LastLesson) : null;
  } catch {
    return null;
  }
}

export function setLast(l: LastLesson) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_KEY, JSON.stringify(l));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}
