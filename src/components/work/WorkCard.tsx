import { Link } from "react-router";
import type { Project } from "../../data/projects";

interface WorkCardProps {
  project: Project;
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <article className="group relative flex flex-col">
      <Link
        to={`/work/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read case study: ${project.title}`}
      />

      <div className="aspect-[23/8] overflow-hidden rounded-md bg-secondary">
        {project.image ? (
          <img
            src={project.image}
            alt={`Visual for: ${project.title}`}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center p-6 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
            role="img"
            aria-label={`Visuals coming soon for: ${project.title}`}
          >
            Visuals coming soon
          </div>
        )}
      </div>

      {/* Two tags, not four — the meta line is a label, not the tag list. */}
      <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-tertiary-700">
        {project.tags.slice(0, 2).join(" · ")}
      </p>

      <h3 className="mt-3 font-display text-[1.375rem] font-medium leading-[1.2] tracking-[-0.015em] text-foreground transition-colors duration-150 group-hover:text-accent">
        {project.title}
      </h3>

      <p className="mt-2 line-clamp-2 min-h-[2.875rem] text-[0.90625rem] leading-[1.6] text-muted-foreground">
        {project.tagline}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-3.5">
        <span className="font-mono text-[0.65625rem] tracking-[0.03em] text-accent">
          {project.role}
        </span>
        <span
          className="text-[0.9375rem] text-accent transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </div>
    </article>
  );
}
