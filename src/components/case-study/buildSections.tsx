import type { CaseStudy } from "../../data/caseStudies";
import type { Section } from "./types";
import ChallengeList from "./ChallengeList";
import OverviewSection from "./OverviewSection";
import LeadershipGrid from "./LeadershipGrid";
import SolutionSteps from "./SolutionSteps";
import ImageGallery from "./ImageGallery";
import PlaceholderFigure from "./PlaceholderFigure";
import ResultsSection from "./ResultsSection";
import FeaturedDecision, { pickFeaturedDecision } from "./FeaturedDecision";
import ResearchTeam from "./ResearchTeam";
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
 * Overview -> Challenge -> My role -> Solution -> Research and team ->
 * Outcomes and metrics -> Deep dive.
 *
 * Headings are phrased as the questions a hiring manager asks (the Dovetail
 * pattern from the Mobbin research board); nav labels stay short nouns.
 *
 * The order mirrors how the studies themselves are written (2026-08-26
 * restructure): problem first, then the role claimed against it, then the
 * work, then how it was validated and with whom, then what it produced. The
 * featured decision renders inside the Solution rather than as its own
 * section — it is the call that shaped the solution, not a separate beat.
 * Everything an interviewer digs into (ownership detail, finding-by-finding
 * research, edge cases, the full decision list, reflection) still sits behind
 * a summary rather than competing with the argument.
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
      heading: "What was broken?",
      content: <ChallengeList evidence={content.evidence} />,
    });
  }

  if (content.leadership && content.leadership.length > 0) {
    sections.push({
      id: "role",
      nav: "My role",
      heading: "What did I lead?",
      content: <LeadershipGrid points={content.leadership} />,
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

    const featured = pickFeaturedDecision(content.decisions);

    sections.push({
      id: "solution",
      nav: "Solution",
      heading: "What did we build, and why?",
      content: (
        <div className="flex flex-col gap-12">
          <SolutionSteps steps={content.solutionSteps} />
          {visuals}
          {featured && (
            <div className="flex flex-col gap-4">
              <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-tertiary-700">
                One decision, up close
              </p>
              <FeaturedDecision decision={featured} />
            </div>
          )}
        </div>
      ),
    });
  }

  if (content.evidence?.body || (content.team && content.team.length > 0)) {
    sections.push({
      id: "research",
      nav: "Research & team",
      heading: "How did we know?",
      content: <ResearchTeam body={content.evidence?.body} team={content.team} />,
    });
  }

  if (content.impact) {
    sections.push({
      id: "results",
      nav: "Outcomes",
      heading: "What happened?",
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
