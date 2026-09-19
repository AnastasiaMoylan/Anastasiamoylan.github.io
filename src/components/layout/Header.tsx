import { useRef, useState } from "react";
import { NavLink, useMatch } from "react-router";
import { Menu } from "lucide-react";
import MobileNav from "./MobileNav";
import { primaryNavLinks } from "../../data/navLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  // The home hero is on ink and the band starts at the top of the window, so
  // the header takes the hero's ground there. Every other page keeps the warm
  // header: the case study's running head inverts against it.
  const onInk = useMatch("/") !== null;

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b",
        onInk ? "bg-ink-deep border-secondary/20" : "bg-background border-border",
      ].join(" ")}
    >
      {/* `on-ink` on the bar, not the header: the drawer below is a white card
          and keeps the maroon focus ring. */}
      <div
        className={[
          "content-container flex items-center justify-between h-[72px] gap-6",
          onInk ? "on-ink" : "",
        ].join(" ")}
      >
        <NavLink
          to="/"
          className={[
            "flex items-center gap-2.5 no-underline shrink-0 transition-colors duration-150",
            onInk ? "text-secondary hover:text-white" : "text-foreground hover:text-accent",
          ].join(" ")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
            className={onInk ? "shrink-0 text-accent-tint-light" : "shrink-0 text-accent"}
          >
            <path d="M0 7 L7 0 L14 7 L7 14 Z" fill="currentColor" />
          </svg>
          <span className="font-display text-[0.9375rem] font-bold uppercase tracking-[0.02em]">
            Anastasia Novelly Moylan
          </span>
        </NavLink>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7 list-none m-0 p-0">
            {primaryNavLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    [
                      "font-mono text-[0.71875rem] uppercase tracking-[0.06em] no-underline transition-colors duration-150 pb-1 border-b-2",
                      onInk
                        ? "text-accent-tint-light border-transparent hover:text-white hover:border-accent-tint-light"
                        : isActive
                          ? "text-foreground border-tertiary-700"
                          : "text-muted-foreground border-transparent hover:text-foreground",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuBtnRef}
          className={[
            "flex lg:hidden items-center justify-center w-11 h-11 bg-transparent border-none cursor-pointer rounded-sm transition-colors duration-150",
            onInk ? "text-secondary hover:bg-white/10" : "text-foreground hover:bg-secondary",
          ].join(" ")}
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Open navigation menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>

      <MobileNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={menuBtnRef}
      />
    </header>
  );
}
