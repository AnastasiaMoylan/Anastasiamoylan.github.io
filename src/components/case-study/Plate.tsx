import type { ReactNode } from "react";

/**
 * One plate (Plates layout, 2026-09-11): an artefact on its own full-bleed
 * ground, a mono label numbered by the page's plate counter, then the
 * caption and the margin note on the warm ground below.
 *
 * The ground is chosen by what the artefact is, never by taste: screens on
 * ink, drawn diagrams on champagne, tables and typographic settings on white
 * or champagne. The number is a CSS counter in case-study.css, so plates
 * number themselves in render order and the data never carries a count.
 *
 * The root is a subgrid, so a plate lines up on the page's twelve columns
 * whether it sits in a section or inside a decision.
 */
export type Ground = "ink" | "champagne" | "white";

export default function Plate({
  ground,
  label,
  caption,
  note,
  onEnlarge,
  enlargeLabel,
  className = "",
  children,
}: {
  ground: Ground;
  /** Two or three words; the page prefixes "Plate 04 ·". */
  label: string;
  caption?: ReactNode;
  /** The "Instead of" line, set in the margin column beside the caption. */
  note?: ReactNode;
  onEnlarge?: () => void;
  /** Accessible name for the enlarge control. */
  enlargeLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={["cs-plate", className].filter(Boolean).join(" ")}>
      <div className="cs-ground" data-ground={ground}>
        <div className="content-container cs-grid">
          <p className="cs-plate-label cs-label">{label}</p>
          {onEnlarge && (
            <button
              type="button"
              className="cs-enlarge cs-label"
              onClick={onEnlarge}
              aria-label={enlargeLabel ?? `Enlarge: ${label}`}
            >
              Enlarge ↗
            </button>
          )}
          <div className="cs-art">{children}</div>
        </div>
      </div>
      {caption && <figcaption className="cs-cap cs-small">{caption}</figcaption>}
      {note}
    </figure>
  );
}

/**
 * A caption with its first clause set as the bold lead-in, the way the
 * reference rendering sets them: "Six states, two recovery loops." then the
 * explanation. Splits at the first sentence or clause end; a caption with
 * none is set whole.
 */
export function leadIn(text: string): ReactNode {
  const match = text.match(/^(.+?[.;:])\s+(.+)$/s);
  if (!match) return text;
  return (
    <>
      <b>{match[1]}</b> {match[2]}
    </>
  );
}
