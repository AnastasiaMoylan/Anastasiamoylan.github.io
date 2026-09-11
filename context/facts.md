# Case-study facts — the single source of truth

**Purpose.** Every case study is written from this file, not inferred from earlier copy. A row
is usable only once its `Confirmed` cell is filled by Anastasia (a date, or a corrected value).
Until then the value is what the repo *currently claims*, with the file that claims it, so each
question is "confirm or correct" rather than "tell me from scratch".

**Publishable facts only.** This repo is public. Real client names, internal dates, and client
financial figures stay out of this file; the private record is `docs/source/` (gitignored).

**How to read a row.** `Repo says` is the value on the site or résumé today. `Also found` is any
other value the local notes carry. `State` is AGREE when every surface says the same thing and
CONFLICT when they do not. `Confirmed` is empty until Anastasia fills it.

Source keys: P = `src/data/projects.ts` · CS = `src/data/caseStudies.ts` · F = `src/data/figures.ts`
· R = `src/data/resume.ts` · OS = `src/data/ownedStatements.ts` · SN = `docs/source/case-studies/<slug>.md`
· RW = `docs/case-study/rewrites/*` · B = `docs/source/candidate-brief.md`

---

## Cross-study rules (decide once, apply everywhere)

| Fact | Repo says | Also found | State | Confirmed |
|---|---|---|---|---|
| Employment title, current | `Lead Product Designer \| 2025–Present` (R) | `Lead Experience Designer` called "the employment title" (CS finance comment); B's rule: "Her title is always Lead Product Designer" | CONFLICT || 2026-09-11: Lead Product Designer at Amdocs (the résumé already says so) |
| Employment title, prior | `Senior Experience Designer \| July 2021–July 2025` (R) | Lead start month "Jul 2025 was assumed, never confirmed" (B, RW-fc) | CONFLICT | |
| Résumé tagline | `Lead Product Designer \| Developer Platforms, Enterprise Systems & Partner Experiences` (R) | B marks the "Developer Platforms…" tagline as superseded, do not reuse | CONFLICT | |
| Client descriptor wording | Three studies: `Confidential enterprise telecommunications organization`; CCJ: `Confidential telecommunications company` | SN-fc: `Confidential Fortune 500 telecommunications company` | CONFLICT (wording) | |
| NDA split between résumé and portfolio | Résumé currently names no client; portfolio anonymises all | B says the résumé may name two carriers (approved 2026-08-11) and the portfolio must not — "keep the divergence" | OPEN | |
| Unpublishable on purpose | The forecast-gap dollar figure; program-increment dates; the two-hour workshop story ("300 target queries, two weeks") unattributed | — | AGREE | |
| Git history purge of the public repo | — | B asks whether it was actually executed | OPEN | |

---

## 1. An Auditable Billing Workflow — `auditable-billing-workflow`

| Fact | Repo says | Also found | State | Confirmed |
|---|---|---|---|---|
| Project name | `An Auditable Billing Workflow` (P, RW-cwo); internal short name CWO | Résumé sub-job: `Custom Work Orders` (R) | CONFLICT (soft) | |
| Dates | `2024–2025` (CS, R, RW-cwo) | SN: "one-year engagement". Open: the planned 31 August release — did it happen, and which year | AGREE (release date open) | |
| Role | `Product Lead and Design Contributor` (P, CS, RW-cwo) | Résumé: `Design Lead and UX / Product Strategy Lead`; SN: `Lead Designer, then Design Lead and UX / Product Strategy Lead` | CONFLICT || 2026-09-11: keep. It is the engagement role; the résumé's title differs on purpose |
| Principal designer | "sat with the engagement in a consulting role" (CS, RW-cwo) | SN: design leadership "after the principal designer rolled off" | CONFLICT | |
| Team composition | `CWO team with the client's Chief Data Office, product, engineering, and UI development` (CS); RW adds data team lead, finance and operations stakeholders | No headcount anywhere | COMPOSED, no size | |
| Team size | — | — | MISSING | |
| User roles | Admins, accountants, engineers (CS) | Design file has permission sections for Admin, BP owner, Accountant, Engineer, Collections (RW-cwo) | CONFLICT (undercount?) | |
| Shipped | `MVP 1 released and in use; MVP 1.5 in progress` (P, CS) | RW: "+ MVP 2 upcoming"; SN: `Completed, in steady use`; résumé: "completed first MVP … plus a phased roadmap" | CONFLICT || 2026-09-11: Released (site, card, snapshot) |
| Designed, not shipped | Reporting dashboard (backlog); in-product editing (Excel interim); whole-package automation; document integration | SN says the dashboard "shipped later" | CONFLICT | |
| Six-state status model | `Initiated, In Progress, Review, Approved, Finalized, Completed` (OS, F, CS stat band) | RW-cwo: "Initiated, Approved, and Completed appear in no top-level label" in the design file — open the status component before it ships | CONFLICT — largest risk | |
| Users figure | `70 active users, September 2026` — own count, not project record (F, CS) | SN: `70 returning users … return window not defined`; recharacterised 2026-09-09 without a new source | CONFLICT || 2026-09-11: 70 active users, confirmed |
| Backlog figure | `Cleared a backlog of a few hundred billing packages` — own account (CS, F) | B: "unblocked recovery … volume itself unverified"; SN: size "lost, to recover from PO or program records" | CONFLICT || 2026-09-11: a few hundred billing packages, cleared; each package holds several projects |
| KPI set at kickoff | `+20% submission rate`, measurable from status timestamps, not yet measured (CS) | — | AGREE | |
| Removed figures | `100-user target reached` and `12 of 21 must-haves shipped` removed from the site 2026-09-09 | Both still in SN | AGREE (removed) | |
| Adoption by other projects | "The approval flow has since been picked up by other projects" — count unconfirmed (CS, RW) | RW: "confirm the count (one or two)" | OPEN | |
| Research | Ten participants across three user groups (CS, RW) | "New to the site. Nothing in the earlier project record states them" (CS comment) | UNVERIFIED | |
| Client descriptor | `Confidential enterprise telecommunications organization`; domain: highway-construction billing against state transportation agency submissions under federal rules | Whether the federal/state detail is publishable is open (RW, SN) | OPEN | |

