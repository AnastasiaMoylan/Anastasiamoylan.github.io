import type { Stat } from "../../data/caseStudies";

/**
 * At-a-glance figures, directly under the header.
 *
 * Sits above the section nav rather than inside a beat: a reader deciding
 * whether to read at all should hit the numbers before any prose. The
 * `metricStatus` caveat renders in Results instead — qualifying the figures
 * where they're argued, not undercutting them at first glance.
 *
 * A card strip with hairline dividers (the homepage outcome band's language).
 * `justify-end` + `flex-col-reverse` pins every figure to the top of its cell,
 * so the numbers share one baseline no matter how many lines a label wraps —
 * the old bottom-packed layout let a two-line label push its figure upward.
 *
 * Three figures run in one row from `sm`. Four split 2x2 at `sm` and run in
 * one row at `lg`; the dividers are set per cell so the 2x2 grid gets a
 * horizontal rule between its rows and a vertical one between its columns.
 */
function cellBorders(index: number, count: number): string {
  if (index === 0) return "";
  if (count < 4) return "border-t sm:border-t-0 sm:border-l";
  return [
    "border-t",
    index === 1 ? "sm:border-t-0 sm:border-l" : "",
    index === 2 ? "lg:border-t-0 lg:border-l" : "",
    index >= 3 ? "sm:border-l lg:border-t-0" : "",
  ].join(" ");
}

export default function StatBand({ stats }: { stats: Stat[] }) {
  const columns = stats.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return (
    <section aria-label="At a glance" className="mt-10 rounded-lg border border-border bg-card">
      <dl className={["m-0 grid grid-cols-1", columns].join(" ")}>
        {/*
          Column-reverse so the figure reads above its label while the <dt> still
          precedes its <dd> in the DOM, which a definition list requires. Setting
          the label as an extra <span> inside the <dd> instead would announce it
          twice to a screen reader.
        */}
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={[
              "flex flex-col-reverse justify-end gap-2.5 border-border px-7 py-8 sm:px-9",
              cellBorders(i, stats.length),
            ].join(" ")}
          >
            <dt className="max-w-[20rem] font-mono text-[0.6875rem] uppercase tracking-[0.1em] leading-[1.6] text-tertiary-700">
              {label}
            </dt>
            <dd className="m-0 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-accent tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
