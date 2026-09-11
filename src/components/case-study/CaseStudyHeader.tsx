import type { ReactNode } from "react";
import type { Stat } from "../../data/caseStudyTypes";

/**
 * The lede (Plates layout, 2026-09-11): the kicker, the claim, the deck, then
 * the snapshot beside the figures, with the source caveat under the snapshot.
 * Text beside text is allowed here; text beside an image is not, anywhere.
 *
 * The claim is the news and the largest type in the first screen. The
 * snapshot is a hairline list (role, client, status, users, team) so the
 * role is legible in ten seconds in plain words; the figures sit beside it in
 * display type, maroon, and the caveat that qualifies them is printed where
 * they are first seen as well as in Outcome.
 *
 * Returns grid children for the page's lede section.
 */
const KICKER_FIELDS = ["Employer", "Timeframe"];
const META_FIELDS = ["Role", "Client", "Status", "Users", "Team"];

export default function CaseStudyHeader({
  backLink,
  title,
  claim,
  deck,
  fields,
  stats,
  caveat,
}: {
  backLink?: ReactNode;
  title: string;
  claim: string;
  deck?: string;
  fields: { label: string; value: string }[];
  stats?: Stat[];
  caveat?: string;
}) {
  const pick = (labels: string[]) =>
    labels.map((l) => fields.find((f) => f.label === l)).filter(Boolean) as { label: string; value: string }[];
  const kicker = pick(KICKER_FIELDS);
  const meta = pick(META_FIELDS);

  return (
    <>
      <div className="cs-kick cs-label">
        <p>
          <b>{title}</b>
          {kicker.map(({ label, value }) => (
            <span key={label}>
              <span className="cs-sep" aria-hidden="true">·</span>
              <span className="sr-only">{label}: </span>
              {value}
            </span>
          ))}
        </p>
        {backLink}
      </div>

      <h1 className="cs-h1">{claim}</h1>
      {deck && <p className="cs-deck">{deck}</p>}

      {meta.length > 0 && (
        <dl className="cs-meta cs-small">
          {meta.map(({ label, value }) => (
            <div key={label}>
              <dt className="cs-label">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {stats && stats.length > 0 && (
        <dl className="cs-stats" aria-label="At a glance">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <dt className="cs-label">{label}</dt>
              <dd className="cs-h2">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {caveat && <p className="cs-caveat cs-small">{caveat}</p>}
    </>
  );
}
