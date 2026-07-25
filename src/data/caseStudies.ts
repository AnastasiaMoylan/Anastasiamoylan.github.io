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
  alt: string;
  /** Required. States the decision the image shows, not what is in the frame. */
  caption: string;
}

/** A collaborator and, where known, what they owned. */
export interface TeamMember {
  role: string;
  owned?: string;
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

export interface CaseStudy {
  snapshotFields: { label: string; value: string }[];
  team?: TeamMember[];
  tldr: Tldr;
  context: string;
  evidence?: Evidence;
  /** What I personally owned. Collaborators live in `team`. */
  owned: string[];
  decisions: Decision[];
  states?: StateRecovery[];
  images?: CaseStudyImage[];
  /** Renders the pending-visual treatment instead of a gallery. */
  visualsPending?: boolean;
  visualsPendingNote?: string;
  plannedVisuals?: string[];
  impact?: Impact;
  reflection?: Reflection;
}

export const caseStudies: Record<string, CaseStudy> = {
  "governed-ai-finance-workspace": {
    snapshotFields: [
      { label: "Role", value: "Lead UX / Product Designer" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025–2026" },
      { label: "Status", value: "Proof of concept (ongoing platform vision)" },
      { label: "Tools", value: "Figma, React, Tailwind CSS, Vite" },
    ],
    tldr: {
      challenge:
        "Finance teams needed AI-assisted analysis without losing the governance controls, audit trails, and human accountability financial operations require.",
      solution:
        "A governed workspace that separates experimentation from production, makes AI activity fully inspectable, and requires human approval before consequential actions.",
      result: "Gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
    },
    context:
      "Enterprise finance teams needed AI-assisted analysis and transformation tools without losing the governance controls, audit trails, and human accountability that financial operations require. The core tension: AI can accelerate analysis, but accountants, controllers, and compliance stakeholders need to remain responsible for journal entries, accruals, and close work.",
    owned: [
      FINANCE_PRODUCT_MODEL,
      "Separated experimentation from production so users could test Python analysis, transformations, datasets, and AI-assisted plans without bypassing financial controls; made environment, data access, permissions, and promotion requirements visible throughout the flow.",
      "Designed AI uncertainty and failure as first-class interaction states: partial or low-confidence output, failed data/Python operations, missing permissions, blocked promotion, exception handling, preserved work, retry and escalation, plus pause/resume/rollback concepts for consequential workflows.",
      "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history; preserved human responsibility for accruals, journal entries, close work, and other high-consequence actions.",
      FINANCE_RESEARCH_ARTIFACTS,
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
      },
    ],
    images: [
      {
        src: financeAIFlow,
        fullSrc: financeAIFlowFull,
        alt: "End-to-end flow diagram for the Finance AI Transformation, showing Governance, Risk and Compliance governing Agentic Workflows, Data Products, Command Center, and the full pipeline through User Experiences, Feedback and Iteration, Problem Framing, Data Discovery and Ingestion, and Finance Sandbox.",
        caption:
          "End-to-end flow: governance and compliance layer governing agentic workflows, shared data products, and the full pipeline from user experience through finance sandbox exploration.",
      },
    ],
    impact: {
      headline:
        "Defined a product model that separated experimentation from production, made AI activity inspectable at every step, and gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
      organizational:
        "The result was a working POC that gave stakeholders a concrete, testable model for how governed AI could operate inside financial operations, rather than an abstract promise.",
    },
    reflection: {
      learned:
        "The hardest part wasn't making AI capable, it was making its governance legible. Early on, controls lived in the backend and users had to trust that they existed. The work got better once every control had a visible surface: an environment label, a promotion checklist, an audit entry.",
      principle: "Governance people can't see isn't governance they'll approve.",
    },
  },

  "connected-customer-journey": {
    snapshotFields: [
      { label: "Role", value: "Senior UX Designer" },
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
        alt: "User flow diagram for the connected customer journey, showing an analyst path from dashboard alert through offer generation, a customer journey path from risk event through AI chatbot and human customer-service handoff, and a customer-service representative path ending in resolution.",
        caption:
          "End-to-end flow: from churn-risk detection and segment creation, through AI chatbot and human customer-service handoff, to offer resolution and monitoring.",
      },
      {
        src: ccjDashboard,
        fullSrc: ccjDashboardFull,
        alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
        caption:
          "Analyst dashboard surfacing at-risk KPIs alongside ARPU, NPS, retention, and campaign performance, with a direct path to mitigate a flagged risk.",
      },
      {
        src: ccjMitigationPlan,
        fullSrc: ccjMitigationPlanFull,
        alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
        caption:
          "Mitigation plan for an identified KPI risk, pairing the key drivers behind it with an AI-assisted, tone-controlled offer builder and a live preview of the customer-facing message.",
      },
      {
        src: ccjChatExpanded,
        fullSrc: ccjChatExpandedFull,
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
        alt: "MVP1 user flow diagram showing a user searching a project number, the system matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
        caption:
          "MVP1 flow: searching a project number, matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
      },
      {
        src: cwoCreationFlow,
        fullSrc: cwoCreationFlowFull,
        alt: "Billing package creation flow diagram showing role-based branching for admin, accountant, engineer, collections, and view-only report roles, from sign-in through review, export, and finalization.",
        caption:
          "Creation flow: role-based branching from sign-in through review, export, and finalization.",
      },
      {
        src: cwoFlow,
        fullSrc: cwoFlowFull,
        alt: "Review flow diagram showing a reviewer starting a review, making inline edits with save or discard options, completing the review, and submitting with a git-style commit message.",
        caption:
          "Review flow: starting a review, making inline edits with save or discard, completing the review, and submitting with a git-style commit message before the package is marked ready for review.",
      },
      {
        src: cwoStrategyAlignment,
        fullSrc: cwoStrategyAlignmentFull,
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
