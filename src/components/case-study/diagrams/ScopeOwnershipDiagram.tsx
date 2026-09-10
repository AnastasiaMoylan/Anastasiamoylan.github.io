import DiagramPanel from "../primitives/DiagramPanel";

/**
 * Scope and ownership on the billing workflow, as four widening bands.
 *
 * Owned is the maroon core; Led, Influenced beyond the design lane, and Worked
 * with ring it outward, each band fainter than the one inside it. Control falls
 * as the band widens, which is the whole argument: the framework's point is
 * that "contributed" and "led" are different words, and nesting is the one
 * layout that shows the difference without asserting it.
 *
 * Drawn 2026-09-09 with the diagram-design plugin. The source of truth is
 * `src/assets/case-studies/cwo/scope-ownership.html`, exported beside it as
 * `.svg` and `.png`; every line of text is Anastasia's own from the Scope and
 * ownership section of the CWO principal-framework document.
 *
 * Inlined rather than loaded as an `<img>`, unlike the other three diagrams,
 * which ship as PNGs. Two reasons: an SVG in an `<img>` cannot load the fonts
 * it names, so its careful text metrics collapse to system fallbacks; and
 * inlined, the type is the site's own — Inter and IBM Plex Mono instead of the
 * export's Geist Mono and Instrument Serif — so the figure reads as part of the
 * page rather than as a picture pasted onto it. Colors are the literal values
 * from the export, which are the site's tokens already; the palette is
 * light-only by design, so they need no theming.
 */
