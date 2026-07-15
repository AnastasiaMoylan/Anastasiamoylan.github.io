interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "status";
}

const variants = {
  default: "bg-secondary text-foreground border-border",
  accent: "bg-primary/15 text-accent border-primary/30",
  status: "bg-secondary text-foreground border-border",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center text-xs font-semibold leading-none px-2.5 py-1 rounded-full border whitespace-nowrap",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
