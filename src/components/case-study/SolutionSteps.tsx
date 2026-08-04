import type { SolutionStep } from "../../data/caseStudies";

/**
 * The solution as an ordered walk rather than a capability list.
 *
 * An <ol> because the order is real: each stage depends on the one before it,
 * and reading the three titles alone should describe the shape of the product.
 * Two supporting points per stage is the ceiling — a third turns the card back
 * into the feature list this section replaced.
 */
export default function SolutionSteps({ steps }: { steps: SolutionStep[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
      {steps.map(({ title, points }, i) => (
        <li
          key={title}
          className="relative rounded-lg border border-border bg-card px-6 pb-6 pt-7"
        >
          <span
            className="absolute -top-3.5 left-5 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-background text-xs font-semibold text-accent tabular-nums"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h4 className="m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">
            <span className="sr-only">Step {i + 1}: </span>
            {title}
          </h4>
          <ul className="mt-3 m-0 flex list-none flex-col gap-2.5 p-0">
            {points.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span className="mt-[0.3rem] shrink-0 text-accent" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
