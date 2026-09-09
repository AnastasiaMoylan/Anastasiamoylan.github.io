import SectionHeading from "../components/ui/SectionHeading";
import Eyebrow from "../components/ui/Eyebrow";

import { principles, principleCountWord, type Principle } from "../data/philosophy";

const evaluationChecks = [
  {
    title: "Usability and interaction",
    body: "Can the right person complete the real task, including the unhappy path? Feedback is timely, errors are recoverable, and the interaction cost matches the task's importance. Tested with the actual user group, not a convenient proxy.",
  },
  {
    title: "Clarity and hierarchy",
    body: "The eye lands where the decision is. Visual hierarchy guides attention deliberately; anything competing with the primary action has to justify itself. Simplicity is the default — complexity must be earned by the problem, not by the design.",
  },
  {
    title: "Consistency and systems",
    body: "Typography, color, layout, and components draw from one system, aligned to brand guidelines, so users learn the product once. A design system isn't decoration — it's the mechanism that lets consistency and speed coexist, and it's how one team's decision becomes every team's standard.",
  },
  {
    title: "Evidence and iteration",
    body: "Prototypes early, usability testing before conviction hardens, and a willingness to change course when findings demand it. Success is measured against defined criteria set before the work ships — not against how the launch felt.",
  },
  {
    title: "Alignment and value",
    body: "The design serves stated business objectives and delivers something the user personally values — time saved, confidence gained, a task that used to hurt and doesn't anymore. If it only does one of those, it isn't done.",
  },
  {
    title: "Longevity",
    body: "Will this hold up when the team doubles, the data grows, and the original designers leave? Patterns should be maintainable, documented, and extensible — designed for the tenth use case, not just the first.",
  },
];

/** The billing status model from principle 01, as chips — the flow, drawn. */
function StatusFlowStrip() {
  const states = ["Initiated", "In Progress", "Review", "Approved", "Finalized"];
  return (
    <div aria-hidden="true" className="rounded-lg border border-border bg-card px-5 py-4">
      <div className="flex flex-wrap items-center gap-y-2">
        {states.map((state, i) => (
          <span key={state} className="flex items-center">
            {i > 0 && (
              <span className="mx-2 text-accent" aria-hidden="true">
                &rarr;
              </span>
            )}
            <span className="rounded-sm border border-border bg-secondary px-2.5 py-1 text-[0.8125rem] font-medium text-foreground">
              {state}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-3 m-0 text-[0.8125rem] leading-[1.6] text-muted-foreground">
        One shared status vocabulary, with ownership and history attached.
      </p>
    </div>
  );
}

/** The threshold question from principle 04, as three zones on the tint ramp. */
function ThresholdStrip() {
  const zones = [
    { label: "Acts on its own", tint: "bg-accent-tint-subtle" },
    { label: "Recommends and waits", tint: "bg-accent-tint-light" },
    { label: "Stops and asks", tint: "bg-accent-tint-mid" },
  ];
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {zones.map(({ label, tint }) => (
          <div
            key={label}
            className={`${tint} rounded-md border border-accent-tint-light px-4 py-3 text-center`}
          >
            <p className="m-0 text-[0.875rem] font-semibold text-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:justify-between">
        <span>Higher confidence &middot; lower consequence</span>
        <span>Lower confidence &middot; higher consequence</span>
      </div>
    </div>
  );
}

/**
 * Principle 08's thesis as a figure. Not aria-hidden: unlike the other two
 * visuals it isn't a restatement — it IS the thesis line.
 */
function AiStat() {
  return (
    <div>
      <p className="m-0 text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.02em] text-accent tabular-nums">
        ~90%
      </p>
      <p className="mt-2 m-0 max-w-[28rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
        of my work is AI-driven &mdash; with my judgment on every output.
      </p>
    </div>
  );
}

const visuals: Record<NonNullable<Principle["visual"]>, () => React.ReactNode> = {
  statusFlow: StatusFlowStrip,
  thresholds: ThresholdStrip,
  aiStat: AiStat,
};

export default function PhilosophyPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <SectionHeading
          level={1}
          eyebrow="Design philosophy"
          title="The whole system, not just the screen"
          subtitle={`${principleCountWord} principles, each drawn from a real engagement.`}
        />

        {/* The thesis quote leads; the decisions-under-pressure paragraph
            bridges from it into the numbered list. */}
        <div className="mt-12 max-w-[52rem] border-b border-border pb-12">
          <blockquote className="m-0 border-l-[3px] border-primary pl-6 text-[clamp(1.25rem,3vw,1.625rem)] font-medium italic leading-[1.5] text-foreground">
            &ldquo; Good product design is what makes a system understandable: getting the flows
            right, designing the data well, and treating AI as core to the experience, not an
            afterthought. &rdquo;
          </blockquote>
          <p className="mt-8 m-0 text-base leading-[1.75] text-muted-foreground">
            Principles only matter if they help someone make a decision under pressure. Each of
            these is short enough to remember, specific enough to act on, and flexible enough to
            survive new evidence. If a principle here ever stops a better decision, the principle
            loses.
          </p>
        </div>

        <div className="mt-12 flex max-w-[52rem] flex-col">
          {principles.map(({ title, thesis, body, visual }, i) => {
            const Visual = visual ? visuals[visual] : null;
            return (
              <div
                key={title}
                className={[
                  "flex flex-col gap-4",
                  i > 0 ? "mt-12 border-t border-border pt-12" : "",
                ].join(" ")}
              >
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <h2 className="m-0 text-xl font-bold text-foreground">{title}</h2>
                {/* AiStat stands in for 08's thesis, so the line isn't repeated. */}
                {visual === "aiStat" && Visual && <Visual />}
                {thesis && (
                  <p className="m-0 border-l-[3px] border-primary pl-5 text-[1.0625rem] font-medium italic leading-[1.55] text-foreground">
                    {thesis}
                  </p>
                )}
                {body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="m-0 text-base leading-[1.75] text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {visual !== "aiStat" && Visual && (
                  <div className="mt-2">
                    <Visual />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-[52rem] border-t border-border pt-12">
          <h2 className="m-0 text-xl font-bold text-foreground">How I evaluate design</h2>
          <p className="mt-3 m-0 text-base leading-[1.75] text-muted-foreground">
            The principles set direction. These are the checks I run against actual work &mdash;
            mine or anyone&apos;s.
          </p>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {evaluationChecks.map(({ title, body }) => (
              <li key={title} className="rounded-lg border border-border bg-card px-6 py-5">
                <h3 className="m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">
                  {title}
                </h3>
                <p className="mt-2 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
