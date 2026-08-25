import { Link } from "react-router";
import Eyebrow from "../ui/Eyebrow";

const CONTACT_EMAIL = "anastasiamoylan.design@gmail.com";

export default function Footer() {
  return (
    /* No top margin: the band butts against whatever section ends the page.
       Pages carry their own bottom padding. */
    <footer className="bg-tertiary-900 text-secondary">
      <div className="content-container py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <Eyebrow tone="muted" className="text-tertiary-100/60">
              Contact
            </Eyebrow>
            <p className="font-display text-[clamp(2rem,4.5vw,2.875rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-secondary">
              Let&rsquo;s make it legible.
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <p className="text-[0.90625rem] leading-[1.65] text-tertiary-100/75 md:text-right">
              Remote only, across the Americas.
              <br />
              Open to Lead and Principal UX roles.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono text-[0.8125rem] tracking-[0.02em] text-secondary no-underline hover:text-white transition-colors duration-150"
            >
              {CONTACT_EMAIL} &rarr;
            </a>
          </div>
        </div>

        {/*
          Everything the tall band doesn't carry — the other real destinations,
          the copyright, and the way back up.
        */}
        <div className="mt-14 pt-6 border-t border-tertiary-100/15 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ul className="list-none p-0 m-0 flex flex-wrap gap-6">
            <li>
              <a
                href="https://linkedin.com/in/anastasiamoylan"
                className="text-sm text-tertiary-100/75 hover:text-secondary no-underline transition-colors duration-150"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link
                to="/resume"
                className="text-sm text-tertiary-100/75 hover:text-secondary no-underline transition-colors duration-150"
              >
                Résumé
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className="text-sm text-tertiary-100/75 hover:text-secondary no-underline transition-colors duration-150"
              >
                Work
              </Link>
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="text-sm text-tertiary-100/55">
              &copy; {new Date().getFullYear()} Anastasia Novelly Moylan
            </span>
            <a
              href="#top"
              className="text-sm text-tertiary-100/75 hover:text-secondary no-underline transition-colors duration-150"
            >
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
