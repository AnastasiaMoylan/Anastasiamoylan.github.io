import Eyebrow from "../ui/Eyebrow";

/**
 * The hero's supporting figure: the governance pattern the case studies share,
 * drawn rather than claimed. The point it makes is the highlighted step — human
 * review is a gate, not a courtesy — so that step carries the only accent fill
 * besides the AI hop feeding it.
 *
 * Built as an ordered list with a rail behind it rather than absolute
 * positioning, so it reflows on narrow screens and reads in order to a screen
 * reader.
 */
const steps = [
  {
    n: "01",
    title: "Signal",
    body: "Model score, anomaly flag, or a failed automation",
    tone: "plain" as const,
  },
  {
    n: "02",
    title: "AI draft",
    body: "Copilot proposes the action and shows the inputs it used",
    tone: "ai" as const,
  },
  {
    n: "03",
    title: "Human review",
    body: "Required. Nothing reaches a customer or a ledger unreviewed.",
    tone: "gate" as const,
  },
  {
    n: "04",
    title: "Action",
    body: "Message sent, journal entry posted, billing package released",
    tone: "plain" as const,
  },
  {
    n: "05",
    title: "Audit log",
    body: "Every step replayable, every input traceable to its source",
    tone: "plain" as const,
  },
];

/* Each tone owns its own background — the outlined markers need an opaque fill
   to mask the rail running behind them. */
const marker = {
  plain: "bg-card border-2 border-tertiary-500 text-tertiary-700",
  ai: "bg-accent text-accent-foreground",
  gate: "bg-accent text-accent-foreground",
};

export default function GovernanceChain() {
  return (
    <figure className="m-0 bg-card border border-tertiary-100 rounded-lg p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <Eyebrow>Governance chain</Eyebrow>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
          Pattern / 001
        </span>
      </div>

      <div className="mt-4 border-t border-tertiary-100" />

      <ol className="relative list-none m-0 mt-6 p-0 flex flex-col gap-5">
        {/* Rail, inset to start and stop at the first and last marker centres. */}
        <span
          aria-hidden="true"
          className="absolute left-[10px] top-[11px] bottom-[11px] w-px bg-tertiary-100"
        />
        {steps.map(({ n, title, body, tone }) => (
          <li
            key={n}
            className={[
              "relative pl-9",
              tone === "gate"
                ? "-mx-3 -my-1 rounded-md border border-accent/50 bg-accent-tint-subtle px-3 py-2.5 pl-9"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span
              aria-hidden="true"
              className={[
                "absolute top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full font-mono text-[0.6875rem] font-medium",
                tone === "gate" ? "left-3 top-2.5" : "left-0",
                marker[tone],
              ].join(" ")}
            >
              {n}
            </span>
            <p
              className={[
                "m-0 font-display text-[0.84375rem] font-bold uppercase tracking-[0.03em]",
                tone === "gate" ? "text-accent" : "text-foreground",
              ].join(" ")}
            >
              {title}
            </p>
            <p
              className={[
                "m-0 mt-1 text-[0.78125rem] leading-[1.5]",
                tone === "gate" ? "text-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-tertiary-100" />

      <figcaption className="mt-4 font-mono text-[0.6875rem] leading-[1.6] text-muted-foreground">
        Extracted across Finance Cloud, Connected Customer Journey, and the
        Auditable Billing Workflow.
      </figcaption>
    </figure>
  );
}
