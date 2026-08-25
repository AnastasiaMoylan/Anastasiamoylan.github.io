interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

const variants = {
  /** Champagne chip with teal text — the paired fill from the palette. */
  default: "bg-secondary text-secondary-foreground border-transparent",
  accent: "bg-transparent text-muted-foreground border-border",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center text-xs font-medium leading-none px-2.5 py-1.5 rounded-sm border whitespace-nowrap",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
