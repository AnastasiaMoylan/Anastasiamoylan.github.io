import type { FramingItem } from "../../data/caseStudyTypes";

/**
 * The product framing, stated up front: hypothesis, the success metric (or an
 * honest account of why none was set and what it would be), the constraint
 * that shaped scope, and where the work landed.
 *
 * Added 2026-09-03 from the scorecard session record (§4.7). Renders inside
 * Problem, after the context, so a reader meets the framing before any
 * screen. Labels are data, not fixed, because the billing study has a KPI
 * that was actually set at kickoff while the others state the metric the
 * author would hold the work to.
 */
export default function FramingBlock({ items }: { items: FramingItem[] }) {
  return (
    <dl className="mt-10 m-0 grid grid-cols-1 gap-x-8 gap-y-6 rounded-lg border border-border bg-card px-7 py-6 sm:grid-cols-2">
      {items.map(({ label, text }) => (
        <div key={label}>
          <dt className="m-0 font-mono text-label font-semibold uppercase tracking-[0.09em] text-accent">
            {label}
          </dt>
          <dd className="mt-1.5 m-0 text-small leading-[1.65] text-muted-foreground">{text}</dd>
        </div>
      ))}
    </dl>
  );
}
