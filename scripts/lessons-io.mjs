// Serializare/parsare între lecția-obiect (tipul Lesson) și fișierul markdown
// editabil de mână. Folosit de export-lessons (TS -> md) și build-lessons (md -> TS).
// Formatul e simetric: serialize(parse(x)) === x.
//
// Structura fișierului:
//   ---
//   code: S1
//   duration: ~2h
//   ---
//
//   <o linie>
//
//   # @intro
//   <o linie>
//
//   ## Titlu secțiune
//   paragraf pe o linie
//
//   - element listă
//   - element listă
//
//   1. pas
//   2. pas
//
//   ```
//   cod
//   ```
//   caption: text opțional sub cod
//
//   > [!NOTE]
//   > text casetă
//
//   > [!FORMULA]
//   > f = g + h
//   > explicație opțională
//
//   # @takeaways        (opțional)
//   - ...
//   # @pitfalls
//   - ...
//   # @practice
//   - ...

const FENCE = "```";

// ————————————————————————— SERIALIZE (obiect -> md) —————————————————————————

function serializeBlock(b) {
  if ("p" in b) return b.p;
  if ("list" in b) return b.list.map((x) => `- ${x}`).join("\n");
  if ("steps" in b) return b.steps.map((x, i) => `${i + 1}. ${x}`).join("\n");
  if ("code" in b) {
    let out = `${FENCE}\n${b.code}\n${FENCE}`;
    if (b.caption) out += `\ncaption: ${b.caption}`;
    return out;
  }
  if ("note" in b) return `> [!NOTE]\n> ${b.note}`;
  if ("formula" in b) {
    let out = `> [!FORMULA]\n> ${b.formula}`;
    if (b.explain) out += `\n> ${b.explain}`;
    return out;
  }
  return "";
}

export function serializeLesson(l) {
  const parts = [];
  parts.push(`---\ncode: ${l.moduleCode}\nduration: ${l.duration}\n---`);
  parts.push(`# @objective\n${l.objective}`);
  parts.push(`# @intro\n${l.intro}`);
  for (const s of l.sections) {
    const blocks = (s.blocks || []).map(serializeBlock).join("\n\n");
    parts.push(`## ${s.heading}\n${blocks}`);
  }
  if (l.keyTakeaways && l.keyTakeaways.length)
    parts.push(`# @takeaways\n${l.keyTakeaways.map((x) => `- ${x}`).join("\n")}`);
  parts.push(`# @pitfalls\n${l.pitfalls.map((x) => `- ${x}`).join("\n")}`);
  parts.push(`# @practice\n${l.practice.map((x) => `- ${x}`).join("\n")}`);
  return parts.join("\n\n") + "\n";
}

// ————————————————————————— PARSE (md -> obiect) —————————————————————————

function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  const n = lines.length;
  while (i < n) {
    const line = lines[i];
    if (line.trim() === "") {
      i++;
      continue;
    }
    // cod fenced
    if (line.trim().startsWith(FENCE)) {
      i++; // sari peste fence-ul de deschidere
      const code = [];
      while (i < n && !lines[i].trim().startsWith(FENCE)) {
        code.push(lines[i]);
        i++;
      }
      i++; // sari peste fence-ul de închidere
      const block = { code: code.join("\n") };
      // caption opțional pe linia următoare
      let j = i;
      while (j < n && lines[j].trim() === "") j++;
      if (j < n && /^caption:/i.test(lines[j].trim())) {
        block.caption = lines[j].trim().replace(/^caption:\s*/i, "");
        i = j + 1;
      }
      blocks.push(block);
      continue;
    }
    // note
    if (line.trim().startsWith("> [!NOTE]")) {
      i++;
      const text = [];
      while (i < n && lines[i].trim().startsWith(">")) {
        text.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ note: text.join(" ").trim() });
      continue;
    }
    // formula
    if (line.trim().startsWith("> [!FORMULA]")) {
      i++;
      const quoted = [];
      while (i < n && lines[i].trim().startsWith(">")) {
        quoted.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const block = { formula: quoted[0] || "" };
      const explain = quoted.slice(1).join(" ").trim();
      if (explain) block.explain = explain;
      blocks.push(block);
      continue;
    }
    // listă
    if (/^-\s+/.test(line)) {
      const items = [];
      while (i < n && /^-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ""));
        i++;
      }
      blocks.push({ list: items });
      continue;
    }
    // pași numerotați
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < n && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ steps: items });
      continue;
    }
    // paragraf: linii consecutive până la o linie specială sau goală
    const para = [];
    while (i < n) {
      const l = lines[i];
      if (
        l.trim() === "" ||
        l.trim().startsWith(FENCE) ||
        l.trim().startsWith(">") ||
        /^-\s+/.test(l) ||
        /^\d+\.\s+/.test(l)
      )
        break;
      para.push(l.trim());
      i++;
    }
    blocks.push({ p: para.join(" ") });
  }
  return blocks;
}

export function parseLesson(md) {
  const text = md.replace(/\r\n/g, "\n");
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!fm) throw new Error("lipsește frontmatter");
  const meta = {};
  for (const row of fm[1].split("\n")) {
    const m = row.match(/^(\w+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2];
  }
  const body = text.slice(fm[0].length);
  const lines = body.split("\n");

  const lesson = {
    moduleCode: meta.code,
    duration: meta.duration,
    intro: "",
    sections: [],
    pitfalls: [],
    practice: [],
  };

  // împarte corpul în segmente: fiecare începe cu `# @xxx` sau `## Titlu`
  let cur = null; // { kind, heading?, lines: [] }
  const segments = [];
  for (const line of lines) {
    const meta1 = line.match(/^#\s+@(\w+)\s*$/);
    const sec = line.match(/^##\s+(.+?)\s*$/);
    if (meta1) {
      if (cur) segments.push(cur);
      cur = { kind: "meta", key: meta1[1], lines: [] };
    } else if (sec) {
      if (cur) segments.push(cur);
      cur = { kind: "section", heading: sec[1], lines: [] };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) segments.push(cur);

  for (const seg of segments) {
    if (seg.kind === "section") {
      lesson.sections.push({ heading: seg.heading, blocks: parseBlocks(seg.lines) });
      continue;
    }
    const joinPara = seg.lines.map((l) => l.trim()).filter(Boolean).join(" ");
    const bullets = seg.lines
      .filter((l) => /^-\s+/.test(l))
      .map((l) => l.replace(/^-\s+/, ""));
    if (seg.key === "intro") lesson.intro = joinPara;
    else if (seg.key === "takeaways") lesson.keyTakeaways = bullets;
    else if (seg.key === "pitfalls") lesson.pitfalls = bullets;
    else if (seg.key === "practice") lesson.practice = bullets;
  }
  return lesson;
}
