import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { figures } from "../data/figures";

const timeline = [
  {
    company: "Amdocs Studios",
    roles: [
      {
        title: "Lead Product Designer",
        dates: "2025–Present",
        context:
          "Manages a review program for the agency's finance practice, checking completed work against what's required before it moves forward. Drives integration of AI capabilities into production-ready, enterprise-scale systems for finance, billing, and telecommunications CX platforms, and establishes shared design frameworks and best practices across projects.",
      },
      {
        title: "Senior Experience Designer",
        dates: "July 2021–July 2025",
        context:
          "Led design on Finance Cloud and other AI-assisted finance and billing products, enterprise document intelligence, and complex telecommunications CX platforms, driving product strategy alignment and end-to-end experience across multi-phase engagements.",
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
  "Claude Code", "Windsurf", "Jira", "Notion",
];

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 pb-14 border-b border-border last:border-b-0 last:mb-0">
      {/* A real h2 (styled as the eyebrow) so the page has an outline —
          it previously rendered as a <p>, leaving h1 with no children. */}
      <h2 className="m-0 mb-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tertiary-700">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Same header band the homepage hero uses, so the page reads as part
          of the same site rather than a plain document. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="content-container relative py-16">
          <SectionHeading
            level={1}
            eyebrow="About"
            title="Anastasia Novelly Moylan"
            subtitle="Lead Product Designer · 11 years in enterprise product and AI design"
          />
        </div>
      </section>

      <div className="py-16 pb-24">
        <div className="content-container">
        <div className="max-w-[52rem]">
          <SectionBlock label="Who I am">
            <div className="flex flex-col gap-4 text-[1.0625rem] text-muted-foreground leading-[1.75]">
              <p>
                I design complex enterprise products: AI assistants, workflows, document intelligence systems, and operational tooling. I stay engaged until what ships matches what was designed, a distinction that a lot of enterprise design loses between design and production.
              </p>
              <p>
                My background spans B2B SaaS, telecommunications, aviation, and finance: role-based permissions, trustworthy AI, scoping a POC that tests the right assumptions, and design systems that serve large engineering orgs without becoming a bottleneck.
              </p>
              {/* [NEEDS SIGN-OFF] Added 2026-08-25. "Lead" reads as people manager in some
                  orgs and senior IC in others, and nothing on the site disambiguated it.
                  Anastasia's ladder runs toward Principal, not management — stated here as
                  positioning rather than as a caveat. */}
              <p>
                I lead on the individual-contributor track: my org's path runs toward Principal rather than people management. Direction without reporting lines: I set design direction for {figures.designersDirectedWord} designers across the finance program and decide who works on what. I translate the program lead's and product owners' intent into direction designers can execute, onboard new designers to the program's patterns and client, and coach on client interaction and information gathering. When my capacity ran out, I handed one designer's mentoring to another lead and charged a third with standardizing the research program across engagements.
              </p>
              <p>
                I also manage a review program for my agency's finance practice, checking completed work against what's required and leading critique that explains reasoning instead of just corrections.
              </p>
              {/* [NEEDS SIGN-OFF] Added 2026-09-03 from the scorecard session record
                  (§4.8). Self-reported time-saved figures deliberately omitted. */}
              <p>
                I define with AI as well as design with it. I used Figma Make and Windsurf to move from research findings to product requirements, feature breakdown, and a prioritized, story-level backlog in one loop, and to put working prototypes in front of the client rather than static screens. Engineering built from the stories directly.
              </p>
              <p>
                I don't wait for direction: I set the vision, run the workshops, and drive alignment across an organization to get it built.
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
                      className="absolute left-0 top-[5px] w-[15px] h-[15px] rounded-full bg-tertiary-700 border-[3px] border-background"
                      aria-hidden="true"
                    />

                    {roles.map(({ title, dates, context }, i) => (
                      <div key={title} className={i > 0 ? "mt-4 pt-4 border-t border-border flex flex-col gap-3" : "flex flex-col gap-3"}>
                        <div>
                          <p className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-foreground leading-snug">{title}</p>
                          <div className="flex flex-wrap items-center gap-x-2 mt-0.5">
                            <span className="text-sm font-medium text-tertiary-700">{company}</span>
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
                <li key={d} className="text-sm text-secondary-foreground bg-secondary rounded-sm px-3 py-1.5">
                  {d}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Tools">
            <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="text-sm text-secondary-foreground bg-secondary rounded-sm px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock label="Education">
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">The University of Kansas</p>
                <p className="text-[0.9375rem] text-muted-foreground">
                  Bachelor of Science in Journalism (BSJ), Strategic Communications &middot; Lawrence, Kansas
                </p>
              </div>
              <div>
                <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">LUMA Institute</p>
                <p className="text-[0.9375rem] text-muted-foreground">LUMA Design Thinking Practitioner</p>
              </div>
            </div>
          </SectionBlock>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button to="/philosophy" variant="outline">Read the Philosophy</Button>
            <Button to="/resume" variant="outline">View Résumé</Button>
            <Button to="/contact" variant="primary">Get in Touch</Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
