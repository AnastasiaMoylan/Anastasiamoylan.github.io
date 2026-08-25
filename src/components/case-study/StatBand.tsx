import type { Stat } from "../../data/caseStudies";

/**
 * At-a-glance figures, directly under the header.
 *
 * Sits above the section nav rather than inside a beat: a reader deciding
 * whether to read at all should hit the numbers before any prose. The
 * `metricStatus` caveat renders in Results instead — qualifying the figures
 * where they're argued, not undercutting them at first glance.
 */
export default function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="At a glance" className="mt-12 border-t border-border pt-10">
      <dl className="m-0 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {/*
          Column-reverse so the figure reads above its label while the <dt> still
          precedes its <dd> in the DOM, which a definition list requires. Setting
          the label as an extra <span> inside the <dd> instead would announce it
          twice to a screen reader.
        */}
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse">
            <dt className="mt-1.5 max-w-[18rem] text-[0.875rem] leading-[1.5] text-muted-foreground">
              {label}
            </dt>
            <dd className="m-0 font-display text-[clamp(2rem,4.5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-accent tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
