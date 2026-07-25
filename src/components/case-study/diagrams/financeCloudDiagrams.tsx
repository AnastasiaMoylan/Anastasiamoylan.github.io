import type { SectionAugments } from "../buildSections";
import ScalingArc from "./ScalingArc";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";

/**
 * Four diagrams, one per section, so no beat carries more than a single figure
 * and the prose stays readable between them. These are the four that exist as
 * mockups; each maps to the beat it explains.
 *
 * Built but deliberately not wired, to keep the page from becoming a gallery:
 * CopilotPlan, AnomalyRouting, DesignedStates, InspectabilityLadder, RoleMatrix.
 * They live alongside this file and can be slotted in by adding a line below.
 * RoleMatrix additionally stays unpublished until its cell values are confirmed.
 */
export function financeCloudAugments(): SectionAugments {
  return {
    replace: {
      // Supersedes the raster end-to-end flow.
      execution: <GovernedPipeline />,
    },
    append: {
      // Execution carries the "how it works" diagrams: the overall model first,
      // then the two mechanisms it depends on.
      execution: (
        <>
          <PromotionGate />
          <ConfidenceThresholds />
        </>
      ),
      outcome: <ScalingArc />,
    },
  };
}
