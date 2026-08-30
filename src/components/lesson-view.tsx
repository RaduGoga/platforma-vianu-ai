"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Lesson, LessonSection } from "@/data/lessons";
import type { Module } from "@/data/curriculum";
import { ReadingProgress } from "@/components/reading-progress";
import { RecordVisit } from "@/components/record-visit";
import { LessonNav } from "@/components/lesson-nav";
import { CodeBlock } from "@/components/code-block";
import { useHref, useLang, useT } from "@/components/lang-provider";

export interface LinkedResource {
  id: string;
  title: string;
  author?: string;
  type: string;
  url: string;
}

export interface LessonViewProps {
  m: Module;
  partLabel: string;
  partLabelEn: string;
  lessonRo: Lesson | null;
  lessonEn: Lesson | null;
  prev: { slug: string; title: string; titleEn: string; code: string } | null;
  next: { slug: string; title: string; titleEn: string; code: string } | null;
  resources: LinkedResource[];
}

export function LessonView({
  m,
  partLabel,
  partLabelEn,
  lessonRo,
  lessonEn,
  prev,
  next,
  resources,
}: LessonViewProps) {
  const { lang } = useLang();
  const t = useT();
  const href = useHref();
  const en = lang === "en";

  // Lecția în limba aleasă, cu fallback pe română dacă engleza încă nu e scrisă.
  const lesson = en && lessonEn ? lessonEn : lessonRo;
  const title = en ? m.titleEn : m.title;
  const part = en ? partLabelEn : partLabel;
  const topics = en ? m.topicsEn : m.topics;
  const checkpoint = en ? m.checkpointEn ?? m.checkpoint : m.checkpoint;

  return (
    <>
      {lesson && <ReadingProgress />}
      {/* masthead lecție */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-10">
          <Link
            href={href("/programa")}
            className="focus-ring inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden /> {t("Cuprins", "Contents")}
          </Link>

          <div className="kicker mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-base">{m.code}</span>
            <span className="text-border">/</span>
            <span>
              {t("Sesiunea", "Session")} {m.weeks}
            </span>
            <span className="text-border">/</span>
            <span>{part}</span>
            {lesson && (
              <>
                <span className="text-border">/</span>
                <span>{lesson.duration}</span>
              </>
            )}
          </div>

          <h1 className="display mt-4 text-4xl leading-[1] sm:text-6xl">{title}</h1>

          {lesson && (
            <p className="serif mt-6 max-w-2xl border-l-2 border-primary pl-5 text-lg leading-relaxed text-[color:var(--prose)]">
              <span className="kicker block">{t("La final știi să", "By the end you can")}</span>
              <span className="mt-1 block">{lesson.objective}</span>
            </p>
          )}

          {lesson && <RecordVisit code={m.code} slug={m.slug} title={title} />}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
        <aside className="hidden lg:block lg:pt-14">
          <LessonNav currentCode={m.code} variant="rail" />
        </aside>
        <article className="min-w-0 py-14">
          <LessonNav currentCode={m.code} variant="drawer" />
          {lesson ? (
            <>
              <p className="lesson-prose max-w-2xl text-xl leading-relaxed text-foreground">
                {lesson.intro}
              </p>

              {lesson.sections.map((s, i) => (
                <section key={i} className="mt-14 lg:grid lg:grid-cols-[4rem_1fr] lg:gap-8">
                  <div className="numeral mb-3 text-4xl lg:mb-0 lg:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="display text-2xl sm:text-3xl">{s.heading}</h2>
                    <SectionBody section={s} />
                  </div>
                </section>
              ))}

              {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
                <section className="mt-14 lg:grid lg:grid-cols-[4rem_1fr] lg:gap-8">
                  <div className="kicker mb-3 lg:mb-0 lg:pt-1">{t("Reține", "Remember")}</div>
                  <div className="border-l-2 border-primary bg-[color:color-mix(in_srgb,var(--primary)_5%,var(--card))] py-2">
                    <ul className="space-y-3 pl-5 pr-4">
                      {lesson.keyTakeaways.map((k, i) => (
                        <li key={i} className="serif flex gap-3 leading-relaxed text-[color:var(--prose)]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              <div className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
                <aside>
                  <h2 className="kicker text-[color:var(--clay)]">{t("Capcane", "Pitfalls")}</h2>
                  <ul className="mt-4 space-y-3">
                    {lesson.pitfalls.map((p, i) => (
                      <li key={i} className="sidenote flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--clay)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </aside>
                <aside>
                  <h2 className="kicker">{t("Exersează", "Practice")}</h2>
                  <ol className="mt-4 space-y-3">
                    {lesson.practice.map((p, i) => (
                      <li key={i} className="sidenote flex gap-3">
                        <span className="mt-0.5 font-mono text-xs text-primary">{i + 1}.</span>
                        {p}
                      </li>
                    ))}
                  </ol>
                </aside>
              </div>
            </>
          ) : (
            <section className="lg:grid lg:grid-cols-[4rem_1fr] lg:gap-8">
              <div className="numeral mb-3 text-4xl lg:mb-0 lg:text-5xl">§</div>
              <div>
                <h2 className="display text-2xl sm:text-3xl">{t("Ce se întâmplă", "What happens")}</h2>
                <ul className="mt-5 space-y-3">
                  {topics.map((tp, i) => (
                    <li key={i} className="sidenote flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {tp}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {lesson && (
            <section className="mt-14 lg:grid lg:grid-cols-[4rem_1fr] lg:gap-8">
              <div className="kicker mb-3 lg:mb-0 lg:pt-1">{t("Index", "Index")}</div>
              <div className="flex flex-wrap gap-2">
                {topics.map((tp, i) => (
                  <span
                    key={i}
                    className="border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                  >
                    {tp}
                  </span>
                ))}
              </div>
            </section>
          )}

          {checkpoint && (
            <div className="mt-12 border-l-2 border-primary bg-[color:color-mix(in_srgb,var(--primary)_6%,var(--card))] p-5">
              <div className="display text-primary">{t("Punct de control", "Checkpoint")}</div>
              <p className="serif mt-1 text-[color:var(--prose)]">{checkpoint}</p>
            </div>
          )}

          {resources.length > 0 && (
            <section className="mt-14 lg:grid lg:grid-cols-[4rem_1fr] lg:gap-8">
              <div className="kicker mb-4 lg:mb-0 lg:pt-1">{t("Dacă vrei mai mult", "If you want more")}</div>
              <div>
                <ul className="divide-y divide-border border-y border-border">
                  {resources.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring group flex items-baseline justify-between gap-3 py-2.5"
                      >
                        <span className="text-sm text-foreground transition-colors group-hover:text-primary">
                          {r.title}
                        </span>
                        <span className="mono-label inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                          {r.author ?? r.type} <ArrowUpRight className="size-3" aria-hidden />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={href(`/programa/${prev.slug}`)} className="focus-ring group py-2">
                <span className="mono-label inline-flex items-center gap-1">
                  <ArrowLeft className="size-3" aria-hidden /> {prev.code}
                </span>
                <div className="display mt-1 text-lg transition-colors group-hover:text-primary">
                  {en ? prev.titleEn : prev.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={href(`/programa/${next.slug}`)} className="focus-ring group py-2 sm:text-right">
                <span className="mono-label inline-flex w-full items-center justify-start gap-1 sm:justify-end">
                  {next.code} <ArrowUpRight className="size-3" aria-hidden />
                </span>
                <div className="display mt-1 text-lg transition-colors group-hover:text-primary">
                  {en ? next.titleEn : next.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </>
  );
}

function SectionBody({ section }: { section: LessonSection }) {
  const t = useT();
  if (section.blocks && section.blocks.length > 0) {
    return (
      <div className="mt-4 max-w-2xl">
        {section.blocks.map((b, i) => {
          if ("p" in b)
            return (
              <div key={i} className="lesson-prose">
                <p>{b.p}</p>
              </div>
            );
          if ("list" in b)
            return (
              <ul key={i} className="my-4 space-y-2">
                {b.list.map((li, j) => (
                  <li key={j} className="serif flex gap-3 leading-relaxed text-[color:var(--prose)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    {li}
                  </li>
                ))}
              </ul>
            );
          if ("steps" in b)
            return (
              <ol key={i} className="my-4 space-y-2.5">
                {b.steps.map((st, j) => (
                  <li key={j} className="serif flex gap-3 leading-relaxed text-[color:var(--prose)]">
                    <span className="mt-0.5 font-mono text-xs text-primary">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    {st}
                  </li>
                ))}
              </ol>
            );
          if ("code" in b)
            return <CodeBlock key={i} code={b.code} caption={b.caption} className="my-5" />;
          if ("note" in b)
            return (
              <aside
                key={i}
                className="my-5 border-l-2 border-[color:var(--clay)] bg-[color:color-mix(in_srgb,var(--clay)_7%,var(--card))] py-3 pl-4 pr-4"
              >
                <span className="kicker text-[color:var(--clay)]">{t("Reține", "Remember")}</span>
                <p className="serif mt-1 leading-relaxed text-[color:var(--prose)]">{b.note}</p>
              </aside>
            );
          if ("formula" in b)
            return (
              <figure key={i} className="my-5 border border-border bg-secondary/40 px-4 py-4">
                <div className="overflow-x-auto text-center font-mono text-base text-foreground">
                  {b.formula}
                </div>
                {b.explain && <figcaption className="sidenote mt-2 text-center">{b.explain}</figcaption>}
              </figure>
            );
          return null;
        })}
      </div>
    );
  }

  return (
    <>
      {section.paragraphs && section.paragraphs.length > 0 && (
        <div className="lesson-prose mt-4 max-w-2xl">
          {section.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
      )}
      {section.code && <CodeBlock code={section.code} className="mt-5 max-w-2xl" />}
    </>
  );
}
