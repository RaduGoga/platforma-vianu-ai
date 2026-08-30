"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang, useT } from "@/components/lang-provider";
import {
  resources,
  categories,
  type Resource,
  type Category,
} from "@/data/resources";

const typeLabel: Record<Resource["type"], { ro: string; en: string }> = {
  carte: { ro: "carte", en: "book" },
  curs: { ro: "curs", en: "course" },
  documentație: { ro: "docs", en: "docs" },
  platformă: { ro: "platformă", en: "platform" },
  notebook: { ro: "notebook", en: "notebook" },
  video: { ro: "video", en: "video" },
  articol: { ro: "articol", en: "article" },
  arhivă: { ro: "arhivă", en: "archive" },
};

// fără diacritice + litere mici, ca „retea” să prindă „rețele”
const fold = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const isCategory = (v: string | null): v is Category =>
  !!v && categories.some((c) => c.id === v);

export function ResurseView() {
  const { lang } = useLang();
  const t = useT();
  const en = lang === "en";
  const [category, setCategory] = useState<Category | "toate">("toate");
  const [q, setQ] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [atBottom, setAtBottom] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // colecția stă în URL: link partajabil + butonul „înapoi” funcționează
  const selectCategory = (c: Category | "toate") => {
    setCategory(c);
    const url = new URL(window.location.href);
    if (c === "toate") url.searchParams.delete("c");
    else url.searchParams.set("c", c);
    window.history.pushState({}, "", url);
  };

  // căutarea stă și ea în URL (?q=…), ca link-ul filtrat să fie partajabil.
  // replaceState, nu pushState, ca să nu umple istoricul cu o intrare pe tastă.
  const setQuery = (v: string) => {
    setQ(v);
    const url = new URL(window.location.href);
    if (v) url.searchParams.set("q", v);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  };

  // citim din URL la montare (nu în initializer, ca să nu strice hidratarea)
  // și rămânem sincronizați cu back/forward
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("c");
      setCategory(isCategory(c) ? c : "toate");
      setQ(params.get("q") ?? "");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const query = fold(q.trim());
  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (category !== "toate" && r.category !== category) return false;
      if (query) {
        const hay = fold(`${r.title} ${r.author ?? ""} ${r.note} ${r.noteEn} ${r.topics.join(" ")}`);
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [category, query]);

  const activeCats = categories.filter((c) => filtered.some((r) => r.category === c.id));
  const isFiltering = category !== "toate" || query !== "";

  // scroll-spy: aprinde în sidebar secțiunea din dreptul unei benzi de sus
  useEffect(() => {
    const secs = document.querySelectorAll<HTMLElement>("section[data-collection]");
    if (!secs.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiveSection(e.target.id);
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [activeCats.length]);

  // butonul „sus” apare doar la baza paginii (după filtrare sau după tot)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setAtBottom(window.innerHeight + window.scrollY >= doc.scrollHeight - 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [filtered.length]);

  // „/” pune focus pe căutare, Esc golește
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing =
        !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && el === searchRef.current) {
        setQ("");
        const url = new URL(window.location.href);
        url.searchParams.delete("q");
        window.history.replaceState({}, "", url);
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const reset = () => {
    selectCategory("toate");
    setQuery("");
  };

  // secțiunea evidențiată în sidebar: filtrul activ, altfel cea din scroll
  const highlight = category !== "toate" ? category : activeSection;

  return (
    <>
      <header id="top" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 lg:pt-20">
          <div className="kicker">{t("Bibliotecă", "Library")}</div>
          <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">
            {t("Resurse", "Resources")}
          </h1>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[200px_1fr] lg:gap-14">
        {/* colecțiile, ca un cuprins de bibliotecă */}
        <aside className="hidden lg:block">
          <nav className="sticky top-20 space-y-0.5 text-sm">
            <CollectionLink
              active={category === "toate" && !activeSection}
              onClick={() => selectCategory("toate")}
            >
              {t("Toate", "All")}
            </CollectionLink>
            {categories.map((c) => (
              <CollectionLink
                key={c.id}
                active={highlight === c.id}
                onClick={() => selectCategory(c.id)}
              >
                {en ? c.en : c.ro}
              </CollectionLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {/* filtru slim: căutare + număr + reset */}
          <div className="sticky top-[57px] z-30 -mx-5 mb-8 border-b border-border bg-[color-mix(in_srgb,var(--background)_92%,transparent)] px-5 py-3 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="relative w-full max-w-xs">
                <input
                  ref={searchRef}
                  type="search"
                  name="q"
                  value={q}
                  onChange={(e) => setQuery(e.target.value)}
                  inputMode="search"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={t("Caută în resurse", "Search resources")}
                  placeholder={t("caută o resursă sau un subiect…", "search a resource or a topic…")}
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2 pr-9 text-sm text-foreground placeholder:text-[var(--faint)] focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                {q === "" && (
                  <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--faint)] sm:block">
                    /
                  </kbd>
                )}
              </div>
              <div className="ml-auto flex items-center gap-3">
                <span className="mono-label" aria-live="polite">
                  {filtered.length} {t("resurse", "resources")}
                </span>
                {isFiltering && (
                  <button onClick={reset} className="link-amber focus-ring text-xs">
                    {t("resetează", "reset")}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* pe mobil, colecțiile ca strip orizontal (sidebar-ul e ascuns) */}
          <div className="-mx-5 mb-8 flex gap-1.5 overflow-x-auto px-5 pb-1 lg:hidden">
            <MobileChip active={category === "toate"} onClick={() => selectCategory("toate")}>
              {t("Toate", "All")}
            </MobileChip>
            {categories.map((c) => (
              <MobileChip key={c.id} active={category === c.id} onClick={() => selectCategory(c.id)}>
                {en ? c.en : c.ro}
              </MobileChip>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                {t("Nimic pentru filtrul ăsta.", "Nothing for this filter.")}
              </p>
              <button onClick={reset} className="link-amber focus-ring mt-3 text-sm">
                {t("Resetează filtrele", "Reset filters")}
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {activeCats.map((c) => {
                const items = filtered.filter((r) => r.category === c.id);
                return (
                  <section key={c.id} id={c.id} data-collection className="scroll-mt-28">
                    <h2 className="display text-2xl">{en ? c.en : c.ro}</h2>
                    <div className="mt-5 border-t border-border">
                      {items.map((r) => (
                        <ResourceRow key={r.id} r={r} en={en} t={t} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={t("Înapoi sus", "Back to top")}
        aria-hidden={!atBottom}
        tabIndex={atBottom ? 0 : -1}
        className={`focus-ring fixed bottom-6 right-6 z-40 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm transition-[opacity,transform,color] hover:text-primary ${
          atBottom ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {t("sus", "top")} ↑
      </button>
    </>
  );
}

function ResourceRow({
  r,
  en,
  t,
}: {
  r: Resource;
  en: boolean;
  t: (ro: string, en: string) => string;
}) {
  const sub = [r.author, r.lang.toUpperCase()].filter(Boolean).join(" · ");

  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring group block border-b border-border py-4"
    >
      <div className="flex items-baseline gap-3">
        <h3 className="display text-base leading-snug text-foreground transition-colors group-hover:text-primary">
          {r.title}
        </h3>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs text-[var(--faint)] transition-colors group-hover:text-primary">
          <span className="opacity-0 transition-opacity group-hover:opacity-100">
            {t("deschide", "open")}
          </span>
          <ArrowUpRight className="size-3.5" aria-hidden />
          <span className="sr-only">{t("(se deschide într-un tab nou)", "(opens in a new tab)")}</span>
        </span>
      </div>
      {(en ? r.noteEn : r.note) && (
        <p className="serif mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {en ? r.noteEn : r.note}
        </p>
      )}
      <div className="mt-2 flex items-center gap-2.5 text-xs text-[var(--faint)]">
        <span className="rounded-md bg-secondary px-2 py-0.5 font-medium text-[color:var(--accent-ink)]">
          {t(typeLabel[r.type].ro, typeLabel[r.type].en)}
        </span>
        {sub && <span>{sub}</span>}
      </div>
    </a>
  );
}

function CollectionLink({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring block w-full rounded-md border-l-2 py-1.5 pl-3 pr-2 text-left transition-colors ${
        active
          ? "border-primary font-medium text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function MobileChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}
