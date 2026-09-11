import type { Scope } from "../../data/caseStudyTypes";

/**
 * What I owned end to end, who I led, where I influenced beyond my lane, and
 * who the work was built with: four labelled blocks, never one merged list,
 * because "contributed" and "led" are different words and a merged list lets
 * the weaker verb borrow the stronger one's credit. A block the record cannot
 * support is absent. The ownership diagram, where a study has one, follows as
 * a champagne plate.
 */
const BLOCKS: { key: keyof Scope; label: string }[] = [
  { key: "owned", label: "Owned" },
  { key: "led", label: "Led" },
  { key: "influenced", label: "Influenced beyond the design lane" },
  { key: "workedWith", label: "Worked with" },
];

export default function ScopeOwnership({ scope }: { scope: Scope }) {
  return (
    <div className="cs-sub">
      <dl className="cs-list">
        {BLOCKS.filter(({ key }) => scope[key]).map(({ key, label }) => (
          <div key={key}>
            <dt className="cs-label text-accent">{label}</dt>
            <dd className="cs-body">{scope[key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
