import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";
import { diagramSvg } from "../../../data/diagramSvg";
import scopeUrl from "../../../assets/case-studies/di/scope-ownership.svg";
import scopeRaw from "../../../assets/case-studies/di/scope-ownership.svg?raw";

/**
 * The study's section-level figure: scope and ownership as four widening
 * bands, drawn 2026-09-09 with the diagram-design plugin (source `.html`
 * beside the `.svg`; see docs/case-study/case-study-diagrams.md). Inlined as
 * SVG since 2026-09-10, when the PNG exports were retired.
 *
 * The citation loop and the comparison modes are not here any more: each
 * proves one decision, so on 2026-09-10 they moved onto those decisions'
 * `images` in `caseStudies.ts`, where they render under the mechanism they
 * show. Alt text is lifted verbatim from the diagram's own `<desc>`.
 */
const scope: CaseStudyImage = {
  label: "Scope and ownership",
  src: scopeUrl,
  fullSrc: scopeUrl,
  inlineSvg: diagramSvg(scopeRaw),
  width: 960,
  height: 600,
  alt: "Four widening bands of involvement on the document AI platform. At the core, what I owned outright: the region-based layout across five breakpoints, citations, sources and the embedded viewer, and document selection, comparison, drafting and export — with the UX acceptance criteria engineering built against and the accessibility documentation written into the design source of truth. Around it, what I led: requirements and prioritization workshops, research planning, protocol development and synthesis, and living backlogs across two products. Beyond that, what I influenced outside the design lane: the Must, Should and Nice-to-have tiers with dated commitments, the compliance tool framed as a widget on shared rails, and the mandatory response template for comparison answers. The outermost band is the team the work sat inside. A note below records what I did not own: the model, the retrieval stack, and the data-source procurement.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "Four widening bands, and a line naming what I did not own. The model, the retrieval stack and the data-source procurement were somebody else's.",
};

export function diAugments(): SectionAugments {
  return {
    append: {
      scope: <ImageGallery images={[scope]} />,
    },
  };
}
