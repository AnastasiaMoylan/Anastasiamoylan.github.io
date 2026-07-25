import DiagramPanel from "../primitives/DiagramPanel";
import AccentRule from "../primitives/AccentRule";

// Bar heights are illustrative, not proportional: at true scale the 10-user bar
// would be ~1px. The visually hidden table below carries the real figures so the
// chart cannot mislead a screen reader or anyone reading the text alternative.
const stages = [
  { value: "10", label: "Pilot", heightPx: 60, tint: "bg-accent-tint-light" },
  { value: "300", label: "Scaled rollout", heightPx: 150, tint: "bg-accent-tint-mid" },
  { value: "1,000+", label: "Enterprise — planned", heightPx: 230, tint: "bg-accent" },
];

const columns = [
  {
    eyebrow: "Pilot",
    title: "Build the governed model",
    body: "Environment separation, promotion gates, and human review are established. At ten users, ambiguity is tolerable — someone can still explain a number by hand.",
  },
  {
    eyebrow: "Scaled rollout",
    title: "Make governance legible",
    body: "Every control gets a visible surface: environment labels, promotion checklists, audit entries. Failure and low confidence become designed states, not error toasts.",
  },
  {
    eyebrow: "Enterprise — planned",
    title: "The interface explains itself",
    body: "No one is left to interpret. Proactive, role-aware anomaly detection and standardized patterns carry the trust that people carried by hand at pilot scale.",
  },
];

export default function ScalingArc() {
  return (
    <DiagramPanel
      heading="From ten pilot users to enterprise scale"
      subheading="What the design had to carry as Finance Cloud grew from zero to one."
      quote="Everything that worked at pilot scale because someone could explain it had to become something the interface explained by itself."
    >
      <table className="sr-only">
        <caption>Finance Cloud adoption by stage</caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Users</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden="true" className="relative">
        <div className="flex items-end justify-around gap-4 sm:gap-10" style={{ height: 270 }}>
          {stages.map((s) => (
            <div key={s.label} className="flex w-full max-w-[130px] flex-col items-center justify-end">
              <span className="mb-3 font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none text-accent">
                {s.value}
              </span>
              <div className={["w-full rounded-t-[2px]", s.tint].join(" ")} style={{ height: s.heightPx }} />
            </div>
          ))}
        </div>
        {/* Trend line joining the top of each bar. */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 300 270"
          preserveAspectRatio="none"
          role="presentation"
        >
          <polyline
            points={stages.map((s, i) => `${50 + i * 100},${270 - s.heightPx}`).join(" ")}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 300 270"
          preserveAspectRatio="none"
          role="presentation"
        >
          {stages.map((s, i) => (
            <circle key={s.label} cx={50 + i * 100} cy={270 - s.heightPx} r="3" fill="var(--accent)" />
          ))}
        </svg>
        <div className="h-px w-full bg-border" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {columns.map((c) => (
          <div key={c.eyebrow}>
            <AccentRule />
            <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent">
              {c.eyebrow}
            </p>
            <p className="mt-2 m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">{c.title}</p>
            <p className="mt-2 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </DiagramPanel>
  );
}
