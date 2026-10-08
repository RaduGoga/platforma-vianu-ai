import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { modules, parts, lessonNumber } from "@/data/curriculum";
import { CREAM_HEX, PART_HEX } from "@/lib/parts";
import { LOCALES, isLocale } from "@/lib/i18n";

// Imaginea de partajat a fiecărei lecții: aceeași bandă în culoarea părții ca
// masthead-ul paginii, cu titlul lecției și marca jos.
export const alt = "Vianu AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => modules.map((m) => ({ lang, slug: m.slug })));
}

const montserrat = await readFile(join(process.cwd(), "src/fonts/Montserrat-ExtraBold.ttf"));
const mark = await readFile(join(process.cwd(), "public/brand/vianu-ai-mark.png"), "base64");
const markSrc = `data:image/png;base64,${mark}`;

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const en = isLocale(lang) && lang === "en";
  const m = modules.find((x) => x.slug === slug);
  const title = m ? (en ? m.titleEn : m.title) : "Vianu AI";
  const part = m ? (en ? parts[m.part].labelEn : parts[m.part].label) : "";
  const bg = m ? PART_HEX[m.part] : PART_HEX.fundamente;
  const n = m ? lessonNumber(m.code) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: bg,
          color: "#ffffff",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: CREAM_HEX, letterSpacing: 0.5 }}>
            {n ? `${en ? "Lesson" : "Lecția"} ${n}  ·  ${part}` : ""}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: title.length > 28 ? 72 : 92,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={markSrc} width={64} height={64} alt="" />
          <div style={{ fontSize: 34, letterSpacing: -0.5 }}>Vianu AI</div>
          <div style={{ fontSize: 26, color: CREAM_HEX, marginLeft: "auto" }}>vianu-ai.ro</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Montserrat", data: montserrat, style: "normal", weight: 800 }],
    }
  );
}
