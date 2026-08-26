import DiagramPanel from "../primitives/DiagramPanel";

const AREAS = [
  "Data exploration",
  "AI-assisted analysis",
  "Workflow automation",
  "AI agents",
  "Audit tooling",
  "Access management",
];

/**
 * Before/after system map: six disconnected products vs. the same six under
 * one experience layer. The delta is the layer, not new products — which is
 * exactly the claim the study makes.
 */
export default function SuiteMap() {
  return (
    <DiagramPanel
      heading="Six products, one experience layer"
      subheading="What changed is not the products — it is the layer that makes them one suite."
      quote="Same six product areas on both sides. The delta is the shared experience layer: one front door, one taxonomy, shared patterns."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        {/* Before: separate repos, separate app contexts, a promised unity. */}
        <div className="flex flex-col rounded-lg border border-dashed border-border bg-background px-5 py-5">
          <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Before &middot; described as &ldquo;one application&rdquo;
          </p>
          <ul className="mt-4 m-0 grid list-none grid-cols-2 gap-2.5 p-0">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-md border border-dashed border-border bg-card px-3 py-2.5 text-[0.75rem] leading-[1.4] text-muted-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-0 text-[0.75rem] leading-[1.55] text-muted-foreground">
            Separate repositories, separate app contexts, no unified entry point &mdash; and an
            integration promise the architecture could not keep.
          </p>
        </div>

        <div className="flex items-center justify-center text-accent" aria-hidden="true">
          <span className="text-[1.5rem]">&rarr;</span>
        </div>

        {/* After: the same six, under the shared layer. */}
        <div className="flex flex-col rounded-lg border border-border bg-card px-5 py-5">
          <p className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tertiary-700">
            After &middot; a suite with a shared experience layer
          </p>
          <div className="mt-4 rounded-md bg-accent-tint-subtle border border-accent-tint-light px-3 py-2.5">
            <p className="m-0 text-[0.75rem] font-semibold leading-[1.4] text-accent-text">
              One front door &middot; shared taxonomy &middot; shared patterns
            </p>
          </div>
          <div className="mx-3 h-3 border-x border-b border-border" aria-hidden="true" />
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-md border border-border bg-background px-3 py-2.5 text-[0.75rem] leading-[1.4] text-foreground"
              >
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-0 text-[0.75rem] leading-[1.55] text-muted-foreground">
            Products still ship independently &mdash; discovery, language, and patterns are what
            they now share.
          </p>
        </div>
      </div>
    </DiagramPanel>
  );
}
