import type { Reflection } from "../../data/caseStudyTypes";

/**
 * One paragraph, one lesson, said plainly.
 *
 * The framework's note is that real admissions land better than reflections,
 * so this is prose rather than a labelled grid. Studies still carrying a
 * separate "what I would change" line or a closing principle render them as
 * continuations of the same passage; the migration merges them into the single
 * paragraph the framework asks for.
 */
export default function WhatILearned({ reflection }: { reflection: Reflection }) {
  return (
    <div className="flex max-w-[38rem] flex-col gap-5">
      <p className="m-0 text-body leading-[1.7] text-muted-foreground">{reflection.learned}</p>
      {reflection.wouldChange && (
        <p className="m-0 text-body leading-[1.7] text-muted-foreground">
          {reflection.wouldChange}
        </p>
      )}
      {reflection.principle && (
        <p className="m-0 border-l-2 border-accent pl-5 text-lead font-medium leading-[1.5] text-foreground">
          {reflection.principle}
        </p>
      )}
    </div>
  );
}
