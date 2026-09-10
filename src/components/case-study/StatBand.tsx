import { useEffect, useRef, useState } from "react";
import type { Stat } from "../../data/caseStudies";

/**
 * At-a-glance figures, directly under the lede.
 *
 * A reader deciding whether to read at all should hit the numbers before any
 * prose. The `metricStatus` caveat renders in Outcome instead — qualifying the
 * figures where they're argued, not undercutting them at first glance.
 *
 * ── The micro-interaction, and the one that was rejected ──────────────
 *
 * A rule draws under each figure the first time the band is seen, staggered by
 * 60ms. That is all it does. The numeral itself never animates.
 *
 * Counting numerals were built and removed: a count-up shows the wrong value
 * for most of its run, and every figure here is a claim someone may check. A
 * screenshot caught the band reading "6 active users" mid-animation. On a page
 * whose argument rests on honest numbers that is the wrong effect at any
 * aesthetic cost — and no site in the reference research uses one.
 *
 * There is no hover state, because the band is not clickable. A hover response
 * on something you cannot press is a promise the page does not keep.
 *
 * Under `prefers-reduced-motion` the rules are simply present from the start.
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
// default and rendered in a quarter-width cell inside a full-width card.
const COLUMN_CLASSES: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

export default function StatBand({ stats }: { stats: Stat[] }) {
  const columns = COLUMN_CLASSES[stats.length] ?? "sm:grid-cols-2 lg:grid-cols-4";
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    // A failed or never-fired observer must not leave the rules permanently
    // hidden — they are decoration, and decoration should not be able to break.
    const failsafe = window.setTimeout(() => setSeen(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="At a glance"
      className="mt-10 rounded-lg border border-border bg-card"
    >
      <dl className={["m-0 grid grid-cols-1", columns].join(" ")}>
        {/*
          Column-reverse so the figure reads above its label while the <dt> still
          precedes its <dd> in the DOM, which a definition list requires.
        */}
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className={[
              "relative flex flex-col-reverse justify-end gap-2.5 border-border px-7 py-8 sm:px-9",
              cellBorders(i, stats.length),
            ].join(" ")}
          >
            <dt className="max-w-[20rem] font-mono text-label font-medium uppercase tracking-[0.1em] text-tertiary-700">
              {label}
            </dt>
            <dd className="m-0 font-display text-figure font-extrabold tracking-[-0.03em] text-accent tabular-nums">
              {value}
            </dd>
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${i * 60}ms` }}
              className={[
                "pointer-events-none absolute bottom-6 left-7 right-7 h-0.5 origin-left bg-accent/30 transition-transform duration-500 ease-out sm:left-9 sm:right-9",
                seen ? "scale-x-100" : "scale-x-0",
              ].join(" ")}
            />
          </div>
        ))}
      </dl>
    </section>
  );
}
