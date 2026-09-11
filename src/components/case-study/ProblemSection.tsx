import type { Constraint } from "../../data/caseStudyTypes";
import Plate from "./Plate";

/**
 * The problem: the how-might-we (when the section's heading is not already
 * it), the constraints as a table plate on white, and the reframing insight
 * as the page's one pull quote in the voice face. Constraints are the part of
 * a problem a reviewer can check, so each carries the product consequence it
 * forced.
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
    <div className="cs-sub">
      {hmw && <p className="cs-prose cs-deck">{hmw}</p>}
      {constraints && constraints.length > 0 && (
        <Plate ground="white" label="Constraints">
          <div className="cs-tscroll">
            <table className="cs-table cs-small">
              <caption className="sr-only">Each constraint and what it forced the product to do.</caption>
              <thead>
                <tr>
                  <th scope="col" className="cs-label">Constraint</th>
                  <th scope="col" className="cs-label">Implication for the product</th>
                </tr>
              </thead>
              <tbody>
                {constraints.map((c) => (
                  <tr key={c.constraint}>
                    <th scope="row">{c.constraint}</th>
                    <td>{c.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Plate>
      )}
      {insight && <blockquote className="cs-quote cs-deck">{insight}</blockquote>}
    </div>
  );
}
