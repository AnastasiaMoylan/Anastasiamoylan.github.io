import { useRef, useState } from "react";
import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import { primaryNavLinks } from "../../data/navLinks";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="content-container flex items-center justify-between h-[72px] gap-6">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 no-underline shrink-0 text-foreground hover:text-accent transition-colors duration-150"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
            className="shrink-0 text-accent"
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
                      isActive
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

        {/* The tabs interlock: the slate one tucks under the maroon one's angled edge. */}
        <div className="hidden lg:flex items-center shrink-0">
          <span className="inline-flex -mr-4">
            <Button to="/resume" variant="slate" shape="hex" size="sm">
              Résumé
            </Button>
          </span>
          <Button to="/contact" variant="primary" shape="hex" size="sm">
            Get in touch
          </Button>
        </div>

        <button
          ref={menuBtnRef}
          className="flex lg:hidden items-center justify-center w-11 h-11 bg-transparent border-none text-foreground cursor-pointer rounded-sm hover:bg-secondary transition-colors duration-150"
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
