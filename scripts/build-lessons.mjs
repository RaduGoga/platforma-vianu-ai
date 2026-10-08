// Citește content/lessons/Lectia_N.{ro,en}.md și generează lessons.ts + lessons-en.ts.
// Ordinea lecțiilor vine din curriculum.ts (ordinea modulelor).
// Rulează automat înainte de dev/build; manual: npm run lessons
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseLesson } from "./lessons-io.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content", "lessons");
const dataDir = join(root, "src", "data");
const notebookDir = join(root, "public", "notebooks");

// ordinea codurilor din curriculum (ordinea în care apar în fișier), plus
// slug-ul și titlul fiecărui modul, pentru notebook-uri
const curriculum = readFileSync(join(dataDir, "curriculum.ts"), "utf8");
const order = [...curriculum.matchAll(/code:\s*"([^"]+)"/g)].map((m) => m[1]);
const slugs = [...curriculum.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const titles = [...curriculum.matchAll(/\btitle:\s*"([^"]+)"/g)].map((m) => m[1]);
const titlesEn = [...curriculum.matchAll(/titleEn:\s*"([^"]+)"/g)].map((m) => m[1]);
const partOf = [...curriculum.matchAll(/\n    part:\s*"([^"]+)"/g)].map((m) => m[1]);

// Fișierele sunt numerotate după poziția în programă (Lectia_1, Lectia_2…),
// nu după codul de sesiune. Dacă inserezi o lecție la mijloc, tot ce urmează
// după ea trebuie renumerotat — și fișierele, și `code:` din front matter.
function loadLessons(lang) {
  const out = [];
  order.forEach((code, i) => {
    const nume = `Lectia_${i + 1}.${lang}.md`;
    const file = join(contentDir, nume);
    if (!existsSync(file)) {
      throw new Error(`lipsește ${nume} (lecția ${i + 1}, modulul ${code})`);
    }
    const lesson = parseLesson(readFileSync(file, "utf8"));
    if (lesson.moduleCode !== code) {
      throw new Error(
        `${nume} are code: ${lesson.moduleCode}, dar pe poziția ${i + 1} curriculumul are ${code}`
      );
    }
    out.push(lesson);
  });
  return out;
}

function genFile({ lang, constName, finderName, srcNote }) {
  const lessons = loadLessons(lang);
  const json = JSON.stringify(lessons, null, 2);
  return `// AUTO-GENERAT din ${srcNote} — NU edita direct.
// Editează fișierele markdown din content/lessons/, apoi rulează \`npm run lessons\`
// (se rulează oricum automat înainte de dev și build).
import type { Lesson } from "./lesson-types";
export type { Block, LessonSection, Lesson } from "./lesson-types";

export const ${constName}: Lesson[] = ${json};

export const ${finderName} = (code: string): Lesson | undefined =>
  ${constName}.find((l) => l.moduleCode === code);
`;
}

writeFileSync(
  join(dataDir, "lessons.ts"),
  genFile({ lang: "ro", constName: "lessons", finderName: "lessonByModule", srcNote: "content/lessons/*.ro.md" }),
  "utf8"
);
writeFileSync(
  join(dataDir, "lessons-en.ts"),
  genFile({ lang: "en", constName: "lessonsEn", finderName: "lessonByModuleEn", srcNote: "content/lessons/*.en.md" }),
  "utf8"
);
console.log(`Generat lessons.ts + lessons-en.ts din ${order.length} lecții.`);

// ————— notebook-uri Jupyter —————
// Fiecare lecție cu cod devine un .ipynb în public/notebooks: textul în
// celule markdown, codul în celule de cod, în aceeași ordine ca pe pagină.
// Se deschid în Colab sau se descarcă; lecțiile fără cod nu primesc notebook.

function blockToMd(b, lang) {
  if ("p" in b) return b.p;
  if ("list" in b) return b.list.map((x) => `- ${x}`).join("\n");
  if ("steps" in b) return b.steps.map((x, i) => `${i + 1}. ${x}`).join("\n");
  if ("note" in b) return `> **${lang === "en" ? "Remember" : "Reține"}:** ${b.note}`;
  if ("formula" in b) return `**${b.formula}**${b.explain ? `\n\n${b.explain}` : ""}`;
  return "";
}

// Comenzile de terminal din lecții (pip install, python --version) primesc `!`,
// ca să ruleze și dintr-o celulă de notebook, nu doar din terminal.
const SHELL = /^(python3?|pip3?|jupyter|sudo|brew|apt|cd)\b/;
function asCell(code) {
  const lines = code.split("\n");
  const shell = lines.filter((l) => l.trim()).every((l) => SHELL.test(l.trim()));
  return shell ? lines.map((l) => (l.trim() ? `!${l}` : l)).join("\n") : code;
}

function cell(type, source, id) {
  const base = { cell_type: type, id, metadata: {}, source: type === "code" ? asCell(source) : source };
  return type === "code" ? { ...base, execution_count: null, outputs: [] } : base;
}

function toNotebook({ lesson, number, title, lang }) {
  const cells = [];
  let n = 0;
  const nextId = () => `cell-${++n}`;
  const nota =
    lang === "en"
      ? "The cells below are the code from the lesson, in order. Some of them expect data you load yourself (`df`, `X_train`, `y_train`)."
      : "Celulele de mai jos sunt codul din lecție, în ordine. Unele presupun date pe care le încarci tu (`df`, `X_train`, `y_train`).";
  cells.push(
    cell("markdown", `# ${lang === "en" ? "Lesson" : "Lecția"} ${number} · ${title}\n\n${lesson.intro}\n\n*${nota}*`, nextId())
  );
  lesson.sections.forEach((s, i) => {
    let md = `## ${String(i + 1).padStart(2, "0")} · ${s.heading}`;
    const flush = () => {
      if (md) cells.push(cell("markdown", md, nextId()));
      md = "";
    };
    for (const b of s.blocks ?? []) {
      if ("code" in b) {
        flush();
        cells.push(cell("code", b.code, nextId()));
        if (b.caption) md = `*${b.caption}*`;
      } else {
        // figurile interactive n-au echivalent în notebook
        const piece = blockToMd(b, lang);
        if (piece) md += (md ? "\n\n" : "") + piece;
      }
    }
    flush();
  });
  return {
    cells,
    metadata: {
      kernelspec: { display_name: "Python 3", language: "python", name: "python3" },
      language_info: { name: "python" },
    },
    nbformat: 4,
    nbformat_minor: 5,
  };
}

mkdirSync(notebookDir, { recursive: true });
for (const f of readdirSync(notebookDir)) if (f.endsWith(".ipynb")) unlinkSync(join(notebookDir, f));

const generated = [];
for (const lang of ["ro", "en"]) {
  loadLessons(lang).forEach((lesson, i) => {
    const hasCode = lesson.sections.some((s) => (s.blocks ?? []).some((b) => "code" in b));
    if (!hasCode) return;
    const file = `${slugs[i]}.${lang}.ipynb`;
    const nb = toNotebook({ lesson, number: i + 1, title: lang === "en" ? titlesEn[i] : titles[i], lang });
    writeFileSync(join(notebookDir, file), JSON.stringify(nb, null, 1) + "\n", "utf8");
    generated.push(`${slugs[i]}.${lang}`);
  });
}

writeFileSync(
  join(dataDir, "notebooks.ts"),
  `// AUTO-GENERAT de scripts/build-lessons.mjs — NU edita direct.
// Lecțiile care au notebook în public/notebooks (cele cu cel puțin un bloc de cod).
export const notebooks = new Set<string>(${JSON.stringify(generated, null, 2)});

export const hasNotebook = (slug: string, lang: string) => notebooks.has(\`\${slug}.\${lang}\`);
`,
  "utf8"
);
console.log(`Generat ${generated.length} notebook-uri în public/notebooks.`);

// ————— indexul de căutare —————
// O intrare pe secțiune (plus una pe lecție, pentru titlu), cu un fragment de
// text. Îl încarcă doar fereastra de căutare, la deschidere.
const sectionId = (label) =>
  label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "sectiune";

const index = [];
for (const lang of ["ro", "en"]) {
  loadLessons(lang).forEach((lesson, i) => {
    const title = lang === "en" ? titlesEn[i] : titles[i];
    const base = { lang, slug: slugs[i], number: i + 1, title, part: partOf[i] };
    index.push({ ...base, heading: "", id: "", text: lesson.intro.slice(0, 180) });
    const seen = new Map();
    lesson.sections.forEach((s) => {
      const b = sectionId(s.heading);
      const n = seen.get(b) ?? 0;
      seen.set(b, n + 1);
      const text = (s.blocks ?? [])
        .filter((x) => "p" in x)
        .map((x) => x.p)
        .join(" ")
        .slice(0, 180);
      index.push({ ...base, heading: s.heading, id: n ? `${b}-${n + 1}` : b, text });
    });
  });
}
writeFileSync(
  join(dataDir, "search-index.ts"),
  `// AUTO-GENERAT de scripts/build-lessons.mjs — NU edita direct.
export interface SearchEntry {
  lang: string;
  slug: string;
  number: number;
  title: string;
  part: string;
  heading: string;
  id: string;
  text: string;
}

export const searchIndex: SearchEntry[] = ${JSON.stringify(index)};
`,
  "utf8"
);
console.log(`Generat indexul de căutare: ${index.length} intrări.`);
