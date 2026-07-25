import type { Tldr } from "../../data/caseStudies";

/**
 * Project context, as opposed to the credentials in the header snapshot: who
 * the product serves, and what it was built with.
 */
const OVERVIEW_FIELDS = ["Users", "Tools"];

export default function OverviewSection({
  tldr,
  fields = [],
}: {
  tldr: Tldr;
  fields?: { label: string; value: string }[];
}) {
  const contextFields = OVERVIEW_FIELDS.flatMap((label) =>
    fields.filter((f) => f.label === label),
  );

  return (
    <section className="mt-12 pb-12 border-b border-border">
      {/*
        No underline on the heading: the panel below already opens with its own
        border, and the two sat 20px apart reading as one stuttered rule. The
        heading's size and weight mark it without help.
      */}
      <h2 className="mb-5 text-[clamp(1.5rem,2.8vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-foreground">
        Overview
      </h2>
      <div className="border border-border rounded-[14px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
          <div className="bg-card border-b md:border-b-0 md:border-r border-border p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-3">The challenge</p>
            <p className="text-[0.9375rem] text-foreground leading-[1.7]">{tldr.challenge}</p>
          </div>
          <div className="p-8 flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">The result</p>
              <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{tldr.result}</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">How I approached it</p>
              <p className="text-sm text-muted-foreground leading-[1.7]">{tldr.solution}</p>
            </div>
          </div>
        </div>

        {contextFields.length > 0 && (
          <dl className="m-0 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-border bg-card px-8 py-5 sm:grid-cols-2">
            {contextFields.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                  {label}
                </dt>
                <dd className="m-0 text-[0.875rem] text-foreground leading-[1.5]">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
