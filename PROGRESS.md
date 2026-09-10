# PROGRESS — case-study template rebuild

**Purpose.** This file is the resume point. If the work is interrupted, read this and nothing else
should need re-deriving. Update it at the end of every phase and commit it on its own.

**Why it lives at the repo root.** The detailed plan is at
`research/sessions/2026-09-09-principal-framework-implementation.md`, but **`research/` is
gitignored** — it cannot survive a clone, a clean checkout, or a stash. Anything needed to resume
has to be here.

**Last verified:** 2026-09-09 · branch `tooling/case-study-review-md`
**Gates:** `npm run typecheck` passes · `npm run build` passes

> ⚠️ **All of the work below is uncommitted** — about 75 changed paths in the working tree. Nothing
> has been committed since `1012aac`. That is the single largest risk to this build. See
> *Committing* at the bottom.

---

## What is being built

The case study pages are being rebuilt around
`research/design/principal-ux-case-study-framework.md`: three parent sections, eight rendered
children, nothing behind a disclosure, plus a "lede" header that leads with the outcome rather than
the project name.

```
01 Framing      Overview · Product framing · The problem
02 The work     Scope and ownership · Key decisions · Evidence
03 Results      Outcome · What I learned
```

This replaced the two-layer trailer/proof order of 2026-09-04, so
`research/decisions/case-study-architecture.md` and `case-study-layout.md` are **history, not
current**.

---

## Phases

| # | Phase | Status |
|---|---|---|
| 1 | The three-parent shell | ✅ done |
| 2 | The eight children | ✅ done |
| 3 | Migrate the rewritten studies | 🟡 2 of 4 |
| 4 | Migrate the remaining studies | ⬜ not started |
| 5 | The lede header, typography, one navigation | ✅ done |
| 6 | Visual assets — flows, diagrams, image briefs | 🟡 in progress |
| 7 | Surfaces and close-out | ⬜ not started |

---

### Phase 1 — the three-parent shell ✅

`group` replaced `layer` on `Section`; `sectionGroups.ts` holds the three parents; `Part.tsx` draws
each one with a sticky display numeral in a gutter.

**Files:** `src/components/case-study/{types.ts,sectionGroups.ts,Part.tsx}`, `src/pages/CaseStudyPage.tsx`

---

### Phase 2 — the eight children ✅

New: `ProductFraming`, `ScopeOwnership`, `EvidenceTable`, `OutcomeSection`, `WhatILearned`,
`primitives/TwoColumnTable`. Rewritten: `OverviewSection`, `ProblemSection`, `KeyDecisions`.

**Deleted — do not go looking for these:** `FeaturedDecision`, `DeepDive`, `ChallengeList`,
`ResultsSection`, `ReflectionBlock`, and later `SectionNav`, `JumpNav`.

