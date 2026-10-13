"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Lesson, LessonSection, PracticeProblem } from "@/data/lesson-types";
import type { Module } from "@/data/curriculum";
import { lessonNumber } from "@/data/curriculum";
import { typeLabel } from "@/data/resources";
import { RecordVisit } from "@/components/record-visit";
import { LessonNav } from "@/components/lesson-nav";
import { CodeBlock } from "@/components/code-block";
import { renderInline } from "@/components/inline";
import { uniqueIds } from "@/lib/slug";
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

  // ancorele secțiunilor, din titluri: rezultatele căutării duc direct la ele
  const sectionIds = uniqueIds(lesson ? lesson.sections.map((s) => s.heading) : []);

  return (
    <div data-part={m.part}>
      {/* masthead lecție, pe alb; culoarea părții apare doar la etichetă și la
          linia de lângă rezumat */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10">
          <Link
            href={href("/programa")}
            className="focus-ring inline-flex min-h-8 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden /> {t("Cuprins", "Contents")}
          </Link>

          <div className="kicker mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-base">
              {t("Lecția", "Lesson")} {lessonNumber(m.code)}
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

          <h1 className="display mt-4 text-4xl sm:text-6xl">{title}</h1>

          <p className="serif mt-6 max-w-3xl border-l-2 border-[var(--part)] pl-5 text-lg leading-relaxed text-[color:var(--prose)]">
            {en ? m.summaryEn ?? m.summary : m.summary}
          </p>

          {lesson && <RecordVisit code={m.code} slug={m.slug} title={title} />}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block lg:pt-14">
          <LessonNav currentCode={m.code} variant="rail" />
        </aside>
        <article className="min-w-0 py-14">
          <LessonNav currentCode={m.code} variant="drawer" />
          {lesson ? (
            <>
              <p className="lesson-prose max-w-[var(--measure)]">{renderInline(lesson.intro)}</p>

              {lesson.sections.map((s, i) => (
                <section
                  key={i}
                  id={sectionIds[i]}
                  className="mt-14 scroll-mt-24 lg:grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-8"
                >
                  <div className="numeral mb-3 text-4xl lg:mb-0 lg:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="display text-2xl sm:text-3xl">{s.heading}</h2>
                    <SectionBody section={s} />
                  </div>
                </section>
              ))}
            </>
          ) : (
            <section className="lg:grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-8">
              <div className="numeral mb-3 text-4xl lg:mb-0 lg:text-5xl">§</div>
              <div>
                <h2 className="display text-2xl sm:text-3xl">{t("Ce se întâmplă", "What happens")}</h2>
                <ul className="mt-5 space-y-3">
                  {topics.map((tp, i) => (
                    <li key={i} className="sidenote flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--part)]" />
                      {tp}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {lesson && lesson.practice.length > 0 && <PracticeList problems={lesson.practice} />}

          {checkpoint && (
            <div className="mt-12 border-l-2 border-[var(--part)] bg-[color:color-mix(in_srgb,var(--part)_6%,var(--card))] p-5">
              <div className="display text-[var(--part)]">{t("Punct de control", "Checkpoint")}</div>
              <p className="serif mt-1 text-[color:var(--prose)]">{checkpoint}</p>
            </div>
          )}

          {resources.length > 0 && (
            <section className="mt-14 lg:grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-8">
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
                        <span className="text-sm text-foreground transition-colors group-hover:text-[var(--part)]">
                          {r.title}
                        </span>
                        <span className="mono-label inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                          {r.author ?? etichetaTip(r.type, en)} <ArrowUpRight className="size-3" aria-hidden />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <nav
            aria-label={t("Lecția anterioară și următoarea", "Previous and next lesson")}
            className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {prev ? (
              <Link href={href(`/programa/${prev.slug}`)} className="focus-ring group py-2">
                <span className="mono-label inline-flex items-center gap-1">
                  <ArrowLeft className="size-3" aria-hidden /> {t("Lecția", "Lesson")} {lessonNumber(prev.code)}
                </span>
                <div className="display mt-1 text-lg transition-colors group-hover:text-[var(--part)]">
                  {en ? prev.titleEn : prev.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={href(`/programa/${next.slug}`)} className="focus-ring group py-2 sm:text-right">
                <span className="mono-label inline-flex w-full items-center justify-start gap-1 sm:justify-end">
                  {t("Lecția", "Lesson")} {lessonNumber(next.code)} <ArrowRight className="size-3" aria-hidden />
                </span>
                <div className="display mt-1 text-lg transition-colors group-hover:text-[var(--part)]">
                  {en ? next.titleEn : next.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}

// Problemele de exersat: o listă simplă, cu link acolo unde problema are unul.
function PracticeList({ problems }: { problems: PracticeProblem[] }) {
  const t = useT();
  return (
    <section className="mt-14 lg:grid lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-8">
      <div className="kicker mb-4 lg:mb-0 lg:pt-1">{t("Probleme practice", "Practice problems")}</div>
      <div>
        <ul className="divide-y divide-border border-y border-border">
          {problems.map((pr, i) => (
            <li key={i}>
              {pr.url ? (
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex items-baseline justify-between gap-3 py-2.5"
                >
                  <span className="text-sm text-foreground transition-colors group-hover:text-[var(--part)]">
                    {pr.title}
                  </span>
                  <ArrowUpRight
                    className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-[var(--part)]"
                    aria-hidden
                  />
                </a>
              ) : (
                /* fără link încă: se vede, dar nu arată ca un buton mort */
                <span className="block py-2.5 text-sm text-muted-foreground">{pr.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionBody({ section }: { section: LessonSection }) {
  const t = useT();
  if (section.blocks && section.blocks.length > 0) {
    return (
      <div className="lesson-body mt-4">
        {section.blocks.map((b, i) => {
          if ("p" in b)
            return (
              <div key={i} className="lesson-prose">
                <p>{renderInline(b.p)}</p>
              </div>
            );
          if ("list" in b)
            return (
              <ul key={i} className="my-4 space-y-2">
                {b.list.map((li, j) => (
                  <li key={j} className="serif flex gap-3 leading-relaxed text-[color:var(--prose)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--part)]/70" />
                    <span>{renderInline(li)}</span>
                  </li>
                ))}
              </ul>
            );
          if ("steps" in b)
            return (
              <ol key={i} className="my-4 space-y-2.5">
                {b.steps.map((st, j) => (
                  <li key={j} className="serif flex gap-3 leading-relaxed text-[color:var(--prose)]">
                    <span className="mt-0.5 num text-xs text-[var(--part)]">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{renderInline(st)}</span>
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
                <p className="serif mt-1 leading-relaxed text-[color:var(--prose)]">{renderInline(b.note)}</p>
              </aside>
            );
          if ("formula" in b)
            return (
              <figure key={i} className="my-6 border-y border-border py-5">
                <div className="overflow-x-auto text-center font-mono text-[1.05rem] text-foreground">
                  {b.formula}
                </div>
                {b.explain && (
                  <figcaption className="sidenote mx-auto mt-3 max-w-prose text-center">
                    {renderInline(b.explain)}
                  </figcaption>
                )}
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
        <div className="lesson-prose mt-4 max-w-[var(--measure)]">
          {section.paragraphs.map((p, j) => (
            <p key={j}>{renderInline(p)}</p>
          ))}
        </div>
      )}
      {section.code && <CodeBlock code={section.code} className="mt-5 max-w-[var(--measure)]" />}
    </>
  );
}

// Tipul resursei e stocat în română. Fără traducere, pe /en apăreau
// „documentație" și „platformă" în mijlocul unei pagini englezești.
function etichetaTip(type: string, en: boolean) {
  const l = typeLabel[type as keyof typeof typeLabel];
  if (!l) return type;
  return en ? l.en : l.ro;
}
