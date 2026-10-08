"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/lang-provider";

// Coborârea pe gradient, povestită la scroll: textul din stânga avansează pas
// cu pas, iar desenul din dreapta (fix cât timp citești) se schimbă cu el.
// Același model ca explicațiile vizuale de pe MLU-Explain.

// loss-ul ca funcție de o singură greutate: o parabolă cu minimul în w = 2
const W_MIN = 2;
const loss = (w: number) => 0.35 * (w - W_MIN) ** 2 + 0.6;
const grad = (w: number) => 0.7 * (w - W_MIN);

function descend(w0: number, eta: number, steps: number) {
  const out = [w0];
  for (let i = 0; i < steps; i++) out.push(out[i] - eta * grad(out[i]));
  return out;
}
const W0 = -1.2;
const SMALL = descend(W0, 0.5, 7); // converge
const LARGE = descend(W0, 3.1, 3); // sare peste minim și se depărtează

// desen
const VW = 480;
const VH = 300;
const PAD = { l: 44, r: 16, t: 20, b: 36 };
const X = (w: number) => PAD.l + ((w + 3) / 10) * (VW - PAD.l - PAD.r);
const Y = (l: number) => VH - PAD.b - (Math.min(l, 9) / 9) * (VH - PAD.t - PAD.b);
const CURVE = Array.from({ length: 81 }, (_, i) => {
  const w = -3 + (i / 80) * 10;
  return `${i ? "L" : "M"}${X(w).toFixed(1)},${Y(loss(w)).toFixed(1)}`;
}).join(" ");

const STEPS = [
  {
    ro: "Loss-ul, pentru o singură greutate w. Pe orizontală e valoarea greutății, pe verticală cât de mult greșește modelul. Vrem punctul cel mai de jos.",
    en: "The loss, for a single weight w. Horizontally, the value of the weight; vertically, how wrong the model is. We want the lowest point.",
  },
  {
    ro: "Nu știm unde e minimul, așa că pornim dintr-un w la întâmplare.",
    en: "We don't know where the minimum is, so we start from a random w.",
  },
  {
    ro: "Gradientul e panta curbei în punctul unde suntem. Spune în ce direcție crește loss-ul, și cât de abrupt.",
    en: "The gradient is the slope of the curve where we stand. It says which way the loss goes up, and how steeply.",
  },
  {
    ro: "Facem un pas în direcția opusă pantei. Mărimea pasului e rata de învățare η înmulțită cu gradientul.",
    en: "We take a step against the slope. The size of the step is the learning rate η times the gradient.",
  },
  {
    ro: "Repetăm. Cu cât ne apropiem de fund, cu atât panta scade, deci și pașii se micșorează singuri.",
    en: "Repeat. The closer we get to the bottom, the flatter the slope, so the steps shrink on their own.",
  },
  {
    ro: "Cu η prea mare, pasul sare peste minim pe partea cealaltă, apoi și mai departe. Loss-ul crește în loc să scadă.",
    en: "With η too large, the step jumps past the minimum to the other side, then further still. The loss goes up instead of down.",
  },
];

// pasul activ e cel care a ajuns în mijlocul ecranului
function useActiveStep(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.slice(0, count).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);

  return { refs, active };
}

