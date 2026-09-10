/**
 * The page's one table shape: a term and what follows from it.
 *
 * The framework asks for tables in exactly two places — constraints and
 * evidence — and both are the same shape, so they share a component and read
 * as one device rather than two lookalikes. `StatesRecovery` keeps its own
 * three-column table; the styling here matches it deliberately.
 *
 * The table keeps its semantics at every width and scrolls inside its own
 * container on narrow screens, so the page itself never scrolls sideways.
 */
export default function TwoColumnTable({
  caption,
  headers,
  rows,
}: {
  /** Screen-reader summary. The visible heading is the section's own. */
  caption: string;
  headers: [string, string];
  rows: { term: string; detail: string }[];
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="w-[42%] py-3 pr-6 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent"
            >
              {headers[0]}
            </th>
            <th
              scope="col"
              className="py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent"
            >
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ term, detail }) => (
            <tr key={term} className="border-b border-border last:border-0">
              <th
                scope="row"
                className="border-l-2 border-accent py-4 pl-4 pr-6 align-top text-[0.9375rem] font-semibold leading-[1.5] text-foreground"
              >
                {term}
              </th>
              <td className="py-4 align-top text-[0.875rem] leading-[1.65] text-muted-foreground">
                {detail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
