import type { Decision } from "../../data/caseStudyTypes";
import ImageGallery from "./ImageGallery";
import RejectedPath from "./RejectedPath";

/**
 * The core of the case study: three to six decisions as a card grid (Layout
 * C), each carrying its mechanism, the decision, the reasoning and the
 * rejected alternative, followed by the figures that prove them.
 *
 * Two cards across at width, one on narrow screens, on a hairline grid; the
 * cells are white on the warm ground (2026-09-10; they were the ground colour
 * and the grid read as rules on a page rather than as cards). The
 * mechanism label is the citable name of what the decision produced ("the
 * six-state status model"); a named mechanism can be asked about in an
 * interview, a numbered decision cannot. A study whose decisions carry no
 * mechanism renders the number alone.
 *
 * The rejected path is always visible. The prototype opened it on hover, and
 * the device dictionary notes that hiding content on the most important
 * section of the page is a real risk and that touch has no hover; so nothing
 * here is behind a pointer, and the cards take no hover ground because they
 * are not clickable.
 *
 * A decision's figures render after the grid, under a label naming the
 * decision they prove, not inside its card. Inside the cell a 600px screen
 * beside a text-only card left a hole the height of the image, and the
 * prototype's six near-equal cards read as a matrix because they hold text
 * alone.
 */
export default function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  const ordinal = (i: number) => String(i + 1).padStart(2, "0");
  const withFigures = decisions
    .map((d, i) => ({ d, i }))
    .filter(({ d }) => d.images && d.images.length > 0);

  return (
    <div className="flex flex-col gap-12">
      <ol className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-border bg-border p-0 lg:grid-cols-2">
        {decisions.map((d, i) => (
          <li key={d.decision} className="flex min-w-0 flex-col bg-card p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className="font-mono text-label font-semibold tabular-nums text-accent"
                aria-hidden="true"
              >
                {ordinal(i)}
              </span>
              {d.mechanism && (
                <span className="font-mono text-label font-medium uppercase tracking-[0.13em] text-tertiary-700">
                  {d.mechanism}
                </span>
              )}
            </div>
            <h4 className="mt-3 m-0 font-display text-body font-bold leading-[1.35] tracking-[-0.01em] text-foreground">
              {d.decision}
            </h4>
            <p className="mt-2.5 m-0 text-small leading-[1.7] text-foreground">{d.rationale}</p>
            <RejectedPath decision={d} className="mt-3.5" />
          </li>
        ))}
      </ol>

      {withFigures.map(({ d, i }) => (
        <div key={d.decision}>
          <h5 className="m-0 mb-4 font-mono text-label font-semibold uppercase tracking-[0.09em] text-tertiary-700">
            <span className="text-accent tabular-nums">{ordinal(i)}</span>
            {" "}
            {d.mechanism ?? "The decision, shown"}
          </h5>
          <ImageGallery images={d.images!} />
        </div>
      ))}
    </div>
  );
}
