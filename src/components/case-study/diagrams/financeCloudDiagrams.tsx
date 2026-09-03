import type { SectionAugments } from "../buildSections";
import SuiteMap from "./SuiteMap";
import FramingShift from "./FramingShift";
import GovernedPipeline from "./GovernedPipeline";
import PromotionGate from "./PromotionGate";
import ConfidenceThresholds from "./ConfidenceThresholds";
import VersionArc from "./VersionArc";

/**
 * One visual per beat (visual-storytelling skill):
 * Stakes gets the before/after suite map — the hero that answers "how big was
 * this really". Problem gets the framing evolution. Built keeps one craft zoom
 * (the promotion gate) plus the thresholds framework beside the decision it
 * embodies. The full governed pipeline moved to the deep dive. Results carries
 * the version arc: three versions, each redirected by research.
 *
 * Removed 2026-09-03: the taxonomy-sheet PlaceholderFigure ("Owner to supply")
 * — a visible placeholder on a live page. Reinstate as a real figure if the
 * sheet is cleared for publication. ScalingArc (10 -> 300 -> 1,000+ users) was
 * replaced by VersionArc because the 300 has no provenance.
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
      results: <VersionArc />,
    },
  };
}
