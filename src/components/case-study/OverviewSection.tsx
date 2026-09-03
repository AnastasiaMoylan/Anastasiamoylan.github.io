/**
 * The overview paragraph, then the situation and constraint.
 *
 * The project facts (status, users, tools) used to render here as a second
 * fact list under the header's first one. Status moved into the header line
 * and the rest were cut (2026-09-03): users are described in the overview,
 * tools are not a case-study fact, and the team renders in Details.
 */
export default function OverviewSection({
  overview,
  context,
}: {
  overview: string;
  /** Situation, why it mattered, the constraint. Optional when the overview already carries it. */
  context?: string;
}) {
  return (
    <div>
      <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{overview}</p>
      {context && (
        <p className="mt-5 m-0 measure text-base leading-[1.7] text-muted-foreground">
          {context}
        </p>
      )}
    </div>
  );
}
