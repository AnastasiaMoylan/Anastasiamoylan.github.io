import type { LeadershipPoint } from "../../data/caseStudies";

/**
 * 'How I led' — direction and craft, tagged and side by side.
 *
 * The tag is the whole point of the section. A lead role in the header says the
 * title; showing which calls were direction and which were done by hand is what
 * distinguishes leading a team from managing one, and it is the question a
 * hiring manager is actually asking.
 */
export default function LeadershipGrid({
  points,
  collaborators,
}: {
  points: LeadershipPoint[];
  collaborators?: string[];
}) {
  return (
    <div>
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {points.map(({ kind, title, detail }) => (
          <li
            key={title}
            className="rounded-lg border border-border bg-card px-6 py-5"
          >
            <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-accent">
              {kind}
            </p>
            <h4 className="mt-2 mb-1.5 text-[0.9375rem] font-bold leading-[1.35] text-foreground">
              {title}
            </h4>
            <p className="m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">{detail}</p>
          </li>
        ))}
      </ul>

      {collaborators && collaborators.length > 0 && (
        <p className="mt-6 m-0 max-w-[46rem] text-[0.875rem] leading-[1.65] text-muted-foreground">
          <span className="font-semibold text-foreground">Directing across:</span>{" "}
          {collaborators.join(" · ")}
        </p>
      )}
    </div>
  );
}
