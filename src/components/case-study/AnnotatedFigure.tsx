import { useState, type ReactNode } from "react";
import type { AnnotatedFigure as AnnotatedFigureData } from "../../data/caseStudyTypes";
import ImageLightbox from "../work/ImageLightbox";
import Plate from "./Plate";

/**
 * A real screen with numbered pins keyed to lines of reasoning, as an ink
 * plate (Plates layout, 2026-09-11). The pin list is the caption.
 *
 * Pins and lines are linked both ways: hovering or focusing either one
 * highlights both, and activating a pin moves focus to its line, so a
 * keyboard or screen-reader user gets the same pairing the eye does. Each
 * pin names its line with `aria-describedby`.
 */
export default function AnnotatedFigure({
  figure,
  note,
}: {
  figure: AnnotatedFigureData;
  note?: ReactNode;
}) {
  const { image, pins, caption } = figure;
  const [hi, setHi] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const label = image.label ?? "Annotated screen";
  const id = (i: number) => `pin-${image.label?.toLowerCase().replace(/\W+/g, "-") ?? "screen"}-${i + 1}`;

  return (
    <>
      <Plate
        ground="ink"
        label={label}
        onEnlarge={() => setOpen(true)}
        enlargeLabel={`Enlarge: ${label}`}
        note={note}
        caption={
          <>
            <b>{caption}</b>
            <ol className="cs-pinlist">
              {pins.map((pin, i) => (
                <li
                  key={pin.text}
                  id={id(i)}
                  tabIndex={-1}
                  data-hi={hi === i ? "" : undefined}
                  onMouseEnter={() => setHi(i)}
                  onMouseLeave={() => setHi(null)}
                  onFocus={() => setHi(i)}
                  onBlur={() => setHi(null)}
                >
                  <span aria-hidden="true">{i + 1}</span>
                  <p>{pin.text}</p>
                </li>
              ))}
            </ol>
          </>
        }
      >
        <div className="cs-frame">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
          {pins.map((pin, i) => (
            <button
              key={`${pin.x}-${pin.y}`}
              type="button"
              className="cs-pin"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={`Callout ${i + 1}`}
              aria-describedby={id(i)}
              data-hi={hi === i ? "" : undefined}
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
              onFocus={() => setHi(i)}
              onBlur={() => setHi(null)}
              onClick={() => {
                setHi(i);
                document.getElementById(id(i))?.focus();
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Plate>
      {open && (
        <ImageLightbox
          image={{ src: image.src, fullSrc: image.fullSrc, alt: image.alt, caption }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
