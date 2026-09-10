import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";

/**
 * Zoom and pan for one image inside a stage element: wheel-to-zoom toward the
 * cursor, two-finger pinch, one-finger or mouse drag when zoomed, tap or
 * click to toggle zoom at a point, and keyboard-driven steps for the caller
 * to wire up. Extracted from `ImageLightbox` on 2026-09-10 so the dialog is
 * only a dialog.
 *
 * Geometry: the image renders at its fitted (object-contain) size and the
 * zoom/pan is a transform on top of that. The hook needs the image's natural
 * size (report it from `onLoad` with `onNaturalSize`) and the stage's size
 * (measured here with a ResizeObserver) to clamp panning and cap zoom at the
 * image's native resolution.
 */

interface Size {
  w: number;
  h: number;
}

export interface View {
  scale: number;
  x: number;
  y: number;
}

export const FIT: View = { scale: 1, x: 0, y: 0 };
const TAP_ZOOM_SCALE = 2.5;
const clampNum = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function useZoomPan(stageRef: React.RefObject<HTMLElement>) {
  const [view, setView] = useState<View>(FIT);
  const [dragging, setDragging] = useState(false);
  const [natural, setNatural] = useState<Size | null>(null);
  const [stageSize, setStageSize] = useState<Size | null>(null);

  // Active pointers, for one-finger pan and two-finger pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  // Set once a gesture moves far enough that pointer-up should not count as a tap.
  const movedRef = useRef(false);

  const base: Size | null =
    natural && stageSize
      ? (() => {
          const fit = Math.min(1, stageSize.w / natural.w, stageSize.h / natural.h);
          return { w: natural.w * fit, h: natural.h * fit };
        })()
      : null;

  // Zoom no further than the image's native pixels (min 3x so small images
  // still magnify, capped at 8x).
  const maxScale = base ? clampNum(natural!.w / base.w, 3, 8) : 3;

  // Refs so pointer/wheel handlers always see current geometry.
  const geo = useRef({ base, stageSize, maxScale, scale: view.scale });
  geo.current = { base, stageSize, maxScale, scale: view.scale };

  const clampView = useCallback((v: View): View => {
    const { base: b, stageSize: s } = geo.current;
    if (!b || !s) return v;
    const maxX = Math.max(0, (b.w * v.scale - s.w) / 2);
    const maxY = Math.max(0, (b.h * v.scale - s.h) / 2);
    return { scale: v.scale, x: clampNum(v.x, -maxX, maxX), y: clampNum(v.y, -maxY, maxY) };
  }, []);

  /**
   * Zoom to `targetScale`, keeping the image point under `origin` (stage
   * coordinates relative to the stage center) fixed on screen.
   */
  const zoomTo = useCallback(
    (targetScale: number, origin?: { x: number; y: number }) => {
      setView((v) => {
        const scale = clampNum(targetScale, 1, geo.current.maxScale);
        if (scale === v.scale) return v;
        const p = origin ?? { x: 0, y: 0 };
        const ratio = scale / v.scale;
        return clampView({
          scale,
          x: p.x - (p.x - v.x) * ratio,
          y: p.y - (p.y - v.y) * ratio,
        });
      });
    },
    [clampView],
  );

  const reset = useCallback(() => setView(FIT), []);

  /** Pan by a delta in stage pixels; a no-op when not zoomed. */
  const pan = useCallback(
    (dx: number, dy: number) => {
      if (geo.current.scale <= 1) return false;
      setView((v) => clampView({ ...v, x: v.x + dx, y: v.y + dy }));
      return true;
    },
    [clampView],
  );

  const toStagePoint = useCallback(
    (clientX: number, clientY: number) => {
      const rect = stageRef.current!.getBoundingClientRect();
      return {
        x: clientX - rect.left - rect.width / 2,
        y: clientY - rect.top - rect.height / 2,
      };
    },
    [stageRef],
  );

  // Wheel-to-zoom toward the cursor; non-passive to allow preventDefault.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0022);
      zoomTo(geo.current.scale * factor, toStagePoint(e.clientX, e.clientY));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [stageRef, zoomTo, toStagePoint]);

  // Track the stage size so fit/clamp math follows window resizes.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(() => {
      measure();
      setView((v) => clampView(v));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [stageRef, clampView]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) movedRef.current = false;
    else movedRef.current = true; // multi-touch is never a tap
    // Disable the transform transition while a pan or pinch is active.
    if (pointers.current.size === 2 || geo.current.scale > 1) setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const curr = { x: e.clientX, y: e.clientY };

    if (pointers.current.size === 2) {
      // Pinch: zoom by the change in finger distance, anchored at the midpoint.
      const other = [...pointers.current.entries()].find(([id]) => id !== e.pointerId)?.[1];
      if (other) {
        const distPrev = Math.hypot(prev.x - other.x, prev.y - other.y);
        const distCurr = Math.hypot(curr.x - other.x, curr.y - other.y);
        if (distPrev > 0) {
          const midPrev = toStagePoint((prev.x + other.x) / 2, (prev.y + other.y) / 2);
          const midCurr = toStagePoint((curr.x + other.x) / 2, (curr.y + other.y) / 2);
          setView((v) => {
            const scale = clampNum(v.scale * (distCurr / distPrev), 1, geo.current.maxScale);
            const ratio = scale / v.scale;
            return clampView({
              scale,
              x: midCurr.x - (midPrev.x - v.x) * ratio,
              y: midCurr.y - (midPrev.y - v.y) * ratio,
            });
          });
        }
      }
    } else if (pointers.current.size === 1 && geo.current.scale > 1) {
      // One-finger / mouse pan.
      setView((v) => clampView({ ...v, x: v.x + curr.x - prev.x, y: v.y + curr.y - prev.y }));
    }

    if (Math.hypot(curr.x - prev.x, curr.y - prev.y) > 3) movedRef.current = true;
    pointers.current.set(e.pointerId, curr);
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setDragging(false);
  };

  // Tap/click toggles zoom at that point; ignored after a drag or pinch.
  const onImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (movedRef.current) return;
    if (geo.current.scale > 1) setView(FIT);
    else zoomTo(TAP_ZOOM_SCALE, toStagePoint(e.clientX, e.clientY));
  };

  const onNaturalSize = (w: number, h: number) => setNatural({ w, h });

  return {
    view,
    dragging,
    maxScale,
    zoomTo,
    reset,
    pan,
    onNaturalSize,
    onImageClick,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
  };
}
