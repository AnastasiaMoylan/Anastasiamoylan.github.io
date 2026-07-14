import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    label: "Context",
    number: "01",
    blurb:
      "Before any wireframe, I map who the users are, what system they're operating in, what constraints engineering and product are working under, and what a successful outcome actually looks like. This is where most design failures start — when someone skips this phase because there's pressure to show something fast.",
  },
  {
    label: "Evidence",
    number: "02",
    blurb:
      "I gather what's already known — existing research, analytics, stakeholder interviews, working-POC evaluations — and identify the specific gaps worth closing before committing to a direction. Evidence changes the brief. That's the point. If the research can't change the plan, it isn't research.",
  },
  {
    label: "Decisions",
    number: "03",
    blurb:
      "Design is a sequence of explicit tradeoffs: which mental model to follow, which edge cases to handle in the first release, where MVP ends and future scope begins. I document the rationale — not just the outcome — so those decisions survive handoff and can be revisited when the context changes.",
  },
  {
    label: "Execution",
    number: "04",
    blurb:
      "Flows, states, component specs, acceptance criteria, and code-aware prototypes — built to reduce ambiguity between design and engineering, not just to look finished in a review. I stay close to implementation to catch regressions early and protect the interaction quality before it reaches users.",
  },
  {
    label: "Outcomes",
    number: "05",
    blurb:
      "I track what actually changed: usability findings, adoption signals, stakeholder decisions driven by the work, problems that didn't make it to support. Outcomes close the loop on whether the solution solved the right problem — and they inform every engagement that comes next.",
  },
];

export default function ProcessPreview() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-20 border-b border-border" aria-labelledby="process-heading">
      <div className="content-container">
        <SectionHeading
          eyebrow="How I work"
          title="A repeatable design process"
          subtitle="The same five phases on every engagement — because good design outcomes aren't accidental. Select any phase to see what it looks like in practice."
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
              {steps[active].number} — {steps[active].label}
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
