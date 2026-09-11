import type { OverviewLines } from "../../data/caseStudyTypes";

/**
 * The overview as the framework's three lines: challenge, result, approach.
 * A recruiter should be able to stop here. Plates layout (2026-09-11): a
 * hairline list in the prose column, maroon mono labels, the result line in
 * medium weight so the eye lands on what changed before it reads how.
 */
const LINES: { key: keyof OverviewLines; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "result", label: "Result" },
  { key: "approach", label: "Approach" },
];

export default function OverviewSection({ overview }: { overview: OverviewLines }) {
  return (
    <div className="cs-sub">
      <dl className="cs-list">
        {LINES.map(({ key, label }) => (
          <div key={key}>
            <dt className="cs-label text-accent">{label}</dt>
            <dd className={["cs-body", key === "result" ? "font-medium" : ""].join(" ")}>
              {overview[key]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
