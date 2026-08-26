import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  /**
   * `hex` is the angled tab from the design language. It paints its shape on a
   * background span rather than on the button itself, so clipping never eats
   * the focus ring. Defaults by role: primary renders hex, outline renders rect.
   */
  shape?: "rect" | "hex";
  size?: "sm" | "md";
  /** In-app route; renders a router <Link>. */
  to?: string;
  /** Plain URL; renders an <a>. Opens in a new tab unless `download` is set. */
  href?: string;
  download?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none cursor-pointer no-underline transition-colors duration-150 whitespace-nowrap";

/** Heights hold the 44px minimum touch target; --hex-cut is half the height. */
const sizes = {
  sm: { box: "text-[0.84375rem] min-h-[44px] px-7", cut: "22px" },
  md: { box: "text-[0.90625rem] min-h-[52px] px-9", cut: "26px" },
};

const rectTones = {
  primary:
    "rounded-sm border-2 bg-primary text-primary-foreground border-primary hover:bg-accent-hover hover:border-accent-hover",
  outline:
    "rounded-sm border-2 bg-transparent text-foreground border-border hover:border-tertiary-500 hover:bg-card",
};

const hexTones = {
  primary: { text: "text-primary-foreground", fill: "bg-primary group-hover:bg-accent-hover" },
  outline: { text: "text-foreground", fill: "bg-card group-hover:bg-secondary" },
};

export default function Button({
  children,
  variant = "primary",
  shape,
  size = "md",
  to,
  href,
  download,
  onClick,
  type = "button",
  fullWidth,
  ariaLabel,
}: ButtonProps) {
  // Standardized 2026-08-26: the hex tab is the primary-action shape site-wide,
  // the plain rect is the secondary shape. Explicit `shape` still wins.
  const resolvedShape = shape ?? (variant === "primary" ? "hex" : "rect");
  const isHex = resolvedShape === "hex";
  const classes = [
    base,
    sizes[size].box,
    isHex ? hexTones[variant].text : rectTones[variant],
    fullWidth ? "w-full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = isHex ? (
    <>
      <span
        aria-hidden="true"
        className={`hex-tab absolute inset-0 transition-colors duration-150 ${hexTones[variant].fill}`}
        style={{ "--hex-cut": sizes[size].cut } as React.CSSProperties}
      />
      <span className="relative">{children}</span>
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = download ? {} : { target: "_blank", rel: "noopener noreferrer" };
    return (
      <a href={href} download={download} className={classes} aria-label={ariaLabel} {...external}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
