import type { CaseStudy, SectionId } from "../../data/caseStudyTypes";
import type { Section } from "./types";
import AnnotatedFigure from "./AnnotatedFigure";
import EvidenceTable from "./EvidenceTable";
import ImageGallery from "./ImageGallery";
import KeyDecisions from "./KeyDecisions";
import OutcomeSection from "./OutcomeSection";
import OverviewSection from "./OverviewSection";
import ParkingLot from "./ParkingLot";
import ProblemSection from "./ProblemSection";
import ProductFraming from "./ProductFraming";
import ScopeOwnership from "./ScopeOwnership";
import StatesRecovery from "./StatesRecovery";
import WhatILearned from "./WhatILearned";

/**
 * Per-case-study additions, keyed by section id. `append` renders after a
 * section's default content and `replace` stands in for it entirely. Case
 * studies that pass nothing are unaffected.
 */
export interface SectionAugments {
  append?: Record<string, React.ReactNode>;
  replace?: Record<string, React.ReactNode>;
}

/**
 * The plain-noun name of each child. It is the navigation label and the
 * fallback heading for a study that has not written its own claim for the
 * section.
 */
const NOUN: Record<SectionId, string> = {
  overview: "Overview",
  "product-framing": "Product framing",
  problem: "The problem",
  scope: "Scope and ownership",
  decisions: "Key decisions",
  parked: "What did not make the release",
  evidence: "Evidence",
  outcome: "Outcome",
  learned: "What I learned",
};

/**
 * Page structure (Layout C, 2026-09-09; framework in
 * docs/case-study/principal-ux-case-study-framework.md).
 *
 * Three parents, nine children, everything always expanded:
 *
 *   01 Framing, why this work mattered
 *      Overview -> Product framing -> The problem
 *   02 The work, what I decided and why
 *      Scope and ownership -> Key decisions -> What did not make the release -> Evidence
 *   03 Results, what changed and what I learned
 *      Outcome -> What I learned
 *
 * The parents are drawn by `CaseStudyPage`; this file says which parent each
 * child belongs to and what it is headed. The three parent names are constant
 * on every study. A child's heading is the study's own claim or question for
 * that section when `headings` carries one, and its plain noun otherwise; the
 * problem's default is the study's how-might-we line, since that is already
 * the question the section answers. Headings do the arguing so the paragraphs
 * only have to supply evidence, which is what keeps the prose short.
 *
 * Sections whose data is absent don't render, so a study can ship partially
 * filled without showing empty headings.
 */
export default function buildSections(
  content: CaseStudy,
  augments: SectionAugments = {},
): Section[] {
  const { append = {}, replace = {} } = augments;
  const sections: Section[] = [];
  const heading = (id: SectionId, fallback = NOUN[id]) => content.headings?.[id] ?? fallback;

  if (content.overview) {
    sections.push({
      id: "overview",
      group: "framing",
      nav: NOUN.overview,
      heading: heading("overview"),
      content: <OverviewSection overview={content.overview} />,
    });
  }

  const hasFraming = !!content.framing && content.framing.length > 0;
  if (content.productFraming || hasFraming) {
    sections.push({
      id: "product-framing",
      group: "framing",
      nav: NOUN["product-framing"],
      heading: heading("product-framing"),
      content: (
        <ProductFraming productFraming={content.productFraming} framing={content.framing} />
      ),
    });
  }

  const insight = content.evidence?.insight;
  const hasConstraints = !!content.constraints && content.constraints.length > 0;
  if (content.hmw || hasConstraints || insight) {
    // The how-might-we is the heading unless the study wrote a different one,
    // in which case it prints inside the section instead. Never both.
    const problemHeading = heading("problem", content.hmw ?? NOUN.problem);
    const hmwInBody = problemHeading === content.hmw ? undefined : content.hmw;
    sections.push({
      id: "problem",
      group: "framing",
      nav: NOUN.problem,
      heading: problemHeading,
      content: (
        <ProblemSection hmw={hmwInBody} constraints={content.constraints} insight={insight} />
      ),
    });
  }

  if (content.scope) {
    sections.push({
      id: "scope",
      group: "work",
      nav: NOUN.scope,
      heading: heading("scope"),
      content: <ScopeOwnership scope={content.scope} />,
    });
  }

  if (content.decisions.length > 0) {
    /*
      The decisions lead. Four kinds of evidence follow under their own
      labels, because each belongs to the section rather than to one decision:
      study-level figures (a whole-flow diagram), the annotated screen, the
      states table, and the process flows. A figure that proves one decision
      is on that decision's `images` and renders inside its card instead.
    */
    const hasImages = !!content.images && content.images.length > 0;
    const hasStates = !!content.states && content.states.length > 0;
    const hasProcessImages = !!content.processImages && content.processImages.length > 0;

    sections.push({
      id: "decisions",
      group: "work",
      nav: NOUN.decisions,
      heading: heading("decisions"),
      content: (
        <div className="flex flex-col gap-12">
          <KeyDecisions decisions={content.decisions} />
          {hasImages && <ImageGallery images={content.images!} />}
          {content.annotated && <AnnotatedFigure figure={content.annotated} />}
          {hasStates && (
            <div>
              <h4 className="m-0 mb-4 font-mono text-label font-semibold uppercase tracking-[0.09em] text-tertiary-700">
                Edge cases and recovery
              </h4>
              <StatesRecovery states={content.states!} />
            </div>
          )}
          {hasProcessImages && (
            <div>
              <h4 className="m-0 mb-4 font-mono text-label font-semibold uppercase tracking-[0.09em] text-tertiary-700">
                The flows behind the screens
              </h4>
              <ImageGallery images={content.processImages!} />
            </div>
          )}
        </div>
      ),
    });
  }

  if (content.parked && content.parked.length > 0) {
    sections.push({
      id: "parked",
      group: "work",
      nav: NOUN.parked,
      heading: heading("parked"),
      content: <ParkingLot parked={content.parked} />,
    });
  }

  const hasFindings = !!content.evidence?.findings?.length || !!content.evidence?.body;
  if (content.evidence && hasFindings) {
    sections.push({
      id: "evidence",
      group: "work",
      nav: NOUN.evidence,
      heading: heading("evidence"),
      content: <EvidenceTable evidence={content.evidence} />,
    });
  }

  if (content.impact) {
    sections.push({
      id: "outcome",
      group: "results",
      nav: NOUN.outcome,
      heading: heading("outcome"),
      content: <OutcomeSection impact={content.impact} />,
    });
  }

  if (content.reflection) {
    sections.push({
      id: "learned",
      group: "results",
      nav: NOUN.learned,
      heading: heading("learned"),
      content: <WhatILearned reflection={content.reflection} />,
    });
  }

  return sections.map((section) => {
    const replacement = replace[section.id];
    const addition = append[section.id];
    if (!replacement && !addition) return section;

    return {
      ...section,
      content: (
        <>
          {replacement ?? section.content}
          {addition && <div className="mt-16 flex flex-col gap-16">{addition}</div>}
        </>
      ),
    };
  });
}
