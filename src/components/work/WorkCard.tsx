import { Link } from "react-router";
import Badge from "../ui/Badge";
import type { Project } from "../../data/projects";

interface WorkCardProps {
  project: Project;
}

export default function WorkCard({ project }: WorkCardProps) {
  return (
    <article className="bg-card border border-border rounded-md overflow-hidden flex flex-col hover:border-primary transition-colors duration-150">
      <div
        className="bg-secondary border-b border-border aspect-video flex items-center justify-center text-muted-foreground text-[0.8125rem] text-center p-6"
        role="img"
        aria-label={`Case study visual — placeholder for: ${project.title}`}
      >
        Case study visual — placeholder
      </div>
      <div className="p-7 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="status">{project.status}</Badge>
          <span className="text-[0.8125rem] text-muted-foreground">{project.role}</span>
        </div>
        <h3 className="text-lg font-semibold leading-[1.3]">
          <Link
            to={`/work/${project.slug}`}
            className="text-foreground hover:text-accent no-underline transition-colors duration-150"
            aria-label={`Read case study: ${project.title}`}
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">{project.problem}</p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="accent">{tag}</Badge>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground italic pt-2 border-t border-border mt-auto">
          {project.outcome}
        </p>
        <Link
          to={`/work/${project.slug}`}
          className="text-[0.9375rem] font-medium text-accent hover:text-foreground no-underline transition-colors duration-150"
          aria-label={`Read case study: ${project.title}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          Read case study &rarr;
        </Link>
      </div>
    </article>
  );
}
