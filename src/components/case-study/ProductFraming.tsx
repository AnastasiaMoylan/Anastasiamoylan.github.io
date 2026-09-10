import type { FramingItem } from "../../data/caseStudyTypes";
import FramingBlock from "./FramingBlock";

/**
 * The business context: what the organization was trying to achieve, what was
 * at stake, and why design was in the room.
 *
 * The framework treats this as the block that separates lead from principal —
 * it shows the bet was understood, not just the brief. It sits between the
 * overview and the problem so a reader meets the stakes before the constraints.
 *
 * The hypothesis-and-KPI block renders here for studies that still carry one.
 * Whether it survives the migration is open (question 1 in the plan); until it
 * is settled, keeping it costs nothing and dropping it would lose the one
 * place a metric chosen at kickoff is visible.
 */
export default function ProductFraming({
  productFraming,
  framing,
}: {
  productFraming?: string;
  framing?: FramingItem[];
}) {
  return (
    <div>
      {productFraming && (
        <p className="m-0 max-w-[38rem] text-body leading-[1.7] text-muted-foreground">
          {productFraming}
        </p>
      )}
      {framing && framing.length > 0 && <FramingBlock items={framing} />}
    </div>
  );
}
