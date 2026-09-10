import type { Constraint } from "../../data/caseStudies";
import TwoColumnTable from "./primitives/TwoColumnTable";
import PullQuote from "./primitives/PullQuote";

/**
 * The problem: a "how might we" line, the constraints and what each one forced
 * the product to do, and the reframing insight as the page's one pull-quote.
 *
 * Rebuilt 2026-09-09 for the principal framework. The HMW leads because it is
 * the question the rest of the page answers; the table is there because
 * constraints are the part of a problem a reviewer can check, and prose hides
 * whether each one actually had a consequence.
 */
export default function ProblemSection({
  hmw,
  constraints,
  insight,
}: {
  hmw?: string;
  constraints?: Constraint[];
  insight?: string;
}) {
  return (
    <div className="flex flex-col gap-10">
      {hmw && (
        <p className="m-0 measure text-[1.125rem] font-medium leading-[1.6] text-foreground">
          {hmw}
        </p>
      )}
      {constraints && constraints.length > 0 && (
        <TwoColumnTable
          caption="Each constraint and what it forced the product to do."
          headers={["Constraint", "Implication for the product"]}
          rows={constraints.map((c) => ({ term: c.constraint, detail: c.implication }))}
        />
      )}
      {insight && <PullQuote>{insight}</PullQuote>}
    </div>
  );
}
