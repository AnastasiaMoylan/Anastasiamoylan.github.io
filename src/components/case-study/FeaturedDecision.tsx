import type { Decision } from "../../data/caseStudies";

/**
 * Which decision earns the on-page slot: the first that carries both a
 * rejected path and a stated trade-off, else the first with a rejected path,
 * else the first in the list. The data order is already curated, so "first
 * qualifying" is a deliberate editorial rule, not a fallback.
 */
export function pickFeaturedDecision(decisions: Decision[]): Decision | undefined {
  return (
    decisions.find((d) => d.rejected && d.tradeoff) ??
    decisions.find((d) => d.rejected) ??
    decisions[0]
  );
}

/**
 * One decision surfaced onto the scannable page, verbatim from the same list
 * the deep dive still carries in full. A skimmer who never opens an accordion
 * should still meet one real call: what was chosen, why, and what was given
 * up — the judgment the rest of the page can only assert.
 */
export default function FeaturedDecision({ decision }: { decision: Decision }) {
  return (
    <div className="max-w-[52rem] rounded-lg border border-accent-tint-light bg-secondary px-7 py-6">
      <p className="m-0 text-[1.0625rem] leading-[1.65] text-muted-foreground">
        <span className="font-bold text-foreground">{decision.decision}</span>{" "}
        {decision.rationale}
      </p>
      {(decision.rejected || decision.tradeoff) && (
        <p className="mt-3 m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">
          <span className="mr-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-accent">
            Instead of
          </span>
          {decision.rejected}
          {decision.rejected && decision.tradeoff && " — "}
          {decision.tradeoff}
          {decision.rejected && !decision.tradeoff && "."}
        </p>
      )}
      <p className="mt-4 m-0 text-[0.8125rem] leading-[1.6] text-muted-foreground">
        Every decision, with the path not taken, is in{" "}
        <a
          href="#deep-dive"
          className="font-semibold text-accent no-underline transition-colors duration-150 hover:text-foreground"
        >
          the deep dive
        </a>
        .
      </p>
    </div>
  );
}
