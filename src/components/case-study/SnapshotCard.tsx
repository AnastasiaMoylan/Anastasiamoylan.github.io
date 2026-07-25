import type { TeamMember } from "../../data/caseStudies";

export default function SnapshotCard({
  fields,
  team,
}: {
  fields: { label: string; value: string }[];
  team?: TeamMember[];
}) {
  // Status is hidden for now. The data stays in caseStudies.ts, so deleting
  // this filter brings it back everywhere.
  const visibleFields = fields.filter(({ label }) => label !== "Status");

  // The hairlines come from a border-coloured container showing through a 1px
  // grid gap, so any cell the fields do not fill renders as a solid tinted
  // block. Pad the final row back out to a whole row — separately per
  // breakpoint, since the column count changes.
  const fillers = (columns: number) => (columns - (visibleFields.length % columns)) % columns;
  const wideFillers = fillers(4);
  const narrowFillers = fillers(2);

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
        {Array.from({ length: wideFillers }, (_, i) => (
          <div key={`w${i}`} className="hidden bg-card md:block" aria-hidden="true" />
        ))}
        {Array.from({ length: narrowFillers }, (_, i) => (
          <div key={`n${i}`} className="bg-card md:hidden" aria-hidden="true" />
        ))}
        {team && team.length > 0 && (
          <div className="col-span-2 md:col-span-4 bg-card p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Team</p>
            <p className="text-[0.875rem] text-foreground leading-[1.45]">
              {team.map((t) => t.role).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
