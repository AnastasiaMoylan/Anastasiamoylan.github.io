import DiagramPanel from "../primitives/DiagramPanel";
import TintPanel, { type TintLevel } from "../primitives/TintPanel";

const bands: {
  title: string;
  tint: TintLevel;
  filled: number;
  confidence: string;
  system: string;
  person: string;
}[] = [
  {
    title: "Act automatically",
    tint: "light",
    filled: 3,
    confidence: "Highest confidence, lowest consequence",
    system:
      "Runs the step and records it — inputs, transformations, generated code, and result all remain inspectable.",
    person: "Not interrupted. Can audit any action afterward and roll it back.",
  },
  {
    title: "Recommend and wait",
    tint: "mid",
    filled: 2,
    confidence: "Moderate confidence, moderate consequence",
    system: "Produces an editable plan and stops — showing its reasoning and the code it would run.",
    person: "Reads the plan, adjusts it, and chooses whether to run it.",
  },
  {
    title: "Stop and escalate",
    tint: "deep",
    filled: 1,
    confidence: "Lowest confidence, highest consequence",
    system: "Blocks the action and preserves the work. Nothing consequential proceeds on its own.",
    person: "Makes the call. Approval is explicit, required, and logged.",
  },
];

function Dots({ filled }: { filled: number }) {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={[
            "h-2 w-2 rounded-full border border-accent",
            i < filled ? "bg-accent" : "bg-transparent",
          ].join(" ")}
        />
      ))}
    </span>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="m-0 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-accent">{label}</p>
      <p className="mt-1.5 m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">{children}</p>
    </div>
  );
}

export default function ConfidenceThresholds() {
  return (
    <DiagramPanel
      heading="Where the system acts, and where a person decides"
      subheading="Confidence thresholds set with ML engineering as product boundaries, not model defaults."
      quote="Every boundary is an interaction-design decision with a number attached — defined with ML engineering, not inherited from the model."
    >
      <div
        className="h-2.5 w-full rounded-full"
        style={{ background: "linear-gradient(to right, var(--accent-tint-light), var(--accent))" }}
        aria-hidden="true"
      />
      <div className="mt-3 flex flex-col gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:flex-row sm:justify-between">
        <span>Higher confidence · Lower consequence</span>
        <span>Lower confidence · Higher consequence</span>
      </div>

      <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
        {bands.map((b) => (
          <li key={b.title}>
            <TintPanel
              title={b.title}
              tint={b.tint}
              headerRight={<Dots filled={b.filled} />}
            >
              <p className="sr-only">{b.confidence}.</p>
              <div className="flex flex-col gap-4">
                <Block label="The system">{b.system}</Block>
                <div className="border-t border-border" />
                <Block label="The person">{b.person}</Block>
              </div>
            </TintPanel>
          </li>
        ))}
      </ul>
    </DiagramPanel>
  );
}
