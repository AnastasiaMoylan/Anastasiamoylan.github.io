import type { Decision } from "../../data/caseStudies";

/**
 * "Instead of …" line under a decision: the path not taken and what choosing
 * the other one cost. Renders nothing when the decision carries neither.
 * Shared by the featured decision and the deep-dive list so the two stay
 * identical in wording and punctuation.
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
    <p className={["m-0 text-muted-foreground", className].filter(Boolean).join(" ")}>
      <span className="mr-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-accent">
        Instead of
      </span>
      {rejected}
      {rejected && tradeoff && " — "}
      {tradeoff}
      {rejected && !tradeoff && "."}
    </p>
  );
}
