import { useEffect, useRef, useState } from "react";
import type { Stat } from "../../data/caseStudyTypes";

/**
 * The figures, on the same screen as the headline (Layout C).
 *
 * Two columns, four at width, ruled off from the deck above by a hairline
 * rather than boxed in a card: the numbers belong to the lede, not to a
 * separate panel under it. The source caveat sits directly beneath them, so a
 * figure is qualified where it is first seen as well as where it is argued
 * in Outcome.
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
 * aesthetic cost, and no site in the reference research uses one.
 *
 * There is no hover state, because the band is not clickable. Under
 * `prefers-reduced-motion` the rules are simply present from the start.
 */
// Spelled out: Tailwind only emits classes it can read in the source.
const COLUMNS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function StatBand({ stats, caveat }: { stats: Stat[]; caveat?: string }) {
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
    // hidden: they are decoration, and decoration should not be able to break.
    const failsafe = window.setTimeout(() => setSeen(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const columns = COLUMNS[Math.min(stats.length, 4)];

  return (
    <section ref={ref} aria-label="At a glance" className="mt-7 border-t border-border pt-5">
      <dl className={["m-0 grid grid-cols-2 gap-x-8 gap-y-5", columns].join(" ")}>
        {/*
          Column-reverse so the figure reads above its label while the <dt> still
          precedes its <dd> in the DOM, which a definition list requires.
        */}
        {stats.map(({ value, label }, i) => (
          <div key={label} className="relative flex flex-col-reverse justify-end gap-2.5 pb-2">
            <dt className="max-w-[16rem] font-mono text-label font-medium uppercase tracking-[0.1em] text-tertiary-700">
              {label}
            </dt>
            <dd className="m-0 font-display text-figure font-extrabold tracking-[-0.03em] text-accent tabular-nums">
              {value}
            </dd>
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${i * 60}ms` }}
              className={[
                "pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent/30 transition-transform duration-500 ease-out",
                seen ? "scale-x-100" : "scale-x-0",
              ].join(" ")}
            />
          </div>
        ))}
      </dl>
      {caveat && (
        <p className="mt-2 m-0 max-w-[62ch] text-small italic leading-[1.6] text-muted-foreground">
          {caveat}
        </p>
      )}
    </section>
  );
}
