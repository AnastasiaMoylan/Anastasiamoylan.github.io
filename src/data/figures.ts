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
  // Pilot scale. Removed 2026-09-03 as unsourced, restored 2026-09-09 on
  // Anastasia's explicit instruction ("keep these figures"). Her own account;
  // not read from a project record, which `impact.metricStatus` says on the
  // page. What "300" counts — provisioned, onboarded or active — is still
  // unconfirmed, and the 1,000+ is a plan rather than a delivery.
  financePilotUsers: 10,
  financeScaledUsers: 300,
  financePlannedUsers: "1,000+",

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
  // Anastasia's own account, 2026-09-09. Both were restated that day: the
  // count moved from "returning" to "active" users, and the backlog it cleared
  // is stated as a size rather than left implicit. Neither is read from the
  // project record, which `impact.metricStatus` says on the page. Refresh the
  // user count before publishing.
  billingActiveUsers: 70,
  billingActiveAsOf: "September 2026",
  billingActiveAsOfShort: "Sep 2026",
  billingBacklogSize: "a few hundred",
} as const;
