import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import { X } from "lucide-react";
import Button from "../ui/Button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/about", label: "About" },
];

export default function MobileNav({ isOpen, onClose, triggerRef }: MobileNavProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className="fixed top-0 right-0 bottom-0 z-[201] w-[min(320px,85vw)] bg-card border-l border-border flex flex-col p-6"
        id="mobile-nav"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Navigation
          </span>
          <button
            ref={closeRef}
            className="flex items-center justify-center w-11 h-11 bg-transparent border-none text-foreground cursor-pointer rounded-sm hover:bg-secondary transition-colors duration-150"
            onClick={() => { onClose(); triggerRef.current?.focus(); }}
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  [
                    "block text-lg font-medium no-underline px-2 py-3 rounded-sm min-h-[44px] transition-colors duration-150",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  ].join(" ")
                }
                aria-current={location.pathname === to ? "page" : undefined}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-border">
          <Button to="/contact" variant="primary" fullWidth>
            Get in Touch
          </Button>
        </div>
      </nav>
    </>
  );
}
