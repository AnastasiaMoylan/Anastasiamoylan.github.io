import type { ReactNode } from "react";
import type { SectionGroup } from "./sectionGroups";

/**
 * One of the three parts of a case study (Layout C): the opener and the frame
 * its children sit in.
 *
 * The opener is a display-size ordinal in mid teal (it was ghosted in the
 * lightest teal until 2026-09-10, and vanished into the ground), beside
 * the part's name and its one-line promise. Three big numerals down the page
 * are what make the grouping legible at a glance; the children's h3s carry
 * the study's own claims, so the parent's job is contrast in kind, not
 * another heading size.
 *
 * The numeral is teal, not maroon: it locates, it does not act. It is
 * `aria-hidden`, and the h2 carries a visually hidden "Part 01:" so a screen
 * reader hears the same thing the eye sees.
 *
 * Parts are separated by a hairline; children inside a part are separated by
 * space alone, since their headings are sentences and do the dividing.
 */
export default function Part({
  group,
  children,
}: {
  group: SectionGroup;
  children: ReactNode;
}) {
  const titleId = `${group.anchor}-title`;

  return (
    <section
      id={group.anchor}
      data-group={group.id}
      aria-labelledby={titleId}
      className="scroll-mt-32 border-t border-border py-[clamp(3rem,7vw,5.5rem)] first:border-t-0"
    >
      <header className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[auto_1fr] lg:gap-10">
        <span
          aria-hidden="true"
          className="block font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-tertiary-500 tabular-nums"
        >
          {group.ordinal}
        </span>
        <div className="min-w-0">
          <h2
            id={titleId}
            className="m-0 font-display text-h2 font-extrabold tracking-[-0.03em] text-foreground"
          >
            <span className="sr-only">Part {group.ordinal}: </span>
            {group.title}
          </h2>
          <p className="mt-1.5 m-0 max-w-[46ch] text-small leading-[1.6] text-muted-foreground">
            {group.subtitle}
          </p>
        </div>
      </header>

      <div className="mt-[clamp(2.25rem,5vw,3.5rem)] flex flex-col gap-[clamp(2.25rem,5vw,3.5rem)]">
        {children}
      </div>
    </section>
  );
}
