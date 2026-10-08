"use client";

import type { ComponentType } from "react";
import { renderInline } from "@/components/inline";
import { ThresholdFigure } from "@/components/figures/threshold";

// Figurile interactive pe care le poate chema o lecție prin `> [!FIGURE] nume`.
// Numele e cheia de aici; lecția dă doar legenda.
const FIGURES: Record<string, ComponentType> = {
  "prag-clasificare": ThresholdFigure,
};

export function LessonFigure({ name, caption }: { name: string; caption?: string }) {
  const Figure = FIGURES[name];
  if (!Figure) return null;
  return (
    <figure className="my-8">
      <Figure />
      {caption && <figcaption className="caption mt-3">{renderInline(caption)}</figcaption>}
    </figure>
  );
}
