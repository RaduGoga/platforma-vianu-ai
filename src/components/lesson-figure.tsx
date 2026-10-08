"use client";

import type { ComponentType } from "react";
import { renderInline } from "@/components/inline";
import { ThresholdFigure } from "@/components/figures/threshold";
import { GradientDescentScrolly } from "@/components/figures/gradient-descent";

// Figurile interactive pe care le poate chema o lecție prin `> [!FIGURE] nume`.
// Numele e cheia de aici; lecția dă doar legenda. Cele „wide” ies din coloana
// de text și iau toată lățimea articolului (text + desen, una lângă alta).
const FIGURES: Record<string, { Component: ComponentType; wide?: boolean }> = {
  "prag-clasificare": { Component: ThresholdFigure },
  "coborare-pe-gradient": { Component: GradientDescentScrolly, wide: true },
};

export function LessonFigure({ name, caption }: { name: string; caption?: string }) {
  const entry = FIGURES[name];
  if (!entry) return null;
  const { Component, wide } = entry;
  return (
    <figure className={wide ? "wide my-10 lg:-ml-24" : "my-8"}>
      <Component />
      {caption && <figcaption className="caption mt-3">{renderInline(caption)}</figcaption>}
    </figure>
  );
}
