import type { ParkedItem } from "../../data/caseStudyTypes";
import TwoColumnTable from "./primitives/TwoColumnTable";

/**
 * What did not make the release, and why (Layout C).
 *
 * Rendered rather than hidden, because the calls that kept work out of a
 * release are the ones a panel asks about. Across the reference survey,
 * naming the rejected option and the admitted limit was the cheapest
 * seniority signal found, and it costs no components: it is the same ledger
 * the constraints use. An entry without its reason is a backlog item, not a
 * judgment, so `why` is required at the type.
 */
export default function ParkingLot({ parked }: { parked: ParkedItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 max-w-[38rem] text-body leading-[1.7] text-muted-foreground">
        The parking lot, rendered rather than hidden. The calls that kept work <em>out</em> of a
        release are the ones a panel asks about.
      </p>
      <TwoColumnTable
        caption="Each item that did not make the release, and the reason."
        headers={["What was held back", "Why"]}
        rows={parked.map((p) => ({ term: p.item, detail: p.why }))}
      />
    </div>
  );
}
