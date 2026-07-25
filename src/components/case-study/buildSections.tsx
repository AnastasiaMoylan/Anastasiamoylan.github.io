import type { CaseStudy } from "../../data/caseStudies";
import type { Section } from "./types";
import EvidenceInsight from "./EvidenceInsight";
import RoleTeam from "./RoleTeam";
import KeyDecisions from "./KeyDecisions";
import StatesRecovery from "./StatesRecovery";
import ImageGallery from "./ImageGallery";
import PendingVisuals from "./PendingVisuals";
import OutcomeImpact from "./OutcomeImpact";
import ReflectionBlock from "./ReflectionBlock";

/**
 * Per-case-study additions, keyed by section id. `append` renders after a
 * section's default content, `replace` stands in for it entirely. Case studies
 * that pass nothing are unaffected.
 */
export interface SectionAugments {
  append?: Record<string, React.ReactNode>;
  replace?: Record<string, React.ReactNode>;
}

/** Composes the framework's beats in Frame -> Think -> Land order, skipping empty ones. */
export default function buildSections(
  content: CaseStudy,
  augments: SectionAugments = {},
): Section[] {
  const { append = {}, replace = {} } = augments;

  const sections: Section[] = [
    {
      id: "context",
      nav: "Context",
      heading: "Context and stakes",
      content: <p className="text-base text-muted-foreground leading-[1.7]">{content.context}</p>,
    },
  ];

  if (content.evidence) {
    sections.push({
      id: "evidence",
      nav: "Evidence",
      heading: "Evidence and insight",
      content: <EvidenceInsight evidence={content.evidence} />,
    });
  }

  sections.push(
    {
      id: "role",
      nav: "Role and team",
      heading: "Role and team",
      content: (
        <RoleTeam owned={content.owned} ownedThemes={content.ownedThemes} team={content.team} />
      ),
    },
    {
      id: "decisions",
      nav: "Key decisions",
      heading: "Key decisions",
      content: <KeyDecisions decisions={content.decisions} />,
    },
  );

  if (content.states && content.states.length > 0) {
    sections.push({
      id: "states",
      nav: "Edge cases",
      heading: "States, edge cases, and recovery",
      content: <StatesRecovery states={content.states} />,
    });
  }

  // A replacement stands in for the gallery, so a case study can carry a coded
  // diagram instead of a raster image without needing an empty `images` array.
  if (replace.execution) {
    sections.push({
      id: "execution",
      nav: "Execution",
      heading: "Execution",
      content: <>{replace.execution}</>,
    });
  } else if (content.images && content.images.length > 0) {
    sections.push({
      id: "execution",
      nav: "Execution",
      heading: "Execution",
      content: <ImageGallery images={content.images} />,
    });
  } else if (content.visualsPending) {
    sections.push({
      id: "execution",
      nav: "Execution",
      heading: "Execution",
      content: <PendingVisuals note={content.visualsPendingNote} planned={content.plannedVisuals} />,
    });
  }

  if (content.impact) {
    sections.push({
      id: "outcome",
      nav: "Outcome",
      heading: "Outcome and impact",
      content: <OutcomeImpact impact={content.impact} />,
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

  return sections.map((section) => {
    const replacement = section.id === "execution" ? undefined : replace[section.id];
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
