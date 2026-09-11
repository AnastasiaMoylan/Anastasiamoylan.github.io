import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import Button from "../components/ui/Button";
import CaseStudyHeader from "../components/case-study/CaseStudyHeader";
import Opener from "../components/case-study/Opener";
import RunningHead from "../components/case-study/RunningHead";
import Part from "../components/case-study/Part";
import Credits from "../components/case-study/Credits";
import { SECTION_GROUPS } from "../components/case-study/sectionGroups";
import buildSections from "../components/case-study/buildSections";
import { getAugments } from "../components/case-study/diagrams/augments";

/**
 * The case-study page in the Plates layout (2026-09-11):
 *
 *   lede          kicker, claim, deck, snapshot beside the figures
 *   plate 01      the close-up, on ink
 *   running head  the one navigation, sticky under the site header
 *   three parts   each an ink opener band, then its sections
 *   close         credits, next study, the call to action
 *
 * Every artefact on the page is a numbered plate on a ground chosen by what
 * it is; the argument runs in a 60ch column between plates. The system is in
 * src/styles/case-study.css; the reference is renderings/j-plates.src.html.
 * This file holds routing, that order, and the section frame; each beat is
 * its own component and `buildSections` decides which children render.
 */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  // Retired slugs stay reachable, so existing links and résumé references survive
  // a rename. The canonical URL still points at the current slug (see pageMeta).
  const project = projects.find((p) => p.slug === slug || p.previousSlug === slug);

  usePlateReveal(project?.slug);

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
    `claim` is the news and becomes the h1; falling through to the overview's
    result line, then the tagline, is the signal that a study still needs its
    claim written. `deck` is the approach in one sentence.
  */
  const overview = content.overview;
  const claim = content.claim ?? overview?.result ?? project.tagline;
  const deck = overview?.approach;

  return (
    <div className="cs-page">
      <section className="content-container cs-grid cs-lede">
        <CaseStudyHeader
          backLink={
            <Link to="/work" className="text-muted-foreground hover:text-foreground no-underline transition-colors duration-150">
              &larr; All case studies
            </Link>
          }
          title={project.title}
          claim={claim}
          deck={deck}
          fields={content.snapshotFields}
          stats={content.stats}
        />
      </section>

      {content.opener && <Opener opener={content.opener} />}

      <RunningHead groups={groups} sections={sections} />

      {/*
        Heading hierarchy for every case study:
          h1  the claim
          h2  part name: Framing, The work, Results
          h3  section headings, the study's own claims
          h4  decision claims
      */}
      {groups.map((group) => {
        const children = sections.filter((s) => s.group === group.id);
        return (
          <Part key={group.id} group={group} items={children}>
            {children.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="content-container cs-grid cs-sec"
              >
                <h3 className="cs-claim cs-h3">{section.heading}</h3>
                <div className="cs-sub">{section.content}</div>
              </section>
            ))}
          </Part>
        );
      })}

      <div className="content-container cs-grid pt-[var(--cs-gap-section)]">
        {content.scope?.workedWith && <Credits workedWith={content.scope.workedWith} />}
        <div className="cs-next">
          <div>
            <p className="cs-label mb-2 text-tertiary-700">Next case study</p>
            <Link
              to={`/work/${nextProject.slug}`}
              className="font-display text-body font-bold tracking-[-0.01em] text-accent hover:text-accent-hover no-underline transition-colors duration-150"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
          <Button to="/contact" variant="primary">Get in touch</Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Interaction 1, the plate reveal: each plate's artefact fades in and rises
 * once, when a fifth of it enters the viewport. The hiding is CSS gated on
 * the `.js` class index.html sets before paint, with a fallback that shows
 * everything after 2.5s; this marks each artefact `data-in` when it is seen,
 * or all of them at once under reduced motion or without an observer. It
 * writes a data attribute React does not manage, so a re-render cannot undo
 * it. Re-runs per study, for client-side navigation between them.
 */
function usePlateReveal(key: string | undefined) {
  useEffect(() => {
    const arts = Array.from(document.querySelectorAll<HTMLElement>(".cs-art:not([data-in])"));
    const show = (el: Element) => el.setAttribute("data-in", "");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      arts.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          show(e.target);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    arts.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
