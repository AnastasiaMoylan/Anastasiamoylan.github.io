import { Link } from "react-router";

export default function PendingVisuals({ note, planned }: { note?: string; planned?: string[] }) {
  return (
    <div className="bg-card border border-dashed border-border rounded-[14px] px-8 py-7 flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Visuals pending</p>
      {note && <p className="text-[0.9375rem] text-muted-foreground leading-[1.7]">{note}</p>}
      {planned && planned.length > 0 && (
        <>
          <p className="text-[0.9375rem] text-foreground leading-[1.6]">Planned evidence-bearing visuals:</p>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {planned.map((item) => (
              <li key={item} className="text-[0.9375rem] text-muted-foreground leading-[1.6] pl-5 relative">
                <span className="absolute left-0 text-accent">—</span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="text-[0.9375rem] text-muted-foreground leading-[1.6]">
        Walkthrough available on request.{" "}
        <Link to="/contact" className="text-accent hover:text-foreground no-underline transition-colors duration-150">
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}
