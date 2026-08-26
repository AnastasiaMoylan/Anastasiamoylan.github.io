import { Link } from "react-router";

/**
 * Leadership evidence, above the work grid.
 *
 * Card 03 was a marked content slot until 2026-08-25, when the extraction
 * interview supplied the scope it was waiting for: a five-product finance
 * program with six application-level designers. [NEEDS SIGN-OFF]
 *
 * The wording avoids "managed" and "my team" on purpose — the designers are not
 * Anastasia's reports, and a claim of reporting lines is the kind of thing that
 * collapses under one interview question.
 */
const cards = [
  {
    n: "01",
    title: "Directed and delivered",
    body: "Directed the design workstream across a cross-functional team and did the work myself, from the product model to shipped screens.",
  },
  {
    n: "02",
    title: "Zero to one, then scaled",
    body: "Took Finance Cloud from zero to a working POC with the lead product owner, then scaled it from 10 pilot users to 300 through iterative testing.",
  },
  {
    n: "03",
    title: "Six designers, five products",
    body: "Owned the product strategy and directed the six application-level designers building across a finance transformation program, coordinating large cross-functional teams throughout.",
  },
];

export default function HowILead() {
  return (
    <section className="py-20" aria-labelledby="how-i-lead-heading">
      <div className="content-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="how-i-lead-heading"
            className="font-display text-[clamp(1.625rem,3vw,2.125rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
          >
            Player-coach, on the tools.
          </h2>
          <Link
            to="/philosophy"
            className="font-mono text-[0.75rem] tracking-[0.03em] text-accent hover:text-accent-hover no-underline transition-colors duration-150"
          >
            Read the philosophy &rarr;
          </Link>
        </div>

        <ul className="list-none p-0 m-0 mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ n, title, body }) => (
            <li key={n} className="flex flex-col rounded-md px-7 py-6 bg-card border border-border">
              <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-tertiary-700">
                {n}
              </span>
              <h3 className="mt-4 font-display text-[1.1875rem] font-medium leading-[1.25] tracking-[-0.01em] text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 text-[0.90625rem] leading-[1.65] text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
