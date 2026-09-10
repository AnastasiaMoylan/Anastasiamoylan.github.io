/**
 * A two-column ledger (Layout C): the term on the left, its consequence on the
 * right after a maroon arrow, a hairline between rows.
 *
 * It stays a real table so screen readers keep the row headers and the column
 * names; the column headers are visually hidden because the arrow already
 * says "this led to that", and a header row read as a third register of small
 * caps. Rows take no hover ground: they are not clickable, and a hover state
 * on something you cannot press is a promise the page breaks.
 *
 * It scrolls inside its own container on narrow screens, so the page never
 * scrolls sideways.
 */
export default function TwoColumnTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: [string, string];
  rows: { term: string; detail: string }[];
}) {
  return (
    <div className="-mx-1 max-w-[60rem] overflow-x-auto px-1">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{headers[0]}</th>
            <th scope="col">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ term, detail }) => (
            <tr key={term} className="border-t border-border">
              <th
                scope="row"
                className="w-1/2 py-4 pr-8 align-top text-small font-semibold leading-[1.5] text-foreground"
              >
                {term}
              </th>
              <td className="py-4 align-top text-small leading-[1.65] text-muted-foreground">
                <span aria-hidden="true" className="text-accent">
                  &rarr;{" "}
                </span>
                {detail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
