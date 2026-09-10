import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { aboutHeader, aboutIntro, aboutTimeline, aboutDomains, aboutTools } from "../data/about";
import { resumeEducation } from "../data/resume";

/**
 * The About page. Every sentence on it comes from `data/about.ts`, and the
 * education block is the résumé's own list, so the two can never disagree.
 * This file is layout only.
 */
function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 pb-14 border-b border-border last:border-b-0 last:mb-0">
      {/* A real h2 (styled as the eyebrow) so the page has an outline. */}
      <h2 className="m-0 mb-5 font-mono text-label font-medium uppercase tracking-[0.12em] text-tertiary-700">
        {label}
      </h2>
      {children}
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="text-sm text-secondary-foreground bg-secondary rounded-sm px-3 py-1.5">
          {item}
        </li>
      ))}
    </ul>
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
            title={aboutHeader.title}
            subtitle={aboutHeader.subtitle}
          />
        </div>
      </section>

      <div className="py-16 pb-24">
        <div className="content-container">
        <div className="max-w-[52rem]">
          <SectionBlock label="Who I am">
            <div className="flex flex-col gap-4 text-[1.0625rem] text-muted-foreground leading-[1.75]">
              {aboutIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock label="Career timeline">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

              <ul className="list-none p-0 m-0 flex flex-col gap-10">
                {aboutTimeline.map(({ company, roles }) => (
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
            <Chips items={aboutDomains} />
          </SectionBlock>

          <SectionBlock label="Tools">
            <Chips items={aboutTools} />
          </SectionBlock>

          <SectionBlock label="Education">
            <div className="flex flex-col gap-4">
              {resumeEducation.map(({ school, degree }) => (
                <div key={school}>
                  <p className="font-display text-base font-bold tracking-[-0.01em] text-foreground">{school}</p>
                  <p className="text-[0.9375rem] text-muted-foreground">{degree}</p>
                </div>
              ))}
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
