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
//
// Section order and names follow the principal framework
// (research/design/principal-ux-case-study-framework.md) as `buildSections`
// renders it: three parents, eight children. Rewritten 2026-09-09 when the
// two-layer trailer/proof order went; the budgets are the ones on the type.

import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "research/generated/case-studies";

// Word budgets from the CaseStudy type comments. Counts (rows, items) are the
// framework's own limits.
const BUDGET = {
  claim: 20,
  overview: 70,
  productFraming: 90,
  framing: 100,
  hmw: 30,
  insight: 25,
  evidenceBody: 30,
  impact: 150,
  metricStatus: 50,
};
const LIMIT = {
  constraints: [4, 6],
  decisions: [3, 6],
  findings: [0, 5],
  proof: [0, 4],
  tags: [0, 3],
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
const countTag = (n, [lo, hi], noun) => {
  const flag = n > hi ? "  **OVER**" : n < lo ? "  **UNDER**" : "";
  return `${n} ${noun}, framework asks for ${lo ? `${lo} to ${hi}` : `at most ${hi}`}${flag}`;
};

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

  // Lede: kicker, claim, byline, deck, scope grid, tags, stat band.
  const ov = cs.overview ?? {};
  const claim = cs.claim ?? ov.result ?? p?.tagline;
  const claimSource = cs.claim ? "claim" : ov.result ? "overview.result (no claim written)" : "tagline (no claim written — describes the work, does not assert an outcome)";
  counts.claim = words(claim);

  h(1, `${p?.title ?? slug}`);
  if (p?.tagline) para(`*Card tagline:* ${p.tagline}`);
  h(2, "Lede");
  L.push(`- **Claim (h1)**, from ${claimSource}  (${budgetTag(counts.claim, BUDGET.claim)}): ${claim}`);
  if (ov.approach) L.push(`- **Deck**: ${ov.approach}`);
  for (const f of cs.snapshotFields ?? []) L.push(`- **${f.label}:** ${f.value}`);
  if (p?.tags?.length) L.push(`- **Tags** (${countTag(p.tags.length, LIMIT.tags, "tags")}): ${p.tags.join(" · ")}`);
  if (cs.stats?.length) {
    L.push("", "At a glance:");
    for (const s of cs.stats) L.push(`- **${s.value}** — ${s.label}`);
  }
  L.push("");

  // 01 Framing
  h(2, "01 Framing — why this work mattered");

  counts.overview = words(ov.challenge) + words(ov.result) + words(ov.approach);
  h(3, `Overview  (${budgetTag(counts.overview, BUDGET.overview)})`);
  if (ov.challenge) L.push(`- **Challenge.** ${ov.challenge}`);
  if (ov.result) L.push(`- **Result.** ${ov.result}`);
  if (ov.approach) L.push(`- **Approach.** ${ov.approach}`);
  L.push("");

  counts.productFraming = words(cs.productFraming);
  counts.framing = sum((cs.framing ?? []).map((f) => words(f.text)));
  if (cs.productFraming || cs.framing?.length) {
    h(3, `Product framing  (${budgetTag(counts.productFraming, BUDGET.productFraming)})`);
    para(cs.productFraming);
    if (cs.framing?.length) {
      L.push(`Hypothesis and metric block  (${budgetTag(counts.framing, BUDGET.framing)}):`);
      for (const f of cs.framing) L.push(`- **${f.label}.** ${f.text}`);
      L.push("");
    }
  }

  counts.hmw = words(cs.hmw);
  counts.insight = words(cs.evidence?.insight);
  counts.constraints = sum((cs.constraints ?? []).map((c) => words(c.constraint) + words(c.implication)));
  const nConstraints = cs.constraints?.length ?? 0;
  if (cs.hmw || nConstraints || cs.evidence?.insight) {
    h(3, `The problem  (how-might-we ${budgetTag(counts.hmw, BUDGET.hmw)}; ${countTag(nConstraints, LIMIT.constraints, "constraints")}, ${counts.constraints} words)`);
    if (cs.hmw) para(`**${cs.hmw}**`);
    if (nConstraints) {
      L.push("| Constraint | Implication for the product |", "|---|---|");
      for (const c of cs.constraints) L.push(`| ${c.constraint} | ${c.implication} |`);
      L.push("");
    }
    if (cs.evidence?.insight) {
      L.push(`Insight, pull-quote  (${budgetTag(counts.insight, BUDGET.insight)}):`, "");
      para(`> ${cs.evidence.insight}`);
    }
  }

  // 02 The work
  h(2, "02 The work — what I decided and why");

  const sc = cs.scope ?? {};
  const scopeBlocks = [
    ["owned", "Owned"],
    ["led", "Led"],
    ["influenced", "Influenced beyond the design lane"],
    ["workedWith", "Worked with"],
  ].filter(([k]) => sc[k]);
  counts.scope = sum(scopeBlocks.map(([k]) => words(sc[k])));
  if (scopeBlocks.length) {
    h(3, `Scope and ownership  (${scopeBlocks.length} of 4 blocks, ${counts.scope} words)`);
    for (const [k, label] of scopeBlocks) L.push(`- **${label}.** ${sc[k]}  *(${words(sc[k])} words)*`);
    const missing = ["owned", "led", "influenced", "workedWith"].filter((k) => !sc[k]);
    if (missing.length) L.push("", `*Absent: ${missing.join(", ")}.*`);
    L.push("");
  }

  const decisions = cs.decisions ?? [];
  counts.decisions = sum(decisions.map((d) => words(d.decision) + words(d.rationale) + words(d.rejected) + words(d.tradeoff)));
  const noRejected = decisions.filter((d) => !d.rejected).length;
  const noCost = decisions.filter((d) => !d.tradeoff).length;
  h(3, `Key decisions  (${countTag(decisions.length, LIMIT.decisions, "decisions")}; ${counts.decisions} words; ${noRejected} without a rejected path, ${noCost} without a stated cost)`);
  decisions.forEach((d, i) => {
    L.push(`${i + 1}. **${d.decision}**`);
    L.push(`   - Why: ${d.rationale}`);
    L.push(`   - Rejected: ${d.rejected ?? "*(none stated — the framework asks for one)*"}`);
    if (d.tradeoff) L.push(`   - Cost: ${d.tradeoff}`);
    for (const img of d.images ?? []) L.push(`   - *Figure:* ${img.caption}`);
  });
  L.push("");
  counts.captions = sum([
    ...decisions.flatMap((d) => (d.images ?? []).map((i) => words(i.caption))),
    ...(cs.images ?? []).map((i) => words(i.caption)),
    ...(cs.processImages ?? []).map((i) => words(i.caption)),
  ]);
  if (cs.images?.length) {
    L.push("Study-level figures:");
    for (const img of cs.images) L.push(`- ${img.caption}`);
    L.push("");
  }
  counts.states = sum((cs.states ?? []).map((s) => words(s.state) + words(s.userSees) + words(s.recovery)));
  if (cs.states?.length) {
    L.push(`Edge cases and recovery  (${cs.states.length} states, ${counts.states} words):`, "");
    L.push("| State | User sees | Recovery |", "|---|---|---|");
    for (const s of cs.states) L.push(`| ${s.state} | ${s.userSees ?? ""} | ${s.recovery ?? ""} |`);
    L.push("");
  }
  if (cs.processImages?.length) {
    L.push("The flows behind the screens:");
    for (const img of cs.processImages) L.push(`- ${img.caption}`);
    L.push("");
  }

  const ev = cs.evidence ?? {};
  counts.evidenceBody = words(ev.body);
  const findings = ev.findings ?? [];
  counts.findings = sum(findings.map((f) => words(f.finding) + words(f.response)));
  if (ev.body || findings.length) {
    h(3, `Evidence  (method ${budgetTag(counts.evidenceBody, BUDGET.evidenceBody)}; ${countTag(findings.length, LIMIT.findings, "findings")}, ${counts.findings} words)`);
    para(ev.body);
    if (findings.length) {
      L.push("| Research finding | Product response |", "|---|---|");
      for (const f of findings) L.push(`| ${f.finding} | ${f.response} |`);
      L.push("");
    }
  }

  // 03 Results
  h(2, "03 Results — what changed and what I learned");

  const im = cs.impact ?? {};
  counts.impact =
    words(im.before) + words(im.after) + sum((im.proof ?? []).map(words)) + words(im.measureNext) + words(im.metricStatus);
  const nProof = im.proof?.length ?? 0;
  if (cs.impact) {
    h(3, `Outcome  (${budgetTag(counts.impact, BUDGET.impact)}; ${countTag(nProof, LIMIT.proof, "proof points")})`);
    L.push(`- **Before.** ${im.before ?? "—"}  *(${words(im.before)} words)*`);
    L.push(`- **After.** ${im.after ?? "—"}  *(${words(im.after)} words)*`);
    if (nProof) {
      L.push("", "Validated proof:");
      for (const pr of im.proof) L.push(`- ${pr}`);
    }
    if (im.measureNext) L.push("", `**What I would measure next.** ${im.measureNext}`);
    if (im.metricStatus) L.push("", `*Metric status  (${budgetTag(words(im.metricStatus), BUDGET.metricStatus)}):* ${im.metricStatus}`);
    else L.push("", "*Metric status: none — the framework asks for a disclaimer wherever a number cannot be attributed.*");
    L.push("");
  }

  const r = cs.reflection ?? {};
  counts.reflection = words(r.learned) + words(r.wouldChange) + words(r.principle);
  if (cs.reflection) {
    h(3, `What I learned  (${counts.reflection} words${r.wouldChange ? "; two paragraphs, the framework asks for one" : ""})`);
    if (r.learned) para(r.learned);
    if (r.wouldChange) para(r.wouldChange);
    if (r.principle) para(`> ${r.principle}`);
  }

  // Sign-off flags: every [NEEDS SIGN-OFF] comment in the source is a claim
  // the owner has not confirmed. Counted from the data file, not the page.
  // (The bundle strips comments, so the count is read from the source text.)

  // Totals
  const total = sum(Object.values(counts));
  h(2, "Word count by section");
  L.push("| Section | Words | Budget |", "|---|---|---|");
  const rows = [
    ["Claim (h1)", counts.claim, BUDGET.claim],
    ["Overview", counts.overview, BUDGET.overview],
    ["Product framing", counts.productFraming, BUDGET.productFraming],
    ["Hypothesis and metric block", counts.framing, BUDGET.framing],
    ["How might we", counts.hmw, BUDGET.hmw],
    ["Constraints table", counts.constraints, ""],
    ["Insight", counts.insight, BUDGET.insight],
    ["Scope and ownership", counts.scope, ""],
    ["Key decisions", counts.decisions, ""],
    ["Figure captions", counts.captions, ""],
    ["States", counts.states, ""],
    ["Evidence method", counts.evidenceBody, BUDGET.evidenceBody],
    ["Evidence findings", counts.findings, ""],
    ["Outcome", counts.impact, BUDGET.impact],
    ["What I learned", counts.reflection, ""],
  ];
  for (const [n, w, b] of rows) L.push(`| ${n} | ${w} | ${b === "" ? "" : b} |`);
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
