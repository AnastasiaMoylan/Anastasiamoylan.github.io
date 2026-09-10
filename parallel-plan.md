# Parallel plan — implement Layout C ("The Lede") for the case studies

**Written:** 2026-09-09 · **Branch:** `case-study/c-lede-integration` (from `tooling/case-study-review-md` @ `2034b99`)
**Status:** Phase 1 — awaiting approval. Nothing below has been started except Task 0's analysis.
**Repo verified:** remote `AnastasiaMoylan/Anastasiamoylan.github.io`, `package.json` name `portfolio`.

---

## 1. What got crossed

The site shipped **Layout F ("The Lede, second pass")**, not **Layout C ("The Lede")**.
`research/design/layout-prototypes/index.html` calls F "the current direction", and
`PROGRESS.md` records "**F is the direction that shipped**". F was built as C with two
fixes — a type scale and one vertical navigation — but in doing so it dropped most of what
makes C read as a newspaper front page. `research/design/rendered-case-study.html` is the
prerendered output of that F build.

### What C has that the site does not

| # | In C (`c-lede.html`) | On the site today | Where |
|---|---|---|---|
| 1 | **Opener band**: dark teal ground, close-up + context image pair under the lede | Nothing. `SHOW_COVER = false`; F replaced the band with a placeholder slot | `CaseStudyPage.tsx` |
| 2 | **Sticky horizontal chapter bar**: title + 01 Framing / 02 The work / 03 Results | Vertical "On this page" rail with all children, chip strip on mobile | `OnThisPage.tsx` |
| 3 | **Part header**: ghosted display numeral beside the h2 and its gloss | Sticky teal numeral in a gutter column | `Part.tsx` |
| 4 | **Child headings are per-study claims** ("Clearing a backlog once is automation…") | Plain nouns on every study ("Overview", "Product framing") | `buildSections.tsx` |
| 5 | **Decisions as a two-up card grid**: mechanism label, title, rationale, rejected path | One numbered stack; the decision is bolded inline in its rationale paragraph | `KeyDecisions.tsx` |
| 6 | **Annotated screen**: numbered pins on the package index keyed to four lines | Not built | — |
| 7 | **Parking lot**: "What did not make the release, and why" | Not built | — |
| 8 | **Credits**: "Built with" line before the close | Not built | — |
| 9 | **Before / After** with After on the teal-900 ground | After on champagne | `OutcomeSection.tsx` |
| 10 | **Ledger rows** (term → arrow → consequence, hairline between) | A `<table>` with a header row | `TwoColumnTable.tsx` |
| 11 | Figures **inside** the lede, with the source caveat under them | Stat band in a separate bordered card below the header | `StatBand.tsx` |

### The improvements you remembered — where they are documented

1. **`research/design/2026-09-09-case-study-design-review.md`**
   - "What was added to prototype C": the **colour cross-reference** (shipped) and the
     **parking lot** (not shipped).
   - Round three: the **annotated screenshot with numbered pins** (in C, not shipped); status
     pills and a role/team matrix were named but never built — the matrix was refused because
     19 of 20 cells would have been invented.
   - Round two: **no counting numerals**, **motion must be project-driven**; round one:
     **nobody uses a scroll progress bar**.
2. **`layout-prototypes/index.html`**, C's "Watch" line: the card grid hides the trade-off
   until hover; **needs the visible hint it has**. `dictionary.html` adds: on touch the card
   should open by default.
3. **`layout-prototypes/f-lede-2.html`**, header comment — the two documented fixes to C:
   **eight-step type scale, 11px floor** (already in `theme.css` as `text-label…text-figure`)
   and **8px vertical rhythm, one prose measure (36rem), one wide measure (56rem)**. Also in
   F: **no hover state on anything that is not clickable**, and the wide flow cut into
   panels at a legible display scale (shipped as `displayScale`).
4. **`PROGRESS.md`, "Where the Lede stands"** — the three C devices never ported, in
   priority order: parking lot, opener pair, annotated screen.

### The rule this plan applies

**C is the layout. F's fixes apply only where they are documented as fixes to C.
Everything else in C ships as drawn.** Concretely:

