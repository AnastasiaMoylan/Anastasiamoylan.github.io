import SectionHeading from "../components/ui/SectionHeading";
import Eyebrow from "../components/ui/Eyebrow";

const skills = [
  "End-to-end journey mapping",
  "AI interaction and trust design",
  "Workflow and systems design",
  "Design systems",
  "Research and usability testing",
  "Workshop facilitation",
  "Prototyping in code",
];

/**
 * Copy provided by Anastasia (2026-08-13 rewrite). Each principle: a short
 * thesis line rendered as a pull-quote, then body paragraphs. `visual` keys a
 * small coded figure rendered after the body — a restatement of the copy in
 * the site's diagram language, not new information, so the figures stay
 * aria-hidden. Principle 08 carries its thesis as the big stat instead of a
 * pull-quote, so the line isn't said twice.
 */
interface Principle {
  title: string;
  thesis?: string;
  body: string[];
  visual?: "statusFlow" | "thresholds" | "aiStat";
}

const principles: Principle[] = [
  {
    title: "Design flows, not screens",
    thesis: "A screen is a moment. The flow is the product.",
    body: [
      "Most product failures don't happen on a screen — they happen between screens: at a handoff, a failed retrieval, a permission gap, a status nobody updated. So I map the whole journey first: every role, every state, and every path that breaks. Screens come last, after the flow proves it can survive contact with reality.",
      "On an enterprise billing workflow, the most valuable design work wasn't a single interface — it was the status model. Making Initiated → In Progress → Review → Approved → Finalized visible, with ownership and history attached, did more for the team than any screen refinement could have.",
    ],
    visual: "statusFlow",
  },
  {
    title: "Design through implementation",
    thesis:
      "The design isn't done when the file is done. It's done when what ships matches what was designed.",
    body: [
      "I stay engaged through build: reviewing feasibility with engineers mid-implementation, pressure-testing decisions by prototyping in code, and adjusting the design when a technical constraint proves a flow wrong. A beautiful spec that engineering can't build — or builds differently — is a design that failed quietly.",
      "This is also why I build in code myself. A React prototype exposes problems a Figma file hides: real data lengths, real loading time, real state transitions. Building the thing is the fastest honest critique of the thing.",
    ],
  },
  {
    title: "Design holistically, not in isolation",
    thesis:
      "No decision is local. Every component lives inside a system of data, roles, governance, and adjacent products.",
    body: [
      "A dropdown is never just a dropdown — it's a data model, a permission question, and a precedent the next three teams will copy. Before I change anything, I ask what it touches: which roles see it, what data feeds it, what governance applies to it, and what breaks downstream if it changes.",
      "This is how invisible structure becomes visible. Organizations feel chaotic when the system connecting their tools and teams exists only in people's heads. Half my job is drawing that system so everyone can argue with the same picture.",
    ],
  },
  {
    title: "Design for the moment AI is wrong",
    thesis:
      "When the system is uncertain, show it. When the action is consequential, make it reversible.",
    body: [
      "AI earns trust at exactly the moments it's least reliable. So uncertainty, partial output, and failure are first-class states in my work — not error toasts. Low-confidence output gets a visible indicator and an explanation. Failed operations preserve the user's work and offer a retry path. Consequential multi-step workflows get pause, resume, and rollback.",
      "The threshold question — where the system acts on its own, where it recommends and waits, where it must stop and ask — is a product decision made deliberately with ML engineers, not a tuning detail inherited from the model. A number without provenance can't be approved; it can only be re-derived by hand. Governance people can't see isn't governance they'll approve.",
    ],
    visual: "thresholds",
  },
  {
    title: "Critique the decision, not the deliverable",
    thesis:
      "Feedback exists to help someone choose. If critique doesn't move a decision, it's just opinion.",
    body: [
      "Before I give or take feedback, I name the decision on the table: are we choosing a direction, validating a flow, or polishing for release? Critique aimed at the wrong altitude wastes everyone's time — pixel notes during direction-setting, direction debates during final polish.",
      "The same rule governs how I receive it. “I don't like it” isn't actionable; “a reviewer can't tell who owns this package” is. I push every conversation toward the second kind.",
    ],
  },
  {
    title: "Teach people how to decide, not what to produce",
    thesis: "Output can be corrected in a review. Judgment compounds for a career.",
    body: [
      "When I mentor, the goal is never a better artifact this week — it's a designer who makes better calls next quarter without me in the room. That means explaining the why behind every note, showing the rejected alternatives alongside the chosen one, and handing over decisions slightly before someone feels ready for them.",
      "The test of good coaching is absence: if the work only holds up when I'm reviewing it, I taught production, not judgment.",
    ],
  },
  {
    title: "Continuous improvement, driven by evidence",
    thesis: "Looking good is not the same as being right. Only research settles it.",
    body: [
      "I've thrown out navigation I liked because it tested poorly. I've killed a feature after a POC showed it didn't translate into adoption. I've replaced a data display that fit the design system perfectly with a format that testing proved finance users could actually read. Every one of those stung, and every one was correct.",
      "Taste gets you to a strong hypothesis. Evidence decides. When facts change, the design changes — a principle that can't bend to new evidence isn't a principle, it's a superstition.",
    ],
  },
  {
    title: "Use AI the way I ask users to trust it",
    body: [
      "I design AI products, and I practice what I design: AI runs through my ideation, research synthesis, product strategy, prototyping, and testing. But the same rules I build into interfaces apply to my own process — I review everything, I keep provenance, and nothing consequential ships without a human decision behind it. Using AI heavily and reviewing it rigorously aren't in tension. They're the same discipline.",
    ],
    visual: "aiStat",
  },
];

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
          subtitle="Eight proven principles I have verified through real engagements, consistently achieving outstanding results."
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

        <div className="max-w-[52rem] mt-14 pt-12 border-t border-border">
          <Eyebrow className="mb-5">Skills, in practice</Eyebrow>
          <ul className="list-none p-0 m-0 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="text-sm text-muted-foreground bg-card border border-border rounded-sm px-3 py-1.5"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
