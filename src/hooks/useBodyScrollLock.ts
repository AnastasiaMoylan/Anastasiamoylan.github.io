import { useEffect } from "react";

/**
 * Locks body scroll while `active` is true and restores whatever overflow
 * value the body had before. Used by anything that covers the page with a
 * fixed layer: the image lightbox and the mobile navigation drawer. Before
 * 2026-09-10 only the lightbox did this, and the page scrolled behind the
 * open drawer.
 */
export default function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);
}
