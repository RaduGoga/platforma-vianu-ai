// Domeniul canonic al site-ului, într-un singur loc.
// Îl folosesc metadataBase (deci canonical, hreflang și imaginea de OG),
// sitemap.xml și robots.txt — dacă ar fi scris separat în fiecare, ar ajunge
// inevitabil să spună lucruri diferite.
export const SITE_URL = "https://vianu-ai.ro";

// Depozitul de pe GitHub, pentru linkurile „Deschide în Colab”: Colab citește
// notebook-ul direct din repo, deci linkul merge după ce fișierul ajunge pe main.
export const REPO = "RaduGoga/platforma-vianu-ai";
export const REPO_BRANCH = "main";

export const notebookPath = (slug: string, lang: string) => `/notebooks/${slug}.${lang}.ipynb`;
export const colabUrl = (slug: string, lang: string) =>
  `https://colab.research.google.com/github/${REPO}/blob/${REPO_BRANCH}/public${notebookPath(slug, lang)}`;
