import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import Button from "../components/ui/Button";
import CaseStudyHeader from "../components/case-study/CaseStudyHeader";
import StatBand from "../components/case-study/StatBand";
import PlaceholderFigure from "../components/case-study/PlaceholderFigure";
import OnThisPage from "../components/case-study/OnThisPage";
import Part from "../components/case-study/Part";
import { SECTION_GROUPS } from "../components/case-study/sectionGroups";
import Eyebrow from "../components/ui/Eyebrow";
import buildSections from "../components/case-study/buildSections";
import { getAugments } from "../components/case-study/diagrams/augments";

/**
 * The cover visual under the header is off for every study (2026-09-04)
 * until better visuals exist; the current covers are screenshots and
 * diagrams that the 21/9 crop cuts to pieces. Flip to true to bring the
 * cover (or its placeholder) back. Card covers on the home and Work grids
 * are unaffected.
 */
const SHOW_COVER = false;

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
          <Link to="/work" className="inline-flex items-center gap-1.5 font-mono text-label font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground no-underline mb-8 transition-colors duration-150">
            &larr; All case studies
          </Link>
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground mb-6">{project.title}</h1>
          <p className="text-[1.0625rem] text-muted-foreground mb-2">Full case study and visuals coming soon.</p>
          <p className="text-[0.9375rem] text-muted-foreground">Detailed write-up available on request. <Link to="/contact" className="text-accent hover:text-foreground no-underline transition-colors duration-150">Get in touch</Link>.</p>
        </div>
      </div>
    );
  }

  const sections = buildSections(content, getAugments(project.slug));

  /*
    The lede's three pieces, each with a fallback so an un-migrated study still
    renders something true.

    `claim` is the news and becomes the h1. Falling through to the tagline is
    the signal that a study still needs its claim written — a tagline describes
    the work, and this slot has to assert what changed.

    `deck` is the approach in one sentence, and only exists once a study's
    overview has been split into its three lines.
  */
  const overview = content.overview;
  const isSplit = typeof overview === "object" && overview !== null;
  const claim = content.claim ?? (isSplit ? overview.result : undefined) ?? project.tagline;
  const deck = isSplit ? overview.approach : undefined;

  return (
    <>
      {/* No blueprint layer here (removed 2026-08-26): the case-study header
          sits over the plain ground so the title and facts read clean; the
          grid stays a homepage/About device. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="content-container relative py-16">
          <Link to="/work" className="inline-flex items-center gap-1.5 font-mono text-label font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground no-underline mb-8 transition-colors duration-150">
            &larr; All case studies
          </Link>

          <CaseStudyHeader
            title={project.title}
            claim={claim}
            deck={deck}
            tags={project.tags}
            fields={content.snapshotFields}
          />
        </div>
      </section>

    <div className="pt-4 pb-24">
      <div className="content-container">

        {/*
          The cover sets tone rather than carrying information: every substantive
          visual on the page is a captioned figure with its own alt text further
          down, so this one is decorative and stays out of the a11y tree.

          21/9 on desktop keeps the banner feel without amputating the frame the
          way 32/9 did — the covers are screenshots and diagrams, and the strip
          crop cut most of them away. On mobile the same ratio collapses to a
          ~90px sliver, so narrow screens relax to 16/9.
        */}
        {SHOW_COVER &&
          (project.image ? (
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
          ))}

        {content.stats && content.stats.length > 0 && <StatBand stats={content.stats} />}

        {/* 12-column grid at lg: the one navigation spans 3, content spans 9.
            Below lg it stacks and the nav becomes a chip strip. */}
        <div className="flex flex-col gap-10 pt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <OnThisPage sections={sections} />
          <div className="min-w-0 flex flex-col gap-20 lg:col-span-9">
            {/*
              Three parts, each holding its children (revised 2026-09-09; the
              scannability pass later that day gave them shape — see Part.tsx
              for the mechanism). The 2px rule that used to open a parent is
              gone: the part's cover and the band carry the boundary now, and
              the rule read as a heavier child divider rather than a chapter
              break. Nothing is behind a disclosure.

              Heading hierarchy for every case study:
                h1  page title
                h2  part name — Framing, The work, Results
                h3  child section headings
                h4  titles nested inside a child — steps, cards, diagrams
            */}
            {SECTION_GROUPS.map((group) => {
              const groupSections = sections.filter((s) => s.group === group.id);
              if (groupSections.length === 0) return null;

              return (
                <Part key={group.id} group={group}>
                  {groupSections.map((section, i) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className={["scroll-mt-24", i > 0 ? "border-t border-border pt-12" : ""].join(" ")}
                    >
                      <h3 className="m-0 max-w-[24ch] font-display text-h3 font-bold tracking-[-0.02em] text-foreground">
                        {section.heading}
                      </h3>
                      <div className="mt-6">{section.content}</div>
                    </section>
                  ))}
                </Part>
              );
            })}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border flex flex-wrap justify-between items-center gap-4">
          <div>
            <Eyebrow className="mb-2">Next case study</Eyebrow>
            <Link
              to={`/work/${nextProject.slug}`}
              className="font-display text-base font-bold tracking-[-0.01em] text-accent hover:text-accent-hover no-underline transition-colors duration-150"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>
    </div>
    </>
  );
}
