import Eyebrow from "../ui/Eyebrow";

/**
 * Outcome band, directly under the hero.
 *
 * Rebuilt 2026-09-03 from the scorecard session record. Every figure traces
 * to Anastasia's own account: the hackathon is 40+ users running 800+
 * business analyses (corrected from the earlier "30 users, 300 queries"), the
 * three versions are V1 -> V2 -> V3 of the analysis platform, and only Finance
 * Cloud and the billing workflow were built from zero. The "10 -> 300 pilot
 * users" figure that used to lead this band has no provenance and stays off
 * the site until the product owner confirms what it counted.
 */
const outcomes = [
  { figure: "800+", label: "Business analyses by 40+ users in the hackathon that pivoted V1" },
  { figure: "3", label: "Product versions to testing, each set by research" },
  { figure: "2 of 4", label: "Platforms built from zero" },
  { figure: "6", label: "Designers directed across one program" },
];

export default function OutcomeNumbers() {
  return (
    <section className="bg-card border-y border-border" aria-labelledby="outcomes-heading">
      <h2 id="outcomes-heading" className="sr-only">
        Outcomes
      </h2>
      <div className="content-container py-12">
        <dl className="m-0 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(({ figure, label }) => (
            <div key={label} className="flex flex-col gap-2.5">
              <dd className="m-0 font-display text-[2.875rem] font-extrabold leading-none tracking-[-0.03em] text-accent">
                {figure}
              </dd>
              <dt className="m-0">
                <Eyebrow tone="label">{label}</Eyebrow>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
