/**
 * A requirement in a gate checklist. The satisfied/unmet state is carried in
 * text (visually hidden), never by the icon and colour alone.
 */
export default function ChecklistRow({ label, satisfied }: { label: string; satisfied: boolean }) {
  return (
    <li
      className={[
        "flex items-start gap-3 rounded-md px-2.5 py-2",
        satisfied ? "" : "bg-accent-tint-subtle",
      ].join(" ")}
    >
      <span
        className={[
          "mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold",
          satisfied ? "bg-accent text-accent-foreground" : "border-[1.5px] border-accent text-accent",
        ].join(" ")}
        aria-hidden="true"
      >
        {satisfied ? "✓" : "✕"}
      </span>
      <span
        className={[
          "text-[0.875rem] leading-[1.5]",
          satisfied ? "text-foreground" : "font-bold text-foreground",
        ].join(" ")}
      >
        {label}
        <span className="sr-only"> — {satisfied ? "satisfied" : "unmet"}</span>
      </span>
    </li>
  );
}
