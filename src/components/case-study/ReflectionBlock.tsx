import type { Reflection } from "../../data/caseStudies";

export default function ReflectionBlock({ reflection }: { reflection: Reflection }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-base text-muted-foreground leading-[1.7]">{reflection.learned}</p>
      {reflection.wouldChange && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            What I would change
          </p>
          <p className="text-base text-muted-foreground leading-[1.7]">{reflection.wouldChange}</p>
        </div>
      )}
      {reflection.principle && (
        <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6] border-l-2 border-accent pl-5">
          {reflection.principle}
        </p>
      )}
    </div>
  );
}
