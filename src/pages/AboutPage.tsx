import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";

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

/**
 * [NEEDS SIGN-OFF] Added 2026-08-26 from the Mobbin research board's About
 * pattern (manifesto + labeled principles grid). Wording drawn from
 * Anastasia's own operating-principles document; tightened, not invented.
 */
const principles = [
  {
    label: "Fix the terminology first",
    detail: "If two people can use the same word and mean different objects, there is nothing to design yet.",
  },
  {
    label: "Trace the mechanism",
    detail: "Ask what powers the surface \u2014 the data, the orchestration, the constraints \u2014 before drawing it.",
  },
  {
    label: "Scope to a provable MVP",
    detail: "Cut to the smallest thing that proves value, and record what was deferred so it isn't lost.",
  },
  {
    label: "Document the non-goals",
    detail: "Agreed goals and explicit non-goals, written down \u2014 a line in the sand the whole team can point to.",
  },
];

/** One honest number set (Sketch pattern) \u2014 figures grounded in the case studies. */
const numbers = [
  { value: "6", label: "Designers directed across one program" },
  { value: "6", label: "Product areas under one experience layer" },
  { value: "11", label: "Years in enterprise product design" },
];

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 pb-14 border-b border-border last:border-b-0 last:mb-0">
      <Eyebrow className="mb-5">{label}</Eyebrow>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Same blueprint header the homepage hero uses, so the page reads as
          part of the same site rather than a plain document. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="blueprint absolute inset-0" aria-hidden="true" />
        <div className="content-container relative py-16">
          <SectionHeading
            level={1}
            eyebrow="About"
            title="Anastasia Novelly Moylan"
            subtitle="Lead UX Designer · 11 years in enterprise product and AI design"
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
                I lead on the individual-contributor track: my org's path runs toward Principal rather than people management. I own the strategy and the product, and I direct the six designers building it across the finance transformation program — direction without reporting lines. Much of the job is coordinating large teams and making clarity out of confusion.
              </p>
              <p>
                I also manage a review program for my agency's finance practice, checking completed work against what's required and leading critique that explains reasoning instead of just corrections.
              </p>
              <p>
                I don't wait for direction: I set the vision, run the workshops, and drive alignment across an organization to get it built.
              </p>
            </div>
          </SectionBlock>

          <SectionBlock label="How I work">
            <ol className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {principles.map(({ label, detail }, i) => (
                <li key={label} className="rounded-md border border-border bg-card px-6 py-5">
                  <p className="m-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-tertiary-700">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2.5 m-0 font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-foreground">
                    {label}
                  </p>
                  <p className="mt-1.5 m-0 text-[0.9375rem] leading-[1.6] text-muted-foreground">{detail}</p>
                </li>
              ))}
            </ol>
            <dl className="m-0 mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
              {numbers.map(({ value, label }) => (
                <div key={label}>
                  <dd className="m-0 font-display text-[2.25rem] font-extrabold leading-none tracking-[-0.03em] text-accent">
                    {value}
                  </dd>
                  <dt className="mt-2 m-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-tertiary-700">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
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
            <Button to="/resume" variant="outline">View Résumé</Button>
            <Button to="/contact" variant="primary" shape="hex">Get in Touch</Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
