import { useState, useEffect } from "react";
import type { Section } from "./types";

/**
 * Sticky in-page nav, restyled 2026-08-26: a compact numbered mono rail in the
 * site's ordinal language rather than a text list with a border indicator.
 * Narrower than the old rail on purpose — the content column gets the width.
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
      <p className="m-0 mb-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        On this page
      </p>
      <ul className="list-none p-0 m-0 flex flex-col">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={[
                  "group flex items-baseline gap-2.5 py-[0.4375rem] no-underline transition-colors duration-150",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-mono text-[0.625rem] tabular-nums transition-colors duration-150",
                    isActive ? "text-accent font-semibold" : "text-tertiary-500 group-hover:text-tertiary-700",
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
