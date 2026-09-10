import type { SectionGroupId } from "./types";

/**
 * The three parents, in order, with the anchor each one owns.
 *
 * `anchor` is separate from `id` so the URL reads as English ("#the-work")
 * while the code keys on a short union member. Ordinals are the site's
 * two-digit mono numbering, the same language the rail and the stat band use.
 *
 * The subtitle is the framework's own gloss on each part. It renders under the
 * parent name as a muted line, so a scanner gets the promise of the section
 * before any of its children.
 */
export interface SectionGroup {
  id: SectionGroupId;
  anchor: string;
  ordinal: string;
  title: string;
  subtitle: string;
}

export const SECTION_GROUPS: SectionGroup[] = [
  {
    id: "framing",
    anchor: "framing",
    ordinal: "01",
    title: "Framing",
    subtitle: "Why this work mattered",
  },
  {
    id: "work",
    anchor: "the-work",
    ordinal: "02",
    title: "The work",
    subtitle: "What I decided and why",
  },
  {
    id: "results",
    anchor: "results",
    ordinal: "03",
    title: "Results",
    subtitle: "What changed and what I learned",
  },
];
