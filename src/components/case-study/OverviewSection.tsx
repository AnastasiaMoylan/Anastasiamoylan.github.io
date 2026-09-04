/**
 * The overview paragraph: what this was, what I owned, the headline outcome.
 *
 * The situation and constraint used to trail it here; since 2026-09-04 they
 * open Problem instead, so this section stays the two-to-four-sentence
 * summary a screener reads first, with nothing under it.
 */
export default function OverviewSection({ overview }: { overview: string }) {
  return <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{overview}</p>;
}
