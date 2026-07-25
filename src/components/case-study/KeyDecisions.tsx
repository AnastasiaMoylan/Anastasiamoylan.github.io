import type { Decision } from "../../data/caseStudies";

export default function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="list-none p-0 m-0 flex flex-col gap-8">
      {decisions.map(({ decision, rationale, rejected, tradeoff }) => (
        <li key={decision} className="flex flex-col gap-2">
          <p className="text-base font-semibold text-foreground leading-[1.5]">{decision}</p>
          <p className="text-base text-muted-foreground leading-[1.65]">{rationale}</p>
          {(rejected || tradeoff) && (
            <p className="text-[0.9375rem] text-muted-foreground/80 leading-[1.6] border-l-2 border-border pl-4 mt-1">
              {rejected && <>Instead of {rejected}</>}
              {rejected && tradeoff && " — "}
              {tradeoff}
              {rejected && !tradeoff && "."}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
