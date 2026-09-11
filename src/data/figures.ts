/**
 * The figures the site repeats: every number that appears in more than one
 * place lives here once, with its provenance, and the copy that carries it
 * reads from this file. Change a figure here and every page follows.
 *
 * Provenance is in the comments. A figure without a verified source says so.
 * `llms.txt` and `resume.txt` are generated from this data at build time by
 * `textOutputs.ts`, so a figure changed here reaches them too — they were
 * hand-maintained until 2026-09-08 and had drifted.
 */
export const figures = {
  // Finance Cloud — Anastasia's own account, scorecard session v2 (§2, §4.4),
  // hackathon corrected 2026-09-03 from "30 users, 300 queries".
  hackathonUsers: "40+",
  hackathonAnalyses: "800+",
  financeCloudVersions: 3,
  financeCloudVersionsWord: "Three",
  researchEngagements: 4,
  researchEngagementsWord: "Four",
  programScale: "eight-figure",
  programScaleShort: "8-figure",
  // The Finance Cloud pilot-user figures (10 pilot users, 300 scaled, 1,000+
  // planned) were removed 2026-09-11 on Anastasia's instruction: she believes
  // the count is now about 700 but has not confirmed it. Restore a single
  // confirmed figure here when she has one (context/feedback-queue.md, G1).

  // Application-level designers Anastasia directs; not reports. Extraction
  // interview 2026-08-25.
  designersDirected: 6,
  designersDirectedWord: "six",
  designersDirectedTitle: "Six",
  // Finance Cloud and the billing workflow. CCJ was dropped from this count
  // 2026-09-03 (a showcase concept, never deployed).
  platformsFromZero: 2,

  // Billing workflow (CWO) — project record and the prioritization board.
  // A `billingAdoptionTarget: 100` lived here until 2026-09-08. Anastasia has
  // no record of setting a 100-user target, so it was removed rather than
  // restated with a weaker source; the user count is what's left.
  //
  // `billingMustHaveShipped: "12 of 21"` was removed 2026-09-09: the rewrite's
  // validated-proof list does not carry it, and a figure kept here with no
  // surface reading it is a figure waiting to drift.
  billingStatusStates: 6,
  // Confirmed by Anastasia 2026-09-11: 70 active users, and a backlog of a
  // few hundred billing packages, cleared (each package holds several
  // projects). Refresh the user count as it grows.
  billingActiveUsers: 70,
  billingActiveAsOf: "September 2026",
  billingActiveAsOfShort: "Sep 2026",
  billingBacklogSize: "a few hundred",

  // The philosophy page's principle 08 thesis, as a figure. Anastasia's own
  // estimate of how much of her work is AI-driven; it was typed straight into
  // the page until 2026-09-10. Not a measured figure.
  aiDrivenShare: "~90%",
} as const;
