import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";
import { diagramSvg } from "../../../data/diagramSvg";
import threeRoleLoopUrl from "../../../assets/case-studies/ccj/three-role-loop.svg";
import threeRoleLoopRaw from "../../../assets/case-studies/ccj/three-role-loop.svg?raw";
import ccjScopeUrl from "../../../assets/case-studies/ccj/scope-ownership.svg";
import ccjScopeRaw from "../../../assets/case-studies/ccj/scope-ownership.svg?raw";

/**
 * The three-role loop as a swimlane, appended to Key decisions. The decisions
 * describe the calls; the loop is the structure they were made inside, so it
 * closes the section. It also carries the whole end-to-end path, which is why
 * the study's separate user-flow board left the page on 2026-09-10: two
 * drawings of one path.
 *
 * Drawn 2026-09-08 with the diagram-design plugin (source .html beside the
 * .svg; plan in docs/case-study/case-study-diagrams.md). Inlined as SVG since
 * 2026-09-10, when the PNG exports were retired.
 */
const loop: CaseStudyImage = {
  src: threeRoleLoopUrl,
  fullSrc: threeRoleLoopUrl,
  inlineSvg: diagramSvg(threeRoleLoopRaw),
  width: 960,
  height: 600,
  alt: "Swimlane with analyst, AI layer, customer, and representative lanes: detect risk, find the drop, choose action, AI drafts, a person edits and sends, the offer arrives, a chatbot handles routine cases, a sentiment gate hands off to a representative, and a declined offer loops back.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
  caption:
    "Three roles, one loop: the analyst decides, the customer receives, the representative resolves, and a person reviews before every send.",
};

/**
 * Two bands, not four. Nothing in the record separates what was led from what
 * was influenced beyond the design lane, so the diagram draws the two it can
 * support rather than inventing the two it cannot. The fix is a fuller
 * `scope` block in the data, not a redraw.
 */
const scope: CaseStudyImage = {
  src: ccjScopeUrl,
  fullSrc: ccjScopeUrl,
  inlineSvg: diagramSvg(ccjScopeRaw),
  width: 960,
  height: 600,
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
