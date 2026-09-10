import type { Evidence } from "../../data/caseStudies";
import TwoColumnTable from "./primitives/TwoColumnTable";

/**
 * What the research found and what changed because of it.
 *
 * A table, not a list: the framework's point is that a finding is only
 * evidence if it moved something, and putting the response in its own column
 * makes an empty one visible. A finding whose response names no change is cut
 * from the data rather than rendered with a blank cell.
 *
 * The method line leads and carries its own verification status — the
 * framework's rule is that an unverified participant count is stated as
 * unverified rather than dropped.
 */
export default function EvidenceTable({ evidence }: { evidence: Evidence }) {
  const findings = evidence.findings ?? [];

  return (
    <div className="flex flex-col gap-8">
      {evidence.body && (
        <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{evidence.body}</p>
      )}
      {findings.length > 0 && (
        <TwoColumnTable
          caption="Each research finding and the product response it caused."
          headers={["Research finding", "Product response"]}
          rows={findings.map((f) => ({ term: f.finding, detail: f.response }))}
        />
      )}
    </div>
  );
}
