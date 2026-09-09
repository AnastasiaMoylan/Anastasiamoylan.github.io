import { useState, useEffect } from "react";
import type { Section } from "./types";

/**
 * Sticky in-page nav, restyled 2026-08-26: a compact numbered mono rail in the
 * site's ordinal language rather than a text list with a border indicator.
 * Narrower than the old rail on purpose — the content column gets the width.
 *
 * Since 2026-09-04 the rail marks where the trailer ends and the proof begins:
 * a hairline and a micro-label before the first proof-layer section. The
 * numbering keeps running across the break, so anchors and the reading order
 * are unchanged; the label only tells a screener where the five-minute read
 * stops.
 */
export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      className="hidden lg:block lg:col-span-2 self-start sticky top-28"
      aria-label="On this page"
    >
      <p className="m-0 mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        On this page
      </p>
      <ul className="list-none p-0 m-0 flex flex-col">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          const startsProof = s.layer === "proof" && sections[i - 1]?.layer === "trailer";
          return (
            <li key={s.id} className={startsProof ? "mt-3 border-t border-border pt-3" : ""}>
              {startsProof && (
                <p className="m-0 mb-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  The proof
                </p>
              )}
              <a
                href={`#${s.id}`}
                className={[
                  "group flex items-baseline gap-2.5 py-[0.4375rem] no-underline transition-colors duration-150",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-mono text-[0.6875rem] tabular-nums transition-colors duration-150",
                    isActive ? "text-accent font-semibold" : "text-tertiary-700 group-hover:text-foreground",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={[
                    "font-mono text-[0.6875rem] uppercase tracking-[0.08em]",
                    isActive ? "font-semibold" : "",
                  ].join(" ")}
                >
                  {s.nav}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
