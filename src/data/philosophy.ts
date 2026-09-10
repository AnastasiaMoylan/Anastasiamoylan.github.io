/**
 * The design principles, extracted from PhilosophyPage so the page and the
 * generated `llms.txt` read the same list. The page renders them; the text
 * outputs summarise them. Neither restates the count by hand.
 */

/**
 * Copy provided by Anastasia (2026-08-13 rewrite). Each principle: a short
 * thesis line rendered as a pull-quote, then body paragraphs. `visual` keys a
 * small coded figure rendered after the body — a restatement of the copy in
 * the site's diagram language, not new information, so the figures stay
 * aria-hidden. Principle 08 carries its thesis as the big stat instead of a
 * pull-quote, so the line isn't said twice.
 */
export interface Principle {
  title: string;
  thesis?: string;
  body: string[];
  visual?: "statusFlow" | "thresholds" | "aiStat";
}

export const principles: Principle[] = [
  {
    title: "Design flows, not screens",
    thesis: "A screen is a moment. The flow is the product.",
    body: [
      "Most product failures don't happen on a screen — they happen between screens: at a handoff, a failed retrieval, a permission gap, a status nobody updated. So I map the whole journey first: every role, every state, and every path that breaks. Screens come last, after the flow proves it can survive contact with reality.",
      "On an enterprise billing workflow, the most valuable design work wasn't a single interface — it was the status model. Making Initiated → In Progress → Review → Approved → Finalized visible, with ownership and history attached, did more for the team than any screen refinement could have.",
    ],
    visual: "statusFlow",
  },
  {
    title: "Design through implementation",
    thesis:
      "The design isn't done when the file is done. It's done when what ships matches what was designed.",
    body: [
      "I stay engaged through build: reviewing feasibility with engineers mid-implementation, pressure-testing decisions by prototyping in code, and adjusting the design when a technical constraint proves a flow wrong. A beautiful spec that engineering can't build — or builds differently — is a design that failed quietly.",
      "This is also why I build in code myself. A React prototype exposes problems a Figma file hides: real data lengths, real loading time, real state transitions. Building the thing is the fastest honest critique of the thing.",
    ],
  },
  {
    title: "Design holistically, not in isolation",
    thesis:
      "No decision is local. Every component lives inside a system of data, roles, governance, and adjacent products.",
    body: [
      "A dropdown is never just a dropdown — it's a data model, a permission question, and a precedent the next three teams will copy. Before I change anything, I ask what it touches: which roles see it, what data feeds it, what governance applies to it, and what breaks downstream if it changes.",
      "This is how invisible structure becomes visible. Organizations feel chaotic when the system connecting their tools and teams exists only in people's heads. Half my job is drawing that system so everyone can argue with the same picture.",
    ],
  },
  {
    title: "Design for the moment AI is wrong",
    thesis:
      "When the system is uncertain, show it. When the action is consequential, make it reversible.",
    body: [
      "AI earns trust at exactly the moments it's least reliable. So uncertainty, partial output, and failure are first-class states in my work — not error toasts. Low-confidence output gets a visible indicator and an explanation. Failed operations preserve the user's work and offer a retry path. Consequential multi-step workflows get pause, resume, and rollback.",
      "The threshold question — where the system acts on its own, where it recommends and waits, where it must stop and ask — is a product decision made deliberately with ML engineers, not a tuning detail inherited from the model. A number without provenance can't be approved; it can only be re-derived by hand. Governance people can't see isn't governance they'll approve.",
    ],
    visual: "thresholds",
  },
  {
    title: "Critique the decision, not the deliverable",
    thesis:
      "Feedback exists to help someone choose. If critique doesn't move a decision, it's just opinion.",
    body: [
      "Before I give or take feedback, I name the decision on the table: are we choosing a direction, validating a flow, or polishing for release? Critique aimed at the wrong altitude wastes everyone's time — pixel notes during direction-setting, direction debates during final polish.",
      "The same rule governs how I receive it. “I don't like it” isn't actionable; “a reviewer can't tell who owns this package” is. I push every conversation toward the second kind.",
    ],
  },
  {
    title: "Teach people how to decide, not what to produce",
    thesis: "Output can be corrected in a review. Judgment compounds for a career.",
    body: [
      "When I mentor, the goal is never a better artifact this week — it's a designer who makes better calls next quarter without me in the room. That means explaining the why behind every note, showing the rejected alternatives alongside the chosen one, and handing over decisions slightly before someone feels ready for them.",
      "The test of good coaching is absence: if the work only holds up when I'm reviewing it, I taught production, not judgment.",
    ],
  },
  {
    title: "Continuous improvement, driven by evidence",
    thesis: "Looking good is not the same as being right. Only research settles it.",
    body: [
      "I've thrown out navigation I liked because it tested poorly. I've killed a feature after a POC showed it didn't translate into adoption. I've replaced a data display that fit the design system perfectly with a format that testing proved finance users could actually read. Every one of those stung, and every one was correct.",
      "Taste gets you to a strong hypothesis. Evidence decides. When facts change, the design changes — a principle that can't bend to new evidence isn't a principle, it's a superstition.",
    ],
  },
  {
    title: "Use AI the way I ask users to trust it",
    body: [
      "I design AI products, and I practice what I design: AI runs through my ideation, research synthesis, product strategy, prototyping, and testing. But the same rules I build into interfaces apply to my own process — I review everything, I keep provenance, and nothing consequential ships without a human decision behind it. Using AI heavily and reviewing it rigorously aren't in tension. They're the same discipline.",
    ],
    visual: "aiStat",
  },
];

