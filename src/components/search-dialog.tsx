"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { Search } from "lucide-react";
import type { SearchEntry } from "@/data/search-index";
import { useHref, useLang, useT } from "@/components/lang-provider";

// Căutare în lecții (⌘K): titluri, secțiuni și text. Indexul e generat la
// build și se încarcă abia când deschizi fereastra, ca să nu îngreuneze paginile.

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function rank(entries: SearchEntry[], query: string) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of entries) {
    const title = fold(e.title);
    const heading = fold(e.heading);
    const text = fold(e.text);
    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 3;
      else if (heading.includes(term)) score += 2;
      else if (text.includes(term)) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) scored.push({ e, score: score + (e.heading ? 0 : 0.5) });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.e.number - b.e.number)
    .slice(0, 10)
    .map((x) => x.e);
}

// Fragmentul de text din jurul primei potriviri, cu termenii căutați îngroșați
// și „…” acolo unde textul e tăiat (indexul păstrează doar primele 180 de
// caractere din fiecare secțiune).
function Snippet({ text, terms }: { text: string; terms: string[] }) {
  const chars = [...text];
  // forma pliată, caracter cu caracter, ca pozițiile să se potrivească cu textul
  const pos: number[] = [];
  let flat = "";
  chars.forEach((c, i) => {
    const f = fold(c);
    flat += f;
    for (let k = 0; k < f.length; k++) pos.push(i);
  });

  const hit = new Array<boolean>(chars.length).fill(false);
  let first = -1;
  for (const term of terms) {
    for (let at = flat.indexOf(term); at !== -1; at = flat.indexOf(term, at + 1)) {
      for (let k = at; k < at + term.length; k++) hit[pos[k]] = true;
      if (first === -1 || pos[at] < first) first = pos[at];
    }
  }

  let from = Math.max(0, first - 40);
  if (from > 0) {
    const space = chars.indexOf(" ", from);
    from = space !== -1 && space < first ? space + 1 : from;
  }
  let to = Math.min(chars.length, from + 130);
  if (to < chars.length) {
    const space = chars.lastIndexOf(" ", to);
    to = space > from ? space : to;
  }
  const cut = to < chars.length || text.length >= 180;

  const parts: React.ReactNode[] = [];
  for (let i = from; i < to; ) {
    let j = i;
    while (j < to && hit[j] === hit[i]) j++;
    const piece = chars.slice(i, j).join("");
    parts.push(
      hit[i] ? (
        <b key={i} className="font-semibold text-foreground">
          {piece}
        </b>
      ) : (
        piece
      )
    );
    i = j;
  }

  return (
    <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
      {from > 0 && "…"}
      {parts}
      {cut && "…"}
    </span>
  );
}

// pe server nu știm platforma, deci scurtătura se afișează abia după hidratare
const noSubscribe = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);
const unknown = () => null;

export function SearchDialog({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const href = useHref();
  const router = useRouter();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const mac = useSyncExternalStore(noSubscribe, isMac, unknown);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || index) return;
    import("@/data/search-index").then((m) => setIndex(m.searchIndex));
  }, [open, index]);

  const results = index ? rank(index.filter((e) => e.lang === lang), query) : [];
  const terms = fold(query).split(/\s+/).filter(Boolean);
  const active = Math.min(cursor, Math.max(0, results.length - 1));

  const go = (e: SearchEntry) => {
    setOpen(false);
    router.push(href(`/programa/${e.slug}${e.id ? `#${e.id}` : ""}`));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setQuery("");
          setCursor(0);
        }
      }}
    >
      <Dialog.Trigger asChild>
        {compact ? (
          <button
            type="button"
            className="focus-ring rounded-md border border-border p-2"
            aria-label={t("Caută în lecții", "Search the lessons")}
          >
            <Search className="size-4.5" aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <Search className="size-4" aria-hidden />
            <span>{t("Caută", "Search")}</span>
            {mac !== null && (
              <kbd className="num text-[0.68rem] text-[color:var(--faint)]">{mac ? "⌘K" : "Ctrl K"}</kbd>
            )}
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-foreground/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[10vh] z-[70] w-[min(40rem,calc(100%-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-20px_rgba(15,18,17,0.35)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">{t("Caută în lecții", "Search the lessons")}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={t("de exemplu: k-fold, broadcasting, prag", "e.g. k-fold, broadcasting, threshold")}
              className="min-h-14 w-full bg-transparent text-base outline-none placeholder:text-[color:var(--faint)]"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="search-results"
              aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
              autoComplete="off"
            />
            <kbd className="hidden num text-[0.68rem] text-[color:var(--faint)] sm:block">esc</kbd>
          </div>

          <ul
            id="search-results"
            ref={listRef}
            role="listbox"
            className="scroll-fara-bara max-h-[60vh] overflow-y-auto py-2"
          >
            {query.trim() === "" ? (
              <li className="px-4 py-4 text-sm text-muted-foreground">
                {t(
                  "Caută după titlu, după secțiune sau după orice cuvânt din text.",
                  "Search by title, by section or by any word in the text."
                )}
              </li>
            ) : results.length === 0 ? (
              <li className="px-4 py-4 text-sm text-muted-foreground">
                {t("N-am găsit nimic pentru", "Nothing found for")} „{query.trim()}”.
              </li>
            ) : (
              results.map((e, i) => (
                <li
                  key={`${e.slug}-${e.id}`}
                  id={`search-opt-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === active}
                  data-part={e.part}
                  onMouseEnter={() => setCursor(i)}
                  onMouseDown={(ev) => ev.preventDefault()}
                  onClick={() => go(e)}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-2.5 ${
                    i === active ? "bg-[var(--part-tint)]" : ""
                  }`}
                >
                  <span className="w-7 shrink-0 pt-0.5 num text-xs tabular-nums text-[var(--part)]">{e.number}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {e.heading ? (
                        <>
                          {e.heading} <span className="font-normal text-muted-foreground">· {e.title}</span>
                        </>
                      ) : (
                        e.title
                      )}
                    </span>
                    {e.text && <Snippet text={e.text} terms={terms} />}
                  </span>
                </li>
              ))
            )}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
