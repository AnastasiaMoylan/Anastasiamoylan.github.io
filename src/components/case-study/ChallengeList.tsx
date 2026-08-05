import type { Evidence } from "../../data/caseStudies";
import PullQuote from "./primitives/PullQuote";

/**
 * The problem, as scannable statements.
 *
 * Renders only the `finding` half of each evidence pair — what was true before
 * the work. The `response` half belongs to the solution, and renders in the
 * deep dive where findings and the changes they caused sit together.
 *
 * The insight closes the section as a pull-quote, because it is the sentence
 * that turns a list of problems into a position.
 */
export default function ChallengeList({ evidence }: { evidence: Evidence }) {
  const findings = evidence.findings ?? [];

  return (
    <div>
      {evidence.body && (
        <p className="mb-7 max-w-[46rem] text-base leading-[1.7] text-muted-foreground">
          {evidence.body}
        </p>
      )}

      {findings.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {findings.map(({ finding }) => (
            <li key={finding} className="flex max-w-[46rem] gap-3">
              <span className="mt-[0.35rem] shrink-0 text-accent" aria-hidden="true">
                &rarr;
              </span>
              <span className="text-[0.9375rem] leading-[1.65] text-muted-foreground">
                {finding}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <PullQuote>{evidence.insight}</PullQuote>
      </div>
    </div>
  );
}
