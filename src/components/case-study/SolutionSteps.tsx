import type { SolutionStep } from "../../data/caseStudies";
import ImageGallery from "./ImageGallery";

function StepCard({ step, index }: { step: SolutionStep; index: number }) {
  return (
    <div className="relative h-full rounded-lg border border-border bg-card px-6 pb-6 pt-7">
      <span
        className="absolute -top-3.5 left-5 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-background text-xs font-semibold text-accent tabular-nums"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <h3 className="m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">
        <span className="sr-only">Step {index + 1}: </span>
        {step.title}
      </h3>
      <ul className="mt-3 m-0 flex list-none flex-col gap-2.5 p-0">
        {step.points.map((point) => (
          <li key={point} className="flex gap-2.5">
            <span className="mt-[0.3rem] shrink-0 text-accent" aria-hidden="true">
              &rarr;
            </span>
            <span className="text-[0.8125rem] leading-[1.6] text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The solution as an ordered walk rather than a capability list.
 *
 * Two layouts. When no step carries evidence, the walk is a compact grid of
 * cards — reading the titles alone describes the shape of the product. When
 * steps carry images, each step becomes a row: the card beside the screen that
 * proves it, so evidence sits with its argument instead of clumping below.
 */
export default function SolutionSteps({ steps }: { steps: SolutionStep[] }) {
  const hasImages = steps.some((s) => s.images && s.images.length > 0);

  if (!hasImages) {
    return (
      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex">
            <StepCard step={step} index={i} />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="m-0 flex list-none flex-col gap-12 p-0">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:items-start"
        >
          <StepCard step={step} index={i} />
          {step.images && step.images.length > 0 && (
            <div className="min-w-0">
              <ImageGallery images={step.images} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
