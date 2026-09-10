import type { SectionAugments } from "../buildSections";
import ScopeOwnershipDiagram from "./ScopeOwnershipDiagram";

/**
 * The one coded diagram this study carries. The status model and the product
 * screens are attached to the decisions they prove, in `caseStudies.ts`; this
 * one belongs to a section rather than a decision, so it arrives as an augment.
 */
export function cwoAugments(): SectionAugments {
  return {
    append: {
      scope: <ScopeOwnershipDiagram />,
    },
  };
}
