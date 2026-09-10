/**
 * The page's structural breaker (Layout C): a maroon rule on the left and the
 * line at lead size, medium weight, upright. The reference research found
 * pull quotes work as breakers mid-scroll, not as decoration, so there is one
 * per study and it carries the reframing insight.
 */
export default function PullQuote({
  children,
  as = "blockquote",
}: {
  children: React.ReactNode;
  as?: "blockquote" | "figcaption";
}) {
  const className =
    "m-0 max-w-[42rem] border-l-[3px] border-accent pl-6 text-lead font-medium leading-[1.5] text-foreground";

  if (as === "figcaption") {
    return <figcaption className={className}>{children}</figcaption>;
  }
  return <blockquote className={className}>{children}</blockquote>;
}
