import type { StateRecovery } from "../../data/caseStudies";

/**
 * Genuinely tabular content — condition, what the user sees, how they recover —
 * so it renders as a real table with header scope rather than a styled list.
 *
 * The table keeps its semantics at every width and scrolls inside its own
 * container on narrow screens, so the page itself never scrolls sideways.
 */
export default function StatesRecovery({ states }: { states: StateRecovery[] }) {
  const showsUserSees = states.some((s) => s.userSees);
  const showsRecovery = states.some((s) => s.recovery);

  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">
          Designed states: each condition, what the user sees, and the recovery path.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="w-[34%] py-3 pr-6 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent"
            >
              Condition
            </th>
            {showsUserSees && (
              <th
                scope="col"
                className="w-[33%] py-3 pr-6 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent"
              >
                What the user sees
              </th>
            )}
            {showsRecovery && (
              <th
                scope="col"
                className="py-3 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent"
              >
                Recovery
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {states.map(({ state, userSees, recovery }) => (
            <tr key={state} className="border-b border-border last:border-0">
              <th
                scope="row"
                className="border-l-2 border-accent py-4 pl-4 pr-6 align-top text-[0.9375rem] font-bold leading-[1.45] text-foreground"
              >
                {state}
              </th>
              {showsUserSees && (
                <td className="py-4 pr-6 align-top text-[0.875rem] leading-[1.65] text-muted-foreground">
                  {userSees ?? "—"}
                </td>
              )}
              {showsRecovery && (
                <td className="py-4 align-top text-[0.875rem] leading-[1.65] text-muted-foreground">
                  {recovery ?? "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