const COUNT_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve",
];

/** Spelled-out principle count, so the page subtitle and llms.txt can't disagree. */
export const principleCountWord =
  COUNT_WORDS[principles.length] ?? String(principles.length);

/**
 * The page's opening: the thesis quote and the paragraph that bridges from it
 * into the numbered list. Moved out of `PhilosophyPage.tsx` on 2026-09-10;
 * copy unchanged.
 */
export const philosophyThesis =
  "Good product design is what makes a system understandable: getting the flows right, designing the data well, and treating AI as core to the experience, not an afterthought.";

export const philosophyBridge =
  "Principles only matter if they help someone make a decision under pressure. Each of these is short enough to remember, specific enough to act on, and flexible enough to survive new evidence. If a principle here ever stops a better decision, the principle loses.";

/**
 * "How I evaluate design": the checks run against actual work, rendered as a
 * grid after the principles. Moved out of the page on 2026-09-10; copy
 * unchanged.
 */
export interface EvaluationCheck {
  title: string;
  body: string;
}

export const evaluationIntro =
  "The principles set direction. These are the checks I run against actual work — mine or anyone's.";

export const evaluationChecks: EvaluationCheck[] = [
  {
    title: "Usability and interaction",
    body: "Can the right person complete the real task, including the unhappy path? Feedback is timely, errors are recoverable, and the interaction cost matches the task's importance. Tested with the actual user group, not a convenient proxy.",
  },
  {
    title: "Clarity and hierarchy",
    body: "The eye lands where the decision is. Visual hierarchy guides attention deliberately; anything competing with the primary action has to justify itself. Simplicity is the default — complexity must be earned by the problem, not by the design.",
  },
  {
    title: "Consistency and systems",
    body: "Typography, color, layout, and components draw from one system, aligned to brand guidelines, so users learn the product once. A design system isn't decoration — it's the mechanism that lets consistency and speed coexist, and it's how one team's decision becomes every team's standard.",
  },
  {
    title: "Evidence and iteration",
    body: "Prototypes early, usability testing before conviction hardens, and a willingness to change course when findings demand it. Success is measured against defined criteria set before the work ships — not against how the launch felt.",
  },
  {
    title: "Alignment and value",
    body: "The design serves stated business objectives and delivers something the user personally values — time saved, confidence gained, a task that used to hurt and doesn't anymore. If it only does one of those, it isn't done.",
  },
  {
    title: "Longevity",
    body: "Will this hold up when the team doubles, the data grows, and the original designers leave? Patterns should be maintainable, documented, and extensible — designed for the tenth use case, not just the first.",
  },
];
