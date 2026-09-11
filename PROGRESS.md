# PROGRESS — case-study template rebuild

**Purpose.** This file is the resume point. If the work is interrupted, read this and nothing else
should need re-deriving. Update it at the end of every phase and commit it on its own.

**Why it lives at the repo root.** The detailed plan is at
`docs/case-study/2026-09-09-principal-framework-implementation.md`, but **`docs/` is
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
`docs/case-study/principal-ux-case-study-framework.md`: three parent sections, eight rendered
children, nothing behind a disclosure, plus a "lede" header that leads with the outcome rather than
the project name.

```
01 Framing      Overview · Product framing · The problem
02 The work     Scope and ownership · Key decisions · Evidence
03 Results      Outcome · What I learned
```

This replaced the two-layer trailer/proof order of 2026-09-04, so
`docs/decisions/case-study-architecture.md` and `case-study-layout.md` are **history, not
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

**Sources for the migration:** `docs/case-study/rewrites/*.md`. Finance Cloud's rewrite
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

**Done — briefs.** `docs/case-study/2026-09-09-image-brief.md` (billing workflow, eight slots).

**In progress — a background agent** is producing `docs/case-study/2026-09-09-image-brief-all-studies.md`
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
3. Move the code citations off `docs/decisions/case-study-architecture.md`.
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

`docs/case-study/prototypes/` holds six explorations (A Spread, B Frame, C Lede, D Brief,
E Exhibit, F Lede v2), an `index.html` comparing them, and `dictionary.html` — 22 devices with live
specimens and the six that were built and rejected. **F is the direction that shipped.** Keep them:
they are the reasoning, and the dictionary is the reference for future studies.

Four rounds of research behind every decision are in
`docs/case-study/2026-09-09-case-study-design-review.md`.

---

## Resume checklist

```bash
git branch --show-current          # expect tooling/case-study-review-md
git status --short | wc -l         # expect ~75 until things are committed
npm run typecheck                  # must pass
npm run build                      # must pass — prerender only breaks here
```

Then: read this file's Phase 3 table, pick the first study marked ❌, and apply its rewrite from
`docs/case-study/rewrites/`.

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

---

## Update — 2026-09-09, later

**Phase 6 (visual assets) advanced.** A background agent delivered
`docs/case-study/2026-09-09-image-brief-all-studies.md` covering all four studies at slot level,
plus five new diagrams: a front-door flow for Finance Cloud, ownership diagrams for the Customer
Journey and Document AI, and comparison-modes and citation-loop diagrams for Document AI. **None of
them is wired** — `src/components/` was out of bounds for that agent, and `augments.ts` has no
`enterprise-document-knowledge` key at all. Wiring is the next step of phase 6.

**One real bug found and fixed.** `cwo/status-model.png`, `gaf/operating-model.png` and
`ccj/three-role-loop.png` were declared 1920×1200 in `caseStudies.ts`, `financeCloudDiagrams.tsx`
and `ccjDiagrams.tsx`, but the exporter writes 2400×1502. A wrong intrinsic size makes the browser
reserve the wrong box and the page shift as the image loads, which is the exact thing those
attributes exist to prevent. All three now declare 2400×1502.

**Six contradictions recorded in the brief, not resolved here.** The sharpest three:

1. **Finance Cloud's diagrams describe a different product from its prose.** `GovernedPipeline`
   renders a sandbox stage and `PromotionGate` a promotion model; neither appears anywhere in the
   live copy, which now tells the suite, homepage and taxonomy story. Both trace back to the
   rewrite document.
2. **The gated 10 → 300 pilot figure is live in a source document that feeds the site**
   (`finance-cloud-principal-framework.md`) while `caseStudies.ts` holds it back. The document
   carries no gate marker.
3. **The billing study claims a "ten-stage decomposition" and enumerates six.** Either the ten get
   written down or the copy says six.

**Two gaps the agent deliberately left unbuilt**, both correctly: a billing role-and-team matrix
(nineteen of twenty cells would have been invented) and a Document AI widget framework (the record
names exactly one widget).

