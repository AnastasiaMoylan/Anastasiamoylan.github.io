import { projects } from "./projects";

/**
 * Every URL that gets prerendered to static HTML.
 *
 * Single source of truth: `scripts/prerender.mjs` renders exactly this list,
 * and generates `sitemap.xml` from it. Case-study URLs are derived from
 * `projects`, so adding a project needs no change here.
 *
 * `src/app/router.tsx` still declares its own <Route> elements — each maps to
 * a different component, so it can't be generated from this list. When adding
 * a *static* page, add it in both places.
 */
export const prerenderRoutes: string[] = [
  "/",
  "/work",
  ...projects.map((p) => `/work/${p.slug}`),
  // Retired slugs get a real prerendered page rather than a redirect stub, so an
  // old link still serves crawlable HTML. pageMeta points its canonical at the
  // current slug, which is what consolidates ranking signals.
  ...projects.flatMap((p) => (p.previousSlug ? [`/work/${p.previousSlug}`] : [])),
  "/philosophy",
  "/about",
  "/contact",
  "/resume",
];

export const SITE_URL = "https://anastasiamoylan.github.io";

/** Sitemap XML built from the same route list the prerender step uses. */
export function buildSitemap(): string {
  const urls = prerenderRoutes
    .map((route) => `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
