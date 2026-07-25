/**
 * Arrows and dotted rules between cards. Always decorative — the relationship
 * they show must also be stated in text, so these are aria-hidden throughout.
 *
 * On narrow screens the horizontal arrow rotates to point down, so a stacked
 * column still reads as a sequence.
 */
export function ArrowConnector({ blocked = false }: { blocked?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center py-2 md:py-0 rotate-90 md:rotate-0"
      aria-hidden="true"
    >
      <svg width="34" height="12" viewBox="0 0 34 12" fill="none" role="presentation">
        <line
          x1="0"
          y1="6"
          x2="26"
          y2="6"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray={blocked ? "4 3" : undefined}
        />
        <path d="M26 1.5 L33 6 L26 10.5 Z" fill="var(--accent)" />
        {blocked && (
          <line x1="13" y1="0" x2="13" y2="12" stroke="var(--accent)" strokeWidth="2" />
        )}
      </svg>
    </div>
  );
}

/** Dotted return line used for the pipeline's feedback loop. */
export function FeedbackLoop({ label }: { label: string }) {
  return (
    <div className="relative mt-6 hidden md:block" aria-hidden="true">
      <div className="border-t border-dashed border-accent/60" />
      <div className="flex justify-center">
        <span className="-mt-2 bg-background px-3 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent">
          {label}
        </span>
      </div>
    </div>
  );
}
