import Badge from "../ui/Badge";

/**
 * The lede: kicker, claim, byline, deck.
 *
 * Rebuilt 2026-09-09. The header used to lead with the project title in the
 * largest type on the page and put the outcome underneath it, which meant the
 * biggest thing a reviewer saw carried the least information. It now runs in
 * newspaper order: the project name shrinks to a kicker, the claim becomes the
 * headline, the byline names who did it directly beneath, and one deck sentence
 * carries the approach. Reviewers give a case study ten to thirty seconds and
 * screen for level first, so the role has to be legible in plain language
 * without hunting for it.
 *
 * The claim falls back through three sources so a study that has not been
 * migrated still renders something true: an explicit `claim`, then the
 * overview's result line, then the tagline. Only the last of those is a
 * description rather than an outcome, which is the signal that the study still
 * needs its claim written.
 */
const BYLINE_FIELD = "Role";
const KICKER_FIELDS = ["Employer", "Client", "Timeframe"];
const SCOPE_FIELDS = ["Users", "Team", "Status"];

/** Initials for the byline mark. A portrait would be better; there isn't one. */
const MARK = "AM";
const NAME = "Anastasia Novelly Moylan";

export default function CaseStudyHeader({
  title,
  claim,
  deck,
  tags,
  fields,
}: {
  title: string;
  /** The news. Rendered as the h1. */
  claim: string;
  /** One sentence of approach, under the byline. */
  deck?: string;
  tags: string[];
  fields: { label: string; value: string }[];
}) {
  const find = (label: string) => fields.find((f) => f.label === label);
  const role = find(BYLINE_FIELD);
  const kicker = KICKER_FIELDS.map(find).filter(Boolean) as { label: string; value: string }[];
  const scope = SCOPE_FIELDS.map(find).filter(Boolean) as { label: string; value: string }[];

  return (
    <header className="flex flex-col">
      {/* Kicker: what this was and when, small, above the news. */}
      <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 font-mono text-label font-medium uppercase tracking-[0.12em]">
        <span className="text-foreground">{title}</span>
        {kicker.map(({ label, value }) => (
          <span key={label} className="flex items-baseline gap-3 text-muted-foreground">
            <span aria-hidden="true" className="text-tertiary-500">
              &middot;
            </span>
            <span className="sr-only">{label}: </span>
            {value}
          </span>
        ))}
      </p>

      <h1 className="mt-5 m-0 max-w-[26ch] font-display text-h1 font-extrabold tracking-[-0.035em] text-foreground">
        {claim}
      </h1>

      {/* Byline: who, and at what level, in plain language. */}
      <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-tertiary-900 font-display text-small font-bold text-background"
        >
          {MARK}
        </span>
        <div className="min-w-0">
          <p className="m-0 text-body font-semibold leading-[1.3] text-foreground">{NAME}</p>
          {role && (
            <p className="mt-0.5 m-0 text-small text-muted-foreground">
              <span className="sr-only">Role: </span>
              {role.value}
            </p>
          )}
        </div>
      </div>

      {deck && (
        <p className="mt-6 m-0 max-w-[44ch] text-lead text-muted-foreground">{deck}</p>
      )}

      {/*
        Users, team and status as a labelled grid rather than appended to the
        byline. Run inline they wrapped to two lines of small grey type and read
        as a caption; a reviewer is scanning for scope and needs to pick one
        field out, not parse a sentence.
      */}
      {scope.length > 0 && (
        <dl className="m-0 mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {scope.map(({ label, value }) => (
            <div key={label}>
              <dt className="m-0 font-mono text-label font-semibold uppercase tracking-[0.12em] text-tertiary-700">
                {label}
              </dt>
              <dd className="mt-1.5 m-0 text-small leading-[1.55] text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
    </header>
  );
}
