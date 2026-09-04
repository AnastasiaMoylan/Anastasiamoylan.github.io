import type { Evidence } from "../../data/caseStudies";

/**
 * What the research found, and the change each finding caused.
 *
 * The method paragraph leads and each finding sits with its response. The
 * insight used to close this section; since 2026-09-04 it renders in Problem,
 * where it reframes the problem before the reader reaches the solution, and
 * this section is the proof layer behind that reframe.
 */
export default function ChallengeList({ evidence }: { evidence: Evidence }) {
  const findings = evidence.findings ?? [];

  return (
    <div>
      {evidence.body && (
        <p className="m-0 mb-8 measure text-base leading-[1.7] text-muted-foreground">
          {evidence.body}
        </p>
      )}

      {findings.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-5 p-0">
          {findings.map(({ finding, response }) => (
            <li key={finding} className="measure">
              <p className="m-0 text-[0.9375rem] font-semibold leading-[1.55] text-foreground">
                {finding}
              </p>
              <p className="mt-1.5 m-0 flex gap-2.5 text-[0.875rem] leading-[1.65] text-muted-foreground">
                <span className="shrink-0 text-accent" aria-hidden="true">
                  &rarr;
                </span>
                {response}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