export default function ScopeOwnershipDiagram() {
  return (
    <DiagramPanel
      heading="What I owned, led, and influenced"
      subheading="Four widening bands of involvement. What I owned outright sits at the core; around it, what I led, what I influenced beyond the design lane, and the team the work sat inside."
    >
      {/* Scrolls inside its own container on narrow screens: the band text is
          set at 9px against a 960-wide canvas, so scaling it to a phone width
          would put it under 4px. The page itself never scrolls sideways. */}
      <div className="-mx-1 overflow-x-auto px-1">
        <svg
          viewBox="0 0 960 600"
          className="block h-auto w-full min-w-[60rem]"
          role="img"
          aria-labelledby="cwo-scope-title cwo-scope-desc"
        >
          <title id="cwo-scope-title">Scope and ownership on the billing workflow</title>
          <desc id="cwo-scope-desc">
            Four widening bands of involvement on the billing workflow. At the core, what I owned
            outright: product definition and scope, the ten-stage decomposition and status model,
            and development-ready flows with error-condition wireframes. Around it, what I led:
            requirements workshops, prioritization, and moderated usability research. Beyond that,
            what I influenced outside the design lane: backlogs, roadmaps, test plans, decision
            logs, quality gates, and the scope calls on the dashboard and the interim editing path.
            The outermost band is the team the work sat inside.
          </desc>

          <rect width="100%" height="100%" fill="#f7f5f1" />

          {/* Band 4 — Worked with (outermost, faintest) */}
          <rect x="24" y="24" width="912" height="472" rx="8" fill="#f7f5f1" />
          <rect
            x="24"
            y="24"
            width="912"
            height="472"
            rx="8"
            fill="rgba(40,61,59,0.015)"
            stroke="rgba(40,61,59,0.30)"
            strokeWidth="1"
          />

          {/* Band 3 — Influenced beyond the design lane */}
          <rect x="56" y="92" width="848" height="380" rx="8" fill="#f7f5f1" />
          <rect
            x="56"
            y="92"
            width="848"
            height="380"
            rx="8"
            fill="rgba(40,61,59,0.025)"
            stroke="rgba(40,61,59,0.45)"
            strokeWidth="1"
          />

          {/* Band 2 — Led */}
          <rect x="88" y="160" width="784" height="288" rx="8" fill="#f7f5f1" />
          <rect
            x="88"
            y="160"
            width="784"
            height="288"
            rx="8"
            fill="rgba(40,61,59,0.04)"
            stroke="#6b6560"
            strokeWidth="1"
          />

          {/* Band 1 — Owned (the one focal element) */}
          <rect x="120" y="228" width="720" height="196" rx="8" fill="#f7f5f1" />
          <rect
            x="120"
            y="228"
            width="720"
            height="196"
            rx="8"
            fill="rgba(110,42,42,0.08)"
            stroke="#6e2a2a"
            strokeWidth="1"
          />

          {/* Band labels, masked over each band's top border */}
          <rect x="40" y="17" width="76" height="14" fill="#f7f5f1" />
          <text
            x="48"
            y="27"
            fill="#8f8a83"
            fontSize="8"
            letterSpacing="0.14em"
            className="font-mono"
          >
            WORKED WITH
          </text>

          <rect x="72" y="85" width="212" height="14" fill="#f7f5f1" />
          <text
            x="80"
            y="95"
            fill="#6b6560"
            fontSize="8"
            letterSpacing="0.14em"
            className="font-mono"
          >
            INFLUENCED BEYOND THE DESIGN LANE
          </text>

          <rect x="104" y="153" width="32" height="14" fill="#f7f5f1" />
          <text
            x="112"
            y="163"
            fill="#283d3b"
            fontSize="8"
            letterSpacing="0.14em"
            className="font-mono"
          >
            LED
          </text>

          <rect x="136" y="221" width="48" height="14" fill="#f7f5f1" />
          <text
            x="144"
            y="231"
            fill="#6e2a2a"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.14em"
            className="font-mono"
          >
            OWNED
          </text>

          {/* Band 4 content */}
          <text x="48" y="56" fill="#8f8a83" fontSize="9" className="font-mono">
            CWO team · Client Chief Data Office · Data team lead
          </text>
          <text x="48" y="72" fill="#8f8a83" fontSize="9" className="font-mono">
            Product · Engineering · UI development · Finance and operations · A consulting principal
            designer
          </text>

          {/* Band 3 content */}
          <text x="80" y="124" fill="#6b6560" fontSize="9" className="font-mono">
            Prioritized backlogs · Roadmaps · Test plans · Acceptance criteria
          </text>
          <text x="80" y="140" fill="#6b6560" fontSize="9" className="font-mono">
            Decision logs · Quality gates · Risk documentation · Scope calls on the dashboard and
            the interim editing path
          </text>

          {/* Band 2 content */}
          <text x="112" y="192" fill="#283d3b" fontSize="9" className="font-mono">
            Requirements workshops and discovery · Must / Should / Nice-to-have option sets
          </text>
          <text x="112" y="208" fill="#283d3b" fontSize="9" className="font-mono">
            Moderated usability research, ten participants across three user groups · Delivery syncs
            with engineering
          </text>

          {/* Band 1 content — the three things that are hers outright */}
          <rect x="144" y="288" width="208" height="72" rx="6" fill="#ffffff" stroke="#283d3b" strokeWidth="1" />
          <text x="248" y="320" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            Product definition
          </text>
          <text x="248" y="338" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            and scope
          </text>

          <rect x="376" y="288" width="208" height="72" rx="6" fill="#ffffff" stroke="#283d3b" strokeWidth="1" />
          <text x="480" y="320" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            Ten-stage decomposition
          </text>
          <text x="480" y="338" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            and the status model
          </text>

          <rect x="608" y="288" width="208" height="72" rx="6" fill="#ffffff" stroke="#283d3b" strokeWidth="1" />
          <text x="712" y="320" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            Development-ready flows
          </text>
          <text x="712" y="338" fill="#283d3b" fontSize="12" fontWeight="600" textAnchor="middle" className="font-sans">
            and error-condition wireframes
          </text>

          <text x="480" y="392" fill="#6e2a2a" fontSize="9" textAnchor="middle" className="font-mono">
            Front end designed · Design handoff run · Design backlog maintained
          </text>

          {/*
            Editorial callout — the claim that leaves her lane, so it leaves the
            bands. Its leader starts further right than in the exported file:
            Inter italic sets this line wider than the export's Instrument
            Serif, so the original start sat under the text's tail.
          */}
          <text
            x="24"
            y="548"
            fill="#283d3b"
            fontSize="15"
            fontStyle="italic"
            className="font-sans"
          >
            The approval flow designed here has since been picked up by other projects.
          </text>
          <path
            d="M 596 540 Q 656 522 664 478"
            fill="none"
            stroke="rgba(40,61,59,0.40)"
            strokeWidth="1"
            strokeDasharray="4,3"
          />
          <circle cx="664" cy="472" r="2" fill="#283d3b" />
        </svg>
      </div>
    </DiagramPanel>
  );
}
