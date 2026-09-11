/**
 * Builds a standalone HTML page from a rendering template in this folder.
 *
 *   node renderings/build.mjs k-broadsheet          # or j-plates
 *
 * A template is artifact-form HTML (title, font links, one <style>, markup,
 * no doctype/html/head/body) with two kinds of placeholder:
 *
 *   {{img:<name>}}   a screenshot from src/assets/case-studies/cwo/<name>.jpg,
 *                    embedded as a data URI
 *   {{svg:<name>}}   a drawn diagram from src/assets/case-studies/cwo/<name>.svg
 *                    (or <study>/<name>), inlined with the site's fonts, the
 *                    same edits src/data/diagramSvg.ts makes on the live site
 *
 * Writes renderings/<name>.html, a full standalone document (gitignored: it
 * embeds the screenshots). Set IMG_DIR to use downscaled copies instead of
 * the full-resolution originals.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, "../src/assets/case-studies");
const imgDir = process.env.IMG_DIR ?? path.join(assets, "cwo");

const img = (name) =>
  "data:image/jpeg;base64," + fs.readFileSync(path.join(imgDir, `${name}.jpg`)).toString("base64");
const svg = (name) =>
  fs
    .readFileSync(path.join(assets, name.includes("/") ? name : `cwo/${name}`) + ".svg", "utf8")
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .replace(/<defs>\s*<style>[\s\S]*?<\/style>\s*<\/defs>/, "")
    .replace(/'Geist Mono', monospace/g, "'IBM Plex Mono', ui-monospace, monospace")
    .replace(/'Inter', sans-serif/g, "'Inter', system-ui, sans-serif")
    .replace(/'Instrument Serif', serif/g, "'Inter', system-ui, sans-serif")
    .replace(/font-size="14" font-style="italic"/g, 'font-size="12" font-style="italic"')
    .replace(/font-size="16" font-style="italic"/g, 'font-size="14" font-style="italic"')
    .trim();

const names = process.argv.slice(2);
if (!names.length) throw new Error("usage: node renderings/build.mjs <template name> [...]");

for (const name of names) {
  const src = fs
    .readFileSync(path.join(here, `${name}.src.html`), "utf8")
    .replace(/\{\{img:([\w-]+)\}\}/g, (_, n) => img(n))
    .replace(/\{\{svg:([\w/-]+)\}\}/g, (_, n) => svg(n));
  const doc =
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    src.replace("</style>", "</style>\n</head>\n<body>") +
    "\n</body>\n</html>\n";
  fs.writeFileSync(path.join(here, `${name}.html`), doc);
  console.log(`built renderings/${name}.html (${(doc.length / 1024).toFixed(0)} kB)`);
}
