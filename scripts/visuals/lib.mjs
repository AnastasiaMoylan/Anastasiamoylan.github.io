/**
 * Drawing primitives for the case-study visuals (2026-09-19).
 *
 * Every visual under src/assets/case-studies/ that is not a photograph of
 * a real screen is generated from these: anonymised product schematics in
 * the site's own tokens (theme.css), so the pages carry no client
 * vocabulary and every figure reads as one system. Run
 * `node scripts/visuals/build.mjs` after editing a scene.
 *
 * Coordinates are viewBox units. Text is set in the site's faces with
 * fallbacks; a figure is inlined on the page (`inlineSvg`), so the faces
 * resolve. Minimum label size is 14 at a 1440 viewBox, which is 11px at the
 * 1120px plate column: the site's floor.
 */
/**
 * Two token sets. The SITE tokens (theme.css) paint the plate: the ink
 * ground, the grid, the rose annotations, the governance chain. The PRODUCT
 * tokens paint the client's product inside it. They are different on
 * purpose: the products were built for other companies, so they wear their
 * own cool neutral system and one accent per study, none of them near the
 * site's maroon or teal-green, so the site reads as annotating someone
 * else's product rather than dressing it in its own colours.
 *
 * `use(study)` switches the accent. Every product colour below is checked
 * against white for AA text where it is used as text (accents 4.6:1 and
 * up; risk 4.7:1; ok 5.0:1).
 */
export const SITE = {
  ink: "#283d3b", inkDeep: "#1d2d2b", inkLine: "#3b5350",
  rose: "#dbc9c9", roseMid: "#b69494", champ: "#edddd4", ground: "#f7f5f1", border: "#cfc7bb", muted: "#57514b",
};
export const ACCENTS = {
  finance:  { name: "Cobalt",  accent: "#2457d6", accentDeep: "#1a43ab", accentMid: "#7a9ae8", accentTint: "#dfe7fb", accentSubtle: "#eef2fc" },
  billing:  { name: "Azure",   accent: "#0f7fa3", accentDeep: "#0a5f7a", accentMid: "#6fb4c9", accentTint: "#d9eef4", accentSubtle: "#edf6f9" },
  document: { name: "Violet",  accent: "#6d3fc4", accentDeep: "#53309a", accentMid: "#a98ee0", accentTint: "#e8e0f8", accentSubtle: "#f3eefb" },
  journey:  { name: "Indigo",  accent: "#4348c9", accentDeep: "#33379d", accentMid: "#8e91e0", accentTint: "#e1e2f8", accentSubtle: "#f0f0fb" },
};
export const C = {
  // site (the plate)
  ink: SITE.ink, inkDeep: SITE.inkDeep, inkLine: SITE.inkLine, rose: SITE.rose, roseMid: SITE.roseMid,
  // product neutrals
  white: "#ffffff", ground: "#f3f5f8", muted: "#e9edf2", border: "#d5dbe3", greek: "#dfe4ea",
  text: "#1b2433", textMuted: "#5c6675", dark: "#1b2433", darkLine: "#3a4557",
  // product data and semantics
  data: "#6b7f99", dataSoft: "#dbe2ea", dataDeep: "#46596f",
  ok: "#15803d", okSoft: "#dcf2e3", warn: "#b45309", warnSoft: "#fbeedc", risk: "#c2410c", riskSoft: "#fdebe3", riskText: "#9a3412",
  // accent, set by use()
  ...ACCENTS.finance,
};
export function use(study) { Object.assign(C, ACCENTS[study]); return C; }

