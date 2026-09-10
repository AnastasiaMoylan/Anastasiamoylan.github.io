import type { Impact } from "../../data/caseStudies";

/**
 * What changed: the before/after pair, the validated proof, and the honest
 * limits of the numbers.
 *
 * The framework's order, and its reasoning: a before/after pair is the
 * shortest statement of change, a proof list is what a reviewer can check, and
 * a disclaimer where numbers cannot be attributed reads as senior while an
 * inflated figure reads as junior. `measureNext` closes the section — naming
 * the measurement you would run is a stronger position than an absent metric.
 */
export default function OutcomeSection({ impact }: { impact: Impact }) {
  return (
    <div>
      <dl className="m-0 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card px-6 py-5">
          <dt className="m-0 text-label font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            Before
          </dt>
          <dd className="mt-2 m-0 text-small leading-[1.65] text-muted-foreground">
            {impact.before}
          </dd>
        </div>
        <div className="rounded-lg border border-accent-tint-light bg-secondary px-6 py-5">
          <dt className="m-0 text-label font-semibold uppercase tracking-[0.09em] text-accent">
            After
          </dt>
          <dd className="mt-2 m-0 text-small leading-[1.65] text-foreground">{impact.after}</dd>
        </div>
      </dl>

      {impact.proof && impact.proof.length > 0 && (
        <>
          <h4 className="mt-9 mb-4 text-label font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            Validated proof
          </h4>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {impact.proof.map((point) => (
              <li key={point} className="flex measure gap-3">
                <span className="mt-[0.35rem] shrink-0 text-accent" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-[0.9375rem] leading-[1.65] text-muted-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {impact.measureNext && (
        <div className="mt-9 measure">
          <h4 className="m-0 mb-2 text-label font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            What I would measure next
          </h4>
          <p className="m-0 text-[0.9375rem] leading-[1.65] text-muted-foreground">
            {impact.measureNext}
          </p>
        </div>
      )}

      {impact.metricStatus && (
        <p className="mt-9 measure text-[0.8125rem] italic leading-[1.6] text-muted-foreground">
          {impact.metricStatus}
        </p>
      )}
    </div>
  );
}
