import type { Evidence } from "../../data/caseStudies";

export default function EvidenceInsight({ evidence }: { evidence: Evidence }) {
  return (
    <div className="flex flex-col gap-6">
      {evidence.body && <p className="text-base text-muted-foreground leading-[1.7]">{evidence.body}</p>}
      {evidence.findings && evidence.findings.length > 0 && (
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {evidence.findings.map(({ finding, response }) => (
            <li key={finding} className="border-l-2 border-border pl-5 flex flex-col gap-1">
              <p className="text-[0.9375rem] text-foreground leading-[1.6]">{finding}</p>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.6]">
                <span className="text-accent">&rarr;</span> {response}
              </p>
            </li>
          ))}
        </ul>
      )}
      <blockquote className="border-l-2 border-accent bg-card rounded-r-md pl-6 pr-6 py-5 m-0">
        <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{evidence.insight}</p>
      </blockquote>
      {evidence.principle && (
        <p className="text-[0.9375rem] text-muted-foreground leading-[1.7] italic">{evidence.principle}</p>
      )}
    </div>
  );
}
