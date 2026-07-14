import SectionHeading from "../components/ui/SectionHeading";

const principles = [
  {
    title: "Design flows, not screens",
    body: "A screen is a moment in a sequence. I start by mapping the full flow — the role who acts, the state they start from, every branching path, what happens when something fails, and how the user recovers. Interfaces that work in demos and break under real use almost always skipped this step.",
  },
  {
    title: "Treat implementation as part of the design",
    body: "A Figma decision that engineering can't deliver in the available time or technology isn't a design decision — it's a deferred negotiation. I stay involved through handoff, sprint reviews, and QA so that compromises are visible, intentional, and tracked — not discovered by accident after launch.",
  },
  {
    title: "Extend the system before inventing a new pattern",
    body: "Design systems exist to make consistent decisions fast and reduce the cost of change. When a genuinely new pattern is needed, it gets defined, documented, and added to the system — not solved quietly in one component and forgotten. I extend systems rather than work around them.",
  },
  {
    title: "Make AI uncertainty visible — and every consequential action reversible",
    body: "Generated output needs evidence, not just an answer. Latency and partial results need designed states, not spinners. Actions driven by AI recommendation — especially high-stakes ones — should be reviewable before they execute and recoverable after. The full loop: generate, inspect, edit, approve, monitor.",
  },
  {
    title: "Use critique to sharpen the decision, not defend the artifact",
    body: "Good critique is about the problem the design is trying to solve, not the design itself. I lead critique by stating the intent and asking whether the work achieves it. Defending a specific solution is less useful than asking whether either option solves the right problem.",
  },
  {
    title: "Mentor through context, not just corrections",
    body: "Designers improve fastest when they understand why a decision was made — the user evidence, the technical constraint, the stakeholder concern — not just that it was made. I give feedback that explains the reasoning so the designer can apply the same judgment next time, not just fix this one.",
  },
  {
    title: "Change direction when the evidence improves",
    body: "I've restructured navigation based on usability findings, dropped features after POC tests, and changed comparison layouts after research showed side-by-side outperformed tabs. The goal is better decisions, not consistency with earlier ones. Research that can't change the plan isn't worth running.",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <SectionHeading
          eyebrow="Design philosophy"
          title="How I think about this work"
          subtitle="Seven principles I've tested against real engagements — not a manifesto, but a record of what has consistently produced better outcomes."
        />

        <div className="max-w-[52rem] mt-12 pb-12 border-b border-border">
          <blockquote className="text-[clamp(1.25rem,3vw,1.625rem)] font-medium text-foreground leading-[1.5] italic pl-6 border-l-[3px] border-primary">
            &ldquo;Good product design makes the system understandable&mdash;not only when everything works, but when data is late, AI is uncertain, permissions change, or a user needs to recover.&rdquo;
          </blockquote>
        </div>

        <div className="flex flex-col gap-12 max-w-[52rem] mt-12">
          {principles.map(({ title, body }, i) => (
            <div key={title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="text-base text-muted-foreground leading-[1.75]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
