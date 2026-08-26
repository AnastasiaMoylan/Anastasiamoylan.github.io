import type { SectionAugments } from "../buildSections";
import PlaceholderFigure from "../PlaceholderFigure";
import SuiteMap from "./SuiteMap";
import FramingShift from "./FramingShift";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";
import ScalingArc from "./ScalingArc";

/**
 * One visual per beat (visual-storytelling skill):
 * Stakes gets the before/after suite map — the hero that answers "how big was
 * this really". Problem gets the framing evolution. Built keeps one craft zoom
 * (the promotion gate) plus the thresholds framework beside the decision it
 * embodies, and a visible placeholder for the influence artifact only the
 * owner can supply. The full governed pipeline moved to the deep dive.
 * Results keeps the scaling arc.
 *
 * Built but unwired: CopilotPlan, AnomalyRouting, DesignedStates,
 * InspectabilityLadder, RoleMatrix (unpublished until cell values confirmed).
 */
export function financeCloudAugments(): SectionAugments {
  return {
    append: {
      overview: <SuiteMap />,
      challenge: <FramingShift />,
      solution: (
        <>
          <PromotionGate />
          <ConfidenceThresholds />
          <PlaceholderFigure caption="The adopted artifact — the Category \u2192 Driver \u2192 Anchor Signal taxonomy sheet as product and engineering teams use it. Owner to supply." />
        </>
      ),
      "deep-dive": (
        <div className="flex flex-col gap-6">
          <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-tertiary-700">
            The governed pipeline, end to end
          </p>
          <GovernedPipeline />
        </div>
      ),
      results: <ScalingArc />,
    },
  };
}
