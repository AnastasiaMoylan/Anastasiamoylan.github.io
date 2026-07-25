import DiagramPanel from "../primitives/DiagramPanel";
import StepCard from "../primitives/StepCard";
import { ArrowConnector, FeedbackLoop } from "../primitives/Connector";

const stages = [
  { title: "Problem framing", description: "Define the work" },
  { title: "Data discovery & ingestion", description: "Bring in trusted data" },
  { title: "Finance sandbox", description: "Experiment safely" },
  { title: "User experiences", description: "Ship the workflow" },
  { title: "Feedback & iteration", description: "Measure and learn" },
];

const capabilities = [
  {
    title: "Agentic workflows",
    body: "Carry multi-step work, with pause, resume, and rollback for consequential runs.",
  },
  {
    title: "Data products",
    body: "Shared, governed datasets with visible lineage back to every source.",
  },
  {
    title: "Command center",
    body: "Monitor runs, anomalies, and status across the whole platform.",
  },
];

export default function GovernedPipeline() {
  return (
    <DiagramPanel
      heading="One governed pipeline, from problem to production"
      subheading="Governance, risk, and compliance sit over every stage, agentic workflow, and data product."
      quote="Governance people cannot see is not governance they will approve."
    >
      <div className="flex flex-col gap-3 rounded-lg bg-accent px-6 py-4 text-accent-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-[0.8125rem] font-bold uppercase tracking-[0.1em]">
          Governance <span aria-hidden="true">·</span> Risk <span aria-hidden="true">·</span> Compliance
        </p>
        <p className="m-0 text-[0.75rem] leading-[1.5] text-accent-foreground/85">
          Environment labels · promotion gates · audit trail · human review
        </p>
      </div>

      <ol className="mt-10 flex list-none flex-col items-stretch gap-0 p-0 md:flex-row">
        {stages.map((s, i) => (
          <li key={s.title} className="flex flex-1 flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <StepCard number={i + 1} title={s.title} description={s.description} />
            </div>
            {i < stages.length - 1 && <ArrowConnector />}
          </li>
        ))}
      </ol>

      <FeedbackLoop label="Continuous feedback loop" />
      <p className="mt-4 text-center text-[0.8125rem] leading-[1.6] text-muted-foreground md:mt-2">
        Feedback from step 5 returns to problem framing, so the pipeline runs as a continuous loop
        rather than a one-way sequence.
      </p>

      <div className="mt-12">
        <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent">
          Shared capabilities, under the same governance
        </p>
        <ul className="mt-5 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.title} className="rounded-lg border border-border bg-card px-5 py-5">
              <p className="m-0 text-base font-bold leading-[1.3] text-foreground">{c.title}</p>
              <p className="mt-2 m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </DiagramPanel>
  );
}