export function GradientDescentScrolly() {
  const t = useT();
  const { refs, active } = useActiveStep(STEPS.length);

  // ce se vede la fiecare pas
  const showBall = active >= 1;
  const showTangent = active === 2 || active === 3;
  const trail = active >= 4 ? SMALL : active === 3 ? SMALL.slice(0, 2) : SMALL.slice(0, 1);
  const w = trail[trail.length - 1];
  const showLarge = active === 5;
  const ballW = showLarge ? LARGE[LARGE.length - 1] : w;

  const tangent = (() => {
    const g = grad(SMALL[0]);
    const w0 = SMALL[0];
    const l0 = loss(w0);
    return { x1: X(w0 - 1.6), y1: Y(l0 - 1.6 * g), x2: X(w0 + 1.6), y2: Y(l0 + 1.6 * g) };
  })();

  const graphic = (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="block h-full w-full" role="img" aria-label={t("Loss-ul în funcție de greutatea w", "The loss as a function of the weight w")}>
      {/* axe */}
      <line x1={PAD.l} x2={VW - PAD.r} y1={VH - PAD.b} y2={VH - PAD.b} stroke="var(--border-strong)" />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={VH - PAD.b} stroke="var(--border-strong)" />
      <text x={VW - PAD.r} y={VH - PAD.b + 22} textAnchor="end" fontSize={12} fontFamily="var(--font-sans)" className="fill-[color:var(--faint)]">
        w
      </text>
      <text x={PAD.l - 8} y={PAD.t + 8} textAnchor="end" fontSize={12} fontFamily="var(--font-sans)" className="fill-[color:var(--faint)]">
        loss
      </text>

      {/* curba și minimul */}
      <path d={CURVE} fill="none" stroke="var(--foreground)" strokeWidth={1.75} />
      <line x1={X(W_MIN)} x2={X(W_MIN)} y1={Y(loss(W_MIN))} y2={VH - PAD.b} stroke="var(--border-strong)" strokeDasharray="2 4" />
      <text x={X(W_MIN)} y={VH - PAD.b + 22} textAnchor="middle" fontSize={11} fontFamily="var(--font-sans)" className="fill-[color:var(--faint)]">
        {t("minim", "minimum")}
      </text>

      {/* tangenta: gradientul */}
      <g style={{ opacity: showTangent ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <line {...tangent} stroke="var(--clay)" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={tangent.x2 + 6} y={tangent.y2 + 4} fontSize={11.5} fontWeight={600} fontFamily="var(--font-display)" fill="var(--clay)">
          ∂L/∂w
        </text>
      </g>

      {/* urma pașilor mici */}
      {SMALL.map((wi, i) => (
        <g key={i} style={{ opacity: i < trail.length - 1 && !showLarge ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {i > 0 && (
            <line
              x1={X(SMALL[i - 1])}
              y1={Y(loss(SMALL[i - 1]))}
              x2={X(wi)}
              y2={Y(loss(wi))}
              stroke="var(--primary)"
              strokeWidth={1.25}
              opacity={0.5}
            />
          )}
          <circle cx={X(wi)} cy={Y(loss(wi))} r={4} fill="var(--card)" stroke="var(--primary)" strokeWidth={1.5} />
        </g>
      ))}

      {/* urma pașilor prea mari */}
      {LARGE.map((wi, i) => (
        <g key={`l${i}`} style={{ opacity: showLarge && i < LARGE.length - 1 ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {i > 0 && (
            <line
              x1={X(LARGE[i - 1])}
              y1={Y(loss(LARGE[i - 1]))}
              x2={X(wi)}
              y2={Y(loss(wi))}
              stroke="var(--clay)"
              strokeWidth={1.25}
              strokeDasharray="4 3"
            />
          )}
          <circle cx={X(wi)} cy={Y(loss(wi))} r={4} fill="var(--card)" stroke="var(--clay)" strokeWidth={1.5} />
        </g>
      ))}

      {/* bila: greutatea curentă */}
      <g
        style={{
          transform: `translate(${X(ballW)}px, ${Y(loss(ballW))}px)`,
          opacity: showBall ? 1 : 0,
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
        }}
      >
        <circle r={8} fill={showLarge ? "var(--clay)" : "var(--primary)"} />
        <text y={-14} textAnchor="middle" fontSize={11.5} fontWeight={600} fontFamily="var(--font-display)" className="fill-[color:var(--foreground)]">
          w
        </text>
      </g>

      {/* eticheta ratei de învățare */}
      <text x={VW - PAD.r} y={PAD.t + 8} textAnchor="end" fontSize={11.5} fontFamily="var(--font-sans)" fill={showLarge ? "var(--clay)" : "var(--faint)"} style={{ opacity: active >= 3 ? 1 : 0, transition: "opacity 0.4s ease" }}>
        η = {showLarge ? "3.1" : "0.5"}
      </text>
    </svg>
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
      {/* pe telefon desenul stă lipit sus cât derulezi prin pași; pe desktop, în dreapta */}
      <div className="sticky top-[4.2rem] z-10 -mx-5 border-b border-border bg-background px-5 py-3 lg:static lg:order-2 lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
        <div className="lg:sticky lg:top-24">
          <div className="h-[36vh] rounded-xl border border-border bg-card p-3 lg:h-auto lg:aspect-[8/5]">{graphic}</div>
        </div>
      </div>

      <ol className="lg:order-1">
        {STEPS.map((s, i) => (
          <li
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`flex min-h-[46vh] items-center py-8 transition-opacity duration-300 lg:min-h-[58vh] ${
              active === i ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="serif text-[1.02rem] leading-relaxed text-[color:var(--prose)]">
              <span className="mr-3 num text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              {t(s.ro, s.en)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
