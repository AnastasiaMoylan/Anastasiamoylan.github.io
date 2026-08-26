/**
 * Panel anatomy for a diagram: heading, subheading, body, quiet closing line.
 *
 * The heading is an h4 and sits a clear step below the section h3 that contains
 * it, so a figure never competes with the section it belongs to. The closing
 * line was a PullQuote until 2026-08-26; with several diagrams per page that
 * meant four maroon-ruled quotes competing, so the page's one pull-quote is the
 * evidence insight and diagram closers stay quiet.
 */
export default function DiagramPanel({
  heading,
  subheading,
  quote,
  children,
}: {
  heading: string;
  subheading?: string;
  quote?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0 scroll-mt-24">
      <h4 className="m-0 text-[1.125rem] font-bold leading-[1.35] text-foreground">{heading}</h4>
      {subheading && (
        <p className="mt-1 text-sm leading-[1.6] text-muted-foreground max-w-[52rem]">{subheading}</p>
      )}

      <div className="mt-8">{children}</div>

      {quote && (
        <figcaption className="mt-8 m-0 max-w-[46rem] text-[0.8125rem] italic leading-[1.6] text-muted-foreground">
          {quote}
        </figcaption>
      )}
    </figure>
  );
}
