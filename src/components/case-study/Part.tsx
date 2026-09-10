import type { ReactNode } from "react";
import type { SectionGroup } from "./sectionGroups";

/**
 * One of the three parts of a case study: the opener and the frame its
 * children sit in.
 *
 * The opener is a display-size ordinal beside the part's name and its one-line
 * promise. Three big numerals down the page are what make the grouping legible
 * at a glance; the children's h3s are unchanged, because the fix is contrast in
 * kind, not another heading size.
 *
 * At `lg` the numeral is also the running head: it sits in a gutter column that
 * spans the whole part, so `sticky` keeps it pinned top-left while the children
 * scroll past — mid-way through Key decisions the reader still sees the "02". A
 * hairline on the gutter's edge runs the part's full height, the site's teal
 * timeline-marker language, and the children's own dividers meet it as a T.
 *
 * The numeral is teal, not maroon: it locates, it does not act. It is
 * `aria-hidden`, and the h2 carries a visually hidden "Part 01:" so a screen
 * reader hears the same thing the eye sees.
 *
 * Two things were removed 2026-09-09. A contents line listing the part's
 * children sat here, which made a third navigation on a page that already had
 * two; `OnThisPage` is now the only one. And a full-bleed tint on one part was
 * a two-percent difference against the page ground — the device was right, the
 * contrast never was, so the numerals carry the chapter break alone.
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
      aria-labelledby={titleId}
      className="scroll-mt-24 grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-6 lg:grid-cols-[6rem_1fr] lg:gap-x-0"
    >
      {/* Gutter: the numeral, sticky at lg, with the margin rule on its edge. */}
      <div className="lg:row-span-2 lg:border-r lg:border-tertiary-100">
        <span
          aria-hidden="true"
          className="block font-display text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-tertiary-700 tabular-nums lg:sticky lg:top-24"
        >
          {group.ordinal}
        </span>
      </div>

      <header className="min-w-0 pt-1 lg:pl-8">
        <h2
          id={titleId}
          className="m-0 font-display text-h2 font-extrabold tracking-[-0.03em] text-foreground"
        >
          <span className="sr-only">Part {group.ordinal}: </span>
          {group.title}
        </h2>
        <p className="mt-3 m-0 max-w-[40ch] text-lead text-muted-foreground">{group.subtitle}</p>
      </header>

      <div className="col-span-2 min-w-0 lg:col-span-1 lg:pl-8">
        <div className="mt-10 flex flex-col gap-12 lg:mt-12">{children}</div>
      </div>
    </section>
  );
}
