import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
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
  "inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none cursor-pointer no-underline transition-colors duration-150 whitespace-nowrap rounded-sm border-2";

/** Heights hold the 44px minimum touch target. */
const sizes = {
  sm: "text-[0.84375rem] min-h-[44px] px-7",
  md: "text-[0.90625rem] min-h-[52px] px-9",
};

/*
  One shape for every button (the angled hex tab was retired 2026-08-26 —
  owner: "odd shaped buttons"). Roles differ by tone only: primary is the
  filled maroon action, outline the quiet secondary.
*/
const tones = {
  primary:
    "bg-primary text-primary-foreground border-primary hover:bg-accent-hover hover:border-accent-hover",
  outline:
    "bg-transparent text-foreground border-border hover:border-tertiary-500 hover:bg-card",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  download,
  onClick,
  type = "button",
  fullWidth,
  ariaLabel,
}: ButtonProps) {
  const classes = [base, sizes[size], tones[variant], fullWidth ? "w-full" : ""]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = download ? {} : { target: "_blank", rel: "noopener noreferrer" };
    return (
      <a href={href} download={download} className={classes} aria-label={ariaLabel} {...external}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
