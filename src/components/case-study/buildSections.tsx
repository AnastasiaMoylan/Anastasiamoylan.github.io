import type { CaseStudy } from "../../data/caseStudies";
import type { Section } from "./types";
import EvidenceTable from "./EvidenceTable";
import ImageGallery from "./ImageGallery";
import KeyDecisions from "./KeyDecisions";
import OutcomeSection from "./OutcomeSection";
import OverviewSection from "./OverviewSection";
import ProblemSection from "./ProblemSection";
import ProductFraming from "./ProductFraming";
import ScopeOwnership from "./ScopeOwnership";
import StatesRecovery from "./StatesRecovery";
import WhatILearned from "./WhatILearned";

/**
 * Per-case-study additions, keyed by section id. `append` renders after a
 * section's default content and `replace` stands in for it entirely. Case
 * studies that pass nothing are unaffected.
 *
 * `panels` went with the Details disclosure on 2026-09-09. A diagram that used
 * to sit behind a summary now appends to the section whose claim it carries.
 */
export interface SectionAugments {
  append?: Record<string, React.ReactNode>;
  replace?: Record<string, React.ReactNode>;
}

/**
 * Page structure (revised 2026-09-09, see
 * research/sessions/2026-09-09-principal-framework-implementation.md).
 *
 * Three parents, eight children, everything always expanded:
 *
 *   01 Framing, why this work mattered
 *      Overview -> Product framing -> The problem
 *   02 The work, what I decided and why
 *      Scope and ownership -> Key decisions -> Evidence
 *   03 Results, what changed and what I learned
 *      Outcome -> What I learned
 *
 * The parents are drawn by `CaseStudyPage`; this file only says which parent
 * each child belongs to. Section headings are plain nouns, identical on every
 * study, so a study's own sub-headings carry the specifics.
 *
 * Replaced the two-layer trailer/proof order of 2026-09-04. Three changes are
 * worth knowing because they removed page sections rather than moving them:
 * the turning point is a numbered decision, since a pivot is a decision and
 * the framework has one place for those; the solution is absorbed into the
 * overview's approach line and the ownership block; and the Details
 * disclosure is gone, because key decisions and evidence are what a reviewer
 * came for and they were sitting behind a click.
 *
 * Sections whose data is absent don't render, so a study can ship partially
 * filled without showing empty headings.
 *
 * The transitional fallbacks that rendered the pre-2026-09-09 fields went
 * with the last migration, the same day. There is one shape now.
 */
export default function buildSections(
  content: CaseStudy,
  augments: SectionAugments = {},
): Section[] {
  const { append = {}, replace = {} } = augments;
  const sections: Section[] = [];

  if (content.overview) {
    sections.push({
      id: "overview",
      group: "framing",
      nav: "Overview",
      heading: "Overview",
      content: <OverviewSection overview={content.overview} />,
    });
  }

  const hasFraming = !!content.framing && content.framing.length > 0;
  if (content.productFraming || hasFraming) {
    sections.push({
      id: "product-framing",
      group: "framing",
      nav: "Product framing",
      heading: "Product framing",
      content: (
        <ProductFraming productFraming={content.productFraming} framing={content.framing} />
      ),
    });
  }

  const insight = content.evidence?.insight;
  const hasConstraints = !!content.constraints && content.constraints.length > 0;
  if (content.hmw || hasConstraints || insight) {
    sections.push({
      id: "problem",
      group: "framing",
      nav: "The problem",
      heading: "The problem",
      content: (
        <ProblemSection hmw={content.hmw} constraints={content.constraints} insight={insight} />
      ),
    });
  }

  if (content.scope) {
    sections.push({
      id: "scope",
      group: "work",
      nav: "Scope and ownership",
      heading: "Scope and ownership",
      content: <ScopeOwnership scope={content.scope} />,
    });
  }

  if (content.decisions.length > 0) {
    /*
      The decisions lead. Three kinds of evidence follow under their own
      labels, because each belongs to the section rather than to one decision:
      study-level figures (a whole-flow diagram), the states table, and the
      process flows. A figure that proves one decision is on that decision's
      `images` and renders inside the list instead.
    */
    const hasImages = !!content.images && content.images.length > 0;
    const hasStates = !!content.states && content.states.length > 0;
    const hasProcessImages = !!content.processImages && content.processImages.length > 0;

    sections.push({
      id: "decisions",
      group: "work",
      nav: "Key decisions",
      heading: "Key decisions",
      content: (
        <div className="flex flex-col gap-12">
          <KeyDecisions decisions={content.decisions} />
          {hasImages && <ImageGallery images={content.images!} />}
          {hasStates && (
            <div>
              <h4 className="m-0 mb-4 text-label font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                Edge cases and recovery
              </h4>
              <StatesRecovery states={content.states!} />
            </div>
          )}
          {hasProcessImages && (
            <div>
              <h4 className="m-0 mb-4 text-label font-semibold uppercase tracking-[0.09em] text-muted-foreground">
                The flows behind the screens
              </h4>
              <ImageGallery images={content.processImages!} />
            </div>
          )}
        </div>
      ),
    });
  }

  const hasFindings = !!content.evidence?.findings?.length || !!content.evidence?.body;
  if (content.evidence && hasFindings) {
    sections.push({
      id: "evidence",
      group: "work",
      nav: "Evidence",
      heading: "Evidence",
      content: <EvidenceTable evidence={content.evidence} />,
    });
  }

  if (content.impact) {
    sections.push({
      id: "outcome",
      group: "results",
      nav: "Outcome",
      heading: "Outcome",
      content: <OutcomeSection impact={content.impact} />,
    });
  }

  if (content.reflection) {
    sections.push({
      id: "learned",
      group: "results",
      nav: "What I learned",
      heading: "What I learned",
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
