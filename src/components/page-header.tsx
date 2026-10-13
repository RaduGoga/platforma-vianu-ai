"use client";

import { useLang } from "@/components/lang-provider";

// Titlul paginii stă pe aceeași margine stângă ca textul de sub el, așa că
// header-ul primește lățimea coloanei de conținut a paginii.
const WIDTH = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
} as const;

export function PageHeader({
  eyebrow,
  eyebrowEn,
  title,
  titleEn,
  intro,
  introEn,
  width = "6xl",
}: {
  eyebrow: string;
  eyebrowEn?: string;
  title: string;
  titleEn?: string;
  intro?: string;
  introEn?: string;
  width?: keyof typeof WIDTH;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <header className="border-b border-border">
      <div className={`mx-auto ${WIDTH[width]} px-5 pb-10 pt-16 lg:pt-20`}>
        <div className="kicker">{en && eyebrowEn ? eyebrowEn : eyebrow}</div>
        <h1 className="display mt-4 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
          {en && titleEn ? titleEn : title}
        </h1>
        {intro && (
          <p className="serif mt-5 max-w-2xl text-xl leading-relaxed text-[color:var(--prose)]">
            {en && introEn ? introEn : intro}
          </p>
        )}
      </div>
    </header>
  );
}
