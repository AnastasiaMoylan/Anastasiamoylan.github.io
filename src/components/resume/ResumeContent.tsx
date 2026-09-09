import {
  resumeHeader,
  resumeSummary,
  resumeExperience,
  resumeSkills,
  resumeEducation,
} from "../../data/resume";
import "./ResumeContent.css";

/**
 * Renders `src/data/resume.ts`. The same data is emitted as `resume.txt` by
 * `buildResumeTxt()`, so the page and the plain-text résumé cannot disagree —
 * add content to the data file, not to this markup.
 */

function Section({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-10 pt-8 border-t border-border" aria-labelledby={id}>
      <h2
        id={id}
        className="resume-section-heading text-[0.75rem] font-bold uppercase tracking-[0.1em] text-accent mb-5"
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="resume-bullet-marker text-accent shrink-0 mt-0.5">—</span>
          <span className="resume-bullet-text text-[0.9375rem] text-muted-foreground leading-[1.65]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumeContent() {
  return (
    <article className="max-w-[52rem]">
      {/* ── Header ── */}
      <header>
        <h1 className="resume-name text-[clamp(2rem,5vw,3rem)] font-bold text-foreground leading-[1.1] mb-2">
          {resumeHeader.name}
        </h1>
        <p className="resume-tagline text-[1.0625rem] font-medium text-accent mb-5">
          {resumeHeader.tagline}
        </p>
        <ul className="resume-contact list-none p-0 m-0 flex flex-wrap gap-x-5 gap-y-1 mb-3">
          {resumeHeader.contacts.map(({ label, href }) => {
            const external = href.startsWith("http");
            return (
              <li key={href}>
                <a
                  href={href}
                  className="resume-contact-link text-[0.9375rem] text-accent hover:text-foreground no-underline transition-colors duration-150"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="resume-location text-[0.9375rem] text-muted-foreground">
          {resumeHeader.location}
        </p>
      </header>

      {/* ── Summary ── */}
      <Section id="resume-summary-heading" heading="Summary">
        <div className="flex flex-col gap-3">
          {resumeSummary.map((para, i) => (
            <p key={i} className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
              {para}
            </p>
          ))}
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section id="resume-experience-heading" heading="Experience">
        {resumeExperience.map((job, jobIndex) => (
          <div
            key={job.company}
            className={jobIndex < resumeExperience.length - 1 ? "mb-10" : undefined}
          >
            <h3 className="resume-job-company text-[1.0625rem] font-bold text-foreground mb-1">
              {job.company}
            </h3>
            {job.titles.map((title) => (
              <p
                key={title}
                className={[
                  "resume-job-title text-[0.9375rem] font-semibold text-muted-foreground",
                  // A single-title job carries the bottom margin itself; a
                  // stacked pair lets the meta line below it do that instead.
                  job.meta ? "" : "mb-1",
                ].join(" ")}
              >
                {title}
              </p>
            ))}
            {job.meta && (
              <p className="resume-job-meta text-sm text-muted-foreground mt-1 mb-4">{job.meta}</p>
            )}
            <div className={job.meta ? undefined : "mt-3"}>
              <Bullets items={job.bullets} />
            </div>

            {job.subJobsLabel && (
              <p className="text-[0.8125rem] font-semibold italic text-accent mt-5 mb-3">
                {job.subJobsLabel}
              </p>
            )}
            {job.subJobs?.map(({ title, bullets }) => (
              <div key={title} className="resume-sub-job mt-6 pl-4 border-l-2 border-border">
                <h4 className="resume-sub-job-title text-[0.9375rem] font-bold text-foreground mb-3">
                  {title}
                </h4>
                <Bullets items={bullets} />
              </div>
            ))}
          </div>
        ))}
      </Section>

      {/* ── Skills ── */}
      <Section id="resume-skills-heading" heading="Skills">
        <div className="flex flex-col gap-5">
          {resumeSkills.map(({ label, body }) => (
            <div key={label}>
              <p className="resume-skills-label text-sm font-bold text-foreground mb-1">{label}</p>
              <p className="resume-skills-body text-[0.9375rem] text-muted-foreground leading-[1.65]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section id="resume-education-heading" heading="Education">
        <div className="flex flex-col gap-5">
          {resumeEducation.map(({ school, degree }) => (
            <div key={school}>
              <p className="resume-edu-school text-base font-bold text-foreground">{school}</p>
              <p className="resume-edu-degree text-[0.9375rem] text-muted-foreground">{degree}</p>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
