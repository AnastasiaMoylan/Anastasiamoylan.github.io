import DiagramPanel from "../primitives/DiagramPanel";
import type { StateRecovery } from "../../../data/caseStudies";

/** Conditions that are AI-specific get a tint, marking them as the AI states. */
const AI_STATES = ["Partial or low confidence AI output", "Anomaly detected in a figure"];

export default function DesignedStates({ states }: { states: StateRecovery[] }) {
  return (
    <DiagramPanel
      heading="What happens when the system is wrong, blocked, or unsure"
      subheading={`${states.length} conditions, each with a visible state and a way forward.`}
      quote="Failure and low confidence became designed states, not error toasts."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Designed states: each condition, what the user sees, and the recovery path.
          </caption>
          <thead>
            <tr className="border-b border-border">
              {["Condition", "What the user sees", "Recovery"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="py-3 pr-6 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {states.map(({ state, userSees, recovery }) => (
              <tr
                key={state}
                className={[
                  "border-b border-border last:border-0",
                  AI_STATES.includes(state) ? "bg-accent-tint-subtle" : "",
                ].join(" ")}
              >
                <th
                  scope="row"
                  className="border-l-2 border-accent py-4 pl-4 pr-6 align-top text-[0.875rem] font-bold leading-[1.5] text-foreground"
                >
                  {state}
                </th>
                <td className="py-4 pr-6 align-top text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {userSees}
                </td>
                <td className="py-4 pr-2 align-top text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {recovery}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DiagramPanel>
  );
}
