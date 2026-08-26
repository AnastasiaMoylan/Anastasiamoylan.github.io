/**
 * The overview paragraph, plus the project facts that aren't credentials.
 *
 * The header carries who I was and who the client was; this carries what the
 * product was — its status, who it serves, and what it was built with. Keeping
 * them apart stops the top of the page becoming an eight-item fact dump before
 * the reader has learned what the project is.
 */
const CONTEXT_FIELDS = ["Status", "Users", "Tools"];

export default function OverviewSection({
  overview,
  stakes,
  fields = [],
}: {
  overview: string;
  /** The `context` beat: situation, why it mattered, the constraint. */
  stakes?: string;
  fields?: { label: string; value: string }[];
}) {
  const contextFields = CONTEXT_FIELDS.flatMap((label) =>
    fields.filter((f) => f.label === label),
  );

  return (
    <div>
      <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{overview}</p>
      {stakes && (
        <p className="mt-5 m-0 measure text-base leading-[1.7] text-muted-foreground">
          {stakes}
        </p>
      )}

      {contextFields.length > 0 && (
        <dl className="mt-8 m-0 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
          {contextFields.map(({ label, value }) => (
            <div key={label}>
              <dt className="m-0 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1.5 m-0 text-[0.875rem] leading-[1.55] text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
