import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import Button from "../components/ui/Button";
import CaseStudyHeader from "../components/case-study/CaseStudyHeader";
import Opener from "../components/case-study/Opener";
import ChapterBar from "../components/case-study/ChapterBar";
import Part from "../components/case-study/Part";
import Credits from "../components/case-study/Credits";
import { SECTION_GROUPS } from "../components/case-study/sectionGroups";
import Eyebrow from "../components/ui/Eyebrow";
import buildSections from "../components/case-study/buildSections";
import { getAugments } from "../components/case-study/diagrams/augments";

/**
 * The case-study page, in Layout C's order (2026-09-09):
 *
 *   lede        kicker, claim, byline, deck, figures
 *   opener      close-up and context images on the teal ground
 *   chapter bar the one navigation, sticky under the site header
 *   three parts each with its children
 *   credits     who the work was built with
 *   close       next study and the call to action
 *
 * This file holds routing, the order above, and the section frame. Each beat
 * is its own component; `buildSections` decides which children render and
 * what each is headed.
 */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  // Retired slugs stay reachable, so existing links and résumé references survive
  // a rename. The canonical URL still points at the current slug (see pageMeta).
  const project = projects.find((p) => p.slug === slug || p.previousSlug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const content = caseStudies[project.slug];
  // Resolved project, not the URL slug: otherwise reaching the page through a
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
  const groups = SECTION_GROUPS.filter((g) => sections.some((s) => s.group === g.id));

  /*
    The lede's pieces, each with a fallback so an un-migrated study still
    renders something true.

    `claim` is the news and becomes the h1. Falling through to the tagline is
    the signal that a study still needs its claim written: a tagline describes
    the work, and this slot has to assert what changed.

    `deck` is the approach in one sentence, and only exists once a study's
    overview has been split into its three lines.
  */
  const overview = content.overview;
  const claim = content.claim ?? overview?.result ?? project.tagline;
  const deck = overview?.approach;

  return (
    <>
      <section className="border-b border-border">
        <div className="content-container pt-8 pb-8 md:pt-10 md:pb-10">
          {/*
            The back link shares the kicker's line rather than taking one of
            its own: the lede has to fit the numbers on the first screen, and
            every row above the claim costs it.
          */}
          <CaseStudyHeader
            backLink={
              <Link to="/work" className="inline-flex items-center gap-1.5 font-mono text-label font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground no-underline transition-colors duration-150">
                &larr; All case studies
              </Link>
            }
            title={project.title}
            claim={claim}
            deck={deck}
            tags={project.tags}
            fields={content.snapshotFields}
            stats={content.stats}
            caveat={content.impact?.metricStatus}
          />
        </div>
      </section>

      {content.opener && <Opener opener={content.opener} />}

      <ChapterBar title={project.title} groups={groups} />

      <div className="content-container">
        {/*
          Heading hierarchy for every case study:
            h1  the claim
            h2  part name: Framing, The work, Results
            h3  child section headings, the study's own claims
            h4  titles nested inside a child: decisions, cards, diagrams
        */}
        {groups.map((group) => (
          <Part key={group.id} group={group}>
            {sections
              .filter((s) => s.group === group.id)
              .map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h3 className="m-0 max-w-[26ch] font-display text-h3 font-bold tracking-[-0.015em] text-foreground">
                    {section.heading}
                  </h3>
                  <div className="mt-6">{section.content}</div>
                </section>
              ))}
          </Part>
        ))}
      </div>

      {content.scope?.workedWith && <Credits workedWith={content.scope.workedWith} />}

      <div className="content-container flex flex-wrap items-center justify-between gap-6 border-t border-border py-[clamp(2.5rem,5vw,4rem)]">
        <div>
          <Eyebrow className="mb-2">Next case study</Eyebrow>
          <Link
            to={`/work/${nextProject.slug}`}
            className="font-display text-body font-bold tracking-[-0.01em] text-accent hover:text-accent-hover no-underline transition-colors duration-150"
          >
            {nextProject.title} &rarr;
          </Link>
        </div>
        <Button to="/contact" variant="primary">Get in touch</Button>
      </div>
    </>
  );
}
