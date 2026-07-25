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
      A grid rather than nested rows, so the tags can sit beside the title on
      wide screens but drop below the tagline on narrow ones. Nesting them next
      to the title would push them between the title and the byline when it
      stacks, which is exactly the adjacency the byline exists to create.
    */
    <header className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
      <h1 className="m-0 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-foreground sm:col-start-1 sm:row-start-1">
        {title}
      </h1>

      <ul className="order-4 m-0 mt-5 flex list-none flex-wrap gap-2 p-0 sm:order-none sm:col-start-2 sm:row-start-1 sm:mt-0 sm:max-w-[26rem] sm:justify-end sm:pt-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge variant="accent">{tag}</Badge>
          </li>
        ))}
      </ul>

      {role && (
        <p className="order-2 mt-2.5 m-0 text-[0.9375rem] font-bold tracking-[0.01em] text-accent sm:order-none sm:col-start-1 sm:row-start-2">
          <span className="sr-only">Role: </span>
          {role.value}
        </p>
      )}

      <p className="order-3 mt-2.5 m-0 max-w-[46rem] text-[clamp(1.0625rem,2vw,1.25rem)] leading-[1.5] text-muted-foreground sm:order-none sm:col-start-1 sm:row-start-3">
        {tagline}
      </p>

      {inlineFields.length > 0 && (
        /*
          No rule above the facts either. They are small and muted enough that
          spacing separates them from the tagline, and a rule here put a third
          horizontal line into the same short stretch as the Overview panel.
        */
        <p className="order-5 mt-6 m-0 text-[0.78125rem] leading-[1.6] text-muted-foreground sm:order-none sm:col-span-2 sm:row-start-4">
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
