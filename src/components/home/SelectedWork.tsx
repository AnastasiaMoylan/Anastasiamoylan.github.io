import { Link } from "react-router";
import WorkCard from "../work/WorkCard";
import { projects } from "../../data/projects";

const featured = projects
  .filter((p) => !p.hiddenOnHome)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function SelectedWork() {
  return (
    <section className="bg-card border-y border-border" aria-labelledby="home-work-heading">
      <div className="content-container py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="home-work-heading"
            className="font-display text-[clamp(1.625rem,3vw,2.125rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            Four platforms people had to trust.
          </h2>
          <Link
            to="/work"
            className="font-mono text-[0.75rem] tracking-[0.03em] text-accent hover:text-accent-hover no-underline transition-colors duration-150"
          >
            All case studies &rarr;
          </Link>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-x-7 gap-y-11 md:grid-cols-2">
          {featured.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
