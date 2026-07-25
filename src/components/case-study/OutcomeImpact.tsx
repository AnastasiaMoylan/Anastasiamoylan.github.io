import type { Impact } from "../../data/caseStudies";
import BulletList from "./BulletList";

export default function OutcomeImpact({ impact }: { impact: Impact }) {
  const lines = [
    { label: "Business", value: impact.business },
    { label: "User", value: impact.user },
    { label: "Organizational", value: impact.organizational },
  ].filter((l) => l.value);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{impact.headline}</p>

      {lines.length > 0 && (
        <dl className="m-0 flex flex-col gap-4">
          {lines.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{label}</dt>
              <dd className="m-0 text-base text-muted-foreground leading-[1.65]">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {impact.before && impact.after && (
        <div className="border border-border rounded-[14px] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 border-b md:border-b-0 md:border-r border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">Before</p>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.65]">{impact.before}</p>
          </div>
          <div className="bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">After</p>
            <p className="text-[0.9375rem] text-foreground leading-[1.65]">{impact.after}</p>
          </div>
        </div>
      )}

      {impact.proof && impact.proof.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Validated proof</p>
          <BulletList items={impact.proof} />
        </div>
      )}

      {impact.metricStatus && (
        <p className="text-[0.8125rem] text-muted-foreground/80 leading-[1.6] italic">{impact.metricStatus}</p>
      )}
    </div>
  );
}
