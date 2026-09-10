import type { ReactElement } from "react";

/**
 * The three parents a case study is grouped into, from the principal
 * framework (docs/case-study/2026-09-09-principal-framework-implementation.md).
 *
 * Reviewers scan for scope, judgment, and outcome before they read anything,
 * so the page answers those three in order: why the work mattered, what was
 * decided and why, what changed. Every child is always expanded — nothing on
 * the page is behind a disclosure.
 */
export type SectionGroupId = "framing" | "work" | "results";

/**
 * One rendered section of the case study, plus its nav label.
 *
 * `group` is which parent it sits under. The page draws the parents; this
 * file only says where each child belongs.
 */
export interface Section {
  id: string;
  group: SectionGroupId;
  nav: string;
  heading: string;
  content: ReactElement;
}
