import type { Opener as OpenerPair } from "../../data/caseStudyTypes";

/**
 * The opening image pair, edge to edge on the teal ground (Layout C).
 *
 * One close-up, one in context, in that order. A reviewer's first gate is
 * visual quality in the first thirty seconds, and a distant mockup does not
 * pass it, so the detail comes first and is cropped tight. Both crops are
 * fixed ratios so the band has a known height before the images load.
 *
 * The caption's first line is tinted so it reads as the figure's claim and the
 * rest as its explanation, the same first-line device the prototype used.
 * These two images are not zoomable: they set the tone, and every substantive
 * figure further down is a captioned, enlargeable one.
 */
export default function Opener({ opener }: { opener: OpenerPair }) {
  const caption =
    "mt-3.5 max-w-[48ch] text-small leading-[1.6] text-tertiary-100 [&::first-line]:text-accent-tint-light";
  return (
    <section aria-label="Opening figures" className="bg-tertiary-900 py-[clamp(1.5rem,3.5vw,3rem)]">
      <div className="content-container grid grid-cols-1 gap-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:gap-8">
        <figure className="m-0">
          <img
            src={opener.detail.src}
            alt={opener.detail.alt}
            width={opener.detail.width}
            height={opener.detail.height}
            className="aspect-[4/3] w-full rounded-md bg-card object-cover object-[12%_30%]"
          />
          <figcaption className={caption}>{opener.detail.caption}</figcaption>
        </figure>
        <figure className="m-0">
          <img
            src={opener.context.src}
            alt={opener.context.alt}
            width={opener.context.width}
            height={opener.context.height}
            className="aspect-[16/10] w-full rounded-md bg-card object-cover object-top"
          />
          <figcaption className={caption}>{opener.context.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
