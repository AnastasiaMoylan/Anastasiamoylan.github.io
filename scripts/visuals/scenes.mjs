/**
 * The scenes: one function per figure. Each returns a complete SVG document.
 * Vocabulary is generic on purpose (project number, owner, status); no
 * client name, product name, or real record appears in any of them.
 */
import { C, F, use, doc, text, label, rect, card, chrome, greek, paragraph, chip, button, field, stepper, statusChip, table, pin, callout, note, spark, bars, chain, check, node, edge, tw } from "./lib.mjs";

const $ = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ------------------------------------------------------------------ */
/* Covers, 1440 x 900, on ink                                          */
/* ------------------------------------------------------------------ */

export function financeCloudCover() {
  use("finance");
  const id = "fc-cover";
  let s = "";
  // Analysis window
  const X = 96, Y = 96, W = 900, H = 640;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Finance Cloud", { crumbs: ["Analysis", "Accruals variance"] });
  // Prompt row
  s += rect(X + 32, Y + 80, W - 64, 48, { r: 8, fill: C.ground, stroke: C.border });
  s += text(X + 50, Y + 110, "Where did Q3 accruals diverge from forecast, by cost centre?", { size: 16, weight: 500 });
  s += text(X + W - 50, Y + 110, "⏎", { size: 14, fill: C.textMuted, anchor: "end" });
  // Answer: left column text, right column chart
  s += label(X + 32, Y + 168, "Draft answer", { fill: C.accent });
  s += text(X + 32, Y + 200, "Three cost centres carry 84% of the variance.", { size: 20, weight: 700, family: F.display });
  s += paragraph(X + 32, Y + 224, 380, 5, { gap: 18 });
  s += paragraph(X + 32, Y + 328, 380, 3, { gap: 18, widths: [0.9, 0.96, 0.5] });
  // Bars
  s += label(X + 470, Y + 168, "Variance to forecast, by cost centre");
  s += bars(X + 470, Y + 190, 398, 170, [0.42, 1, 0.68, 0.3, 0.22, 0.55], { accent: 1, labels: ["CC-110", "CC-220", "CC-230", "CC-310", "CC-400", "CC-520"] });
  // Provenance panel
  const py = Y + 410;
  s += rect(X + 32, py, W - 64, 118, { r: 8, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(X + 50, py + 26, "Provenance · every number traces to its source", { fill: C.accent });
  let cx = X + 50;
  for (const src of ["General ledger · Q3 close", "Forecast · v4", "Payroll register · Sep", "Cost-centre map"]) { const c = chip(cx, py + 44, src, { fill: C.white, stroke: C.accentMid, size: 12, h: 26 }); s += c.svg; cx += c.w + 10; }
  s += `<rect x="${X + 50}" y="${py + 88}" width="520" height="8" rx="4" fill="${C.border}"/><rect x="${X + 50}" y="${py + 88}" width="426" height="8" rx="4" fill="${C.dataDeep}"/>`;
  s += text(X + 586, py + 96, "Confidence 0.82 · above the review threshold", { size: 12, weight: 600, fill: C.dataDeep, mono: true });
  // Actions
  const b1 = button(X + 32, Y + H - 66, "Send to review", { primary: true });
  s += b1.svg;
  s += button(X + 32 + b1.w + 12, Y + H - 66, "Ask a follow-up", { primary: false }).svg;
  s += text(X + W - 32, Y + H - 42, "Nothing posts to the ledger from this screen", { size: 12, fill: C.textMuted, anchor: "end", mono: true });

  // Review card, overlapping right
  const RX = 976, RY = 250, RW = 368, RH = 420;
  s += card(id, RX, RY, RW, RH, { r: 12 });
  s += rect(RX, RY, RW, 56, { r: 12, fill: C.accent });
  s += rect(RX, RY + 40, RW, 16, { r: 0, fill: C.accent });
  s += text(RX + 24, RY + 35, "Human review", { size: 16, weight: 700, fill: C.white, family: F.display });
  s += label(RX + RW - 24, RY + 35, "Required", { fill: C.accentMid, anchor: "end" });
  s += text(RX + 24, RY + 92, "Accruals variance · draft 3", { size: 14, weight: 600 });
  s += text(RX + 24, RY + 114, "Reviewer: Controller, cost accounting", { size: 13, fill: C.textMuted });
  s += check(RX + 24, RY + 156, "Inputs traced to source", "done");
  s += check(RX + 24, RY + 190, "Confidence above threshold", "done");
  s += check(RX + 24, RY + 224, "Ledger impact reviewed", "pending");
  s += check(RX + 24, RY + 258, "Journal entry posted", "todo");
  s += `<path d="M${RX + 24} ${RY + 290}H${RX + RW - 24}" stroke="${C.border}"/>`;
  s += label(RX + 24, RY + 316, "Decision");
  const a = button(RX + 24, RY + 336, "Approve", { primary: true, w: 150 }); s += a.svg;
  s += button(RX + 24 + 162, RY + 336, "Return with a note", { primary: false, w: 170 }).svg;
  // Leader from Send to review → card
  s += note(RX + 24, RY + RH + 40, "Review before anything posts");
  // Chain
  s += chain(id, 96, 830, 1248, ["Signal", "AI draft", "Human review", "Action", "Audit log"], 2);
  return doc({ w: 1440, h: 900, id, title: "Finance Cloud: a governed analysis", desc: "An AI-drafted variance analysis with its sources and confidence shown, sent to a required human review before anything posts to the ledger. Below, the five-step governance chain: signal, AI draft, human review, action, audit log." }, s);
}

const STATES = ["Initiated", "In Progress", "Review", "Approved", "Finalized", "Completed"];

export function billingCover() {
  use("billing");
  const id = "bw-cover";
  let s = "";
  const X = 96, Y = 96, W = 960, H = 660;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Billing packages", { crumbs: ["Package · Project 48213"] });
  s += text(X + 32, Y + 104, "Billing package · Project 48213", { size: 24, weight: 700, family: F.display });
  s += statusChip(X + 32 + tw("Billing package · Project 48213", 24) + 16, Y + 86, "Review").svg;
  s += stepper(X + 40, Y + 160, STATES, 2, { w: 830 });
  // Meta
  const meta = [["Owner", "R. Alvarez"], ["Contract", "C-2211-04"], ["Projects", "4"], ["Last modified", "Today, 14:32"]];
  meta.forEach(([k, v], i) => { const mx = X + 32 + i * 220; s += label(mx, Y + 236, k); s += text(mx, Y + 260, v, { size: 15, weight: 600 }); });
  s += `<path d="M${X + 32} ${Y + 284}H${X + W - 32}" stroke="${C.border}"/>`;
  // Review task card
  s += rect(X + 32, Y + 304, 400, 132, { r: 8, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(X + 50, Y + 330, "Review task · in progress", { fill: C.accent });
  s += text(X + 50, Y + 358, "Locked to one reviewer until done", { size: 15, weight: 600 });
  s += text(X + 50, Y + 380, "Everyone else reads. Every inline edit is saved to the history.", { size: 13, fill: C.textMuted });
  s += button(X + 50, Y + 396, "Complete review", { primary: true, h: 30, size: 12 }).svg;
  // Validation card
  s += rect(X + 452, Y + 304, W - 484, 132, { r: 8, fill: C.white, stroke: C.border });
  s += label(X + 470, Y + 330, "Validation · as you go");
  s += check(X + 470, Y + 362, "Project numbers resolve", "done", { size: 13 });
  s += check(X + 470, Y + 390, "Feeder-system evidence attached", "done", { size: 13 });
  s += check(X + 470, Y + 418, "One invoice line still missing a category", "pending", { size: 13 });
  // Projects table
  s += label(X + 32, Y + 474, "Projects in this package");
  s += table(X + 32, Y + 486, [{ label: "Project", w: 130 }, { label: "Description", w: 330 }, { label: "Evidence", w: 150 }, { label: "Amount", w: 150, align: "right" }, { label: "Status", w: 136 }],
    [["48213-01", { greek: 220 }, "3 screenshots", { num: "$ 27,275.86" }, { status: "Approved" }], ["48213-02", { greek: 180 }, "2 screenshots", { num: "$ 13,180.27" }, { status: "Review" }], ["48213-03", { greek: 250 }, "Pending retry", { num: "$ 9,410.40" }, { status: "In Progress" }]], { rowH: 40, headH: 30 });

  // History panel overlapping right
  const HX = 1010, HY = 220, HW = 334, HH = 440;
  s += card(id, HX, HY, HW, HH, { r: 12 });
  s += text(HX + 24, HY + 40, "History", { size: 16, weight: 700, family: F.display });
  s += label(HX + HW - 24, HY + 40, "Every transition", { anchor: "end" });
  const hist = [["Review started", "R. Alvarez · 14:32", true], ["Submitted for review", "M. Chen · 11:05", false], ["Evidence regenerated", "System · retry 2 · 10:48", false], ["Screenshot bot failed", "System · progress kept", false], ["Package created", "M. Chen · Mon 09:12", false], ["Project lookup passed", "48213 · no duplicate", false]];
  hist.forEach(([t, m, hot], i) => {
    const y = HY + 82 + i * 58;
    s += `<circle cx="${HX + 34}" cy="${y}" r="${hot ? 7 : 5}" fill="${hot ? C.accent : C.white}" stroke="${hot ? C.accent : C.data}" stroke-width="2"/>`;
    if (i < hist.length - 1) s += `<path d="M${HX + 34} ${y + 8}V${y + 50}" stroke="${C.border}"/>`;
    s += text(HX + 56, y + 1, t, { size: 14, weight: hot ? 700 : 500 });
    s += text(HX + 56, y + 20, m, { size: 12, fill: C.textMuted, mono: true });
  });
  s += note(X + 32, Y + H + 40, "Owned, timestamped, recoverable");
  s += chain(id, 96, 830, 1248, STATES, 2);
  return doc({ w: 1440, h: 900, id, title: "An auditable billing workflow: one package", desc: "A billing package screen with its six-state status stepper on Review, a review task locked to one reviewer, progressive validation, the projects it bills, and a history panel listing every transition with who made it and when." }, s);
}

export function documentAiCover() {
  use("document");
  const id = "da-cover";
  let s = "";
  const X = 96, Y = 96, W = 1248, H = 640;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Document workspace", { crumbs: ["Policy set · 12 documents", "Compare"] });
  // Left: answer column
  const AX = X + 32, AW = 440;
  s += label(AX, Y + 88, "Question");
  s += text(AX, Y + 112, "Which access controls apply to a shared regional account?", { size: 15, weight: 600 });
  s += label(AX, Y + 156, "Answer · 3 sources", { fill: C.accent });
  const lines = [[1, 0.98], [null, 0.9], [2, 0.96], [null, 0.84], [3, 0.7], [null, 0.6]];
  lines.forEach(([cite, w], i) => {
    const y = Y + 178 + i * 22;
    s += greek(AX, y, AW * w - (cite ? 34 : 0), { h: 9, fill: C.dataSoft });
    if (cite) s += `<circle cx="${AX + AW * w - 14}" cy="${y + 4}" r="11" fill="${C.accent}"/>` + text(AX + AW * w - 14, y + 8, cite, { size: 11, weight: 700, fill: C.white, mono: true, anchor: "middle" });
  });
  // Active set strip
  s += rect(AX, Y + 330, AW, 150, { r: 8, fill: C.ground, stroke: C.border });
  s += label(AX + 16, Y + 354, "Active document set · editable");
  for (let i = 0; i < 12; i++) {
    const dx = AX + 16 + (i % 6) * 68, dy = Y + 370 + Math.floor(i / 6) * 50;
    const hot = i === 1 || i === 4 || i === 7;
    s += rect(dx, dy, 52, 38, { r: 4, fill: hot ? C.accentTint : C.white, stroke: hot ? C.accent : C.border });
    s += greek(dx + 8, dy + 10, 30, { h: 4, fill: hot ? C.accentMid : C.border }) + greek(dx + 8, dy + 19, 22, { h: 4, fill: hot ? C.accentMid : C.border });
    if (hot) s += `<circle cx="${dx + 44}" cy="${dy + 8}" r="6" fill="${C.accent}"/>`;
  }
  s += text(AX, Y + 512, "Every answer carries its sources.", { size: 13, weight: 600 });
  s += text(AX, Y + 530, "Remove a document and the answer re-derives.", { size: 13, fill: C.textMuted });
  s += button(AX, Y + 548, "Save as compliance check", { primary: true }).svg;
  // Right: compare panel
  const PX = X + 520, PW = W - 552;
  s += label(PX, Y + 88, "Comparison mode");
  const modes = ["Side by side", "Redline", "Summary"];
  let mx = PX + 130;
  modes.forEach((m, i) => { const c = chip(mx, Y + 74, m, { fill: i === 0 ? C.dark : C.white, color: i === 0 ? C.white : C.text, size: 12, h: 24, stroke: i === 0 ? C.dark : C.border }); s += c.svg; mx += c.w + 8; });
  const DW = (PW - 24) / 2, DY = Y + 116, DH = 500;
  [["Access policy · v7", "Effective this year"], ["Access policy · v6", "Superseded"]].forEach(([t, sub], i) => {
    const dx = PX + i * (DW + 24);
    s += rect(dx, DY, DW, DH, { r: 8, fill: C.white, stroke: C.dark, sw: 1.2 });
    s += text(dx + 16, DY + 28, t, { size: 14, weight: 700 });
    s += text(dx + DW - 16, DY + 28, sub, { size: 11, fill: C.textMuted, anchor: "end", mono: true });
    s += `<path d="M${dx} ${DY + 44}H${dx + DW}" stroke="${C.border}"/>`;
    const hi = i === 0 ? [3, 4, 9] : [3, 9, 10];
    for (let r = 0; r < 18; r++) {
      const y = DY + 66 + r * 24, w = (DW - 32) * [1, 0.92, 0.97, 0.86, 0.94, 0.55][r % 6];
      if (hi.includes(r)) s += rect(dx + 10, y - 7, DW - 20, 20, { r: 3, fill: i === 0 ? C.accentTint : C.dataSoft });
      s += greek(dx + 16, y, w, { h: 8, fill: hi.includes(r) ? (i === 0 ? C.accentMid : C.data) : C.border });
    }
    // Citation markers on the highlights
    if (i === 0) { s += pin(dx + DW - 14, DY + 66 + 3 * 24 - 2, "1"); s += pin(dx + DW - 14, DY + 66 + 9 * 24 - 2, "2"); }
    else s += pin(dx + DW - 14, DY + 66 + 9 * 24 - 2, "3");
  });
  s += callout(id, AX + AW * 0.98 - 14, Y + 178 + 4, PX - 6, DY + 66 + 3 * 24 - 2, "", { anchor: "end" });
  s += note(PX, Y + H + 40, "Citation 1 · traced to the passage it cites");
  s += chain(id, 96, 830, 1248, ["Question", "Retrieve", "Cite", "Compare", "Reuse as a check"], 2);
  return doc({ w: 1440, h: 900, id, title: "A verifiable document AI platform", desc: "A document workspace: an answer with numbered citations, the active document set shown as editable tiles, and two versions of a policy compared side by side with the cited passages highlighted and linked to the citation numbers." }, s);
}

export function customerJourneyCover() {
  use("journey");
  const id = "cj-cover";
  let s = "";
  // Left: KPI tile
  const KX = 96, KY = 120, KW = 340;
  s += card(id, KX, KY, KW, 250, { r: 12 });
  s += rect(KX, KY, KW, 6, { r: 3, fill: C.risk });
  s += label(KX + 24, KY + 40, "At risk · this week", { fill: C.risk });
  s += text(KX + 24, KY + 70, "Top-up revenue", { size: 16, weight: 600 });
  s += text(KX + 24, KY + 122, "−5.2%", { size: 48, weight: 800, family: F.display, fill: C.risk });
  s += text(KX + 24, KY + 148, "Fewer people topped up than last month", { size: 13, fill: C.textMuted });
  s += spark(KX + 24, KY + 168, KW - 48, 50, [0.7, 0.72, 0.68, 0.74, 0.7, 0.62, 0.58, 0.5, 0.44, 0.38], { stroke: C.risk });
  const mb = button(KX + KW - 24 - 110, KY + 32, "Mitigate", { primary: true, h: 30, size: 12, w: 110 }); s += mb.svg;
  // Second KPI, dimmer
  s += card(id, KX, KY + 274, KW, 120, { r: 12 });
  s += text(KX + 24, KY + 306, "Data usage", { size: 14, weight: 600 });
  s += text(KX + 24, KY + 348, "−0.5%", { size: 28, weight: 800, family: F.display, fill: C.dataDeep });
  s += spark(KX + 190, KY + 300, 126, 60, [0.5, 0.55, 0.52, 0.6, 0.58, 0.56, 0.6, 0.57], { stroke: C.data, area: false });
  // Middle: mitigation plan
  const MX = 470, MY = 96, MW = 560, MH = 660;
  s += card(id, MX, MY, MW, MH, { r: 12 });
  s += chrome(MX, MY, MW, "Mitigation plan", { crumbs: ["Top-up revenue"] });
  s += label(MX + 32, MY + 90, "Key drivers · from the model");
  const drivers = [["Top-up failure via IVR", 0.38], ["Card declined, no retry offered", 0.27], ["App session abandoned at PIN", 0.19], ["Other", 0.16]];
  drivers.forEach(([d, v], i) => {
    const y = MY + 116 + i * 40;
    s += text(MX + 32, y + 4, d, { size: 14, weight: i === 0 ? 600 : 400 });
    s += rect(MX + 300, y - 8, 190, 14, { r: 7, fill: C.muted }) + rect(MX + 300, y - 8, 190 * v, 14, { r: 7, fill: i === 0 ? C.accent : C.data });
    s += text(MX + MW - 32, y + 4, Math.round(v * 100) + "%", { size: 13, mono: true, anchor: "end", fill: C.textMuted });
  });
  s += `<path d="M${MX + 32} ${MY + 286}H${MX + MW - 32}" stroke="${C.border}"/>`;
  s += label(MX + 32, MY + 314, "Offer · drafted by the assistant", { fill: C.accent });
  s += text(MX + 32, MY + 346, "Audience", { size: 12, weight: 600, fill: C.textMuted });
  let cx = MX + 32; for (const a of ["IVR top-up failures · 7 days", "Prepaid · active 90 days"]) { const c = chip(cx, MY + 356, a, { size: 12, h: 24 }); s += c.svg; cx += c.w + 8; }
  s += text(MX + 32, MY + 408, "Tone", { size: 12, weight: 600, fill: C.textMuted });
  cx = MX + 32; ["Neutral", "Warm", "Direct"].forEach((t, i) => { const c = chip(cx, MY + 418, t, { fill: i === 1 ? C.dark : C.white, color: i === 1 ? C.white : C.text, stroke: i === 1 ? C.dark : C.border, size: 12, h: 24 }); s += c.svg; cx += c.w + 8; });
  s += rect(MX + 32, MY + 462, MW - 64, 120, { r: 8, fill: C.ground, stroke: C.border });
  s += label(MX + 48, MY + 486, "Message preview · editable");
  s += paragraph(MX + 48, MY + 504, MW - 96, 3, { gap: 18, widths: [0.96, 0.9, 0.5] });
  s += text(MX + 48, MY + 566, "Includes a 5-day top-up credit · expires after one use", { size: 12, fill: C.textMuted, mono: true });
  s += button(MX + 32, MY + MH - 66, "Send for review", { primary: true }).svg;
  s += text(MX + MW - 32, MY + MH - 42, "Never sent without a person", { size: 12, fill: C.textMuted, anchor: "end", mono: true });
  // Right: review gate
  const RX = 1064, RY = 200, RW = 280, RH = 400;
  s += card(id, RX, RY, RW, RH, { r: 12 });
  s += rect(RX, RY, RW, 56, { r: 12, fill: C.accent }) + rect(RX, RY + 40, RW, 16, { r: 0, fill: C.accent });
  s += text(RX + 24, RY + 35, "Human review", { size: 16, weight: 700, fill: C.white, family: F.display });
  s += text(RX + 24, RY + 92, "Offer to 1,240 customers", { size: 14, weight: 600 });
  s += text(RX + 24, RY + 114, "CX lead · retention", { size: 13, fill: C.textMuted });
  s += check(RX + 24, RY + 156, "Audience matches the driver", "done", { size: 13 });
  s += check(RX + 24, RY + 190, "Credit within policy", "done", { size: 13 });
  s += check(RX + 24, RY + 224, "Message edited by a person", "pending", { size: 13 });
  s += check(RX + 24, RY + 258, "Sent", "todo", { size: 13 });
  s += button(RX + 24, RY + 300, "Approve and send", { primary: true, w: RW - 48 }).svg;
  s += button(RX + 24, RY + 348, "Edit the message", { primary: false, w: RW - 48 }).svg;
  s += note(KX + 24, KY + 274 + 120 + 40, "Score becomes a driver");
  s += note(RX + 24, RY + RH + 40, "Draft becomes a decision");
  s += chain(id, 96, 830, 1248, ["Churn score", "Driver", "AI draft", "Human review", "Send and monitor"], 3);
  return doc({ w: 1440, h: 900, id, title: "The connected customer journey", desc: "From a churn score to a human decision: an at-risk revenue tile, a mitigation plan listing the model's key drivers and an assistant-drafted offer with audience and tone controls, and a required human review before the offer is sent." }, s);
}

/* ------------------------------------------------------------------ */
/* Billing plates                                                       */
/* ------------------------------------------------------------------ */

export function billingReport() {
  use("billing");
  const id = "bw-report";
  let s = "";
  const X = 80, Y = 64, W = 1040, H = 1000;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Billing packages", { crumbs: ["Project 48213", "Billing report"] });
  s += text(X + 40, Y + 108, "Billing report", { size: 28, weight: 700, family: F.display });
  s += text(X + 40, Y + 134, "Last data sync today, 12:00 · 4 projects included", { size: 13, fill: C.textMuted, mono: true });
  s += button(X + W - 40 - 150, Y + 84, "Download PDF", { primary: true, w: 150 }).svg;
  const TX = X + 40, TW = W - 80;
  const rows = [["Material and equipment", 13180.27], ["Labor · contract", 27275.86], ["Labor · client", 9410.40], ["Engineering · contract", 6030.39], ["Engineering · client", 4215.10], ["Overhead loadings", 2612.04]];
  const gross = rows.reduce((a, r) => a + r[1], 0);
  const credits = [["Betterment credit", -1000.00], ["Salvage credit", 0], ["Depreciation credit", 0]];
  const net = gross + credits.reduce((a, r) => a + r[1], 0);
  let y = Y + 176;
  s += rect(TX, y, TW, 40, { r: 0, fill: C.muted });
  s += text(TX + 16, y + 26, "Breakdown of charges", { size: 15, weight: 700 });
  s += text(TX + TW - 16, y + 26, "Category total", { size: 12, weight: 600, mono: true, fill: C.textMuted, anchor: "end" });
  s += `<path d="M${TX} ${y + 40}H${TX + TW}" stroke="${C.dark}" stroke-width="1.2"/>`;
  y += 40;
  const line = (name, amt, { bold = false, fill = C.text, indent = 16, disclosure = true, bg } = {}) => {
    if (bg) s += rect(TX, y, TW, 46, { r: 0, fill: bg });
    if (disclosure) s += `<path d="M${TX + indent} ${y + 19}l5 4-5 4" fill="none" stroke="${C.textMuted}" stroke-width="1.5"/>`;
    s += text(TX + indent + (disclosure ? 16 : 0), y + 28, name, { size: 14, weight: bold ? 700 : 400, fill });
    s += text(TX + TW - 16, y + 28, "$ " + $(amt), { size: 14, weight: bold ? 700 : 500, fill, mono: true, anchor: "end" });
    y += 46;
    s += `<path d="M${TX} ${y}H${TX + TW}" stroke="${C.border}"/>`;
  };
  rows.forEach(([n, a]) => line(n, a));
  line("Gross construction cost", gross, { bold: true, disclosure: false, bg: C.ground });
  credits.forEach(([n, a]) => line(n, a));
  line("Net construction cost", net, { bold: true, disclosure: false, bg: C.ground });
  line("Less previous billings", 0, { disclosure: false, indent: 32 });
  line("Less advance payments", 0, { disclosure: false, indent: 32 });
  // Total
  s += rect(TX, y + 16, TW, 64, { r: 6, fill: C.accent });
  s += text(TX + 20, y + 55, "Total amount due", { size: 16, weight: 700, fill: C.white });
  s += text(TX + TW - 20, y + 56, "$ " + $(net), { size: 22, weight: 700, fill: C.white, mono: true, anchor: "end" });
  s += text(TX + TW - 20, y + 110, "Every line above is traceable to a project, a feeder-system screenshot, and a ledger entry.", { size: 12, fill: C.textMuted, anchor: "end", mono: true });
  return doc({ w: 1200, h: 1128, id, title: "Billing report", desc: "A finalized billing report: charges by category, gross and net construction cost, credit lines, previous billings and advance payments, and the total amount due, with a Download PDF action." }, s);
}

export function packageIndex() {
  use("billing");
  const id = "bw-index";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Billing packages");
  s += text(X + 40, Y + 108, "Billing packages", { size: 28, weight: 700, family: F.display });
  s += text(X + 40, Y + 134, "129 packages · 70 people · sorted by last modified", { size: 13, fill: C.textMuted, mono: true });
  s += button(X + W - 40 - 236, Y + 84, "Start new billing package", { primary: true, w: 236 }).svg;
  s += field(X + W - 40 - 236 - 20 - 300, Y + 84, 300, { value: "48213", icon: "search", h: 38 });
  s += text(X + W - 40 - 236 - 20 - 300, Y + 74, "Filter by project number", { size: 12, weight: 600, fill: C.textMuted });
  const owners = ["R. Alvarez", "M. Chen", "J. Okafor", "S. Patel", "M. Chen", "L. Duarte", "R. Alvarez", "J. Okafor", "S. Patel", "A. Novak"];
  const statuses = ["Review", "In Progress", "Approved", "Completed", "Initiated", "Finalized", "In Progress", "Review", "Completed", "Approved"];
  const mod = ["Today, 14:32", "Today, 11:05", "Yesterday, 16:40", "Yesterday, 09:18", "Mon, 15:02", "Mon, 10:51", "Fri, 17:22", "Fri, 13:09", "Thu, 11:44", "Wed, 08:30"];
  const rows = owners.map((o, i) => [`PKG-${1042 - i}`, `48213${i ? "-" + (i + 1) : ""}, 4820${i}${i > 4 ? ", +2" : ""}`, `C-22${10 + i}-0${(i % 4) + 1}`, o, { status: statuses[i] }, mod[i], { link: "View" }]);
  s += table(X + 40, Y + 164, [{ label: "Package", w: 130 }, { label: "Projects", w: 300 }, { label: "Contract", w: 160 }, { label: "Owner", w: 200 }, { label: "Status", w: 170 }, { label: "Last modified", w: 200 }, { label: "", w: 72 }], rows, { rowH: 48, headH: 40 });
  s += text(X + 40, Y + H - 28, "1 – 10 of 129", { size: 12, fill: C.textMuted, mono: true });
  s += text(X + W - 40, Y + H - 28, "Rows per page 10  ‹  ›", { size: 12, fill: C.textMuted, mono: true, anchor: "end" });
  return doc({ w: 1440, h: 900, id, title: "Billing package index", desc: "The package index: a project-number filter, a Start new billing package control, and a table of packages with their projects, contract, owner, status chip and last-modified time.", grid: false }, s);
}

export function reviewFlow() {
  use("billing");
  const id = "bw-review";
  let s = "";
  // Lanes
  s += label(48, 40, "Reviewer", { fill: C.dataDeep });
  s += label(48, 470, "Everyone else", { fill: C.dataDeep });
  s += `<path d="M48 440H1392" stroke="${C.border}" stroke-dasharray="6 6"/>`;
  // Nodes
  s += node(48, 120, 200, 64, "Open billing package", { sub: "Any role" });
  s += node(300, 104, 200, 96, "Review active?", { kind: "decision" });
  s += node(552, 120, 200, 64, "Start review", { sub: "Reviewer set to me" });
  s += node(804, 120, 200, 64, "Status · Review", { kind: "state", sub: "Locked to one reviewer" });
  s += node(1056, 120, 220, 64, "Inline edit", { sub: "Field by field" });
  s += node(1056, 260, 220, 64, "Save · history entry", { sub: "Who, what, when" });
  s += node(804, 260, 200, 64, "Complete review");
  s += node(552, 340, 200, 64, "Status · Approved", { kind: "end" });
  s += node(48, 340, 200, 64, "Return · In Progress", { sub: "With a recorded reason" });
  s += node(580, 520, 200, 64, "View only", { sub: "Until the review ends" });
  s += node(280, 512, 240, 80, "Someone else reviewing?", { kind: "decision" });
  // Edges
  s += edge(id, "M248 152H300");
  s += edge(id, "M500 152H552", { label: "No", lx: 526, ly: 138 });
  s += edge(id, "M752 152H804");
  s += edge(id, "M1004 152H1056", { accent: true });
  s += edge(id, "M1166 184V260", { accent: true });
  s += edge(id, "M1056 292H1004", { accent: true });
  s += edge(id, "M1276 292Q1320 292 1320 220Q1320 152 1276 152", { accent: true, dash: "5 4", label: "Loop", lx: 1330, ly: 222 });
  s += edge(id, "M904 324V372H752", { label: "Approve", lx: 828, ly: 400 });
  s += edge(id, "M804 292H160Q148 292 148 304V340", { label: "Return", lx: 620, ly: 278 });
  s += edge(id, "M400 200V512", { label: "Yes", lx: 400, ly: 360 });
  s += edge(id, "M520 552H580", { label: "Yes", lx: 550, ly: 538 });
  s += edge(id, "M400 592Q400 650 300 650Q248 650 248 610V184", { label: "No, it is me", lx: 330, ly: 668 });
  s += edge(id, "M680 520Q680 480 700 480H900Q904 480 904 324", { dash: "4 4", label: "Review ends", lx: 800, ly: 468 });
  return doc({ w: 1440, h: 720, id, title: "Review flow", desc: "Flow: opening a billing package checks whether a review is active. If someone else is reviewing, the package is view only until the review ends. Otherwise the reviewer starts the review, the status moves to Review and locks to that reviewer, inline edits each save a history entry, and completing the review either approves the package or returns it to In Progress with a recorded reason.", ground: "warm", grid: false }, s);
}

/* ------------------------------------------------------------------ */
/* Customer journey plates                                              */
/* ------------------------------------------------------------------ */

function kpiTile(id, x, y, w, name, value, note, vals, { risk = false } = {}) {
  let s = card(id, x, y, w, 150, { r: 10, shadow: false });
  if (risk) s += rect(x, y, w, 5, { r: 2.5, fill: C.risk });
  s += text(x + 20, y + 36, name, { size: 14, weight: 600 });
  if (risk) { const c = chip(x + w - 20 - 78, y + 20, "At risk", { fill: C.riskSoft, color: C.riskText, size: 11, h: 22 }); s += c.svg; }
  s += text(x + 20, y + 80, value, { size: 34, weight: 800, family: F.display, fill: risk ? C.risk : C.text });
  s += text(x + 20, y + 102, note, { size: 12, fill: C.textMuted });
  s += spark(x + 20, y + 112, w - 40, 26, vals, { stroke: risk ? C.risk : C.data });
  if (risk) s += button(x + w - 20 - 92, y + 48, "Mitigate", { primary: true, w: 92, h: 30, size: 12 }).svg;
  return s;
}

export function analystDashboard() {
  use("journey");
  const id = "cj-dash";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Customer journeys", { crumbs: ["Analyst view", "Prepaid segment"] });
  // Sidebar
  s += rect(X, Y + 52, 64, H - 52, { r: 0, fill: C.muted });
  for (let i = 0; i < 5; i++) s += rect(X + 20, Y + 84 + i * 48, 24, 24, { r: 6, fill: i === 0 ? C.accent : C.border });
  const CX = X + 96, CW = W - 128;
  s += text(CX, Y + 100, "New at-risk metrics", { size: 22, weight: 700, family: F.display });
  s += text(CX + tw("New at-risk metrics", 22) + 16, Y + 100, "✓ up to date, 09:40", { size: 12, fill: C.dataDeep, mono: true });
  const tw3 = (CW - 40) / 3;
  s += kpiTile(id, CX, Y + 124, tw3, "Top-up revenue", "−5.2%", "Fewer people topped up than last month", [0.7, 0.72, 0.68, 0.74, 0.7, 0.62, 0.55, 0.48, 0.42], { risk: true });
  s += kpiTile(id, CX + tw3 + 20, Y + 124, tw3, "Data usage", "−0.5%", "Slight decrease against last month", [0.5, 0.55, 0.52, 0.6, 0.58, 0.56, 0.6, 0.57, 0.55]);
  s += kpiTile(id, CX + 2 * (tw3 + 20), Y + 124, tw3, "Network experience", "−2.0%", "Average throughput, evening peak", [0.6, 0.62, 0.6, 0.58, 0.61, 0.57, 0.55, 0.56, 0.52]);
  // Tabs
  const ty = Y + 316;
  let tx = CX; ["Performance", "Active experiences", "Historical segments", "Engagement"].forEach((t, i) => { s += text(tx, ty, t, { size: 14, weight: i === 0 ? 700 : 500, fill: i === 0 ? C.accent : C.textMuted }); if (i === 0) s += `<path d="M${tx} ${ty + 10}H${tx + tw(t, 14)}" stroke="${C.accent}" stroke-width="2"/>`; tx += tw(t, 14) + 32; });
  s += `<path d="M${CX} ${ty + 12}H${CX + CW}" stroke="${C.border}"/>`;
  // Small metrics row
  const my = ty + 36, mw = (CW - 40) / 3;
  [["Average top-up this month", "$30.20", [0.4, 0.6, 0.5, 0.7, 0.55]], ["New accounts", "5,000", [0.3, 0.4, 0.5, 0.45, 0.7]], ["IVR calls this week", "300", [0.6, 0.5, 0.7, 0.8, 0.75]]].forEach(([n, v, vals], i) => {
    const mx = CX + i * (mw + 20);
    s += rect(mx, my, mw, 76, { r: 8, fill: C.ground, stroke: C.border });
    s += text(mx + 16, my + 28, n, { size: 12, fill: C.textMuted });
    s += text(mx + 16, my + 58, v, { size: 22, weight: 700, family: F.display });
    s += bars(mx + mw - 120, my + 18, 100, 40, vals, { gap: 6 });
  });
  // Big chart + two side charts
  const gy = my + 100, gw = CW * 0.56, gh = H - (gy - Y) - 36;
  s += rect(CX, gy, gw, gh, { r: 8, fill: C.white, stroke: C.border });
  s += text(CX + 16, gy + 28, "ARPU", { size: 14, weight: 600 });
  s += chip(CX + 16 + tw("ARPU", 14) + 10, gy + 14, "Unusual", { fill: C.warnSoft, color: C.warn, size: 11, h: 20 }).svg;
  s += text(CX + 16, gy + 62, "$682.5", { size: 28, weight: 800, family: F.display });
  s += text(CX + 16, gy + 82, "Total spend · −2.4% vs last month", { size: 12, fill: C.textMuted });
  for (let i = 0; i < 5; i++) { const ly = gy + 110 + i * ((gh - 140) / 4); s += `<path d="M${CX + 56} ${ly}H${CX + gw - 16}" stroke="${C.muted}"/>`; s += text(CX + 48, ly + 4, "$" + (700 - i * 100), { size: 11, fill: C.textMuted, anchor: "end", mono: true }); }
  s += spark(CX + 56, gy + 110, gw - 72, gh - 140, [0.55, 0.58, 0.52, 0.6, 0.64, 0.6, 0.66, 0.7, 0.62, 0.58, 0.5, 0.52, 0.48, 0.44, 0.46, 0.5], { stroke: C.data });
  const sx = CX + gw + 20, sw = CW - gw - 20, sh = (gh - 20) / 2;
  [["NPS", "0.062", "Typical", [0.4, 0.5, 0.7, 0.9]], ["Retention", "100", "Typical", [0.5, 0.8, 0.6, 0.5]]].forEach(([n, v, t, vals], i) => {
    const sy = gy + i * (sh + 20);
    s += rect(sx, sy, sw, sh, { r: 8, fill: C.white, stroke: C.border });
    s += chip(sx + 16, sy + 14, t, { fill: C.okSoft, color: C.ok, size: 11, h: 20 }).svg;
    s += text(sx + 16, sy + 62, n, { size: 14, weight: 600 });
    s += text(sx + 16, sy + 94, v, { size: 26, weight: 800, family: F.display });
    s += bars(sx + sw - 150, sy + 30, 130, sh - 56, vals, { gap: 8, accent: i === 0 ? 3 : 1 });
  });
  return doc({ w: 1440, h: 900, id, title: "Analyst dashboard", desc: "An analyst dashboard with three at-risk metric tiles, the first flagged and carrying a Mitigate action, a performance tab with average top-up, new accounts and IVR calls, an ARPU trend marked unusual, and NPS and retention beside it.", grid: false }, s);
}

export function journeyExploration() {
  use("journey");
  const id = "cj-journey";
  let s = "";
  s += label(64, 56, "Journey exploration · top-up failure, by channel", { fill: C.dataDeep });
  s += text(64, 96, "Where a failed top-up turns into churn", { size: 26, weight: 700, family: F.display });
  s += text(64, 122, "Percentages are the share of customers on that path who churned within 30 days. Illustrative values.", { size: 13, fill: C.textMuted });
  const col = (x, y, w, h, t, sub, { tone = "plain" } = {}) => {
    const fill = tone === "risk" ? C.risk : tone === "root" ? C.dark : C.white;
    const color = tone === "plain" ? C.text : C.white;
    let o = rect(x, y, w, h, { r: 8, fill, stroke: tone === "plain" ? C.dark : fill, sw: 1.4 });
    o += text(x + 14, y + 26, t, { size: 14, weight: 700, fill: color });
    if (sub) o += text(x + 14, y + 46, sub, { size: 12, fill: tone === "plain" ? C.textMuted : C.rose, mono: true });
    return o;
  };
  const link = (x1, y1, x2, y2, { accent = false, w = 2 } = {}) => `<path d="M${x1} ${y1}C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}" fill="none" stroke="${accent ? C.risk : C.data}" stroke-width="${w}" stroke-opacity="${accent ? 1 : 0.8}"/>`;
  // Root
  s += col(64, 300, 200, 62, "Top-up attempted", "100% of customers", { tone: "root" });
  // Channels
  const chans = [["Mobile app", "48% of attempts", 170], ["SMS", "22% of attempts", 300], ["IVR", "30% of attempts", 430]];
  chans.forEach(([t, sub, y]) => { s += link(264, 331, 360, y + 31); s += col(360, y, 200, 62, t, sub); });
  // Outcomes per channel: success / failure
  const outs = [
    [170, [["Continued", "91% · 2% churn", 130, false], ["Failed at PIN", "9% · 14% churn", 210, false]]],
    [300, [["Continued", "88% · 3% churn", 290, false], ["Card declined", "12% · 21% churn", 370, false]]],
    [430, [["Continued", "71% · 4% churn", 450, false], ["Failed in IVR", "29% · 38% churn", 540, true]]],
  ];
  outs.forEach(([cy, list]) => list.forEach(([t, sub, y, hot]) => { s += link(560, cy + 31, 680, y + 31, { accent: hot, w: hot ? 4 : 2 }); s += col(680, y, 220, 62, t, sub, { tone: hot ? "risk" : "plain" }); }));
  // Terminal for worst path
  s += link(900, 571, 1040, 571, { accent: true, w: 4 });
  s += col(1040, 540, 300, 62, "No retry offered", "38% churn · target this path", { tone: "risk" });
  s += link(1340, 571, 1380, 571, { accent: true, w: 4 }).replace("1380 571", "1376 571");
  // Note
  s += rect(1040, 300, 300, 168, { r: 8, fill: C.riskSoft, stroke: C.risk });
  s += label(1056, 326, "Why it matters", { fill: C.riskText });
  s += text(1056, 354, "Top-up failures churn differently", { size: 14, weight: 700 });
  s += text(1056, 374, "by channel. Mitigation targets", { size: 14, weight: 700 });
  s += text(1056, 394, "the worst path, not every", { size: 14, weight: 700 });
  s += text(1056, 414, "failure equally.", { size: 14, weight: 700 });
  s += text(1056, 446, "IVR failure with no retry: 38%", { size: 12, mono: true, fill: C.riskText });
  return doc({ w: 1440, h: 720, id, title: "Journey exploration", desc: "A branching journey: top-up attempts split by mobile app, SMS and IVR, each into continued or failed paths with their churn rates; the IVR failure with no retry offered is the worst path and is highlighted as the mitigation target.", ground: "warm", grid: false }, s);
}

export function mitigationPlan() {
  use("journey");
  const id = "cj-plan";
  let s = "";
  const X = 64, Y = 56, W = 1072, H = 988;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Customer journeys", { crumbs: ["Top-up revenue", "Mitigation plan"] });
  s += text(X + 40, Y + 108, "Mitigation plan · Top-up revenue", { size: 26, weight: 700, family: F.display });
  s += chip(X + 40 + tw("Mitigation plan · Top-up revenue", 26) + 16, Y + 88, "At risk · −5.2%", { fill: C.riskSoft, color: C.riskText, size: 12, h: 26 }).svg;
  // Drivers
  s += label(X + 40, Y + 160, "Key drivers · from the model");
  const drivers = [["Top-up failure via IVR, no retry offered", 0.38], ["Card declined, no alternative payment", 0.27], ["App session abandoned at PIN entry", 0.19], ["Other", 0.16]];
  drivers.forEach(([d, v], i) => { const y = Y + 192 + i * 42; s += text(X + 40, y + 5, d, { size: 15, weight: i === 0 ? 700 : 400 }); s += rect(X + 520, y - 8, 380, 16, { r: 8, fill: C.muted }) + rect(X + 520, y - 8, 380 * v, 16, { r: 8, fill: i === 0 ? C.accent : C.data }); s += text(X + W - 40, y + 5, Math.round(v * 100) + "%", { size: 14, mono: true, anchor: "end", fill: C.textMuted }); });
  s += `<path d="M${X + 40} ${Y + 372}H${X + W - 40}" stroke="${C.border}"/>`;
  // Offer builder
  s += label(X + 40, Y + 404, "Personalised offer · drafted by the assistant, edited by you", { fill: C.accent });
  const half = (W - 80 - 24) / 2;
  s += text(X + 40, Y + 440, "Audience", { size: 13, weight: 600, fill: C.textMuted });
  s += field(X + 40, Y + 452, half, { value: "IVR top-up failures in the last 7 days · 1,240 customers" });
  s += text(X + 40 + half + 24, Y + 440, "Incentive", { size: 13, weight: 600, fill: C.textMuted });
  s += field(X + 40 + half + 24, Y + 452, half, { value: "5-day top-up credit · single use · within policy" });
  s += text(X + 40, Y + 528, "Tone", { size: 13, weight: 600, fill: C.textMuted });
  let cx = X + 40; ["Neutral", "Warm", "Direct", "Apologetic"].forEach((t, i) => { const c = chip(cx, Y + 540, t, { fill: i === 1 ? C.dark : C.white, color: i === 1 ? C.white : C.text, stroke: i === 1 ? C.dark : C.border, size: 13, h: 28 }); s += c.svg; cx += c.w + 8; });
  s += text(X + 40 + half + 24, Y + 528, "Channel", { size: 13, weight: 600, fill: C.textMuted });
  cx = X + 40 + half + 24; ["SMS", "App push", "Email"].forEach((t, i) => { const c = chip(cx, Y + 540, t, { fill: i === 0 ? C.dark : C.white, color: i === 0 ? C.white : C.text, stroke: i === 0 ? C.dark : C.border, size: 13, h: 28 }); s += c.svg; cx += c.w + 8; });
  // Preview
  s += rect(X + 40, Y + 596, W - 80, 220, { r: 10, fill: C.ground, stroke: C.border });
  s += label(X + 60, Y + 624, "Message preview · SMS · 2 of 3 variants");
  s += rect(X + 60, Y + 642, 520, 130, { r: 14, fill: C.white, stroke: C.border });
  s += paragraph(X + 80, Y + 668, 480, 4, { gap: 20, h: 9, fill: C.dataSoft, widths: [0.96, 0.9, 0.98, 0.42] });
  s += text(X + 80, Y + 760, "Credit applied on your next top-up · reply STOP to opt out", { size: 12, fill: C.textMuted, mono: true });
  s += text(X + 620, Y + 668, "Reads warm, names the failure, offers one thing.", { size: 14, weight: 600 });
  s += text(X + 620, Y + 692, "Edited: removed the second offer, shortened the opener.", { size: 13, fill: C.textMuted });
  s += check(X + 620, Y + 732, "Within incentive policy", "done", { size: 13 });
  s += check(X + 620, Y + 762, "A person has edited it", "done", { size: 13 });
  s += check(X + 620, Y + 792, "Reviewed before launch", "pending", { size: 13 });
  // Footer actions
  s += button(X + 40, Y + H - 96, "Send for review", { primary: true, h: 44, size: 15 }).svg;
  s += button(X + 40 + 172, Y + H - 96, "Save draft", { primary: false, h: 44, size: 15 }).svg;
  s += text(X + W - 40, Y + H - 68, "Launches only after a named reviewer approves it", { size: 12, fill: C.textMuted, anchor: "end", mono: true });
  return doc({ w: 1200, h: 1100, id, title: "Mitigation plan", desc: "A mitigation plan for an at-risk KPI: the model's key drivers ranked, then an offer builder with audience, incentive, tone and channel controls, an assistant-drafted message preview a person has edited, and a Send for review action.", grid: false }, s);
}

export function representativeChat() {
  use("journey");
  const id = "cj-chat";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Representative console", { crumbs: ["Live chat", "Customer 48213"] });
  // Left: conversation
  const LW = 700;
  s += rect(X, Y + 52, LW, H - 52, { r: 0, fill: C.ground });
  s += `<path d="M${X + LW} ${Y + 52}V${Y + H}" stroke="${C.border}"/>`;
  s += text(X + 32, Y + 92, "Customer · prepaid, 3 years", { size: 14, weight: 600 });
  s += chip(X + 32 + tw("Customer · prepaid, 3 years", 14) + 12, Y + 76, "At risk", { fill: C.riskSoft, color: C.riskText, size: 11, h: 22 }).svg;
  const bubbles = [["c", 3, 0.7], ["r", 2, 0.5], ["c", 4, 0.78], ["c", 1, 0.32], ["r", 3, 0.62]];
  let by = Y + 120;
  bubbles.forEach(([who, n, w]) => {
    const bw = (LW - 64) * w, bh = 20 + n * 18;
    const bx = who === "c" ? X + 32 : X + LW - 32 - bw;
    s += rect(bx, by, bw, bh, { r: 12, fill: who === "c" ? C.white : C.ink, stroke: who === "c" ? C.border : C.ink });
    s += paragraph(bx + 16, by + 14, bw - 32, n, { gap: 18, h: 8, fill: who === "c" ? C.border : C.darkLine, widths: [1, 0.86, 0.94, 0.5] });
    by += bh + 14;
  });
  // Composer with suggestion
  s += rect(X + 32, Y + H - 118, LW - 64, 86, { r: 10, fill: C.white, stroke: C.dark, sw: 1.2 });
  s += rect(X + 44, Y + H - 106, 160, 22, { r: 11, fill: C.accentTint });
  s += text(X + 124, Y + H - 91, "Suggested reply · edit", { size: 11, weight: 600, fill: C.accent, anchor: "middle", mono: true });
  s += paragraph(X + 44, Y + H - 74, LW - 200, 2, { gap: 16, h: 8, fill: C.dataSoft, widths: [1, 0.6] });
  s += button(X + LW - 32 - 84, Y + H - 82, "Send", { primary: true, w: 84, h: 34, size: 13 }).svg;
  // Right: AI summary panel
  const RX = X + LW + 32, RW = W - LW - 64;
  s += label(RX, Y + 92, "Assistant · summary of this customer", { fill: C.accent });
  s += text(RX, Y + 124, "Two failed IVR top-ups this week, then a call.", { size: 17, weight: 700, family: F.display });
  s += paragraph(RX, Y + 146, RW, 4, { gap: 18, widths: [1, 0.92, 0.96, 0.58] });
  s += rect(RX, Y + 240, RW, 200, { r: 10, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(RX + 16, Y + 266, "Suggested course of action");
  s += text(RX + 16, Y + 296, "Offer the 5-day top-up credit", { size: 15, weight: 700 });
  s += text(RX + 16, Y + 318, "Within policy · retention offer, single use", { size: 12, fill: C.textMuted, mono: true });
  s += check(RX + 16, Y + 356, "Eligible: no credit in the last 90 days", "done", { size: 13 });
  s += check(RX + 16, Y + 386, "Representative decides", "pending", { size: 13 });
  s += button(RX + 16, Y + 402, "Apply offer", { primary: true, h: 30, size: 12 }).svg;
  s += button(RX + 16 + 116, Y + 402, "Dismiss", { primary: false, h: 30, size: 12 }).svg;
  s += label(RX, Y + 484, "Why this suggestion");
  const why = [["IVR top-up failed", "Tue, Thu"], ["Card declined", "Thu"], ["Tenure", "3 years"], ["Churn score", "0.71 · high"]];
  why.forEach(([k, v], i) => { const y = Y + 512 + i * 36; s += text(RX, y, k, { size: 13, fill: C.textMuted }); s += text(RX + RW, y, v, { size: 13, weight: 600, anchor: "end", mono: true }); s += `<path d="M${RX} ${y + 12}H${RX + RW}" stroke="${C.border}"/>`; });
  s += text(RX, Y + H - 40, "Assistance in view. The representative stays in control.", { size: 12, fill: C.textMuted, mono: true });
  return doc({ w: 1440, h: 900, id, title: "Representative console", desc: "A representative's live chat with an assistant panel beside it: a summary of the customer's recent failed top-ups, a suggested offer the representative can apply or dismiss, the reasons behind the suggestion, and a suggested reply in the composer to edit before sending.", grid: false }, s);
}

/* ------------------------------------------------------------------ */
/* Added 2026-09-19, second pass: a plate for every decision that had   */
/* none. Finance Cloud gets three, the billing workflow one, Document   */
/* AI two, the Customer Journey one.                                    */
/* ------------------------------------------------------------------ */

export function promotionGate() {
  use("finance");
  const id = "fc-gate";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Finance Cloud", { crumbs: ["Analyses", "Promote to production"] });
  // Two environments
  const colW = (W - 80 - 24) / 2;
  const env = (x, title, sub, tone) => {
    s += rect(x, Y + 84, colW, 300, { r: 10, fill: tone === "prod" ? C.dark : C.ground, stroke: tone === "prod" ? C.dark : C.border });
    s += label(x + 20, Y + 112, title, { fill: tone === "prod" ? C.accentMid : C.textMuted });
    s += text(x + 20, Y + 140, sub, { size: 16, weight: 700, fill: tone === "prod" ? C.white : C.text });
    for (let i = 0; i < 4; i++) {
      const ry = Y + 168 + i * 50;
      s += rect(x + 20, ry, colW - 40, 40, { r: 6, fill: tone === "prod" ? C.darkLine : C.white, stroke: tone === "prod" ? C.darkLine : C.border });
      s += greek(x + 34, ry + 16, 160 - i * 20, { fill: tone === "prod" ? "#55627a" : C.greek });
      const c = chip(x + colW - 40 - 96, ry + 9, tone === "prod" ? "Governed" : i === 0 ? "Promoting" : "Draft", { fill: tone === "prod" ? C.okSoft : i === 0 ? C.accentTint : C.muted, color: tone === "prod" ? C.ok : i === 0 ? C.accent : C.textMuted, size: 11, h: 22 });
      s += c.svg;
    }
  };
  env(X + 40, "Experimentation · sandbox data", "Accruals variance · draft 3", "exp");
  env(X + 40 + colW + 24, "Production · governed", "Published analyses", "prod");
  // Arrow between
  s += `<path d="M${X + 40 + colW - 4} ${Y + 234}H${X + 40 + colW + 28}" stroke="${C.accent}" stroke-width="2" marker-end="url(#${id}-arrow-m)"/>`;
  // Gate panel
  const GY = Y + 412;
  s += rect(X + 40, GY, W - 80, 300, { r: 10, fill: C.white, stroke: C.accent, sw: 1.5 });
  s += label(X + 60, GY + 30, "Promotion gate · what must be true", { fill: C.accent });
  s += text(X + 60, GY + 60, "Promotion is an explicit, reviewable event. A blocked one names what is missing.", { size: 15, weight: 600 });
  const checks = [["Data lineage recorded for every input", "done"], ["Reviewer approval · Controller, cost accounting", "done"], ["Confidence above the production threshold", "done"], ["Access policy applied to the published analysis", "pending"], ["Change logged to the audit trail", "todo"]];
  checks.forEach(([t, st], i) => { s += check(X + 60, GY + 104 + i * 32, t, st, { size: 14 }); });
  // Blocked notice
  s += rect(X + 660, GY + 84, W - 80 - 640, 130, { r: 8, fill: C.warnSoft, stroke: C.warn });
  s += label(X + 680, GY + 110, "Blocked · one control unmet", { fill: C.warn });
  s += text(X + 680, GY + 138, "Access policy not applied.", { size: 15, weight: 700 });
  s += text(X + 680, GY + 160, "Request it from the workspace admin. The draft stays in", { size: 13, fill: C.textMuted });
  s += text(X + 680, GY + 178, "experimentation until this passes; nothing is lost.", { size: 13, fill: C.textMuted });
  const b = button(X + 660, GY + 236, "Promote to production", { primary: true, w: 220 }); s += b.svg.replace(`fill="${C.accent}"`, `fill="${C.accentMid}"`).replace(`stroke="${C.accent}"`, `stroke="${C.accentMid}"`);
  s += text(X + 660 + 232, GY + 260, "Disabled until every control passes", { size: 12, fill: C.textMuted, mono: true });
  return doc({ w: 1440, h: 900, id, title: "The promotion gate", desc: "Experimentation on the left, governed production on the right, and between them a promotion gate: a checklist of lineage, reviewer approval, confidence threshold, access policy and audit log. One control is unmet and the notice names it, so a blocked promotion reads as a rule, not a bug.", grid: false }, s);
}

export function copilotPlan() {
  use("finance");
  const id = "fc-plan";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Finance Cloud", { crumbs: ["Month-end close", "Accruals · September"] });
  // Left: the task the copilot lives inside
  const LW = 760;
  s += text(X + 40, Y + 100, "Accruals · September close", { size: 22, weight: 700, family: F.display });
  s += chip(X + 40 + tw("Accruals · September close", 22) + 14, Y + 82, "Step 3 of 6", { fill: C.muted, color: C.textMuted, size: 11, h: 22 }).svg;
  s += table(X + 40, Y + 124, [{ label: "Cost centre", w: 130 }, { label: "Vendor", w: 220 }, { label: "Accrual", w: 130, align: "right" }, { label: "Basis", w: 160 }, { label: "State", w: 80 }],
    [["CC-220", { greek: 150 }, { num: "48,200.00" }, "PO · received", { status: "Approved" }], ["CC-220", { greek: 120 }, { num: "12,750.00" }, "Estimate", { status: "Review" }], ["CC-230", { greek: 170 }, { num: "9,310.00" }, "PO · received", { status: "Approved" }], ["CC-310", { greek: 110 }, { num: "3,400.00" }, "Estimate", { status: "Initiated" }], ["CC-400", { greek: 140 }, { num: "6,900.00" }, "Contract", { status: "Approved" }]], { rowH: 42, headH: 34 });
  s += text(X + 40, Y + 400, "Accrual candidates from the ledger, purchase orders and open contracts. Nothing posts from this screen.", { size: 12, fill: C.textMuted, mono: true });
  // Right: copilot panel with four stages
  const PX = X + LW + 40, PW = W - LW - 80, PY = Y + 84;
  s += rect(PX, PY, PW, H - 116, { r: 10, fill: C.ground, stroke: C.border });
  s += label(PX + 20, PY + 28, "Copilot · scoped to this close task", { fill: C.accent });
  const stage = (i, name, y, body, state) => {
    const done = state === "done", cur = state === "current";
    s += `<circle cx="${PX + 30}" cy="${y}" r="11" fill="${done ? C.ok : cur ? C.accent : C.white}" stroke="${done ? C.ok : cur ? C.accent : C.border}" stroke-width="2"/>`;
    s += text(PX + 30, y + 4, String(i), { size: 11, weight: 700, fill: done || cur ? C.white : C.textMuted, mono: true, anchor: "middle" });
    s += text(PX + 52, y + 5, name, { size: 14, weight: 700, fill: cur ? C.accent : C.text });
    body(y + 22);
  };
  stage(1, "Understand", PY + 62, (y) => { s += rect(PX + 52, y, PW - 72, 54, { r: 8, fill: C.white, stroke: C.border }); s += text(PX + 66, y + 22, "I read this as: accrue September vendor costs", { size: 13 }); s += text(PX + 66, y + 40, "received but not yet invoiced, for CC-220 to CC-400.", { size: 13 }); }, "done");
  stage(2, "Clarify", PY + 158, (y) => { s += rect(PX + 52, y, PW - 72, 74, { r: 8, fill: C.white, stroke: C.border }); s += text(PX + 66, y + 22, "Two estimates have no PO. Include them?", { size: 13, weight: 600 }); let cx = PX + 66; ["Include, flag for review", "Exclude"].forEach((t, k) => { const c = chip(cx, y + 36, t, { fill: k === 0 ? C.accent : C.white, color: k === 0 ? C.white : C.text, stroke: k === 0 ? C.accent : C.border, size: 12, h: 26 }); s += c.svg; cx += c.w + 8; }); }, "done");
  stage(3, "Confirm", PY + 274, (y) => { s += rect(PX + 52, y, PW - 72, 50, { r: 8, fill: C.accentSubtle, stroke: C.accentMid }); s += text(PX + 66, y + 22, "5 accruals · 80,560.00 · 2 flagged for review", { size: 13, weight: 600 }); s += text(PX + 66, y + 40, "Confirmed by you, 10:42", { size: 12, fill: C.textMuted, mono: true }); }, "done");
  stage(4, "Plan", PY + 366, (y) => {
    const steps = [["Draft 5 accrual journal entries", "done"], ["Attach PO and contract references", "done"], ["Route 2 flagged estimates to the controller", "current"], ["Post on approval · reversible as a unit", "todo"]];
    steps.forEach(([t, st], k) => { const yy = y + 16 + k * 34; s += check(PX + 60, yy, t, st === "done" ? "done" : st === "current" ? "pending" : "todo", { size: 13 }); });
    const cy = y + 16 + steps.length * 34 + 6;
    let cx = PX + 52; ["Pause", "Resume", "Roll back"].forEach((t, k) => { const b = button(cx, cy, t, { primary: k === 1, h: 30, size: 12 }); s += b.svg; cx += b.w + 8; });
    s += text(PX + 52, cy + 52, "A plan is inspectable; an answer is not.", { size: 12, fill: C.textMuted, mono: true });
  }, "current");
  return doc({ w: 1440, h: 900, id, title: "The copilot plan", desc: "A month-end close task with its accrual candidates, and beside it a copilot panel scoped to that task running four stages: understand, clarify, confirm, then plan. The plan is a checklist of steps with pause, resume and roll back, so wrong assumptions surface before a result does.", grid: false }, s);
}

export function confidenceTiers() {
  use("finance");
  const id = "fc-tiers";
  let s = "";
  s += label(64, 56, "The three-tier boundary · a product decision, not a model default", { fill: C.dataDeep });
  s += text(64, 96, "Where the system acts, recommends, or stops and escalates", { size: 26, weight: 700, family: F.display });
  s += text(64, 122, "Confidence runs left to right. The cut-offs are set with ML engineering; the tiers and what each one may do were set by the product.", { size: 13, fill: C.textMuted });
  const X = 64, Y = 170, W = 1312, H = 220;
  const tiers = [["Stops and escalates", "Low confidence · high consequence", "Nothing happens without a person. The item is routed to a reviewer with the inputs the model used.", C.riskSoft, C.riskText, C.risk], ["Recommends and waits", "Uncertain · reversible", "The system proposes and shows its basis. A person accepts, edits or declines before anything posts.", C.accentTint, C.accentDeep, C.accent], ["Acts on its own", "High confidence · low consequence", "Routine, reversible steps run without a prompt and are logged. Every action is replayable.", C.okSoft, C.ok, C.ok]];
  const tw3 = W / 3;
  tiers.forEach(([t, sub, body, fill, color, edge], i) => {
    const x = X + i * tw3;
    s += rect(x, Y, tw3, H, { r: 0, fill, stroke: C.white, sw: 3 });
    s += rect(x, Y, tw3, 8, { r: 0, fill: edge });
    s += text(x + 24, Y + 52, t, { size: 20, weight: 800, family: F.display, fill: color });
    s += text(x + 24, Y + 78, sub, { size: 12, fill: color, mono: true });
    const words = body.split(" "); let line = "", ly = Y + 112;
    for (const w of words) { if (tw(line + " " + w, 14) > tw3 - 48) { s += text(x + 24, ly, line, { size: 14, fill: C.text }); line = w; ly += 22; } else line = line ? line + " " + w : w; }
    s += text(x + 24, ly, line, { size: 14, fill: C.text });
  });
  // Axis
  s += `<path d="M${X} ${Y + H + 28}H${X + W - 12}" stroke="${C.dataDeep}" stroke-width="1.5" marker-end="url(#${id}-arrow)"/>`;
  s += label(X, Y + H + 54, "Model confidence, rising", { fill: C.dataDeep });
  s += label(X + W, Y + H + 54, "Consequence, falling", { fill: C.dataDeep, anchor: "end" });
  // Cut-off markers
  [tw3, 2 * tw3].forEach((dx, i) => { s += `<path d="M${X + dx} ${Y - 14}V${Y + H + 14}" stroke="${C.dark}" stroke-width="1.5" stroke-dasharray="4 4"/>`; s += rect(X + dx - 74, Y - 40, 148, 24, { r: 12, fill: C.dark }); s += text(X + dx, Y - 24, i === 0 ? "Cut-off A · pending" : "Cut-off B · pending", { size: 11, weight: 600, fill: C.white, mono: true, anchor: "middle" }); });
  // Examples row
  const EY = Y + H + 96;
  s += label(X, EY, "Worked examples · accruals");
  const ex = [["Vendor accrual with no PO and a new supplier", 0], ["Estimate within 5% of last month, PO received", 1], ["Reverse last month’s accrual on invoice match", 2]];
  ex.forEach(([t, tier], i) => { const y = EY + 30 + i * 40; s += `<circle cx="${X + 10}" cy="${y - 5}" r="6" fill="${[C.risk, C.accent, C.ok][tier]}"/>`; s += text(X + 28, y, t, { size: 14 }); s += text(X + 620, y, ["Stops and escalates", "Recommends and waits", "Acts on its own"][tier], { size: 13, weight: 600, fill: [C.riskText, C.accentDeep, C.ok][tier] }); });
  // Success definition
  s += rect(X + 860, EY - 6, 452, 150, { r: 10, fill: C.white, stroke: C.dark, sw: 1.2 });
  s += label(X + 880, EY + 20, "Success, as defined");
  s += text(X + 880, EY + 52, "Analyst behaviour within 72 hours,", { size: 16, weight: 700 });
  s += text(X + 880, EY + 74, "not forecast precision.", { size: 16, weight: 700 });
  s += text(X + 880, EY + 104, "Did the analyst act on, edit, or dismiss the", { size: 13, fill: C.textMuted });
  s += text(X + 880, EY + 122, "recommendation, and how quickly.", { size: 13, fill: C.textMuted });
  return doc({ w: 1440, h: 640, id, title: "The three-tier boundary", desc: "Three tiers across rising model confidence and falling consequence: stops and escalates, recommends and waits, acts on its own. The two cut-offs between them are marked pending, to be set with ML engineering. Below, three worked accrual examples placed in their tiers and the success definition: analyst behaviour within 72 hours, not forecast precision.", ground: "warm", grid: false }, s);
}

export function progressiveValidation() {
  use("billing");
  const id = "bw-valid";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Billing packages", { crumbs: ["New package", "Step 2 · Projects and evidence"] });
  s += text(X + 40, Y + 104, "Projects and evidence", { size: 24, weight: 700, family: F.display });
  s += stepper(X + 44, Y + 150, ["Identify", "Projects", "Evidence", "Review", "Submit"], 1, { w: 560 });
  // Preserved-progress banner
  s += rect(X + 40, Y + 208, W - 80, 64, { r: 8, fill: C.warnSoft, stroke: C.warn });
  s += `<circle cx="${X + 68}" cy="${Y + 240}" r="10" fill="${C.warn}"/>` + text(X + 68, Y + 245, "!", { size: 13, weight: 700, fill: C.white, anchor: "middle" });
  s += text(X + 92, Y + 235, "Screenshot generation failed for project 48213-03. Your progress is saved.", { size: 14, weight: 700 });
  s += text(X + 92, Y + 255, "The feeder system did not respond. Retry now, or continue and retry before submission.", { size: 13, fill: C.textMuted });
  s += button(X + W - 40 - 96, Y + 221, "Retry", { primary: true, w: 96, h: 36, size: 13 }).svg;
  // Project rows with inline validation
  const rows = [["48213-01", "Resolved · 3 screenshots attached", "ok"], ["48213-02", "Resolved · 2 screenshots attached", "ok"], ["48213-03", "Evidence pending · retry available", "warn"], ["48214", "Project number not found in the feeder system", "error"]];
  rows.forEach(([n, msg, st], i) => {
    const y = Y + 300 + i * 78;
    const stroke = st === "error" ? C.risk : st === "warn" ? C.warn : C.border;
    s += rect(X + 40, y, W - 80, 62, { r: 8, fill: C.white, stroke, sw: st === "ok" ? 1 : 1.5 });
    s += field(X + 56, y + 11, 200, { value: n, h: 40 });
    const ic = st === "ok" ? C.ok : st === "warn" ? C.warn : C.risk;
    s += `<circle cx="${X + 286}" cy="${y + 31}" r="9" fill="${ic}"/>`;
    s += st === "ok" ? `<path d="M${X + 282} ${y + 31}l3 3 5-6" fill="none" stroke="${C.white}" stroke-width="1.8"/>` : text(X + 286, y + 36, "!", { size: 12, weight: 700, fill: C.white, anchor: "middle" });
    s += text(X + 306, y + 36, msg, { size: 14, weight: st === "ok" ? 400 : 600, fill: st === "error" ? C.riskText : C.text });
    if (st === "error") { s += text(X + 306 + tw(msg, 14) * 1.02 + 16, y + 36, "Check the number, or search by contract", { size: 13, weight: 600, fill: C.accent }); }
    if (st !== "error") s += text(X + W - 56, y + 36, st === "ok" ? "View evidence" : "Retry lookup", { size: 13, weight: 600, fill: C.accent, anchor: "end" });
  });
  // Completeness review
  const CY = Y + 628;
  s += rect(X + 40, CY, W - 80, 118, { r: 8, fill: C.ground, stroke: C.border });
  s += label(X + 60, CY + 28, "Completeness review · runs before submission, not after");
  const items = [["4 projects identified", "done"], ["3 of 4 with evidence", "pending"], ["1 project number unresolved", "todo"], ["Invoice categories complete", "done"]];
  items.forEach(([t, st], i) => { s += check(X + 60 + i * 300, CY + 66, t, st, { size: 13 }); });
  s += text(X + 60, CY + 98, "Missing data surfaces as you move. Nothing is discovered at submission.", { size: 12, fill: C.textMuted, mono: true });
  return doc({ w: 1440, h: 900, id, title: "Progressive validation", desc: "Step two of creating a billing package: a banner says screenshot generation failed for one project and progress is saved, with a Retry action; four project rows validate inline, one with evidence pending and one whose project number was not found; and a completeness review below runs before submission.", grid: false }, s);
}

export function draftExport() {
  use("document");
  const id = "da-draft";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Document workspace", { crumbs: ["Policy set · 12 documents", "Draft · Access controls memo"] });
  // Left: chat stays beside
  const LW = 420;
  s += rect(X, Y + 52, LW, H - 52, { r: 0, fill: C.ground });
  s += `<path d="M${X + LW} ${Y + 52}V${Y + H}" stroke="${C.border}"/>`;
  s += label(X + 28, Y + 88, "Conversation · still beside the draft");
  const turns = [["q", 1, 0.8], ["a", 4, 0.94], ["q", 1, 0.6], ["a", 3, 0.9]];
  let ty = Y + 108;
  turns.forEach(([who, n, w]) => {
    const bw = (LW - 56) * w, bh = 18 + n * 18;
    s += rect(X + 28, ty, bw, bh, { r: 8, fill: who === "q" ? C.white : C.accentSubtle, stroke: who === "q" ? C.border : C.accentMid });
    s += paragraph(X + 42, ty + 13, bw - 28, n, { gap: 18, h: 8, fill: who === "q" ? C.greek : C.accentMid, widths: [1, 0.9, 0.96, 0.5] });
    if (who === "a") { s += `<circle cx="${X + 28 + bw - 16}" cy="${ty + bh - 14}" r="9" fill="${C.accent}"/>` + text(X + 28 + bw - 16, ty + bh - 10, "2", { size: 10, weight: 700, fill: C.white, mono: true, anchor: "middle" }); }
    ty += bh + 12;
  });
  s += rect(X + 28, Y + H - 84, LW - 56, 44, { r: 8, fill: C.white, stroke: C.dark, sw: 1.2 });
  s += text(X + 44, Y + H - 57, "Ask about the draft or the documents", { size: 13, fill: C.textMuted });
  // Right: focus-mode draft
  const DX = X + LW + 40, DW = W - LW - 80;
  s += text(DX, Y + 100, "Access controls for shared regional accounts", { size: 20, weight: 700, family: F.display });
  s += chip(DX, Y + 114, "Draft · v3", { fill: C.muted, color: C.textMuted, size: 11, h: 22 }).svg;
  s += chip(DX + 92, Y + 114, "4 citations carried", { fill: C.accentTint, color: C.accentDeep, size: 11, h: 22 }).svg;
  s += rect(DX, Y + 156, DW, 470, { r: 8, fill: C.white, stroke: C.border });
  // Draft body: headings + greeked paragraphs with citation marks
  let dy = Y + 190;
  const para = (title, n, cite) => {
    s += text(DX + 28, dy, title, { size: 14, weight: 700 }); dy += 18;
    s += paragraph(DX + 28, dy, DW - 56, n, { gap: 18, widths: [1, 0.94, 0.98, 0.7] });
    if (cite) { const cx = DX + 28 + (DW - 56) * 0.7 + 14; const cy = dy + (n - 1) * 18 + 4; s += `<circle cx="${cx}" cy="${cy}" r="9" fill="${C.accent}"/>` + text(cx, cy + 4, cite, { size: 10, weight: 700, fill: C.white, mono: true, anchor: "middle" }); }
    dy += n * 18 + 24;
  };
  para("1. Scope", 3, "1"); para("2. Required controls", 4, "2"); para("3. Exceptions and approvals", 4, "3"); para("4. Effective date", 2, "4");
  // Export bar
  s += rect(DX, Y + 646, DW, 88, { r: 8, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(DX + 20, Y + 672, "Export to the system of record", { fill: C.accentDeep });
  s += text(DX + 20, Y + 700, "Versioned Word file · citations kept as footnotes · saved to the policy library", { size: 13 });
  s += button(DX + DW - 20 - 150, Y + 668, "Export as .docx", { primary: true, w: 150 }).svg;
  return doc({ w: 1440, h: 900, id, title: "Draft beside the conversation", desc: "A focus-mode draft on the right with numbered sections, each carrying a citation mark, and the conversation still open on the left. An export bar writes a versioned Word file with the citations kept as footnotes into the enterprise document store.", grid: false }, s);
}

export function complianceWidget() {
  use("document");
  const id = "da-widget";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  // Host product, dimmed
  s += card(id, X, Y, W, H, { r: 12, fill: C.ground });
  s += chrome(X, Y, W, "Risk and compliance portal", { crumbs: ["Regulatory risk", "Regional accounts"] });
  s += rect(X, Y + 52, 72, H - 52, { r: 0, fill: C.muted });
  for (let i = 0; i < 6; i++) s += rect(X + 24, Y + 84 + i * 48, 24, 24, { r: 6, fill: i === 2 ? C.accent : C.border });
  s += text(X + 104, Y + 100, "Regulatory risk · shared regional accounts", { size: 20, weight: 700, family: F.display, fill: C.textMuted });
  s += paragraph(X + 104, Y + 118, 520, 2, { gap: 16, widths: [1, 0.6] });
  // The widget
  const WX = X + 104, WY = Y + 172, WW = W - 144, WH = H - 212;
  s += rect(WX, WY, WW, WH, { r: 10, fill: C.white, stroke: C.accent, sw: 2 });
  s += rect(WX, WY, WW, 44, { r: 10, fill: C.accent }); s += rect(WX, WY + 30, WW, 14, { r: 0, fill: C.accent });
  s += text(WX + 20, WY + 28, "Compliance check", { size: 14, weight: 700, fill: C.white, family: F.display });
  s += text(WX + WW - 20, WY + 28, "WIDGET · RIDES THE SHARED RAILS", { size: 11, weight: 600, fill: C.accentTint, mono: true, anchor: "end", ls: 1.2 });
  // Filtering layer (its own)
  s += rect(WX + 20, WY + 64, WW - 40, 84, { r: 8, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(WX + 36, WY + 88, "Its own layer · regulatory filters", { fill: C.accentDeep });
  let fx = WX + 36; [["Regulation", "Regional data rules"], ["Region", "EU · 4 markets"], ["Effective", "This year"], ["Risk tier", "High"]].forEach(([k, v]) => { s += text(fx, WY + 112, k, { size: 11, weight: 600, fill: C.textMuted }); s += field(fx, WY + 118, 200, { value: v, h: 24 }); fx += 220; });
  // Shared rails, labelled
  const rails = [["Document selection", "Chips, 2 to 10, editable until submission"], ["Search", "Same index, same ranking"], ["Comparison", "Count-bound: diff or table"], ["Citations", "Every statement traceable"], ["Response template", "Finding · basis · action"]];
  const RY = WY + 168;
  s += label(WX + 20, RY + 14, "Shared rails · reused, not rebuilt", { fill: C.textMuted });
  const rw = (WW - 40 - 4 * 12) / 5;
  rails.forEach(([t, d], i) => { const rx = WX + 20 + i * (rw + 12); s += rect(rx, RY + 28, rw, 70, { r: 8, fill: C.ground, stroke: C.border }); s += text(rx + 14, RY + 54, t, { size: 13, weight: 700 }); s += text(rx + 14, RY + 74, d.length > 34 ? d.slice(0, 33) + "…" : d, { size: 11, fill: C.textMuted }); s += `<circle cx="${rx + rw - 16}" cy="${RY + 44}" r="6" fill="${C.ok}"/>`; });
  // Result: finding with citations
  const FY = RY + 122;
  s += rect(WX + 20, FY, WW - 40, WH - (FY - WY) - 20, { r: 8, fill: C.white, stroke: C.border });
  s += label(WX + 36, FY + 26, "Finding · 3 sources · selection: 5 documents");
  s += text(WX + 36, FY + 56, "Two regional accounts lack the required approval step.", { size: 16, weight: 700 });
  s += paragraph(WX + 36, FY + 74, 640, 3, { gap: 18, widths: [0.98, 0.9, 0.5] });
  [1, 2, 3].forEach((n, i) => { s += `<circle cx="${WX + 36 + 640 * 0.5 + 24 + i * 26}" cy="${FY + 74 + 2 * 18 + 4}" r="9" fill="${C.accent}"/>` + text(WX + 36 + 640 * 0.5 + 24 + i * 26, FY + 74 + 2 * 18 + 8, n, { size: 10, weight: 700, fill: C.white, mono: true, anchor: "middle" }); });
  s += rect(WX + 720, FY + 20, WW - 40 - 720 + 20 - 20, 96, { r: 8, fill: C.warnSoft, stroke: C.warn });
  s += label(WX + 736, FY + 44, "Action", { fill: C.warn });
  s += text(WX + 736, FY + 70, "Route to the account owner for approval.", { size: 14, weight: 600 });
  s += text(WX + 736, FY + 92, "Basis: citations 1 and 3 · governed selection", { size: 12, fill: C.textMuted, mono: true });
  s += text(WX + 36, FY + WH - (FY - WY) - 40, "A standalone dashboard would have rebuilt governed selection and traceable answers, and their failure modes.", { size: 12, fill: C.textMuted, mono: true });
  return doc({ w: 1440, h: 900, id, title: "The widget on shared rails", desc: "A compliance-check widget embedded in a risk portal: its own regulatory filter layer on top, then five shared rails it reuses from the platform, document selection, search, comparison, citations and the response template, and a finding with numbered citations and a routed action.", grid: false }, s);
}

export function dynamicSegments() {
  use("journey");
  const id = "cj-seg";
  let s = "";
  const X = 64, Y = 56, W = 1312, H = 788;
  s += card(id, X, Y, W, H, { r: 12 });
  s += chrome(X, Y, W, "Customer journeys", { crumbs: ["Segments", "IVR top-up failures"] });
  s += text(X + 40, Y + 104, "Segment · built from churn-risk criteria", { size: 24, weight: 700, family: F.display });
  s += chip(X + 40 + tw("Segment · built from churn-risk criteria", 24) + 14, Y + 86, "Live · refreshed hourly", { fill: C.okSoft, color: C.ok, size: 11, h: 24 }).svg;
  // Criteria builder
  const crit = [["Issue", "Top-up failed", "in the last 7 days"], ["Behaviour", "2 or more IVR attempts", "then no successful top-up"], ["Likelihood to churn", "Model score above 0.60", "high-confidence tier only"], ["Exclude", "Offered a credit", "in the last 90 days"]];
  crit.forEach(([k, v, q], i) => {
    const y = Y + 150 + i * 70;
    s += rect(X + 40, y, 760, 56, { r: 8, fill: C.white, stroke: C.border });
    s += `<rect x="${X + 40}" y="${y}" width="6" height="56" rx="3" fill="${i === 3 ? C.textMuted : C.accent}"/>`;
    s += label(X + 64, y + 22, k, { fill: i === 3 ? C.textMuted : C.accent });
    s += text(X + 64, y + 44, v, { size: 15, weight: 700 });
    s += text(X + 330, y + 44, q, { size: 13, fill: C.textMuted });
    s += text(X + 40 + 760 - 16, y + 36, i === 0 ? "" : "and", { size: 12, fill: C.textMuted, mono: true, anchor: "end" });
  });
  s += button(X + 40, Y + 438, "Add a criterion", { primary: false, h: 34, size: 13 }).svg;
  // Live count panel
  const PX = X + 840, PW = W - 40 - 840 + 0, PY = Y + 150;
  s += rect(PX, PY, PW - 0, 336, { r: 10, fill: C.ground, stroke: C.border });
  s += label(PX + 24, PY + 30, "Customers matching now");
  s += text(PX + 24, PY + 90, "1,240", { size: 56, weight: 800, family: F.display, fill: C.accent });
  s += text(PX + 24, PY + 116, "From journey data, not a snapshot. Was 1,310 an hour ago.", { size: 12, fill: C.textMuted });
  s += label(PX + 24, PY + 156, "Churn likelihood in this segment");
  s += bars(PX + 24, PY + 170, PW - 48, 90, [0.15, 0.3, 0.55, 0.8, 1, 0.7, 0.4], { accent: 4, gap: 8, labels: ["0.6", "", "0.7", "", "0.8", "", "0.9"] });
  s += text(PX + 24, PY + 300, "Peak at 0.8 · the IVR path", { size: 12, fill: C.textMuted, mono: true });
  // Footer: how it feeds the plan
  const FY = Y + 520;
  s += rect(X + 40, FY, W - 80, 200, { r: 10, fill: C.accentSubtle, stroke: C.accentMid });
  s += label(X + 60, FY + 30, "Where the segment goes", { fill: C.accentDeep });
  const flow = [["Journey data", "Every top-up attempt, by channel"], ["Segment", "1,240 customers, recomputed hourly"], ["Mitigation plan", "Drivers and one recommended action"], ["What-if", "Test the offer before it runs"], ["Review", "A person approves the send"]];
  const fw = (W - 120 - 4 * 24) / 5;
  flow.forEach(([t, d], i) => {
    const fx = X + 60 + i * (fw + 24);
    s += rect(fx, FY + 54, fw, 100, { r: 8, fill: i === 1 ? C.accent : C.white, stroke: i === 1 ? C.accent : C.border });
    s += text(fx + 16, FY + 84, t, { size: 14, weight: 700, fill: i === 1 ? C.white : C.text });
    const words = d.split(" "); let line = "", ly = FY + 106;
    for (const w of words) { if (tw(line + " " + w, 12) > fw - 32) { s += text(fx + 16, ly, line, { size: 12, fill: i === 1 ? C.accentTint : C.textMuted }); line = w; ly += 16; } else line = line ? line + " " + w : w; }
    s += text(fx + 16, ly, line, { size: 12, fill: i === 1 ? C.accentTint : C.textMuted });
    if (i < flow.length - 1) s += `<path d="M${fx + fw + 2} ${FY + 104}H${fx + fw + 22}" stroke="${C.accent}" stroke-width="1.6" marker-end="url(#${id}-arrow-m)"/>`;
  });
  return doc({ w: 1440, h: 900, id, title: "Dynamic segments", desc: "A segment builder with four criteria, issue, behaviour, likelihood to churn and an exclusion, beside a live count of matching customers and a churn-likelihood histogram, and below it the path from journey data through segment and mitigation plan to a what-if test and human review.", grid: false }, s);
}
