import type { SectionAugments } from "../buildSections";
import SuiteMap from "./SuiteMap";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";
import VersionArc from "./VersionArc";

/**
 * One visual per beat. Overview gets the before/after suite map, the one
 * telling of the reframe in picture form. The turning point gets the version
 * arc, V1 -> V2 -> V3, beside the pivot paragraph it illustrates. Solution
 * keeps one craft zoom (the promotion gate) plus the thresholds framework.
 * The full governed pipeline sits behind a Details panel.
 *
 * Cut 2026-09-03: FramingShift, which told the reframe a second time in the
 * research section. Built but unwired: FramingShift, CopilotPlan,
 * AnomalyRouting, DesignedStates, InspectabilityLadder, RoleMatrix
 * (unpublished until cell values confirmed).
 */
export function financeCloudAugments(): SectionAugments {
  return {
    append: {
      overview: <SuiteMap />,
      turn: <VersionArc />,
      solution: (
        <>
          <PromotionGate />
          <ConfidenceThresholds />
        </>
      ),
    },
    panels: [{ title: "The governed pipeline, end to end", content: <GovernedPipeline /> }],
  };
}
