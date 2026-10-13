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

// Copia din memorie a tot ce am scris în sesiunea asta. Dacă localStorage e
// blocat (mod privat, cotă plină), bifele și starea țin măcar cât e pagina
// deschisă, în loc să sară înapoi imediat după click.
const memory = new Map<string, string>();

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  let raw = memory.get(key) ?? null;
  if (!memory.has(key)) {
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      // stocare blocată: rămâne ce e în memorie, adică nimic
    }
  }
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(value);
  memory.set(key, raw);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // stocare blocată: starea rămâne doar în memorie
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
  // alt tab a scris în localStorage: valoarea de acolo e mai nouă decât copia
  const onStorage = (e: StorageEvent) => {
    if (e.key === null) memory.clear();
    else memory.delete(e.key);
    handle();
  };
  window.addEventListener(PROGRESS_EVENT, handle);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, handle);
    window.removeEventListener("storage", onStorage);
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
