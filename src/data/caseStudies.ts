import {
  FINANCE_PRODUCT_MODEL,
  FINANCE_RESEARCH_ARTIFACTS,
  BILLING_OPERATIONAL_FLOW,
  BILLING_STATUS_MODEL,
  CCJ_HUMAN_REVIEW,
} from "./ownedStatements";
// Case study content, keyed by project slug.
//
// Shape follows the Case Study Framework's ten beats. buildSections renders
// them as: Overview -> Challenge -> My role -> Solution (with the featured
// decision) -> Research and team -> Outcomes and metrics -> Deep dive.
//
// Optional fields render nothing when absent, so a study can ship partially
// filled rather than showing empty labels.

// `?preview` yields a downscaled WebP for inline display (see vite.config.ts);
// the plain import is the full-resolution original used by the lightbox.
import ccjUserFlow from "../assets/case-studies/ccj/user-flow.jpg?preview";
import ccjUserFlowFull from "../assets/case-studies/ccj/user-flow.jpg";
import ccjJourneyExplorations from "../assets/case-studies/ccj/journey-explorations.jpg?preview";
import ccjJourneyExplorationsFull from "../assets/case-studies/ccj/journey-explorations.jpg";
import ccjDashboard from "../assets/case-studies/ccj/dashboard-performance.jpg?preview";
import ccjDashboardFull from "../assets/case-studies/ccj/dashboard-performance.jpg";
import ccjMitigationPlan from "../assets/case-studies/ccj/mitigation-plan.jpg?preview";
import ccjMitigationPlanFull from "../assets/case-studies/ccj/mitigation-plan.jpg";
import ccjChatExpanded from "../assets/case-studies/ccj/chat-expanded.png?preview";
import ccjChatExpandedFull from "../assets/case-studies/ccj/chat-expanded.png";
import ccjSegmentOfOne from "../assets/case-studies/ccj/segment-of-one.jpg?preview";
import ccjSegmentOfOneFull from "../assets/case-studies/ccj/segment-of-one.jpg";
import cwoMvp1Workflow from "../assets/case-studies/cwo/mvp1-workflow.jpg?preview";
import cwoMvp1WorkflowFull from "../assets/case-studies/cwo/mvp1-workflow.jpg";
import cwoCreationFlow from "../assets/case-studies/cwo/creation-flow.jpg?preview";
import cwoCreationFlowFull from "../assets/case-studies/cwo/creation-flow.jpg";
import cwoFlow from "../assets/case-studies/cwo/flow.jpg?preview";
import cwoFlowFull from "../assets/case-studies/cwo/flow.jpg";
import cwoStrategyAlignment from "../assets/case-studies/cwo/strategy-alignment.jpg?preview";
import cwoStrategyAlignmentFull from "../assets/case-studies/cwo/strategy-alignment.jpg";
import diUserFlows from "../assets/case-studies/di/user-flows.jpg?preview";
import diUserFlowsFull from "../assets/case-studies/di/user-flows.jpg";

export interface CaseStudyImage {
  src: string;
  fullSrc: string;
  /**
   * Intrinsic pixels of the source asset. The gallery renders images fluid
   * (`w-full h-auto`) and lazy, so without these the browser reserves zero
   * height and the page jumps as each image loads; the attributes only fix the
   * aspect ratio, so the full-resolution numbers are correct for the downscaled
   * preview too.
   */
  width: number;
  height: number;
  alt: string;
  /** Required. States the decision the image shows, not what is in the frame. */
  caption: string;
}

/** A collaborator and, where known, what they owned. */
export interface TeamMember {
  role: string;
  owned?: string;
}

/**
 * A condensed theme of ownership: a short lead plus one supporting line.
 *
 * Preferred over the flat `owned` list, which tends to grow into a résumé dump —
 * the detail belongs in Key decisions and Execution, so this section only has to
 * orient the reader. Case studies without themes fall back to `owned`.
 */
export interface OwnedTheme {
  label: string;
  detail: string;
}

export interface Tldr {
  challenge: string;
  solution: string;
  /** The payoff. Carries a metric or an unblocked outcome. */
  result: string;
}

/** A research finding paired with the product change it caused. */
export interface EvidenceFinding {
  finding: string;
  response: string;
}

export interface Evidence {
  body?: string;
  findings?: EvidenceFinding[];
  /** The reframing line, rendered as a pull-quote. */
  insight: string;
  principle?: string;
}

export interface Decision {
  decision: string;
  rationale: string;
  /** The path not taken. */
  rejected?: string;
  /** What choosing this path cost. */
  tradeoff?: string;
}

export interface StateRecovery {
  state: string;
  userSees?: string;
  recovery?: string;
}

export interface Impact {
  headline: string;
  business?: string;
  user?: string;
  organizational?: string;
  before?: string;
  after?: string;
  /** NDA-safe validated proof points. */
  proof?: string[];
  /** Why a hard metric is absent, when it is. */
  metricStatus?: string;
}

export interface Reflection {
  learned: string;
  wouldChange?: string;
  /** Threads back to the portfolio's through-line: systems legibility and trust. */
  principle?: string;
}

/**
 * One figure in the at-a-glance band under the header.
 *
 * `value` is set in display type, so it stays short — a number, a ratio, or a
 * single word. Studies whose outcomes are not numerically verified use a
 * countable design output ("6" status states) or a plain word ("Required")
 * rather than a metric the project record cannot support.
 */
export interface Stat {
  value: string;
  label: string;
}

/**
 * One line of the 'How I led' section.
 *
 * `kind` is the discipline the point belongs to, rendered as the card's
 * eyebrow. Four subcategories, so a reader sees the same person set strategy,
 * drew the screens, ran the research, and led the people. Cards stay in
 * authored order — adjacent same-kind cards read as a group on their own.
 * Condensed from `ownedThemes`; the fuller list still renders in the deep dive.
 */
export interface LeadershipPoint {
  kind: "Product strategy" | "Design" | "Research" | "Team leadership";
  title: string;
  detail: string;
}

/** One stage of the solution, carrying two supporting points at most. */
export interface SolutionStep {
  title: string;
  points: string[];
  /**
   * The evidence for this step, rendered beside it. When any step carries
   images, the study's separate gallery clump is suppressed — the screen sits
   with the argument it proves.
   */
  images?: CaseStudyImage[];
}

export interface CaseStudy {
  snapshotFields: { label: string; value: string }[];
  team?: TeamMember[];
  tldr: Tldr;
  /** At-a-glance figures. Absent means the band doesn't render. */
  stats?: Stat[];
  /** Two to four sentences answering "what was this, and what did I do here". */
  overview?: string;
  /** Direction and craft, split. Absent means the section doesn't render. */
  leadership?: LeadershipPoint[];
  /** The solution as an ordered walk, replacing a flat capability list. */
  solutionSteps?: SolutionStep[];
  /** The messy middle: the one pivot, failure, or reversal, told straight. */
  turn?: string;
  /**
   * Process artifacts — working boards, end-to-end flows. Rendered in the deep
   * dive as "The journey behind the screens", a separate container from the
   * solution gallery so the story stays product-first.
   */
  processImages?: CaseStudyImage[];
  context: string;
  evidence?: Evidence;
  /** What I personally owned. Collaborators live in `team`. */
  owned: string[];
  /** Condensed version of `owned`. When present it renders instead of the list. */
  ownedThemes?: OwnedTheme[];
  decisions: Decision[];
  states?: StateRecovery[];
  images?: CaseStudyImage[];
  /**
   * Caption for the placeholder that stands in when a study has no images and
   * no coded diagrams. Says what the real asset will show.
   */
  visualsPendingNote?: string;
  impact?: Impact;
  reflection?: Reflection;
}