---

## Update — diagrams wired

**Phase 6 advanced.** All five new diagrams are wired and building:

| Diagram | Study | Section |
|---|---|---|
| Front-door flow | Finance Cloud | Key decisions |
| Scope and ownership | Customer Journey | Scope and ownership |
| Scope and ownership | Document AI | Scope and ownership |
| Comparison modes | Document AI | Key decisions |
| Citation round trip | Document AI | Key decisions |

`diDiagrams.tsx` is new — Document AI had **no entry in `augments.ts` at all**, which is why its
Key decisions section argued in prose alone. Every study now carries figures: Finance Cloud 2,
billing 6, Customer Journey 8, Document AI 4.

Alt text on each new figure is lifted verbatim from the diagram's own `<desc>` so the two cannot
drift. All five captions are authored and carry `[NEEDS SIGN-OFF]`.

**The colour cross-reference is in.** In Scope and ownership the four terms — Owned, Led,
Influenced beyond the design lane, Worked with — are tinted to the bands they name in the figure
directly below, with the convention announced once in a sentence instead of drawn as a legend.
Colour is never the only signal; each term also carries an underline.

### Where the Lede stands

Done in `src/`: the lede header (kicker, claim, byline, deck, scope grid), the type scale with an
11px floor, one navigation, the stat-band reveal, the colour cross-reference.

Not yet ported from the `c-lede` prototype, in the order they are worth doing:

1. **The parking lot** — what did not make the release and why. Needs a `parked` field; the billing
   content already exists as a restatement of its own decisions.
2. **The close-up plus context opener** — the pair of images under the lede. Blocked on assets;
   see the image brief.
3. **The annotated screen** — numbered pins keyed to lines of reasoning. Works, but pin
   coordinates need tuning per asset.

---

## Session 2026-09-09 (resume) — plan for this run

Read the whole file above first; nothing in it is superseded except where this block says so.

| Step | What | Status |
|---|---|---|
| 0 | Commit the uncommitted tree in the split commits listed under *Committing*, then continue in a worktree on branch `case-study/principal-framework` | ✅ |
| 3 | Finance Cloud migration to the eight-child shape | ✅ (migrated by a parallel session; coherence repaired here) |
| 4 | Customer Journey migration; then delete the transitional fallbacks and the legacy fields | ✅ |
| 6 | Wire the five drawn diagrams (front door, two ownership figures, citation loop, comparison modes) | ✅ (drawn diagrams wired by the parallel session; flow panels wired here) |
| 7 | `casestudy-md.mjs` headings; local guidance docs; code citations | ✅ |

