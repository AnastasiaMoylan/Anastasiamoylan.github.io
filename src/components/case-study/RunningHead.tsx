import { useEffect, useRef, useState } from "react";
import type { SectionGroup } from "./sectionGroups";

/**
 * The running head (Plates layout, 2026-09-11): the page's one navigation.
 * It replaced the chapter bar. Sticky under the site header, 40px, mono:
 * "02 · The work · Key decisions", the three parts as links at the right,
 * and a 2px maroon progress line as its bottom edge.
 *
 * It inverts to ink-on-champagne while it sits over an ink ground (a part
 * opener or a screen plate), so it never reads as a pale strip laid over a
 * dark band. Everything is computed in one scroll handler, throttled to a
 * frame: which part and section are under the head, how far down the page
 * the reader is, and whether an ink ground is behind it. State changes only
 * when one of those does; the progress line is written to the DOM directly.
 */
const SITE_HEADER = 72;
const HEAD = 40;

export default function RunningHead({
  groups,
  sections,
}: {
  groups: SectionGroup[];
  sections: { id: string; group: string; nav: string }[];
}) {
  const [part, setPart] = useState(groups[0]);
  const [section, setSection] = useState<string | undefined>(undefined);
  const [overInk, setOverInk] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const band = SITE_HEADER + HEAD;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;

      let currentPart = groups[0];
      for (const g of groups) {
        const el = document.getElementById(g.anchor);
        if (el && el.getBoundingClientRect().top <= band + 1) currentPart = g;
      }
      let currentSection: string | undefined;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= band + 24) currentSection = s.nav;
      }
      let ink = false;
      document.querySelectorAll<HTMLElement>('[data-ground="ink"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < band && r.bottom > SITE_HEADER) ink = true;
      });

      setPart((p) => (p.id === currentPart.id ? p : currentPart));
      setSection((s) => (s === currentSection ? s : currentSection));
      setOverInk((o) => (o === ink ? o : ink));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [groups, sections]);

  // Show the section only once the reader is inside the current part.
  const sectionInPart = sections.some((s) => s.nav === section && s.group === part.id) ? section : undefined;

  return (
    <nav aria-label="Case study parts" className="cs-rh" data-over-ink={overInk ? "" : undefined}>
      <div className="content-container cs-grid cs-label">
        <p className="cs-rh-now">
          <a href={`#${part.anchor}`}>
            {part.ordinal}
            <span className="cs-sep" aria-hidden="true">·</span>
            {part.title}
          </a>
          {sectionInPart && (
            <>
              <span className="cs-sep" aria-hidden="true">·</span>
              {sectionInPart}
            </>
          )}
        </p>
        <ol className="cs-rh-parts list-none p-0">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.anchor}`} aria-current={g.id === part.id ? "true" : undefined} aria-label={`Part ${g.ordinal}, ${g.title}`}>
                {g.ordinal}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span ref={bar} className="cs-rh-bar" aria-hidden="true" />
    </nav>
  );
}
