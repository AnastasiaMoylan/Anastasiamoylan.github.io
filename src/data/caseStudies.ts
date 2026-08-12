import {
  FINANCE_PRODUCT_MODEL,
  FINANCE_RESEARCH_ARTIFACTS,
  BILLING_OPERATIONAL_FLOW,
  BILLING_STATUS_MODEL,
  CCJ_HUMAN_REVIEW,
} from "./ownedStatements";
// Case study content, keyed by project slug.
//
// Shape follows the Case Study Framework's ten beats, rendered in three acts:
// Frame (snapshot, TL;DR, context) -> Think (evidence, role, decisions, states)
// -> Land (execution, impact, reflection).
//
// Optional fields render nothing when absent, so a study can ship partially
// filled rather than showing empty labels.

// `?preview` yields a downscaled WebP for inline display (see vite.config.ts);
// the plain import is the full-resolution original used by the lightbox.
import financeAIFlow from "../imports/Finance_AI_Transformation_-_End-to-End_Flow.png?preview";
import financeAIFlowFull from "../imports/Finance_AI_Transformation_-_End-to-End_Flow.png";
import ccjUserFlow from "../assets/case-studies/ccj/user-flow.jpg?preview";
import ccjUserFlowFull from "../assets/case-studies/ccj/user-flow.jpg";
import ccjDashboard from "../assets/case-studies/ccj/dashboard-performance.jpg?preview";
import ccjDashboardFull from "../assets/case-studies/ccj/dashboard-performance.jpg";
import ccjMitigationPlan from "../assets/case-studies/ccj/mitigation-plan.jpg?preview";
import ccjMitigationPlanFull from "../assets/case-studies/ccj/mitigation-plan.jpg";
import ccjChatExpanded from "../assets/case-studies/ccj/chat-expanded.png?preview";
import ccjChatExpandedFull from "../assets/case-studies/ccj/chat-expanded.png";
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
 * `kind` splits direction from craft: every case study here was led, and the
 * split is what shows a reader that the same person set the model and drew the
 * screens. Condensed from `ownedThemes`; the fuller list still renders in the
 * deep dive.
 */
export interface LeadershipPoint {
  kind: "Direction" | "Hands on";
  title: string;
  detail: string;
}

