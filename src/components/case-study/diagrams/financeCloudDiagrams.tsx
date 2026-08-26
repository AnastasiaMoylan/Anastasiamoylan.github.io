import type { SectionAugments } from "../buildSections";
import ScalingArc from "./ScalingArc";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";

/**
 * The diagrams that exist as mockups, attached to the beats they explain.
 *
 * Solution carries the three that describe how the platform behaves: the whole
 * pipeline, then the two mechanisms that make its governance real — the
 * promotion gate, and the thresholds that decide when the system may act alone.
 * Results carries the scaling arc.
 *
 * Built but deliberately not wired, to keep the page from becoming a gallery:
 * CopilotPlan, AnomalyRouting, DesignedStates, InspectabilityLadder, RoleMatrix.
 * They live alongside this file and can be slotted in by adding a line below.
 * RoleMatrix additionally stays unpublished until its cell values are confirmed.
 */
export function financeCloudAugments(): SectionAugments {
  return {
    append: {
      solution: (
        <>
          <p className="m-0 max-w-[52rem] text-base leading-[1.7] text-muted-foreground">
            Beneath the suite’s front door, the analysis products run as one governed
            pipeline. Two mechanisms carry that governance in practice: the gate that controls
            promotion to production, and the thresholds that decide when the system may act on
            its own.
          </p>
          <GovernedPipeline />
          <PromotionGate />
          <ConfidenceThresholds />
        </>
      ),
      results: <ScalingArc />,
    },
  };
}
