/**
 * Stand-in for a case-study visual that hasn't been produced or cleared yet.
 *
 * Drawn from the maroon tint ramp so a page reads as composed rather than
 * unfinished, but always labelled: a reader should never mistake a sketch for a
 * screenshot of the real product, and the owner should be able to spot every
 * outstanding asset by scanning for the tag.
 *
 * `caption` states what the real asset will show. `variant` picks the sketch —
 * they carry no meaning beyond looking different from each other.
 */
type Variant = "flow" | "gate" | "panel" | "grid";

const sketches: Record<Variant, React.ReactNode> = {
  flow: (
    <>
      <line x1="24" y1="60" x2="456" y2="60" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="30" y="38" width="88" height="44" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" strokeDasharray="5 4" />
      <rect x="158" y="38" width="88" height="44" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="286" y="38" width="88" height="44" rx="8" fill="var(--accent-tint-light)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <circle cx="432" cy="60" r="20" fill="var(--accent)" />
    </>
  ),
  gate: (
    <>
      <rect x="28" y="24" width="168" height="72" rx="10" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" strokeDasharray="5 4" />
      <rect x="284" y="24" width="168" height="72" rx="10" fill="var(--accent-tint-light)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="222" y="16" width="36" height="88" rx="8" fill="var(--accent)" />
      <line x1="232" y1="42" x2="248" y2="42" stroke="var(--primary-foreground)" strokeWidth="2.5" />
      <line x1="232" y1="60" x2="248" y2="60" stroke="var(--primary-foreground)" strokeWidth="2.5" />
      <line x1="232" y1="78" x2="248" y2="78" stroke="var(--primary-foreground)" strokeWidth="2.5" />
    </>
  ),
  panel: (
    <>
      <rect x="28" y="18" width="252" height="84" rx="10" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="48" y="36" width="120" height="12" rx="6" fill="var(--accent-tint-mid)" />
      <rect x="48" y="60" width="212" height="9" rx="4" fill="var(--accent-tint-light)" />
      <rect x="48" y="78" width="176" height="9" rx="4" fill="var(--accent-tint-light)" />
      <rect x="304" y="18" width="148" height="84" rx="10" fill="var(--accent-tint-subtle)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="324" y="36" width="86" height="9" rx="4" fill="var(--accent-tint-mid)" />
      <rect x="324" y="54" width="108" height="9" rx="4" fill="var(--accent-tint-light)" />
      <rect x="324" y="76" width="58" height="14" rx="7" fill="var(--accent)" />
    </>
  ),
  grid: (
    <>
      <rect x="28" y="18" width="130" height="40" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="174" y="18" width="130" height="40" rx="8" fill="var(--accent-tint-subtle)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="320" y="18" width="130" height="40" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="28" y="70" width="130" height="40" rx="8" fill="var(--accent-tint-light)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="174" y="70" width="130" height="40" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
      <rect x="320" y="70" width="130" height="40" rx="8" fill="var(--card)" stroke="var(--accent-tint-mid)" strokeWidth="2" />
    </>
  ),
};

export default function PlaceholderFigure({
  caption,
  variant = "flow",
}: {
  caption: string;
  variant?: Variant;
}) {
  return (
    <figure className="m-0">
      <div className="rounded-lg border border-border bg-secondary px-6 py-9">
        <svg
          viewBox="0 0 480 120"
          className="mx-auto block h-auto w-full max-w-[34rem]"
          role="img"
          aria-label={`Placeholder sketch. ${caption}`}
        >
          {sketches[variant]}
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
