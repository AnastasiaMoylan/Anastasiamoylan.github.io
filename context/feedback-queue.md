# Feedback queue — items that need Anastasia, not code

**Started:** 2026-09-09 23:20 CDT, before the overnight run. Work items that need no decision
keep moving on `case-study/c-lede-integration`; everything below is blocked on you. Work top
to bottom; each item says what it unblocks. Tick the box and write the answer under it —
the next session reads this file first.

Public repo: keep real client names and NDA material out of this file.

---

## A. Approve or amend the plan (unblocks Phase 2 fan-out of Task D and the PR)

- [ ] **A1. `parallel-plan.md` as written.** Six file-disjoint tasks; Task 0 is done and
  committed (`src/data/caseStudyTypes.ts`). The overnight run proceeds with A, B, C, E, F on
  the assumption you approve the layout rule "C as drawn, F's documented fixes applied".
  If you disagree with the rule, the components are cheap to re-skin but the data fields
  are not, so say so before Task D lands.
- [ ] **A2. Part header (plan D8).** C's ghosted numeral beside the h2, or keep the sticky
  teal numeral in the gutter that the design review called "the single best device on the
  page"? Default taken: **C's**.
- [ ] **A3. Progress line (plan D1).** C draws a 2px scroll-progress line; the research says
  no surveyed site uses one. Default taken: **omit**.
- [ ] **A4. Decision cards (plan D2).** C hides the rejected path until hover; F makes it
  always visible. Default taken: **always visible**, no hover reveal.
- [ ] **A5. Source caveat placement.** C prints the metric caveat both under the lede
  figures and in Results. The shipped page prints it once, in Outcome. Default taken:
  **both**, as C draws it.
- [ ] **A7. Users / Team / Status in the lede.** C has no slot for the framework's three
  metadata fields. They were kept as a small labelled grid between the deck and the
  figures rather than dropped. Keep, move, or cut?
- [ ] **A6. The PR.** Repo rule: no PR without an explicit go-ahead. The integration branch
  will be pushed; say "open the PR" when you want it.

## B. The facts interview (unblocks the remaining case-study content — Task D beyond billing)

`context/facts.md` is the target file and is now written: every row is pre-filled with what
the repo currently claims, the file that claims it, and whether the surfaces agree or
conflict, with an empty `Confirmed` cell. **Fill the `Confirmed` cells there**; the questions
below are the same fields in interview order and can be answered inline instead if that is
easier. Either place counts.

**Billing workflow (`auditable-billing-workflow`) — first, because Task D depends on it**

- [ ] **B1. Project name.** Site: "An Auditable Billing Workflow". Confirm, or give the name
  to use everywhere (card, h1 kicker, next-link, title tag, README, résumé).
- [ ] **B2. Dates.** Site: 2024–2025. Confirm start and end month if you want them shown.
- [ ] **B3. Exact role.** Three labels are live at once: the rewrite/site "Product Lead and
  Design Contributor", the README "Lead Designer, then Design Lead and UX / Product Strategy
  Lead", and the résumé's title. One label for all surfaces, please.
- [ ] **B4. Team size and composition.** C's byline says "Led a team of 10"; the site names
  roles (CWO team, client Chief Data Office, product, engineering, UI development, finance and
  operations stakeholders, a consulting principal designer) but no count. Give the number and
  who was on it.
- [ ] **B5. Shipped vs designed.** Status changed from "Completed" to "MVP 1 released; MVP
  1.5 in progress". What is live today, what is designed only (dashboard, in-product editing,
  whole-package automation, document integration)?
- [ ] **B6. Metrics you can cite.** "A few hundred" backlog cleared and "70 active users"
  are your own account, not the project record. Is 70 *active* or *returning*, over what
  window, and is there a publishable backlog number? The +20% submission-rate KPI: measured
  or not?
- [ ] **B7. Client descriptor.** Site: "Confidential enterprise telecommunications
  organization". Confirm the publishable wording.
- [ ] **B8. Ten usability participants across three groups, and "the approval flow picked
  up by other projects".** Both are new claims with no prior source. Confirm or cut.

**Finance Cloud (`finance-cloud`)**

- [ ] **B9.** Same eight fields. Known open points: which figure leads (hackathon 40+/800+
  or the 10 → 300 → 1,000+ arc); role "Product Experience Lead" vs the rewrite's "Lead
  Product Designer"; status line "V3 in testing; homepage MVP in development"; what "300"
  counts; the confidence thresholds are defined but cut-offs pending.

**Document AI (`enterprise-document-knowledge`)**

- [ ] **B10.** Same eight fields. Known open points: title "A Verifiable Document AI
  Platform" vs "A Tailorable Enterprise AI Platform" (README still has the latter); role
  "Lead Experience Designer — UX and product strategy lead"; production status unconfirmed
  (which phases shipped, was the compliance widget built); `measureNext` is empty and needs
  one sentence from you; ten research participants named but unverified.

**Connected Customer Journey (`connected-customer-journey`)**

- [ ] **B11.** Same eight fields. This study has no rewrite document; the how-might-we,
  the business-bet paragraph and the "influenced beyond my lane" block were composed and
  carry `[NEEDS SIGN-OFF]`. Also needed for Layout C on every study: the named mechanism
  per decision, the parking-lot rows (what was cut and why), and which two images make the
  opener pair.

## C. Sign-offs already flagged in the data (`grep -n "NEEDS SIGN-OFF" src/data/caseStudies.ts`)

- [ ] **C1.** Roughly forty lines across the four studies, listed in
  `research/generated/case-studies/<slug>.page.md` after `node scripts/casestudy-md.mjs`.
  The role labels (B3, B9, B10) resolve most of them at once.
