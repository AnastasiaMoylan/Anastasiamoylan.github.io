import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import useZoomPan from "../../hooks/useZoomPan";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

export interface LightboxImage {
  /** Preview asset shown inline in the gallery (already in the browser cache). */
  src: string;
  /** Full-resolution original, swapped in once it finishes loading. */
  fullSrc?: string;
  alt: string;
  caption: string;
}

/**
 * Full-screen image dialog. The zoom and pan behaviour lives in `useZoomPan`;
 * this component owns the dialog chrome, focus, the keyboard map, the body
 * scroll lock, and the swap from preview to full-resolution asset.
 */
export default function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [displaySrc, setDisplaySrc] = useState(image.src);
  const { view, dragging, maxScale, zoomTo, reset, pan, onNaturalSize, onImageClick, pointerHandlers } =
    useZoomPan(stageRef);

  useBodyScrollLock(true);

  // Swap in the full-resolution original once it has loaded.
  useEffect(() => {
    const full = image.fullSrc;
    if (!full || full === image.src) return;
    let cancelled = false;
    const loader = new Image();
    loader.onload = () => {
      if (!cancelled) setDisplaySrc(full);
    };
    loader.src = full;
    return () => {
      cancelled = true;
    };
  }, [image]);

  // Focus management and keyboard controls.
  useEffect(() => {
    closeBtnRef.current?.focus();
    const PAN_STEP = 80;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const step = (dx: number, dy: number) => {
        if (pan(dx, dy)) e.preventDefault();
      };
      if (e.key === "+" || e.key === "=") zoomTo(view.scale * 1.5);
      else if (e.key === "-" || e.key === "_") zoomTo(view.scale / 1.5);
      else if (e.key === "0") reset();
      else if (e.key === "ArrowLeft") step(PAN_STEP, 0);
      else if (e.key === "ArrowRight") step(-PAN_STEP, 0);
      else if (e.key === "ArrowUp") step(0, PAN_STEP);
      else if (e.key === "ArrowDown") step(0, -PAN_STEP);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, zoomTo, reset, pan, view.scale]);

  const zoomPct = Math.round(view.scale * 100);
  const loadingFull = Boolean(image.fullSrc && image.fullSrc !== image.src && displaySrc !== image.fullSrc);

  const toolbarBtn =
    "flex items-center justify-center w-10 h-10 rounded-sm bg-white/10 text-white hover:bg-white/20 cursor-pointer transition-colors duration-150 disabled:opacity-40 disabled:cursor-default";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged view: ${image.alt}`}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-end gap-2 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {loadingFull && (
          <span className="text-xs text-white/50 mr-auto" role="status">
            Loading full resolution&hellip;
          </span>
        )}
        <button
          type="button"
          className="h-10 px-3 rounded-sm bg-white/10 text-white text-[0.8125rem] tabular-nums hover:bg-white/20 cursor-pointer transition-colors duration-150 disabled:opacity-40 disabled:cursor-default"
          onClick={reset}
          disabled={view.scale === 1}
          aria-label="Reset zoom to fit"
          title="Reset zoom"
        >
          {zoomPct}%
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => zoomTo(view.scale / 1.5)}
          disabled={view.scale <= 1}
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => zoomTo(view.scale * 1.5)}
          disabled={view.scale >= maxScale}
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </button>
        <button
          ref={closeBtnRef}
          type="button"
          className={toolbarBtn}
          onClick={onClose}
          aria-label="Close enlarged view"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 min-h-0 px-4 overflow-hidden">
        <div
          ref={stageRef}
          className="relative h-full w-full flex items-center justify-center"
        >
          <img
            src={displaySrc}
            alt={image.alt}
            onLoad={(e) => onNaturalSize(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)}
            onClick={onImageClick}
            {...pointerHandlers}
            draggable={false}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
              transition: dragging ? "none" : "transform 0.18s ease-out",
              cursor: view.scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
              touchAction: "none",
              willChange: "transform",
            }}
            className="max-w-full max-h-full object-contain select-none"
          />
        </div>
      </div>

      <p
        className="text-center text-sm text-white/70 italic px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {image.caption}
      </p>
    </div>
  );
}
