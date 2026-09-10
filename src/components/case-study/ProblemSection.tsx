import type { Constraint } from "../../data/caseStudyTypes";
import TwoColumnTable from "./primitives/TwoColumnTable";
import PullQuote from "./primitives/PullQuote";

/**
 * The problem: a "how might we" line, the constraints and what each one forced
 * the product to do as a ledger, and the reframing insight as the page's one
 * pull quote (Layout C).
 *
 * When the how-might-we is used as the section's own heading, `buildSections`
 * does not pass it here, so it is never printed twice. The ledger is there
 * because constraints are the part of a problem a reviewer can check, and
 * prose hides whether each one actually had a consequence.
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
    <div className="flex flex-col gap-8">
      {hmw && (
        <p className="m-0 max-w-[38rem] text-lead font-medium leading-[1.5] text-foreground">{hmw}</p>
      )}
      {constraints && constraints.length > 0 && (
        <TwoColumnTable
          caption="Each constraint and what it forced the product to do."
          headers={["Constraint", "Implication for the product"]}
          rows={constraints.map((c) => ({ term: c.constraint, detail: c.implication }))}
        />
      )}
      {insight && (
        <div className="mt-2">
          <PullQuote>{insight}</PullQuote>
        </div>
      )}
    </div>
  );
}
