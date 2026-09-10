import { figures } from "./figures";
import { diagramSvg } from "./diagramSvg";
// Case study content, keyed by project slug.
//
// buildSections renders the fields under three parents: 01 Framing (Overview,
// Product framing, The problem), 02 The work (Scope and ownership, Key
// decisions, What did not make the release, Evidence), 03 Results (Outcome,
// What I learned). The types are in ./caseStudyTypes.
//
// Figures that repeat across the site come from ./figures — never retype one.
//
// Optional fields render nothing when absent, so a study can ship partially
// filled rather than showing empty labels.
//
// Rewritten for length 2026-09-10 (owner: "still too wordy"): every field is
// cut to the budget in its doc comment or close to it, and every line is a
// tightened version of the text that was here before, which was Anastasia's
// own. Nothing new is asserted. Lines that were already [NEEDS SIGN-OFF]
// still are; the rewrite adds a sign-off on the Document AI claim and on the
// mechanism labels for the three studies that had none.
//
// The image cut of the same day: one image proves one claim, and a screen
// that is already on the page does not appear a second time. The billing
// study went from seventeen figures to eight, the Customer Journey from eight
// to six, Document AI from seven to three. What left is listed at each
// `images` / `processImages` field.

// `?preview` yields a downscaled WebP for inline display (see vite.config.ts);
// the plain import is the full-resolution original used by the lightbox.
import ccjJourneyExplorations from "../assets/case-studies/ccj/journey-explorations.jpg?preview";
import ccjJourneyExplorationsFull from "../assets/case-studies/ccj/journey-explorations.jpg";
import ccjDashboard from "../assets/case-studies/ccj/dashboard-performance.jpg?preview";
import ccjDashboardFull from "../assets/case-studies/ccj/dashboard-performance.jpg";
import ccjMitigationPlan from "../assets/case-studies/ccj/mitigation-plan.jpg?preview";
import ccjMitigationPlanFull from "../assets/case-studies/ccj/mitigation-plan.jpg";
import ccjChatExpanded from "../assets/case-studies/ccj/chat-expanded.png?preview";
import ccjChatExpandedFull from "../assets/case-studies/ccj/chat-expanded.png";
import cwoPackageIndex from "../assets/case-studies/cwo/package-index.jpg?preview";
import cwoPackageIndexFull from "../assets/case-studies/cwo/package-index.jpg";
import cwoBillingReport from "../assets/case-studies/cwo/billing-report.jpg?preview";
import cwoBillingReportFull from "../assets/case-studies/cwo/billing-report.jpg";
import cwoCreation02b from "../assets/case-studies/cwo/creation-flow-02b.jpg?preview";
import cwoCreation02bFull from "../assets/case-studies/cwo/creation-flow-02b.jpg";
import cwoReview01 from "../assets/case-studies/cwo/review-flow-01.jpg?preview";
import cwoReview01Full from "../assets/case-studies/cwo/review-flow-01.jpg";
import cwoReview02 from "../assets/case-studies/cwo/review-flow-02.jpg?preview";
import cwoReview02Full from "../assets/case-studies/cwo/review-flow-02.jpg";
// Drawn diagrams ship as SVG and are inlined (see ./diagramSvg): the `?raw`
// import is the markup, the plain import the file URL. Source `.html` beside
// each, per docs/case-study/case-study-diagrams.md.
import cwoStatusModelUrl from "../assets/case-studies/cwo/status-model.svg";
import cwoStatusModelRaw from "../assets/case-studies/cwo/status-model.svg?raw";
import gafFrontDoorUrl from "../assets/case-studies/gaf/front-door-flow.svg";
import gafFrontDoorRaw from "../assets/case-studies/gaf/front-door-flow.svg?raw";
import diCitationLoopUrl from "../assets/case-studies/di/citation-loop.svg";
import diCitationLoopRaw from "../assets/case-studies/di/citation-loop.svg?raw";
import diComparisonModesUrl from "../assets/case-studies/di/comparison-modes.svg";
import diComparisonModesRaw from "../assets/case-studies/di/comparison-modes.svg?raw";