| Decision | Choice | Why |
|---|---|---|
| D1 Navigation | C's sticky chapter bar (three parts). Delete the vertical rail. **No progress line.** | C as drawn; the progress line contradicts the round-one finding |
| D2 Decisions | C's card grid, with the rejected path **visible by default** (no hover reveal) | Dictionary: hiding content on the most important section is a risk; touch has no hover |
| D3 Child headings | Per-study claim from a new `headings` map, falling back to the noun | Review recommendation #1; parents stay constant so the framework rule holds |
| D4 Opener | New `opener` field; billing gets the exact pair C uses (report close-up + package index) | Assets already exist in `src/assets/case-studies/cwo/` |
| D5 Annotated screen | New `annotated` field; billing gets C's four pins | Pin coordinates are flagged for tuning against the real asset |
| D6 Parking lot | New `parked` rows → a ninth rendered child, between Key decisions and Evidence | Cheapest seniority signal in the survey; billing content exists in C |
| D7 Credits | Rendered from `scope.workedWith` | C as drawn; no new field |
| D8 Part header | C's ghosted numeral + h2 + gloss | C as drawn. *Alternative:* keep the sticky gutter numeral, which the review praised — say so if you want it kept |
| D9 Rows | Keep the `<table>` semantics, restyle to C's ledger look; **no hover** | Screen readers keep row headers; F's no-hover rule |
| D10 Outcome | After panel on teal-900 | C as drawn |
| D11 Wide flows | Keep the shipped per-panel `displayScale` | Documented Phase 6 improvement over C's fixed-height scroll |
| D12 Part names | Framing / The work / Results | C as drawn (F renamed them) |
| D13 Type | Every size from the `text-*` tokens; nothing under 11px; 8px rhythm | F's documented fix |

Things not in scope: the two-register stat problem (content), a clickable prototype or
video (content), the AI-usage trace (content). All three are flagged in the review as
unsolvable by layout.

---

## 2. Tasks — strictly file-disjoint

Every path is owned by exactly one task. A task may **import** another task's file but may
not edit it, and must not change any exported prop type or function signature. Task 0 runs
first, alone, because it creates the seams the others depend on.

### Task 0 — Seams (serial, on the integration branch, before fan-out)

Moves the `CaseStudy` type family out of the content file so type edits and content edits
stop colliding, and adds the four new optional fields every other task codes against.

| Owns | Change |
|---|---|
| `src/data/caseStudyTypes.ts` **(new)** | All interfaces from `caseStudies.ts` (`CaseStudyImage` … `CaseStudy`), plus: `Decision.mechanism?: string` · `CaseStudy.opener?: { detail: CaseStudyImage; context: CaseStudyImage }` · `CaseStudy.annotated?: { image: CaseStudyImage; pins: { x: number; y: number; text: string }[]; caption: string }` · `CaseStudy.parked?: { item: string; why: string }[]` · `CaseStudy.headings?: Partial<Record<SectionId, string>>` · `export type SectionId = "overview" \| "product-framing" \| "problem" \| "scope" \| "decisions" \| "parked" \| "evidence" \| "outcome" \| "learned"` |
| `src/data/caseStudies.ts` | Type block removed; `export type * from "./caseStudyTypes"` so every existing `import type { X } from "../../data/caseStudies"` keeps working. **No content change.** |

Gate: typecheck + build unchanged. Commit, then branch the six task worktrees from it.

### Task A — Page shell: lede, opener, chapter bar, part header, credits, close

| Owns |
|---|
| `src/pages/CaseStudyPage.tsx` |
| `src/components/case-study/CaseStudyHeader.tsx` |
| `src/components/case-study/StatBand.tsx` |
| `src/components/case-study/Part.tsx` |
| `src/components/case-study/OnThisPage.tsx` → **deleted** |
| `src/components/case-study/ChapterBar.tsx` **(new)** |
| `src/components/case-study/Opener.tsx` **(new)** |
| `src/components/case-study/Credits.tsx` **(new)** |
| `src/components/case-study/sectionGroups.ts` |
| `src/styles/globals.css` |

Does: lede per C (kicker → claim h1 → byline with role → deck → figures with the source
caveat, all inside the header); opener band from `content.opener`; `ChapterBar` (sticky,
three part links, `aria-current`, scroll-spy on the parts, no progress line) replacing the
12-column rail layout, so content runs full container width with `max-w-*` measures;
`Part` per C's `.phead`; `Credits` from `scope.workedWith`; close unchanged. Remove
`.full-bleed-ground` from `globals.css` if nothing uses it after the change.
**Contract:** keeps calling `buildSections(content, getAugments(slug))` and rendering
`Section { id, group, nav, heading, content }` unchanged; `Part` keeps `{ group, children }`.

### Task B — Section components restyled to C

