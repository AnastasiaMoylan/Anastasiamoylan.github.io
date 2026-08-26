/** Primary navigation, shared by the desktop header and the mobile drawer. */
export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/philosophy", label: "Philosophy" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/**
 * Desktop header set. Home is dropped because the wordmark already links home;
 * the mobile drawer keeps it, since the wordmark is behind the overlay there.
 */
export const primaryNavLinks = navLinks.filter((l) => l.to !== "/");
