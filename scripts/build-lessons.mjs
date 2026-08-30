// Citește content/lessons/*.md și generează src/data/lessons.ts + lessons-en.ts.
// Ordinea lecțiilor vine din curriculum.ts (ordinea modulelor).
// Rulează automat înainte de dev/build; manual: npm run lessons
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseLesson } from "./lessons-io.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content", "lessons");
const dataDir = join(root, "src", "data");

// ordinea codurilor din curriculum (ordinea în care apar în fișier)
const curriculum = readFileSync(join(dataDir, "curriculum.ts"), "utf8");
const order = [...curriculum.matchAll(/code:\s*"([^"]+)"/g)].map((m) => m[1]);

function loadLessons(lang) {
  const out = [];
  for (const code of order) {
    const file = join(contentDir, `${code}.${lang}.md`);
    if (!existsSync(file)) {
      throw new Error(`lipsește lecția ${code}.${lang}.md`);
    }
    out.push(parseLesson(readFileSync(file, "utf8")));
  }
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
