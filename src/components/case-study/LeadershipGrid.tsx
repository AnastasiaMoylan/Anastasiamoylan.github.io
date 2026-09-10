import type { LeadershipPoint } from "../../data/caseStudies";

/**
 * 'How I led' — one card per point, labelled by discipline.
 *
 * The eyebrow is the point's subcategory (Product strategy, Design, Research,
 * Team leadership): four distinct labels that show the spread of the role,
 * unlike the earlier Direction/Hands-on pair that repeated two generic words
 * across every card.
 */
export default function LeadershipGrid({ points }: { points: LeadershipPoint[] }) {
  return (
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
  );
}
