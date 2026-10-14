import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../fonts.css";
import "../globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollTop } from "@/components/scroll-top";
import { LangProvider } from "@/components/lang-provider";
import { LOCALES, isLocale, altLanguages, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const COPY = {
  ro: {
    title: "Vianu AI, pregătire pentru olimpiada de AI",
    description:
      "Platforma clubului de AI de la Colegiul Național de Informatică \"Tudor Vianu\", cu lecția scrisă pentru fiecare modul. Deschisă oricui se pregătește pentru olimpiadă.",
    ogLocale: "ro_RO",
  },
  en: {
    title: "Vianu AI, prep for the AI olympiad",
    description:
      "The AI club curriculum at \"Tudor Vianu\" National College of Computer Science, with a written lesson for every module. Open to anyone preparing for the olympiad.",
    ogLocale: "en_US",
  },
} satisfies Record<Locale, { title: string; description: string; ogLocale: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "ro";
  const c = COPY[l];
  return {
    metadataBase: new URL(SITE_URL),
    // tab-ul arată doar numele paginii ("Programa", "Resurse"...); pe acasă,
    // doar numele mărcii. Titlul lung rămâne pentru OG/Twitter, mai jos.
    title: { default: "Vianu AI", template: "%s" },
    description: c.description,
    alternates: { canonical: `/${l}`, languages: altLanguages("") },
    keywords: [
      "olimpiada de inteligenta artificiala",
      "ONIA",
      "RoAI",
      "MLCompete",
      "Nitro NLP",
      "machine learning",
      "Vianu AI",
      "Colegiul National de Informatica Tudor Vianu",
    ],
    openGraph: {
      title: c.title,
      description: c.description,
      url: `/${l}`,
      siteName: "Vianu AI",
      locale: c.ogLocale,
      type: "website",
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "Vianu AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Vianu AI",
      description: c.description,
      images: ["/brand/og.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#417544",
};

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // fonturile și variabilele lor (--font-montserrat &co.) vin din fonts.css
  return (
    <html lang={lang}>
      {/* extensiile de browser (Grammarly &co.) injectează atribute pe body
          înainte să hidrateze React; fără asta apare un warning de hidratare
          care nu vine din codul nostru */}
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main" className="skip-link focus-ring">
          {lang === "en" ? "Skip to content" : "Sari la conținut"}
        </a>
        <LangProvider lang={lang}>
          <SiteNav />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <ScrollTop />
        </LangProvider>
      </body>
    </html>
  );
}
