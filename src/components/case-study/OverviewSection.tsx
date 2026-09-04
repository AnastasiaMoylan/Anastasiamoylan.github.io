/**
 * The overview paragraph: what this was, what I owned, the headline outcome.
 *
 * The situation and constraint used to trail it here; since 2026-09-04 they
 * open Problem instead, so this section stays the two-to-four-sentence
 * summary a screener reads first. `context` is still accepted for any caller
 * that wants the old pairing.
 */
export default function OverviewSection({
  overview,
  context,
}: {
  overview: string;
  /** Situation, why it mattered, the constraint. Optional when the overview already carries it. */
  context?: string;
}) {
  return (
    <div>
      <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{overview}</p>
      {context && (
        <p className="mt-5 m-0 measure text-base leading-[1.7] text-muted-foreground">
          {context}
        </p>
      )}
    </div>
  );
}
