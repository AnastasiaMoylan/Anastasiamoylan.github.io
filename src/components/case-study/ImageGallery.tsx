import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { CaseStudyImage } from "../../data/caseStudies";
import ImageLightbox from "../work/ImageLightbox";

export default function ImageGallery({ images }: { images: CaseStudyImage[] }) {
  const [active, setActive] = useState<CaseStudyImage | null>(null);
  return (
    <>
      <div className="flex flex-col gap-8">
        {images.map((image) => (
          <figure key={image.src} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActive(image)}
              aria-label={`Enlarge image: ${image.caption}`}
              className="group relative block w-full p-0 rounded-md border border-border overflow-hidden bg-card cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img src={image.src} alt={image.alt} className="w-full h-auto block" loading="lazy" />
              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 pointer-events-none">
                <ZoomIn size={18} />
              </span>
            </button>
            <figcaption className="text-[0.8125rem] text-muted-foreground italic">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      {active && <ImageLightbox image={active} onClose={() => setActive(null)} />}
    </>
  );
}
