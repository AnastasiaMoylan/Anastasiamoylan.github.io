import SectionHeading from "../components/ui/SectionHeading";
import Eyebrow from "../components/ui/Eyebrow";
import { figures } from "../data/figures";
import {
  principles,
  principleCountWord,
  philosophyThesis,
  philosophyBridge,
  evaluationIntro,
  evaluationChecks,
  type Principle,
} from "../data/philosophy";

/**
 * The philosophy page. Every sentence comes from `data/philosophy.ts`; the
 * three small figures below are the site's diagram language restating a
 * principle, which is why two of them are aria-hidden.
 */

/** The billing status model from principle 01, as chips — the flow, drawn. */
function StatusFlowStrip() {
  // Five states, matching the principle's own body copy on this page. The
  // billing study publishes six (`figures.billingStatusStates`); whether the
  // page copy should say six too is the owner's call, not a code fix.
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
        {figures.aiDrivenShare}
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
            &ldquo; {philosophyThesis} &rdquo;
          </blockquote>
          <p className="mt-8 m-0 text-base leading-[1.75] text-muted-foreground">{philosophyBridge}</p>
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
          <p className="mt-3 m-0 text-base leading-[1.75] text-muted-foreground">{evaluationIntro}</p>
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
