import type { Decision } from "../../data/caseStudyTypes";

/**
 * The path not taken, and what taking this one cost.
 *
 * Set as a short block under the reasoning with a maroon rule on its left and
 * "Instead of" as a label above it (Layout C). It is the honesty device that
 * makes a decision read as judgment rather than as a feature list, so it is
 * never hidden; a decision without one renders nothing here and the review
 * copy from `casestudy-md.mjs` says so.
 */
export default function RejectedPath({
  decision: { rejected, tradeoff },
  className = "",
}: {
  decision: Pick<Decision, "rejected" | "tradeoff">;
  className?: string;
}) {
  if (!rejected && !tradeoff) return null;
  return (
    <p
      className={[
        "m-0 border-l-2 border-accent pl-3 text-small leading-[1.6] text-muted-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="mb-0.5 block font-mono text-label font-semibold uppercase tracking-[0.12em] text-accent">
        Instead of
      </span>
      {rejected}
      {rejected && tradeoff && " — "}
      {tradeoff}
      {rejected && !tradeoff && "."}
    </p>
  );
}
