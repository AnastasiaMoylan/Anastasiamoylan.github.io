import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import Button from "../components/ui/Button";
import CaseStudyHeader from "../components/case-study/CaseStudyHeader";
import StatBand from "../components/case-study/StatBand";
import PlaceholderFigure from "../components/case-study/PlaceholderFigure";
import SectionNav from "../components/case-study/SectionNav";
import buildSections from "../components/case-study/buildSections";
import { financeCloudAugments } from "../components/case-study/diagrams/financeCloudDiagrams";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  // Retired slugs stay reachable, so existing links and résumé references survive
  // a rename. The canonical URL still points at the current slug (see pageMeta).
  const project = projects.find((p) => p.slug === slug || p.previousSlug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const content = caseStudies[project.slug];
  // Resolved project, not the URL slug — otherwise reaching the page through a
  // retired alias finds no match and "next" wraps around to this study itself.
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
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

  const sections = buildSections(
    content,
    project.slug === "finance-cloud" ? financeCloudAugments() : {},
  );

  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <Link to="/work" className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline mb-10 transition-colors duration-150">
          &larr; All case studies
        </Link>

        <CaseStudyHeader
          title={project.title}
          tagline={project.tagline}
          tags={project.tags}
          fields={content.snapshotFields}
        />

        {/*
          The cover sets tone rather than carrying information: every substantive
          visual on the page is a captioned figure with its own alt text further
          down, so this one is decorative and stays out of the a11y tree.

          21/9 on desktop keeps the banner feel without amputating the frame the
          way 32/9 did — the covers are screenshots and diagrams, and the strip
          crop cut most of them away. On mobile the same ratio collapses to a
          ~90px sliver, so narrow screens relax to 16/9.
        */}
        {project.image ? (
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="mt-10 aspect-[16/9] md:aspect-[21/9] w-full rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="mt-10">
            <PlaceholderFigure caption={`Cover visual for ${project.title} is in production.`} />
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <StatBand stats={content.stats} caveat={content.impact?.metricStatus} />
        )}

        <div className="flex flex-col lg:flex-row gap-12 pt-12">
          <SectionNav sections={sections} />
          <div className="flex-1 min-w-0 flex flex-col gap-14">
            {/*
              Heading hierarchy for every case study:
                h1  page title
                h2  Overview
                h3  section headings (these panel headers)
                h4  titles nested inside a section — diagrams, sub-labels
            */}
            {sections.map(({ id, heading, content: sectionContent }, i) => (
              <section
                key={id}
                id={id}
                className={[
                  "scroll-mt-24",
                  // A hairline above each section is the "new section starts
                  // here" marker, so the h3 never has to carry that job alone.
                  i > 0 ? "border-t border-border pt-14" : "",
                ].join(" ")}
              >
                <h3 className="text-[clamp(1.25rem,2.4vw,1.5rem)] font-bold leading-[1.2] tracking-[-0.015em] text-foreground">
                  {heading}
                </h3>
                <div className="mt-7">{sectionContent}</div>
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