**Decisions this run applies, with their source.** The "10 → 300 → 1,000+" figures return as Finance
Cloud's tagline and headline result (owner's decision 2026-09-09, recorded in memory
`portfolio-scorecard-v2-applied`; which figure leads the *stat band* is still open, so the band is
left on the hackathon). The Finance Cloud role stays "Product Experience Lead" (resolved 2026-08-26;
the rewrite's "Lead Product Designer" is not applied). The rewrite's "confidence thresholds set with
ML engineering" is not applied: the 2026-09-03 correction stands (model defined, cut-offs pending).
Every composed or changed line carries `[NEEDS SIGN-OFF]` in the data.

---

## Update — Finance Cloud migrated

**Phase 3 is now 3 of 4.** Finance Cloud carries the three-line overview, `claim`, `productFraming`,
`hmw`, six `constraints`, `scope`, six rewritten decisions, the five-finding evidence table,
`measureNext` and a new metric caveat. Its seven pre-migration fields are gone; `states` and the
stat band were kept, both unchanged. Only the Connected Customer Journey is left, and it has no
rewrite document.

**It resolved a standing contradiction rather than adding one.** The coded diagrams on this study
render the sandbox-and-promotion product, which the previous copy no longer described. The prose and
the figures now tell the same story again.

**The pilot-scale figures are back.** `financePilotUsers`, `financeScaledUsers` and
`financePlannedUsers` are in `figures.ts` with provenance, restored on Anastasia's explicit
instruction after being pulled as unsourced on 2026-09-03. `impact.metricStatus` states plainly that
they are her account rather than a project record, that what 300 counts is unconfirmed, and that the
1,000+ is a plan.

**Still open on this study:** the role changed to Lead Product Designer and the status to a working
POC, both needing confirmation across the card, the H1, the next link, the title tag and the résumé.
And open question 3 is untouched — whether the hackathon or the pilot arc should lead. Both are on
the page: the band keeps the hackathon, the claim and Outcome carry the arc.

**Dev-server note.** A Vite process had been running since before the rebuild and was serving a
stale module graph — deleted components still resolving, none of the new type tokens present.
Restarting it was the fix. If the layout ever looks unchanged, restart `npm run dev` before
debugging anything else.

---

## Update — Finance Cloud coherence repaired (branch `case-study/principal-framework`)

**Two sessions worked this branch at once.** While this session was reading, a parallel session
committed the Finance Cloud migration (`d334c54`) and the diagram wiring into the shared checkout.
This session then committed the rest of the working tree in five reviewable commits and moved to a
worktree on `case-study/principal-framework`, branched from `7cbdbd4`. **Everything from here on is on
that branch**; `tooling/case-study-review-md` is its base and fast-forwards to it.

**What the repair changed, and why.** The first-pass migration replaced the whole study with the
rewrite's platform story, which left five figures and all four stat-band numbers describing things
the prose no longer said (SuiteMap, VersionArc, the operating model, the front-door flow, and the
hackathon / versions / research / program figures). The repair keeps the platform layer leading and
folds her 2026-08-25 program-level account back in where a figure depends on it:

- **Role back to "Product Experience Lead"** on card and snapshot. Resolved with Anastasia
  2026-08-26 (résumé title and engagement role are different layers); the rewrite's "Lead Product
  Designer" is not applied and should not be re-flagged.
- **Status back to the 2026-09-08 account** ("V3 in testing; homepage MVP in development"); the
  rewrite's own verify list asks for its status to be refreshed. `[NEEDS SIGN-OFF]`.
- **Thresholds softened** to the 2026-09-03 correction the ConfidenceThresholds diagram already
  states: tiers defined, model-confidence cut-offs pending. Applied in `scope.influenced`, decision 7
  and the proof list.
- **Eight decisions, two layers**: reframe, front door (her three homepage decisions merged; the
  front-door flow is attached to it as `images`, no longer an augment), the V1→V3 pivot (was
  `turn`), sandbox + gate (the rewrite's two, one figure), states, copilot + confirm-assumptions,
  thresholds, access assumptions. The rewrite's anomaly decision is not a decision: the
  constraints, evidence and states tables already carry it three times.
- **Evidence table** no longer repeats the constraints table word for word; it carries the
  hackathon and her three program-level findings plus the rewrite's scale finding.
- **Proof list** argues the four stat-band figures first, so the band shows nothing the page does
  not argue. **Reflection** regains her "would change" paragraph and the principle.
- **Product framing** gains her pre-migration `context` (the single-application promise), joined by
  one authored clause. **Constraints** row 6 is now that promise, replacing the scale row.

Gates at this point: `npm run typecheck` passes.

---

## Update — Phase 4 done: all four studies on one shape

**The Connected Customer Journey is migrated** by mapping its own signed-off copy (2026-08-26) onto
the framework fields; there is no rewrite document for it and nothing new was drawn from one.
Every field is her text except two composed lines, both flagged: the `claim` (her Outcome headline
cut to the slot) and the `hmw` (from her hypothesis and the review constraint). `measureNext` is
her former "Success metric" framing line in the slot the framework gives it. `scope` has two blocks,
`owned` and `workedWith`: nothing in the record separates what she led from what she influenced
beyond the design lane, so those are absent and the two-band ownership figure matches. Six
decisions; the reset that was the Turning point is decision 1, and the five product screens sit
on the decisions they prove.

**The legacy shape is gone.** Removed from `CaseStudy`: `team`, `leadership`, `solutionSteps`,
`turn`, `context`, `ownedThemes`, the `string` overview, and `impact.headline / business / user /
organizational`; with them the `TeamMember`, `OwnedTheme`, `LeadershipPoint` and `SolutionStep`
types, the three transitional blocks in `buildSections.tsx`, the fallback branches in
`OverviewSection`, `ScopeOwnership` and `OutcomeSection`, and the three components only those
fallbacks rendered: `RoleTeam`, `LeadershipGrid`, `SolutionSteps`. `ownedStatements.ts` now points
the résumé check at `scope.owned`.

**Gates:** `npm run typecheck` and `npm run build` both pass; all eleven routes prerender.

**`scripts/casestudy-md.mjs` is rewritten** for the three-parent order (Phase 7, item 1): it now
reports the lede, the eight children, and counts against the type budgets and the framework's
limits (constraints 4–6, decisions 3–6, findings ≤5, proof ≤4, tags ≤3), and flags a claim that
fell through to the tagline.

---

## Update — Phase 6 done: every flow on the site is legible

**The ten billing panels were never wired.** The earlier note in this file said each "displays at 62%
of source"; in fact `caseStudies.ts` still imported the two 8,818px and 6,368px originals and
nothing referenced the panels. They are wired now, in `processImages`, nine flow panels at a display
scale of 0.55 (labels about 16px), with the review user stories under Evidence via `cwoDiagrams.tsx`.
The two originals stay in the folder, unimported.

**The mechanism:** `CaseStudyImage.displayScale`. A panel renders at that fraction of its intrinsic
width in CSS pixels and scrolls sideways inside its own container when wider than the column; the
page never scrolls sideways. `ImageGallery` honours it; images without it fit the column as before.

**The Document AI flow got the same treatment.** `di/user-flows.jpg` (9,000 × 2,196) has no
ink-free columns, so it was cut at the three columns where a cut crosses only a connector line and
no node (found programmatically as the columns with the least ink: 2,530 / 4,773 / 6,964), then
each panel cropped to its content. Four panels, `di/user-flow-01…04.jpg`, at display scale 0.75:
the board's type is small and 0.75 is the lowest scale that keeps its labels near the 11px floor.
The original stays in the folder, unimported.

**Vocabulary to confirm before shipping** (all flagged in the data): billing panel 01 reads "Enter
Attuid" and names the roles; the report panel says "BOC"; the Document AI panels carry the team's
own sticky notes (the research questions, a "current pain point" callout). Every new caption is
`[NEEDS SIGN-OFF]`.

**Gates:** `npm run typecheck` and `npm run build` pass.

---

## Phase 7 — what is done, and the one step left

**Done.** `scripts/casestudy-md.mjs` reports the three-parent order and cites the framework doc
instead of `case-study-layout.md`. No code cites `docs/decisions/case-study-architecture.md`
any more; the type and builder comments point at the framework and the implementation session.
The flow figures are cropped to legible panels (Phase 6). The craft screenshots the image brief
lists as **ANASTASIA** are the only visual work left, and none of it can be done from the repo.

**Done, 2026-09-09 late.** `CLAUDE.md`, `AGENT.md` and `DECISIONS.md` in the main checkout now
describe the three-parent order and the current fields; the two-layer paragraphs are gone. They are
gitignored, so this is recorded here rather than in a diff.

---

## Where this leaves the build — resume point as of the end of this session

**Branch:** `case-study/principal-framework`, worktree `.claude/worktrees/case-study-rebuild`,
branched from `tooling/case-study-review-md` at `7cbdbd4`; the base branch was fast-forwarded to it
late on 2026-09-09, so the two are the same line of history and either can be resumed. **Do not open or merge a PR without explicit
go-ahead.**

**All seven phases are complete.** Every
study is on the eight-child shape, the legacy fields and fallbacks are gone, every figure is
wired, every flow is legible, and both gates pass.

**What only Anastasia can do next**, in the order a reviewer would feel it:

1. The sign-off walk: every `[NEEDS SIGN-OFF]` in `src/data/caseStudies.ts` and `projects.ts`,
   plus the blocking decisions listed earlier in this file. The Finance Cloud client descriptor
   and status, the billing role, and the Document AI title are the ones that change what the
   card, H1 and title tag say.
2. The vocabulary check on the flow panels (Phase 6 note above).
3. The product screenshots the image brief ranks first: Finance Cloud and Document AI have no
   product screen at all.

---

## Update — 2026-09-10: Layout C implemented (branch `case-study/c-lede-integration`)

**What was crossed.** The site had shipped prototype **F** (the Lede, second pass) where
prototype **C** (the Lede) was wanted. F kept C's lede but dropped the opener band, the
horizontal chapter bar, the ghosted part numerals, the per-study claim headings, the decision
card grid, the annotated screen, the parking lot and the credits. `parallel-plan.md` at the repo
root records the diff, where the documented improvements to C live, and the rule applied: **C as
drawn, F's documented fixes kept** (type tokens with the 11px floor, no hover on non-clickable
things, rejected paths always visible, no count-up, no progress line, panelled flows).

**Branch and worktree.** `case-study/c-lede-integration`, worktree
`.claude/worktrees/c-lede-integration`, from `tooling/case-study-review-md` at `2034b99`. One
commit per task, each independently revertable:

| Task | What |
|---|---|
| 0 seams | `src/data/caseStudyTypes.ts` holds the types; `caseStudies.ts` re-exports them. New optional fields: `Decision.mechanism`, `CaseStudy.headings`, `opener`, `annotated`, `parked`, and the `SectionId` union. |
| A shell | `CaseStudyPage`, `CaseStudyHeader` (figures inside the lede with the caveat), `StatBand`, `Part` (ghosted numeral), new `ChapterBar`, `Opener`, `Credits`. `OnThisPage` and `PlaceholderFigure` deleted. |
| B sections | `KeyDecisions` card grid, `RejectedPath`, `TwoColumnTable` ledger, `PullQuote`, `ProblemSection`, `OutcomeSection` (teal After), `EvidenceTable`, `ImageGallery`; tokens everywhere. |
| C composition | `buildSections` per-study headings (problem defaults to the how-might-we), the ninth child `parked`, `AnnotatedFigure`, `ParkingLot`; `casestudy-md.mjs` reports them. |
| D billing content | Six mechanism names, six claim headings, opener pair, four pins, four parked rows, all from `c-lede.html`, all `[NEEDS SIGN-OFF]`. |
| E refactor | About and Philosophy copy into `data/`; `useZoomPan` out of the lightbox; shared `useBodyScrollLock` fixes the drawer. |
| F surfaces | README work table generated by `scripts/readme-work.mjs` (`npm run readme`). |

**Parallel execution did not happen.** Subagent shells are pinned to the orchestrator's worktree
(see `context/feedback-queue.md` D6), so the tasks ran sequentially in one session.

**Gates:** `npm run typecheck` and `npm run build` pass after every task.

**What only Anastasia can do next** is in `context/feedback-queue.md`, in order. The facts file
`context/facts.md` is pre-filled and waiting for its `Confirmed` cells. The other three studies
keep their noun headings and have no opener, pins or parking lot until those answers exist.

**Do not open or merge a PR without explicit go-ahead.**

---

## Update — 2026-09-10: `research/` renamed to `docs/`

The gitignored working folder is now `docs/`, regrouped by use: `docs/case-study/` holds every
input the case-study pages are built from (framework, implementation plan, diagram plan, design
review, image briefs, `rewrites/`, `prototypes/`); `docs/source/` is unchanged ground truth;
`docs/generated/` is the generator's output only; `docs/archive/` holds superseded sessions, the
rendered HTML snapshots, the ideation prompt and the reference screenshots. Every path citation in
`src/`, `scripts/`, `context/`, this file, `parallel-plan.md` and the gitignored root docs was
rewritten. `docs/README.md` has the folder table and the old → new map.

---

## Update — 2026-09-10: SVG diagrams, the image cut, the length cut, and contrast (branch `case-study/svg-clarity-contrast`)

Owner's brief, verbatim: "Use svg diagrams not png. Also lets try to rewrite the case studies for clarity. Its still too wordy. I also dont like all the images. Try to bring in a little more contrast."

**Diagrams are SVG, inlined.** Every drawn diagram now ships as its `.svg` export and is inlined into the page by `src/data/diagramSvg.ts` (a `?raw` import, cleaned: XML prolog and the Google Fonts `@import` stripped, Geist Mono → IBM Plex Mono, Instrument Serif italic → Inter italic one size step down so the callouts clear their leader lines). `CaseStudyImage.inlineSvg` carries the markup and `ImageGallery` renders it in the same frame as a screenshot, not as a button: a vector figure needs no lightbox. The nine PNG exports were deleted (`git rm`), and `ScopeOwnershipDiagram.tsx`, the hand-ported copy of the billing ownership figure, went with them: the SVG file is the one source now. Bundle: 442 kB JS, down from the raster path's separate 100–170 kB per figure.

**The image cut.** One image proves one claim, and a screen already on the page does not appear twice. Billing 17 → 8 (the package index left decision 02 and the billing report left decision 04, both already in the opener and the annotated screen; nine flow panels became three; the MVP2 scope board and the review-stories board are gone). Customer Journey 8 → 6 (the user-flow board, which the three-role loop already draws; the segment-of-one timeline). Document AI 7 → 3 (the four flow panels cut from the whiteboard, which carried the team's sticky notes; the citation loop and comparison modes now sit on the decisions they prove). Finance Cloud unchanged at two figures plus the five coded diagrams. Every file that left the page stays in its folder, unimported.

**The length cut.** All four studies rewritten to the type budgets, every line a tightening of what was there. Key decisions: Finance Cloud 836 → 531 words (8 → 6 decisions), Document AI 877 → 441 (6 → 5), Customer Journey 362 → 260 (6 → 5), billing 400 → 348. Outcome: 318 → 226, 242 → 170, 204 → 182; proof points at four everywhere. Product framing: 224 → 111 on Finance Cloud. Document AI has a written claim for the first time (the h1 had been the 40-word result line). Every study's decisions carry a mechanism label; the billing titles are the consequence lines from prototype C (feedback-queue C6). Page heights: billing 22,759 → 15,215 px; Document AI 11,078; Customer Journey 13,650; Finance Cloud 13,678.

**Contrast.** Two tokens in `theme.css`: `--muted-foreground` #6b6560 → #57514b and `--border` #dad4cb → #cfc7bb, site-wide by design (every secondary line and hairline reads now). Primary prose (framing, ownership, evidence method, rationale, reflection) is `text-foreground`; captions, caveats and table detail stay muted. Decision cards are white on the hairline grid. Part numerals are `tertiary-500`, not the ghosted `tertiary-100`. Figure frames carry a soft shadow as well as the hairline.

**Gates:** `npm run typecheck` and `npm run build` pass; all eleven routes prerender. `node scripts/casestudy-md.mjs` for the counts.

**What only Anastasia can do next** is appended to `context/feedback-queue.md` as section E. The rewrite is hers to read: it condensed her sentences, and a condensed sentence can lose a nuance she meant.

**Do not open or merge a PR without explicit go-ahead.**

---

## Update — 2026-09-10 evening: three layout renderings (G, H, I)

Owner, after the contrast and length pass: "this is better but I still dont like the layout. Look at whitespace, information flow and the text to image layouts." Three standalone renderings of the billing study, same content and figures, each answering one of those three complaints: **G · The Ledger** (4/8 split, sticky rail, one body width), **H · The Column** (680px column, 1040px breakouts, strictly linear), **I · The Spread** (4/8 rows at 1320px, argument left, evidence right). Templates `docs/case-study/prototypes/{g-ledger,h-column,i-spread}.src.html`, base stylesheet `_base-2026-09-10.css`, built by `build-2026-09-10.mjs` (embeds the downscaled screenshots, inlines the SVGs the way the site does). The index lists them. Nothing in `src/` changed for this; the site is untouched until she picks a direction.