// The types live in ./caseStudyTypes so a type edit and a content edit never
// collide in this file. Re-exported so existing import paths keep resolving.
export type * from "./caseStudyTypes";
import type { CaseStudy } from "./caseStudyTypes";
export const caseStudies: Record<string, CaseStudy> = {
  // Migrated 2026-09-09 from docs/case-study/rewrites/finance-cloud-principal-framework.md
  // (the governed analysis platform, in Anastasia's words) with her 2026-08-25
  // program-level account (the suite reframe, the homepage, the V1-to-V3
  // pivot, direction across six designers) kept as the second layer, because
  // the stat band and half the figures come from it.
  //
  // Deliberately NOT published: the forecast-gap dollar figure and exact
  // program-increment dates. Role is "Product Experience Lead", the
  // engagement role; "Lead Experience Designer" is the employment title.
  "finance-cloud": {
    snapshotFields: [
      // [NEEDS SIGN-OFF] on the client descriptor: it follows the rewrite,
      // replacing "Confidential Fortune 500 telecommunications company".
      { label: "Role", value: "Product Experience Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2024–Present" },
      // [NEEDS SIGN-OFF] The 2026-09-08 status; refresh before publishing.
      { label: "Status", value: "V3 of the analysis platform in testing; unified homepage MVP in development" },
      { label: "Users", value: "Accountants, analysts, managers and controllers, finance leaders, admins and viewers" },
      { label: "Team", value: "Product, engineering, ML engineering and AI research, data, finance and compliance stakeholders" },
    ],
    // Which figure leads (hackathon or the pilot arc) is still open: the band
    // keeps the hackathon, the claim and Outcome carry the pilot arc.
    stats: [
      { value: figures.hackathonAnalyses, label: `Hackathon analyses by ${figures.hackathonUsers} users` },
      { value: String(figures.financeCloudVersions), label: "Product versions, each redirected by research" },
      { value: String(figures.researchEngagements), label: "Research engagements to date" },
      { value: figures.programScaleShort, label: "Program the research now directs" },
    ],
    // The h1, from her own "Card and header lead line". [NEEDS SIGN-OFF]
    claim: `Took a governed AI finance platform from zero to one and scaled it from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}.`,
    overview: {
      challenge:
        "Finance teams wanted AI-assisted analysis without giving up the controls, audit trails and personal accountability that finance work requires.",
      result: `Finance Cloud went from zero to one and scaled through iterative testing from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with ${figures.financePlannedUsers} planned; finance leaders got evidence they could approve.`,
      approach:
        "Separate experimentation from production, make every AI action inspectable, and require a person’s approval before anything consequential happens.",
    },
    productFraming:
      "The organization wanted AI inside finance and payroll: reporting, forecasting, variance analysis, anomaly detection, month-end close, journal entries. All of it touches committed money, and the accountants and controllers who work there stay personally responsible for the numbers whatever produced them. The bet: AI could carry real analysis without moving that responsibility. The risk: a platform either untrusted and unused, or trusted and indefensible. Design was in the room because the problem was not model capability but making governance legible to the people who had to approve it. The platform also sat inside a wider program described to the business as one integrated application that its architecture could not yet deliver.",
    framing: [
      {
        label: "Hypothesis",
        text:
          "AI could carry a meaningful share of finance analysis without moving responsibility for the numbers, if every consequential action stayed visible and owned by a person.",
      },
      {
        label: "Success metric",
        text:
          "None set at the outset. I would use the share of close work running through the governed pipeline with human sign-off; plans approved without rework is the leading indicator.",
      },
    ],
    hmw:
      "How might we let finance teams use AI for analysis and close work while keeping every consequential action visible, reviewable and owned by a person?",
    constraints: [
      {
        constraint:
          "Accountants, controllers and compliance staff are personally responsible for journal entries, accruals, payroll and close",
        implication:
          "AI could prepare and recommend; a person had to approve anything consequential, and the handoff had to be explicit",
      },
      {
        constraint: "A number without provenance cannot be approved, only re-derived by hand",
        implication: "Every AI output needed a visible path back to its inputs, transformations and generated code",
      },
      {
        constraint: "Controls that lived only in the backend were invisible to the people accountable for them",
        implication: "Governance needed a surface in the interface: environment labels, promotion checklists, audit entries",
      },
      {
        constraint: "Automation that fails silently in finance breaks trust in every future result",
        implication: "Failure, partial output and low confidence needed designed states, not error toasts",
      },
      {
        constraint:
          "The program was described to the business as one integrated application that the architecture could not yet support",
        implication:
          "Coherence had to be earned through design (shared language, central discovery, clear product relationships) rather than inherited from architecture",
      },
    ],
    scope: {
      // Paraphrases FINANCE_PRODUCT_MODEL and FINANCE_RESEARCH_ARTIFACTS in
      // ownedStatements.ts; keep the two agreeing.
      owned:
        "The product model for Finance Cloud: Workflow Builder, Sandbox, promotion gates, Production and monitoring across six user roles. The copilot and agent workflow patterns for reporting, forecasting, variance analysis and close. Anomaly detection and proactive notification. The AI uncertainty and failure states, and the inspectability layer: previews, editable plans, generated code, evidence, logs, lineage, versions, approvals and audit history. PRDs, flows, role models, screeners and training plans. At program level, the suite narrative, the unified homepage and the shared patterns across workflow products.",
      led: `The zero-to-one build with the lead product owner, from requirements to a shipped POC. The research that scaled the platform from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}: a recruited pool of 32 analysts, 45-minute moderated sessions against prototypes, and protocols segmented by role so each person was asked only about work they actually did. Design direction for ${figures.designersDirectedWord} designers across the finance program, turning the program lead’s and product owners’ intent into direction designers could execute.`,
      // "now used across the platform" is on the rewrite's own verify list.
      // [NEEDS SIGN-OFF]
      influenced:
        "The three-tier model (act; recommend and wait; stop and escalate), defined with ML engineering and AI research as product boundaries rather than model defaults; the confidence cut-offs are still to be set as the pilot produces data. The environment separation and promotion-gate model, now used across the platform. Human responsibility for accruals, journal entries, payroll and close, kept as a product principle. And the program narrative itself: from one integrated application to a suite with a shared design language.",
      // [NEEDS SIGN-OFF] Composed from the rewrite's "Worked with" line and
      // the former team grid.
      workedWith: `Program leadership, product management, ${figures.designersDirectedWord} application-level designers each owning one product, engineering and data specialists, ML engineering and AI research, access-management partners, and finance subject-matter experts, compliance stakeholders and end users.`,
    },
    evidence: {
      body:
        "Role-segmented moderated prototype testing: 45-minute one-on-one sessions with clickable prototypes, questions tailored to each participant’s responsibilities. Participant counts for the POC research are not recorded and are not stated.",
      // The findings that changed something the constraints do not already
      // state; the rewrite's first four restated the constraints and are cut.
      findings: [
        {
          finding: `A hackathon put V1 in front of ${figures.hackathonUsers} finance users, who ran ${figures.hackathonAnalyses} analyses and would not read or adjust generated Python.`,
          response: "V2 rebuilt the flow around direct data exploration and agent handoff; research set V3.",
        },
        {
          finding: "Users saw only the products they were already permitted to use, so the wider suite was invisible.",
          response: "A central, access-aware homepage that knows what each person can use after login.",
        },
        {
          finding:
            "Teams used overlapping language for products, roles and AI concepts; the agent portfolio had no shared object model.",
          response:
            "A formal hierarchy, Category → Driver → Anchor Signal, before monitors, thresholds and briefings were designed.",
        },
        {
          finding: "Pilot users tolerated ambiguity because they could ask a person; scaled users could not.",
          response: "Every explanation a person had been giving moved into the interface: labels, checklists, states, reasons.",
        },
      ],
      insight: "Governance people cannot see is not governance they will approve.",
    },
    // Six decisions, cut from eight on 2026-09-10: the failure-states decision
    // is the constraints row and the states table, and the documented-access-
    // assumptions decision was process rather than product. Decisions 1 to 3
    // are the program layer (SuiteMap, the front-door flow, VersionArc), 4 to
    // 6 the platform layer (PromotionGate, GovernedPipeline,
    // ConfidenceThresholds). Mechanism labels authored 2026-09-10 from the
    // decision lines. [NEEDS SIGN-OFF] on the labels.
    decisions: [
      {
        mechanism: "The suite reframe",
        decision:
          "Repositioned the program from one integrated application to a suite of independent products with a shared experience layer.",
        rationale:
          "The architecture and roadmap could not support the single-app promise. The reframe told the truth about the present and gave a credible path to a more connected future: a common visual language, central discovery, clear product relationships.",
        rejected: "continuing to describe the program as one integrated application",
        tradeoff: "coherence had to be earned through design rather than inherited from architecture.",
      },
      {
        mechanism: "The front door",
        decision:
          "Designed the homepage as a launcher and discovery hub, personalized from real post-login access, with each product opening in its own tab.",
        rationale:
          "“Your Apps” shows what each person can actually use; a discovery area shows the rest of the suite. Opening products in their own tabs avoided cross-app authentication complexity and let independently built products keep shipping.",
        rejected: "a kitchen-sink catalog or a complex dashboard; embedding every product in one shell",
        tradeoff:
          "the seams stay visible, coherent at discovery rather than continuous in use. Favorites, cross-app launchers and centralized notifications went to a named roadmap.",
        images: [
          {
            src: gafFrontDoorUrl,
            fullSrc: gafFrontDoorUrl,
            inlineSvg: diagramSvg(gafFrontDoorRaw),
            width: 960,
            height: 600,
            alt: "A four-stage user flow. A person signs in; their access is resolved after login. The homepage then answers two questions at once: a personalized Your Apps area lists the products that person can actually use, and a discovery area shows the wider suite they cannot yet see, which is what research found people were missing. Choosing a product launches it in its own tab with its internal navigation intact, so independently built products keep shipping. Two rejected alternatives are recorded: a kitchen-sink catalog or a complex dashboard in place of a launcher, and embedding every product inside one shell.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "The homepage answers two questions at once: what you can use, and what else exists. Launching in a tab was a stated cost, not an oversight.",
          },
        ],
      },
      {
        mechanism: "The V2 pivot",
        decision:
          "Rebuilt the analysis flow around direct data exploration and agent handoff after the hackathon, not around generated code.",
        rationale: `V1 assumed analysts could read and adjust generated Python. ${figures.hackathonUsers} finance users at a hackathon showed they could not and would not. V2 rebuilt the flow around exploring data directly and handing multi-step work to an agent, then hit two limits: a metadata layer that did not exist, and orchestration too deterministic for how finance work branches. Research set V3, now in testing.`,
      },
      {
        mechanism: "The promotion gate",
        decision:
          "Separated experimentation from production, with promotion as a gated checklist that names what is unmet.",
        rationale:
          "A sandbox for analysis, transformations and AI-assisted plans has no silent path into financial controls. Promotion is an explicit, reviewable event, and a blocked promotion says which control, approval or data-access condition is missing. A rule that lives only in the backend reads as “it won’t let me”, which is indistinguishable from a bug.",
        rejected: "one workspace gated by permissions, or a one-click publish",
        tradeoff: "a permission is a setting someone has to remember exists.",
      },
      {
        mechanism: "The copilot plan",
        decision:
          "Scoped the copilot to the work in front of the user and made it confirm its understanding before producing a plan.",
        rationale:
          "A plan is inspectable; an answer is not. Assistance appears inside a specific report, forecast or close task with the data already in context, and runs understand, clarify, confirm assumptions, then plan, so wrong assumptions surface before a result does. The user reads the plan, changes it and runs it.",
        rejected:
          "a general-purpose assistant that answers immediately and lets users find the wrong assumptions in the output",
      },
      // The tiers are defined; the model-confidence cut-offs are pending (the
      // 2026-09-03 correction). The 72-hour success definition is her earlier
      // account. [NEEDS SIGN-OFF]
      {
        mechanism: "The three-tier boundary",
        decision:
          "Defined where the system acts, where it recommends and waits, and where it stops and escalates, as product boundaries rather than model defaults.",
        rationale:
          "A raw confidence score pushes interpretation onto a user who has no basis for deciding whether a score is safe enough for an accrual. The tiers are interaction decisions; the confidence cut-offs are still to be set with ML engineering as the pilot produces data. With domain experts we defined agent success as analyst behavior within 72 hours, not forecast precision: did the analyst run a scenario or start a leadership conversation.",
        rejected: "surfacing a raw confidence score and leaving interpretation to the user",
      },
    ],
    states: [
      {
        state: "Partial or low-confidence AI output",
        userSees: "Visual indicator and explanation",
        recovery: "Proceed with review",
      },
      {
        state: "Failed Python or data operation",
        userSees: "Clear error, work state preserved",
        recovery: "Retry and escalation path",
      },
      {
        state: "Missing permissions",
        userSees: "Blocked state with explanation",
        recovery: "Request-access path",
      },
      {
        state: "Blocked promotion",
        userSees: "The reason",
        recovery: "Checklist of unmet requirements",
      },
      {
        state: "Anomaly detected in a figure",
        userSees: "Proactive notification to the accountable role, with variance, drivers and affected records",
        recovery: "Drill into source data, or dismiss with a recorded reason",
      },
      {
        state: "Agent workflow interrupted mid-run",
        userSees: "Completed steps preserved and labelled, remaining steps held",
        recovery: "Resume, or roll back the run as a unit",
      },
    ],
    impact: {
      before:
        "AI analysis in finance was untrusted or unusable: output arrived without provenance, and controls lived where accountable people could not see them.",
      after: `Experimentation separated from production, every AI action inspectable, anomalies routed to the accountable role, human approval on consequential work; scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with ${figures.financePlannedUsers} planned.`,
      // Four points, and the band's four figures are all argued here.
      proof: [
        `A hackathon put V1 in front of ${figures.hackathonUsers} finance users who ran ${figures.hackathonAnalyses} analyses; the result pivoted the product.`,
        `A working POC from zero, scaled through iterative testing from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}; ${figures.financeCloudVersionsWord.toLowerCase()} versions, each redirected by research, with V3 in testing.`,
        `${figures.researchEngagementsWord} research engagements, grown from about four participants to a 32-analyst pool, now directing an ${figures.programScale} modernization program.`,
        "The environment separation and promotion-gate model is used across the platform, and the suite has a shared experience model with a homepage MVP in development.",
      ],
      measureNext:
        "Promotions blocked at the gate and then resolved without escalation, anomaly notifications acted on versus dismissed with a reason, and how often copilot plans are edited before they run. All three come from the audit history the product already keeps.",
      // [NEEDS SIGN-OFF] The pilot figures are her account, restored
      // 2026-09-09 on her instruction; this caveat is what makes them
      // publishable.
      metricStatus: `The ${figures.financePilotUsers} → ${figures.financeScaledUsers} figures are my own account, not a project record, and what ${figures.financeScaledUsers} counts (provisioned, onboarded or active) is unconfirmed. The ${figures.financePlannedUsers} is a plan. Adoption dates, efficiency gains and close-cycle improvements are not verified and not stated; client financial figures are deliberately not published.`,
    },
    reflection: {
      learned:
        "The hard part was not making the AI capable; it was making its governance legible, and I underestimated how much of that legibility people were carrying. At ten pilot users, controls could live in the backend because anyone who saw something odd could ask someone who knew. At three hundred they could not, and the design had to absorb every explanation a person had been giving: an environment label, a promotion checklist, an audit entry, a reason for a block. I would now design for the thousandth user from the first sketch.",
      // Scorecard session record §4.5. "Leadership is redirecting" is present
      // tense; the decision was still pending in September. [NEEDS SIGN-OFF]
      wouldChange:
        "Two automations, anomaly detection and journal-entry automation, did not scale: a model tuned for one flow does not transfer, and making them work at acceptable cost means changing how the work is done, not just tooling it. Leadership is redirecting on cost; the research I ran is the evidence behind that decision. Next time I would test transferability across two flows before designing deeply for one.",
      principle: "Don’t promise integration before it exists.",
    },
  },
  "connected-customer-journey": {
    // Migrated 2026-09-09 by mapping the study's own copy, signed off
    // 2026-08-26, onto the framework fields. No rewrite document exists, so
    // every line is her text unless a comment says otherwise; `scope.led`
    // and `scope.influenced` are absent because the record cannot separate
    // them, and the ownership figure draws two bands for the same reason.
    snapshotFields: [
      // The engagement role was leading design; the job title was Senior.
      { label: "Role", value: "Senior UX Designer, leading design on the engagement" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      // Venue (AWS re:Invent 2024) pending Amdocs permission to name.
      { label: "Status", value: "Showcase concept, not deployed to customers" },
      // [NEEDS SIGN-OFF] Both composed for the header's scope grid.
      { label: "Users", value: "Analysts, marketing, CX and service teams, and customer-service representatives" },
      { label: "Team", value: "UX design, data science, marketing and CX, AI/NLP engineering, front-end and back-end engineering, and product owners" },
    ],
    // No churn, conversion or revenue metric is verified (see
    // impact.metricStatus), so the band carries countable design outputs.
    stats: [
      { value: "3", label: "Roles the flow spans" },
      { value: "6", label: "Connected surfaces designed" },
      { value: "Required", label: "Human review before any AI message" },
    ],
    // The h1, her Outcome headline cut to the slot. [NEEDS SIGN-OFF]
    claim:
      "A churn score became a decision a person reviews, edits and monitors — shown as a concept, not deployed.",
    // [NEEDS SIGN-OFF] on the cuts to one sentence each.
    overview: {
      challenge:
        "A telecommunications operator had predictive churn signals, but nothing connected detection to a reviewed action and its result.",
      result:
        "An end-to-end mitigation flow in which a model score becomes a decision a person reviews, edits and monitors, shown as a concept rather than deployed.",
      approach:
        "Treat a prediction as the opening of a decision, with context beside the score and human review before any AI-drafted message goes out.",
    },
    // Her former `context` and the card's problem line, closed with the
    // hypothesis; the last sentence says why a showcase is framed as proof.
    // [NEEDS SIGN-OFF]
    productFraming:
      "Analysts, service teams, an AI layer and the partner systems feeding it each held part of the picture. Nothing connected detection to a reviewed action, its launch and what happened next; the gap between a model score and a person taking the right action for the right customer was entirely undesigned. That gap was the bet: a churn score creates value only when the accountable person can act on it with context. As a showcase concept, the work had to prove that interaction model end to end rather than deploy it.",
    framing: [
      {
        label: "Hypothesis",
        text: "A churn score creates value only when the accountable person can act on it with context.",
      },
    ],
    // [NEEDS SIGN-OFF] Composed from her hypothesis and the review constraint.
    hmw:
      "How might we turn a churn score into an action the accountable person can take with the customer’s context in view — and review before it reaches the customer?",
    constraints: [
      {
        constraint: "AI-drafted messages and offers could affect the customer relationship",
        implication:
          "Marketing, CX and service users had to review and edit anything AI drafted before it reached a customer, on every channel",
      },
      {
        constraint: "Chatbot-to-human handoff was gated on sentiment",
        implication:
          "Routine requests stayed fast; moments that needed empathy went to a person, with the AI summary and suggested action carried across",
      },
      {
        constraint: "Analysts, service teams, an AI layer and the partner systems feeding it each held part of the picture",
        implication:
          "The flow had to run end to end across the analyst, the customer and the representative, not as one more dashboard",
      },
      {
        constraint: "A showcase concept that never reached customers",
        implication: "No churn, conversion or revenue metric could be measured; the study proves an interaction model, not adoption",
      },
    ],
    scope: {
      // Paraphrases CCJ_HUMAN_REVIEW in ownedStatements.ts; keep the two agreeing.
      owned:
        "The journey platform: dynamic segmentation, churn signals, sentiment and NPS health, AI-assisted messaging, offer customization and performance monitoring in one data-driven platform. Model output as decision support: predictions beside customer context, lifecycle stage, behavior, sentiment and available actions, never an opaque score. The end-to-end mitigation flow from detection to monitoring. Human control over AI messaging: a person reviews and edits before anything reaches a customer. And the research that tested the hypothesis behind the vision.",
      workedWith:
        "A cross-functional team: UX design, data science, marketing and CX, AI/NLP engineering, front-end and back-end engineering, and product owners.",
    },
    evidence: {
      body:
        "User research against the hypothesis behind the vision: a churn signal changes nothing unless the person responsible can see why it fired and act without leaving the context. It held.",
      findings: [
        {
          finding:
            "Behavioral data, customer feedback, NPS, campaigns and journey touchpoints were never presented as one decision context.",
          response: "Customer and segment health as one connected view, not another isolated dashboard.",
        },
        {
          finding: "Static segments could not reflect changing behavior or lifecycle stage.",
          response: "Segment membership, its defining signals, risk and change over time made visible.",
        },
        {
          finding: "A churn score did not explain what happened or what a team should do next.",
          response: "Predictive risk placed beside behavior, sentiment, journey context and available actions.",
        },
        {
          finding:
            "Failures concentrated in specific journey paths, such as a repeated top-up failure in the app diverted to the phone system, but no view showed which path a customer had taken.",
          response: "Journey exploration shows the churned and continued share on each channel path, not one aggregate rate.",
        },
      ],
      insight:
        "Predictive insight creates value only when the people responsible for the customer can understand the signal and act without losing its context.",
    },
    // Five decisions, cut from six on 2026-09-10: the what-if offer decision
    // and the human-review decision were one screen and one rationale, so
    // they are one decision. Each screen sits on the decision it proves; the
    // segment-of-one timeline left the page because decision 3 already has
    // two screens for one claim. Mechanism labels authored 2026-09-10 from
    // the decision lines. [NEEDS SIGN-OFF] on the labels.
    decisions: [
      // Signed off 2026-08-26 as the turning point.
      {
        mechanism: "The reset",
        decision: "Treated the churn prediction as the opening of a decision, not the answer.",
        rationale:
          "We had been treating the prediction as the answer: surface the score, recommend an action, done. The reset put the customer’s context beside the score, options to compare, and the ability to edit anything AI drafted before a customer saw it. Every surface was rebuilt around that.",
        rejected: "surfacing the score, recommending an action, done",
      },
      {
        mechanism: "Dynamic segments",
        decision: "Built segments dynamically from churn-risk criteria: issues, behavior, likelihood to churn.",
        rationale: "The model stayed tied to real journey data instead of a one-time snapshot.",
        rejected: "static lists",
      },
      // [NEEDS SIGN-OFF] on the decision line; the rationale is her solution
      // steps' own points.
      {
        mechanism: "Risk made explainable",
        decision: "Made the risk visible and explainable before anyone chose a mitigation.",
        rationale:
          "The dashboard leads with the KPIs at risk, each with a why and a direct path to mitigate it. Journey exploration shows where customers fail by entry channel, with the churned and continued share on each path.",
        rejected: "presenting an opaque score as a final answer",
        images: [
          {
            src: ccjDashboard,
            fullSrc: ccjDashboardFull,
            width: 1600,
            height: 1024,
            alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
            caption:
              "At-risk KPIs beside ARPU, NPS, retention and campaign performance, each with a direct path to mitigate the flagged risk.",
          },
          {
            src: ccjJourneyExplorations,
            fullSrc: ccjJourneyExplorationsFull,
            width: 2400,
            height: 1531,
            alt: "Journey exploration diagram mapping top-up failure paths from mobile app, SMS, and IVR entry points, with churn and successful-continuation percentages at each branch.",
            caption:
              "Top-up failures churn differently by channel, so mitigation targets the worst path, not every failure equally.",
          },
        ],
      },
      // Her "Held the line on human control" leadership card as a decision.
      {
        mechanism: "Review before send",
        decision:
          "Required a person to review and edit every AI-drafted message before it reached a customer, on every channel.",
        rationale:
          "The mitigation plan pairs the KPI at risk with its drivers and one recommended action, testable in a what-if tool first. AI drafts a message for a chosen audience and tone; the person edits the live preview before it goes out.",
        images: [
          {
            src: ccjMitigationPlan,
            fullSrc: ccjMitigationPlanFull,
            width: 1600,
            height: 1547,
            alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
            caption:
              "The KPI’s drivers beside an AI-drafted, tone-controlled offer. A person edits the preview before anything launches.",
          },
        ],
      },
      {
        mechanism: "The sentiment gate",
        decision:
          "Routed customers to a chatbot first, handing off to a representative only when sentiment and account context said the interaction needed a person.",
        rationale:
          "Routine requests stayed fast while the moments that needed empathy were protected. The representative works from an AI summary and suggested action; a declined offer loops back to adjustment.",
        images: [
          {
            src: ccjChatExpanded,
            fullSrc: ccjChatExpandedFull,
            width: 1600,
            height: 1024,
            alt: "Customer service representative interface with an expanded chat panel showing an AI-generated customer summary and suggested course of action alongside the live conversation.",
            caption:
              "An AI summary and suggested action beside the live conversation: assistance in view, the representative in control.",
          },
        ],
      },
    ],
    states: [
      {
        state: "High-churn-risk customer",
        userSees: "A prompt to draft a tone-matched message with generative AI, based on the triggers detected rather than a generic response",
      },
      {
        state: "Representative needs to go further than the model recommends",
        userSees: "Additional offers the automated system does not yet know about",
      },
      {
        state: "Reviewing a case mid-conversation",
        userSees: "The customer’s file, offer history and prior offer variations, without leaving the chat",
      },
      {
        state: "Offer declined or resolution unsuccessful",
        recovery: "Loops back to offer adjustment rather than ending in a dead end",
      },
    ],
    // The end-to-end user-flow board (user-flow.jpg) left the page 2026-09-10:
    // the three-role loop appended under Key decisions draws the same path
    // legibly, and two drawings of one path is one too many.
    impact: {
      before: "Fragmented customer signals and cross-tool handoffs.",
      after:
        "One workflow to detect risk, understand the behavior behind it, choose a mitigation, review the message and monitor the response, shared by marketing, CX and service teams.",
      proof: [
        "Made journey drop-offs and churn risk visible beside customer context.",
        "Translated predictive models into decision support for non-technical users.",
        "Connected AI-assisted messaging and personalized offers to human review.",
        "Defined a learning loop for monitoring and adjusting offers based on customer response.",
      ],
      measureNext:
        "Churn in the contacted at-risk segment against an uncontacted control, with time from signal to launched action as the leading indicator. Both are measurable the day the flow is deployed.",
      metricStatus:
        "This was a showcase concept and did not reach customers, so no churn-reduction, conversion, adoption or revenue metric is presented.",
    },
    reflection: {
      learned:
        "The project reset once we stopped treating the churn prediction as the answer and started treating it as the opening of a decision the representative still had to make, with context, options, and a way to edit anything AI suggested before it reached a customer.",
      principle: "A model score is not a decision.",
    },
  },
  "auditable-billing-workflow": {
    // Rewritten 2026-09-09 from docs/case-study/rewrites/cwo-principal-framework.md,
    // Anastasia's own account. Changes that contradict what the site published
    // before are marked, because each one needs confirming before this ships.
    snapshotFields: [
      // [NEEDS SIGN-OFF] Role changed from "Lead Designer, then Design Lead
      // and UX / Product Strategy Lead"; disagrees with the résumé. Settle
      // this, the résumé and the card together.
      { label: "Role", value: "Product Lead and Design Contributor" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2024–2025" },
      // [NEEDS SIGN-OFF] Was "Completed".
      { label: "Status", value: "MVP 1 released and in use; MVP 1.5 in progress" },
      // [NEEDS SIGN-OFF] Both trimmed to the header's one fact line.
      { label: "Users", value: "Admins, accountants, and engineers managing projects and billing packages" },
      { label: "Team", value: "CWO team with the client's Chief Data Office, product, engineering, and UI development" },
    ],
    // Provenance for every figure is in ./figures.
    stats: [
      { value: "0 → 1", label: "Built from zero" },
      { value: "Cleared", label: `Backlog of ${figures.billingBacklogSize} billing packages` },
      { value: String(figures.billingActiveUsers), label: `Active users, ${figures.billingActiveAsOfShort}` },
      { value: String(figures.billingStatusStates), label: "Shared status states" },
    ],
    // The h1, trimmed from the rewrite's own lead line. [NEEDS SIGN-OFF]
    claim: `Cleared a backlog of ${figures.billingBacklogSize} billing packages with a guided, auditable workflow now used by ${figures.billingActiveUsers} people.`,
    // Layout C (2026-09-10): the claim headings, opener pair, annotated screen
    // and parking lot are lifted from docs/case-study/prototypes/c-lede.html,
    // which restated this study's own copy. None of it has been on the site
    // before, so every line is [NEEDS SIGN-OFF].
    headings: {
      "product-framing": "Clearing a backlog once is automation. Staying clear is a workflow problem.",
      scope: "I owned the product definition, not just the design",
      decisions: "Six decisions, and what each one cost",
      parked: "What did not make the release, and why",
      evidence: "What ten usability sessions changed",
      learned: "Enterprise workflows fail at the boundaries between systems and teams",
    },
    opener: {
      detail: {
        src: cwoBillingReport,
        fullSrc: cwoBillingReportFull,
        width: 2400,
        height: 2390,
        alt: "Close detail of the finalized billing report: charges broken down by category with gross and net construction cost, credit lines and the total amount due.",
        caption:
          "Close up. Every line of the total is traceable, so a reviewer can check the number before the PDF leaves the system.",
      },
      context: {
        src: cwoPackageIndex,
        fullSrc: cwoPackageIndexFull,
        width: 2400,
        height: 1537,
        alt: "Billing package index listing existing packages by ID, projects, contract number, owner and last modified, with a project-number filter and a Start new billing package button.",
        caption:
          "In context. Every package is found by its project number before a new one can be started, the rule that stopped the duplicates.",
      },
    },
    // Pin coordinates are percentages placed by eye in the prototype; two of
    // the four land on a table row rather than the column header they mean.
    // Tune against the asset in the browser.
    annotated: {
      image: {
        src: cwoPackageIndex,
        fullSrc: cwoPackageIndexFull,
        width: 2400,
        height: 1537,
        alt: "Billing package index with the project-number filter, owner and last-modified columns, and the Start new billing package control.",
        caption: "Four decisions visible on one screen.",
      },
      pins: [
        {
          x: 88,
          y: 19,
          text: "Guarded by the identity check. Starting a package runs the project-number lookup first, so the control cannot create a duplicate.",
        },
        {
          x: 53,
          y: 33,
          text: "The primary key is the filter. The project number is how a package is found, which is why it is the search field rather than a package ID.",
        },
        {
          x: 47,
          y: 43,
          text: "Ownership before you open anything. The owner column makes the responsible person visible from the index.",
        },
        {
          x: 58,
          y: 43,
          text: "The status model, surfacing. Every transition is timestamped, so last-modified is a real signal rather than a file date.",
        },
      ],
      caption:
        "Four decisions visible on one screen. The index is the argument: identity, ownership and state are all readable before a package is opened.",
    },
    parked: [
      {
        item: "The reporting dashboard",
        why: "Not feasible in the release. The dependency was surfaced and the dashboard held in the backlog; protecting the core flow cost the release its most demo-friendly screen.",
      },
      {
        item: "In-product editing of package, project and customer details",
        why: "Excel stayed as the interim path. Continuity now was worth more than a half-built editor.",
      },
      {
        item: "Whole-package automation and section export",
        why: "Held as the final feature area so the manual path shipped first.",
      },
      {
        item: "Document integration, expanded review, automated retrieval",
        why: "Sequenced into a named phased roadmap rather than argued into this scope.",
      },
    ],
    overview: {
      challenge: `A backlog of ${figures.billingBacklogSize} billing packages had built up behind a manual assembly of feeder-system data, screenshots, PDFs, spreadsheets and off-product handoffs.`,
      // [NEEDS SIGN-OFF] "Cleared the backlog" confirmed 2026-09-09; the
      // adoption-by-other-projects count is unconfirmed.
      result: `The workflow cleared the backlog and gave the team a way to keep it clear; ${figures.billingActiveUsers} people use it, and its approval flow has been picked up by other projects.`,
      // "Ten explicit stages" left this line 2026-09-10: the copy enumerates
      // six (feedback-queue C2). The figure and `scope.owned` still say ten.
      approach:
        "Automate retrieval first, then design the mechanism that keeps it clear: explicit stages, progressive validation, ownership, review, status and history, so a package never silently loses state.",
    },
    productFraming:
      "Billing packages for highway-construction work reconcile project-ledger data with documents submitted to state transportation agencies under federal rules. The organization was a few hundred packages behind, and every one was billable work it could not collect until the evidence was assembled and reviewed. The bet had two parts: automate the retrieval that was consuming the team, then build a mechanism that keeps the backlog from re-forming. The second part is why design was in the room. Clearing a backlog once is automation; staying clear is a workflow problem that lives between systems and roles, not in any one screen. I owned product definition as well as design for that reason.",
    // The one study where a metric was set at kickoff, which is the hardest
    // thing on the page to claim after the fact.
    framing: [
      {
        label: "Hypothesis",
        text:
          "Work was disappearing because no role owned it and no shared vocabulary existed for where a package was. Make ownership and status explicit and the backlog becomes recoverable.",
      },
      {
        label: "KPI set at kickoff",
        text:
          "+20% billing-package submission rate, the step where packages were dying. Explicit ownership and status should carry more packages to submission.",
      },
    ],
    hmw:
      "How might we turn a fragmented orchestration process into a guided, error-tolerant workflow that users could review and trust?",
    constraints: [
      {
        constraint: "Evidence came from feeder systems, generated screenshots, invoices, PDFs and spreadsheet edits",
        implication: "The product had to coordinate the whole package, not one screen or document",
      },
      {
        constraint: "Missing screenshots could stop assembly after work was already underway",
        implication: "Retrieval failures needed preserved progress, a visible error and a recovery action",
      },
      {
        constraint: "Different roles could create, edit, review or approve",
        implication: "Ownership, review tasks, permissions, handoffs and status history had to be explicit",
      },
      {
        constraint: "Users could not tell whether a package was still being assembled or ready to submit",
        implication: "Package state had to be a first-class, visible object with history",
      },
      {
        constraint: "Direct editing and the planned dashboard were infeasible in this release",
        implication: "An interim editing path and a smaller scope, without erasing the future opportunity",
      },
    ],
    scope: {
      // Paraphrases BILLING_OPERATIONAL_FLOW and BILLING_STATUS_MODEL in
      // ownedStatements.ts; keep the two agreeing.
      owned:
        "Product and design for the workflow. I defined the features and the scope from what was collected from key stakeholders, designed the front end, ran design handoff and maintained the design backlog. The ten-stage decomposition, the status model, the development-ready flows and the error-condition wireframes are mine.",
      led:
        "Requirements workshops and discovery with the CWO team, the client’s Chief Data Office, product, engineering and UI development, where I set the Must / Should / Nice-to-have option sets. Moderated usability research with ten participants across three user groups. Delivery syncs with the development teams, and working sessions with the data team lead on retrieval and dependencies.",
      influenced:
        "Prioritized backlogs, roadmaps, test plans and acceptance criteria, built from the wireframes. Decision logs, quality gates and risk documentation. The scope calls on the dashboard and the interim editing path. The approval flow designed here has since been picked up by other projects.",
      // [NEEDS SIGN-OFF] Composed from the rewrite's Team metadata.
      workedWith:
        "The CWO team, the client’s Chief Data Office and data team lead, product, engineering, UI development, and finance and operations stakeholders. A principal designer sat with the engagement in a consulting role.",
    },
    evidence: {
      // [NEEDS SIGN-OFF] The participant count and the three groups are new
      // to the site.
      body:
        "Moderated usability research with ten participants across the three user groups (admins, accountants, engineers), plus working sessions on goals, requirements, dependencies, unhappy paths and release feasibility.",
      findings: [
        {
          finding: "Missing screenshots stopped assembly after work was already underway.",
          response: "A recoverable screenshot-generation pattern: visible error state, bot redeploy, preserved progress.",
        },
        {
          finding:
            "Creators and reviewers had different responsibilities, and the review step was where sessions found the most friction.",
          response: "Owner and reviewer views, review tasks, role-based permissions, status history.",
        },
        {
          finding: "Sessions validated the core package-assembly flow across all three groups.",
          response: "The flow held; effort went to states and recovery rather than restructuring.",
        },
        {
          finding: "Direct editing and the dashboard were not feasible in the immediate scope.",
          response: "Interim Excel editing; the dashboard moved to the backlog with its dependency documented.",
        },
      ],
      insight:
        "The workflow could recover billable work only if it made dependencies, responsibility, and recovery visible before submission — not after a package failed.",
    },
    // Six decisions. Titles are the consequence, not the activity, per
    // prototype C and the design critic's strongest finding (feedback-queue
    // C6); the previous titles restated their own mechanism labels.
    // [NEEDS SIGN-OFF] on the titles. The package index left decision 2 and
    // the billing report left decision 4 on 2026-09-10: both are already on
    // the page, in the opener and the annotated screen.
    decisions: [
      {
        mechanism: "Progressive validation",
        decision: "Catch the gap where it happens, not at submission.",
        rationale:
          "Defects that surface only at submission cost the most, because the work behind them is already spread across systems. Missing data, retrieval states and recovery actions surface as the user moves, progress is preserved when a dependency fails, and a completeness review runs before submission.",
        rejected: "waiting until final submission to reveal missing data or evidence",
      },
      {
        mechanism: "The project-number key",
        decision: "A package can be resumed, never accidentally recreated.",
        rationale:
          "The project number is the package’s primary key, so the system can tell resuming an existing package from starting a new one.",
        rejected: "silently duplicating work",
      },
      {
        mechanism: "The six-state status model",
        decision: "A package can never sit in an undefined state.",
        rationale:
          "Users needed to know whether a package was being assembled or ready to submit; the organization needed a record of who did what. Six states, Initiated to Completed, carry both, with trigger-based updates, role-based permissions, status history and notifications. It is what keeps the backlog from re-forming.",
        rejected: "leaving package state implicit in the documents and the people handling them",
        images: [
          {
            src: cwoStatusModelUrl,
            fullSrc: cwoStatusModelUrl,
            inlineSvg: diagramSvg(cwoStatusModelRaw),
            width: 960,
            height: 600,
            alt: "State machine of the billing package status model: Initiated, In Progress, Review, Approved, Finalized, Completed, with a retry loop and a missing-evidence return.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
            caption:
              "Six states, two recovery loops. The loops are where work used to disappear; Review became its own state so nobody edits mid-review.",
          },
        ],
      },
      {
        mechanism: "The review session",
        decision: "The handoff moves into the product, so it has a history.",
        rationale:
          "Handoffs were where packages lost state. Package metadata carries owner, creation date, current status and review tasks, and reusable review-and-submit patterns make the handoff visible. Usability sessions across the three groups drove the specific improvements to the review step.",
        rejected: "treating ownership and review as an off-product coordination step with no visible handoff or history",
      },
      {
        mechanism: "The interim editing path",
        decision: "Continuity now was worth more than a half-built editor.",
        rationale:
          "Direct editing was not feasible within the technical constraints, so Excel stayed as the editing path and the integrated future state was designed rather than abandoned.",
        rejected: "shipping an incomplete in-product editor that did not meet the constraints",
      },
      {
        mechanism: "The visible backlog",
        decision: "The dashboard moved to the backlog with its dependency on record, not out of the picture.",
        rationale:
          "Forcing unsupported work into the release would have put the feasible billing workflow at risk. I surfaced the dependency behind the dashboard, moved it out of scope and held it in the backlog, which kept the case for it alive.",
        rejected: "forcing the dashboard into scope",
        tradeoff: "protecting the core flow cost the release its most demo-friendly screen.",
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
        userSees: "All other users see view-only access until the review is complete, so no one edits a package mid-review",
      },
      {
        state: "Discarded inline edit",
        recovery: "Reverts cleanly without affecting the rest of the package",
      },
    ],
    // The flows behind the screens: three panels, cut from nine plus the
    // MVP2 scope board on 2026-09-10 (feedback-queue C8). Each panel kept
    // proves a claim the decisions make; the six that left restated the role
    // branching, the two export formats and the engineer's read path, and
    // the scope board carries internal release targets at full resolution.
    // The panels display at 0.55 of source so their labels stay legible.
    //
    // [NEEDS SIGN-OFF] on the captions and on the vocabulary the panels carry.
    processImages: [
      {
        src: cwoCreation02b,
        fullSrc: cwoCreation02bFull,
        width: 1428,
        height: 700,
        displayScale: 0.55,
        alt: "Creation flow, the billing package branch: assign owner, assign reviewers, then the create step, which triggers screenshot generation.",
        caption: "Owner and reviewers are assigned before the package is created, so it never exists without someone responsible for it.",
      },
      {
        src: cwoReview01,
        fullSrc: cwoReview01Full,
        width: 1942,
        height: 1833,
        displayScale: 0.55,
        alt: "Review flow, start: open the billing package and check whether a review is active. If one is active and the user is not the reviewer, view only. Otherwise start review, set the status to review active, then loop through inline edits, each saved or discarded, until there are no more edits. A note states that starting a review sets the package to in review and enables editing only for the reviewer; all other users have view-only access until the review is complete.",
        caption: "Starting a review locks the package to one reviewer; everyone else reads until it is done.",
      },
      {
        src: cwoReview02,
        fullSrc: cwoReview02Full,
        width: 1206,
        height: 1739,
        displayScale: 0.55,
        alt: "Review flow, completion: complete review, select the next reviewer, write a git-style commit message, submit; the package status becomes ready for review, with start-review enabled again.",
        caption: "Every review ends with a commit message and a named next reviewer, so the handoff has a record and an owner.",
      },
    ],
    impact: {
      before: `A few hundred billing packages behind, accumulating across fragmented systems, files, screenshots, spreadsheets and manual handoffs.`,
      after: `Backlog cleared, and a workflow that keeps it clear: validation, recovery, ownership, review, status and history in one place, used by ${figures.billingActiveUsers} people.`,
      proof: [
        `The backlog of ${figures.billingBacklogSize} billing packages was cleared; ${figures.billingActiveUsers} people are active on the application.`,
        "The approval flow has been picked up by other projects.",
        "Ownership, package state, action history and review handoffs are visible in-product, with recoverable screenshot generation and progressive validation in the shipped workflow.",
        "A phased roadmap for document integration, in-product editing, expanded review and automated retrieval.",
      ],
      measureNext:
        "Package cycle time from Initiated to Completed, the share of packages that hit the screenshot-recovery path, and first-pass approval rate. The status model makes all three available without new instrumentation.",
      // [NEEDS SIGN-OFF] Authored 2026-09-09 from the rewrite's verify list.
      metricStatus: `The backlog size is my own account, not a project record, and ${figures.billingActiveUsers} active users is my own count as of ${figures.billingActiveAsOf}. The +20% submission-rate KPI is measurable from the status model’s timestamps but not yet measured. Release dates, defect reduction and handoff time are not verified and not stated.`,
    },
    reflection: {
      learned:
        "Complex enterprise workflows fail at the boundaries between systems and teams. The most important design work here was not an individual screen. It was exposing dependencies early, preserving state when automation failed, and making responsibility visible through review and submission. Automation cleared the backlog; the status and ownership model is what kept it from coming back.",
    },
  },
  // Rewritten 2026-09-09 from docs/case-study/rewrites/case-study-document-ai-platform.md,
  // Anastasia's own account. Deliberately NOT published: the client, product
  // and use-case names, the teammates, the partner engineering team, the data
  // vendors, the document store, and the model. The ten-participant count is
  // published only as unverified. Two earlier claims are dropped as
  // unsupported: that testing reversed a tab-based navigation model, and
  // that saving was designed as a privacy action.
  "enterprise-document-knowledge": {
    snapshotFields: [
      // [NEEDS SIGN-OFF] Role expanded to the rewrite's full title; settle it
      // with About and the résumé together.
      { label: "Role", value: "Lead Experience Designer — UX and product strategy lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025" },
      // [NEEDS SIGN-OFF] Production status is unconfirmed.
      { label: "Status", value: "Multi-phase accelerator and product development; production status to confirm" },
      {
        label: "Users",
        value: "Enterprise business users, corporate communications, legal, risk and compliance, contract and product managers",
      },
      {
        label: "Team",
        value: "Design, product, engineering, research, and client stakeholders across two or more time zones",
      },
    ],
    // Adoption and efficiency are unattributed (see impact.metricStatus), so
    // the band counts what the design produced.
    stats: [
      { value: "2", label: "Comparison modes, matched to the reading task" },
      { value: "5", label: "Breakpoints, 375px to 1536px" },
      { value: "7", label: "Named layout regions" },
      { value: "1", label: "Shared framework, not a second product" },
    ],
    // The h1, authored 2026-09-10 by cutting her overview result line to the
    // slot; the page had been falling back to the 40-word result line.
    // [NEEDS SIGN-OFF]
    claim:
      "Verifiable AI answers over thousands of internal documents, and a compliance tool on the same rails, not a second product.",
    overview: {
      challenge:
        "Users could get a fast AI answer from thousands of internal documents but not see where it came from, compare sources, or reuse the pattern for the next use case.",
      result:
        "Sourced answers, an embedded viewer, explicit document selection, two comparison modes and drafting, plus a widget framework that let a compliance tool ship on the same rails.",
      approach:
        "Treat verification as an interaction rather than a disclaimer, make document scope visible product state, and prioritize the backlog by user value, business value, effort and dependency.",
    },
    productFraming:
      "The organization had invested in an enterprise AI assistant and was under pressure to show it did more than summarize. The real bet was whether AI could be trusted inside regulated workflows (legal, compliance, risk, contracts) where an unsourced answer is a liability rather than a time-saver. At the same time the business wanted a second and third use case without funding a second and third product. So this was two problems wearing one name: trust, whether an answer could carry its evidence with it, and leverage, whether the patterns behind it could become parts a compliance tool is assembled from. Both are interaction problems before they are model problems.",
    framing: [
      {
        label: "Hypothesis",
        text:
          "Users will trust AI summaries of internal documents only if the path from any statement back to its source is one interaction away.",
      },
      {
        label: "Success metric",
        text:
          "Not defined at the outset. I would use verification rate: the share of AI answers where a user opens a cited source. Near zero means the citations are decoration.",
      },
    ],
    hmw:
      "How might we help enterprise users move from retrieval to verified understanding — without hiding the documents behind the AI, and without rebuilding the experience for every new use case?",
    constraints: [
      {
        constraint:
          "Retrieval reliability was below an academic standard; the team’s own note was that users would need to validate against sources",
        implication: "Verification had to be a first-class interaction on every answer. Citations became navigation",
      },
      {
        constraint: "Content lived inside governed knowledge domains that only their owners could upload to",
        implication:
          "Selection worked within a domain; cross-domain comparison and outside uploads became explicit product questions rather than assumed capability",
      },
      {
        constraint: "Access to a domain could be denied outright",
        implication: "A real no-access branch with a path to request access, not a dead end",
      },
      {
        constraint: "Three competing plans for the fines and regulations data feed were still unresolved during design",
        implication: "The interface could not assume completeness or freshness, so scope, recency and source stayed visible",
      },
      {
        constraint:
          "Fixed dates (design complete in February, engineering onboarded in March, proof of concept in June) and federated engineering shared across use cases on a common widget framework",
        implication:
          "The backlog was cut into Must / Should / Nice tiers with dated commitments, and every pattern had to be reusable; a bespoke screen was a cost the program could not absorb",
      },
    ],
    scope: {
      owned:
        "UX strategy and feature definition: the region-based layout, the entry point and domain landing, chat and chat-with-document, inline citations and sources, multi-document comparison, draft creation and export, follow-up prompts, and the responsive system across five breakpoints from 375px to 1536px. The UX acceptance criteria engineering built against, and the accessibility documentation (semantic markup, ARIA roles, landmark regions, reading order) written into the design source of truth rather than audited later.",
      led:
        "Requirements and prioritization workshops with product, engineering and client stakeholders. Research planning, protocols and synthesis, including a discussion guide for the compliance use case and another for document comparison. Living backlogs across the document AI product and the adjacent enterprise knowledge experience.",
      influenced:
        "The Must / Should / Nice tiers and their dated commitments. The compliance tool framed as a widget on a shared framework rather than a standalone dashboard. The response template that fixed a mandatory shape for comparison answers (summary, differences, commonalities), which constrained the model’s output, not only the UI around it. I did not own the model, the retrieval stack or the data-source procurement; where those were unresolved, I designed against the uncertainty and said so.",
      workedWith:
        "Design, product, engineering, research, and client stakeholders across two or more time zones, on federated engineering resources shared with other use cases.",
    },
    evidence: {
      // The participant count is published only as unverified.
      body:
        "Research planning, protocols and synthesis, with a discussion guide for the compliance use case and another for document comparison. Four open questions were logged as design risks with owners rather than resolved on assumption. An internal record references ten participants; the count is unverified and not used as a metric.",
      findings: [
        {
          finding: "Tab behavior and document selection caused confusion about what the AI was actually reading.",
          response: "Selected-document state made explicit and persistent: visible chips, editable until submission.",
        },
        {
          finding:
            "Side-by-side comparison worked for nuanced reading of two documents; summary tables worked for scanning many.",
          response: "Two modes, kept deliberately distinct: a diff for two documents, a table for more.",
        },
        {
          finding: "Users wanted clearer guardrails around AI-generated information.",
          response: "Citations, source scope and the original documents stayed visible throughout, not at the end of an answer.",
        },
        {
          finding:
            "Compliance and risk users described a manual process for tracking fines, and named trust and accuracy as their first concern about AI doing it.",
          response: "Filtering and a recommendations playbook scoped as the widget’s core, with inline citation as the validation path.",
        },
      ],
      insight:
        "Evidence cannot be a final-step disclaimer. Users need to see which documents are active, move from a statement to its source, and compare without losing their place.",
    },
    // Five decisions, cut from six on 2026-09-10: the layout-regions and
    // accessibility decision is `scope.owned` and a proof point. The two
    // drawn diagrams sit on the decisions they prove. Mechanism labels
    // authored 2026-09-10 from the decision lines. [NEEDS SIGN-OFF] on the
    // labels.
    decisions: [
      {
        mechanism: "Citations as navigation",
        decision: "Made citations navigation, not decoration.",
        rationale:
          "Every statement carries numbered citation chips; a source opens in the embedded viewer and narrows the chat to that document, and closing it widens the context back. The team knew reliability was imperfect, and if verifying cost the user their place they would stop verifying. An unverified answer in a compliance workflow is worse than none.",
        rejected:
          "a citation footer at the end of a response, which satisfies the audit and makes checking a source a separate task",
        images: [
          {
            src: diCitationLoopUrl,
            fullSrc: diCitationLoopUrl,
            inlineSvg: diagramSvg(diCitationLoopRaw),
            width: 960,
            height: 600,
            alt: "A three-stage loop. A generated statement carries numbered citation chips. Opening the Sources control lists the documents behind the answer, each item opening in the embedded viewer or in a new tab. Opening a source narrows the chat context to that one document, so the answer and its evidence are read together. Closing the source widens the context back to the broader conversation, which returns the user to the statement they started from without losing their place. A note below records the rejected alternative: a citation footer at the end of a response, which satisfies an audit requirement but makes checking a source a separate task.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "Verification is a round trip, not an exit. The context narrows to the source and widens again, so checking a claim never costs the reader their place.",
          },
        ],
      },
      {
        mechanism: "Count-bound comparison",
        decision: "Bound comparison mode to the selection count, not to user preference.",
        rationale:
          "Exactly two documents open a side-by-side diff that highlights shared and differing content section by section. More than two open a comparison table, themes as rows and documents as columns. Two documents invite reading, where nuance matters; five invite scanning, where a grid is the only readable form.",
        rejected: "one universal comparison view for any number of documents",
        tradeoff: "both modes had to be built and maintained.",
        images: [
          {
            src: diComparisonModesUrl,
            fullSrc: diComparisonModesUrl,
            inlineSvg: diagramSvg(diComparisonModesRaw),
            width: 960,
            height: 600,
            alt: "A branch diagram. A user selects between two and ten documents, which appear as chips beside the prompt and stay deselectable until submission. The selection count, not a user preference, decides the mode. Exactly two documents open a side-by-side diff that highlights shared and differing content section by section. Three to ten documents open a comparison table whose rows are themes or entities and whose columns are documents. A note records the rejected alternative: one universal comparison view that scaled to any number of documents.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "The mode is bound to the count, not to a preference. Two documents and five are different reading tasks, so they get different views.",
          },
        ],
      },
      {
        mechanism: "Selection as visible state",
        decision: "Made document selection visible, bounded, editable product state.",
        rationale:
          "Selections appear as chips beside the prompt, stay deselectable until submission, survive collapse and expand, and require two to ten documents, with a plain message outside that range. Scope is the most load-bearing fact about an AI answer, so it belongs in the interface as state the user can see and change, not in retrieval logic they have to trust.",
        rejected:
          "inferring the document set from the prompt, which demos well and makes the one question the user most needs answered, what did you read, unanswerable",
      },
      {
        mechanism: "Draft beside the conversation",
        decision: "Kept drafting beside the conversation and exported it into the system of record.",
        rationale:
          "Create draft opens a focus mode: canvas on the right, chat still on the left. Export writes a Word file to the enterprise document store, versions on re-export, and gives a specific error with a retry when permissions or storage fail. A draft that cannot leave the AI tool sends the user back to copy-paste, and the evidence chain dies at the clipboard.",
        rejected:
          "a rich standalone editor, competing with the tools the organization already runs and cut off from the conversation that produced the draft",
      },
      {
        mechanism: "The widget on shared rails",
        decision: "Shipped the compliance tool as a widget on shared rails, not as its own product.",
        rationale:
          "The regulatory-risk use case reuses document selection, search, comparison, citation and the response template, with its own filtering and dashboard layer on top. Engineering was federated across use cases on a common widget framework; a standalone dashboard would have duplicated the hardest parts of the platform, governed selection and traceable answers, and their failure modes.",
        rejected: "an independent risk dashboard on its own data feed: faster to a demo, and a second product with a second trust model",
      },
    ],
    // The four end-to-end flow panels (user-flow-01…04.jpg, cut from the
    // 9,000px board) left the page 2026-09-10 in the image cut: they carried
    // the team's own sticky notes, unconfirmed as publishable, and the
    // citation loop draws the one leg of that path a decision rests on. The
    // panels stay in the folder, unimported.
    impact: {
      before:
        "A contested backlog, answers that could not be traced to their sources, hidden document scope, and no path to a second use case that did not mean a second product.",
      after:
        "An answer carries its sources, the active document set is visible and editable, comparison matches the reading task, a draft leaves as a versioned file, and a compliance widget rides the same rails.",
      proof: [
        // [NEEDS SIGN-OFF] The April approval is recorded as a team review;
        // confirm it was a formal sign-off.
        "Agreed Must Have / Should Have / Nice to Have tiers with dated commitments, reviewed and approved with the team in April.",
        "Comparison, selection and drafting specified to acceptance-criteria depth, with responsive frames across five breakpoints and seven named layout regions, redlines and permutation states.",
        "Accessibility documented in the design source of truth rather than retrofitted.",
        "The compliance use case reframed from a standalone dashboard into a widget on the shared framework, with a fixed response template as engineering’s testable contract.",
      ],
      metricStatus:
        "No adoption, revenue or time-savings figure appears here. Shipment status and attribution are unverified, and an unattributed number would be worth less than the honest omission.",
    },
    reflection: {
      learned:
        "I designed the verification interactions before anyone could tell me how good the retrieval was, and I still think that was right. But I let the comparison work run ahead of the data-source decision, and it cost us: three plans for the fines and regulations feed were still open while I wrote acceptance criteria that assumed a coherent corpus, so some could not be tested until late. The lesson is not to wait for the data; it is to write the design’s dependency on the data down as explicitly as the interaction, so the unresolved thing stays visible instead of quietly becoming my assumption.",
      principle: "Trust in enterprise AI is built through interaction structure.",
    },
  },
};
