import DiagramPanel from "../primitives/DiagramPanel";

const PANELS = [
  {
    label: "What we were told",
    body: "\u201cThis is one integrated application.\u201d",
  },
  {
    label: "What we learned",
    body: "The architecture and roadmap could not deliver that promise \u2014 and users could not even discover the parts.",
  },
  {
    label: "The reframe",
    body: "A suite of independent products with a shared experience layer \u2014 a story the architecture could keep.",
  },
];

/** The framing evolution, as three panels — the reframe is the strategic act. */
export default function FramingShift() {
  return (
    <DiagramPanel heading="How the framing moved">
      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
        {PANELS.map(({ label, body }, i) => (
          <li
            key={label}
            className={
              i === 2
                ? "rounded-lg border border-accent-tint-light bg-accent-tint-subtle px-5 py-5"
                : "rounded-lg border border-border bg-card px-5 py-5"
            }
          >
            <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tertiary-700">
              {label}
            </p>
            <p className="mt-2.5 m-0 text-[0.9375rem] leading-[1.6] text-foreground">{body}</p>
          </li>
        ))}
      </ol>
    </DiagramPanel>
  );
}
