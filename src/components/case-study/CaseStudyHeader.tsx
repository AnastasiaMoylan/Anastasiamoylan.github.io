import Badge from "../ui/Badge";
import StatBand from "./StatBand";
import type { Stat } from "../../data/caseStudyTypes";

/**
 * The lede (Layout C): kicker, claim, byline, deck, figures.
 *
 * Newspaper order. The project name shrinks to a kicker, the claim is the
 * headline and the largest type on the page, the byline names who did it
 * directly beneath, one deck sentence carries the approach, and the numbers
 * are on the same screen as the news. Reviewers give a case study ten to
 * thirty seconds and screen for level first, so nothing in the first viewport
 * is bigger than the claim and the role is legible in plain language without
 * hunting for it.
 *
 * The claim falls back through three sources so a study that has not been
 * migrated still renders something true: an explicit `claim`, then the
 * overview's result line, then the tagline. Only the last of those is a
 * description rather than an outcome, which is the signal that the study still
 * needs its claim written.
 *
 * Users, team and status are the framework's metadata fields. Layout C has no
 * slot for them in the lede, so they sit as a small labelled grid after the
 * figures rather than being dropped: below the numbers, they cost the first
 * screen nothing.
 */
import type { ReactNode } from "react";
const BYLINE_FIELD = "Role";
const KICKER_FIELDS = ["Employer", "Client", "Timeframe"];
const SCOPE_FIELDS = ["Users", "Team", "Status"];

/** Initials for the byline mark. A portrait would be better; there isn't one. */
const MARK = "AM";
const NAME = "Anastasia Novelly Moylan";

export default function CaseStudyHeader({
  backLink,
  title,
  claim,
  deck,
  tags,
  fields,
  stats,
  caveat,
}: {
  /** The route back to the index, set on the kicker's line. */
  backLink?: ReactNode;
  title: string;
  /** The news. Rendered as the h1. */
  claim: string;
  /** One sentence of approach, under the byline. */
  deck?: string;
  tags: string[];
  fields: { label: string; value: string }[];
  /** At-a-glance figures, on the same screen as the claim. */
  stats?: Stat[];
  /** The source line under the figures: what they are and are not. */
  caveat?: string;
}) {
  const find = (label: string) => fields.find((f) => f.label === label);
  const role = find(BYLINE_FIELD);
  const kicker = KICKER_FIELDS.map(find).filter(Boolean) as { label: string; value: string }[];
  const scope = SCOPE_FIELDS.map(find).filter(Boolean) as { label: string; value: string }[];

  return (
    <header className="flex flex-col">
      {/* Kicker: what this was and when, small, above the news. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 font-mono text-label font-medium uppercase tracking-[0.12em]">
          <span className="font-semibold text-foreground">{title}</span>
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
        {backLink}
      </div>

      <h1 className="mt-4 m-0 max-w-[24ch] font-display text-h1 font-extrabold tracking-[-0.035em] text-foreground">
        {claim}
      </h1>

      {/* Byline: who, and at what level, in plain language. */}
      <div className="mt-6 flex items-center gap-3.5 border-t border-border pt-5">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-tertiary-900 font-display text-small font-bold text-background"
        >
          {MARK}
        </span>
        <div className="min-w-0">
          <p className="m-0 text-body font-semibold leading-[1.35] text-foreground">{NAME}</p>
          {role && (
            <p className="mt-0.5 m-0 text-small leading-[1.45] text-muted-foreground">
              <span className="sr-only">Role: </span>
              {role.value}
            </p>
          )}
        </div>
      </div>

      {deck && (
        <p className="mt-5 m-0 max-w-[46ch] text-lead text-muted-foreground">{deck}</p>
      )}

      {stats && stats.length > 0 && <StatBand stats={stats} caveat={caveat} />}

      {scope.length > 0 && (
        <dl className="m-0 mt-6 grid grid-cols-1 gap-5 border-t border-border pt-5 sm:grid-cols-3">
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
