import type { TeamMember } from "../../data/caseStudies";
import BulletList from "./BulletList";

export default function RoleTeam({ owned, team }: { owned: string[]; team?: TeamMember[] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">I owned</h3>
        <BulletList items={owned} />
      </div>
      {team && team.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">I worked with</h3>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            {team.map(({ role, owned: theirs }) => (
              <li key={role} className="text-base text-muted-foreground leading-[1.65]">
                <span className="text-foreground">{role}</span>
                {theirs && <> — {theirs}</>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
