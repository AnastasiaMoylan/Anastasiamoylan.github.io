import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ZoomIn } from "lucide-react";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import type {
  CaseStudy,
  CaseStudyImage,
  Decision,
  Evidence,
  Impact,
  Reflection,
  StateRecovery,
  TeamMember,
  Tldr,
} from "../data/caseStudies";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ImageLightbox from "../components/work/ImageLightbox";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="text-base text-muted-foreground leading-[1.65] pl-5 relative">
          <span className="absolute left-0 text-accent">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SnapshotCard({
  fields,
  team,
}: {
  fields: { label: string; value: string }[];
  team?: TeamMember[];
}) {
  // Timeframe and Status are hidden for now; the data stays in place so they
  // can be restored by removing this filter.
  const visibleFields = fields.filter(({ label }) => label !== "Timeframe" && label !== "Status");

  return (
    <div
      className="mt-12 border border-border rounded-[14px] overflow-hidden bg-[var(--color-border)]"
      aria-label="Case study snapshot"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
        {visibleFields.map(({ label, value }) => (
          <div key={label} className="bg-card p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
              {label}
            </p>
            <p className="text-[0.875rem] text-foreground leading-[1.45]">{value}</p>
          </div>
        ))}
        {team && team.length > 0 && (
          <div className="col-span-2 md:col-span-4 bg-card p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Team</p>
            <p className="text-[0.875rem] text-foreground leading-[1.45]">
              {team.map((t) => t.role).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OverviewSection({ tldr }: { tldr: Tldr }) {
  return (
    <section className="mt-12 pb-12 border-b border-border">
      <h2 className="text-[1.375rem] font-bold text-foreground pb-3 mb-5 border-b border-border">Overview</h2>
      <div className="border border-border rounded-[14px] overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        <div className="bg-card border-b md:border-b-0 md:border-r border-border p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-3">The challenge</p>
          <p className="text-[0.9375rem] text-foreground leading-[1.7]">{tldr.challenge}</p>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">The result</p>
            <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{tldr.result}</p>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">How I approached it</p>
            <p className="text-sm text-muted-foreground leading-[1.7]">{tldr.solution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceInsight({ evidence }: { evidence: Evidence }) {
  return (
    <div className="flex flex-col gap-6">
      {evidence.body && <p className="text-base text-muted-foreground leading-[1.7]">{evidence.body}</p>}
      {evidence.findings && evidence.findings.length > 0 && (
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {evidence.findings.map(({ finding, response }) => (
            <li key={finding} className="border-l-2 border-border pl-5 flex flex-col gap-1">
              <p className="text-[0.9375rem] text-foreground leading-[1.6]">{finding}</p>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.6]">
                <span className="text-accent">&rarr;</span> {response}
              </p>
            </li>
          ))}
        </ul>
      )}
      <blockquote className="border-l-2 border-accent bg-card rounded-r-md pl-6 pr-6 py-5 m-0">
        <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{evidence.insight}</p>
      </blockquote>
      {evidence.principle && (
        <p className="text-[0.9375rem] text-muted-foreground leading-[1.7] italic">{evidence.principle}</p>
      )}
    </div>
  );
}

function RoleTeam({ owned, team }: { owned: string[]; team?: TeamMember[] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">I owned</h3>
        <BulletList items={owned} />
      </div>
      {team && team.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">I worked with</h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {team.map(({ role, owned: theirs }) => (
              <li key={role} className="text-base text-muted-foreground leading-[1.65]">
                <span className="text-foreground">{role}</span>
                {theirs && <> — {theirs}</>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="list-none p-0 m-0 flex flex-col gap-8">
      {decisions.map(({ decision, rationale, rejected, tradeoff }) => (
        <li key={decision} className="flex flex-col gap-2">
          <p className="text-base font-semibold text-foreground leading-[1.5]">{decision}</p>
          <p className="text-base text-muted-foreground leading-[1.65]">{rationale}</p>
          {(rejected || tradeoff) && (
            <p className="text-[0.9375rem] text-muted-foreground/80 leading-[1.6] border-l-2 border-border pl-4 mt-1">
              {rejected && <>Instead of {rejected}</>}
              {rejected && tradeoff && " — "}
              {tradeoff}
              {rejected && !tradeoff && "."}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

function StatesRecovery({ states }: { states: StateRecovery[] }) {
  return (
    <dl className="m-0 flex flex-col gap-5">
      {states.map(({ state, userSees, recovery }) => (
        <div key={state} className="flex flex-col gap-1">
          <dt className="text-base font-semibold text-foreground leading-[1.5]">{state}</dt>
          {userSees && (
            <dd className="m-0 text-[0.9375rem] text-muted-foreground leading-[1.6]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mr-2">
                User sees
              </span>
              {userSees}
            </dd>
          )}
          {recovery && (
            <dd className="m-0 text-[0.9375rem] text-muted-foreground leading-[1.6]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mr-2">Recovery</span>
              {recovery}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

function PendingVisuals({ note, planned }: { note?: string; planned?: string[] }) {
  return (
    <div className="bg-card border border-dashed border-border rounded-[14px] px-8 py-7 flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Visuals pending</p>
      {note && <p className="text-[0.9375rem] text-muted-foreground leading-[1.7]">{note}</p>}
      {planned && planned.length > 0 && (
        <>
          <p className="text-[0.9375rem] text-foreground leading-[1.6]">Planned evidence-bearing visuals:</p>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {planned.map((item) => (
              <li key={item} className="text-[0.9375rem] text-muted-foreground leading-[1.6] pl-5 relative">
                <span className="absolute left-0 text-accent">—</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="text-[0.9375rem] text-muted-foreground leading-[1.6]">
        Walkthrough available on request.{" "}
        <Link to="/contact" className="text-accent hover:text-foreground no-underline transition-colors duration-150">
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}

function OutcomeImpact({ impact }: { impact: Impact }) {
  const lines = [
    { label: "Business", value: impact.business },
    { label: "User", value: impact.user },
    { label: "Organizational", value: impact.organizational },
  ].filter((l) => l.value);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{impact.headline}</p>

      {lines.length > 0 && (
        <dl className="m-0 flex flex-col gap-4">
          {lines.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{label}</dt>
              <dd className="m-0 text-base text-muted-foreground leading-[1.65]">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {impact.before && impact.after && (
        <div className="border border-border rounded-[14px] overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 border-b md:border-b-0 md:border-r border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">Before</p>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.65]">{impact.before}</p>
          </div>
          <div className="bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">After</p>
            <p className="text-[0.9375rem] text-foreground leading-[1.65]">{impact.after}</p>
          </div>
        </div>
      )}

      {impact.proof && impact.proof.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Validated proof</p>
          <BulletList items={impact.proof} />
        </div>
      )}

      {impact.metricStatus && (
        <p className="text-[0.8125rem] text-muted-foreground/80 leading-[1.6] italic">{impact.metricStatus}</p>
      )}
    </div>
  );
}

function ReflectionBlock({ reflection }: { reflection: Reflection }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-base text-muted-foreground leading-[1.7]">{reflection.learned}</p>
      {reflection.wouldChange && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            What I would change
          </p>
          <p className="text-base text-muted-foreground leading-[1.7]">{reflection.wouldChange}</p>
        </div>
      )}
      {reflection.principle && (
        <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6] border-l-2 border-accent pl-5">
          {reflection.principle}
        </p>
      )}
    </div>
  );
}

interface Section {
  id: string;
  nav: string;
  heading: string;
  content: import("react").ReactElement;
}

function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="hidden lg:block shrink-0 w-44 self-start sticky top-24" aria-label="On this page">
      <ul className="list-none p-0 m-0 flex flex-col gap-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={[
                "block pl-3.5 pr-3 py-1.5 text-sm no-underline border-l-2 transition-colors duration-150",
                active === s.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {s.nav}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ImageGallery({ images }: { images: CaseStudyImage[] }) {
  const [active, setActive] = useState<CaseStudyImage | null>(null);
  return (
    <>
      <div className="flex flex-col gap-8">
        {images.map((image) => (
          <figure key={image.src} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActive(image)}
              aria-label={`Enlarge image: ${image.caption}`}
              className="group relative block w-full p-0 rounded-md border border-border overflow-hidden bg-card cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img src={image.src} alt={image.alt} className="w-full h-auto block" loading="lazy" />
              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 pointer-events-none">
                <ZoomIn size={18} />
              </span>
            </button>
            <figcaption className="text-[0.8125rem] text-muted-foreground italic">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      {active && <ImageLightbox image={active} onClose={() => setActive(null)} />}
    </>
  );
}

/** Composes the framework's beats in Frame -> Think -> Land order, skipping empty ones. */
function buildSections(content: CaseStudy): Section[] {
  const sections: Section[] = [
    {
      id: "context",
      nav: "Context",
      heading: "Context and stakes",
      content: <p className="text-base text-muted-foreground leading-[1.7]">{content.context}</p>,
    },
  ];

  if (content.evidence) {
    sections.push({
      id: "evidence",
      nav: "Evidence",
      heading: "Evidence and insight",
      content: <EvidenceInsight evidence={content.evidence} />,
    });
  }

  sections.push(
    {
      id: "role",
      nav: "Role and team",
      heading: "Role and team",
      content: <RoleTeam owned={content.owned} team={content.team} />,
    },
    {
      id: "decisions",
      nav: "Key decisions",
      heading: "Key decisions",
      content: <KeyDecisions decisions={content.decisions} />,
    },
  );

  if (content.states && content.states.length > 0) {
    sections.push({
      id: "states",
      nav: "Edge cases",
      heading: "States, edge cases, and recovery",
      content: <StatesRecovery states={content.states} />,
    });
  }

  if (content.images && content.images.length > 0) {
    sections.push({
      id: "execution",
      nav: "Execution",
      heading: "Execution",
      content: <ImageGallery images={content.images} />,
    });
  } else if (content.visualsPending) {
    sections.push({
      id: "execution",
      nav: "Execution",
      heading: "Execution",
      content: <PendingVisuals note={content.visualsPendingNote} planned={content.plannedVisuals} />,
    });
  }

  if (content.impact) {
    sections.push({
      id: "outcome",
      nav: "Outcome",
      heading: "Outcome and impact",
      content: <OutcomeImpact impact={content.impact} />,
    });
  }

  if (content.reflection) {
    sections.push({
      id: "reflection",
      nav: "Reflection",
      heading: "Reflection",
      content: <ReflectionBlock reflection={content.reflection} />,
    });
  }

  return sections;
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const content = caseStudies[slug!];
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!content) {
    return (
      <div className="py-16 pb-24">
        <div className="content-container">
          <Link to="/work" className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline mb-10 transition-colors duration-150">
            &larr; All case studies
          </Link>
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground mb-6">{project.title}</h1>
          <p className="text-[1.0625rem] text-muted-foreground mb-2">Full case study and visuals coming soon.</p>
          <p className="text-[0.9375rem] text-muted-foreground">Detailed write-up available on request. <Link to="/contact" className="text-accent hover:text-foreground no-underline transition-colors duration-150">Get in touch</Link>.</p>
        </div>
      </div>
    );
  }

  const sections = buildSections(content);

  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <Link to="/work" className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline mb-10 transition-colors duration-150">
          &larr; All case studies
        </Link>

        <div className="max-w-[48rem]">
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground leading-[1.15]">
            {project.title}
          </h1>
          <p className="text-[clamp(1.0625rem,2vw,1.25rem)] font-medium text-muted-foreground leading-[1.5] mt-4">
            {project.tagline}
          </p>
          <ul className="list-none p-0 m-0 flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="accent">{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <SnapshotCard fields={content.snapshotFields} team={content.team} />

        <OverviewSection tldr={content.tldr} />

        <div className="flex flex-col lg:flex-row gap-12 pt-12">
          <SectionNav sections={sections} />
          <div className="flex-1 min-w-0 flex flex-col gap-14">
            {sections.map(({ id, heading, content: sectionContent }) => (
              <section key={id} id={id} className="flex flex-col gap-4 scroll-mt-24">
                <h2 className="text-xl font-bold text-foreground">{heading}</h2>
                {sectionContent}
              </section>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
              Next case study
            </p>
            <Link
              to={`/work/${nextProject.slug}`}
              className="text-base font-semibold text-accent hover:text-foreground no-underline transition-colors duration-150"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>
    </div>
  );
}
