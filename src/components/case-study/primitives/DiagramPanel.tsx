import PullQuote from "./PullQuote";

/**
 * Panel anatomy for a diagram: heading, subheading, body, closing pull quote.
 *
 * The heading is an h4 and sits a clear step below the section h3 that contains
 * it, so a figure never competes with the section it belongs to.
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
        <div className="mt-10">
          <PullQuote as="figcaption">{quote}</PullQuote>
        </div>
      )}
    </figure>
  );
}
