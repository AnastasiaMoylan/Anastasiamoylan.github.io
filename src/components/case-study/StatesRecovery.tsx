import type { StateRecovery } from "../../data/caseStudies";

export default function StatesRecovery({ states }: { states: StateRecovery[] }) {
  return (
    <dl className="m-0 flex flex-col gap-5">
      {states.map(({ state, userSees, recovery }) => (
        <div key={state} className="flex flex-col gap-1">
          <dt className="text-base font-semibold text-foreground leading-[1.5]">{state}</dt>
          {userSees && (
            <dd className="m-0 text-[0.9375rem] text-muted-foreground leading-[1.6]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mr-2">
                User sees
              </span>
              {userSees}
            </dd>
          )}
          {recovery && (
            <dd className="m-0 text-[0.9375rem] text-muted-foreground leading-[1.6]">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mr-2">Recovery</span>
              {recovery}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
