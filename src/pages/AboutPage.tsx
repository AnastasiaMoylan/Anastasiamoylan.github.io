import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const timeline = [
  {
    company: "Amdocs Studios (formerly Stellar Elements)",
    roles: [
      "Lead Experience Designer — 2025–Present",
      "Senior Experience Designer — July 2021–July 2025",
    ],
    context:
      "Led design on AI-assisted finance and billing products, enterprise document intelligence, and complex telecommunications CX platforms. Managed designer mentorship, drove product strategy alignment, and owned end-to-end experience across multi-phase engagements.",
  },
  {
    company: "American Airlines",
    roles: ["Senior Product Designer — December 2019–July 2021"],
    context:
      "Designed internal operations tooling and crew-facing workflows used across the carrier network. Worked inside a complex org at enterprise scale — coordinating design decisions with operations, IT, and frontline feedback loops.",
  },
  {
    company: "Brinks Home Security",
    roles: ["Lead UI/UX Designer — June 2015–December 2019"],
    context:
      "Built and owned the design system from scratch. Delivered customer-facing mobile and web products alongside internal dealer and operations tooling across a full redesign cycle.",
  },
];

const domains = [
  "Enterprise finance and financial operations",
  "Telecommunications and CX platforms",
  "Aviation",
  "Home security and technology",
  "AI-enabled B2B software",
  "Enterprise knowledge and document intelligence",
  "Data transformation, reporting, and analytics",
];

const tools = [
  "Figma", "FigJam", "Figma variables and components", "Figma Make",
  "React", "Tailwind CSS", "Vite", "Flywheel UI", "DCU",
  "Windsurf", "Jira", "Notion",
];

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 pb-14 border-b border-border last:border-b-0 last:mb-0">
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-accent mb-5">{label}</p>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <SectionHeading
          eyebrow="About"
          title="Anastasia Novelly Moylan"
          subtitle="Lead Experience Designer · 10+ years in enterprise product and AI design"
        />

        <div className="max-w-[52rem] mt-12">
          <SectionBlock label="Who I am">
            <div className="flex flex-col gap-4 text-[1.0625rem] text-muted-foreground leading-[1.75]">
              <p>
                I design complex enterprise products — AI assistants, financial workflows, document intelligence systems, and operations tooling — and I stay engaged until what ships matches what was designed. That distinction matters. A lot of enterprise design falls apart between Figma and production. I treat implementation as part of my responsibility, not something handoff completes.
              </p>
              <p>
                My background spans B2B SaaS, telecommunications, aviation, and finance. I know how to design for role-based permissions, how to make AI-generated content trustworthy, how to scope a POC that tests the right assumptions, and how to lead a design system that serves a large engineering org without becoming a bottleneck.
              </p>
              <p>
                I also mentor. I lead critique sessions, give feedback that explains reasoning not just corrections, and work to build the judgment of the designers I work alongside — not just their output on a specific project.
              </p>
            </div>
          </SectionBlock>

          <SectionBlock label="Career timeline">
            <ul className="list-none p-0 m-0 flex flex-col gap-8">
              {timeline.map(({ company, roles, context }) => (
                <li key={company} className="flex flex-col gap-1.5">
                  <span className="text-base font-semibold text-foreground">{company}</span>
                  {roles.map((role) => (
                    <span key={role} className="text-[0.9375rem] text-foreground/70">{role}</span>
                  ))}
                  <p className="text-[0.9375rem] text-muted-foreground leading-[1.65] mt-1">{context}</p>
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Domain experience">
            <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
              {domains.map((d) => (
                <li key={d} className="text-sm text-muted-foreground bg-card border border-border rounded-sm px-3 py-1.5">
                  {d}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Tools">
            <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="text-sm text-muted-foreground bg-card border border-border rounded-sm px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Education">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-base font-semibold text-foreground">The University of Kansas</p>
                <p className="text-[0.9375rem] text-muted-foreground">
                  Bachelor of Science in Journalism (BSJ), Strategic Communications — Lawrence, Kansas
                </p>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">LUMA Institute</p>
                <p className="text-[0.9375rem] text-muted-foreground">LUMA Design Thinking Practitioner</p>
              </div>
            </div>
          </SectionBlock>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button to="/resume" variant="outline">View Resume</Button>
            <Button to="/contact" variant="primary">Get in Touch</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
