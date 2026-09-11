import type { Decision } from "../../data/caseStudyTypes";

/**
 * The path not taken, and what taking this one cost: the "Instead of" line.
 *
 * Plates layout (2026-09-11): set in the voice face, italic, with the label
 * in maroon. When the decision has a plate it sits in the margin column
 * beside that plate's caption; when it has none it sits under the reasoning.
 * The placement is the caller's; this only draws the line. A decision with
 * neither a rejected path nor a cost renders nothing, and the review copy
 * from `casestudy-md.mjs` says so.
 */
export default function RejectedPath({
  decision: { rejected, tradeoff },
}: {
  decision: Pick<Decision, "rejected" | "tradeoff">;
}) {
  if (!rejected && !tradeoff) return null;
  return (
    <p className="cs-note">
      <b>Instead of</b>
      {rejected}
      {rejected && tradeoff && "; "}
      {tradeoff}
      {!/[.!?]$/.test((tradeoff ?? rejected ?? "").trim()) && "."}
    </p>
  );
}
