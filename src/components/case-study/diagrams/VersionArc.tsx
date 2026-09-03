import DiagramPanel from "../primitives/DiagramPanel";
import AccentRule from "../primitives/AccentRule";

/**
 * Three product versions, each redirected by research.
 *
 * Replaced ScalingArc on 2026-09-03. That diagram charted adoption as
 * 10 -> 300 -> 1,000+ users, and the 300 has no provenance in the project
 * record. The version history does: it is Anastasia's own account from the
 * scorecard session (v2 §2, §4.4), so this figure re-keys the same slot to
 * what the research actually changed.
 */
const versions = [
  {
    eyebrow: "V1",
    title: "Assumed analysts could work in code",
    assumed:
      "Finance users would read and adjust generated Python. No agentic integration, no direct data exploration.",
    learned:
      "A hackathon put the platform in front of 40+ users who ran 800+ business analyses. They could not and would not work in code; they needed to explore data directly and hand multi-step work to an agent.",
    status: "Pivoted",
  },
  {
    eyebrow: "V2",
    title: "Rebuilt around data products",
    assumed:
      "Data-product onboarding, role-based access, AI integration, and limited orchestration. The client approved the approach.",
    learned:
      "Two constraints stopped it: a rich-metadata layer that did not exist, and orchestration too deterministic for how finance work actually branches.",
    status: "Blocked",
  },
  {
    eyebrow: "V3",
    title: "Set by the research",
    assumed:
      "A data explorer, agentic workflow creation, and tool socialization, with LangGraph as the orchestrator behind the front end.",
    learned:
      "In testing. The research program that redirected V1 and V2 now directs an eight-figure modernization program.",
    status: "In testing",
  },
];

export default function VersionArc() {
  return (
    <DiagramPanel
      heading="Three versions, each redirected by research"
      subheading="What each version assumed, what the research showed, and where it landed."
      quote="The volume is what made the finding unarguable: 800+ analyses is sustained use, not a demo."
    >
      <ol className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-10">
        {versions.map((v) => (
          <li key={v.eyebrow}>
            <AccentRule />
            <div className="flex items-baseline justify-between gap-3">
              <p className="m-0 font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-none text-accent">
                {v.eyebrow}
              </p>
              <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent">
                {v.status}
              </p>
            </div>
            <p className="mt-3 m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">{v.title}</p>
            <p className="mt-3 m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Assumed
            </p>
            <p className="mt-1 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">{v.assumed}</p>
            <p className="mt-3 m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Research showed
            </p>
            <p className="mt-1 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">{v.learned}</p>
          </li>
        ))}
      </ol>
    </DiagramPanel>
  );
}
