import type { ReactNode } from "react";
import type { SectionGroup } from "./sectionGroups";

/**
 * One of the three parts (Plates layout, 2026-09-11): a full-bleed ink band
 * that opens it, then its sections on the warm ground.
 *
 * The band carries the numeral (Archivo at its widest, ghosted in teal on
 * ink), the part's name, its one-line promise in the voice face, and its
 * contents as a mono list of links. Three ink bands down the page are what
 * make the grouping legible at scroll speed; the numeral is `aria-hidden`
 * and the h2 carries a visually hidden "Part 01:" so a screen reader hears
 * what the eye sees. `data-ground="ink"` lets the running head invert over it.
 */
export default function Part({
  group,
  items,
  children,
}: {
  group: SectionGroup;
  /** The part's sections, for the contents list. */
  items: { id: string; nav: string }[];
  children: ReactNode;
}) {
  const titleId = `${group.anchor}-title`;
  return (
    <section id={group.anchor} data-group={group.id} aria-labelledby={titleId} className="cs-part scroll-mt-32">
      <div className="cs-opener" data-ground="ink">
        <div className="content-container cs-grid">
          <p className="cs-numeral" aria-hidden="true">
            {group.ordinal}
          </p>
          <h2 id={titleId} className="cs-h2">
            <span className="sr-only">Part {group.ordinal}: </span>
            {group.title}
          </h2>
          <p className="cs-deck">{group.subtitle}.</p>
          <ul className="cs-contents cs-label list-none p-0">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.nav}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {children}
    </section>
  );
}
