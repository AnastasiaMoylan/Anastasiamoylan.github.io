import type { CaseStudy } from "../../data/caseStudies";
import type { Section } from "./types";
import ChallengeList from "./ChallengeList";
import OverviewSection from "./OverviewSection";
import LeadershipGrid from "./LeadershipGrid";
import FramingBlock from "./FramingBlock";
import SolutionSteps from "./SolutionSteps";
import ImageGallery from "./ImageGallery";
import ResultsSection from "./ResultsSection";
import ReflectionBlock from "./ReflectionBlock";
import FeaturedDecision, { pickFeaturedDecision } from "./FeaturedDecision";
import DeepDive from "./DeepDive";

/**
 * Per-case-study additions, keyed by section id. `append` renders after a
 * section's default content, `replace` stands in for it entirely, and `panels`
 * become closed disclosure panels inside Details. Case studies that pass
 * nothing are unaffected.
 */
export interface SectionAugments {
  append?: Record<string, React.ReactNode>;
  replace?: Record<string, React.ReactNode>;
  panels?: { title: string; content: React.ReactNode }[];
}

/**
 * Page order (revised 2026-09-03):
 * Hook (header + stats, outside this file) -> Overview (with the framing) ->
 * Research -> Role -> Turning point -> Solution -> Outcomes -> Reflection ->
 * Details.
 *
 * Section headings are plain nouns, the same on every study, so the study's
 * own sub-headings carry the specifics. The turning point is the one pivot or
 * reversal, told straight; it sits between what the research showed and what
 * was built because that is when it happened. Reflection is a page section,
 * not a disclosure panel: the honest "what did not work" paragraph is the
 * most senior thing on the page and should not be hidden.
 *
 * Sections whose data is absent don't render, so a study can ship partially
 * filled without showing empty headings.
 */
export default function buildSections(
  content: CaseStudy,
  augments: SectionAugments = {},
): Section[] {
  const { append = {}, replace = {}, panels = [] } = augments;
  const sections: Section[] = [];

  if (content.overview) {
    sections.push({
      id: "overview",
      nav: "Overview",
      heading: "Overview",
      content: (
        <>
          <OverviewSection overview={content.overview} context={content.context} />
          {content.framing && content.framing.length > 0 && (
            <FramingBlock items={content.framing} />
          )}
        </>
      ),
    });
  }

  if (content.evidence) {
    sections.push({
      id: "challenge",
      nav: "Research",
      heading: "Research",
      content: <ChallengeList evidence={content.evidence} />,
    });
  }

  if (content.leadership && content.leadership.length > 0) {
    sections.push({
      id: "role",
      nav: "Role",
      heading: "Role",
      content: <LeadershipGrid points={content.leadership} />,
    });
  }

  if (content.turn) {
    sections.push({
      id: "turn",
      nav: "Turning point",
      heading: "Turning point",
      content: (
        <div className="measure border-l-2 border-accent pl-6">
          <p className="m-0 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            {content.turn}
          </p>
        </div>
      ),
    });
  }

  if (content.solutionSteps && content.solutionSteps.length > 0) {
    const stepsCarryImages = content.solutionSteps.some(
      (s) => s.images && s.images.length > 0,
    );
    const gallery =
      !stepsCarryImages && content.images && content.images.length > 0 ? (
        <ImageGallery images={content.images} />
      ) : null;

    const featured = pickFeaturedDecision(content.decisions);

    sections.push({
      id: "solution",
      nav: "Solution",
      heading: "Solution",
      content: (
        <div className="flex flex-col gap-12">
          <SolutionSteps steps={content.solutionSteps} />
          {gallery}
          {featured && (
            <div className="flex flex-col gap-4">
              <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-tertiary-700">
                Key decision
              </p>
              <FeaturedDecision decision={featured} />
            </div>
          )}
        </div>
      ),
    });
  }

  if (content.impact) {
    sections.push({
      id: "results",
      nav: "Outcomes",
      heading: "Outcomes",
      content: <ResultsSection impact={content.impact} />,
    });
  }

  if (content.reflection) {
    sections.push({
      id: "reflection",
      nav: "Reflection",
      heading: "Reflection",
      content: <ReflectionBlock reflection={content.reflection} />,
    });
  }

  sections.push({
    id: "deep-dive",
    nav: "Details",
    heading: "Details",
    content: <DeepDive content={content} panels={panels} />,
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
