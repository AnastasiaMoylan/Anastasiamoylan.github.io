import type { FramingItem } from "../../data/caseStudyTypes";

/**
 * The business context: what the organization was trying to achieve, what was
 * at stake, and why design was in the room. The framework treats this as the
 * block that separates lead from principal. The hypothesis and the metric set
 * at kickoff follow it as a hairline list, the one place a metric chosen
 * before the work is visible.
 */
export default function ProductFraming({
  productFraming,
  framing,
}: {
  productFraming?: string;
  framing?: FramingItem[];
}) {
  return (
    <div className="cs-sub">
      {productFraming && (
        <div className="cs-prose cs-body">
          <p>{productFraming}</p>
        </div>
      )}
      {framing && framing.length > 0 && (
        <dl className={["cs-list", productFraming ? "cs-after" : ""].join(" ")}>
          {framing.map(({ label, text }) => (
            <div key={label}>
              <dt className="cs-label text-accent">{label}</dt>
              <dd className="cs-body">{text}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
