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
      // Execution reads as one argument: here is the whole pipeline, and here
      // are the two mechanisms that make its governance real. The lead orients
      // the reader before the first figure; the rules between figures mark the
      // step from the model down to each mechanism.
      execution: (
        <div className="flex flex-col">
          <p className="m-0 max-w-[52rem] text-base leading-[1.7] text-muted-foreground">
            The platform is one pipeline with governance sitting over every stage. Two mechanisms
            carry that governance in practice: the gate that controls promotion to production, and
            the thresholds that decide when the system may act on its own.
          </p>

          <div className="mt-12">
            <GovernedPipeline />
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <PromotionGate />
          </div>
        </div>
      ),
    },
    append: {
      // Confidence thresholds sit with the designed states rather than in
      // Execution: they are the same subject — what the system does when it is
      // unsure — and Execution was carrying 28% of the page's mobile height.
      states: <ConfidenceThresholds />,
      outcome: <ScalingArc />,
    },
  };
}
