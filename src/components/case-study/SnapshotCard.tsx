import type { TeamMember } from "../../data/caseStudies";

export default function SnapshotCard({
  fields,
  team,
}: {
  fields: { label: string; value: string }[];
  team?: TeamMember[];
}) {
  // Timeframe and Status are hidden for now; the data stays in place so they
  // can be restored by removing this filter.
  const visibleFields = fields.filter(({ label }) => label !== "Timeframe" && label !== "Status");

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
