"use client";

import { useEffect, useRef } from "react";

// Bara de progres la citit. Se randează în interiorul navbarului (care e
// `sticky`, deci e containing block), ancorată de marginea lui de jos — așa nu
// depinde de vreo înălțime hardcodată și nu poate ajunge sub el.
//
// Varianta veche stătea la `top: 57px` fix, dar navbarul are 61px și z-50 față
// de z-40 al barei: odată lipită, intra sub navbar și dispărea. De aici părea
// că nu se mișcă decât când te întorceai sus.
export function ReadingProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = fill.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      // scaleX se compune pe GPU; width ar forța layout la fiecare cadru
      el.style.transform = `scaleX(${p})`;
    };

    // un singur update pe cadru, oricâte evenimente de scroll ar veni
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]" aria-hidden>
      <div
        ref={fill}
        className="h-full w-full origin-left bg-primary transition-none"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
