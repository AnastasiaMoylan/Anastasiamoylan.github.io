import type { ReactElement } from "react";

/** One rendered beat of the case-study framework, plus its nav label. */
export interface Section {
  id: string;
  nav: string;
  heading: string;
  content: ReactElement;
}
