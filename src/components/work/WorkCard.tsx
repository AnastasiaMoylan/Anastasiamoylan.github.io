import { Link } from "react-router";
import Badge from "../ui/Badge";
import type { Project } from "../../data/projects";

interface WorkCardProps {
  project: Project;
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <article className="relative bg-card border border-border rounded-md overflow-hidden flex flex-col hover:border-primary transition-colors duration-150">
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
      <div className="p-7 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="status">{project.status}</Badge>
          <span className="text-[0.8125rem] text-muted-foreground">{project.role}</span>
        </div>
        <h3 className="text-lg font-semibold leading-[1.3] text-foreground">{project.title}</h3>
        <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">{project.problem}</p>
        <p className="text-sm text-muted-foreground italic pt-2 border-t border-border mt-auto">
          {project.outcome}
        </p>
        <span className="text-[0.9375rem] font-medium text-accent" aria-hidden="true">
          Read case study &rarr;
        </span>
      </div>
    </article>
  );
}
