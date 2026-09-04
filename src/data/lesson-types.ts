// Tipurile pentru lecții. Conținutul lecțiilor stă în content/lessons/*.md
// și e generat în lessons.ts / lessons-en.ts de scripts/build-lessons.mjs.

// Bloc de conținut. Fiecare bloc are exact o cheie care îi dă tipul.
export type Block =
  | { p: string } // paragraf
  | { list: string[] } // listă cu buline
  | { steps: string[] } // listă numerotată (pași)
  | { code: string; caption?: string } // bloc de cod
  | { note: string } // casetă de reținut
  | { formula: string; explain?: string }; // formulă + explicație

export interface LessonSection {
  heading: string;
  blocks?: Block[];
  paragraphs?: string[]; // format vechi, încă suportat de renderer
  code?: string; // format vechi
}

export interface Lesson {
  moduleCode: string;
  duration: string;
  intro: string;
  sections: LessonSection[];
  keyTakeaways?: string[]; // de reținut, pe scurt
  pitfalls: string[];
  practice: string[];
}
