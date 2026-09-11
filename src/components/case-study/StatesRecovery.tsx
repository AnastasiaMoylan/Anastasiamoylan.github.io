import type { ReactNode } from "react";
import type { StateRecovery } from "../../data/caseStudyTypes";
import Plate from "./Plate";

/**
 * Edge cases and recovery, as a table plate on white (Plates layout,
 * 2026-09-11). Genuinely tabular, so a real table with header scope; it
 * scrolls inside its plate on a narrow screen and the page never does.
 *
 * When the study sets `statesDecision`, this is that decision's plate and
 * carries its "Instead of" note; otherwise it follows the decisions.
 */
export default function StatesRecovery({
  states,
  note,
}: {
  states: StateRecovery[];
  note?: ReactNode;
}) {
  const showsUserSees = states.some((s) => s.userSees);
  const showsRecovery = states.some((s) => s.recovery);
  const cols = 1 + Number(showsUserSees) + Number(showsRecovery);

  return (
    <Plate ground="white" label="Edge cases" note={note}>
      <div className="cs-tscroll">
        <table className={["cs-table cs-small", cols === 3 ? "cs-cols-3" : ""].join(" ")}>
          <caption className="sr-only">
            Designed states: each condition, what the user sees, and the recovery path.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="cs-label">Condition</th>
              {showsUserSees && <th scope="col" className="cs-label">What the user sees</th>}
              {showsRecovery && <th scope="col" className="cs-label">Recovery</th>}
            </tr>
          </thead>
          <tbody>
            {states.map(({ state, userSees, recovery }) => (
              <tr key={state}>
                <th scope="row">{state}</th>
                {showsUserSees && <td>{userSees}</td>}
                {showsRecovery && <td>{recovery}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Plate>
  );
}
