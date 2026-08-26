/** Closes a panel: left maroon rule, italic, indented. */
export default function PullQuote({
  children,
  as = "blockquote",
}: {
  children: React.ReactNode;
  /** `figcaption` when closing a <figure>, so the quote captions the diagram. */
  as?: "blockquote" | "figcaption";
}) {
  const className =
    "border-l-[3px] border-accent pl-6 m-0 text-[0.9375rem] italic leading-[1.6] text-foreground/85 measure";

  if (as === "figcaption") {
    return <figcaption className={className}>{children}</figcaption>;
  }
  return <blockquote className={className}>{children}</blockquote>;
}
