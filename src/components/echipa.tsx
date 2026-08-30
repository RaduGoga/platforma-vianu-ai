"use client";

import Image from "next/image";
import { useLang, useT } from "@/components/lang-provider";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

// linkedin / github sunt opționale: iconița apare doar dacă are adresă.
const team = [
  {
    name: "Dulgheru Ștefan Alexandru",
    initials: "DȘ",
    photo: "/echipa/dulgheru.jpg",
    note: "Medaliat la etapa națională ONIA, 2025.",
    noteEn: "National-stage ONIA medalist, 2025.",
    linkedin: "https://www.linkedin.com/in/stefan-alexandru-dulgheru-a2a63440a/",
    github: "https://github.com/dulgherustefan",
  },
  {
    name: "Ilie-Goga Radu",
    initials: "IR",
    photo: "/echipa/ilie-goga.jpg",
    note: "Medaliat ONIA, ROAI, EUROAI. Membru al lotului național al României.",
    noteEn: "ONIA, RoAI and EUROAI medalist. Member of Romania's national team.",
    linkedin: "https://www.linkedin.com/in/radu-ilie-goga-1a8a08285/",
    github: "https://github.com/RaduGoga",
  },
  {
    name: "Cîrciumaru Alexandru Radu",
    initials: "CA",
    photo: "/echipa/circiumaru.png",
    note: "Medaliat ONIA și ROAI.",
    noteEn: "ONIA and RoAI medalist.",
    linkedin: "https://www.linkedin.com/in/radu-circiumaru-937967369/",
    github: "https://github.com/Circiii",
  },
];

export function Echipa() {
  const t = useT();
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="mt-16">
      <h2 className="display-fun text-3xl sm:text-4xl">
        {t("Echipa noastră", "Our team")}
      </h2>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        {team.map((p) => (
          <div key={p.name} className="card flex flex-col p-5">
            {p.photo ? (
              <Image
                src={p.photo}
                alt=""
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />
            ) : (
              <span
                className="grid size-14 place-items-center rounded-full bg-[var(--accent-tint)] font-mono text-sm font-medium text-[var(--accent-ink)]"
                aria-hidden
              >
                {p.initials}
              </span>
            )}

            <div className="display mt-4 text-lg leading-snug">{p.name}</div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
              {en ? p.noteEn : p.note}
            </p>

            {(p.linkedin || p.github) && (
              <div className="mt-4 flex items-center gap-1">
                {p.linkedin && (
                  <Social href={p.linkedin} label={`LinkedIn — ${p.name}`}>
                    <LinkedInIcon />
                  </Social>
                )}
                {p.github && (
                  <Social href={p.github} label={`GitHub — ${p.name}`}>
                    <GitHubIcon />
                  </Social>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
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
