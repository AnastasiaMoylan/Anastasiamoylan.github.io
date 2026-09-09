import type { FramingItem } from "../../data/caseStudies";
import FramingBlock from "./FramingBlock";
import PullQuote from "./primitives/PullQuote";

/**
 * The problem: the situation and constraint, the product framing (hypothesis,
 * metric, constraint, where it landed), and the reframing insight as the
 * page's one pull-quote.
 *
 * Added 2026-09-04 when the page moved to a two-layer order. The context used
 * to trail the overview and the insight used to close Research; both belong
 * here, because a reader should meet the reframe before the solution and the
 * research section is then the proof behind it.
 */
export default function ProblemSection({
  context,
  framing,
  insight,
}: {
  context?: string;
  framing?: FramingItem[];
  insight?: string;
}) {
  return (
    <div>
      {context && (
        <p className="m-0 measure text-base leading-[1.7] text-muted-foreground">{context}</p>
      )}
      {framing && framing.length > 0 && <FramingBlock items={framing} />}
      {insight && (
        <div className="mt-10">
          <PullQuote>{insight}</PullQuote>
        </div>
      )}
    </div>
  );
}
