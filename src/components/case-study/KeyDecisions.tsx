import type { Decision } from "../../data/caseStudyTypes";
import ImageGallery from "./ImageGallery";
import RejectedPath from "./RejectedPath";

/**
 * The core of the case study: three to six decisions as a card grid (Layout
 * C), each carrying its mechanism, the decision, the reasoning, the rejected
 * alternative, and the figure that proves it.
 *
 * Two cards across at width, one on narrow screens, on a hairline grid. The
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
 * A figure attached to a decision renders inside its card, because a visual
 * earns its place by carrying evidence for a specific claim.
 */
export default function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-border bg-border p-0 lg:grid-cols-2">
      {decisions.map((d, i) => (
        <li key={d.decision} className="flex min-w-0 flex-col bg-background p-6 sm:p-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="font-mono text-label font-semibold tabular-nums text-accent"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
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
          <p className="mt-2.5 m-0 text-small leading-[1.7] text-muted-foreground">{d.rationale}</p>
          <RejectedPath decision={d} className="mt-3.5" />
          {d.images && d.images.length > 0 && (
            <div className="mt-6">
              <ImageGallery images={d.images} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
