import Eyebrow from "../ui/Eyebrow";

/**
 * Outcome band, directly under the hero.
 *
 * The fourth entry is a deliberate placeholder, not a stat: the billing
 * engagement's business number is the one figure only the owner can supply.
 * It is marked in the design rather than invented — delete this entry or fill
 * it in before the site goes live.
 */
const outcomes = [
  { figure: "10 → 300", label: "Pilot users scaled, Finance Cloud" },
  { figure: "1,000+", label: "Enterprise adoption planned" },
  { figure: "4", label: "Platforms taken 0 → 1" },
  { figure: "— —", label: "Revenue recovered, billing workflow", pending: true },
];

export default function OutcomeNumbers() {
  return (
    <section className="bg-card border-y border-border" aria-labelledby="outcomes-heading">
      <h2 id="outcomes-heading" className="sr-only">
        Outcomes
      </h2>
      <div className="content-container py-12">
        <dl className="m-0 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(({ figure, label, pending }) => (
            <div key={label} className="flex flex-col gap-2.5">
              <dd
                className={[
                  "m-0 font-display text-[2.875rem] font-extrabold leading-none tracking-[-0.03em]",
                  pending ? "text-muted-foreground/60" : "text-accent",
                ].join(" ")}
              >
                {figure}
              </dd>
              <dt className="m-0">
                <Eyebrow tone={pending ? "muted" : "label"}>{label}</Eyebrow>
                {pending && (
                  <span className="mt-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
                    Owner to supply
                  </span>
                )}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
