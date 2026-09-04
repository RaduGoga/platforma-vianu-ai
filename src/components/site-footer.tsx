"use client";

import Link from "next/link";
import Image from "next/image";
import { useHref, useT } from "@/components/lang-provider";
import { GitHubIcon, InstagramIcon } from "@/components/brand-icons";

// Contul de Instagram: pune adresa aici și iconița apare singură.
const INSTAGRAM = "https://www.instagram.com/vianu.ai/";
const GITHUB = "https://github.com/RaduGoga/platforma-vianu-ai";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Image
              src="/brand/vianu-ai-wordmark.png"
              alt="Vianu AI"
              width={700}
              height={170}
              sizes="148px"
              className="h-9 w-auto"
            />
            <p className="serif mt-3 leading-relaxed text-[color:var(--prose)]">
              {t(
                "Platforma este făcută de echipa Vianu AI în timpul liber. Dacă vă place, un star pe github sau follow pe insta ar fi helpful :)",
                "This platform is built by the Vianu AI team in our spare time. If you like it, a star on GitHub or a follow on Instagram would help :)"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <FooterCol
              t={t}
              title={t("Platformă", "Platform")}
              items={[
                { label: t("Programa", "Curriculum"), href: "/programa" },
                { label: t("Resurse", "Resources"), href: "/resurse" },
                { label: t("Despre", "About"), href: "/despre" },
              ]}
            />
            <FooterCol
              t={t}
              title={t("Extern", "External")}
              items={[
                { label: "ONIA ↗", href: "https://olimpiada-ai.ro/" },
                { label: "ROAI ↗", href: "https://olimpiada.nitro-ai.org/" },
                { label: "MLCompete ↗", href: "https://platform.olimpiada-ai.ro/" },
                { label: "Nitro AI Judge ↗", href: "https://judge.nitro-ai.org/" },
              ]}
            />
            <div>
              <div className="mono-label mb-3">{t("Urmărește", "Follow")}</div>
              {/* -ml-2 aliniază marginea iconiței cu textul coloanelor, nu marginea
                  zonei de atins de 36px */}
              <div className="-ml-2 flex items-center gap-1">
                <Social href={GITHUB} label={t("Proiectul pe GitHub", "The project on GitHub")}>
                  <GitHubIcon />
                </Social>
                {INSTAGRAM && (
                  <Social href={INSTAGRAM} label={t("Vianu AI pe Instagram", "Vianu AI on Instagram")}>
                    <InstagramIcon />
                  </Social>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="focus-ring grid size-9 place-items-center rounded-md text-[var(--faint)] transition-colors hover:bg-secondary hover:text-primary"
    >
      {children}
    </a>
  );
}

function FooterCol({
  title,
  items,
  t,
}: {
  title: string;
  items: { label: string; href: string }[];
  t: (ro: string, en: string) => string;
}) {
  const href = useHref();
  return (
    <div>
      <div className="mono-label mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href.startsWith("http") ? i.href : href(i.href)}
              className="focus-ring text-muted-foreground transition-colors hover:text-foreground"
              {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {i.label}
              {i.href.startsWith("http") && (
                <span className="sr-only">{t("(se deschide într-un tab nou)", "(opens in a new tab)")}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
