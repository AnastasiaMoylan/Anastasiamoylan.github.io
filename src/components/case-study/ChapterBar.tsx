import { useEffect, useState } from "react";
import type { SectionGroup } from "./sectionGroups";

/**
 * The page's one navigation (Layout C, 2026-09-09): a sticky bar carrying the
 * study's title and its three parts.
 *
 * It replaced the vertical "On this page" rail. The rail listed every child
 * and took a quarter of the width for the whole scroll; the research behind
 * the layout found that only three of twenty-five agencies surveyed have any
 * in-page navigation and none has two, so the bar is as small as a navigation
 * can be while still answering "where am I" — three links, one line. There is
 * no scroll-progress line: no surveyed site uses one, and motion that is not
 * project-driven reads as distraction.
 *
 * It sticks under the site header, so its offset is the header's height.
 * Scroll-spy watches the parts themselves. The active part is the topmost one
 * intersecting a band near the top of the viewport.
 */
const HEADER_HEIGHT = "top-[72px]";

export default function ChapterBar({
  title,
  groups,
}: {
  title: string;
  groups: SectionGroup[];
}) {
  const [active, setActive] = useState<string | undefined>(groups[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.getAttribute("data-group") ?? undefined);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );
    groups.forEach((g) => {
      const el = document.getElementById(g.anchor);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav
      aria-label="Sections"
      className={[
        "sticky z-40 border-b border-border bg-background/95 backdrop-blur-md",
        HEADER_HEIGHT,
      ].join(" ")}
    >
      <div className="content-container flex h-14 items-center gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mr-auto whitespace-nowrap font-display text-small font-bold text-foreground">
          {title}
        </span>
        {groups.map((g) => {
          const on = active === g.id;
          return (
            <a
              key={g.id}
              href={`#${g.anchor}`}
              aria-current={on ? "true" : undefined}
              className={[
                "relative flex shrink-0 items-baseline gap-2 whitespace-nowrap py-1 font-mono text-label uppercase tracking-[0.1em] no-underline transition-colors duration-150",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100",
                on
                  ? "font-semibold text-foreground after:scale-x-100"
                  : "font-medium text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={["tabular-nums", on ? "text-accent" : "text-tertiary-700"].join(" ")}
              >
                {g.ordinal}
              </span>
              {g.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
