import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const timeline = [
  {
    company: "Amdocs Studios",
    roles: [
      {
        title: "Lead Experience Designer",
        dates: "2025–Present",
        context:
          "Manages a review program for the agency's finance practice, checking completed work against what's required before it moves forward. Drives integration of AI capabilities into production-ready, enterprise-scale systems for finance, billing, and telecommunications CX platforms, and establishes shared design frameworks and best practices across projects.",
      },
      {
        title: "Senior Experience Designer",
        dates: "July 2021–July 2025",
        context:
          "Led design on AI-assisted finance and billing products, enterprise document intelligence, and complex telecommunications CX platforms, driving product strategy alignment and end-to-end experience across multi-phase engagements.",
      },
    ],
  },
  {
    company: "American Airlines",
    roles: [
      {
        title: "Senior Product Designer",
        dates: "December 2019–July 2021",
        context:
          "Redesigned the travel checkout experience, modernizing outdated flows and establishing an incremental approach to evolving the design system and UI over time. Led the design team's migration to new design software and redesigned the homepage, balancing a visual refresh against maintaining conversion.",
      },
    ],
  },
  {
    company: "Brinks Home Security",
    roles: [
      {
        title: "Lead UI/UX Designer",
        dates: "June 2015–December 2019",
        context:
          "Built and owned the design system from scratch, delivering customer-facing mobile products alongside internal dealer and operations tooling across a full redesign cycle. Led data-driven design and conversion-rate optimization, including a new lead-generation testing framework and iterative A/B testing on SEM landing pages, and managed the designer internship program from hiring through development.",
      },
    ],
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
          level={1}
          eyebrow="About"
          title="Anastasia Novelly Moylan"
          subtitle="Lead Experience Designer · 10+ years in enterprise product and AI design"
        />

        <div className="max-w-[52rem] mt-12">
          <SectionBlock label="Who I am">
            <div className="flex flex-col gap-4 text-[1.0625rem] text-muted-foreground leading-[1.75]">
              <p>
                I design complex enterprise products: AI assistants, workflows, document intelligence systems, and operational tooling. I stay engaged until what ships matches what was designed, a distinction that a lot of enterprise design loses between design and production.
              </p>
              <p>
                My background spans B2B SaaS, telecommunications, aviation, and finance: role-based permissions, trustworthy AI, scoping a POC that tests the right assumptions, and design systems that serve large engineering orgs without becoming a bottleneck.
              </p>
              <p>
                I also manage a review program for my agency's finance practice, checking completed work against what's required and leading critique that explains reasoning instead of just corrections.
              </p>
            </div>
          </SectionBlock>

          <SectionBlock label="Career timeline">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

              <ul className="list-none p-0 m-0 flex flex-col gap-10">
                {timeline.map(({ company, roles }) => (
                  <li key={company} className="relative pl-10 flex flex-col gap-3">
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-[5px] w-[15px] h-[15px] rounded-full bg-primary border-[3px] border-background"
                      aria-hidden="true"
                    />

                    {roles.map(({ title, dates, context }, i) => (
                      <div key={title} className={i > 0 ? "mt-4 pt-4 border-t border-border flex flex-col gap-3" : "flex flex-col gap-3"}>
                        <div>
                          <p className="text-[1.0625rem] font-semibold text-foreground leading-snug">{title}</p>
                          <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
                            <span className="text-sm font-medium text-accent">{company}</span>
                            <span className="text-sm text-muted-foreground">·</span>
                            <span className="text-sm text-muted-foreground">{dates}</span>
                          </div>
                        </div>
                        <p className="text-[0.9375rem] text-muted-foreground leading-[1.65]">{context}</p>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
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
                  Bachelor of Science in Journalism (BSJ), Strategic Communications &middot; Lawrence, Kansas
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
