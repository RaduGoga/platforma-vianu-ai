import type { ReactNode } from "react";

// Marcajul inline din textul lecțiilor: `cod` devine <code>. Restul textului
// rămâne cum e scris. Backtick-urile neînchise se afișează ca atare.
export function renderInline(text: string): ReactNode {
  if (!text.includes("`")) return text;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className="inline-code" translate="no">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}
