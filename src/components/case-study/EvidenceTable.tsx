import type { Evidence } from "../../data/caseStudyTypes";
import TwoColumnTable from "./primitives/TwoColumnTable";

/**
 * What the research found and what changed because of it: the method in one
 * line, then a ledger of finding and product response (Layout C). A finding
 * whose response names no change is cut at the data, not hidden here.
 */
export default function EvidenceTable({ evidence }: { evidence: Evidence }) {
  const findings = evidence.findings ?? [];

  return (
    <div className="flex flex-col gap-6">
      {evidence.body && (
        <p className="m-0 max-w-[38rem] text-body leading-[1.7] text-foreground">
          {evidence.body}
        </p>
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
