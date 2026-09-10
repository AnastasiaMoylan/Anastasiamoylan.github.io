import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";
import ScopeOwnershipDiagram from "./ScopeOwnershipDiagram";
import reviewStories from "../../../assets/case-studies/cwo/review-stories.jpg?preview";
import reviewStoriesFull from "../../../assets/case-studies/cwo/review-stories.jpg";

/**
 * The study's section-level figures. The status model and the product
 * screens are attached to the decisions they prove, in `caseStudies.ts`;
 * these two belong to a section rather than a decision, so they arrive as
 * augments: the coded ownership diagram under Scope and ownership, and the
 * four review user stories under Evidence, since they are the record the
 * review flow was built against rather than a step of it.
 */
const stories: CaseStudyImage = {
  src: reviewStories,
  fullSrc: reviewStoriesFull,
  width: 1310,
  height: 2279,
  displayScale: 0.5,
  alt: "Four user stories on cards. An editor wants to start a review so that they can make edits, so the content matches what is sent in the final billing package. An editor wants to save progress from a review session, for the same reason. An editor wants to complete a review and assign the billing package to the next reviewer or owner, so the package can be finalized. A viewer wants to view an existing billing package and see the status of the review, its details and the bill of charges, to understand its current state and contents. All four are marked priority: necessary.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "The four stories the review flow was built against — three for the editor, one for the viewer, all necessary.",
};

export function cwoAugments(): SectionAugments {
  return {
    append: {
      scope: <ScopeOwnershipDiagram />,
      evidence: <ImageGallery images={[stories]} />,
    },
  };
}
