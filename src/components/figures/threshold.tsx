"use client";

import { useId, useMemo, useState } from "react";
import { useT } from "@/components/lang-provider";

// Pragul de clasificare, de mișcat cu mâna: scorurile unui model pe o axă,
// pozitivele pe un rând, negativele pe altul. Tot ce cade la dreapta pragului
// e prezis pozitiv. Precizia, recall-ul și F1 se recalculează la fiecare pas.

// Generator determinist: aceleași puncte la fiecare randare, inclusiv pe server.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const gauss = (rand: () => number) => {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const clamp = (x: number) => Math.min(0.98, Math.max(0.02, x));

interface Pt {
  score: number;
  positive: boolean;
  jitter: number;
}

// Rotunjim la trei zecimale: log și cos pot diferi cu o unitate la ultima
// zecimală între server și browser, iar React compară atributele la hidratare.
const r3 = (x: number) => Math.round(x * 1000) / 1000;

function makePoints(): Pt[] {
  const rand = mulberry32(7);
  const pts: Pt[] = [];
  for (let i = 0; i < 40; i++)
    pts.push({ score: r3(clamp(0.3 + 0.17 * gauss(rand))), positive: false, jitter: r3(rand()) });
  for (let i = 0; i < 20; i++)
    pts.push({ score: r3(clamp(0.68 + 0.16 * gauss(rand))), positive: true, jitter: r3(rand()) });
  return pts;
}

const W = 640;
const H = 210;
const X0 = 74;
const X1 = W - 16;
const xOf = (s: number) => Math.round((X0 + s * (X1 - X0)) * 100) / 100;
const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(2) : "–");

export function ThresholdFigure() {
  const t = useT();
  const id = useId();
  const [thr, setThr] = useState(0.5);
  const points = useMemo(() => makePoints(), []);

  let tp = 0,
    fp = 0,
    fn = 0,
    tn = 0;
  for (const p of points) {
    const pred = p.score >= thr;
    if (p.positive && pred) tp++;
    else if (!p.positive && pred) fp++;
    else if (p.positive) fn++;
    else tn++;
  }
  const precision = tp + fp ? tp / (tp + fp) : NaN;
  const recall = tp + fn ? tp / (tp + fn) : NaN;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : NaN;

  const laneY = (p: Pt) => Math.round(((p.positive ? 44 : 112) + p.jitter * 44) * 100) / 100;
  const tx = xOf(thr);

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>
          {t("Scorurile modelului pe o axă, cu pragul de decizie", "Model scores on an axis, with the decision threshold")}
        </title>

        {/* zona prezisă pozitiv */}
        <rect x={tx} y={28} width={Math.max(0, X1 + 8 - tx)} height={140} fill="var(--primary)" opacity={0.06} />

        {/* etichetele rândurilor */}
        <text x={X0 - 10} y={70} textAnchor="end" className="fill-[color:var(--faint)]" fontSize={11} fontFamily="var(--font-mono)">
          {t("pozitive", "positive")}
        </text>
        <text x={X0 - 10} y={138} textAnchor="end" className="fill-[color:var(--faint)]" fontSize={11} fontFamily="var(--font-mono)">
          {t("negative", "negative")}
        </text>

        {/* axa scorului */}
        <line x1={X0} x2={X1} y1={178} y2={178} stroke="var(--border-strong)" strokeWidth={1} />
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line x1={xOf(v)} x2={xOf(v)} y1={178} y2={183} stroke="var(--border-strong)" />
            <text x={xOf(v)} y={198} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" className="fill-[color:var(--faint)]">
              {v.toFixed(2)}
            </text>
          </g>
        ))}

        {/* punctele */}
        {points.map((p, i) => {
          const pred = p.score >= thr;
          const color = p.positive ? "var(--primary)" : "var(--clay)";
          return (
            <circle
              key={i}
              cx={xOf(p.score)}
              cy={laneY(p)}
              r={5.5}
              fill={pred ? color : "var(--card)"}
              stroke={color}
              strokeWidth={1.5}
              opacity={p.positive === pred ? 1 : 0.55}
            />
          );
        })}

        {/* pragul */}
        <line x1={tx} x2={tx} y1={26} y2={178} stroke="var(--foreground)" strokeWidth={1.5} strokeDasharray="3 3" />
        <text x={tx} y={18} textAnchor="middle" fontSize={11.5} fontWeight={600} fontFamily="var(--font-display)" className="fill-[color:var(--foreground)]">
          {t("prag", "threshold")} {thr.toFixed(2)}
        </text>
      </svg>

      <label htmlFor={`${id}-range`} className="mt-3 flex items-center gap-3">
        <span className="mono-label shrink-0">{t("prag", "threshold")}</span>
        <input
          id={`${id}-range`}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={thr}
          onChange={(e) => setThr(Number(e.target.value))}
          className="focus-ring h-6 w-full cursor-pointer accent-[var(--primary)]"
          aria-valuetext={thr.toFixed(2)}
        />
      </label>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
        {[
          { label: t("precizie", "precision"), value: precision, hint: "TP / (TP + FP)" },
          { label: "recall", value: recall, hint: "TP / (TP + FN)" },
          { label: "F1", value: f1, hint: t("media armonică", "harmonic mean") },
        ].map((m) => (
          <div key={m.label}>
            <div className="font-mono text-2xl tabular-nums text-foreground">{fmt(m.value)}</div>
            <div className="kicker mt-0.5">{m.label}</div>
            <div className="mono-label mt-0.5 hidden sm:block">{m.hint}</div>
          </div>
        ))}
      </div>

      <dl className="mono-label mt-3 flex flex-wrap gap-x-4 gap-y-1 tabular-nums">
        {[
          ["TP", tp, t("pozitive prinse", "positives caught")],
          ["FP", fp, t("alarme false", "false alarms")],
          ["FN", fn, t("pozitive ratate", "positives missed")],
          ["TN", tn, t("negative corecte", "correct negatives")],
        ].map(([k, v, hint]) => (
          <div key={k as string} className="flex gap-1.5">
            <dt className="text-foreground">{k}</dt>
            <dd>
              {v} · {hint}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
