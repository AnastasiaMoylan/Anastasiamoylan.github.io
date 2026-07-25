import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const { render, getPageMeta, prerenderRoutes, buildSitemap } = await import(
  path.join(serverDir, "entry-server.js")
);

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function applyMeta(html, meta) {
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeText(meta.title)}</title>`)
    .replace(
      /(<meta name="description" content=)"[^"]*"/,
      `$1"${escapeAttr(meta.description)}"`
    )
    .replace(
      /(<meta property="og:title" content=)"[^"]*"/,
      `$1"${escapeAttr(meta.title)}"`
    )
    .replace(
      /(<meta property="og:description" content=)"[^"]*"/,
      `$1"${escapeAttr(meta.description)}"`
    )
    .replace(
      /(<meta property="og:url" content=)"[^"]*"/,
      `$1"${escapeAttr(meta.canonical)}"`
    )
    .replace(
      /(<link rel="canonical" href=)"[^"]*"/,
      `$1"${escapeAttr(meta.canonical)}"`
    );
}

for (const route of prerenderRoutes) {
  const appHtml = render(route);
  const html = applyMeta(template, getPageMeta(route)).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  const outPath =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`prerendered ${route} -> ${path.relative(root, outPath)}`);
}

// Generated from the same route list, so the sitemap can't drift from what
// actually ships. There is deliberately no sitemap.xml in public/.
const sitemapPath = path.join(distDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, buildSitemap());
console.log(`generated sitemap  -> ${path.relative(root, sitemapPath)} (${prerenderRoutes.length} urls)`);
