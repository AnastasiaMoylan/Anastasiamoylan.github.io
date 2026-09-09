import type { ReactElement } from "react";

/**
 * One rendered section of the case study, plus its nav label.
 *
 * `layer` is which half of the two-layer page it belongs to: the trailer a
 * screener reads in five minutes, or the proof a hiring manager reads next.
 * The rail draws the break between them.
 */
export interface Section {
  id: string;
  layer: "trailer" | "proof";
  nav: string;
  heading: string;
  content: ReactElement;
}
