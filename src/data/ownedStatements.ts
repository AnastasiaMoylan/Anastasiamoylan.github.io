/**
 * Ownership statements used by the résumé's 'Selected product ownership' bullets.
 *
 * Until 2026-09-03 these also fed each case study's flat `owned` list, so the
 * two surfaces could not drift. That list gave way to `ownedThemes`, and on
 * 2026-09-09 the themes gave way to each study's `scope.owned` paragraph,
 * which paraphrases these claims. If a statement here changes, check the
 * matching study's `scope.owned` in caseStudies.ts — a résumé that quietly
 * disagrees with the case study describing the same work is worse than
 * either document alone.
 */

export const FINANCE_PRODUCT_MODEL =
  "Led the product model for a governed enterprise-finance workspace connecting Workflow Builder, Sandbox, promotion gates, Production, and monitoring for accountants, analysts, managers/controllers, finance leaders, admins, and viewers.";

export const FINANCE_RESEARCH_ARTIFACTS =
  "Created PRDs, flows, role models, screeners, recruitment materials, training plans, and moderated research for a working POC.";

export const BILLING_OPERATIONAL_FLOW =
  "Mapped the complete operational flow across admins, accountants, engineers, owners, and reviewers, including missing evidence, failed automation, loading, validation, interim spreadsheet editing, handoffs, and recovery without loss of progress.";

export const BILLING_STATUS_MODEL =
  "Defined a reusable status model (Initiated, In Progress, Review, Approved, Finalized, Completed) with permissions, ownership, notifications, activity history, UAT sign-off, and audit-trail concepts.";

export const CCJ_HUMAN_REVIEW =
  "Preserved human control by requiring users to review and edit AI-assisted communication before delivery.";
