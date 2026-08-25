/**
 * Stand-in for a case-study visual that hasn't been produced or cleared yet.
 *
 * Drawn from the maroon tint ramp so a page reads as composed rather than
 * unfinished, but always labelled: a reader should never mistake a sketch for a
 * screenshot of the real product, and the owner should be able to spot every
 * outstanding asset by scanning for the tag.
 *
 * `caption` states what the real asset will show. The sketch itself is a
 * generic flow and carries no meaning.
 */
const sketch = (
  <>
    <line x1="24" y1="60" x2="456" y2="60" stroke="var(--accent-tint-mid)" strokeWidth="2" />
    <rect x="30" y="38" width="88" height="44" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" strokeDasharray="5 4" />
    <rect x="158" y="38" width="88" height="44" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
    <rect x="286" y="38" width="88" height="44" rx="8" fill="var(--accent-tint-light)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
    <circle cx="432" cy="60" r="20" fill="var(--accent)" />
  </>
);

export default function PlaceholderFigure({ caption }: { caption: string }) {
  return (
    <figure className="m-0">
      <div className="rounded-lg border border-border bg-secondary px-6 py-9">
        <svg
          viewBox="0 0 480 120"
          className="mx-auto block h-auto w-full max-w-[34rem]"
          role="img"
          aria-label={`Placeholder sketch. ${caption}`}
        >
          {sketch}
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          Placeholder visual
        </span>
        <span className="text-[0.8125rem] leading-[1.6] text-muted-foreground">{caption}</span>
      </figcaption>
    </figure>
  );
}