## 2. Finance Cloud — `finance-cloud`

| Fact | Repo says | Also found | State | Confirmed |
|---|---|---|---|---|
| Project name | `Finance Cloud` (P, CS, RW-fc); retired slug `governed-ai-finance-workspace` | Résumé: `Finance Transformation / CFO.ai`; B: is "Finance Cloud" publishable or client-owned? | CONFLICT + OPEN | |
| Dates | `2024–Present` (CS, RW-fc) | Résumé: `2025–2026`; RW-fc: "2024–Present was assumed … confirm the engagement start" | CONFLICT | |
| Role | `Product Experience Lead` (P, CS) | Résumé: `Lead UX / Product Designer`; RW-fc: `Lead Product Designer`; CS comment calls this "the fifth title in play" | CONFLICT || 2026-09-11: keep Product Experience Lead |
| Team composition | `Product, engineering, ML engineering and AI research, data, finance and compliance stakeholders` (CS) | RW adds "lead product owner as the zero-to-one partner"; is ML engineering/AI research one group or two | OPEN | |
| Team size | Six application-level designers directed, not reports (F) | No headcount for the wider team | PARTIAL | |
| User roles | Accountants, analysts, managers and controllers, finance leaders, admins, viewers (CS) | RW: confirm against what was built | OPEN | |
| Shipped | `V3 of the analysis platform in testing; unified homepage MVP in development` (P, CS) | SN: `Active; V3 in testing`; RW: `Working POC delivered; scaled pilot in progress` | CONFLICT || 2026-09-11: ongoing program, multiple MVPs out, some in testing, some in production. Wording on the site is authored; sign-off open (G2) |
| Designed, not shipped | Component library: "a starter with no dev implementation and no owner. Intent, not proof" (SN) | — | AGREE | |
| Payroll in scope | Named in product framing (CS) | B: "Was payroll genuinely in Finance Cloud's scope at the depth described?" — the detail most likely probed in interview | OPEN | |
| Hackathon figures | `40+ users, 800+ analyses` — own account (F) | SN: "not in the record; '40 signed up for MVP feedback' is the nearest match"; an earlier version said 30 users / 300 queries | CONFLICT | |
| Pilot arc | `10 pilot users → 300 → 1,000+ planned` — own account, restored 2026-09-09 on instruction; what 300 counts is unconfirmed; 1,000+ is a plan (F, CS) | — | AGREE (as caveated) || 2026-09-11: removed from the site. Owner believes about 700 users now, unconfirmed (G1) |
| Research engagements | `4` (F, CS) | SN: tracker says 2 formal, 30 planned, OKR 15 — "pick a definition" | CONFLICT | |
| Success metric | "None defined at the outset" (CS framing) | SN: the program ran adoption OKRs from March 2026 | CONFLICT | |
| Which figure leads | Stat band: hackathon; claim and Outcome: pilot arc | Open question 3 in the plan | OPEN | |
| Leadership "is redirecting" | Present tense in reflection | SN: decision still pending in September — soften | OPEN | |
| Client descriptor | `Confidential enterprise telecommunications organization` (CS, RW) | SN: `Confidential Fortune 500 telecommunications company`. Do not infer the client from any other source (B) | CONFLICT (wording) | |

## 3. A Verifiable Document AI Platform — `enterprise-document-knowledge`

