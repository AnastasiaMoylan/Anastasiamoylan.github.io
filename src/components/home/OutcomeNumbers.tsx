import Eyebrow from "../ui/Eyebrow";
import { figures } from "../../data/figures";

/**
 * Outcome band, directly under the hero.
 *
 * Rebuilt 2026-09-03 from the scorecard session record; the figures and their
 * provenance live in data/figures.ts. The "10 -> 300 pilot users" figure that
 * used to lead this band has no provenance and stays off the site until the
 * product owner confirms what it counted.
 */
const outcomes = [
  { figure: figures.hackathonAnalyses, label: `Finance Cloud hackathon analyses, ${figures.hackathonUsers} users` },
  { figure: String(figures.financeCloudVersions), label: "Finance Cloud versions, each redirected by research" },
  { figure: String(figures.platformsFromZero), label: "Platforms built from zero" },
  { figure: String(figures.designersDirected), label: "Designers directed across one program" },
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
