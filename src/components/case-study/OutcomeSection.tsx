import type { Impact } from "../../data/caseStudyTypes";
import Plate from "./Plate";

/**
 * What changed: the before and after as a typographic plate on champagne,
 * then the validated proof, what I would measure next, and the honest limits
 * of the numbers. A before/after pair is the shortest statement of change; a
 * proof list is what a reviewer can check; naming the measurement you would
 * run reads as senior where an absent metric does not.
 */
export default function OutcomeSection({ impact }: { impact: Impact }) {
  return (
    <div className="cs-sub">
      <Plate ground="champagne" label="Before and after" className="!mt-0">
        <dl className="cs-ba">
          <div>
            <dt className="cs-label">Before</dt>
            <dd className="cs-deck">{impact.before}</dd>
          </div>
          <div>
            <dt className="cs-label">After</dt>
            <dd className="cs-deck">{impact.after}</dd>
          </div>
        </dl>
      </Plate>

      {impact.proof && impact.proof.length > 0 && (
        <ul className="cs-proof cs-body list-none p-0">
          {impact.proof.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      {impact.measureNext && (
        <div className="cs-measure">
          <p className="cs-label text-tertiary-700">What I would measure next</p>
          <p className="cs-body">{impact.measureNext}</p>
        </div>
      )}

      {impact.metricStatus && <p className="cs-caveat cs-small">{impact.metricStatus}</p>}
    </div>
  );
}
