import type { SectionAugments } from "../buildSections";
import SuiteMap from "./SuiteMap";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";
import VersionArc from "./VersionArc";
import ImageGallery from "../ImageGallery";
import type { CaseStudyImage } from "../../../data/caseStudies";
import { diagramSvg } from "../../../data/diagramSvg";
import operatingModelUrl from "../../../assets/case-studies/gaf/operating-model.svg";
import operatingModelRaw from "../../../assets/case-studies/gaf/operating-model.svg?raw";

/**
 * The operating model as an org chart, appended to Scope and ownership: the one
 * visual on the site that shows direction without reporting lines. Drawn
 * 2026-09-08 with the diagram-design plugin (source .html beside the .svg);
 * inlined as SVG since 2026-09-10, when the PNG exports were retired.
 */
const operatingModelFigure: CaseStudyImage = {
  src: operatingModelUrl,
  fullSrc: operatingModelUrl,
  inlineSvg: diagramSvg(operatingModelRaw),
  width: 960,
  height: 600,
  alt: "Org chart: client program lead, product owner, and chief of staff feed intent to the program experience lead, who directs a research lead, a data-side lead, and four application designers owning one product each; a dashed accent arrow marks the staged research handoff from the research lead to the workflow-hub designer.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
  caption:
    "Direction across six designers without reporting lines: program-level calls held by me, application-level design owned by each product.",
};

/**
 * One visual per section. The problem keeps the before/after suite map beside
 * the reframing pull-quote it illustrates; Scope and ownership gets the
 * operating model; everything else is evidence for a decision and sits under
 * Key decisions: the version arc for the pivot, the promotion gate and the
 * threshold model for the two decisions they show, and the end-to-end
 * governed pipeline.
 *
 * The front-door flow is not here: it is attached to the homepage decision in
 * `caseStudies.ts`, beside the claim it proves.
 *
 * Built but unwired: FramingShift, CopilotPlan, AnomalyRouting,
 * DesignedStates, InspectabilityLadder, RoleMatrix (unpublished until cell
 * values are confirmed).
 */
export function financeCloudAugments(): SectionAugments {
  return {
    append: {
      problem: <SuiteMap />,
      scope: <ImageGallery images={[operatingModelFigure]} />,
      decisions: (
        <>
          <VersionArc />
          <PromotionGate />
          <ConfidenceThresholds />
          <GovernedPipeline />
        </>
      ),
    },
  };
}
