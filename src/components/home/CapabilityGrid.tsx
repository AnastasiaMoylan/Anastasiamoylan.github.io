import SectionHeading from "../ui/SectionHeading";

const capabilities = [
  {
    icon: "◈",
    title: "I map the full journey before I design a screen",
    bullets: [
      "Every step, handoff, and role mapped end-to-end",
      "Recovery flows designed for when things go wrong",
      "Fewer gaps discovered in QA, more time shipping",
    ],
  },
  {
    icon: "⬡",
    title: "I design AI into the journey, not on top of it",
    bullets: [
      "AI steps get evidence, designed states, and human review",
      "Shipped in production across finance, telecom, and document intelligence",
      "Trust built in at every step, not patched on after",
    ],
  },
  {
    icon: "◻",
    title: "I follow the journey through to launch",
    bullets: [
      "Acceptance criteria and engineering feasibility reviewed together",
      "Regressions caught in QA before they reach users",
      "What ships matches what was designed",
    ],
  },
];

export default function CapabilityGrid() {
  return (
    <section className="py-20 border-b border-border" aria-labelledby="capabilities-heading">
      <div className="content-container">
        <SectionHeading
          eyebrow="What I bring"
          title="The journey behind the screens"
          subtitle="Most design portfolios show the outcome. Here's what it actually takes to get there, and why it matters to the teams I work with."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {capabilities.map(({ icon, title, bullets }) => (
            <div key={title} className="bg-card border border-border rounded-md p-8">
              <div className="text-2xl mb-5" aria-hidden="true">{icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9375rem] text-muted-foreground leading-[1.55]">
                    <span className="text-accent mt-[3px] shrink-0">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
