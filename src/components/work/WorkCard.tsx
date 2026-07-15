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
      <div className="p-6 flex flex-col gap-2.5 flex-1">
        <span className="text-[0.8125rem] text-muted-foreground">{project.role}</span>
        <h3 className="text-lg font-semibold leading-[1.3] text-foreground">{project.title}</h3>
        <p className="text-[0.9375rem] text-muted-foreground leading-[1.6] line-clamp-3">{project.problem}</p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="accent">{tag}</Badge>
            </li>
          ))}
        </ul>
        <span className="text-[0.9375rem] font-medium text-accent mt-auto pt-1" aria-hidden="true">
          Read case study &rarr;
        </span>
      </div>
    </article>
  );
}
