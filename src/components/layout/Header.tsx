import { useRef, useState } from "react";
import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="content-container flex items-center justify-between h-16">
        <NavLink
          to="/"
          className="text-base font-semibold text-foreground hover:text-accent no-underline shrink-0 transition-colors duration-150"
        >
          Anastasia Novelly Moylan
        </NavLink>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    [
                      "text-[0.9375rem] font-medium no-underline transition-colors duration-150 pb-0.5 border-b-2",
                      isActive
                        ? "text-foreground border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? "page" : undefined}>
                      {label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex">
          <Button to="/contact" variant="primary">
            Get in Touch
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
