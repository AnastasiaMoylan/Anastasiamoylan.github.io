/**
 * Uppercase micro-label that sits above a heading or block of content.
 * Maroon by default (a section label); `muted` for secondary labels.
 */
export default function Eyebrow({
  children,
  tone = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
}) {
  return (
    <p
      className={[
        "m-0 text-xs font-semibold uppercase tracking-[0.1em]",
        tone === "accent" ? "text-accent" : "text-muted-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
