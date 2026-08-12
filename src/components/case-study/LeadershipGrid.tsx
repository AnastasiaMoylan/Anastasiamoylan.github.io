import type { LeadershipPoint } from "../../data/caseStudies";

/**
 * 'How I led' — direction and craft, side by side.
 *
 * The `kind` split still orders the cards (direction first, hands-on second),
 * but it isn't labelled: the titles carry it, and a row of uppercase tags above
 * every card competed with them for the first read.
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
        {points.map(({ title, detail }) => (
          <li
            key={title}
            className="rounded-lg border border-border bg-card px-6 py-5"
          >
            <h4 className="mt-0 mb-1.5 text-[0.9375rem] font-bold leading-[1.35] text-foreground">
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
