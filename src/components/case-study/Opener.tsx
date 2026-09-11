import { useState } from "react";
import type { Opener as OpenerPair } from "../../data/caseStudyTypes";
import ImageLightbox from "../work/ImageLightbox";
import Plate, { leadIn } from "./Plate";

/**
 * The hero: plate 01, the study's close-up of real interface detail, on ink
 * (Plates layout, 2026-09-11). A reviewer's first gate is visual quality in
 * the first thirty seconds, and a distant mockup does not pass it, so the
 * detail comes first. It fits the viewport height rather than the column so
 * the plate stays within one screen.
 *
 * Only the close-up renders. The opener's `context` image was the wide half
 * of the old two-image band; on every study that has one it is the same
 * screen as a decision's plate, and a screen appears once.
 */
export default function Opener({ opener }: { opener: OpenerPair }) {
  const [open, setOpen] = useState(false);
  const image = opener.detail;
  const label = image.label ?? "Close up";
  return (
    <div className="content-container cs-grid cs-hero">
      <Plate
        ground="ink"
        label={label}
        caption={leadIn(image.caption)}
        onEnlarge={() => setOpen(true)}
        enlargeLabel={`Enlarge: ${label}`}
      >
        <button type="button" className="cs-frame cs-zoom block w-full p-0" onClick={() => setOpen(true)} aria-label={`Enlarge: ${label}`}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
        </button>
      </Plate>
      {open && <ImageLightbox image={image} onClose={() => setOpen(false)} />}
    </div>
  );
}
