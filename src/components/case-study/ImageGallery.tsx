import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { CaseStudyImage } from "../../data/caseStudyTypes";
import ImageLightbox from "../work/ImageLightbox";

/**
 * Captioned figures, each enlargeable (Layout C's `.fig`): the image on a
 * hairline frame, the caption beneath it in small italics stating what the
 * figure proves. No inner padding around the image, so a screen reads as a
 * screen rather than as a card holding one.
 */
export default function ImageGallery({ images }: { images: CaseStudyImage[] }) {
  const [active, setActive] = useState<CaseStudyImage | null>(null);
  return (
    <>
      <div className="flex flex-col gap-8">
        {images.map((image) => (
          <figure key={image.src} className="m-0 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActive(image)}
              aria-label={`Enlarge image: ${image.caption}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-card p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/*
                A panel with a display scale renders at that fraction of its
                source width, so its labels stay legible, and scrolls sideways
                inside this container when it is wider than the column. The
                page itself never scrolls sideways. Everything else fits the
                column.
              */}
              {image.displayScale ? (
                <div className="overflow-x-auto">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    style={{ width: image.width * image.displayScale }}
                    className="block h-auto max-w-none"
                    loading="lazy"
                  />
                </div>
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              )}
              {/*
                Always visible, not hover-revealed: touch devices have no hover,
                and on desktop a reader scrolling past never learns the flows
                zoom, which the wide boards need.
              */}
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-90 transition-all duration-150 group-hover:bg-black/70 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn size={18} />
              </span>
            </button>
            <figcaption className="max-w-[56ch] text-small italic leading-[1.65] text-muted-foreground">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {active && <ImageLightbox image={active} onClose={() => setActive(null)} />}
    </>
  );
}
