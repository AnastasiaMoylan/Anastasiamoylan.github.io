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
  on a table row instead of the column header they mean. They need tuning against the real
  asset once Task C renders them — a five-minute check in the browser.

## D. Things found on the way that are not in the plan

- [ ] **D1. `context/` is back.** The 2026-09-08 reorganisation dissolved a `context/` folder
  into `research/`. This one is committed (not gitignored) because you asked for
  `context/facts.md` as the single source of truth and a gitignored file dies with the
  worktree. If you would rather it live at `research/source/facts.md`, say so.
- [ ] **D2. Philosophy page figures.** `StatusFlowStrip` draws five status chips where
  `figures.billingStatusStates` is six, and the `~90%` in `AiStat` has no entry in
  `figures.ts`. Task E will align them to the figures file unless you say the page is right.
- [ ] **D3. Home-page figcaption** in `GovernanceChain.tsx` hard-names three studies; it
  will drift on the next rename. Not being changed; flagging.
- [ ] **D4. `llms.txt` and `resume.txt`** are already generated on every build; the plan
  adds no task for them. The README's work table is the surface that drifted, and Task F
  regenerates it from `projects.ts`.
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
