// Emits one reviewable Markdown file per case study, in the order the page
// renders it, with a word count per section against the budgets recorded on
// the `CaseStudy` type. Output goes to research/generated/case-studies/<slug>.page.md
// (research/ is gitignored), so the review copy can never drift from the site:
// it is generated from src/data, the same rule llms.txt and resume.txt follow.
//
//   node scripts/casestudy-md.mjs            # all studies
//   node scripts/casestudy-md.mjs finance-cloud
//
// Images are stubbed to their import path, so no Vite is needed.

import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "research/generated/case-studies";

// Budgets from the CaseStudy type comments and research/decisions/case-study-layout.md §3.
const BUDGET = {
  overview: 70,
  context: 60,
  framing: 100,
  insight: 25,
  turn: 75,
  solutionBody: 120,
  impact: 150,
  trailer: 450,
  evidenceBody: 30,
};

const imgStub = {
  name: "img-stub",
  setup(b) {
    b.onResolve({ filter: /\.(jpe?g|png|webp|svg|gif)(\?.*)?$/ }, (a) => ({ path: a.path, namespace: "img" }));
    b.onLoad({ filter: /.*/, namespace: "img" }, (a) => ({
      contents: `export default ${JSON.stringify(a.path)}`,
      loader: "js",
    }));
  },
};

const bundle = await build({
  stdin: {
    contents:
      'export { caseStudies } from "./src/data/caseStudies"; export { projects } from "./src/data/projects";',
    resolveDir: process.cwd(),
    loader: "ts",
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  plugins: [imgStub],
});
const code = bundle.outputFiles[0].text;
const { caseStudies, projects } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);

const words = (s) => (s ? String(s).trim().split(/\s+/).filter(Boolean).length : 0);
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const budgetTag = (n, budget) =>
  budget == null ? `${n} words` : `${n} / ${budget} words${n > budget ? "  **OVER**" : ""}`;

