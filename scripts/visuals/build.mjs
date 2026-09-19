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
const files = {
  "gaf/cover.svg": scenes.financeCloudCover,
  "cwo/cover.svg": scenes.billingCover,
  "di/cover.svg": scenes.documentAiCover,
  "cwo/billing-report.svg": scenes.billingReport,
  "cwo/package-index.svg": scenes.packageIndex,
  "cwo/review-flow.svg": scenes.reviewFlow,
  // Second pass: one plate for every decision that had none.
  "gaf/promotion-gate.svg": scenes.promotionGate,
  "gaf/copilot-plan.svg": scenes.copilotPlan,
  "gaf/confidence-tiers.svg": scenes.confidenceTiers,
  "cwo/progressive-validation.svg": scenes.progressiveValidation,
  "di/draft-export.svg": scenes.draftExport,
  "di/compliance-widget.svg": scenes.complianceWidget,
  "ccj/dynamic-segments.svg": scenes.dynamicSegments,
};
for (const [file, draw] of Object.entries(files)) {
  const svg = draw();
  fs.writeFileSync(path.join(out, file), svg);
  console.log(`${file}  ${(svg.length / 1024).toFixed(0)} kB`);
}
