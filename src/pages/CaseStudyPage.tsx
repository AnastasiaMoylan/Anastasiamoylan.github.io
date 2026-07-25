import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import SnapshotCard from "../components/case-study/SnapshotCard";
import OverviewSection from "../components/case-study/OverviewSection";
import SectionNav from "../components/case-study/SectionNav";
import buildSections from "../components/case-study/buildSections";

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
