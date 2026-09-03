import type { CaseStudy } from "../../data/caseStudies";
import ImageGallery from "./ImageGallery";
import RoleTeam from "./RoleTeam";
import KeyDecisions from "./KeyDecisions";
import StatesRecovery from "./StatesRecovery";

/**
 * The material an interviewer asks about, closed by default.
 *
 * Native <details> rather than a JS disclosure: every route here is prerendered
 * and has to stay readable without JS, and the element gives keyboard and
 * screen-reader behaviour for free.
 *
 * Research findings and reflection used to live here too. Both are page
 * sections now (2026-09-03): the findings are the evidence for a research-led
 * designer, and the reflection is the most senior paragraph on the page.
 * Coded diagrams a study wants behind a summary arrive as `panels`.
 */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  // overflow-hidden so the summary's hover fill is clipped to the rounded
  // border. Without it the fill keeps its own square corners and paints into
  // the radius, and the panel reads as square-cornered on hover.
  return (
    <details className="group overflow-hidden rounded-lg border border-border bg-card [&[open]]:bg-background">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[0.9375rem] font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        {title}
        <span
          className="shrink-0 text-base font-semibold text-accent group-open:hidden"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="hidden shrink-0 text-base font-semibold text-accent group-open:inline"
          aria-hidden="true"
        >
          &minus;
        </span>
      </summary>
      <div className="border-t border-border px-6 pb-7 pt-6">{children}</div>
    </details>
  );
}

export default function DeepDive({
  content,
  panels = [],
}: {
  content: CaseStudy;
  panels?: { title: string; content: React.ReactNode }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <Panel title="Key decisions">
        <KeyDecisions decisions={content.decisions} />
      </Panel>

      {content.states && content.states.length > 0 && (
        <Panel title="Edge cases">
          <StatesRecovery states={content.states} />
        </Panel>
      )}

      {content.processImages && content.processImages.length > 0 && (
        <Panel title="The flows behind the screens">
          <p className="mb-6 measure text-[0.9375rem] leading-[1.7] text-muted-foreground">
            The working flow the screens were built against: every role, every handoff,
            and the paths that break.
          </p>
          <ImageGallery images={content.processImages} />
        </Panel>
      )}

      {panels.map(({ title, content: panelContent }) => (
        <Panel key={title} title={title}>
          {panelContent}
        </Panel>
      ))}

      <Panel title="What I owned, and the team">
        <RoleTeam owned={content.owned} ownedThemes={content.ownedThemes} team={content.team} />
      </Panel>
    </div>
  );
}
