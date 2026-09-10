import type { LeadershipPoint, OwnedTheme, Scope, TeamMember } from "../../data/caseStudies";
import LeadershipGrid from "./LeadershipGrid";
import RoleTeam from "./RoleTeam";

/**
 * What I owned end to end, who I led, and where I influenced beyond my lane.
 *
 * Four labelled blocks rather than one ownership list, because the framework
 * is explicit that "contributed" and "led" are different words and a merged
 * list lets the weaker verb borrow the stronger one's credit. `Influenced` is
 * the principal-level block: roadmap, priorities, and standards picked up
 * outside the work itself.
 *
 * Studies not yet migrated fall back to the previous rendering — the team grid
 * and ownership themes, then the leadership cards — so nothing disappears from
 * the page while the copy is waiting on sign-off.
 */
/*
  Each term is tinted to the band it names in the ownership diagram that follows,
  and the convention is announced once in a sentence rather than drawn as a
  legend. It replaces the look-back a reader would otherwise do between the prose
  and the figure, and it is the device the reference research named as the
  highest-value one available to an enterprise case study.

  Colour is never the only signal: every term also carries an underline, so the
  pairing survives colour blindness and a greyscale print.
*/
const BLOCKS: { key: keyof Scope; label: string; tint: string }[] = [
  { key: "owned", label: "Owned", tint: "text-accent" },
  { key: "led", label: "Led", tint: "text-foreground" },
  { key: "influenced", label: "Influenced beyond the design lane", tint: "text-muted-foreground" },
  { key: "workedWith", label: "Worked with", tint: "text-tertiary-500" },
];

/** Spelled out, because a numeral under ten in running prose reads as data. */
const WORD: Record<number, string> = { 1: "One", 2: "Two", 3: "Three", 4: "Four" };

export default function ScopeOwnership({
  scope,
  ownedThemes,
  team,
  leadership,
}: {
  scope?: Scope;
  ownedThemes?: OwnedTheme[];
  team?: TeamMember[];
  leadership?: LeadershipPoint[];
}) {
  if (scope) {
    const present = BLOCKS.filter(({ key }) => scope[key]);
    return (
      <div className="measure">
        <p className="m-0 text-small italic leading-[1.6] text-muted-foreground">
          {WORD[present.length] ?? present.length} degrees of control. Each is tinted here to the
          band it names in the figure below, so you should not have to look back and forth.
        </p>
        {/*
          Paragraphs with a lead-in term, not a definition list. The term has to
          sit inline with the sentence it introduces for the tint to do its job,
          and a <dt> inside a <dd> is invalid — a <dl> wants the term and the
          description as siblings.
        */}
        <div className="mt-6 flex flex-col gap-5">
          {present.map(({ key, label, tint }) => (
            <p key={key} className="m-0 text-body leading-[1.7] text-muted-foreground">
              <b className={["mr-1.5 border-b-2 border-current font-semibold", tint].join(" ")}>
                {label}.
              </b>
              {scope[key]}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const hasRoleTeam = !!team?.length || !!ownedThemes?.length;
  return (
    <div className="flex flex-col gap-14">
      {hasRoleTeam && <RoleTeam ownedThemes={ownedThemes} team={team} />}
      {leadership && leadership.length > 0 && <LeadershipGrid points={leadership} />}
    </div>
  );
}
