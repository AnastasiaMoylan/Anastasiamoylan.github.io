import type { Decision } from "../../data/caseStudies";
import ImageGallery from "./ImageGallery";
import RejectedPath from "./RejectedPath";

/**
 * The core of the case study: three to six decisions, numbered, each carrying
 * the decision, the reasoning, and the rejected alternative.
 *
 * On the page in full since 2026-09-09. It used to sit inside a closed Details
 * disclosure with a single decision surfaced above it, which put the section
 * that proves judgment behind a click. The framework's position, and the
 * hiring-manager sources behind it, is that this is what a reviewer came for.
 *
 * The mobile "show all" control went with the same change: a disclosure is a
 * disclosure at any width, and the numbered list is the argument.
 *
 * A figure attached to a decision renders under it, because a visual earns its
 * place by carrying evidence for a specific claim.
 */
export default function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-8 p-0">
      {decisions.map((d, i) => (
        <li key={d.decision} className="flex gap-5">
          <span
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-tint-subtle font-mono text-[0.75rem] font-bold tabular-nums text-accent"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 measure text-[0.9375rem] leading-[1.7] text-muted-foreground">
              <span className="font-bold text-foreground">{d.decision}</span> {d.rationale}
            </p>
            <RejectedPath
              decision={d}
              className="mt-2 measure text-[0.8125rem] leading-[1.55] text-muted-foreground"
            />
            {d.images && d.images.length > 0 && (
              <div className="mt-6">
                <ImageGallery images={d.images} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
