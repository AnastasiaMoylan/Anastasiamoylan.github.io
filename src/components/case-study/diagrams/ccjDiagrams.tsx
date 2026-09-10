import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";
import threeRoleLoop from "../../../assets/case-studies/ccj/three-role-loop.png?preview";
import threeRoleLoopFull from "../../../assets/case-studies/ccj/three-role-loop.png";
import ccjScope from "../../../assets/case-studies/ccj/scope-ownership.png?preview";
import ccjScopeFull from "../../../assets/case-studies/ccj/scope-ownership.png";

/**
 * The one diagram this study carries: the three-role loop as a swimlane,
 * appended to Key decisions (2026-09-09; it hung off Solution until that
 * section went). The decisions describe the calls; the loop is the structure
 * they were made inside, so it closes the section.
 *
 * Drawn 2026-09-08 with the diagram-design plugin (source .html beside the
 * .png; plan in docs/case-study/case-study-diagrams.md).
 */
const loop: CaseStudyImage = {
  src: threeRoleLoop,
  fullSrc: threeRoleLoopFull,
  width: 2400,
  height: 1502,
  alt: "Swimlane with analyst, AI layer, customer, and representative lanes: detect risk, find the drop, choose action, AI drafts, a person edits and sends, the offer arrives, a chatbot handles routine cases, a sentiment gate hands off to a representative, and a declined offer loops back.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
  caption:
    "Three roles, one loop: the analyst decides, the customer receives, the representative resolves — and a person reviews before every send.",
};

/**
 * Two bands, not four. This study has no `scope` field yet, and nothing in the
 * record separates what was led from what was influenced — so the diagram draws
 * the two it can support rather than inventing the two it cannot. The fix is a
 * `scope` block in the data, not a redraw.
 */
const scope: CaseStudyImage = {
  src: ccjScope,
  fullSrc: ccjScopeFull,
  width: 2400,
  height: 1502,
  alt: "Two bands of involvement. At the core, what I owned outright on this engagement: the journey platform, connecting dynamic segmentation, churn signals, sentiment and NPS health, AI-assisted messaging, offer customization and performance monitoring; model output framed as decision support rather than an opaque score; the end-to-end mitigation flow from risk detection through launch and monitoring; and human control over AI messaging, required before anything reached a customer. The outer band is the cross-functional team the work sat inside: UX design, data science, marketing and CX, AI and NLP engineering, front-end and back-end engineering, and product owners.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "Four things owned outright, inside the six disciplines that built it. Naming the team is what makes the ownership claim checkable.",
};

export function ccjAugments(): SectionAugments {
  return {
    append: {
      scope: <ImageGallery images={[scope]} />,
      decisions: <ImageGallery images={[loop]} />,
    },
  };
}