function render(slug, cs) {
  const p = projects.find((x) => x.slug === slug);
  const L = [];
  const h = (level, text) => L.push(`${"#".repeat(level)} ${text}`, "");
  const para = (text) => text && L.push(text, "");
  const counts = {};

  L.push("---");
  L.push(`slug: ${slug}`);
  L.push(`generated: ${new Date().toISOString().slice(0, 10)}`);
  L.push("source: src/data/caseStudies.ts + src/data/projects.ts via scripts/casestudy-md.mjs");
  L.push("note: review copy of what the page renders. Edit the data files, not this file.");
  L.push("---", "");

  h(1, `${p?.title ?? slug}`);
  if (p?.tagline) para(`*${p.tagline}*`);

  // Hook: snapshot + stat band
  h(2, "Hook: snapshot and stat band");
  for (const f of cs.snapshotFields ?? []) L.push(`- **${f.label}:** ${f.value}`);
  if (cs.stats?.length) {
    L.push("");
    for (const s of cs.stats) L.push(`- **${s.value}** — ${s.label}`);
  }
  L.push("");

  // 01 Overview
  counts.overview = words(cs.overview);
  h(2, `01 Overview  (${budgetTag(counts.overview, BUDGET.overview)})`);
  para(cs.overview);

  // 02 Problem
  counts.context = words(cs.context);
  counts.framing = sum((cs.framing ?? []).map((f) => words(f.text)));
  counts.insight = words(cs.evidence?.insight);
  h(2, "02 Problem");
  h(3, `Context  (${budgetTag(counts.context, BUDGET.context)})`);
  para(cs.context);
  if (cs.framing?.length) {
    h(3, `Framing  (${budgetTag(counts.framing, BUDGET.framing)})`);
    for (const f of cs.framing) L.push(`- **${f.label}.** ${f.text}`);
    L.push("");
  }
  if (cs.evidence?.insight) {
    h(3, `Insight, pull-quote  (${budgetTag(counts.insight, BUDGET.insight)})`);
    para(`> ${cs.evidence.insight}`);
  }

  // 03 Turning point
  counts.turn = words(cs.turn);
  h(2, `03 Turning point  (${budgetTag(counts.turn, BUDGET.turn)})`);
  para(cs.turn);

  // 04 Solution
  counts.solutionBody = sum((cs.solutionSteps ?? []).map((s) => sum(s.points.map(words))));
  counts.captions = sum(
    (cs.solutionSteps ?? []).flatMap((s) => (s.images ?? []).map((i) => words(i.caption))),
  );
  h(2, `04 Solution  (${budgetTag(counts.solutionBody, BUDGET.solutionBody)}, captions ${counts.captions})`);
  (cs.solutionSteps ?? []).forEach((s, i) => {
    h(3, `Step ${i + 1}: ${s.title}`);
    for (const pt of s.points) L.push(`- ${pt}`);
    for (const img of s.images ?? []) L.push(`- *Image:* ${img.caption}`);
    L.push("");
  });
  const featured = (cs.decisions ?? []).find((d) => d.rejected && d.tradeoff) ?? cs.decisions?.[0];
  if (featured) {
    h(3, "Featured decision");
    L.push(`- **Decision.** ${featured.decision}`);
    L.push(`- **Why.** ${featured.rationale}`);
    if (featured.rejected) L.push(`- **Rejected.** ${featured.rejected}`);
    if (featured.tradeoff) L.push(`- **Cost.** ${featured.tradeoff}`);
    L.push("");
  }
  if (cs.images?.length) {
    h(3, "Gallery captions");
    for (const img of cs.images) L.push(`- ${img.caption}`);
    L.push("");
  }

  // 05 Outcomes
  const im = cs.impact ?? {};
  counts.impact =
    words(im.headline) + words(im.business) + words(im.user) + words(im.organizational) +
    words(im.before) + words(im.after) + sum((im.proof ?? []).map(words)) + words(im.metricStatus);
  h(2, `05 Outcomes  (${budgetTag(counts.impact, BUDGET.impact)})`);
  if (im.headline) para(`**${im.headline}**`);
  for (const [k, label] of [["business", "Business"], ["user", "User"], ["organizational", "Organizational"]])
    if (im[k]) L.push(`- **${label}.** ${im[k]}`);
  if (im.before || im.after) L.push(`- **Before → after.** ${im.before ?? "—"} → ${im.after ?? "—"}`);
  if (im.proof?.length) {
    L.push("", "Proof points:");
    for (const pr of im.proof) L.push(`- ${pr}`);
  }
  if (im.metricStatus) L.push("", `*Metric status:* ${im.metricStatus}`);
  L.push("");

  counts.trailer = counts.overview + counts.context + counts.turn + counts.solutionBody + counts.impact;
  para(`> **Trailer prose (overview + context + turn + solution + outcomes): ${budgetTag(counts.trailer, BUDGET.trailer)}** — the five-minute read. Framing, insight, and captions are scanned, so they sit outside it.`);

  // 06 Role and team
  counts.leadership = sum((cs.leadership ?? []).map((l) => words(l.title) + words(l.detail)));
  counts.ownedThemes = sum((cs.ownedThemes ?? []).map((o) => words(o.label) + words(o.detail)));
  counts.team = sum((cs.team ?? []).map((t) => words(t.role) + words(t.owned)));
  h(2, `06 Role and team  (leadership ${counts.leadership}, ownership ${counts.ownedThemes}, team ${counts.team} words)`);
  if (cs.leadership?.length) {
    h(3, "How I led");
    for (const l of cs.leadership) L.push(`- **${l.kind} — ${l.title}.** ${l.detail}`);
    L.push("");
  }
  if (cs.ownedThemes?.length) {
    h(3, "What I owned");
    for (const o of cs.ownedThemes) L.push(`- **${o.label}.** ${o.detail}`);
    L.push("");
  }
  if (cs.team?.length) {
    h(3, "Team");
    for (const t of cs.team) L.push(`- ${t.role}${t.owned ? ` — ${t.owned}` : ""}`);
    L.push("");
  }

  // 07 Research
  counts.evidenceBody = words(cs.evidence?.body);
  counts.findings = sum((cs.evidence?.findings ?? []).map((f) => words(f.finding) + words(f.response)));
  h(2, `07 Research  (method ${budgetTag(counts.evidenceBody, BUDGET.evidenceBody)}; ${cs.evidence?.findings?.length ?? 0} findings, ${counts.findings} words)`);
  para(cs.evidence?.body);
  for (const f of cs.evidence?.findings ?? []) L.push(`- **Finding.** ${f.finding}\n  **Response.** ${f.response}`);
  L.push("");

  // 08 Reflection
  const r = cs.reflection ?? {};
  counts.reflection = words(r.learned) + words(r.wouldChange) + words(r.principle);
  h(2, `08 Reflection  (${counts.reflection} words)`);
  if (r.learned) L.push(`- **Learned.** ${r.learned}`);
  if (r.wouldChange) L.push(`- **Would change.** ${r.wouldChange}`);
  if (r.principle) L.push(`- **Principle.** ${r.principle}`);
  L.push("");

  // 09 Details
  counts.decisions = sum((cs.decisions ?? []).map((d) => words(d.decision) + words(d.rationale) + words(d.rejected) + words(d.tradeoff)));
  counts.states = sum((cs.states ?? []).map((s) => words(s.state) + words(s.userSees) + words(s.recovery)));
  const noCost = (cs.decisions ?? []).filter((d) => !d.tradeoff).length;
  h(2, `09 Details  (decisions ${counts.decisions} words, ${cs.decisions?.length ?? 0} decisions, ${noCost} without a stated cost; states ${counts.states} words)`);
  if (cs.decisions?.length) {
    h(3, "Key decisions");
    cs.decisions.forEach((d, i) => {
      L.push(`${i + 1}. **${d.decision}**`);
      L.push(`   - Why: ${d.rationale}`);
      if (d.rejected) L.push(`   - Rejected: ${d.rejected}`);
      L.push(`   - Cost: ${d.tradeoff ?? "*(none stated — a decision with no cost reads as no decision)*"}`);
    });
    L.push("");
  }
  if (cs.states?.length) {
    h(3, "Edge cases and recovery");
    L.push("| State | User sees | Recovery |", "|---|---|---|");
    for (const s of cs.states) L.push(`| ${s.state} | ${s.userSees ?? ""} | ${s.recovery ?? ""} |`);
    L.push("");
  }
  if (cs.processImages?.length) {
    h(3, "Process image captions");
    for (const img of cs.processImages) L.push(`- ${img.caption}`);
    L.push("");
  }

  // Totals
  const total = sum(Object.entries(counts).filter(([k]) => k !== "trailer").map(([, v]) => v));
  h(2, "Word count by section");
  L.push("| Section | Words | Budget |", "|---|---|---|");
  const rows = [
    ["Overview", counts.overview, BUDGET.overview],
    ["Context", counts.context, BUDGET.context],
    ["Framing", counts.framing, BUDGET.framing],
    ["Insight", counts.insight, BUDGET.insight],
    ["Turning point", counts.turn, BUDGET.turn],
    ["Solution body", counts.solutionBody, BUDGET.solutionBody],
    ["Solution captions", counts.captions, ""],
    ["Outcomes", counts.impact, BUDGET.impact],
    ["Leadership (How I led)", counts.leadership, ""],
    ["Ownership themes", counts.ownedThemes, ""],
    ["Team", counts.team, ""],
    ["Research method", counts.evidenceBody, BUDGET.evidenceBody],
    ["Research findings", counts.findings, ""],
    ["Reflection", counts.reflection, ""],
    ["Decisions", counts.decisions, ""],
    ["States", counts.states, ""],
  ];
  for (const [n, w, b] of rows) L.push(`| ${n} | ${w} | ${b === "" ? "" : b} |`);
  L.push(`| **Trailer prose** | **${counts.trailer}** | ${BUDGET.trailer} |`);
  L.push(`| **Whole study** | **${total}** | |`);
  L.push("");
  return L.join("\n");
}

const only = process.argv[2];
mkdirSync(OUT_DIR, { recursive: true });
for (const [slug, cs] of Object.entries(caseStudies)) {
  if (only && slug !== only) continue;
  const file = join(OUT_DIR, `${slug}.page.md`);
  writeFileSync(file, render(slug, cs));
  console.log(`wrote ${file}`);
}