Three sections stopped existing: Turning point (the pivot is now a numbered decision), Solution
(absorbed into the overview's approach line and the ownership block), and the Details disclosure.

**Transitional fallbacks are still live.** `buildSections.tsx` carries 3 blocks marked
`Transitional` that render the pre-2026-09-09 fields so un-migrated studies lose nothing. **They can
only be deleted once Phase 4 is done.** Search the file for `Transitional`.

---

### Phase 3 — migrate the rewritten studies 🟡

| Study | Migrated | Notes |
|---|---|---|
| `auditable-billing-workflow` | ✅ | Full. Has `claim` and `measureNext`. |
| `enterprise-document-knowledge` | ✅ | **`measureNext` is absent** — the source doc has no such section. Needs a line from Anastasia; do not invent one. |
| `finance-cloud` | ❌ | **Not started.** An earlier summary said otherwise; it is wrong. Still on `context` / `turn` / `solutionSteps` / `ownedThemes` / `leadership` / `team`. |
| `connected-customer-journey` | ❌ | Not started. Same old shape. |

**Sources for the migration:** `research/design/updated-case-studies/*.md`. Finance Cloud's rewrite
exists there and is ready to apply; Connected Customer Journey has no rewrite yet.

**Next action:** apply `finance-cloud-principal-framework.md` to `src/data/caseStudies.ts`. Flag every
changed line `[NEEDS SIGN-OFF]` and check the open questions below first.

---

### Phase 4 — migrate the remaining studies ⬜

Connected Customer Journey only, once Finance Cloud lands. Mechanical mapping where possible: split
`overview` into three lines, fold `context` into `productFraming`, turn the constraint half of
`framing` into `constraints` rows, merge the role fields into `scope`, fold `turn` into a decision.

What mapping **cannot** produce and must be written: the how-might-we line, the business-bet
paragraph, the "influenced beyond my lane" block, `measureNext`, and the Users/Team metadata.

**When this completes:** delete the three transitional blocks in `buildSections.tsx`, and the
fallbacks in `OverviewSection`, `ProductFraming`, `ScopeOwnership`, `OutcomeSection`.

---

### Phase 5 — lede header, typography, one navigation ✅

**Lede.** `CaseStudyHeader.tsx` runs kicker → claim (h1) → byline → deck → scope grid → tags. The
claim comes from a new optional `claim` field, falling back to `overview.result`, then the tagline.

> **A study showing its tagline as the h1 has not had its claim written.** That is true right now of
> `finance-cloud` and `connected-customer-journey`. One sentence each, outcome-first, ≤20 words.

**Typography.** Eight steps on a 1.25 ratio in `src/styles/theme.css` inside `@theme inline`, as
Tailwind tokens: `text-label` (11px, the floor) · `text-small` (14) · `text-body` (17) · `text-lead`
(21) · `text-h3` (26) · `text-h2` (33) · `text-h1` · `text-figure`. Leading is declared per step.
This exists because the pages had drifted to sixteen sizes with eight instances at 9–10px, under the
11px floor the 2026-08-26 a11y pass set. **An arbitrary value like `text-[0.625rem]` is 10px and is
a bug.**

**One navigation.** `OnThisPage.tsx` — vertical and sticky at `lg`, a chip strip below. It replaced
three simultaneous navigations. The scroll-spy watches sections, not headings, and derives the
active part from the active child; observing both made them compete.

**Micro-interaction rule.** Numerals never animate — a count-up displays wrong values for most of
its run and was caught rendering "6 active users". `StatBand` draws a rule under each figure
instead, with a 2.5s failsafe. **No hover state on anything that is not clickable.**

---

### Phase 6 — visual assets 🟡

**Done — the two wide flows, re-exported.** The sources were crisp; the aspect ratio was the problem
(8818 × 1862 fitted to a column rendered 26px labels at 6px). Cut lines were found programmatically
at columns with no ink across every horizontal band, so no cut passes through a node. Ten new
panels under `src/assets/case-studies/cwo/`: `creation-flow-01..05`, `creation-flow-02b`,
`review-flow-01..03`, `review-stories`. Each displays at 62% of source. Originals kept for lightbox.

**Done — briefs.** `research/design/2026-09-09-image-brief.md` (billing workflow, eight slots).

**In progress — a background agent** is producing `research/design/2026-09-09-image-brief-all-studies.md`
plus diagrams for user flows, features and ownership across all four studies, using the
`diagram-design` plugin and the saved `portfolio` profile. It was told not to touch `src/data`,
`src/components`, `src/styles` or the prototypes. **Check whether it finished before editing
`src/assets/case-studies/`.**

**Open:** the flow panels carry real project vocabulary — "Enter Attuid", role names, "Project
Billing Report-View Only". Confirm publishable or mask before they ship.

---

### Phase 7 — surfaces and close-out ⬜

1. `scripts/casestudy-md.mjs` still labels its output with the old section names and word budgets.
   It runs, but its headings are stale.
2. `CLAUDE.md`, `AGENT.md` and `DECISIONS.md` still describe the superseded two-layer order.
3. Move the code citations off `research/decisions/case-study-architecture.md`.
4. Visual pass: crop each figure to one legible detail.

---

## Blocking decisions — content, not code

None of these can be resolved by editing files. From `~/.claude/.../memory/cwo-signoffs-pending.md`.

**Answered:** keep the "10 pilot users → 300 → 1,000+ planned" figures · the billing backlog is
stated as *cleared*.

**Still open:**
1. Which figure leads Finance Cloud — the hackathon numbers or the 10→300 arc.
2. **Role labels.** The rewrites change billing to "Product Lead and Design Contributor" and Finance
   Cloud to "Lead Product Designer". Both differ from the site *and* the résumé. Settle all three
   surfaces at once or not at all.
3. Billing status changed from "Completed" to "MVP 1 released; MVP 1.5 in progress".
4. New billing claims with no prior source: ten usability participants, the approval flow picked up
   by other projects. "12 of 21 must-have features" was dropped.
5. Document AI: the canonical title, the expanded role, and the replaced status.
6. `measureNext` for Document AI.
7. Whether the hypothesis/KPI `framing` block survives — all four studies still carry it.

**An inconsistency worth resolving:** the Document AI rewrite names ten research participants and
then declines to use the figure because attribution is unverified. The billing rewrite states its
ten participants as fact. Same class of evidence, two different standards.

---

## Layout prototypes — reference only, not shipped

`research/design/layout-prototypes/` holds six explorations (A Spread, B Frame, C Lede, D Brief,
E Exhibit, F Lede v2), an `index.html` comparing them, and `dictionary.html` — 22 devices with live
specimens and the six that were built and rejected. **F is the direction that shipped.** Keep them:
they are the reasoning, and the dictionary is the reference for future studies.

Four rounds of research behind every decision are in
`research/design/2026-09-09-case-study-design-review.md`.

---

## Resume checklist

```bash
git branch --show-current          # expect tooling/case-study-review-md
git status --short | wc -l         # expect ~75 until things are committed
npm run typecheck                  # must pass
npm run build                      # must pass — prerender only breaks here
```

Then: read this file's Phase 3 table, pick the first study marked ❌, and apply its rewrite from
`research/design/updated-case-studies/`.

---

## Committing

**The whole build is uncommitted.** Before adding anything, check the branch — this repo has had
work land on `main` when that check was skipped. Split the tree into commits that can be reverted
independently rather than one large one:

1. the diagram assets and their `.html` sources
2. the phase 1–2 structural refactor
3. the phase 3 content migrations (per study)
4. the phase 5 lede, typography and navigation

**Do not open or merge a PR without explicit go-ahead** — repo rule, and it needs its own approval
each time.
