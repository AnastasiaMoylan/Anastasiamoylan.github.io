import DiagramPanel from "../primitives/DiagramPanel";
import TintPanel from "../primitives/TintPanel";
import ChecklistRow from "../primitives/ChecklistRow";
import { ArrowConnector } from "../primitives/Connector";

const sandboxItems = ["Python analysis", "Data transformations", "Datasets", "AI-assisted plans"];

const gateItems = [
  { label: "Financial controls satisfied", satisfied: true },
  { label: "Required approvals collected", satisfied: true },
  { label: "Data access authorized", satisfied: true },
  { label: "Environment permissions incomplete", satisfied: false },
];

const productionItems = ["Live workflows", "Full audit trail", "Continuous monitoring"];

function FootNote({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-auto border-t border-border pt-4" />
      <p className="m-0 text-[0.75rem] leading-[1.55] text-muted-foreground">{children}</p>
    </>
  );
}

export default function PromotionGate() {
  const unmet = gateItems.filter((i) => !i.satisfied).length;

  return (
    <DiagramPanel
      heading="Promotion is a gated checklist, not a publish button"
      subheading="Experimentation stays separate from production, and a blocked promotion shows exactly what is unmet."
      quote="Instead of a one-click publish that hides which controls were skipped."
    >
      <div className="flex flex-col items-stretch gap-0 md:flex-row md:items-center">
        <div className="flex-1">
          <TintPanel eyebrow="Experimentation" title="Sandbox">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {sandboxItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-foreground">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <FootNote>Test freely. No path to silently affect financial controls.</FootNote>
          </TintPanel>
        </div>

        <ArrowConnector />

        <div className="flex-1 md:flex-[1.15]">
          <TintPanel eyebrow="A reviewable event" title="Promotion gate" emphasized>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {gateItems.map((item) => (
                <ChecklistRow key={item.label} label={item.label} satisfied={item.satisfied} />
              ))}
            </ul>
            <p className="mt-5 m-0 rounded-md border-2 border-accent bg-accent-tint-subtle px-4 py-3 text-center text-[0.75rem] font-bold uppercase tracking-[0.08em] text-accent">
              Promotion blocked · {unmet} requirement unmet
            </p>
            <p className="mt-3 m-0 text-[0.75rem] leading-[1.55] text-muted-foreground">
              Resolve the unmet requirement, then promote — nothing is skipped silently.
            </p>
          </TintPanel>
        </div>

        <ArrowConnector blocked />

        <div className="flex-1">
          <TintPanel eyebrow="Governed · Audited · Live" title="Production">
            <p className="m-0 flex items-center gap-2 text-[0.875rem] font-bold text-accent">
              <span aria-hidden="true">🔒</span> Awaiting promotion
            </p>
            <ul className="mt-4 m-0 flex list-none flex-col gap-2 p-0">
              {productionItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[0.875rem] leading-[1.5] text-muted-foreground/70"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                  {item}
                  <span className="sr-only"> — inactive until promotion completes</span>
                </li>
              ))}
            </ul>
            <FootNote>Nothing reaches production until every gate item passes.</FootNote>
          </TintPanel>
        </div>
      </div>
    </DiagramPanel>
  );
}