export const caseStudies: Record<string, CaseStudy> = {
  // Rewritten 2026-08-25 from Anastasia's own program-level account ("Unified
  // Finance Product Experience"). The study now tells the suite story — the
  // narrative reframe, the unified homepage, shared AI interaction principles —
  // with the governed analysis platform as the depth beneath it (states and the
  // coded diagrams). All new copy is drawn from her document; lines that had to
  // be authored to hold the structure together are marked [NEEDS SIGN-OFF].
  //
  // Deliberately NOT published, per the extraction-worksheet decisions:
  //   - the $75M forecast-gap figure (interviews only, unless client-cleared)
  //   - exact program-increment dates (internal sprint dates, identifying)
  // Published per her supplied copy, previously flagged: "Fortune 500
  // telecommunications company" and the Category → Driver → Anchor Signal
  // taxonomy. Role is "Product Experience Lead" — the fifth title in play
  // across surfaces; needs reconciling with About/résumé before merge.
  "finance-cloud": {
    snapshotFields: [
      { label: "Role", value: "Product Experience Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential Fortune 500 telecommunications company" },
      { label: "Timeframe", value: "2024–Present" },
      {
        label: "Status",
        value: "Analysis platform in scaled pilot; unified homepage MVP in development",
      },
      {
        label: "Users",
        value:
          "Analyst, accounting, and finance leadership organizations, plus specialized finance roles",
      },
      // Short header fact (Linear-block pattern); the full disciplines render
      // as cards in Research and team.
      {
        label: "Team",
        value: "Six application-level designers, plus product, engineering, data, and finance SMEs",
      },
      { label: "Tools", value: "Figma, FigJam, React, Tailwind CSS, Vite" },
    ],
    tldr: {
      challenge:
        "The organization had invested in several valuable finance products, but users experienced them as disconnected tools rather than a coherent platform — no unified entry point, overlapping terminology, and an integration promise the architecture could not yet keep.",
      solution:
        "Reframed the program from a single integrated application to a suite of independent finance products with a shared experience layer: one access-aware homepage for discovery, a shared taxonomy and component patterns, and AI interactions that confirm their assumptions before acting.",
      result:
        "Established the shared experience model across six product areas and defined the homepage MVP, navigation scenarios, access assumptions, and phased roadmap in time for development within the same program increment — while the analysis platform scaled from 10 pilot users to 300.",
    },
    // Every figure below is restated in `impact`; the band restates them in
    // display type rather than introducing anything new.
    stats: [
      { value: "6", label: "Product areas under one experience layer" },
      { value: "10 → 300", label: "Pilot users scaled on the analysis platform" },
      { value: "72 hrs", label: "Agent success window — did the analyst act" },
    ],
    overview:
      "I led the end-to-end product experience for a finance transformation program at a Fortune 500 telecommunications company — a growing suite spanning data exploration and AI-assisted analysis, workflow automation, an AI-agent portfolio, audit tooling, and access management. The products were owned by different teams, built on separate technology stacks, and not yet deeply integrated; my job was to make the ecosystem understandable and usable as one experience. I set the cross-product experience direction, connected workstreams, clarified ambiguous product concepts, and translated executive intent into decisions teams could build against.",
    leadership: [
      {
        kind: "Product strategy",
        title: "Reframed the platform narrative",
        detail:
          "Drove the shift from \u201cone integrated application\u201d to a suite of independent products with a shared design language — acknowledging the current technical reality while keeping a credible path toward a more connected future.",
      },
      {
        kind: "Team leadership",
        title: "Owned the strategy, directed the design",
        detail:
          "Established the UX operating model — program-level experience leadership to connect workstreams and filter noise, paired with application-level design ownership closer to delivery — while directing the six designers building across the program.",
      },
      {
        kind: "Design",
        title: "Designed the suite\u2019s front door",
        detail:
          "A unified homepage as an app launcher and discovery hub, plus standardized patterns across divergent workflow products — headers, breadcrumbs, status badges, approval history — seeding a finance-wide component library.",
      },
      {
        kind: "Research",
        title: "Stood up the research practice",
        detail:
          "Some workflows had reached only about four unique participants. I built a recruited tester pool of 32 analysts, ran 45-minute moderated sessions against prototypes, and segmented participants by role so each protocol asked people only about work they actually did.",
      },
    ],
    solutionSteps: [
      {
        title: "One honest front door",
        points: [
          "A unified homepage as an app launcher and discovery hub — deliberately not a kitchen-sink catalog or dashboard",
          "A personalized \u201cYour Apps\u201d area surfacing what each person can actually use, with products launching in their own tabs",
        ],
      },
      {
        title: "A shared language",
        points: [
          "A formal taxonomy for the agent portfolio — Category \u2192 Driver \u2192 Anchor Signal — with drivers from a structured catalog, not open text",
          "Reusable patterns across workflow products: page headers, breadcrumbs, status badges, approval-history components",
        ],
      },
      {
        title: "AI that confirms its assumptions",
        points: [
          "Understand \u2192 clarify \u2192 confirm assumptions \u2192 plan \u2192 output, so silent assumptions surface before a result does",
          "Domain experts validate outputs: directionally correct, within an order of magnitude, with thresholds set where action is actually warranted",
        ],
      },
    ],
    // Trimmed 2026-08-26 to the storyteller arc's stakes shape: situation,
    // why it mattered, the constraint. The cut detail (access model, silos)
    // survives in evidence.findings.
    context:
      "The organization had invested in six valuable finance product areas — but users experienced them as disconnected tools, with no unified entry point and no shared language, and the program was being described as a single integrated application the architecture could not yet deliver. Left alone, every new product would deepen the fragmentation and the promise would keep outrunning the platform. The constraint underneath everything: an enterprise identity architecture still evolving, and delivery moving too fast for design to wait for it to settle.",
    // [NEEDS SIGN-OFF] The turn (messy middle), told first-person. Drawn from
    // this study's own decisions/reflection — no new claims.
    turn:
      "The program's own story was what broke. It was being described as one integrated application — but the architecture couldn't keep that promise, executive expectations had diverged, and one AI workstream had been building alongside design with a shrinking meeting cadence. I took the reframe to the executive sponsor: stop calling it a single application. A suite of independent products with a shared experience layer was a story the architecture could actually keep — and the homepage, the taxonomy, and the shared patterns all fell out of that one sentence.",
    evidence: {
      body:
        "I developed a research approach based on role segmentation, moderated prototype testing, and direct access to domain experts — 45-minute, one-on-one, semi-structured sessions with clickable prototypes, with questions tailored by participant responsibilities rather than treating \u201cfinance users\u201d as a single audience.",
      findings: [
        {
          finding:
            "Users generally saw only the products they were already permitted to use, making discovery of the wider suite difficult.",
          response:
            "Discovery needed a central, access-aware entry point — a homepage that knows what each person can use after login.",
        },
        {
          finding:
            "The program was described as a single integrated application, but the architecture and roadmap could not yet support that promise.",
          response:
            "The narrative had to change before the screens could: a suite of independent products with a shared experience layer.",
        },
        {
          finding:
            "Teams used overlapping language for products, roles, and AI concepts — the agent portfolio had no shared object model.",
          response:
            "A formal hierarchy — Category \u2192 Driver \u2192 Anchor Signal — had to exist before monitor configuration, thresholds, and briefings could be designed against it.",
        },
        {
          finding:
            "One AI workstream had UX and engineering progressing in parallel with unclear expectations and limited cadence.",
          response:
            "Program-level experience leadership had to reconnect the workstream and bring the end-to-end workflow into view before build.",
        },
        {
          finding:
            "The enterprise identity and approval architecture was still evolving, which affected what could be shown, requested, and personalized.",
          response:
            "Design proceeded on documented access assumptions, with personalization built around what is knowable after login.",
        },
      ],
      // [NEEDS SIGN-OFF] Tightened from her line "It acknowledged the current
      // technical reality while creating a credible path toward a more
      // connected future."
      insight:
        "Instead of promising seamless integration before it existed, the experience provided a common visual language, central discovery, and clear product relationships.",
    },
    owned: [
      "Led the cross-product experience for the finance transformation program: the platform model, navigation, product relationships, access model, AI interaction principles, research approach, and delivery sequencing.",
      "Drove the reframe from a single integrated application to a suite of independent finance products with a shared experience layer.",
      "Designed the unified homepage as an app launcher and discovery hub, on four tenets: modularity and scalability, discoverability, launcher-not-catalog, and a layout that reflects real usage.",
      "Defined the shared forecasting hierarchy — Category \u2192 Driver \u2192 Anchor Signal — and established that drivers come from a structured catalog rather than open-text labels.",
      "Set the transparent agent interaction model — understand, clarify, confirm assumptions, plan, output — and brought finance-domain experts into validation sessions.",
      FINANCE_PRODUCT_MODEL,
      "Brought authentication, identity integration, metadata availability, app boundaries, and role-based access constraints into the experience definition early.",
      FINANCE_RESEARCH_ARTIFACTS,
    ],
    // Condensed from the `owned` items above; wording drawn from them.
    ownedThemes: [
      {
        label: "The suite narrative",
        detail:
          "Repositioned the program as a suite of independent finance products with a shared experience layer — an honest product model that let teams ship independently without losing the longer-term platform vision.",
      },
      {
        label: "The unified homepage",
        detail:
          "An app launcher and discovery hub with a personalized \u201cYour Apps\u201d area, clear product groupings, and a phased roadmap that named what was deferred — favorites, broader filtering, persistent cross-app launchers, centralized notifications — rather than letting it block the MVP.",
      },
      {
        label: "Shared language and patterns",
        detail:
          "A formal Category \u2192 Driver \u2192 Anchor Signal taxonomy for the agent portfolio, and standardized components across divergent workflow products, seeding a finance-wide library.",
      },
      {
        label: "AI interaction principles",
        detail:
          "Agents confirm understanding and assumptions before planning; outputs are validated with domain experts for directional accuracy; success is measured as analyst behavior, not forecast precision.",
      },
      {
        label: "Research and operating model",
        detail:
          "A role-segmented research practice drawing on a 32-analyst pool, paired with a UX operating model of program-level experience leadership over application-level design ownership.",
      },
    ],
    team: [
      { role: "Program leadership" },
      { role: "Product management" },
      { role: "Application-level designers", owned: "Individual product design across the suite" },
      { role: "Engineering and data specialists" },
      { role: "Access-management partners" },
      { role: "Finance subject-matter experts and end users" },
    ],
    decisions: [
      {
        decision:
          "Repositioned the program from a single integrated application to a suite of independent finance products with a shared experience layer.",
        rationale:
          "The architecture and roadmap could not yet support the single-app promise. The reframe acknowledged the current technical reality while creating a credible path toward a more connected future — a common visual language, central discovery, and clear product relationships.",
        rejected: "continuing to describe the program as one integrated application",
        tradeoff:
          "Giving up the seamless-platform story meant the experience layer had to earn coherence through design — shared language, discovery, product relationships — rather than inherit it from architecture.",
      },
      {
        decision:
          "Designed the homepage as an app launcher and discovery hub, not a dashboard or catalog.",
        rationale:
          "Four tenets held the scope: modularity and scalability, discoverability, launcher-not-kitchen-sink, and a layout reflecting real usage patterns.",
        rejected: "a kitchen-sink catalog, or a complex dashboard",
        tradeoff:
          "Favorites, broader filtering, persistent cross-app launchers, and centralized notifications were intentionally deferred to a named roadmap rather than allowed to block the MVP.",
      },
      {
        decision: "Launched each product in its own tab, preserving its internal navigation.",
        rationale:
          "Launching independent apps in new tabs avoided cross-app token and authentication complexity, and let independently-built products keep shipping.",
        rejected: "embedding every product inside one shell",
        tradeoff:
          "The seams between products stay visible — the suite is coherent at the point of discovery, not continuous during use.",
      },
      {
        decision:
          "Personalized \u201cYour Apps\u201d from actual post-login access rather than promoting flagship products to everyone.",
        rationale:
          "Homepage personalization depended on knowing app access after login, and the area had to surface the products each person can actually use.",
        rejected: "a fixed layout over-prioritizing flagship applications",
      },
      {
        decision:
          "Required drivers to come from a structured catalog, under a formal Category \u2192 Driver \u2192 Anchor Signal hierarchy.",
        rationale:
          "The agent portfolio needed one object model for monitor configuration, signal selection, baselines, thresholds, and recurring briefings — overlapping language had made those undesignable.",
        rejected: "open-text user labels",
      },
      {
        decision:
          "Made agents confirm their understanding before producing a plan: understand, clarify, confirm assumptions, then plan and output.",
        rationale:
          "Systems were making silent assumptions without giving users a chance to correct them before a plan or result was produced — the core trust issue in the portfolio.",
        rejected: "answering immediately and letting users discover wrong assumptions in the output",
      },
      {
        decision:
          "Defined agent success as analyst behavior within 72 hours, not forecast accuracy.",
        rationale:
          "With domain experts, we established that useful outputs are directionally correct and within an order of magnitude — high/medium/low framing where exact estimates were not appropriate, and signal thresholds set where action is warranted (roughly 3% meaningful in one use case, 1% often noise). The question that matters: did the analyst run a scenario or start a leadership conversation.",
        rejected: "grading agents on forecast precision",
      },
      {
        decision:
          "Proceeded on documented access assumptions with explicit break-notification agreements, rather than waiting for the identity architecture to settle.",
        rationale:
          "The enterprise identity integration was unresolved and would have blocked design indefinitely. Writing the assumptions down — with agreement that design would be notified when one broke — kept the work moving without pretending the uncertainty away.",
        rejected: "pausing design until enterprise identity questions resolved",
        tradeoff:
          "Some access-dependent behavior may need rework when the architecture lands — accepted, and recorded, so design never stalled.",
      },
    ],
    // The states describe the governed analysis products inside the suite —
    // the craft depth beneath the program-level story above.
    states: [
      {
        state: "Partial or low-confidence AI output",
        userSees: "Visual indicator and explanation",
        recovery: "Option to proceed with review",
      },
      {
        state: "Failed Python or data operation",
        userSees: "Clear error, with work state preserved",
        recovery: "Retry and escalation path",
      },
      {
        state: "Missing permissions",
        userSees: "Blocked state with explanation",
        recovery: "Request-access path",
      },
      {
        state: "Blocked promotion",
        userSees: "Reason visible",
        recovery: "Checklist of unmet requirements",
      },
      {
        state: "Consequential multi-step workflow",
        userSees: "Pause, resume, and rollback controls",
        recovery: "Rollback to last approved state",
      },
      {
        state: "Anomaly detected in a figure",
        userSees:
          "Proactive notification to the accountable role, with variance, drivers, and affected records",
        recovery: "Drill into source data, or dismiss with a recorded reason",
      },
      {
        state: "Agent workflow interrupted mid-run",
        userSees: "Completed steps preserved and labelled, remaining steps held",
        recovery: "Resume, or roll back the run as a unit",
      },
    ],
    impact: {
      headline:
        "Established a shared experience model for a suite spanning data exploration, AI-assisted analysis, finance workflows, AI agents, audit tooling, and access management — and defined the homepage MVP, navigation scenarios, access assumptions, and phased roadmap in time for development within the same program increment.",
      organizational:
        "Reframed the product strategy around modularity, allowing teams to ship independently without losing the longer-term platform vision — and gave the program an operating model in which program-level experience leadership and application-level design ownership reinforce each other.",
      before:
        "Valuable finance products experienced as disconnected tools: no unified entry point, overlapping terminology, and an integration promise the architecture could not keep.",
      after:
        "A suite with an honest narrative and one front door: access-aware discovery, a shared taxonomy and component patterns, and AI interactions that confirm their assumptions before acting.",
      proof: [
        "Homepage established as the primary discovery mechanism for a flagship analysis product with a 250-user adoption target.",
        "Scaled the analysis platform from 10 pilot users to 300 through iterative testing, with enterprise adoption of 1,000+ planned.",
        "Agent success defined as analyst action within 72 hours — a scenario run or a leadership conversation — not forecast precision.",
        "Signal-interpretation thresholds set with domain experts: roughly 3% meaningful in one use case, 1% often noise.",
        "Research scaled from about four unique participants on key workflows to moderated studies drawing on a 32-analyst pool.",
        "Standardized patterns across divergent workflow products — headers, breadcrumbs, status badges, approval history — seeding a finance-wide component library.",
      ],
      metricStatus:
        "Adoption figures are targets unless stated as delivered. Program-internal dates and client financial figures are known but deliberately not published.",
    },
    reflection: {
      // [NEEDS SIGN-OFF] Authored from her portfolio-takeaway section; the
      // wouldChange paragraph is her own earlier reflection, kept verbatim.
      learned:
        "The most important design decision here was a sentence, not a screen: stop calling it one application. Once the narrative matched the architecture, everything else — the launcher, the taxonomy, the shared patterns — had a foundation that could not collapse under its own promise.",
      wouldChange:
        "Scaling taught the second lesson. Ten pilot users will tolerate ambiguity and ask a person when something looks wrong. Three hundred users will not, and at a thousand there is no person to ask. Everything that worked at pilot scale because someone could explain it had to become something the interface explained by itself.",
      principle: "Don\u2019t promise integration before it exists.",
    },
  },

  "connected-customer-journey": {
    snapshotFields: [
      { label: "Role", value: "Lead UX Designer" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      { label: "Status", value: "Completed, April 2025" },
      {
        label: "Team",
        value: "UX design, data science, marketing and CX, AI/NLP engineering, product owners",
      },
      { label: "Tools", value: "Figma, FigJam" },
      { label: "Users", value: "Marketing and CX teams, service agents, and product/data partners" },
    ],
    team: [
      { role: "UX Design" },
      { role: "Data Science" },
      { role: "Marketing and CX" },
      { role: "AI/NLP Engineering" },
      { role: "Front-end and back-end engineering" },
      { role: "Product Owners" },
    ],
    tldr: {
      challenge:
        "A telecommunications operator had predictive churn signals but no connected path from a signal to an action anyone could execute.",
      solution:
        "One end-to-end mitigation flow: churn detection, AI-assisted messaging, and human review in a single journey, with an AI chatbot handling routine cases and escalating to a person when sentiment called for it.",
      result:
        "Turned a model score into a reviewed, edited, and launched action, with monitoring built in and human review required before anything reached a customer.",
    },
    // No churn, conversion, or revenue metric is verified for this engagement
    // (see impact.metricStatus), so the band carries countable design outputs
    // instead: the flow itself, the surfaces in `images`, and the review rule.
    stats: [
      { value: "0 → 1", label: "End-to-end mitigation flow, designed from scratch" },
      {
        value: "6",
        label:
          "Connected surfaces: dashboard, journey exploration, segment-of-one timeline, mitigation plan, customer chatbot, representative view",
      },
      { value: "Required", label: "Human review before any AI message reached a customer" },
    ],
    overview:
      "As Lead UX Designer at Amdocs Studios, I implemented the product vision for a connected customer journey at a telecommunications operator that had predictive churn signals but no way to act on them. I worked with engineering, product, and the client's customer teams, and ran the user research that tested the hypothesis behind the vision and gave shape to both the user problems and the solutions. I designed the flow end to end across the three roles it touches \u2014 the analyst who sees the risk, the customer who lives it, and the service representative who resolves it \u2014 from a risk signal, through the context and options a person needs, to a reviewed message and the monitoring that followed it.",
    leadership: [
      {
        kind: "Product strategy",
        title: "Reframed the score as decision support",
        detail:
          "Paired predictions with lifecycle stage, behavior, sentiment, and available actions, rather than presenting an opaque score as a final answer.",
      },
      {
        kind: "Product strategy",
        title: "Held the line on human control",
        detail:
          "Required users to review and edit AI-assisted communication before it reached a customer, across every channel in the journey.",
      },
      {
        kind: "Design",
        title: "Designed the mitigation flow",
        detail:
          "Risk detection, context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
      },
      {
        kind: "Design",
        title: "Designed the platform surfaces",
        detail:
          "Dynamic segmentation, churn signals, sentiment and NPS health, AI-assisted messaging, offer customization, and performance monitoring.",
      },
    ],
    solutionSteps: [
      {
        title: "Detect the risk",
        points: [
          "The dashboard leads with the business metrics already at risk or predicted to be, each carrying why it is at risk and a direct path to mitigate it",
          "Segments are built dynamically from churn-risk criteria \u2014 issues, historic behavior, likelihood to churn \u2014 rather than maintained as static lists",
        ],
        images: [
          {
            src: ccjDashboard,
            fullSrc: ccjDashboardFull,
            width: 1600,
            height: 1024,
            alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
            caption:
              "Analyst dashboard surfacing at-risk KPIs alongside ARPU, NPS, retention, and campaign performance, with a direct path to mitigate a flagged risk.",
          },
        ],
      },
      {
        title: "Explain the drop-off",
        points: [
          "Journey exploration shows where customers actually fail, split by entry channel, with the churned and successfully continued share on each path",
          "A segment-of-one timeline replays one customer's events against their churn risk, so the pattern and the person stay connected",
        ],
        images: [
          {
            src: ccjJourneyExplorations,
            fullSrc: ccjJourneyExplorationsFull,
            width: 2400,
            height: 1531,
            alt: "Journey exploration diagram mapping top-up failure paths from mobile app, SMS, and IVR entry points, with churn and successful-continuation percentages at each branch.",
            caption:
                "Top-up failures churn differently by channel — mobile app, SMS, IVR — so mitigation targets the worst path, not every failure equally.",
          },
          {
            src: ccjSegmentOfOne,
            fullSrc: ccjSegmentOfOneFull,
            width: 2400,
            height: 1536,
            alt: "Single-customer journey timeline showing network experience index, top-up, SMS campaign, and promo events across five days, with a high churn-risk badge.",
            caption:
                "One customer's journey on a timeline — a flagged risk resolves to real events before anyone chooses a mitigation.",
          },
        ],
      },
      {
        title: "Decide with evidence",
        points: [
          "The mitigation plan pairs the KPI at risk with its key drivers and one recommended next action",
          "Each offer starts as a hypothesis, testable in a what-if analysis tool before anything is deployed",
          "AI drafts a message against a selected audience and tone; the person reviews and edits the live preview before it goes out",
        ],
        images: [
          {
            src: ccjMitigationPlan,
            fullSrc: ccjMitigationPlanFull,
            width: 1600,
            height: 1547,
            alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
            caption:
                "The KPI's key drivers beside an AI-drafted, tone-controlled offer — a person edits the preview before anything launches.",
          },
        ],
      },
      {
        title: "Act and monitor",
        points: [
          "A chatbot handles routine cases and hands off to a representative when sentiment analysis and account context call for a person",
          "The representative works from an AI-generated customer summary and suggested course of action, with access to offers the automated system does not yet hold",
          "A declined offer loops back to adjustment rather than ending in a dead end",
        ],
        images: [
          {
            src: ccjChatExpanded,
            fullSrc: ccjChatExpandedFull,
            width: 1600,
            height: 1024,
            alt: "Customer service representative interface with an expanded chat panel showing an AI-generated customer summary and suggested course of action alongside the live conversation.",
            caption:
                "An AI summary and suggested action beside the live conversation — assistance in view, the representative in control.",
          },
        ],
      },
    ],
    context:
      "A telecommunications operator needed to turn predictive signals into action across several channels: analysts, service teams, an AI layer, and the partner systems feeding it. I designed the connected journey that tied them together, from detection through human reviewed action to launch and monitoring.",
    // Signed off by Anastasia 2026-08-26.
    turn:
      "The project reset partway through. We had been treating the churn prediction as the answer: surface the score, recommend an action, done. It isn't an answer. The reset came when we started treating a prediction as the opening of a decision a person still had to make — with the customer's context beside it, options to compare, and the ability to edit anything AI drafted before a customer ever saw it. Every surface got rebuilt around that.",
    evidence: {
      body:
        "I ran user research against the hypothesis behind the product vision: that a predictive churn signal changes nothing unless the person responsible for the customer can see why it fired and act on it without leaving the context. The research validated that hypothesis and gave shape to both the problems below and the surfaces that answered them.",
      findings: [
        {
          finding:
            "Behavioral data, customer feedback, NPS, campaign information, and journey touchpoints were not presented as one decision context.",
          response:
            "Customer and segment health needed a connected view rather than another isolated dashboard.",
        },
        {
          finding: "Static segments could not reflect changing behavior or lifecycle stage.",
          response:
            "Segment membership, defining signals, risk, and change over time needed to be visible.",
        },
        {
          finding: "A churn score did not explain what happened or what a team should do next.",
          response:
            "Predictive risk had to sit beside behavior, sentiment, journey context, and available actions.",
        },
        {
          finding:
            "Failures concentrated in specific journey paths \u2014 a repeated top-up failure in the app, or that same failure diverted to the phone system \u2014 but no view showed which path a customer had taken.",
          response:
            "Journey exploration had to show the churned and continued share on each channel path, not a single aggregate rate.",
        },
        {
          finding: "AI-assisted messages and offers could affect the customer relationship.",
          response:
            "Marketing, CX, and service users needed to review and adjust the response before launch.",
        },
      ],
      insight:
        "Predictive insight creates value only when the people responsible for the customer can understand the signal and act without losing its context.",
    },
    owned: [
      "Designed the data-driven journey platform connecting dynamic segmentation, predictive churn signals, sentiment and NPS health, AI-assisted messaging, offer customization, and performance monitoring.",
      "Turned model output into decision support: predictions paired with customer context, lifecycle stage, behavior, sentiment, and available actions, not an opaque score presented as a final answer.",
      "Created the end-to-end mitigation flow: risk detection, context review, human-selected action, message or offer adjustment, launch, monitoring, iteration.",
      CCJ_HUMAN_REVIEW,
    ],
    // Condensed from the `owned` items above; wording drawn from them.
    ownedThemes: [
      {
        label: "The journey platform",
        detail:
          "Connected dynamic segmentation, predictive churn signals, sentiment and NPS health, AI-assisted messaging, offer customization, and performance monitoring into one data-driven platform.",
      },
      {
        label: "Model output as decision support",
        detail:
          "Paired predictions with customer context, lifecycle stage, behavior, sentiment, and available actions, rather than presenting an opaque score as a final answer.",
      },
      {
        label: "The end-to-end mitigation flow",
        detail:
          "Risk detection, context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
      },
      {
        label: "Human control over AI messaging",
        detail:
          "Required users to review and edit AI-assisted communication before it reached a customer.",
      },
    ],
    decisions: [
      {
        decision:
          "Built customer segments dynamically from churn-risk criteria: issues, historic behavior, likelihood to churn.",
        rationale:
          "The model stayed correlated with real journey data instead of a one-time snapshot.",
        rejected: "static lists",
      },
      {
        decision: "Treated each offer as a hypothesis first, with a what-if analysis tool.",
        rationale:
          "Analysts could adjust inputs and watch the model's inference and recommended offer update in response, refined over time by a human-feedback loop.",
      },
      {
        decision:
          "Routed customers to an AI chatbot first, transferring to a human customer service representative only when sentiment analysis and account context indicated the interaction needed a person.",
        rationale:
          "Routine requests stayed fast while the moments that needed empathy were protected.",
      },
    ],
    states: [
      {
        state: "High-churn-risk customer",
        userSees:
          "A prompt to draft an empathetic, tone-matched message with generative AI, based on the specific triggers detected rather than a generic response",
      },
      {
        state: "Representative needs to go further than the model recommends",
        userSees: "Access to additional offers the automated system doesn't yet know about",
      },
      {
        state: "Reviewing a case mid-conversation",
        userSees:
          "The customer's personal file, offer history, and a summarized view of prior offer variations, without leaving the chat",
      },
      {
        state: "Offer declined or resolution unsuccessful",
        recovery: "Loops back to offer adjustment rather than ending in a dead end",
      },
    ],
    // Ordered as the solution argues: detect (dashboard) -> decide (mitigation
    // plan, journey explorations) -> act (the representative's chat).
    // The working end-to-end flow, kept from the live site in its own deep-dive
    // container rather than the solution gallery. Caption is the original.
    processImages: [
      {
        src: ccjUserFlow,
        fullSrc: ccjUserFlowFull,
        width: 2400,
        height: 1787,
        alt: "User flow diagram for the connected customer journey, showing an analyst path from dashboard alert through offer generation, a customer journey path from risk event through AI chatbot and human customer-service handoff, and a customer-service representative path ending in resolution.",
        caption:
          "End-to-end flow: from churn-risk detection and segment creation, through AI chatbot and human customer-service handoff, to offer resolution and monitoring.",
      },
    ],
    impact: {
      headline:
        "Designed an end-to-end mitigation flow that turned a model score into a reviewed, edited, and launched action, with monitoring built in.",
      user:
        "Human review of AI-assisted messaging was required before anything reached a customer.",
      organizational:
        "Marketing, CX, and service teams gained a shared interaction model for moving from journey evidence to a human-reviewed response across acquisition, retention, and loyalty.",
      before: "Fragmented customer signals and cross-tool handoffs.",
      after:
        "One workflow where teams could detect risk, understand the surrounding behavior and sentiment, choose a mitigation action, review the message or offer, and monitor the response.",
      proof: [
        "Made journey drop-offs and churn risk visible beside customer context.",
        "Translated predictive models into decision support for non-technical users.",
        "Connected AI-assisted messaging and personalized offers to human review.",
        "Defined a learning loop for monitoring and adjusting offers based on customer response.",
      ],
      metricStatus:
        "No churn-reduction, conversion, adoption, or revenue metric is presented because those outcomes are not verified in the project record.",
    },
    reflection: {
      learned:
        "The project reset once we stopped treating the churn prediction as the answer and started treating it as the opening of a decision the representative still had to make, with context, options, and a way to edit anything AI suggested before it reached a customer.",
      principle: "A model score is not a decision.",
    },
  },

  "auditable-billing-workflow": {
    snapshotFields: [
      { label: "Role", value: "Lead Designer, then Design Lead and UX / Product Strategy Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025, one-year engagement" },
      { label: "Status", value: "Completed" },
      {
        label: "Team",
        value: "Chief Data Office, product, engineering, UI development, finance stakeholders",
      },
      { label: "Tools", value: "Figma, FigJam" },
      { label: "Users", value: "Admins, accountants, and engineers managing multiple projects and billing packages" },
      { label: "Adoption", value: "100-user target, reached" },
    ],
    team: [
      { role: "Chief Data Office" },
      { role: "Principal designer (early phase, before I took over design leadership)" },
      { role: "Product" },
      { role: "Front-end and back-end engineering" },
      { role: "Finance and operations stakeholders" },
    ],
    tldr: {
      challenge:
        "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed.",
      solution:
        "A guided B2B workflow with a shared status model, role-based permissions, and a full audit trail replacing manual, ownerless assembly.",
      result:
        "Unblocked recovery of the billing backlog with a first MVP for project querying and package assembly, then shipped the dashboard, in-product editing, and the review process over a one-year engagement, reaching the 100-user adoption target.",
    },
    // Backlog volume and handoff time are unverified (see impact.metricStatus).
    // The counts below come from the status model and the operational flow.
    stats: [
      { value: "100", label: "User adoption target, reached" },
      { value: "12 of 21", label: "Must-have features shipped against the team-approved prioritization" },
      { value: "6", label: "Shared status states, Initiated through Completed" },
    ],
    overview:
      "At Amdocs Studios I joined this telecommunications engagement as lead designer working alongside a principal designer, then took over design leadership when the principal rolled off. The goal was to replace manual billing-package assembly with a guided workflow: work was disappearing mid-process because no single role owned it and no shared vocabulary existed for where a package was. I set the product vision, ran feature prioritization, designed the flow, status model, and recovery paths, and coordinated stakeholders with front-end and back-end engineering through testing, UAT, and the backlog. The application reached its 100-user adoption target.",
    leadership: [
      {
        kind: "Product strategy",
        title: "Defined the shared status model",
        detail:
          "Initiated, In Progress, Review, Approved, Finalized, Completed — with permissions, ownership, notifications, activity history, and audit-trail concepts.",
      },
      {
        kind: "Product strategy",
        title: "Ran feature prioritization with the team",
        detail:
          "Sorted the feature set into Must Have, Should Have, and Nice to Have across six areas — System, Package Creation, Configuration, Workflow Management, Review, and Generation — took it to team approval, then tracked each item's ship status against that grid.",
      },
      {
        kind: "Team leadership",
        title: "Took over design leadership mid-engagement",
        detail:
          "Stepped up from lead designer when the principal designer rolled off, coordinating stakeholders and front-end and back-end engineering, and owning testing, UAT, and backlog items through delivery.",
      },
      {
        kind: "Team leadership",
        title: "De-scoped what wasn't feasible",
        detail:
          "Surfaced the dashboard dependency and moved it into a visible backlog rather than compromising the active release, protecting the billing workflow that was feasible.",
      },
      {
        kind: "Design",
        title: "Mapped the operational flow",
        detail:
          "Across admins, accountants, engineers, owners, and reviewers — including missing evidence, failed automation, validation, handoffs, and recovery without loss of progress.",
      },
      {
        kind: "Design",
        title: "Designed the guided workflow",
        detail:
          "Project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion in one flow.",
      },
    ],
    solutionSteps: [
      {
        title: "Query and assemble",
        points: [
          "The project number is the package's primary key, so resuming is never mistaken for starting over",
          "Progressive validation flags missing data early and preserves progress when a dependency fails",
        ],
      },
      {
        title: "Review as its own state",
        points: [
          "A reviewer starts a session, makes inline edits with save or discard, and submits with a git-style commit message",
          "Everyone else sees view-only access until the review completes, so no one edits mid-review",
        ],
      },
      {
        title: "Finalize with a trail",
        points: [
          "Role-based access is a flow branch, not a permissions afterthought",
          "Ownership, package state, action history, and review handoffs stay visible to every role",
        ],
      },
    ],
    context:
      "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed. Work disappeared mid-process and nobody could tell where it had gone. Assembling a single billing package meant manually pulling project data, screenshots, and invoices from multiple systems with no shared status model or audit trail.",
    // [NEEDS SIGN-OFF] The turn (messy middle), told first-person. Drawn from
    // this study's own decisions/reflection — no new claims.
    turn:
      "Mid-delivery, the plan lost its dashboard. The planned reporting dashboard turned out not to be feasible inside the release's technical scope, and forcing it in would have put the billing workflow — the thing recovering actual revenue — at risk. I surfaced the dependency, moved the dashboard into a visible backlog, and kept the release on the work that was feasible. Protecting the core flow cost us the most demo-friendly screen.",
    evidence: {
      findings: [
        {
          finding:
            "A backlog of unprocessed billable work depended on information spread across feeder systems, ledger data, screenshots, PDFs, and spreadsheets.",
          response:
            "The product had to coordinate the whole package, not optimize a single screen or document.",
        },
        {
          finding:
            "Missing screenshots could stop package assembly after work was already underway.",
          response:
            "Retrieval failures needed preserved progress, a visible error state, and a recovery action.",
        },
        {
          finding: "Package creators and reviewers had different responsibilities.",
          response:
            "Ownership, review tasks, permissions, handoffs, and status history needed to be explicit.",
        },
        {
          finding:
            "Direct editing and a planned dashboard were not feasible within the immediate technical scope.",
          response:
            "The release needed an interim editing path and a smaller operational workflow without erasing future opportunities.",
        },
      ],
      insight:
        "The workflow could recover billable work only if it made dependencies, responsibility, and recovery visible before submission, not after a package failed.",
    },
    owned: [
      "Led a guided B2B workflow replacing fragmented billing-package assembly, spanning project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion.",
      BILLING_OPERATIONAL_FLOW,
      BILLING_STATUS_MODEL,
      "Partnered with engineering and UI development during implementation, moving unsupported dashboard functionality into a visible future backlog instead of compromising the active release.",
      "Delivered the first MVP for interface and project querying, then the dashboard, in-product editing, and the review process across a one-year engagement, leaving whole-package automation as the named next phase.",
    ],
    // Condensed from the `owned` items above; wording drawn from them.
    ownedThemes: [
      {
        label: "The guided workflow",
        detail:
          "Replaced fragmented billing-package assembly with one B2B flow spanning project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion.",
      },
      {
        label: "The operational map",
        detail:
          "Mapped the flow across admins, accountants, engineers, owners, and reviewers — including missing evidence, failed automation, validation, handoffs, and recovery without loss of progress.",
      },
      {
        label: "A reusable status model",
        detail:
          "Initiated, In Progress, Review, Approved, Finalized, Completed — with permissions, ownership, notifications, activity history, UAT sign-off, and audit-trail concepts.",
      },
      {
        label: "Delivery partnership",
        detail:
          "Partnered with engineering and UI development during implementation, moving unsupported dashboard functionality into a visible backlog instead of compromising the active release.",
      },
      {
        label: "MVP through completion",
        detail:
          "Delivered the first MVP for interface and project querying, then the dashboard, in-product editing, and the review process across a one-year engagement, leaving whole-package automation as the named next phase.",
      },
    ],
    decisions: [
      {
        decision: "Modeled role-based access as a first-class flow branch.",
        rationale:
          "Admins, accountants, engineers, and collections could create packages, while a view-only report role and an engineer-specific one-time report view kept read access scoped to what each role actually needed.",
        rejected: "a permissions afterthought",
      },
      {
        decision:
          "Made billing-package identity explicit: the package's primary key is the project number.",
        rationale:
          "The system could tell the difference between resuming a previously created package and starting a new one.",
        rejected: "silently duplicating work",
      },
      {
        decision:
          "Built review as its own state machine: a reviewer starts a session, makes inline edits with save or discard, and submits with a git-style commit message.",
        rationale: "Changes stayed traceable and reversible before a package was finalized.",
      },
      {
        decision: "Used progressive validation as users moved through package building.",
        rationale:
          "Immediate feedback when required data was missing, clear loading and retrieval states, recovery actions for failed screenshot generation, and preserved progress when one dependency failed made the workflow error tolerant and reduced the likelihood that defects would surface only at the end.",
        rejected: "waiting until final submission to reveal missing data or evidence",
      },
      {
        decision: "Preserved an interim editing path through Excel.",
        rationale:
          "Direct editing was not feasible within the first release's technical constraints, so Excel stayed as a temporary editing mechanism until in-product editing of package, project, and customer details shipped in the review phase.",
        rejected: "shipping an incomplete in-product editor that did not meet the technical constraints",
        tradeoff:
          "A deliberate product tradeoff: preserve operational continuity now while designing a more integrated future state.",
      },
      {
        decision: "De-scoped the planned dashboard without losing the opportunity.",
        rationale:
          "The dashboard was not feasible for the first release. I surfaced the dependency and moved it out of that scope while keeping it in the backlog; it was prioritized as a must-have in the next phase and shipped.",
        rejected:
          "forcing the unsupported dashboard into the current scope and putting the feasible billing workflow at risk",
      },
      {
        decision: "Prioritized by feature area, not by screen.",
        rationale:
          "The prioritization grid grouped features by the part of the process they served — system integrations, package creation, configuration, workflow management, review, and generation — so the must-have column read as a working end-to-end process rather than a list of screens. Whole-package automation and section export were held as the final area so the manual path shipped first, and the exercise surfaced a labor-hours generation need that had not previously been identified.",
        rejected: "prioritizing individual screens in isolation, which hides whether the process works end to end",
      },
    ],
    states: [
      {
        state: "Invalid or unmatched project number entered",
        userSees: "Explicit error state before any billing package is created",
      },
      {
        state: "Billing package primary key not found",
        recovery: "Routes to creating a new billing package instead of failing silently",
      },
      {
        state: "Automation or feeder-system failure",
        userSees: "Work in progress is preserved rather than lost",
        recovery: "Clear retry path",
      },
      {
        state: "Review in progress",
        userSees:
          "All other users see view-only access until the review is complete, so no one edits a package mid-review",
      },
      {
        state: "Discarded inline edit",
        recovery: "Reverts cleanly without affecting the rest of the package",
      },
    ],
    // The MVP2 scope workshop board, moved out of the solution gallery: a
    // process artifact, and its full-resolution board carries internal release
    // targets — behind a click here rather than on the page.
    processImages: [
      {
        src: cwoCreationFlow,
        fullSrc: cwoCreationFlowFull,
        width: 8818,
        height: 1862,
        alt: "Billing package creation flow diagram showing role-based branching for admin, accountant, engineer, collections, and view-only report roles, from sign-in through review, export, and finalization.",
        caption:
          "Creation flow: role-based branching from sign-in through review, export, and finalization.",
      },
      {
        src: cwoStrategyAlignment,
        fullSrc: cwoStrategyAlignmentFull,
        width: 2600,
        height: 661,
        alt: "MVP2 scope-definition workshop board showing goals and outcomes, feature prioritization by must-have, should-have, and nice-to-have, and entity relationships between agreement, billing invoice, project, and vendor invoice.",
        caption:
          "MVP2 scope-definition workshop: goals and outcomes, the team-approved must/should/nice prioritization across six feature areas with shipped items marked, and the entity relationships used to plan the next phase.",
      },
    ],
    images: [
      {
        src: cwoMvp1Workflow,
        fullSrc: cwoMvp1WorkflowFull,
        width: 4174,
        height: 2592,
        alt: "MVP1 user flow diagram showing a user searching a project number, the system matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
        caption:
          "The project number is the package's primary key — resuming is never mistaken for starting over.",
      },
      {
        src: cwoFlow,
        fullSrc: cwoFlowFull,
        width: 6368,
        height: 2536,
        alt: "Review flow diagram showing a reviewer starting a review, making inline edits with save or discard options, completing the review, and submitting with a git-style commit message.",
        caption:
          "Review as its own state machine — inline edits, save or discard, and a commit message before anything is finalized.",
      },
    ],
    impact: {
      headline:
        "The first MVP unblocked recovery of the backlog of unprocessed billable work by giving the team a usable interface for project querying and package assembly.",
      business:
        "The application reached its 100-user adoption target.",
      organizational:
        "Defined a status model that made ownership and handoffs explicit, and shipped the review process on top of it; whole-package automation was left as the named next phase.",
      before:
        "Billable work accumulated across fragmented systems, files, screenshots, spreadsheets, and manual handoffs.",
      after:
        "A stepwise workflow coordinated package creation, progressive validation, recovery, ownership, review, status, and history.",
      proof: [
        "Completed the first MVP for interface and project querying.",
        "Reached the 100-user adoption target.",
        "Shipped 12 of the 21 team-approved must-have features, covering package creation, workflow management, and review.",
        "Shipped the dashboard, in-product editing, and the review process in later phases of the one-year engagement.",
        "Added recoverable screenshot-generation and validation patterns.",
        "Reused role, review, submit, and status patterns across the workflow.",
        "Made ownership, package state, action history, and review handoffs visible.",
      ],
      metricStatus:
        "The recovered backlog and the 100-user adoption target are the outcomes available in the project record; the 12-of-21 count is read from the feature-prioritization board. Exact backlog volume, defect reduction, handoff time, and final release dates are not verified and are not stated.",
    },
    reflection: {
      learned:
        "Once every role shared one vocabulary for where a package was, Initiated, In Progress, Review, Approved, Finalized, Completed, the \"where did the work go\" problem largely dissolved. The interface was almost downstream of getting that shared language right.",
      principle: "Most of the value came from the status model, not the screens.",
    },
  },

  "enterprise-document-knowledge": {
    snapshotFields: [
      { label: "Role", value: "UX and Product Strategy Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025" },
      { label: "Status", value: "Multi-phase accelerator and product-development work" },
      {
        label: "Team",
        value: "Design, product, engineering, research, client stakeholders",
      },
      { label: "Users", value: "Enterprise business users, Corporate Communications, Risk and Compliance" },
    ],
    team: [
      { role: "Design" },
      { role: "Product" },
      { role: "Engineering" },
      { role: "Research" },
      { role: "Client stakeholders" },
    ],
    tldr: {
      challenge:
        "AI could summarize internal documents quickly, but users still needed to verify sources, understand document scope, and compare conflicting information.",
      solution:
        "Keep chat and source material together, make citations navigational, expose document selection, and support table and side-by-side comparison.",
      result:
        "Research changed the navigation, document-selection, comparison, guardrail, and synthesis recommendations and unblocked a phased path from sourced Q&A to multi-document analysis and drafting.",
    },
    // Adoption and efficiency are unattributed (see impact.metricStatus), so the
    // band counts what research and the design actually produced.
    stats: [
      { value: "4", label: "Research findings that changed the product direction" },
      { value: "2", label: "Comparison modes kept: side-by-side and table" },
      { value: "1", label: "Workspace where chat and source documents stay together" },
    ],
    overview:
      "As UX and Product Strategy Lead at Amdocs Studios, I led the research and product direction for an enterprise AI platform where business units get their own toolbox on centrally maintained rails. Users could get AI-generated answers but had no way to verify them. I ran the research program that changed the navigation, selection, and comparison model, and specified the phased build that followed.",
    leadership: [
      {
        kind: "Team leadership",
        title: "Facilitated requirements and prioritization",
        detail:
          "Translated feature requests into capabilities, flows, and phased backlogs with client stakeholders and product.",
      },
      {
        kind: "Research",
        title: "Defined the research program",
        detail:
          "Set research protocols and usage metrics, and coordinated mixed-method usability and targeted inquiry across the phases.",
      },
      {
        kind: "Research",
        title: "Synthesized findings into direction",
        detail:
          "Used affinity mapping to group observations, then turned them into product recommendations, feature priorities, and reusable interaction patterns.",
      },
      {
        kind: "Design",
        title: "Specified the build",
        detail:
          "Converted wireframes into product requirements, roadmaps, test plans, and development-ready stories aligned with the enterprise design system.",
      },
    ],
    solutionSteps: [
      {
        title: "Ask in context",
        points: [
          "A persistent, context-aware chat sits alongside the document content, not in place of it",
          "Document selection is visible product state, so users know what the answer is drawn from",
        ],
      },
      {
        title: "Verify without leaving",
        points: [
          "Citations are navigation: a generated statement links to its source in the embedded viewer",
          "Source scope and the original documents stay visible throughout the workflow",
        ],
      },
      {
        title: "Compare and continue",
        points: [
          "Two modes: side-by-side for nuanced reading, tables for scanning structured differences",
          "Switching sources preserves conversational context; saving stays an intentional privacy action",
        ],
      },
    ],
    context:
      "Traditional enterprise search could retrieve documents, but users still had to open files individually, locate relevant sections, reconcile differences, and manually create a summary. An LLM could accelerate that work, but it introduced new risks: generated answers could lose their connection to source material, users could not easily compare several documents at once, switching files could disrupt conversational context, and sensitive information required privacy-aware behavior. The design question became how to help enterprise users move from retrieval to verified understanding without hiding the documents behind the AI.",
    // [NEEDS SIGN-OFF] The turn (messy middle), told first-person. Drawn from
    // this study's own decisions/reflection — no new claims.
    turn:
      "Testing broke our navigation. The prototype moved between documents with tabs; in sessions, people lost track of which documents an answer was drawing from — trust evaporated at exactly the moment the product promised verification. We rebuilt around explicit document selection and side-by-side comparison, and kept every citation one interaction away from its source.",
    processImages: [
      {
        src: diUserFlows,
        fullSrc: diUserFlowsFull,
        width: 9000,
        height: 2196,
        alt: "End-to-end user flow diagram. A landing path leads into company knowledge, then a chat session where a prompt returns an LLM response with listed citations and sources, opening a document in place or in an external tab. A wider end-to-end comparison flow runs from a new chat through selecting general knowledge, company knowledge, or personal files, choosing a docs, data, or workflow domain, and starting a chat that branches into asking a question, comparing documents, finding a document, or creating a draft, then searching and selecting files, returning a summary response with follow-up prompts and feedback, and ending in viewing the document, a diff, or a table.",
        caption:
          "End-to-end flow: choosing a domain before the chat begins scopes every session to a known set of company sources, so asking, comparing, finding, and drafting all resolve back to listed citations and the original document.",
      },
        ],
    visualsPendingNote:
      "The side-by-side comparison view — abstracted for confidentiality — is in production. Structure and outcomes are accurate.",
    evidence: {
      body:
        "I led or contributed to research planning, protocol development, stakeholder alignment, execution guidance, and synthesis. Research evaluated pattern clarity, trust and interpretability, feature discoverability, document selection, navigation across tabs or views, comparison preferences, and guardrails and source verification. I used affinity mapping to group observations and translated the findings into product recommendations, feature priorities, and reusable interaction patterns.",
      findings: [
        {
          finding: "Tabs and document-selection behavior caused confusion.",
          response: "Keep selected-document state explicit and make source context more persistent.",
        },
        {
          finding: "Side-by-side comparison was positively received for nuanced reading.",
          response:
            "Preserve side-by-side comparison instead of relying only on a normalized table.",
        },
        {
          finding: "Summarization tables helped users scan structured differences.",
          response:
            "Keep tables as a complementary comparison mode rather than treating the two patterns as interchangeable.",
        },
        {
          finding: "Users needed clearer guardrails around AI-generated information.",
          response:
            "Keep citations, source scope, and original documents visible throughout the workflow.",
        },
      ],
      insight:
        "Evidence cannot be a final-step disclaimer. Users need to see which documents are active, move from a generated statement to its source, and compare alternatives without losing their place.",
    },
    owned: [
      "Facilitated requirements and prioritization workshops.",
      "Translated feature requests into capabilities, flows, and phased backlogs.",
      "Converted wireframes into product requirements, roadmaps, test plans, and development-ready stories.",
      "Defined research protocols and usage metrics.",
      "Coordinated mixed-method usability and targeted inquiry.",
      "Synthesized findings into actionable recommendations.",
      "Supported testing, development, and backend-integration discussions.",
      "Created scalable patterns aligned with the enterprise design system.",
    ],
    // Condensed from the `owned` items above; wording drawn from them. The
    // eight original items were short and sequential, so they group into five.
    ownedThemes: [
      {
        label: "Requirements and prioritization",
        detail:
          "Facilitated requirements and prioritization workshops, translating feature requests into capabilities, flows, and phased backlogs.",
      },
      {
        label: "Specification for delivery",
        detail:
          "Converted wireframes into product requirements, roadmaps, test plans, and development-ready stories.",
      },
      {
        label: "Research design and synthesis",
        detail:
          "Defined research protocols and usage metrics, coordinated mixed-method usability and targeted inquiry, and synthesized findings into actionable recommendations.",
      },
      {
        label: "Implementation support",
        detail: "Supported testing, development, and backend-integration discussions.",
      },
      {
        label: "Scalable design patterns",
        detail: "Created scalable patterns aligned with the enterprise design system.",
      },
    ],
    decisions: [
      {
        decision: "Treated citations as navigation, not decoration.",
        rationale:
          "Citations needed to help users verify the answer immediately. I connected generated statements to source references and the embedded viewer so evidence remained one interaction away.",
      },
      {
        decision: "Kept documents and chat visible together.",
        rationale:
          "The workspace used a persistent, context-aware chat alongside document content. Users could inspect the source, ask a follow-up question, and continue the same line of inquiry without repeatedly switching contexts.",
      },
      {
        decision: "Offered two comparison modes.",
        rationale:
          "A table supports attribute-by-attribute scanning; side-by-side documents support contextual reading and nuanced differences.",
        rejected: "relying only on a normalized table",
        tradeoff:
          "Research feedback favored side-by-side comparison, while summarization tables remained useful for structured synthesis, so both patterns had to be maintained rather than one.",
      },
      {
        decision: "Made document selection explicit.",
        rationale:
          "Users needed to understand which documents were included in the current answer or comparison, so I treated selection as visible product state.",
        rejected: "hidden retrieval logic",
      },
      {
        decision: "Preserved context while switching sources.",
        rationale:
          "The platform concept let users move between selected documents without losing conversational context, source references, search history, or their place in the workflow.",
      },
      {
        decision: "Made saving an intentional privacy action.",
        rationale:
          "The privacy-first direction avoided retaining user data without an explicit save, giving users clearer control over what became persistent history.",
        rejected: "retaining user data without an explicit save",
      },
    ],
    impact: {
      headline:
        "Research gave the team a defensible path from sourced question answering to multi-document comparison and drafting, with concrete changes to navigation, selection, guardrails, and synthesis.",
      before:
        "A backlog of AI and document features with confusing source selection and no single interaction model for verification.",
      after:
        "A phased knowledge-work experience linking sourced answers, embedded documents, explicit selection, comparison, and drafting.",
      proof: [
        "Research changed the navigation and document-selection recommendations.",
        "Side-by-side comparison was retained for nuanced reading, with tables kept for structured synthesis.",
        "Citations and the embedded viewer became connected verification interactions.",
        "Living backlogs, roadmaps, and test plans connected the research direction to delivery planning.",
      ],
      metricStatus:
        "No revenue, adoption, or efficiency metric is included because attribution and shipment status are not verified.",
    },
    reflection: {
      learned:
        "A citation icon is not sufficient; users need to see which sources are active, move directly to evidence, compare alternatives, and understand when the system is synthesizing rather than retrieving.",
      principle: "Trust in enterprise AI is built through interaction structure.",
    },
  },
};
