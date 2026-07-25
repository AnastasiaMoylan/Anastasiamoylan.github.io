import DiagramPanel from "../primitives/DiagramPanel";
import StepCard from "../primitives/StepCard";
import { ArrowConnector } from "../primitives/Connector";

const stages = [
  { title: "Detect", description: "A figure falls outside its expected range for the period." },
  {
    title: "Attach context",
    description: "The variance, its drivers, and the affected records are gathered with the alert.",
  },
  {
    title: "Route by role",
    description: "The alert goes to the role accountable for that area, at the altitude they own.",
  },
  { title: "Resolve", description: "Drill into the source data, or dismiss with a recorded reason." },
];

const roles = [
  { role: "Accountant", altitude: "Journal entry level" },
  { role: "Controller", altitude: "Account level" },
  { role: "Finance leader", altitude: "Entity level" },
];

export default function AnomalyRouting() {
  return (
    <DiagramPanel
      heading="Anomalies reach the person accountable, before close"
      subheading="Detection is routed by role, with the variance and its drivers already attached."
      quote="An anomaly surfaced too late is indistinguishable from one never surfaced."
    >
      <ol className="flex list-none flex-col items-stretch gap-0 p-0 md:flex-row">
        {stages.map((s, i) => (
          <li key={s.title} className="flex flex-1 flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <StepCard number={i + 1} title={s.title} description={s.description} />
            </div>
            {i < stages.length - 1 && <ArrowConnector />}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
          {roles.map((r) => (
            <li
              key={r.role}
              className="rounded-lg border border-border bg-accent-tint-subtle px-4 py-3 text-center"
            >
              <p className="m-0 text-[0.875rem] font-bold text-foreground">{r.role}</p>
              <p className="mt-1 m-0 text-[0.75rem] leading-[1.5] text-muted-foreground">{r.altitude}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[0.8125rem] leading-[1.6] text-muted-foreground">
          Each role sees the anomaly at the altitude they are accountable for.
        </p>
      </div>

      <div className="mt-10 rounded-lg bg-accent-tint-subtle px-6 py-5">
        <p className="m-0 text-[0.875rem] leading-[1.65] text-foreground">
          Not a broadcast alert to everyone. Not a report someone has to remember to go and read.
        </p>
      </div>
    </DiagramPanel>
  );
}
