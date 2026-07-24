import { Link } from "react-router";
import type { Project } from "../../data/projects";

interface WorkCardProps {
  project: Project;
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <article className="group relative bg-card border border-border rounded-md overflow-hidden flex flex-col hover:border-primary transition-colors duration-150">
      <Link
        to={`/work/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read case study: ${project.title}`}
      />
      <div className="border-b border-border aspect-video overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`Visual for: ${project.title}`}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div
            className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-[0.8125rem] text-center p-6"
            role="img"
            aria-label={`Visuals coming soon for: ${project.title}`}
          >
            Visuals coming soon
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col gap-2.5 flex-1">
        <span className="text-[0.8125rem] text-muted-foreground">{project.role}</span>
        <h3 className="text-lg font-semibold leading-[1.3] text-foreground">{project.title}</h3>
        <p className="text-[0.9375rem] font-medium text-foreground leading-[1.5]">{project.tagline}</p>
        <p className="text-[0.9375rem] text-muted-foreground leading-[1.6] line-clamp-3">{project.problem}</p>
        <p className="text-[0.8125rem] text-muted-foreground mt-auto pt-1">{project.tags.join(" · ")}</p>
      </div>
      <div className="border-t border-border bg-secondary px-6 py-3 flex items-center justify-between text-[0.9375rem] font-medium text-accent transition-colors duration-150 group-hover:bg-primary group-hover:text-primary-foreground">
        <span>Read case study</span>
        <span className="text-base transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true">
          &rarr;
        </span>
      </div>
    </article>
  );
}