| Owns |
|---|
| `src/components/case-study/KeyDecisions.tsx` |
| `src/components/case-study/RejectedPath.tsx` |
| `src/components/case-study/ProblemSection.tsx` |
| `src/components/case-study/EvidenceTable.tsx` |
| `src/components/case-study/OutcomeSection.tsx` |
| `src/components/case-study/ScopeOwnership.tsx` |
| `src/components/case-study/OverviewSection.tsx` |
| `src/components/case-study/ProductFraming.tsx` |
| `src/components/case-study/WhatILearned.tsx` |
| `src/components/case-study/StatesRecovery.tsx` |
| `src/components/case-study/ImageGallery.tsx` |
| `src/components/case-study/primitives/TwoColumnTable.tsx` |
| `src/components/case-study/primitives/PullQuote.tsx` |

Does: decisions as C's two-up card grid (mechanism label from `d.mechanism`, title =
`d.decision`, body = `d.rationale`, "Instead of" block always visible, figures under the
card); ledger look on `TwoColumnTable`; teal After panel; measure-next box; all sizes from
the tokens; hover only on clickable things. **Contract:** every component keeps its current
props exactly — `buildSections` (Task C) imports them unchanged.

### Task C — Composition and the two new section devices

| Owns |
|---|
| `src/components/case-study/buildSections.tsx` |
| `src/components/case-study/types.ts` |
| `src/components/case-study/AnnotatedFigure.tsx` **(new)** |
| `src/components/case-study/ParkingLot.tsx` **(new)** |
| `scripts/casestudy-md.mjs` |

Does: `heading = content.headings?.[id] ?? default` for every child; the `parked` section
(id `parked`, group `work`, after `decisions`, before `evidence`); `AnnotatedFigure`
appended at the end of Key decisions when `content.annotated` exists; `casestudy-md.mjs`
emits the parked rows and the claim headings with budgets (heading ≤ 12 words, parked why
≤ 30 words). **Contract:** imports Task B's components with their current props.

### Task D — Billing content from C, claim headings for all four

| Owns |
|---|
| `src/data/caseStudies.ts` (content only — the types left in Task 0) |

Does: on `auditable-billing-workflow`: `opener` (billing-report close-up, package-index
context — captions from C), `annotated` (C's four pins and lines), `parked` (C's four
rows), `mechanism` on each of the six decisions, `headings` for all eight children taken
verbatim from C's h3s. On the other three studies: `headings` only where a claim sentence
already exists in that study's own data (`overview.result`, `evidence.insight`,
`impact.after`); anything composed carries `[NEEDS SIGN-OFF]`; **no new facts**. Their
`parked`, `mechanism`, `opener` and `annotated` wait for the facts interview (§5).

### Task E — Refactor against SOLID/KISS (four changes, from a full read of the eight largest components)

| Owns |
|---|
| `src/pages/AboutPage.tsx` |
| `src/data/about.ts` **(new)** |
| `src/pages/PhilosophyPage.tsx` |
| `src/data/philosophy.ts` |
| `src/data/figures.ts` |
| `src/data/textOutputs.ts` |
| `src/components/work/ImageLightbox.tsx` |
| `src/components/layout/MobileNav.tsx` |
| `src/hooks/useZoomPan.ts` **(new)** |
| `src/hooks/useBodyScrollLock.ts` **(new)** |

Does, in this order:
1. **About page → data.** Six intro paragraphs, the four-role timeline, domains, tools and
   education are hard-coded in the page, against the repo's own rule; the education block
   is a character-for-character copy of `resumeEducation`. Move them to `about.ts`, import
   `resumeEducation` instead of retyping it. Copy moves verbatim — no rewording.
2. **Philosophy page.** `evaluationChecks`, the thesis blockquote and the bridge paragraph
   move into `philosophy.ts`. Two content flags to resolve in the same pass: the bare
   `~90%` in `AiStat` has no entry in `figures.ts`, and `StatusFlowStrip` draws five status
   chips where `figures.billingStatusStates` is six.
3. **Lightbox.** Lines 35–231 are a self-contained zoom/pan engine; extract
   `useZoomPan(stageRef)` and leave a ~110-line dialog. Gesture maths with no tests, so
   this is the careful one: verify wheel, pinch, drag, tap and keyboard by hand in the
   built site.
4. **Body scroll lock.** The lightbox locks body scroll; the mobile drawer does not, so the
   page scrolls behind it. One `useBodyScrollLock` hook, used by both.

