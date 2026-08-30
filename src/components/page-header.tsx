"use client";

import { useLang } from "@/components/lang-provider";

export function PageHeader({
  eyebrow,
  eyebrowEn,
  title,
  titleEn,
  intro,
  introEn,
}: {
  eyebrow: string;
  eyebrowEn?: string;
  title: string;
  titleEn?: string;
  intro?: string;
  introEn?: string;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 lg:pt-20">
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
