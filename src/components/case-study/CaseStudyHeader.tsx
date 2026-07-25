import Badge from "../ui/Badge";

/**
 * Title, tagline, tags and the meta facts as one header block.
 *
 * The meta sits beside the title rather than in a bordered card beneath it: the
 * title only fills about half the measure, so the facts use space that was
 * otherwise empty and the header loses a whole band of vertical height plus the
 * card's chrome.
 *
 * Only the facts that establish standing appear here — who you were, who it was
 * for, and when. Project context (users, tools) renders in the Overview, and the
 * team renders as discipline cards in Role and team.
 */
const HEADER_FIELDS = ["Role", "Employer", "Client", "Timeframe"];

export default function CaseStudyHeader({
  title,
  tagline,
  tags,
  fields,
}: {
  title: string;
  tagline: string;
  tags: string[];
  fields: { label: string; value: string }[];
}) {
  const meta = HEADER_FIELDS.flatMap((label) => fields.filter((f) => f.label === label));

  return (
    <header className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
      <div>
        <h1 className="m-0 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.12] tracking-[-0.015em] text-foreground">
          {title}
        </h1>
        <p className="mt-4 m-0 text-[clamp(1.0625rem,2vw,1.25rem)] font-medium leading-[1.5] text-muted-foreground">
          {tagline}
        </p>
        <ul className="mt-6 m-0 flex list-none flex-wrap gap-2 p-0">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge variant="accent">{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>

      {meta.length > 0 && (
        <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 lg:grid-cols-1 lg:gap-y-4 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8">
          {meta.map(({ label, value }) => (
            <div key={label} className="lg:grid lg:grid-cols-[6.5rem_1fr] lg:gap-3">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground lg:pt-[3px]">
                {label}
              </dt>
              <dd className="m-0 mt-1 text-[0.875rem] leading-[1.5] text-foreground lg:mt-0">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
