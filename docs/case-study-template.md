# Case-study template

Draft a new case study by copying this file and filling every `[bracket]`.
Content lives in two TypeScript files joined by `slug` — this template mirrors
their fields in the order the page renders them, so a filled copy can be
transcribed (or handed to Claude) with no restructuring:

- `src/data/projects.ts` — the card (home grid, /work grid, meta)
- `src/data/caseStudies.ts` — the full study body

Any optional section left empty simply doesn't render — a study can ship
partially filled without empty headings. Adding the `projects.ts` entry
auto-creates the route, sitemap entry, and page meta; no router edit needed.

## House rules

- **Nothing invented.** Copy describes real engagements. Tighten what exists;
  never add a claim the project record can't support.
- **Title/tagline split.** `title` is short and scannable; `tagline` is
  verb-led and outcome-led ("Reducing churn by connecting a fragmented
  customer journey"). Never merged into one string.
- **Metric honesty.** State only verified figures. If a metric isn't verified,
  use countable design outputs in the stat band ("6" status states,
  "Required" human review) and say why in `metricStatus`.
- **NDA safety.** No client names — `Client:` reads "Confidential …".
  Screenshots use fictional brands and data, or are omitted.
- **Captions state the decision** the image shows, not what's in the frame.

---

## 1. Card — `projects.ts`

- **slug:** `[kebab-case-url-slug]`
- **title:** `[Short name, 2–5 words]`
- **tagline:** `[Verb-led line carrying the transformation and outcome]`
- **problem:** `[2–3 sentences: the situation and what was at risk]`
- **role:** `[e.g. Lead UX / Product Designer]`
- **status:** `[e.g. Completed, April 2025]`
- **tags:** `[3–4 short capability tags shown as chips]`
- **outcome:** `[2–3 sentences: what the work produced]`
- **featuredOrder:** `[1–n; position in the grids]`
- **filterCategories:** `[from the fixed list in projects.ts — a category must
  match at least one project or its filter shows an empty grid]`
- **cover image:** `src/assets/case-studies/[study]/cover.jpg` — displayed at
  21:9 desktop / 16:9 mobile via `object-cover`, so compose for a wide
  center crop.

## 2. Header snapshot — `snapshotFields`

- **Role:** `[…]` (renders as the byline under the title)
- **Employer:** `[…]`
- **Client:** `[Confidential … organization]`
- **Timeframe:** `[…]`
- **Status:** `[…]`
- **Users:** `[the roles the product serves]`
- **Tools:** `[…]`

## 3. At-a-glance stats — `stats` (exactly 3)

Each stat: a short display `value` (number, ratio, or single word) + a
one-line `label`. Restate figures already argued in Results — the band
introduces nothing new. Unverified outcome? Use a countable output instead.

1. `[value]` — `[label]`
2. `[value]` — `[label]`
3. `[value]` — `[label]`

## 4. Overview — `overview`

`[2–4 sentences: what this was, what I did, and one scale-of-influence clause
— e.g. "the model now used across the platform".]`

## 5. How I led — `leadership` (4 cards, one per discipline)

Each card: discipline eyebrow + verb-led title (3–6 words) + one-sentence
detail. One card per discipline, in this order:

- **Product strategy:** `[title]` — `[detail]`
- **Team leadership:** `[title]` — `[detail]`
- **Design:** `[title]` — `[detail]`
- **Research:** `[title]` — `[detail]`

## 6. TL;DR — `tldr` (the study's summary record)

- **challenge:** `[1–2 sentences]`
- **solution:** `[1–2 sentences]`
- **result:** `[1–2 sentences, carrying the metric or unblocked outcome]`

## 7. The challenge — `evidence`

Up to 4 findings, each paired with the change it caused:

1. `[finding]` → `[response]`
2. `[finding]` → `[response]`
3. `[finding]` → `[response]`
4. `[finding]` → `[response]`

- **insight:** `[One contracted line — renders as the pull-quote and can
  bookend the study, e.g. "Governance people cannot see is not governance
  they will approve."]`

## 8. The solution — `solutionSteps` (3 steps, ≤2 points each)

1. **`[Step title, 2–3 words]`**
   - `[point]`
   - `[point]`
2. **`[Step title]`**
   - `[point]`
   - `[point]`
3. **`[Step title]`**
   - `[point]`
   - `[point]`

Visuals render with the solution: the study's `images`, or coded diagrams,
or a labelled placeholder — never a solution with no picture.

## 9. Results — `impact`

- **headline:** `[The outcome in 2–3 sentences; numbers welcome if verified]`
- **before:** `[1–2 sentences]`
- **after:** `[1–2 sentences]`
- **business / user / organizational:** `[optional one-liners, any subset]`
- **proof:** `[3–5 NDA-safe validated proof points]`
- **metricStatus:** `[If any expected metric is absent: one sentence saying
  what is not verified and therefore not stated. Renders as a Results
  footnote.]`

## 10. Decisions — `decisions` (drives two sections)

Every decision: what was chosen + why. Include `rejected` (the path not
taken) wherever true, and `tradeoff` (what choosing this cost) where one
exists. **The page auto-features one decision** in "One decision, up close":
the first with both `rejected` and `tradeoff`, else the first with
`rejected` — order the list so the right one leads.

1. **decision:** `[…]` / **rationale:** `[…]` / **rejected:** `[…]` /
   **tradeoff:** `[optional]`
2. `[…]`
3. `[…]`

## 11. Deep dive

- **ownedThemes** (≤5): `[label]` — `[one-sentence detail]` (condensed from
  `owned`; renders instead of the flat list)
- **owned:** `[full ownership statements; shared résumé copy imports from
  ownedStatements.ts — never paste it in twice]`
- **team:** `[disciplines only, e.g. Product / Engineering / Data]`
- **states** (edge cases): `[state]` / `[what the user sees]` / `[recovery]`
- **reflection:** **learned** `[…]` / **wouldChange** `[optional]` /
  **principle** `[one line threading back to the site's through-line]`

## 12. Images — `images`

Assets live in `src/assets/case-studies/[study]/`. Import each twice:
`?preview` (inline WebP) and plain (lightbox full-res).

Per image:
- **file:** `[path]`
- **width / height:** intrinsic pixels (`sips -g pixelWidth -g pixelHeight
  file`) — required, they reserve layout space before lazy load
- **alt:** `[describe what is in the frame]`
- **caption:** `[state the decision the image shows]`

## 13. Ship checklist

- [ ] `projects.ts` entry added (route, sitemap, meta come free)
- [ ] `caseStudies.ts` entry keyed by the same slug
- [ ] Cover at `src/assets/case-studies/[study]/cover.jpg`
- [ ] Every filter category used still matches ≥1 project
- [ ] `npm run typecheck` and `npm run build` pass
- [ ] Any line Claude authored is flagged for sign-off