| Fact | Repo says | Also found | State | Confirmed |
|---|---|---|---|---|
| Project name | `A Verifiable Document AI Platform` (P, RW-doc) | Prior site titles: `Verifiable AI Answers`, `A Tailorable Enterprise AI Platform`; SN: `A Tailorable Enterprise AI Platform (Document AI)`; résumé: `Document Insights / Enterprise Knowledge LLM` | CONFLICT — four variants | |
| Dates | `2025` (CS, R) | RW: design complete end Feb, engineering onboarded 1 Mar, PoC targeted end June — "from planning boards, not a delivery record" | AGREE on year; milestones unverified | |
| Role | `Lead Experience Designer — UX and product strategy lead` (P, CS, RW-doc) | Résumé and SN: `UX and Product Strategy Lead` | CONFLICT || 2026-09-11: Lead Product Designer, UX and product strategy lead |
| Team composition | `Design, product, engineering, research, and client stakeholders across two or more time zones` (CS, RW) | No headcount; "two or more time zones" is vague | COMPOSED, no size | |
| Team size | — | — | MISSING | |
| Shipped | `Multi-phase accelerator and product development; production status to confirm` (P, CS, RW) | SN: "shipment and adoption not verified"; what is evidenced is specification to acceptance-criteria depth, not shipment | OPEN || 2026-09-11: Released |
| Compliance widget | "reframed … prototype scoped for review" (CS) | RW: was it built at all | OPEN | |
| Dropped claims | Tab-navigation reversal and save-as-privacy-action dropped from the study as unsupported (CS) | Both still asserted on the résumé (R) and in SN | CONFLICT | |
| April approval | "reviewed and approved with the team in April" (CS) | Recorded on the board as a team review — confirm it was a formal sign-off | OPEN | |
| Metrics | None published; stat band is design outputs: 2 comparison modes, 5 breakpoints, 7 layout regions, 1 shared framework (CS) | SN lists a different set: 4 findings that changed direction, 2 comparison modes, 1 workspace | CONFLICT | |
| Research participants | Ten — published only as unverified, inside the method line (CS) | B: "count and attribution unverified, do not use publicly" | UNVERIFIED | |
| `measureNext` | Absent — the only study without one | SN: the author would use verification rate | MISSING | |
| `claim` (h1) | Absent — h1 falls back to the overview result line | — | MISSING | |
| Visuals | `visualsPending: true` — no NDA-safe visual cleared (RW) | — | OPEN | |
| Client descriptor | `Confidential enterprise telecommunications organization` (CS, SN, RW) | Everything else anonymised, including the internal use-case identifier | AGREE | |

## 4. The Connected Customer Journey — `connected-customer-journey`

| Fact | Repo says | Also found | State | Confirmed |
|---|---|---|---|---|
| Project name | `The Connected Customer Journey` (P, SN); résumé `Connected Customer Journey (Telecommunications)` | — | AGREE | |
| Dates | `2024–2025` (CS, SN, R) | — | AGREE | |
| Role | `Senior UX Designer, leading design on the engagement` (P, CS, R) | SN: `Lead UX Designer` (not updated after the 2026-09-04 alignment) | CONFLICT (stale note) | |
| Team composition | `UX design, data science, marketing and CX, AI/NLP engineering, front-end and back-end engineering, and product owners` (CS) — composed, needs sign-off | No headcount; Users row lists four groups while the stat band says 3 roles | COMPOSED, no size | |
| Team size | — | — | MISSING | |
| Shipped | `Showcase concept, not deployed to customers` (P, CS, SN, F) | B still asks: concept, POC, pilot, or production? | AGREE on site; B open | |
| Venue | Presented publicly; naming the venue (AWS re:Invent 2024) pending employer permission (CS) | — | OPEN | |
| Metrics | None — no churn, conversion, adoption or revenue figure exists and none should be implied (CS, SN, B) | Stat band is design outputs: 3 roles, 6 surfaces, human review required | AGREE | |
| Rewrite document | None exists; `scope.led` and `scope.influenced` left absent rather than invented | The h1 claim, overview lines, product-framing close and HMW are composed and flagged | MISSING | |
| Client descriptor | `Confidential telecommunications company` (CS, SN); page copy says "operator", card says "client" | — | AGREE (wording drift) | |

---

## Interview order

One question at a time, in this order, each phrased as "the repo says X — confirm or correct":

1. Cross-study: the one role/title decision (employment title, and the four engagement roles, settled together with the résumé).
2. Billing: shipped status and the six-state vocabulary, then 70 active vs returning, then the backlog figure, then team size and the principal-designer story.
3. Finance Cloud: engagement dates, then which figure leads, then the hackathon source, then payroll scope, then team size.
4. Document AI: canonical title, then shipped status and the widget, then `measureNext` and a claim line, then team size.
5. Customer Journey: team size, the venue permission, and whether an HMW / influence block can be stated at all.
