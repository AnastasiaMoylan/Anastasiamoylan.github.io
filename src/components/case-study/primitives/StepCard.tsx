/** Numbered circle, bold title, muted one-line description. Used inside an <ol>. */
export default function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative h-full rounded-lg border border-border bg-card px-5 pt-7 pb-5 text-center">
      <span
        className="absolute -top-3.5 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground"
        aria-hidden="true"
      >
        {number}
      </span>
      <p className="m-0 text-[0.9375rem] font-bold leading-[1.3] text-foreground">
        <span className="sr-only">Step {number}: </span>
        {title}
      </p>
      <p className="mt-1.5 m-0 text-[0.8125rem] leading-[1.5] text-muted-foreground">{description}</p>
    </div>
  );
}
