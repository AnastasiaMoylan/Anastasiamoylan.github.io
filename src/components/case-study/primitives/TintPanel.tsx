export type TintLevel = "none" | "subtle" | "light" | "mid" | "base";

const headerTint: Record<TintLevel, string> = {
  none: "bg-card",
  subtle: "bg-accent-tint-subtle",
  light: "bg-accent-tint-light",
  mid: "bg-accent-tint-mid",
  base: "bg-accent",
};

/**
 * Bordered card with an optionally tinted header. At `base` the header
 * reverses to white text, which is why the ramp tops out there.
 */
export default function TintPanel({
  title,
  eyebrow,
  tint = "none",
  headerRight,
  emphasized = false,
  children,
}: {
  title?: string;
  eyebrow?: string;
  tint?: TintLevel;
  headerRight?: React.ReactNode;
  /** Maroon border and lift, for the middle card in a three-column set. */
  emphasized?: boolean;
  children: React.ReactNode;
}) {
  const reversed = tint === "base";

  return (
    <div
      className={[
        "flex h-full flex-col overflow-hidden rounded-lg border bg-card",
        emphasized ? "border-accent shadow-sm" : "border-border",
      ].join(" ")}
    >
      {(title || eyebrow) && (
        <div className={["px-5 py-4", headerTint[tint]].join(" ")}>
          <div className="flex items-center justify-between gap-3">
            <div>
              {eyebrow && (
                <p
                  className={[
                    "m-0 text-[0.625rem] font-semibold uppercase tracking-[0.1em]",
                    reversed ? "text-accent-foreground/80" : "text-accent",
                  ].join(" ")}
                >
                  {eyebrow}
                </p>
              )}
              {title && (
                <p
                  className={[
                    "m-0 text-base font-bold leading-[1.3]",
                    eyebrow ? "mt-1" : "",
                    reversed ? "text-accent-foreground" : "text-foreground",
                  ].join(" ")}
                >
                  {title}
                </p>
              )}
            </div>
            {headerRight}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col px-5 py-5">{children}</div>
    </div>
  );
}
