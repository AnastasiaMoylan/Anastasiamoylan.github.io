import Badge from "../ui/Badge";

/**
 * Title, role, tagline, tags and the remaining facts as one header block.
 *
 * Role is pulled out as a byline directly under the title rather than sitting as
 * one field among four: it is the reader's second question after the project
 * name, and the only fact on the page about the author rather than the work.
 *
 * The other facts run inline along the bottom, which drops the label gutter a
 * two-column layout needs and lets long values — "Confidential enterprise
 * telecommunications organization" — sit on one line. Their labels survive as
 * screen-reader text, so nothing is lost for assistive technology.
 *
 * Project context (users, tools) renders in the Overview; the team renders as
 * discipline cards in Role and team.
 */
const BYLINE_FIELD = "Role";
const INLINE_FIELDS = ["Employer", "Client", "Timeframe"];

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
  const role = fields.find((f) => f.label === BYLINE_FIELD);
  const inlineFields = INLINE_FIELDS.flatMap((label) => fields.filter((f) => f.label === label));

  return (
    /*
      One column at every width. The tags used to sit beside the title on wide
      screens, which split the top of the page into two columns and made the
      title compete with a row of chips for the first look. Stacked, the reading
      order is the order of the reader's questions: what, who I was, what it
      did, what kind of work, and the surrounding facts.
    */
    <header className="flex flex-col">
      <h1 className="m-0 font-display text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-foreground">
        {title}
      </h1>

      {role && (
        <p className="mt-3.5 m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tertiary-700">
          <span className="sr-only">Role: </span>
          {role.value}
        </p>
      )}

      <p className="mt-2.5 m-0 max-w-[46rem] text-[clamp(1.0625rem,2vw,1.25rem)] leading-[1.5] text-muted-foreground">
        {tagline}
      </p>

      <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>

      {inlineFields.length > 0 && (
        /*
          No rule above the facts. They are small and muted enough that spacing
          separates them from the tags, and a rule here put a third horizontal
          line into the same short stretch as the at-a-glance band below.
        */
        <p className="mt-6 m-0 text-[0.78125rem] leading-[1.6] text-muted-foreground">
          {inlineFields.map(({ label, value }, i) => (
            <span key={label}>
              {i > 0 && (
                <span className="mx-1.5 text-border" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="sr-only">{label}: </span>
              {value}
            </span>
          ))}
        </p>
      )}
    </header>
  );
}
