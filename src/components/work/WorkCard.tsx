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
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">{project.role}</span>
        <h3 className="text-[1.1875rem] font-semibold leading-[1.25] text-foreground transition-colors duration-150 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-[0.875rem] text-muted-foreground leading-[1.55]">{project.tagline}</p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-1.5 mt-auto pt-3">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex text-[0.6875rem] text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                {tag}
              </span>
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent pt-3" aria-hidden="true">
          Read case study
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">&rarr;</span>
        </span>
      </div>
    </article>
  );
}
