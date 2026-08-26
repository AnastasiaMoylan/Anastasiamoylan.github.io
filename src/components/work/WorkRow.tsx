import { Link } from "react-router";
import type { Project } from "../../data/projects";

/**
 * One case study as a numbered editorial row (from the Mobbin research:
 * ordinal · title · outcome sentence · role). The outcome sentence does the
 * selling; imagery belongs inside the study, where it has context.
 */
export default function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative border-t border-border py-8 last:border-b">
      <Link
        to={`/work/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read case study: ${project.title}`}
      />

      <div className="grid grid-cols-[2.75rem_1fr] gap-x-5 gap-y-2 sm:grid-cols-[2.75rem_1fr_auto] sm:items-baseline">
        <span
          className="font-mono text-[0.75rem] font-medium text-tertiary-700 pt-1"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="m-0 font-display text-[clamp(1.25rem,2.5vw,1.625rem)] font-bold leading-[1.2] tracking-[-0.02em] text-foreground transition-colors duration-150 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-2 m-0 max-w-[38rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
            {project.tagline}
          </p>
          <p className="mt-3 m-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-tertiary-700">
            {project.role}
            <span className="mx-2 text-border" aria-hidden="true">·</span>
            <span className="normal-case tracking-[0.03em] text-muted-foreground">
              {project.tags.slice(0, 2).join(" · ")}
            </span>
          </p>
        </div>

        <span
          className="hidden sm:block text-[1.0625rem] text-accent transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </article>
  );
}
