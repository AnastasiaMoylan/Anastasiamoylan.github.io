/** Em-dash bullets, shared by RoleTeam and OutcomeImpact. */
export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="text-base text-muted-foreground leading-[1.65] pl-5 relative">
          <span className="absolute left-0 text-accent">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
