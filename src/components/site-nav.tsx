"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useHref, useT } from "@/components/lang-provider";
import { LangToggle } from "@/components/lang-toggle";

const links = [
  { href: "/programa", ro: "Programa", en: "Curriculum" },
  { href: "/resurse", ro: "Resurse", en: "Resources" },
  { href: "/despre", ro: "Despre", en: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useT();
  const href = useHref();
  // drumul fără prefixul de limbă, ca să marcăm linkul activ
  const path = pathname.replace(/^\/(ro|en)(?=\/|$)/, "") || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href={href("/")} className="focus-ring flex shrink-0 items-center gap-2.5" aria-label="Vianu AI">
          <Image
            src="/brand/vianu-ai-mark.png"
            alt=""
            width={34}
            height={34}
            priority
            className="size-[34px]"
          />
          <span className="display text-[1.15rem] font-bold tracking-tight" translate="no">
            Vianu AI
          </span>
        </Link>

        {/* desktop: linkuri, separator, limbă */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-0.5">
            {links.map((l) => {
              const active = path === l.href || path.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={href(l.href)}
                  className={`focus-ring rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(l.ro, l.en)}
                </Link>
              );
            })}
          </div>
          <span className="mx-3 h-5 w-px bg-border" aria-hidden />
          <LangToggle />
        </div>

        {/* mobil: limbă + meniu */}
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded-md border border-border p-2"
            aria-label={open ? t("Închide meniul", "Close menu") : t("Deschide meniul", "Open menu")}
            aria-expanded={open}
          >
            {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-3 pt-1 md:hidden">
          {links.map((l) => {
            const active = path === l.href || path.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={href(l.href)}
                onClick={() => setOpen(false)}
                className={`focus-ring flex min-h-12 items-center rounded-md px-3 text-base ${
                  active ? "font-medium text-primary" : "text-foreground"
                }`}
              >
                {t(l.ro, l.en)}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