export const F = {
  sans: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
  display: "'Archivo', 'Inter', system-ui, sans-serif",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Approximate advance width, for chips and buttons. */
export const tw = (s, size, mono = false) => String(s).length * size * (mono ? 0.62 : 0.56);

export function doc({ w, h, id, title, desc, ground = "ink", grid = true }, body) {
  // "warm" is the champagne plate a drawn diagram sits on (theme.css
  // --secondary), so the figure's ground and the plate's are one colour.
  const bg = ground === "ink" ? C.inkDeep : ground === "white" ? C.white : ground === "warm" ? SITE.champ : C.ground;
  const gridLine = ground === "ink" ? "rgba(237,221,212,0.06)" : "rgba(40,61,59,0.06)";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${esc(title)}</title>
  <desc id="${id}-desc">${esc(desc)}</desc>
  <defs>
    <filter id="${id}-shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity="${ground === "ink" ? 0.45 : 0.14}"/></filter>
    <pattern id="${id}-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="${gridLine}" stroke-width="1"/></pattern>
    <marker id="${id}-arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0L10 4L0 8Z" fill="${C.data}"/></marker>
    <marker id="${id}-arrow-m" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0L10 4L0 8Z" fill="${C.accent}"/></marker>
    <marker id="${id}-arrow-r" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0 0L10 4L0 8Z" fill="${C.rose}"/></marker>
  </defs>
  <rect width="${w}" height="${h}" fill="${bg}"/>
  ${grid ? `<rect width="${w}" height="${h}" fill="url(#${id}-grid)"/>` : ""}
${body}
</svg>
`;
}

export const text = (x, y, s, { size = 15, weight = 400, fill = C.text, mono = false, anchor = "start", ls = 0, italic = false, family } = {}) =>
  `<text x="${x}" y="${y}" font-family="${family ?? (mono ? F.mono : F.sans)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls ? ` letter-spacing="${ls}"` : ""}${italic ? ' font-style="italic"' : ""}>${esc(s)}</text>`;

export const label = (x, y, s, { fill = C.textMuted, size = 12, anchor = "start" } = {}) =>
  text(x, y, String(s).toUpperCase(), { size, weight: 500, fill, mono: true, ls: 1.2, anchor });

export const rect = (x, y, w, h, { r = 6, fill = C.white, stroke, sw = 1, dash, opacity } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : ""}${dash ? ` stroke-dasharray="${dash}"` : ""}${opacity !== undefined ? ` opacity="${opacity}"` : ""}/>`;

/** A product surface: white, hairline, soft shadow. */
export const card = (id, x, y, w, h, { r = 10, fill = C.white, shadow = true } = {}) =>
  rect(x, y, w, h, { r, fill, stroke: C.border, sw: 1 }) .replace("/>", `${shadow ? ` filter="url(#${id}-shadow)"` : ""}/>`);

/** Window chrome: a slim bar with an app name and an account mark. */
export function chrome(x, y, w, name, { crumbs = [] } = {}) {
  let s = rect(x, y, w, 52, { r: 0, fill: C.muted });
  s += `<path d="M${x} ${y + 52}H${x + w}" stroke="${C.border}"/>`;
  s += `<path d="M${x + 24} ${y + 26}l8-8 8 8-8 8z" fill="${C.accent}"/>`;
  s += text(x + 48, y + 31, name, { size: 14, weight: 700, family: F.display, ls: 0.3 });
  let cx = x + 48 + tw(name, 14) * 1.2 + 28;
  for (const c of crumbs) { s += text(cx, y + 31, "/  " + c, { size: 13, fill: C.textMuted }); cx += tw("/  " + c, 13) + 18; }
  s += `<circle cx="${x + w - 30}" cy="${y + 26}" r="12" fill="${C.dataSoft}"/><circle cx="${x + w - 30}" cy="${y + 22}" r="4.5" fill="${C.dataDeep}"/><path d="M${x + w - 39} ${y + 34}a9 6 0 0 1 18 0z" fill="${C.dataDeep}"/>`;
  return s;
}

/** Greeked line: a rounded bar standing for text that carries no meaning. */
export const greek = (x, y, w, { h = 8, fill = C.greek, r = 4 } = {}) => rect(x, y, w, h, { r, fill });
export function paragraph(x, y, w, n, { gap = 16, h = 8, fill = C.greek, widths } = {}) {
  let s = "";
  const ws = widths ?? [1, 0.94, 0.98, 0.88, 0.62];
  for (let i = 0; i < n; i++) s += greek(x, y + i * gap, w * ws[i % ws.length], { h, fill });
  return s;
}

export function chip(x, y, s, { fill = C.accentTint, color = C.text, size = 12, mono = false, h = 24, stroke } = {}) {
  const w = tw(s, size, mono) + 20;
  return { w, svg: rect(x, y, w, h, { r: h / 2, fill, stroke }) + text(x + w / 2, y + h / 2 + size * 0.36, s, { size, weight: 600, fill: color, mono, anchor: "middle" }) };
}

export function button(x, y, s, { primary = true, size = 14, h = 38, w } = {}) {
  const bw = w ?? tw(s, size) + 40;
  const fill = primary ? C.accent : C.white;
  const color = primary ? C.white : C.text;
  return { w: bw, svg: rect(x, y, bw, h, { r: 5, fill, stroke: primary ? C.accent : C.dark, sw: 1.5 }) + text(x + bw / 2, y + h / 2 + size * 0.36, s, { size, weight: 600, fill: color, anchor: "middle" }) };
}

export function field(x, y, w, { label: l, value, placeholder, h = 40, icon } = {}) {
  let s = "";
  if (l) s += text(x, y - 8, l, { size: 12, weight: 600, fill: C.textMuted });
  s += rect(x, y, w, h, { r: 5, fill: C.white, stroke: C.dark, sw: 1.2 });
  if (icon === "search") s += `<circle cx="${x + 18}" cy="${y + h / 2 - 1}" r="6" fill="none" stroke="${C.textMuted}" stroke-width="1.6"/><path d="M${x + 22.5} ${y + h / 2 + 3.5}l4 4" stroke="${C.textMuted}" stroke-width="1.8" stroke-linecap="round"/>`;
  const tx = x + (icon ? 36 : 14);
  if (value) s += text(tx, y + h / 2 + 5, value, { size: 14, weight: 500 });
  else if (placeholder) s += text(tx, y + h / 2 + 5, placeholder, { size: 14, fill: C.textMuted });
  return s;
}

/** Status stepper: six states, the active one maroon, the past ones ink. */
export function stepper(x, y, states, active, { w = 640, size = 12 } = {}) {
  const n = states.length, step = w / (n - 1);
  let s = `<path d="M${x} ${y}H${x + w}" stroke="${C.border}" stroke-width="2"/>`;
  s += `<path d="M${x} ${y}H${x + step * active}" stroke="${C.dark}" stroke-width="2"/>`;
  states.forEach((st, i) => {
    const cx = x + i * step, done = i < active, act = i === active;
    s += `<circle cx="${cx}" cy="${y}" r="${act ? 9 : 6}" fill="${act ? C.accent : done ? C.dark : C.white}" stroke="${act ? C.accent : done ? C.dark : C.border}" stroke-width="2"/>`;
    if (done) s += `<path d="M${cx - 3} ${y}l2 2 4-4" fill="none" stroke="${C.white}" stroke-width="1.6"/>`;
    s += text(cx, y + 26, st, { size, weight: act ? 700 : 500, fill: act ? C.accent : done ? C.text : C.textMuted, anchor: "middle" });
  });
  return s;
}

// Read at call time, not module load: `use(study)` swaps C.accent after this
// module is evaluated, and a table built here once would keep the first accent.
const statusFill = (st) => ({ Initiated: [C.muted, C.textMuted], "In Progress": [C.dataSoft, C.dataDeep], Review: [C.accent, C.white], Approved: [C.accentTint, C.accent], Finalized: [C.ink, C.white], Completed: [C.ink, C.white], Released: [C.dataSoft, C.dataDeep] })[st];
export const statusChip = (x, y, st) => chip(x, y, st, { fill: statusFill(st)?.[0] ?? C.muted, color: statusFill(st)?.[1] ?? C.text, size: 11, h: 22 });

/**
 * A data table. `cols` = [{label, w, align?}], `rows` = arrays of cells; a
 * cell may be a string, {greek: width}, {status}, {num: string} or {svg}.
 */
export function table(x, y, cols, rows, { rowH = 44, headH = 36, size = 13, zebra = false, header = true } = {}) {
  let s = "", cx = x;
  const totalW = cols.reduce((a, c) => a + c.w, 0);
  if (header) {
    s += rect(x, y, totalW, headH, { r: 0, fill: C.muted });
    cols.forEach((c) => { s += label(c.align === "right" ? cx + c.w - 14 : cx + 14, y + headH / 2 + 4, c.label, { size: 11, anchor: c.align === "right" ? "end" : "start" }); cx += c.w; });
    s += `<path d="M${x} ${y + headH}H${x + totalW}" stroke="${C.dark}" stroke-width="1.2"/>`;
  }
  let ry = y + (header ? headH : 0);
  rows.forEach((row, ri) => {
    if (zebra && ri % 2) s += rect(x, ry, totalW, rowH, { r: 0, fill: C.ground });
    cx = x;
    row.forEach((cell, ci) => {
      const c = cols[ci], tx = c.align === "right" ? cx + c.w - 14 : cx + 14, ty = ry + rowH / 2 + size * 0.36;
      if (cell == null) {}
      else if (typeof cell === "string") s += text(tx, ty, cell, { size, weight: c.bold ? 600 : 400, anchor: c.align === "right" ? "end" : "start", fill: c.muted ? C.textMuted : C.text });
      else if (cell.greek) s += greek(cx + 14, ry + rowH / 2 - 4, cell.greek);
      else if (cell.status) s += statusChip(cx + 14, ry + rowH / 2 - 11, cell.status).svg;
      else if (cell.num) s += text(tx, ty, cell.num, { size, mono: true, anchor: "end", weight: cell.bold ? 600 : 400, fill: cell.fill ?? C.text });
      else if (cell.link) s += text(tx, ty, cell.link, { size, weight: 600, fill: C.accent });
      else if (cell.svg) s += cell.svg(cx, ry, c.w, rowH);
      cx += c.w;
    });
    ry += rowH;
    s += `<path d="M${x} ${ry}H${x + totalW}" stroke="${C.border}"/>`;
  });
  return s;
}

/** Numbered pin, the case-study annotation mark, drawn into the figure. */
export const pin = (x, y, n, { fill = C.accent } = {}) =>
  `<circle cx="${x}" cy="${y}" r="14" fill="${fill}" stroke="${C.white}" stroke-width="2"/>` + text(x, y + 5, n, { size: 13, weight: 700, fill: C.white, mono: true, anchor: "middle" });

/** Rose leader line with a mono label, for callouts on ink. */
export function callout(id, x1, y1, x2, y2, s, { anchor = "start", dash = "5 5", width = 0 } = {}) {
  let out = `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${C.rose}" stroke-width="1.4" stroke-dasharray="${dash}"/>`;
  out += `<circle cx="${x1}" cy="${y1}" r="4" fill="${C.rose}"/>`;
  if (s) { const lx = anchor === "end" ? x2 - 10 : x2 + 10; out += text(lx, y2 + 5, s.toUpperCase(), { size: 12, weight: 600, fill: C.rose, mono: true, ls: 1.4, anchor }); }
  return out;
}

/** A rose note on the ground under a panel, with a short tick up to it. */
export const note = (x, y, s, { anchor = "start" } = {}) =>
  `<path d="M${x} ${y - 30}V${y - 12}" stroke="${C.rose}" stroke-width="1.4"/><circle cx="${x}" cy="${y - 30}" r="3.5" fill="${C.rose}"/>` +
  text(anchor === "end" ? x : x + 12, y + 4, s.toUpperCase(), { size: 12, weight: 600, fill: C.rose, mono: true, ls: 1.4, anchor });

/** Sparkline / area line from 0..1 values. */
export function spark(x, y, w, h, vals, { stroke = C.data, area = true, end = true, sw = 2 } = {}) {
  const pts = vals.map((v, i) => [x + (i / (vals.length - 1)) * w, y + h - v * h]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  let s = "";
  if (area) s += `<path d="${d}L${x + w} ${y + h}L${x} ${y + h}Z" fill="${stroke}" fill-opacity="0.14"/>`;
  s += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
  if (end) { const p = pts[pts.length - 1]; s += `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${stroke}" stroke="${C.white}" stroke-width="2"/>`; }
  return s;
}

/** Bars from 0..1 values, one accent index. */
export function bars(x, y, w, h, vals, { accent = -1, gap = 10, fill = C.data, labels } = {}) {
  const bw = (w - gap * (vals.length - 1)) / vals.length;
  let s = `<path d="M${x} ${y + h}H${x + w}" stroke="${C.border}"/>`;
  vals.forEach((v, i) => {
    const bx = x + i * (bw + gap), bh = v * h;
    s += rect(bx, y + h - bh, bw, bh, { r: 3, fill: i === accent ? C.accent : fill });
    if (labels) s += text(bx + bw / 2, y + h + 18, labels[i], { size: 12, fill: C.textMuted, anchor: "middle" });
  });
  return s;
}

/** The governance chain as a small mono strip, for covers. */
export function chain(id, x, y, w, steps, gateIndex) {
  const step = w / (steps.length - 1);
  let s = `<path d="M${x} ${y}H${x + w}" stroke="${C.roseMid}" stroke-width="1.5"/>`;
  steps.forEach((st, i) => {
    const cx = x + i * step, gate = i === gateIndex;
    s += `<circle cx="${cx}" cy="${y}" r="${gate ? 8 : 5}" fill="${gate ? C.rose : C.inkDeep}" stroke="${C.rose}" stroke-width="1.5"/>`;
    s += text(cx, y + 26, st.toUpperCase(), { size: 12, weight: gate ? 700 : 500, fill: gate ? C.rose : C.roseMid, mono: true, ls: 1.4, anchor: i === 0 ? "start" : i === steps.length - 1 ? "end" : "middle" });
  });
  return s;
}

/** Check row: tick or pending mark and a line. */
export function check(x, y, s, state = "done", { size = 14 } = {}) {
  let m = "";
  if (state === "done") m = `<circle cx="${x + 9}" cy="${y - 5}" r="9" fill="${C.ok}"/><path d="M${x + 5} ${y - 5}l3 3 5-6" fill="none" stroke="${C.white}" stroke-width="1.8"/>`;
  else if (state === "pending") m = `<circle cx="${x + 9}" cy="${y - 5}" r="8" fill="${C.white}" stroke="${C.accent}" stroke-width="2"/><circle cx="${x + 9}" cy="${y - 5}" r="3" fill="${C.accent}"/>`;
  else m = `<circle cx="${x + 9}" cy="${y - 5}" r="8" fill="${C.white}" stroke="${C.border}" stroke-width="2"/>`;
  return m + text(x + 28, y, s, { size, weight: state === "pending" ? 600 : 400, fill: state === "todo" ? C.textMuted : C.text });
}

/** Flow node for the review flow. */
export function node(x, y, w, h, s, { kind = "step", sub } = {}) {
  let out = "";
  if (kind === "decision") {
    out += `<path d="M${x + w / 2} ${y}L${x + w} ${y + h / 2}L${x + w / 2} ${y + h}L${x} ${y + h / 2}Z" fill="${C.accentTint}" stroke="${C.dark}" stroke-width="1.4"/>`;
  } else if (kind === "state") {
    out += rect(x, y, w, h, { r: h / 2, fill: C.accent, stroke: C.accent });
  } else if (kind === "end") {
    out += rect(x, y, w, h, { r: 8, fill: C.dark, stroke: C.ink });
  } else {
    out += rect(x, y, w, h, { r: 8, fill: C.white, stroke: C.dark, sw: 1.4 });
  }
  const fill = kind === "state" || kind === "end" ? C.white : C.text;
  out += text(x + w / 2, y + h / 2 + (sub ? -2 : 5), s, { size: 15, weight: 600, fill, anchor: "middle" });
  if (sub) out += text(x + w / 2, y + h / 2 + 16, sub, { size: 12, fill: kind === "state" || kind === "end" ? C.rose : C.textMuted, anchor: "middle", mono: true });
  return out;
}
export const edge = (id, d, { accent = false, dash, label: l, lx, ly } = {}) =>
  `<path d="${d}" fill="none" stroke="${accent ? C.accent : C.data}" stroke-width="1.6"${dash ? ` stroke-dasharray="${dash}"` : ""} marker-end="url(#${id}-arrow${accent ? "-m" : ""})"/>` +
  (l ? rect(lx - tw(l, 11, true) / 2 - 6, ly - 10, tw(l, 11, true) + 12, 18, { r: 3, fill: C.ground }) + text(lx, ly + 3, l.toUpperCase(), { size: 11, weight: 600, mono: true, fill: accent ? C.accent : C.dataDeep, anchor: "middle", ls: 1 }) : "");
