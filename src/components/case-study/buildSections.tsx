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

/** Composes the framework's beats in Frame -> Think -> Land order, skipping empty ones. */
export default function buildSections(content: CaseStudy): Section[] {
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
      content: <RoleTeam owned={content.owned} team={content.team} />,
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

  if (content.images && content.images.length > 0) {
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

  return sections;
}
