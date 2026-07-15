import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    label: "Context",
    number: "01",
    blurb:
      "Map the full journey: the people, roles, systems, and handoff points across the flow. I establish who acts at each step, what they're working from, and where ownership changes hands before any wireframe exists. Most journey failures start when someone skips this phase to show something fast.",
  },
  {
    label: "Evidence",
    number: "02",
    blurb:
      "Ground the design in real usage: research and signals gathered from every step of the journey. I identify what's already known, where the gaps are, and what needs testing before committing to a direction. Evidence changes the brief. That's the point.",
  },
  {
    label: "Decisions",
    number: "03",
    blurb:
      "Turn evidence into a clear journey model: who does what, when, and how each handoff works. I document the rationale behind every structural decision so it survives handoff and can be revisited later. A journey that isn't written down isn't a journey. It's an assumption.",
  },
  {
    label: "Execution",
    number: "04",
    blurb:
      "Build the end-to-end flow, from first interaction to final action, alongside engineering: flows, states, component specs, and acceptance criteria that reduce ambiguity. I stay close to implementation to catch regressions early and protect journey quality before it reaches users.",
  },
  {
    label: "Outcomes",
    number: "05",
    blurb:
      "Measure the journey in action: adoption, time saved, and trust earned, then refine from there. I track usability findings, completion rates, and stakeholder decisions driven by the work. Outcomes close the loop on whether the journey delivered the right solution.",
  },
];

export default function ProcessPreview() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-20 border-b border-border" aria-labelledby="process-heading">
      <div className="content-container">
        <SectionHeading
          eyebrow="How I work"
          title="Building the journey end-to-end"
          subtitle="The same five phases on every engagement, because connected, trustworthy journeys don't happen by accident. Select any phase to see what it looks like in practice."
        />

        <div className="flex flex-col md:flex-row gap-3 mt-12">
          {steps.map(({ label, number }, i) => (
            <button
              key={label}
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
              className={[
                "flex-1 text-left bg-card border rounded-md p-6 cursor-pointer transition-colors duration-150 font-sans",
                active === i
                  ? "border-primary bg-secondary"
                  : "border-border hover:border-primary hover:bg-secondary",
              ].join(" ")}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">
                {number}
              </p>
              <p className={["text-base font-semibold transition-colors duration-150", active === i ? "text-foreground" : "text-muted-foreground"].join(" ")}>
                {label}
              </p>
            </button>
          ))}
        </div>

        {active !== null && (
          <div className="mt-4 p-6 bg-card border border-primary/40 rounded-md">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-3">
              {steps[active].number} &middot; {steps[active].label}
            </p>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.7] max-w-[52rem]">
              {steps[active].blurb}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
