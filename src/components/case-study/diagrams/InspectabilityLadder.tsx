import DiagramPanel from "../primitives/DiagramPanel";

const layers = [
  { layer: "Preview", description: "See the result before it is committed" },
  { layer: "Editable plan", description: "The steps that will run, in order, changeable" },
  { layer: "Generated code", description: "The actual code the plan produced" },
  { layer: "Evidence", description: "The inputs and intermediate values behind the output" },
  { layer: "Logs", description: "What ran, when, and with what result" },
  { layer: "Lineage", description: "Which datasets and sources the values came from" },
  { layer: "Versions", description: "What changed between runs" },
  { layer: "Human approvals", description: "Who approved, and when" },
  { layer: "Audit history", description: "The permanent record for anyone reviewing later" },
];

export default function InspectabilityLadder() {
  return (
    <DiagramPanel
      heading="Every number traces back"
      subheading={`${layers.length} layers between an AI output and the data it came from.`}
      quote="A number without provenance cannot be approved, only re-derived by hand."
    >
      <ol className="m-0 flex list-none flex-col p-0">
        {layers.map(({ layer, description }, i) => {
          // Tint deepens with depth so the base reads as bedrock.
          const depth = i / (layers.length - 1);
          return (
            <li key={layer} className="relative flex gap-5 pb-4 last:pb-0">
              <div className="flex flex-col items-center" aria-hidden="true">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--accent)", opacity: 0.35 + depth * 0.65 }}
                />
                {i < layers.length - 1 && <span className="w-px flex-1 bg-accent/30" />}
              </div>
              <div className="flex-1 pb-1">
                <p className="m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">{layer}</p>
                <p className="mt-0.5 m-0 text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </DiagramPanel>
  );
}
