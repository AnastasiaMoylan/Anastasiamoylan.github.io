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
 * Composes the page as the storyteller arc (case-study-storyteller skill):
 * Hook (header + stats, outside this file) -> Stakes -> The real problem ->
 * My role -> What we built -> The turn -> Outcomes (+ the principle) ->
 * Deep dive.
 *
 * "The turn" is the messy middle — the pivot or reversal told straight; it
 * renders only when a study supplies one. The featured decision stays inside
 * What we built. Research method and the team live in the deep dive.
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
      nav: "Stakes",
      heading: "The stakes",
      content: (
        <OverviewSection
          overview={content.overview}
          stakes={content.context}
          fields={content.snapshotFields}
        />
      ),
    });
  }

  if (content.evidence) {
    sections.push({
      id: "challenge",
      nav: "Problem",
      heading: "The real problem",
      content: <ChallengeList evidence={content.evidence} />,
    });
  }

  if (content.leadership && content.leadership.length > 0) {
    sections.push({
      id: "role",
      nav: "My role",
      heading: "My role",
      content: <LeadershipGrid points={content.leadership} />,
    });
  }

  if (content.solutionSteps && content.solutionSteps.length > 0) {
    const stepsCarryImages = content.solutionSteps.some(
      (s) => s.images && s.images.length > 0,
    );
    const visuals = stepsCarryImages
      ? null
      : content.images && content.images.length > 0
      ? <ImageGallery images={content.images} />
      : append.solution
        ? null
        : <PlaceholderFigure caption={content.visualsPendingNote ?? "Final visuals for this case study are in production."} />;

    const featured = pickFeaturedDecision(content.decisions);

    sections.push({
      id: "solution",
      nav: "Built",
      heading: "What we built",
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

  if (content.turn) {
    sections.push({
      id: "turn",
      nav: "The turn",
      heading: "The turn",
      content: (
        <div className="max-w-[48rem] border-l-2 border-accent pl-6">
          <p className="m-0 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            {content.turn}
          </p>
        </div>
      ),
    });
  }

  if (content.impact) {
    sections.push({
      id: "results",
      nav: "Outcomes",
      heading: "Outcomes",
      content: (
        <div className="flex flex-col gap-12">
          <ResultsSection impact={content.impact} />
          {content.reflection?.principle && (
            <div>
              <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-tertiary-700">
                The principle
              </p>
              <p className="mt-3 m-0 max-w-[40rem] font-display text-[clamp(1.25rem,2.5vw,1.625rem)] font-bold leading-[1.35] tracking-[-0.02em] text-foreground">
                {content.reflection.principle}
              </p>
            </div>
          )}
        </div>
      ),
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
