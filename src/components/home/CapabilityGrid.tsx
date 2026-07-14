import SectionHeading from "../ui/SectionHeading";

const capabilities = [
  {
    icon: "◈",
    title: "I own the full problem, not just the screens",
    body: "Roles, permissions, loading states, empty states, failure paths, recovery flows, approval logic — I map all of it before a pixel gets placed. Teams that have worked with me spend less time discovering edge cases in QA and more time shipping work that holds up.",
  },
  {
    icon: "⬡",
    title: "I design AI products people can actually trust",
    body: "Generated output needs evidence. Latency needs a designed state. Consequential actions need review before they execute and a rollback path after. I've built these patterns into production AI products across finance, telecom, and document intelligence.",
  },
  {
    icon: "◻",
    title: "I stay until it ships right",
    body: "Design doesn't end at handoff. I write acceptance criteria, pair with engineers on feasibility, catch regressions in QA, and flag interaction quality issues before they reach users. What I design and what ships are the same thing.",
  },
];

export default function CapabilityGrid() {
  return (
    <section className="py-20 border-b border-border" aria-labelledby="capabilities-heading">
      <div className="content-container">
        <SectionHeading
          eyebrow="What I bring"
          title="The work behind the work"
          subtitle="Most design portfolios show the outcome. Here's what it actually takes to get there — and why it matters to the teams I work with."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {capabilities.map(({ icon, title, body }) => (
            <div key={title} className="bg-card border border-border rounded-md p-8">
              <div className="text-2xl mb-5" aria-hidden="true">{icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.65]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
