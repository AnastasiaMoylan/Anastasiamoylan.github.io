import { useState, useEffect } from "react";
import { SECTION_GROUPS } from "./sectionGroups";
import type { Section } from "./types";

/**
 * The page's one navigation (2026-09-09).
 *
 * It replaced three: a chip row under the stat band, a sticky rail, and a
 * contents line inside every part opener — all visible at once, which reads as
 * a page that does not trust its reader. Only three of twenty-five agencies
 * surveyed have any in-page navigation and none has two.
 *
 * The list carries the three parts and, under each, its child sections named by
 * their own headings rather than by generic labels, so the nav doubles as the
 * argument in outline. Vertical and sticky on wide screens; the same markup
 * becomes a horizontal chip strip below `lg`, so there is still exactly one.
 *
 * Scroll-spy watches the SECTIONS, not the headings. A heading is a few pixels
 * tall and slips through the trigger band when the reader scrolls quickly, and
 * observing the parts as well made a part and its own child compete for the
 * active state, with the part always winning because it starts higher up the
 * page. The child is what is watched; the part it belongs to is derived.
 */
export default function OnThisPage({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const activeGroup = sections.find((s) => s.id === active)?.group;
  const groups = SECTION_GROUPS.map((group) => ({
    group,
    children: sections.filter((s) => s.group === group.id),
  })).filter((g) => g.children.length > 0);

  return (
    <nav aria-label="On this page" className="lg:col-span-3 lg:self-start lg:sticky lg:top-8">
      <p className="m-0 hidden border-b border-border pb-3 font-mono text-label font-semibold uppercase tracking-[0.1em] text-muted-foreground lg:block">
        On this page
      </p>

      {/*
        Below lg the same links become a horizontal strip that sticks under the
        site header. It is the only in-page orientation a phone gets, so it
        carries the parts only — eight entries would not fit.
      */}
      <ul className="m-0 flex list-none gap-2 overflow-x-auto p-0 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {groups.map(({ group }) => (
          <li key={group.id}>
            <a
              href={`#${group.anchor}`}
              aria-current={activeGroup === group.id ? "true" : undefined}
              className={[
                "block whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-label font-semibold uppercase tracking-[0.08em] no-underline transition-colors duration-150",
                activeGroup === group.id
                  ? "border-accent text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span className="mr-1.5 text-tertiary-500 tabular-nums" aria-hidden="true">
                {group.ordinal}
              </span>
              {group.title}
            </a>
          </li>
        ))}
      </ul>

      <ol className="m-0 hidden list-none flex-col gap-6 p-0 pt-4 lg:flex">
        {groups.map(({ group, children }) => {
          const on = activeGroup === group.id;
          return (
            <li key={group.id}>
              <a
                href={`#${group.anchor}`}
                aria-current={on ? "true" : undefined}
                className={[
                  "flex items-baseline gap-2 py-1 font-mono text-label font-semibold uppercase tracking-[0.1em] no-underline transition-colors duration-150",
                  on ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={["tabular-nums", on ? "text-accent" : "text-tertiary-500"].join(" ")}
                >
                  {group.ordinal}
                </span>
                {group.title}
              </a>

              <ol className="m-0 mt-2 ml-[0.4375rem] list-none border-l border-border p-0 pl-4">
                {children.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "-ml-px block border-l-2 py-1.5 pl-4 text-small leading-[1.35] no-underline transition-colors duration-150",
                          isActive
                            ? "border-accent font-semibold text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                      >
                        {s.nav}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