- [ ] **C2.** The billing copy claims a "ten-stage decomposition" and enumerates six. Write
  the ten or change the copy to six.
- [ ] **C3.** The billing flow panels carry real project vocabulary ("Enter Attuid", role
  names, "Project Billing Report-View Only"). Publishable, or mask before they ship?
- [ ] **C4.** The annotated-screen pin coordinates in C were placed by eye; two of four land
  on a table row instead of the column header they mean. They are now rendering on the
  billing page (the `annotated.pins` block in `caseStudies.ts`, x and y as percentages);
  tune them in the browser, a five-minute check.
- [ ] **C6. Five decision titles read as activity, not consequence.** The design critic's
  strongest finding on the built page. In C the mechanism label names the thing and the
  card title states why it was right; on the site four of six titles restate their own
  label. Copy, so yours to change in `caseStudies.ts` (`decision` on billing 01–05):

  | Mechanism | Site title today | C's title |
  |---|---|---|
  | Progressive validation | Used progressive validation as users moved through package building. | Catch the gap where it happens, not at submission |
  | The project-number key | Made billing-package identity explicit: the package's primary key is the project number. | A package can be resumed, never accidentally recreated |
  | The six-state status model | Made package status a first-class object. | A package can never sit in an undefined state |
  | The review session | Separated ownership from review. | The handoff moves into the product, so it has a history |
  | The interim editing path | Preserved an interim editing path through Excel. | Continuity now was worth more than a half-built editor |

- [ ] **C7. Two screenshots, five placements.** The package index appears in the opener, on
  decision 02, and as the annotated screen; the billing report in the opener and on
  decision 04. The critic reads that as thin asset coverage. Options: drop decision 02's
  figure (the annotated screen is the same image with pins), or swap in the screens the
  image brief asks for when they exist.
- [ ] **C8. The flows section is about six laptop screens long.** Nine creation and
  review panels plus the stories board sit at the end of Key decisions. Keep them all,
  keep a subset, or move the rest behind the lightbox only. Judgement call, not a defect.
- [ ] **A8. An accent phrase in the h1.** C tints the claim's payload ("the mechanism that
  keeps it clear") maroon. The site's claim is one plain string. Adding an emphasised
  phrase needs a field and the phrase itself; say if you want it.
- [ ] **C5. Claim headings on the other three studies.** The billing study carries C's
  headings verbatim. Finance Cloud, Document AI and the Customer Journey still show the
  nouns; writing their claim headings needs the facts interview (B9 to B11), not a guess.
  The review copy from `node scripts/casestudy-md.mjs` marks each one "no claim heading
  written".

## D. Things found on the way that are not in the plan

- [ ] **D1. `context/` is back.** The 2026-09-08 reorganisation dissolved a `context/` folder
  into `research/`. This one is committed (not gitignored) because you asked for
  `context/facts.md` as the single source of truth and a gitignored file dies with the
  worktree. If you would rather it live at `research/source/facts.md`, say so.
- [ ] **D2. Philosophy page figures.** The `~90%` now lives in `figures.ts` as
  `aiDrivenShare` with its provenance (your own estimate, not measured). The five status
  chips were **left at five**: principle 01's own body copy on that page lists five states
  ("Initiated → In Progress → Review → Approved → Finalized") while the billing study
  publishes six. Aligning them means changing your paragraph, so it is your call: add
  "Completed" to the philosophy copy, or leave the page at five.
- [ ] **D7. The local `CLAUDE.md` is stale on one line.** It says case-study section
  headings are plain nouns identical on every study. After this branch the parents are
  constant and each child heading is the study's own claim, falling back to the noun. The
  file is gitignored and lives only in the main checkout, which this worktree session
  cannot edit; one line to change by hand.
- [ ] **D3. Home-page figcaption** in `GovernanceChain.tsx` hard-names three studies; it
  will drift on the next rename. Not being changed; flagging.
- [ ] **D4. `llms.txt` and `resume.txt`** are already generated on every build; the plan
  adds no task for them. The README's work table is the surface that drifted, and Task F
  regenerates it from `projects.ts`.
- [ ] **D6. Parallel fan-out did not run overnight; the tasks ran sequentially instead.**
  Three probes showed a subagent's shell stays pinned to the orchestrator's worktree even
  after entering another one (verbatim: "a worktree-isolated session's commands must run
  inside its worktree"), and the harness-created agent worktree route stalled twice on the
  auto-mode classifier. So Tasks A, B, C, E, F and the billing half of D were done in this
  session, one commit per task on `case-study/c-lede-integration`, file ownership still
  respected so each commit reverts independently. Parallel execution needs the orchestrator
  launched from the shared checkout (not worktree-isolated) or a permission rule for
  subagent shells; decide whether that matters for next time.
- [ ] **D5. The 02:10 restart** is a session-only one-shot: it fires only if this Claude
  session is still open at 02:10 CDT on 2026-09-10. If the session was closed, the same
  instructions are in the cron prompt recorded at the bottom of this file.

---

### Restart prompt (what the 02:10 job runs)

> You are on branch case-study/c-lede-integration in worktree
> .claude/worktrees/c-lede-integration. Read parallel-plan.md and
> context/feedback-queue.md first. Then continue the non-decisional work only: Task 0 if not
> yet committed, then Tasks A, B, C, E, F from the plan in their own worktrees (create each
> from the integration branch, symlink node_modules to the main checkout, probe a subagent's
> shell first). Do NOT do Task D's non-billing headings, do not resolve any item in
> context/feedback-queue.md, and do not open or merge a PR. Append anything new that needs
> the owner's input to context/feedback-queue.md. Run typecheck + build after every merge.
> Commit as you go with the attribution trailer.
