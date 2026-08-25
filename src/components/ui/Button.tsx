import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
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
  "inline-flex items-center justify-center gap-2 font-sans text-[0.9375rem] font-semibold leading-none rounded-sm px-6 py-3 border-2 cursor-pointer no-underline transition-colors duration-150 whitespace-nowrap min-h-[44px]";

const variants = {
  primary:
    "bg-primary text-primary-foreground border-primary hover:bg-accent-hover hover:border-accent-hover",
  outline:
    "bg-transparent text-foreground border-border hover:border-muted-foreground hover:bg-card",
};

export default function Button({
  children,
  variant = "primary",
  to,
  href,
  download,
  onClick,
  type = "button",
  fullWidth,
  ariaLabel,
}: ButtonProps) {
  const classes = [base, variants[variant], fullWidth ? "w-full" : ""].filter(Boolean).join(" ");

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
