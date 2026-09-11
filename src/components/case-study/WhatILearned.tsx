import type { Reflection } from "../../data/caseStudyTypes";

/**
 * One lesson, said plainly, then what I would change, then the principle it
 * threads back to, set as a pull line in the voice face. Real admissions land
 * better than reflections, so this is prose rather than a labelled grid.
 */
export default function WhatILearned({ reflection }: { reflection: Reflection }) {
  return (
    <div className="cs-sub">
      <div className="cs-prose cs-body">
        <p>{reflection.learned}</p>
        {reflection.wouldChange && <p>{reflection.wouldChange}</p>}
      </div>
      {reflection.principle && <p className="cs-quote cs-deck">{reflection.principle}</p>}
    </div>
  );
}
