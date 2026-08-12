import type { Impact } from "../../data/caseStudies";

/**
 * What the work produced.
 *
 * The headline leads, then the before/after pair, then the proof points, then
 * the `metricStatus` caveat as a closing footnote. It renders here rather than
 * under the at-a-glance band: the band is the first impression and the caveat
 * was undercutting the figures before they landed, while Results is where the
 * figures are actually argued — the honest limits belong with the argument.
 */
export default function ResultsSection({ impact }: { impact: Impact }) {
  const narrative = [
    { label: "For the business", value: impact.business },
    { label: "For users", value: impact.user },
    { label: "For the organization", value: impact.organizational },
  ].filter((n): n is { label: string; value: string } => Boolean(n.value));

  return (
    <div>
      <p className="m-0 max-w-[46rem] text-[1.0625rem] font-medium leading-[1.6] text-foreground">
        {impact.headline}
      </p>

      {impact.before && impact.after && (
        <dl className="mt-8 m-0 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card px-6 py-5">
            <dt className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
              Before
            </dt>
            <dd className="mt-2 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">
              {impact.before}
            </dd>
          </div>
          <div className="rounded-lg border border-accent-tint-light bg-secondary px-6 py-5">
            <dt className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-accent">
              After
            </dt>
            <dd className="mt-2 m-0 text-[0.875rem] leading-[1.65] text-foreground">
              {impact.after}
            </dd>
          </div>
        </dl>
      )}

      {narrative.length > 0 && (
        <dl className="mt-8 m-0 flex max-w-[46rem] flex-col gap-4">
          {narrative.map(({ label, value }) => (
            <div key={label}>
              <dt className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-accent">
                {label}
              </dt>
              <dd className="mt-1 m-0 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {impact.proof && impact.proof.length > 0 && (
        <>
          <h4 className="mt-9 mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            Proof points
          </h4>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {impact.proof.map((point) => (
              <li key={point} className="flex max-w-[46rem] gap-3">
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

      {impact.metricStatus && (
        <p className="mt-9 max-w-[46rem] text-[0.8125rem] italic leading-[1.6] text-muted-foreground">
          {impact.metricStatus}
        </p>
      )}
    </div>
  );
}
