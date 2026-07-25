import { useState, useEffect } from "react";
import type { Section } from "./types";

/** Sticky in-page nav; highlights the section nearest the top of the viewport. */
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
    <nav className="hidden lg:block shrink-0 w-44 self-start sticky top-24" aria-label="On this page">
      <ul className="list-none p-0 m-0 flex flex-col gap-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={[
                "block pl-3.5 pr-3 py-1.5 text-sm no-underline border-l-2 transition-colors duration-150",
                active === s.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {s.nav}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
