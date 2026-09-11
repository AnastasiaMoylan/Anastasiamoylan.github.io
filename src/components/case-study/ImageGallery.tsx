import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CaseStudyImage } from "../../data/caseStudyTypes";
import ImageLightbox from "../work/ImageLightbox";
import Plate, { leadIn } from "./Plate";

/**
 * Figures as plates (Plates layout, 2026-09-11). A screenshot sits on ink and
 * opens in the lightbox; a drawn diagram (`inlineSvg`) sits on champagne and
 * is inlined, so its labels set in the site's fonts and it needs no zoom. A
 * panel with a `displayScale` becomes a scroll plate: it renders at that
 * fraction of its source width and scrolls sideways inside its plate.
 *
 * `note` is the decision's "Instead of" line; it goes on the last plate, in
 * the margin column beside that plate's caption.
 */
export default function ImageGallery({
  images,
  label = "Figure",
  note,
}: {
  images: CaseStudyImage[];
  /** Plate label for an image that carries none of its own. */
  label?: string;
  note?: ReactNode;
}) {
  const [active, setActive] = useState<CaseStudyImage | null>(null);
  return (
    <>
      {images.map((image, i) => {
        const last = i === images.length - 1;
        const plateLabel = image.label ?? label;
        const svg = !!image.inlineSvg;
        return (
          <Plate
            key={image.src}
            ground={svg ? "champagne" : "ink"}
            label={plateLabel}
            caption={leadIn(image.caption)}
            note={last ? note : undefined}
            onEnlarge={svg ? undefined : () => setActive(image)}
            enlargeLabel={`Enlarge: ${plateLabel}`}
          >
            {svg ? (
              <div
                className="cs-frame overflow-x-auto [&>svg]:min-w-[40rem]"
                dangerouslySetInnerHTML={{ __html: image.inlineSvg! }}
              />
            ) : image.displayScale ? (
              <ScrollPlate image={image} />
            ) : (
              <button
                type="button"
                className="cs-frame cs-zoom block w-full p-0"
                onClick={() => setActive(image)}
                aria-label={`Enlarge: ${plateLabel}`}
              >
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
              </button>
            )}
          </Plate>
        );
      })}
      {active && <ImageLightbox image={active} onClose={() => setActive(null)} />}
    </>
  );
}

/**
 * A panel wider than the column at its display scale: it scrolls sideways
 * inside its plate by drag, touch, or arrow keys, and a "scroll →" hint shows
 * until the first movement, and only when there is somewhere to scroll.
 */
function ScrollPlate({ image }: { image: CaseStudyImage }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [overflows, setOverflows] = useState(false);
  const [moved, setMoved] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="cs-frame">
      <div
        ref={ref}
        className={["cs-scroller", dragging ? "is-dragging" : ""].join(" ")}
        tabIndex={0}
        role="region"
        aria-label={`${image.label ?? "Flow"}, scrolls sideways`}
        onScroll={() => setMoved(true)}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          drag.current = { x: e.clientX, left: ref.current.scrollLeft };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!drag.current || !ref.current) return;
          ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
        }}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          style={{ width: image.width * image.displayScale! }}
          draggable={false}
          loading="lazy"
        />
      </div>
      {overflows && !moved && (
        <span className="cs-scroll-hint cs-label" aria-hidden="true">
          scroll →
        </span>
      )}
    </div>
  );
}
