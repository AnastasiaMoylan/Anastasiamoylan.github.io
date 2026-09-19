/**
 * Writes every generated case-study visual to src/assets/case-studies/.
 *
 *   node scripts/visuals/build.mjs
 *
 * The scenes are in scenes.mjs, the primitives in lib.mjs. The outputs are
 * committed: the site imports them (`?raw` for inlining, plain for the URL)
 * and the renderings embed them, so a change here is a change on the page.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as scenes from "./scenes.mjs";

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/assets/case-studies");
// The Customer Journey cover and its four screens are no longer drawn here
// (2026-09-18): they are SVG exports from Figma (the CCJ Screens file and the
// Case Study Visuals cover plate), committed as-is. Their scenes stay in
// scenes.mjs but are not written, so a rebuild cannot overwrite the exports.
// The same holds since 2026-09-19 for every Finance Cloud, Billing and
// Document AI plate: they are exports of the plates on pages 01–03 of the
// Case Study Visuals file.
const files = {
  "ccj/dynamic-segments.svg": scenes.dynamicSegments,
};
for (const [file, draw] of Object.entries(files)) {
  const svg = draw();
  fs.writeFileSync(path.join(out, file), svg);
  console.log(`${file}  ${(svg.length / 1024).toFixed(0)} kB`);
}
