import type { OverviewLines } from "../../data/caseStudies";

/**
 * The overview as the framework's three lines: challenge, result, approach.
 *
 * A recruiter should be able to stop here. The result line is the one that
 * has to survive being read alone, so it is set in foreground text while the
 * other two stay muted — the eye lands on what changed before it reads how.
 */
const LINES: { key: keyof OverviewLines; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "result", label: "Result" },
  { key: "approach", label: "Approach" },
];

export default function OverviewSection({ overview }: { overview: OverviewLines }) {
  return (
    <dl className="m-0 flex measure flex-col gap-5">
      {LINES.map(({ key, label }) => (
        <div key={key}>
          <dt className="m-0 font-mono text-label font-medium uppercase tracking-[0.12em] text-tertiary-700">
            {label}
          </dt>
          <dd
            className={[
              "mt-1.5 m-0 text-body leading-[1.65]",
              key === "result" ? "font-medium text-foreground" : "text-muted-foreground",
            ].join(" ")}
          >
            {overview[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
