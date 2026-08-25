import DiagramPanel from "../primitives/DiagramPanel";
import TintPanel from "../primitives/TintPanel";
import { ArrowConnector } from "../primitives/Connector";
import FootNote from "../primitives/FootNote";

const planSteps = [
  "Pull ledger balances for the period",
  "Apply the variance threshold",
  "Flag accounts outside range",
  "Draft the variance commentary",
];

const runRecords = [
  "Inputs captured",
  "Transformations logged",
  "Generated code stored",
  "Result linked to source",
];

export default function CopilotPlan() {
  return (
    <DiagramPanel
      heading="The copilot produces a plan, not an answer"
      subheading="Assistance opens inside the task, with the data already in context."
      quote="A plan you can read and change is a different product from an answer you have to trust."
    >
      <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-center">
        <div className="flex-1">
          <TintPanel eyebrow="Scoped to the task" title="Inside the work">
            <p className="m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">
              Assistance opens within a specific report, forecast, or close task. The relevant period,
              entity, and data are already in context.
            </p>
            <FootNote>Nothing has to be re-explained to the system.</FootNote>
          </TintPanel>
        </div>

        <ArrowConnector />

        <div className="flex-1 md:flex-[1.15]">
          <TintPanel eyebrow="Reviewable" title="Editable plan" emphasized>
            <ol className="m-0 flex list-none flex-col gap-1 p-0">
              {planSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start justify-between gap-3 rounded-md px-2.5 py-2 odd:bg-accent-tint-subtle/60"
                >
                  <span className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-foreground">
                    <span className="text-[0.75rem] font-semibold text-accent" aria-hidden="true">
                      {i + 1}
                    </span>
                    {step}
                  </span>
                  <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-accent">
                    Edit
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 m-0 flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-accent">
              View generated code
              <span aria-hidden="true">+</span>
            </p>
            <p className="mt-3 m-0 text-[0.75rem] leading-[1.55] text-muted-foreground">
              Read it, change any step, or discard it. Nothing runs until you say so.
            </p>
          </TintPanel>
        </div>

        <ArrowConnector />

        <div className="flex-1">
          <TintPanel eyebrow="Recorded" title="Run">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {runRecords.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-foreground">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <FootNote>Every run stays inspectable afterward and can be rolled back.</FootNote>
          </TintPanel>
        </div>
      </div>
    </DiagramPanel>
  );
}
