import type { AnnotatedFigure as AnnotatedFigureData } from "../../data/caseStudyTypes";

/**
 * A real screen with numbered pins keyed to lines of reasoning (Layout C).
 *
 * The strongest device found in individual lead and staff portfolios: markers
 * pinned to the interface, each keyed to a line underneath naming the
 * decision it shows. It puts the thinking on the artefact instead of
 * abstracting it into a diagram. Pin positions are percentages of the image
 * box and need tuning per asset.
 *
 * The pins are decorative duplicates of the numbered list, so they are hidden
 * from assistive technology and the list carries the content. The frame is
 * not zoomable: the pins would not travel into the lightbox.
 */
export default function AnnotatedFigure({ figure }: { figure: AnnotatedFigureData }) {
  const { image, pins, caption } = figure;
  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(40,61,59,0.06),0_14px_36px_-18px_rgba(40,61,59,0.35)]">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="block h-auto w-full"
          loading="lazy"
        />
        {pins.map((pin, i) => (
          <span
            key={`${pin.x}-${pin.y}`}
            aria-hidden="true"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-label font-semibold text-background shadow-[0_0_0_3px_rgba(247,245,241,0.9)]"
          >
            {i + 1}
          </span>
        ))}
      </div>
      <ol className="m-0 mt-5 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 md:gap-x-10">
        {pins.map((pin, i) => (
          <li key={pin.text} className="flex items-start gap-3 text-small leading-[1.6] text-muted-foreground">
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-tint-subtle font-mono text-label font-semibold text-accent"
            >
              {i + 1}
            </span>
            <span>
              <span className="sr-only">{i + 1}. </span>
              {pin.text}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 max-w-[56ch] text-small italic leading-[1.65] text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
