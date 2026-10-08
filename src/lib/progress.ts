// Progresul la lecții, ținut local în browser (fără cont, merge offline):
// ultima lecție deschisă, starea fiecărei lecții și problemele bifate.
// Un eveniment custom sincronizează componentele când se schimbă ceva.

import { useSyncExternalStore } from "react";

const LAST_KEY = "vianu.last.v1";
const STATUS_KEY = "vianu.status.v1";
const SOLVED_KEY = "vianu.solved.v1";
export const PROGRESS_EVENT = "vianu:progress";

export type LessonStatus = "none" | "reading" | "done";

export interface LastLesson {
  slug: string;
  code: string;
  title: string;
}

export interface Progress {
  statuses: Record<string, LessonStatus>;
  solved: Record<string, number[]>;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stocare blocată (mod privat, cotă plină): starea rămâne doar în memorie
  }
  cache = null;
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function getLast(): LastLesson | null {
  return read<LastLesson | null>(LAST_KEY, null);
}

export function setLast(l: LastLesson) {
  write(LAST_KEY, l);
}

export function setStatus(code: string, status: LessonStatus) {
  const statuses = read<Record<string, LessonStatus>>(STATUS_KEY, {});
  if (status === "none") delete statuses[code];
  else statuses[code] = status;
  write(STATUS_KEY, statuses);
}

export function toggleSolved(code: string, index: number) {
  const solved = read<Record<string, number[]>>(SOLVED_KEY, {});
  const list = new Set(solved[code] ?? []);
  if (list.has(index)) list.delete(index);
  else list.add(index);
  if (list.size === 0) delete solved[code];
  else solved[code] = [...list].sort((a, b) => a - b);
  write(SOLVED_KEY, solved);
}

// ————— abonare din React —————
// useSyncExternalStore cere același obiect cât timp nu s-a schimbat nimic,
// de asta ținem un cache pe care îl golim la fiecare scriere.
const EMPTY: Progress = { statuses: {}, solved: {} };
let cache: Progress | null = null;

function snapshot(): Progress {
  if (!cache) {
    cache = {
      statuses: read<Record<string, LessonStatus>>(STATUS_KEY, {}),
      solved: read<Record<string, number[]>>(SOLVED_KEY, {}),
    };
  }
  return cache;
}

function subscribe(onChange: () => void) {
  const handle = () => {
    cache = null;
    onChange();
  };
  window.addEventListener(PROGRESS_EVENT, handle);
  window.addEventListener("storage", handle);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, handle);
    window.removeEventListener("storage", handle);
  };
}

// Pe server și la prima randare pe client întoarce gol, deci HTML-ul se
// potrivește; starea reală apare imediat după hidratare.
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function countDone(statuses: Record<string, LessonStatus>, codes: string[]) {
  return codes.filter((c) => statuses[c] === "done").length;
}
