/**
 * The figures the site repeats: every number that appears in more than one
 * place lives here once, with its provenance, and the copy that carries it
 * reads from this file. Change a figure here and every page follows.
 *
 * Provenance is in the comments. A figure without a verified source says so;
 * `public/llms.txt` is a static file and has to be updated by hand.
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
  // Application-level designers Anastasia directs; not reports. Extraction
  // interview 2026-08-25.
  designersDirected: 6,
  designersDirectedWord: "six",
  designersDirectedTitle: "Six",
  // Finance Cloud and the billing workflow. CCJ was dropped from this count
  // 2026-09-03 (a showcase concept, never deployed).
  platformsFromZero: 2,

  // Billing workflow (CWO) — project record and the prioritization board.
  billingAdoptionTarget: 100,
  billingMustHaveShipped: "12 of 21",
  billingStatusStates: 6,
  // Anastasia, 2026-09-04. Return window and relation to the 100 unconfirmed;
  // stated as a count, not a rate.
  billingReturningUsers: 70,
  billingReturningAsOf: "September 2026",
  billingReturningAsOfShort: "Sep 2026",
} as const;
