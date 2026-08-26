import type { OwnedTheme, TeamMember } from "../../data/caseStudies";
import BulletList from "./BulletList";

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 text-xs font-semibold uppercase tracking-[0.08em] text-accent">{children}</p>
  );
}

/**
 * Ownership as numbered themes: a short lead the eye can scan, with one
 * supporting line under it. Replaces a flat list of long bullets.
 */
function OwnedThemes({ themes }: { themes: OwnedTheme[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-6 p-0 sm:grid-cols-2">
      {themes.map(({ label, detail }, i) => (
        <li key={label} className="flex gap-4">
          <span
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-tint-subtle text-[0.75rem] font-bold text-accent"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div>
            <p className="m-0 text-[0.9375rem] font-bold leading-[1.35] text-foreground">{label}</p>
            <p className="mt-1 m-0 text-[0.875rem] leading-[1.65] text-muted-foreground">{detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Collaborators as a grid of discipline cards. Each card carries what that
 * discipline owned when the case study supplies it, so the section shows the
 * shape of the team rather than just naming it.
 */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {team.map(({ role, owned }) => (
        <li key={role} className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="m-0 text-[0.875rem] font-bold leading-[1.35] text-foreground">{role}</p>
          {owned && (
            <p className="mt-1 m-0 text-[0.8125rem] leading-[1.55] text-muted-foreground">{owned}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function RoleTeam({
  owned,
  ownedThemes,
  team,
}: {
  owned: string[];
  ownedThemes?: OwnedTheme[];
  team?: TeamMember[];
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <SubLabel>What I owned</SubLabel>
        {ownedThemes && ownedThemes.length > 0 ? (
          <OwnedThemes themes={ownedThemes} />
        ) : (
          <BulletList items={owned} />
        )}
      </div>

      {team && team.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <SubLabel>Who I worked with</SubLabel>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {team.length} disciplines
            </p>
          </div>
          <TeamGrid team={team} />
        </div>
      )}
    </div>
  );
}