Assessed and **left alone**: `ResumeContent.tsx` (the model the others should copy),
`StatBand.tsx`, `GovernanceChain.tsx`, `MobileNav.tsx` beyond item 4, and
`ScopeOwnershipDiagram.tsx` (long because of drawing coordinates, not logic). The orphaned
`LightboxImage` export is noted for Task B, which owns `ImageGallery.tsx`; Task E does not
touch that file.

### Task F — README from site data

| Owns |
|---|
| `README.md` |
| `scripts/readme-work.mjs` **(new)** |
| `package.json` (one script entry) |

Does: the README's "The work" table has drifted from `projects.ts` (roles and one title
differ). Mark the table with `<!-- work-table:start/end -->` and regenerate it from
`projects` with an esbuild bundle of the data, the same way `casestudy-md.mjs` does. Add
`npm run readme`. **`llms.txt` and `resume.txt` need no task**: both are already generated
into `dist/` on every build from `textOutputs.ts`; the integration build regenerates them
and the diff is checked there.

### Serialised on purpose

- **`src/data/caseStudies.ts`**: Task 0 (types out) → Task D (billing + headings) → the
  post-interview content pass (§5). Three edits, one file, never concurrent.
- **`buildSections.tsx` vs the section components**: split by ownership (C vs B) with the
  no-prop-change contract instead of serialising.
- **`CLAUDE.md`, `PROGRESS.md`**: integrator only, at the end.

---

## 3. Execution mechanics (Phase 2)

```
.claude/worktrees/c-lede-integration     branch case-study/c-lede-integration   (Task 0, then merges)
.claude/worktrees/c-lede-a               branch c-lede/a-shell
.claude/worktrees/c-lede-b               branch c-lede/b-sections
.claude/worktrees/c-lede-c               branch c-lede/c-composition
.claude/worktrees/c-lede-d               branch c-lede/d-billing-content
.claude/worktrees/c-lede-e               branch c-lede/e-refactor
.claude/worktrees/c-lede-f               branch c-lede/f-readme
```

Each task worktree is created from the integration branch after Task 0, gets
`node_modules` symlinked to the main checkout (verified: typecheck and build pass that
way), and a subagent whose prompt lists its owned paths, the contracts above, and the
C prototype path. **Every command a subagent runs must be rooted in its own worktree
path** — a read-only agent launched from the shared checkout during planning had its
shell refused by the worktree guard — so fan-out starts with a one-command probe agent
before the six real ones. Each subagent must, before committing:

1. `git status --short` shows only owned paths.
2. `npm run typecheck` passes.
3. `npm run build` passes (prerender is where case-study breakage surfaces).
4. Design checks: `grep -rn "text-\[0\.[0-5]" src/` returns nothing (no size under 11px);
   no `hover:` on a non-interactive element it touched; `dist/work/auditable-billing-workflow/index.html`
   contains the landmark it added (nav bar / opener / parking lot / pins).
5. Commit on its branch with the attribution trailer. No push until integration.

### Phase 3 — integrate

Merge order: **0 → A → C → B → D → F → E**. After every merge: typecheck, build, then the
grep checks. After D: run `node scripts/casestudy-md.mjs` and read the billing review copy.
After all merges: a `design-critic` pass on the built billing page, fix on the integration
branch. Then update `PROGRESS.md` and the local `CLAUDE.md` ("Section headings are plain
nouns" becomes "parents are constant; child headings are per-study claims"). Push the
integration branch. **The PR is opened only after you say so** (repo rule).

---

## 4. What "rewrite remaining case studies" actually means now

All four studies are already on the framework shape (Phase 4 closed in `544ca0a`). What
remains is content, and it needs facts rather than mapping:

| Study | Missing |
|---|---|
| Billing | Nothing structural; the role label and nine claims await sign-off |
| Finance Cloud | `parked`, `mechanism` names, `opener`; which figure leads (hackathon vs 10→300) |
| Document AI | `measureNext`, `parked`, `mechanism`, `opener`; title and role confirmation |
| Customer Journey | No rewrite document at all; `parked`, `mechanism`, `opener`, the HMW and influence blocks are composed |

That is why the interview (§5) runs alongside Phase 2 rather than after it.

---

## 5. The facts file and the interview

`context/facts.md` on this branch is the single source for the fields above. It is
pre-filled with **what the repo currently claims, with the file that claims it**, so each
interview question is "confirm or correct" rather than "tell me from scratch". Every row
has a `confirmed` column that starts empty; case-study copy is written only from confirmed
rows. Publishable facts only: the repo is public, so real client names and NDA material
stay out of it (the `research/source/` notes remain the private record).

The interview runs one question at a time, study by study, starting with the billing
workflow because Task D depends on it.
