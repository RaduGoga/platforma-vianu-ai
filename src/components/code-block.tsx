"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useT } from "@/components/lang-provider";

// Highlight minimal pentru Python, fără librărie: împart codul în tokeni cu un
// singur regex și le dau culoare. Codul din lecții e Python scurt, deci ajunge.
const KEYWORDS = new Set([
  "import", "as", "from", "for", "in", "if", "else", "elif", "def", "return",
  "class", "while", "with", "try", "except", "finally", "and", "or", "not",
  "is", "lambda", "yield", "break", "continue", "pass", "global", "nonlocal",
  "assert", "del", "raise", "await", "async",
]);
const CONSTS = new Set(["None", "True", "False", "self"]);

// grupuri: 1=comentariu, 2=string, 3=număr, 4=identificator
const TOKEN =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d[\d_]*\.?\d*\b)|([A-Za-z_]\w*)/g;

function colorFor(m: RegExpMatchArray): string | null {
  if (m[1] != null) return "var(--code-comment)";
  if (m[2] != null) return "var(--code-string)";
  if (m[3] != null) return "var(--code-number)";
  if (m[4] != null) {
    if (KEYWORDS.has(m[4])) return "var(--code-keyword)";
    if (CONSTS.has(m[4])) return "var(--code-number)";
  }
  return null;
}

function highlight(code: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(code.slice(last, i));
    const value = m[0];
    const color = colorFor(m);
    out.push(
      color ? (
        <span key={key++} style={{ color }}>
          {value}
        </span>
      ) : (
        value
      )
    );
    last = i + value.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({
  code,
  caption,
  className = "",
}: {
  code: string;
  caption?: string;
  className?: string;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocat (ex. fără https): nu facem nimic
    }
  };

  return (
    <figure className={className}>
      <div className="group/code relative">
        <pre className="overflow-x-auto rounded-lg border-l-2 border-primary bg-[color:var(--code-bg)] p-4 pr-14 text-sm leading-relaxed text-[color:var(--code-fg)]">
          <code className="font-mono" translate="no">
            {highlight(code)}
          </code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("Copiat", "Copied") : t("Copiază codul", "Copy code")}
          className="focus-ring absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-xs text-[color:var(--code-fg)] opacity-70 transition hover:bg-white/10 hover:opacity-100"
        >
          {copied ? (
            <>
              <Check className="size-3.5" /> {t("copiat", "copied")}
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> {t("copiază", "copy")}
            </>
          )}
        </button>
      </div>
      {caption && <figcaption className="kicker mt-2">{caption}</figcaption>}
    </figure>
  );
}
