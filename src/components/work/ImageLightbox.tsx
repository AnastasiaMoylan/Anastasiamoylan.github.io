import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, v));

export default function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });
  const areaRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus management, scroll lock, and keyboard controls.
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") setScale((s) => clamp(s + 0.5));
      else if (e.key === "-" || e.key === "_") setScale((s) => clamp(s - 0.5));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Wheel-to-zoom needs a non-passive listener to allow preventDefault.
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => clamp(s - e.deltaY * 0.0025));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Recenter when zoomed back out to fit.
  useEffect(() => {
    if (scale === 1) setPos({ x: 0, y: 0 });
  }, [scale]);

  const toggleZoom = () => setScale((s) => (s > 1 ? 1 : 2.5));

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale === 1) return;
    setDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPos((p) => ({
      x: p.x + (e.clientX - last.current.x),
      y: p.y + (e.clientY - last.current.y),
    }));
    last.current = { x: e.clientX, y: e.clientY };
  };
  const endDrag = () => setDragging(false);

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
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => setScale((s) => clamp(s - 0.5))}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          type="button"
          className={toolbarBtn}
          onClick={() => setScale((s) => clamp(s + 0.5))}
          disabled={scale >= MAX_SCALE}
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

      <div
        ref={areaRef}
        className="flex-1 flex items-center justify-center overflow-hidden px-4"
      >
        <img
          src={image.src}
          alt={image.alt}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          draggable={false}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: dragging ? "none" : "transform 0.15s ease-out",
            cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in",
          }}
          className="max-w-full max-h-full object-contain select-none"
        />
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
