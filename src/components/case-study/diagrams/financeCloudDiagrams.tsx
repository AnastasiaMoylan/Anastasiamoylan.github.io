import type { SectionAugments } from "../buildSections";
import SuiteMap from "./SuiteMap";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";
import VersionArc from "./VersionArc";
import ImageGallery from "../ImageGallery";
import type { CaseStudyImage } from "../../../data/caseStudies";
import operatingModel from "../../../assets/case-studies/gaf/operating-model.png?preview";
import operatingModelFull from "../../../assets/case-studies/gaf/operating-model.png";
import frontDoor from "../../../assets/case-studies/gaf/front-door-flow.png?preview";
import frontDoorFull from "../../../assets/case-studies/gaf/front-door-flow.png";

/**
 * The operating model as an org chart, appended to Scope and ownership: the one
 * visual on the site that shows direction without reporting lines. Drawn
 * 2026-09-08 with the diagram-design plugin (source .html beside the .png).
 */
const operatingModelFigure: CaseStudyImage = {
  src: operatingModel,
  fullSrc: operatingModelFull,
  width: 2400,
  height: 1502,
  alt: "Org chart: client program lead, product owner, and chief of staff feed intent to the program experience lead, who directs a research lead, a data-side lead, and four application designers owning one product each; a dashed accent arrow marks the staged research handoff from the research lead to the workflow-hub designer.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
  caption:
    "Direction across six designers without reporting lines: program-level calls held by me, application-level design owned by each product.",
};

/**
 * One visual per section, remapped 2026-09-09 when the page moved to the three
 * parents.
 *
 * The problem keeps the before/after suite map, the one telling of the reframe
 * in picture form, beside the reframing pull-quote it illustrates. Scope and
 * ownership gets the operating model. Everything else is evidence for a
 * decision, so it sits under Key decisions: the version arc for the pivot that
 * used to be its own Turning point section, the promotion gate and the
 * threshold model for the two decisions they show, and the end-to-end governed
 * pipeline, which was behind a closed Details panel until the disclosure went.
 *
 * Cut 2026-09-03: FramingShift, which told the reframe a second time in the
 * research section. Built but unwired: FramingShift, CopilotPlan,
 * AnomalyRouting, DesignedStates, InspectabilityLadder, RoleMatrix
 * (unpublished until cell values confirmed).
 */
/**
 * The homepage decision as a flow. It is the one figure on this study that
 * shows a person using the product rather than the system around them.
 */
const frontDoorFigure: CaseStudyImage = {
  src: frontDoor,
  fullSrc: frontDoorFull,
  width: 2400,
  height: 1502,
  alt: "A four-stage user flow. A person signs in; their access is resolved after login. The homepage then answers two questions at once: a personalized Your Apps area lists the products that person can actually use, and a discovery area shows the wider suite they cannot yet see, which is what research found people were missing. Choosing a product launches it in its own tab with its internal navigation intact, so independently built products keep shipping. Two rejected alternatives are recorded: a kitchen-sink catalog or a complex dashboard in place of a launcher, and embedding every product inside one shell.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "The homepage answers two questions at once: what you can use, and what else exists. Launching in a tab was a stated cost, not an oversight.",
};

export function financeCloudAugments(): SectionAugments {
  return {
    append: {
      problem: <SuiteMap />,
      scope: <ImageGallery images={[operatingModelFigure]} />,
      decisions: (
        <>
          <ImageGallery images={[frontDoorFigure]} />
          <VersionArc />
          <PromotionGate />
          <ConfidenceThresholds />
          <GovernedPipeline />
        </>
      ),
    },
  };
}
