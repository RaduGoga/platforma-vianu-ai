import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

// Orice drum fără prefix de limbă (inclusiv „/” și vechile /programa/...) merge
// la limba preferată din cookie, altfel la română. Linkurile vechi rămân bune.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  const locale = cookie && isLocale(cookie) ? cookie : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// Sar peste fișiere, _next, api și rutele de metadata (sitemap, robots, icon).
export const config = {
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)"],
};
