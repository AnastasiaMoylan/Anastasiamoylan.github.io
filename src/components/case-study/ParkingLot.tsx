import type { ParkedItem } from "../../data/caseStudyTypes";
import Plate from "./Plate";

/**
 * What did not make the release, and why, as a table plate on white. The
 * calls that kept work out of a release are the ones a panel asks about; an
 * entry without its reason is a backlog item, not a judgment, so `why` is
 * required at the type.
 */
export default function ParkingLot({ parked }: { parked: ParkedItem[] }) {
  return (
    <div className="cs-sub">
      <Plate ground="white" label="What did not ship" className="!mt-0">
        <div className="cs-tscroll">
          <table className="cs-table cs-small">
            <caption className="sr-only">Each item that did not make the release, and the reason.</caption>
            <thead>
              <tr>
                <th scope="col" className="cs-label">Held back</th>
                <th scope="col" className="cs-label">Why</th>
              </tr>
            </thead>
            <tbody>
              {parked.map((p) => (
                <tr key={p.item}>
                  <th scope="row">{p.item}</th>
                  <td>{p.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Plate>
    </div>
  );
}