/** One stage of the solution, carrying two supporting points at most. */
export interface SolutionStep {
  title: string;
  points: string[];
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
  "finance-cloud": {
    snapshotFields: [
      { label: "Role", value: "Lead UX / Product Designer" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2024–Present" },
      { label: "Status", value: "Working POC delivered; scaled pilot in progress" },
      {
        label: "Users",
        value:
          "Accountants, analysts, managers and controllers, finance leaders, admins, and viewers",
      },
      // No "Team" field here: SnapshotCard renders the `team` array below as its
      // own row, and listing both duplicated the same disciplines twice.
      { label: "Tools", value: "Figma, FigJam, React, Tailwind CSS, Vite" },
    ],
    tldr: {
      challenge:
        "Finance teams needed AI-assisted analysis without losing the governance controls, audit trails, and human accountability financial operations require.",
      solution:
        "A governed platform that separates experimentation from production, makes every AI action inspectable, and requires human approval before anything consequential happens.",
      result:
        "Took Finance Cloud from zero to one and scaled it from 10 pilot users to 300, with enterprise adoption of 1,000+ planned. Finance leaders got the evidence they needed to trust and approve AI-assisted work.",
    },
    // Every figure below is already stated in `impact`; the band restates them
    // in display type rather than introducing anything new.
    stats: [
      { value: "0 → 1", label: "Working POC, designed and shipped" },
      { value: "10 → 300", label: "Pilot users through iterative testing" },
      { value: "1,000+", label: "Enterprise adoption planned" },
    ],
    overview:
      "At Amdocs Studios, I led design for Finance Cloud — a governed AI platform for an enterprise telecom's finance and payroll teams. The brief: bring AI into financial operations without breaking the audit trail. I directed the design workstream across a cross-functional team and did the work myself, from the product model to shipped screens, taking the platform from zero to a working POC with the lead product owner and then scaling it from 10 pilot users to 300.",
    leadership: [
      {
        kind: "Direction",
        title: "Set the product model",
        detail:
          "Scoped the problem and established the framework the platform still runs on: Workflow Builder, Sandbox, promotion gates, Production, monitoring.",
      },
      {
        kind: "Direction",
        title: "Set the boundaries with ML engineering",
        detail:
          "Defined where the system acts, recommends, or stops — confidence thresholds as product decisions, not tuning details.",
      },
      {
        kind: "Hands on",
        title: "Designed the work itself",
        detail:
          "The copilot, agent workflows, failure states, and promotion flows — through iterative testing from 10 users to 300.",
      },
      {
        kind: "Hands on",
        title: "Ran the research program",
        detail:
          "Screeners, recruitment, training plans, and moderated sessions — built and run end to end across the POC.",
      },
    ],
    solutionSteps: [
      {
        title: "Experiment freely",
        points: [
          "A sandbox with no path to production — real analysis, zero risk to financial controls",
          "A copilot scoped to the task that drafts editable plans, not finished answers",
        ],
      },
      {
        title: "Promote visibly",
        points: [
          "Promotion is a gated, reviewable event — never a hidden setting",
          "A blocked promotion names the unmet requirement and how to resolve it",
        ],
      },
      {
        title: "Run governed",
        points: [
          "Every output traces to its inputs, transformations, and generated code",
          "Anomalies route to the accountable role; failure states preserve work, retry, and roll back",
        ],
      },
    ],
    context:
      "Enterprise finance teams needed AI-assisted analysis and transformation tools without losing the governance controls, audit trails, and human accountability that financial operations require. The core tension: AI can accelerate analysis, but accountants, controllers, and compliance stakeholders remain personally responsible for journal entries, accruals, payroll runs, and close work. A system that produces a number without showing where it came from is not faster, it is unusable, because someone still has to defend that number. Finance Cloud covers reporting, forecasting, variance analysis, anomaly detection, month-end close, and manual journal entries, with copilot assistance and agent-driven workflows running throughout. Every one of those surfaces touches money that has already been committed or is about to be.",
    evidence: {
      findings: [
        {
          finding: "A number without provenance cannot be approved, only re-derived by hand.",
          response:
            "Every AI output needed a visible path back to its inputs, its transformations, and the generated code that produced it.",
        },
        {
          finding:
            "Controls that lived only in the backend were invisible to the people accountable for them.",
          response:
            "Governance needed a surface in the interface: environment labels, promotion checklists, audit entries.",
        },
        {
          finding:
            "Automation that fails silently in finance does not just lose work, it breaks trust in every future result.",
          response:
            "Failure, partial output, and low confidence needed designed states rather than error toasts.",
        },
        {
          finding:
            "Anomalies surfaced too late are indistinguishable from anomalies never surfaced.",
          response:
            "Detection had to reach the right person proactively rather than waiting to be discovered in a report.",
        },
      ],
      insight: "Governance people cannot see is not governance they will approve.",
    },
    owned: [
      FINANCE_PRODUCT_MODEL,
      "Separated experimentation from production so users could test Python analysis, transformations, datasets, and AI-assisted plans without bypassing financial controls; made environment, data access, permissions, and promotion requirements visible throughout the flow.",
      "Designed AI uncertainty and failure as first-class interaction states: partial or low-confidence output, failed data/Python operations, missing permissions, blocked promotion, exception handling, preserved work, retry and escalation, plus pause/resume/rollback concepts for consequential workflows.",
      "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history; preserved human responsibility for accruals, journal entries, close work, and other high-consequence actions.",
      "Took the platform from zero to one with the lead product owner, translating product requirements into a shipped product, then scaling it through iterative testing from 10 pilot users to 300, with enterprise adoption of 1,000+ planned.",
      "Designed copilot assistance and agent-driven workflows across reporting, forecasting, variance analysis, and month-end close, so the system could carry the work while a person stayed accountable for the outcome.",
      "Designed anomaly detection and proactive notifications so unexpected figures reached the right role before close rather than surfacing after submission.",
      "Worked with ML engineers and AI researchers on interaction models, error states, and confidence thresholds, defining where the system acts automatically, where it recommends, and where it must stop and ask.",
      FINANCE_RESEARCH_ARTIFACTS,
    ],
    // Condensed from the nine `owned` items above into five themes. Wording is
    // drawn from those items; the full detail stays in Key decisions and
    // Execution rather than being restated here.
    ownedThemes: [
      {
        label: "The product model",
        detail:
          "Connected Workflow Builder, Sandbox, promotion gates, Production, and monitoring into one governed platform, with experimentation separated from production so nothing could bypass financial controls.",
      },
      {
        label: "Zero to one, then scale",
        detail:
          "Took the platform from zero to one with the lead product owner, then scaled it through iterative testing from 10 pilot users to 300, with enterprise adoption of 1,000+ planned.",
      },
      {
        label: "AI assistance inside the work",
        detail:
          "Designed copilot assistance and agent-driven workflows across reporting, forecasting, variance analysis, and month-end close, plus anomaly detection routed to the accountable role before close.",
      },
      {
        label: "Uncertainty as a designed state",
        detail:
          "Made partial output, failure, blocked promotion, retry, escalation, and rollback first-class states, and set confidence thresholds with ML engineering as product boundaries.",
      },
      {
        label: "Inspectability and audit",
        detail:
          "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history.",
      },
    ],
    // Disciplines as listed in the Team snapshot field.
    team: [
      { role: "Product" },
      { role: "Engineering" },
      { role: "ML engineering and AI research" },
      { role: "Data" },
      { role: "Finance and compliance stakeholders" },
    ],
    decisions: [
      {
        decision: "Separated experimentation from production as two distinct environments.",
        rationale:
          "Users could test Python analysis, transformations, and AI-assisted plans in a sandbox with no path to silently affecting financial controls. Promotion to production became an explicit, reviewable event instead of a hidden setting.",
        rejected: "gating a single workspace with permissions",
      },
      {
        decision: "Designed promotion as a gated checklist with visible unmet requirements.",
        rationale:
          "A blocked promotion explained exactly which controls, approvals, or data-access conditions weren't yet met, turning governance from an invisible backend rule into something users could see and resolve.",
        rejected: "a one-click publish",
      },
      {
        decision:
          "Treated AI uncertainty and failure as first-class interaction states: partial or low-confidence output, failed data or Python operations, preserved work on error, retry and escalation.",
        rationale:
          "The workspace stayed trustworthy at exactly the moments AI is least reliable.",
        rejected: "hiding them",
      },
      {
        decision: "Scoped the copilot to the work in front of the user, not the whole platform.",
        rationale:
          "Assistance appeared inside a specific report, forecast, or close task with the relevant data already in context, and produced an editable plan rather than a finished answer. The user could read the plan, change it, and run it.",
        rejected: "a general-purpose assistant that has to be told what it is looking at",
      },
      {
        decision:
          "Set confidence thresholds as product decisions, made with ML engineering rather than inherited from the model.",
        rationale:
          "We defined explicitly where the system could act on its own, where it should recommend and wait, and where it had to stop and escalate. Those boundaries were interaction-design decisions with a number attached, not a tuning detail.",
        rejected: "surfacing a raw confidence score and leaving interpretation to the user",
      },
      {
        decision: "Made anomaly detection proactive and role-aware.",
        rationale:
          "When figures fell outside expected ranges, the platform notified the role accountable for that area, with the variance, its drivers, and the affected records attached, so the notification was actionable rather than an alert to go look somewhere.",
        rejected: "leaving anomalies to be found during review, or broadcasting alerts to everyone",
      },
    ],
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
    // The end-to-end flow is now the coded GovernedPipeline diagram rather than a
    // raster image. The source asset stays at
    // src/imports/Finance_AI_Transformation_-_End-to-End_Flow.png pending confirmation.
    // Its original alt text, preserved because the coded version splits the same
    // information across headings, an ordered list, and body copy:
    //   "End-to-end flow diagram for the Finance AI Transformation, showing
    //    Governance, Risk and Compliance governing Agentic Workflows, Data Products,
    //    Command Center, and the full pipeline through User Experiences, Feedback and
    //    Iteration, Problem Framing, Data Discovery and Ingestion, and Finance Sandbox."
    impact: {
      headline:
        "Took Finance Cloud from zero to one and scaled it through iterative testing from 10 pilot users to 300, with enterprise adoption of 1,000+ planned. Defined a product model that separated experimentation from production, made AI activity inspectable at every step, and gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
      organizational:
        "The working POC gave stakeholders a concrete, testable model for how governed AI could operate inside financial operations, rather than an abstract promise. That model is what made the scaled pilot possible.",
      before:
        "AI-assisted analysis was either untrusted or unusable in finance, because output arrived without provenance and controls lived where accountable people could not see them.",
      after:
        "A governed platform where experimentation is separated from production, every AI action is inspectable, anomalies reach the accountable role proactively, and consequential work requires human approval.",
      proof: [
        "Delivered a working POC, then scaled from 10 pilot users to 300 through iterative testing.",
        "Established the environment separation and promotion gate model now used across the platform.",
        "Defined confidence thresholds with ML engineering as explicit product boundaries.",
        "Made anomaly detection actionable by routing it to the accountable role with drivers attached.",
        "Preserved human responsibility for accruals, journal entries, payroll, and close work.",
      ],
      metricStatus:
        "Exact adoption dates, efficiency gains, and close cycle improvements are not verified and are not stated.",
    },
    reflection: {
      learned:
        "The hardest part wasn't making AI capable, it was making its governance legible. Early on, controls lived in the backend and users had to trust that they existed. The work got better once every control had a visible surface: an environment label, a promotion checklist, an audit entry.",
      wouldChange:
        "Scaling taught the second lesson. Ten pilot users will tolerate ambiguity and ask a person when something looks wrong. Three hundred users will not, and at a thousand there is no person to ask. Everything that worked at pilot scale because someone could explain it had to become something the interface explained by itself.",
      principle: "Governance people can't see isn't governance they'll approve.",
    },
  },

  "connected-customer-journey": {
    snapshotFields: [
      { label: "Role", value: "Lead UX Designer" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      { label: "Status", value: "Completed, April 2025" },
      { label: "Tools", value: "Figma, FigJam" },
      { label: "Users", value: "Marketing and CX teams, service agents, and product/data partners" },
    ],
    team: [
      { role: "UX Design" },
      { role: "Data Science" },
      { role: "Marketing and CX" },
      { role: "AI/NLP Engineering" },
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
      { value: "4", label: "Connected surfaces: dashboard, mitigation plan, chatbot, agent view" },
      { value: "Required", label: "Human review before any AI message reached a customer" },
    ],
    overview:
      "As Lead UX Designer at Amdocs Studios, I designed the connected customer journey for a telecommunications operator that had predictive churn signals but no way to act on them. I led the interaction model across analysts, service teams, and the AI layer, and designed the flow end to end: from a risk signal, through the context and options a person needs, to a reviewed message and the monitoring that followed it.",
    leadership: [
      {
        kind: "Direction",
        title: "Reframed the score as decision support",
        detail:
          "Paired predictions with lifecycle stage, behavior, sentiment, and available actions, rather than presenting an opaque score as a final answer.",
      },
      {
        kind: "Direction",
        title: "Held the line on human control",
        detail:
          "Required users to review and edit AI-assisted communication before it reached a customer, across every channel in the journey.",
      },
      {
        kind: "Hands on",
        title: "Designed the mitigation flow",
        detail:
          "Risk detection, context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
      },
      {
        kind: "Hands on",
        title: "Designed the platform surfaces",
        detail:
          "Dynamic segmentation, churn signals, sentiment and NPS health, AI-assisted messaging, offer customization, and performance monitoring.",
      },
    ],
    solutionSteps: [
      {
        title: "Detect in context",
        points: [
          "Segments built dynamically from churn-risk criteria, not static lists",
          "Risk sits beside behavior, sentiment, journey context, and available actions",
        ],
      },
      {
        title: "Decide with evidence",
        points: [
          "Each offer starts as a hypothesis, testable in a what-if analysis tool",
          "AI drafts a tone-matched message; the person reviews and edits before it goes out",
        ],
      },
      {
        title: "Act and monitor",
        points: [
          "A chatbot handles routine cases and hands off to a person when sentiment calls for it",
          "A declined offer loops back to adjustment rather than ending in a dead end",
        ],
      },
    ],
    context:
      "A telecommunications operator needed to turn predictive signals into action across several channels: analysts, service teams, an AI layer, and the partner systems feeding it. I designed the connected journey that tied them together, from detection through human reviewed action to launch and monitoring.",
    evidence: {
      body:
        "The product direction addressed a documented gap between having customer data and being able to act on it.",
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
    images: [
      {
        src: ccjUserFlow,
        fullSrc: ccjUserFlowFull,
        width: 2400,
        height: 1787,
        alt: "User flow diagram for the connected customer journey, showing an analyst path from dashboard alert through offer generation, a customer journey path from risk event through AI chatbot and human customer-service handoff, and a customer-service representative path ending in resolution.",
        caption:
          "End-to-end flow: from churn-risk detection and segment creation, through AI chatbot and human customer-service handoff, to offer resolution and monitoring.",
      },
      {
        src: ccjDashboard,
        fullSrc: ccjDashboardFull,
        width: 1600,
        height: 1024,
        alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
        caption:
          "Analyst dashboard surfacing at-risk KPIs alongside ARPU, NPS, retention, and campaign performance, with a direct path to mitigate a flagged risk.",
      },
      {
        src: ccjMitigationPlan,
        fullSrc: ccjMitigationPlanFull,
        width: 1600,
        height: 1547,
        alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
        caption:
          "Mitigation plan for an identified KPI risk, pairing the key drivers behind it with an AI-assisted, tone-controlled offer builder and a live preview of the customer-facing message.",
      },
      {
        src: ccjChatExpanded,
        fullSrc: ccjChatExpandedFull,
        width: 1600,
        height: 1024,
        alt: "Customer service representative interface with an expanded chat panel showing an AI-generated customer summary and suggested course of action alongside the live conversation.",
        caption:
          "The representative's chat interface, with an AI-generated customer summary and suggested course of action alongside the live conversation.",
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
      { label: "Role", value: "Design Lead and UX / Product Strategy Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      { label: "Status", value: "Completed, first MVP delivered" },
      { label: "Tools", value: "Figma, FigJam" },
      { label: "Users", value: "Admins, accountants, and engineers managing multiple projects and billing packages" },
    ],
    team: [
      { role: "Chief Data Office" },
      { role: "Product" },
      { role: "Engineering" },
      { role: "UI development" },
      { role: "Finance and operations stakeholders" },
    ],
    tldr: {
      challenge:
        "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed.",
      solution:
        "A guided B2B workflow with a shared status model, role-based permissions, and a full audit trail replacing manual, ownerless assembly.",
      result:
        "Unblocked recovery of the billing backlog through the first MVP for project querying and package assembly, while preserving a phased path to document integration, editing, review, and automation.",
    },
    // Backlog volume and handoff time are unverified (see impact.metricStatus).
    // The counts below come from the status model and the operational flow.
    stats: [
      { value: "MVP 1", label: "Delivered — unblocked recovery of the billable-work backlog" },
      { value: "6", label: "Shared status states, Initiated through Completed" },
      { value: "5", label: "Roles mapped across the operational flow" },
    ],
    overview:
      "As Design Lead and UX / Product Strategy Lead at Amdocs Studios, I replaced a telecommunications client's manual billing-package assembly with a guided workflow. Work was disappearing mid-process because no single role owned it and no shared vocabulary existed for where a package was. I led the strategy and the delivery partnership with engineering, and designed the flow, the status model, and the recovery paths that made billable work traceable again.",
    leadership: [
      {
        kind: "Direction",
        title: "Defined the shared status model",
        detail:
          "Initiated, In Progress, Review, Approved, Finalized, Completed — with permissions, ownership, notifications, activity history, and audit-trail concepts.",
      },
      {
        kind: "Direction",
        title: "De-scoped what wasn't feasible",
        detail:
          "Surfaced the dashboard dependency and moved it into a visible backlog rather than compromising the active release, protecting the billing workflow that was feasible.",
      },
      {
        kind: "Hands on",
        title: "Mapped the operational flow",
        detail:
          "Across admins, accountants, engineers, owners, and reviewers — including missing evidence, failed automation, validation, handoffs, and recovery without loss of progress.",
      },
      {
        kind: "Hands on",
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
      "Delivered a completed first MVP for interface and project querying, plus a phased roadmap for document integration, in-product editing, expanded review, and automation.",
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
        label: "MVP and roadmap",
        detail:
          "Delivered a completed first MVP for interface and project querying, plus a phased roadmap for document integration, in-product editing, expanded review, and automation.",
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
          "Direct editing was not feasible within the immediate technical constraints, so the roadmap retained Excel as a temporary editing mechanism while the product moved toward deeper in-app editing.",
        rejected: "shipping an incomplete in-product editor that did not meet the technical constraints",
        tradeoff:
          "A deliberate product tradeoff: preserve operational continuity now while designing a more integrated future state.",
      },
      {
        decision: "De-scoped the planned dashboard without losing the opportunity.",
        rationale:
          "A planned dashboard was determined not to be feasible. I surfaced the dependency and helped move the work out of the current scope while retaining it in the backlog as a future opportunity.",
        rejected:
          "forcing the unsupported dashboard into the current scope and putting the feasible billing workflow at risk",
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
    images: [
      {
        src: cwoMvp1Workflow,
        fullSrc: cwoMvp1WorkflowFull,
        width: 4174,
        height: 2592,
        alt: "MVP1 user flow diagram showing a user searching a project number, the system matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
        caption:
          "MVP1 flow: searching a project number, matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
      },
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
        src: cwoFlow,
        fullSrc: cwoFlowFull,
        width: 6368,
        height: 2536,
        alt: "Review flow diagram showing a reviewer starting a review, making inline edits with save or discard options, completing the review, and submitting with a git-style commit message.",
        caption:
          "Review flow: starting a review, making inline edits with save or discard, completing the review, and submitting with a git-style commit message before the package is marked ready for review.",
      },
      {
        src: cwoStrategyAlignment,
        fullSrc: cwoStrategyAlignmentFull,
        width: 2600,
        height: 661,
        alt: "MVP2 scope-definition workshop board showing goals and outcomes, feature prioritization by must-have, should-have, and nice-to-have, and entity relationships between agreement, billing invoice, project, and vendor invoice.",
        caption:
          "MVP2 scope-definition workshop: goals and outcomes, feature prioritization, and the entity relationships used to plan the next phase.",
      },
    ],
    impact: {
      headline:
        "The first MVP unblocked recovery of the backlog of unprocessed billable work by giving the team a usable interface for project querying and package assembly.",
      organizational:
        "Defined a status model that made ownership and handoffs explicit, and laid a phased roadmap for document integration and full automation.",
      before:
        "Billable work accumulated across fragmented systems, files, screenshots, spreadsheets, and manual handoffs.",
      after:
        "A stepwise workflow coordinated package creation, progressive validation, recovery, ownership, review, status, and history.",
      proof: [
        "Completed the first MVP for interface and project querying.",
        "Established a phased roadmap for document integration, editing, review, and automation.",
        "Added recoverable screenshot-generation and validation patterns.",
        "Reused role, review, submit, and status patterns across the workflow.",
        "Made ownership, package state, action history, and review handoffs visible.",
      ],
      metricStatus:
        "The recovered backlog is the verified unblocked outcome available in the project record. Exact backlog volume, defect reduction, handoff time, and final release dates are not verified and are not stated.",
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
        kind: "Direction",
        title: "Facilitated requirements and prioritization",
        detail:
          "Translated feature requests into capabilities, flows, and phased backlogs with client stakeholders and product.",
      },
      {
        kind: "Direction",
        title: "Defined the research program",
        detail:
          "Set research protocols and usage metrics, and coordinated mixed-method usability and targeted inquiry across the phases.",
      },
      {
        kind: "Hands on",
        title: "Synthesized findings into direction",
        detail:
          "Used affinity mapping to group observations, then turned them into product recommendations, feature priorities, and reusable interaction patterns.",
      },
      {
        kind: "Hands on",
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
          "The platform concept supported seamless movement between selected documents while retaining conversational context, source references, search history, and the user's place in the workflow.",
      },
      {
        decision: "Made saving an intentional privacy action.",
        rationale:
          "The privacy-first direction avoided retaining user data without an explicit save, giving users clearer control over what became persistent history.",
        rejected: "retaining user data without an explicit save",
      },
    ],
    images: [
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
