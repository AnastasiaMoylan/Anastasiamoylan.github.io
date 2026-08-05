import type { CaseStudy } from "../../data/caseStudies";
import type { Section } from "./types";
import ChallengeList from "./ChallengeList";
import OverviewSection from "./OverviewSection";
import SolutionSteps from "./SolutionSteps";
import ImageGallery from "./ImageGallery";
import PlaceholderFigure from "./PlaceholderFigure";
import ResultsSection from "./ResultsSection";
import DeepDive from "./DeepDive";

/**
 * Per-case-study additions, keyed by section id. `append` renders after a
 * section's default content, `replace` stands in for it entirely. Case studies
 * that pass nothing are unaffected.
 */
export interface SectionAugments {
  append?: Record<string, React.ReactNode>;
  replace?: Record<string, React.ReactNode>;
}

/**
 * Composes the page a hiring manager actually reads:
 * Overview -> Challenge -> Solution -> Results -> Deep dive.
 *
 * The order is deliberate. Everything above the deep dive is scannable in a
 * minute — headings, bullets, and three-step cards. Everything an interviewer
 * digs into (leadership and ownership, research, edge cases, decisions with
 * their rejected paths, reflection) sits behind a summary rather than competing
 * with the argument.
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

  if (content.overview) {
    sections.push({
      id: "overview",
      nav: "Overview",
      heading: "Overview",
      content: (
        <OverviewSection overview={content.overview} fields={content.snapshotFields} />
      ),
    });
  }

  if (content.evidence) {
    sections.push({
      id: "challenge",
      nav: "Challenge",
      heading: "The challenge",
      content: <ChallengeList evidence={content.evidence} />,
    });
  }

  if (content.solutionSteps && content.solutionSteps.length > 0) {
    // Visuals sit with the solution: a diagram augment when the study has coded
    // figures, its own screens when it has them, and a labelled placeholder
    // when it has neither — so a study never renders a solution with no picture.
    const visuals = content.images && content.images.length > 0
      ? <ImageGallery images={content.images} />
      : append.solution
        ? null
        : <PlaceholderFigure caption={content.visualsPendingNote ?? "Final visuals for this case study are in production."} />;

    sections.push({
      id: "solution",
      nav: "Solution",
      heading: "The solution",
      content: (
        <div className="flex flex-col gap-12">
          <SolutionSteps steps={content.solutionSteps} />
          {visuals}
        </div>
      ),
    });
  }

  if (content.impact) {
    sections.push({
      id: "results",
      nav: "Results",
      heading: "Results",
      content: <ResultsSection impact={content.impact} />,
    });
  }

  sections.push({
    id: "deep-dive",
    nav: "Deep dive",
    heading: "The deep dive",
    content: <DeepDive content={content} />,
  });

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
