import type { Evidence } from "../../data/caseStudyTypes";

/**
 * What the research found and what changed because of it: the method in one
 * line, then each finding with the product response it caused, as a hairline
 * list in the prose column rather than a plate. The page already carries its
 * tables as plates; this is argument, read in order.
 */
export default function EvidenceTable({ evidence }: { evidence: Evidence }) {
  const findings = evidence.findings ?? [];
  return (
    <div className="cs-sub">
      {evidence.body && (
        <div className="cs-prose cs-body">
          <p>{evidence.body}</p>
        </div>
      )}
      {findings.length > 0 && (
        <dl className={["cs-findings", evidence.body ? "" : "!mt-0"].join(" ")}>
          {findings.map((f) => (
            <div key={f.finding}>
              <dt>{f.finding}</dt>
              <dd>{f.response}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
