import { useState } from "react";
import type { Decision } from "../../data/caseStudies";
import RejectedPath from "./RejectedPath";

/** Decisions shown before the mobile "show all" control kicks in. */
const MOBILE_VISIBLE = 3;

/**
 * Decisions as hairline-separated rows: the choice as a bold lead-in to its own
 * reasoning, with the path not taken on its own line beneath.
 *
 * Deliberately not an accordion per decision — each is only ~250–320 characters,
 * so hiding the rationale costs more interaction than it saves scroll, and the
 * rationale is the point of the section. Deliberately not cards either: their
 * padding and borders cost roughly a third of the section's height for no
 * information.
 *
 * The collapse is mobile-only. Desktop has the room and always shows every
 * decision; narrow screens get the first few plus a control, because the full
 * set runs past a screen and a half on a phone.
 *
 * Decisions are parallel choices, not a sequence, so the list is unordered.
 */
export default function KeyDecisions({ decisions }: { decisions: Decision[] }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = decisions.length > MOBILE_VISIBLE;

  return (
    <div>
      <ul className="m-0 list-none p-0">
        {decisions.map((d, i) => {
          const { decision, rationale } = d;
          const hiddenOnMobile = collapsible && !expanded && i >= MOBILE_VISIBLE;
          return (
            <li
              key={decision}
              className={[
                "border-t border-border py-4 first:border-t-0 first:pt-0",
                hiddenOnMobile ? "hidden md:list-item" : "",
              ].join(" ")}
            >
              <p className="m-0 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                <span className="font-bold text-foreground">{decision}</span> {rationale}
              </p>
              <RejectedPath decision={d} className="mt-1.5 text-[0.8125rem] leading-[1.55]" />
            </li>
          );
        })}
      </ul>

      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-sans text-[0.875rem] font-semibold text-accent transition-colors duration-150 hover:text-accent-hover md:hidden"
        >
          {expanded ? "Show fewer decisions" : `Show all ${decisions.length} decisions`}
          <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}
    </div>
  );
}
