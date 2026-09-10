import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";
import { diagramSvg } from "../../../data/diagramSvg";
import scopeUrl from "../../../assets/case-studies/cwo/scope-ownership.svg";
import scopeRaw from "../../../assets/case-studies/cwo/scope-ownership.svg?raw";

/**
 * The study's one section-level figure: scope and ownership as four widening
 * bands, under Scope and ownership. Owned is the maroon core; Led, Influenced
 * beyond the design lane, and Worked with ring it outward, each band fainter
 * than the one inside it. Nesting is the one layout that shows "contributed"
 * and "led" are different words without asserting it.
 *
 * Drawn 2026-09-09 with the diagram-design plugin; every line of text is
 * Anastasia's own from the Scope and ownership section of the CWO
 * principal-framework document. It was hand-ported to a React component
 * (`ScopeOwnershipDiagram.tsx`) until 2026-09-10, when every diagram moved to
 * the same inlined-SVG path and the second copy, which had already drifted
 * from the export, was deleted.
 *
 * The status model and the product screens are attached to the decisions
 * they prove, in `caseStudies.ts`. The four review user stories that used to
 * hang under Evidence left the page 2026-09-10 in the image cut: a board of
 * stories is a record, not a figure that proves a decision.
 */
const scope: CaseStudyImage = {
  src: scopeUrl,
  fullSrc: scopeUrl,
  inlineSvg: diagramSvg(scopeRaw),
  width: 960,
  height: 600,
  alt: "Four widening bands of involvement on the billing workflow. At the core, what I owned outright: product definition and scope, the ten-stage decomposition and status model, and development-ready flows with error-condition wireframes. Around it, what I led: requirements workshops, prioritization, and moderated usability research. Beyond that, what I influenced outside the design lane: backlogs, roadmaps, test plans, decision logs, quality gates, and the scope calls on the dashboard and the interim editing path. The outermost band is the team the work sat inside.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-10 with the re-wiring.
  caption:
    "Four widening bands. Control falls as the band widens, and the approval flow is the one claim that escaped the design lane.",
};

export function cwoAugments(): SectionAugments {
  return {
    append: {
      scope: <ImageGallery images={[scope]} />,
    },
  };
}
