import type { Impact } from "../../data/caseStudyTypes";

/**
 * What changed (Layout C): the before/after pair as a split panel with the
 * "after" on the dark teal ground, the validated proof as a two-column list,
 * what to measure next in a boxed note, and the honest limits of the numbers.
 *
 * The framework's order, and its reasoning: a before/after pair is the
 * shortest statement of change, a proof list is what a reviewer can check, and
 * a disclaimer where numbers cannot be attributed reads as senior while an
 * inflated figure reads as junior. `measureNext` closes the argument: naming
 * the measurement you would run is a stronger position than an absent metric.
 * The caveat also prints under the lede figures, so a number is qualified
 * where it is first seen and where it is argued.
 */
export default function OutcomeSection({ impact }: { impact: Impact }) {
  return (
    <div>
      <dl className="m-0 grid max-w-[56rem] grid-cols-1 overflow-hidden rounded-[10px] border border-border md:grid-cols-2">
        <div className="bg-card p-6 md:p-8">
          <dt className="m-0 font-mono text-label font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Before
          </dt>
          <dd className="mt-3 m-0 text-body leading-[1.6] text-foreground">{impact.before}</dd>
        </div>
        <div className="bg-tertiary-900 p-6 text-tertiary-100 md:p-8">
          <dt className="m-0 font-mono text-label font-semibold uppercase tracking-[0.16em] text-tertiary-500">
            After
          </dt>
          <dd className="mt-3 m-0 text-body leading-[1.6] text-background">{impact.after}</dd>
        </div>
      </dl>

      {impact.proof && impact.proof.length > 0 && (
        <ul className="m-0 mt-7 grid max-w-[56rem] list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 md:gap-x-10">
          {impact.proof.map((point) => (
            <li key={point} className="flex gap-3 text-small leading-[1.6] text-muted-foreground">
              <span className="shrink-0 text-accent" aria-hidden="true">
                &rarr;
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {impact.measureNext && (
        <div className="mt-7 max-w-[44rem] rounded-lg border border-border bg-card p-6">
          <h4 className="m-0 mb-2 font-mono text-label font-semibold uppercase tracking-[0.14em] text-tertiary-700">
            What I would measure next
          </h4>
          <p className="m-0 text-small leading-[1.7] text-muted-foreground">{impact.measureNext}</p>
        </div>
      )}

      {impact.metricStatus && (
        <p className="mt-6 m-0 max-w-[62ch] text-small italic leading-[1.7] text-muted-foreground">
          {impact.metricStatus}
        </p>
      )}
    </div>
  );
}
