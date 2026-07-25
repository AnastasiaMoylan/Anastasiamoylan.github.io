/**
 * The header snapshot answers three things before the story starts: who you
 * were, who it was for, and when. Anything describing the *project* rather than
 * your standing belongs further down — Users and Tools render in the Overview,
 * and the team renders as discipline cards in Role and team.
 *
 * Four fields is also exactly one row of the grid, so the last row never leaves
 * an orphan cell.
 */
const HEADER_FIELDS = ["Role", "Employer", "Client", "Timeframe"];

export default function SnapshotCard({ fields }: { fields: { label: string; value: string }[] }) {
  const visibleFields = HEADER_FIELDS.flatMap(
    (label) => fields.filter((f) => f.label === label) ?? [],
  );

  // The hairlines come from a border-coloured container showing through a 1px
  // grid gap, so any cell the fields do not fill renders as a solid tinted
  // block. Pad the final row back out — separately per breakpoint, since the
  // column count changes.
  const fillers = (columns: number) => (columns - (visibleFields.length % columns)) % columns;

  return (
    <div
      className="mt-12 border border-border rounded-[14px] overflow-hidden bg-[var(--color-border)]"
      aria-label="Case study snapshot"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
        {visibleFields.map(({ label, value }) => (
          <div key={label} className="bg-card p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
              {label}
            </p>
            <p className="text-[0.875rem] text-foreground leading-[1.45]">{value}</p>
          </div>
        ))}
        {Array.from({ length: fillers(4) }, (_, i) => (
          <div key={`w${i}`} className="hidden bg-card md:block" aria-hidden="true" />
        ))}
        {Array.from({ length: fillers(2) }, (_, i) => (
          <div key={`n${i}`} className="bg-card md:hidden" aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}
