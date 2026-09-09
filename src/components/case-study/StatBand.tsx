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
 * Two or three figures run in one row from `sm`. Four or more split into two
 * columns at `sm` and run in one row at `lg` (capped at four across; a fifth
 * wraps and keeps its rules). Dividers are set per cell: a rule above every
 * cell that starts a new row and a rule to the left of every cell that is not
 * first in its row, at each breakpoint. `stats` is unbounded in the type, so
 * the arithmetic is by column count rather than by special-casing 3 and 4.
 */
const LG_COLUMNS = 4;

function cellBorders(index: number, count: number): string {
  if (index === 0) return "";
  if (count <= 3) return "border-t sm:border-t-0 sm:border-l";
  const SM_COLUMNS = 2;
  const smTop = index >= SM_COLUMNS ? "sm:border-t" : "sm:border-t-0";
  const smLeft = index % SM_COLUMNS === 0 ? "sm:border-l-0" : "sm:border-l";
  const lgTop = index >= LG_COLUMNS ? "lg:border-t" : "lg:border-t-0";
  const lgLeft = index % LG_COLUMNS === 0 ? "lg:border-l-0" : "lg:border-l";
  return ["border-t", smTop, smLeft, lgTop, lgLeft].join(" ");
}

// 1 is listed explicitly: without it a single stat fell through to the 4-column
// default and rendered in a quarter-width cell inside a full-width card. No
// study ships one stat today, but a partially filled one is allowed to.
const COLUMN_CLASSES: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export default function StatBand({ stats }: { stats: Stat[] }) {
  const columns = COLUMN_CLASSES[stats.length] ?? "sm:grid-cols-2 lg:grid-cols-4";
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
