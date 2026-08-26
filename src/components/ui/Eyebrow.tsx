/**
 * Uppercase micro-label that sits above a heading or block of content.
 * Monospaced and letter-spaced, matching every other micro-label in the design.
 *
 * Teal by default — the colour convention reserves teal for labels and
 * location, and maroon (`accent`) for things you can act on.
 */
export default function Eyebrow({
  children,
  tone = "label",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "label" | "accent" | "muted";
  className?: string;
}) {
  const tones = {
    label: "text-tertiary-700",
    accent: "text-accent",
    muted: "text-muted-foreground",
  };

  return (
    <p
      className={[
        "m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
