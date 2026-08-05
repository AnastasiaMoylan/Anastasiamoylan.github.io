import type { CaseStudy } from "../../data/caseStudies";
import LeadershipGrid from "./LeadershipGrid";
import RoleTeam from "./RoleTeam";
import KeyDecisions from "./KeyDecisions";
import StatesRecovery from "./StatesRecovery";
import ReflectionBlock from "./ReflectionBlock";

/**
 * The material an interviewer asks about, closed by default.
 *
 * Native <details> rather than a JS disclosure: every route here is prerendered
 * and has to stay readable without JS, and the element gives keyboard and
 * screen-reader behaviour for free.
 *
 * The panels reuse the beat components the previous template rendered inline.
 * Nothing was lost in the move to a scannable page — the depth moved behind a
 * summary instead of competing with the argument above it.
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

export default function DeepDive({ content }: { content: CaseStudy }) {
  const findings = content.evidence?.findings ?? [];

  return (
    <div className="flex flex-col gap-3">
      {/*
        Role comes first: it is the question an interviewer opens with, and the
        one the rest of the page can't answer on its own. The direction/craft
        split leads, then the fuller ownership themes and the disciplines.
      */}
      <Panel title="Leadership and ownership">
        {content.leadership && content.leadership.length > 0 && (
          <div className="mb-8">
            <LeadershipGrid points={content.leadership} />
          </div>
        )}
        <RoleTeam owned={content.owned} ownedThemes={content.ownedThemes} team={content.team} />
      </Panel>

      {findings.length > 0 && (
        <Panel title="The research">
          <p className="mb-6 max-w-[46rem] text-[0.9375rem] leading-[1.7] text-muted-foreground">
            What the research found, and the change each finding caused.
          </p>
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {findings.map(({ finding, response }) => (
              <li key={finding} className="max-w-[46rem]">
                <p className="m-0 text-[0.9375rem] font-semibold leading-[1.55] text-foreground">
                  {finding}
                </p>
                <p className="mt-1.5 m-0 flex gap-2.5 text-[0.875rem] leading-[1.65] text-muted-foreground">
                  <span className="shrink-0 text-accent" aria-hidden="true">
                    &rarr;
                  </span>
                  {response}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {content.states && content.states.length > 0 && (
        <Panel title="Edge cases">
          <StatesRecovery states={content.states} />
        </Panel>
      )}

      <Panel title="Key decisions">
        <KeyDecisions decisions={content.decisions} />
      </Panel>

      {content.reflection && (
        <Panel title="Reflection">
          <ReflectionBlock reflection={content.reflection} />
        </Panel>
      )}

      {/*
        A "What's next" panel used to close the deep dive, reading from
        `nextSteps`. It is deliberately not rendered: roadmap for work that is
        still moving dates itself faster than the rest of the page. The copy is
        kept in the data so the panel can be restored in one block.
      */}
    </div>
  );
}
