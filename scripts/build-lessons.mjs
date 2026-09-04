// Citește content/lessons/Lectia_N.{ro,en}.md și generează lessons.ts + lessons-en.ts.
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
