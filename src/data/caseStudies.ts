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
//
// Pared down again later on 2026-09-10 (owner: "the length is too long but
// the structure is good ... some of these might be too in the weeds"). Same
// fields, parts, children, headings, labels, images and stats; every line a
// condensation of the one before it. What went: implementation detail only
// the team would care about, lists of every sub-feature, points restated in a
// neighbouring field, second examples, hedges. Finance Cloud lost the V2
// pivot decision (its content is the first finding, the first proof point
// and the stat band) and the billing study lost the interim-editing and
// visible-backlog decisions (both were the parking lot's first two rows,
// word for word). Report: docs/case-study/2026-09-10-content-pare-down.md.

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
import cwoReview01 from "../assets/case-studies/cwo/review-flow-01.jpg?preview";
import cwoReview01Full from "../assets/case-studies/cwo/review-flow-01.jpg";
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
    claim: `Took a governed AI finance platform from zero to one and scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}.`,
    overview: {
      challenge:
        "Finance teams wanted AI-assisted analysis without giving up the controls, audit trails and accountability that finance work requires.",
      result: `Finance Cloud went from zero to one and scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with ${figures.financePlannedUsers} planned; finance leaders got evidence they could approve.`,
      approach:
        "Separate experimentation from production, make every AI action inspectable, require a person’s approval for anything consequential.",
    },
    // The single-application sentence left this paragraph 2026-09-10: it is
    // decision 1's whole rationale.
    productFraming:
      "The organization wanted AI inside finance and payroll: reporting, forecasting, variance analysis, close, journal entries. All of it touches committed money, and the accountants and controllers stay personally responsible for the numbers whatever produced them. The bet: AI could carry real analysis without moving that responsibility. The risk: a platform either untrusted and unused, or trusted and indefensible. Design was in the room because the problem was not model capability but making governance legible to the people who approve it.",
    framing: [
      {
        label: "Hypothesis",
        text:
          "AI could carry finance analysis without moving responsibility for the numbers, if every consequential action stayed visible and owned by a person.",
      },
      {
        label: "Success metric",
        text:
          "None set at the outset. I would use the share of close work running through the governed pipeline with human sign-off.",
      },
    ],
    hmw:
      "How might we let finance teams use AI for analysis and close work while keeping every consequential action visible, reviewable and owned by a person?",
    // Four rows, from five: the single-application row is decision 1.
    constraints: [
      {
        constraint: "Accountants and controllers are personally responsible for journal entries, accruals, payroll and close",
        implication: "AI could prepare and recommend; a person had to approve anything consequential",
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
    ],
    scope: {
      // Paraphrases FINANCE_PRODUCT_MODEL and FINANCE_RESEARCH_ARTIFACTS in
      // ownedStatements.ts; keep the two agreeing.
      owned:
        "The product model for Finance Cloud: Workflow Builder, Sandbox, promotion gates, Production and monitoring across six user roles. The copilot and agent patterns for reporting, forecasting, variance analysis and close. PRDs, flows, role models, screeners and training plans. Program-level: the suite narrative and unified homepage.",
      led: `The zero-to-one build with the lead product owner, from requirements to a shipped POC. The research that scaled the platform from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}: a 32-analyst pool, 45-minute moderated sessions, protocols segmented by role. Design direction for ${figures.designersDirectedWord} designers across the finance program.`,
      // "now used across the platform" is on the rewrite's own verify list.
      // [NEEDS SIGN-OFF]
      influenced:
        "The three-tier model (act; recommend and wait; stop and escalate), set with ML engineering as product boundaries, not model defaults. The promotion-gate model, now used across the platform. Human responsibility for accruals, journal entries, payroll and close as a product principle.",
      // [NEEDS SIGN-OFF] Composed from the rewrite's "Worked with" line and
      // the former team grid.
      workedWith: `Program leadership, product management, ${figures.designersDirectedWord} application-level designers, engineering and data specialists, ML engineering and AI research, access-management partners, finance subject-matter experts, compliance stakeholders and end users.`,
    },
    evidence: {
      body:
        "Role-segmented moderated prototype testing: 45-minute one-on-one sessions, questions tailored to each participant’s responsibilities. POC participant counts are not recorded and not stated.",
      // The findings that changed something the constraints do not already
      // state; the rewrite's first four restated the constraints and are cut.
      // The pilot-versus-scale finding left 2026-09-10: it is the reflection.
      findings: [
        {
          finding: `${figures.hackathonUsers} hackathon users ran ${figures.hackathonAnalyses} analyses on V1 and would not read or adjust generated Python.`,
          response: "V2 rebuilt the flow around direct data exploration and agent handoff; research set V3.",
        },
        {
          finding: "Users saw only products they were already permitted to use; the wider suite was invisible.",
          response: "A central, access-aware homepage that knows what each person can use after login.",
        },
        {
          finding: "Teams used overlapping language for products, roles and AI concepts, with no shared object model.",
          response:
            "A formal hierarchy, Category → Driver → Anchor Signal, before monitors, thresholds and briefings were designed.",
        },
      ],
      insight: "Governance people cannot see is not governance they will approve.",
    },
    // Five decisions, cut from eight: on 2026-09-10 the failure-states
    // decision went (it is the constraints row and the states table), the
    // documented-access-assumptions decision went (process, not product),
    // and later that day the V2 pivot went (it is the first finding, the
    // first proof point and the stat band's "three versions"). Decisions 1
    // and 2 are the program layer (SuiteMap, the front-door flow), 3 to 5
    // the platform layer (PromotionGate, GovernedPipeline,
    // ConfidenceThresholds). Mechanism labels authored 2026-09-10 from the
    // decision lines. [NEEDS SIGN-OFF] on the labels.
    decisions: [
      {
        mechanism: "The suite reframe",
        decision:
          "Repositioned the program from one integrated application to a suite with a shared experience layer.",
        rationale:
          "The architecture could not support the single-app promise. The reframe told the truth about the present and gave a credible path forward: common visual language, central discovery, clear product relationships.",
        rejected: "continuing to describe the program as one integrated application",
        tradeoff: "coherence had to be earned through design rather than inherited from architecture.",
      },
      {
        mechanism: "The front door",
        decision:
          "Designed the homepage as a launcher and discovery hub, personalized from post-login access.",
        rationale:
          "“Your Apps” shows what each person can actually use; a discovery area shows the rest of the suite. Separate tabs avoided cross-app authentication and let independently built products keep shipping.",
        rejected: "a catalog or dashboard; embedding every product in one shell",
        tradeoff: "the seams stay visible: coherent at discovery, not continuous in use.",
        images: [
          {
            label: "The front door",
            src: gafFrontDoorUrl,
            fullSrc: gafFrontDoorUrl,
            inlineSvg: diagramSvg(gafFrontDoorRaw),
            width: 960,
            height: 600,
            alt: "A four-stage user flow. A person signs in; their access is resolved after login. The homepage then answers two questions at once: a personalized Your Apps area lists the products that person can actually use, and a discovery area shows the wider suite they cannot yet see, which is what research found people were missing. Choosing a product launches it in its own tab with its internal navigation intact, so independently built products keep shipping. Two rejected alternatives are recorded: a kitchen-sink catalog or a complex dashboard in place of a launcher, and embedding every product inside one shell.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "The homepage answers two questions: what you can use, and what else exists. Launching in a tab was a stated cost.",
          },
        ],
      },
      {
        mechanism: "The promotion gate",
        decision:
          "Separated experimentation from production, with promotion as a gated checklist that names what is unmet.",
        rationale:
          "Promotion is an explicit, reviewable event; a blocked one says which control or approval is missing. A rule that lives only in the backend reads as “it won’t let me”, indistinguishable from a bug.",
        rejected: "one workspace gated by permissions, or a one-click publish",
        tradeoff: "a permission is a setting someone has to remember exists.",
      },
      {
        mechanism: "The copilot plan",
        decision:
          "Scoped the copilot to the work in front of the user, confirming its understanding before producing a plan.",
        rationale:
          "A plan is inspectable; an answer is not. Assistance appears inside a specific report, forecast or close task and runs understand, clarify, confirm, then plan, so wrong assumptions surface before a result does.",
        rejected:
          "a general-purpose assistant that answers immediately and leaves wrong assumptions for the user to find",
      },
      // The tiers are defined; the model-confidence cut-offs are pending (the
      // 2026-09-03 correction). The 72-hour success definition is her earlier
      // account. [NEEDS SIGN-OFF]
      {
        mechanism: "The three-tier boundary",
        decision:
          "Defined where the system acts, recommends and waits, or stops and escalates, as product boundaries, not model defaults.",
        rationale:
          "A raw confidence score pushes interpretation onto a user with no basis for judging whether it is safe for an accrual. The cut-offs are still to be set with ML engineering. We defined agent success as analyst behavior within 72 hours, not forecast precision.",
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
        state: "Blocked promotion",
        userSees: "The reason",
        recovery: "Checklist of unmet requirements",
      },
      {
        state: "Anomaly detected in a figure",
        userSees: "Notification to the accountable role with variance, drivers and affected records",
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
      after: `Experimentation separated from production, every AI action inspectable, human approval on consequential work; scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}.`,
      // Four points, and the band's four figures are all argued here.
      proof: [
        `${figures.hackathonUsers} finance users ran ${figures.hackathonAnalyses} analyses on V1 at a hackathon; the result pivoted the product.`,
        `A working POC from zero, scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}; ${figures.financeCloudVersionsWord.toLowerCase()} versions, each redirected by research.`,
        `${figures.researchEngagementsWord} research engagements, grown to a 32-analyst pool, now directing an ${figures.programScale} modernization program.`,
        "The promotion-gate model is used across the platform; a suite homepage MVP is in development.",
      ],
      measureNext:
        "Promotions blocked then resolved without escalation, anomaly notifications acted on versus dismissed, and how often copilot plans are edited before they run. All three come from the audit history the product already keeps.",
      // [NEEDS SIGN-OFF] The pilot figures are her account, restored
      // 2026-09-09 on her instruction; this caveat is what makes them
      // publishable.
      metricStatus: `The ${figures.financePilotUsers} → ${figures.financeScaledUsers} figures are my own account, not a project record; what ${figures.financeScaledUsers} counts (provisioned, onboarded or active) is unconfirmed, and ${figures.financePlannedUsers} is a plan. Efficiency gains and close-cycle improvements are not verified and not stated; client financial figures are not published.`,
    },
    reflection: {
      // The pilot and scale counts read from ./figures since 2026-09-10; they
      // were spelled out as words before.
      learned: `The hard part was not making the AI capable but making its governance legible. At ${figures.financePilotUsers} pilot users, controls could live in the backend because anyone who saw something odd could ask someone who knew. At ${figures.financeScaledUsers} they could not, and the design had to absorb every explanation a person had been giving. I would now design for the thousandth user from the first sketch.`,
      // Scorecard session record §4.5. "Leadership is redirecting" is present
      // tense; the decision was still pending in September. [NEEDS SIGN-OFF]
      wouldChange:
        "Two automations, anomaly detection and journal entries, did not scale: a model tuned for one flow does not transfer. Leadership is redirecting on cost, with my research as the evidence. Next time I would test transferability across two flows before designing deeply for one.",
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
      "A churn score became a decision a person reviews, edits and monitors, shown as a concept, not deployed.",
    // [NEEDS SIGN-OFF] on the cuts to one sentence each. The result line no
    // longer repeats the claim; "from detection to a reviewed, monitored
    // action" is her Outcome after-line, condensed.
    overview: {
      challenge:
        "A telecommunications operator had predictive churn signals, but nothing connected detection to a reviewed action and its result.",
      result:
        "An end-to-end mitigation flow from detection to a reviewed, monitored action, shown as a concept rather than deployed.",
      approach:
        "Treat a prediction as the opening of a decision, with context beside the score and human review before any AI-drafted message goes out.",
    },
    // Her former `context` and the card's problem line; the hypothesis itself
    // is the framing block directly below, so it is not repeated here.
    // [NEEDS SIGN-OFF]
    productFraming:
      "Analysts, service teams, an AI layer and the partner systems feeding it each held part of the picture. Nothing connected detection to a reviewed action and what happened next; the gap between a model score and a person taking the right action was undesigned. That gap was the bet. As a showcase concept, the work had to prove the interaction model end to end.",
    framing: [
      {
        label: "Hypothesis",
        text: "A churn score creates value only when the accountable person can act on it with context.",
      },
    ],
    // [NEEDS SIGN-OFF] Composed from her hypothesis and the review constraint.
    hmw:
      "How might we turn a churn score into an action the accountable person can take in context, and review before it reaches the customer?",
    constraints: [
      {
        constraint: "AI-drafted messages and offers could affect the customer relationship",
        implication: "A person had to review and edit anything AI drafted before it reached a customer",
      },
      {
        constraint: "Chatbot-to-human handoff was gated on sentiment",
        // [NEEDS SIGN-OFF] "working from an AI summary" condenses "with the
        // AI summary and suggested action carried across".
        implication: "Routine requests stayed fast; moments needing empathy went to a person working from an AI summary",
      },
      {
        constraint: "Analysts, service teams, an AI layer and partner systems each held part of the picture",
        implication: "The flow had to run end to end across analyst, customer and representative, not another dashboard",
      },
      {
        constraint: "A showcase concept that never reached customers",
        implication: "No churn or revenue metric could be measured; the study proves an interaction model, not adoption",
      },
    ],
    scope: {
      // Paraphrases CCJ_HUMAN_REVIEW in ownedStatements.ts; keep the two agreeing.
      owned:
        "The journey platform and end-to-end mitigation flow: dynamic segmentation, churn signals, sentiment and NPS health, AI-assisted messaging, offers, monitoring. Model output as decision support, predictions beside customer context, never an opaque score. Human review and editing of every AI message before it reaches a customer.",
      workedWith:
        "UX design, data science, marketing and CX, AI/NLP engineering, front-end and back-end engineering, and product owners.",
    },
    evidence: {
      // The hypothesis restated here until 2026-09-10; it is the framing
      // block and the pull-quote already.
      body: "User research against the hypothesis behind the vision; it held.",
      // The static-segments finding left 2026-09-10: it is decision 2.
      findings: [
        {
          finding:
            "Behavioral data, customer feedback, NPS, campaigns and journey touchpoints were never presented as one decision context.",
          response: "Customer and segment health as one connected view, not another isolated dashboard.",
        },
        {
          finding: "A churn score did not explain what happened or what a team should do next.",
          response: "Predictive risk placed beside behavior, sentiment, journey context and available actions.",
        },
        {
          finding: "Failures concentrated in specific journey paths, but no view showed which path a customer had taken.",
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
          "The reset put the customer’s context beside the score, options to compare, and the ability to edit anything AI drafted before a customer saw it. Every surface was rebuilt around that.",
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
          "The dashboard leads with the KPIs at risk, each with a why and a path to mitigate it. Journey exploration shows where customers fail by entry channel.",
        rejected: "presenting an opaque score as a final answer",
        images: [
          {
            label: "Analyst dashboard",
            src: ccjDashboard,
            fullSrc: ccjDashboardFull,
            width: 1600,
            height: 1024,
            alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
            caption:
              "At-risk KPIs beside ARPU, NPS, retention and campaign performance, each with a direct path to mitigation.",
          },
          {
            label: "Journey exploration",
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
          "The mitigation plan pairs the KPI at risk with its drivers and one recommended action, testable in a what-if tool first. AI drafts the message; the person edits the preview before it goes out.",
        images: [
          {
            label: "Mitigation plan",
            src: ccjMitigationPlan,
            fullSrc: ccjMitigationPlanFull,
            width: 1600,
            height: 1547,
            alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
            caption:
              "The KPI’s drivers beside an AI-drafted, tone-controlled offer. A person edits the preview before it launches.",
          },
        ],
      },
      {
        mechanism: "The sentiment gate",
        decision:
          "Routed customers to a chatbot first, handing off to a representative only when sentiment and account context called for a person.",
        // The declined-offer loop is the states table's last row.
        rationale:
          "Routine requests stayed fast while moments that needed empathy were protected. The representative works from an AI summary and suggested action.",
        images: [
          {
            label: "Representative chat",
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
        userSees: "A prompt to draft a tone-matched AI message from the triggers detected",
      },
      {
        state: "Representative needs to go further than the model recommends",
        userSees: "Additional offers the automated system does not yet know about",
      },
      {
        state: "Reviewing a case mid-conversation",
        userSees: "The customer’s file and offer history, without leaving the chat",
      },
      {
        state: "Offer declined or resolution unsuccessful",
        recovery: "Loops back to offer adjustment, not a dead end",
      },
    ],
    // The end-to-end user-flow board (user-flow.jpg) left the page 2026-09-10:
    // the three-role loop appended under Key decisions draws the same path
    // legibly, and two drawings of one path is one too many.
    impact: {
      before: "Fragmented customer signals and cross-tool handoffs.",
      after:
        "One workflow to detect risk, understand the behavior behind it, choose a mitigation, review the message and monitor the response.",
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
        "The project reset once we stopped treating the churn prediction as the answer and treated it as the opening of a decision the representative still had to make.",
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
    claim: `Cleared a backlog of ${figures.billingBacklogSize} billing packages with an auditable workflow now used by ${figures.billingActiveUsers} people.`,
    // Layout C (2026-09-10): the claim headings, opener pair, annotated screen
    // and parking lot are lifted from docs/case-study/prototypes/c-lede.html,
    // which restated this study's own copy. None of it has been on the site
    // before, so every line is [NEEDS SIGN-OFF].
    headings: {
      "product-framing": "Clearing a backlog once is automation. Staying clear is a workflow problem.",
      scope: "I owned the product definition, not just the design",
      // [NEEDS SIGN-OFF] Was "Six": two decisions left the list 2026-09-10
      // (see the note at `decisions`), and the count follows them.
      decisions: "Four decisions, and what each one cost",
      parked: "What did not make the release, and why",
      evidence: "What ten usability sessions changed",
      learned: "Enterprise workflows fail at the boundaries between systems and teams",
    },
    opener: {
      detail: {
        label: "Billing report",
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
          "In context. Every package is found by project number before a new one can be started, the rule that stopped duplicates.",
      },
    },
    // Pin coordinates are percentages placed by eye in the prototype; two of
    // the four land on a table row rather than the column header they mean.
    // Tune against the asset in the browser.
    annotated: {
      // Decision 02's plate: the index is the project-number key, shown.
      decision: 1,
      image: {
        label: "Package index",
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
          text: "Guarded by the identity check. Starting a package runs the project-number lookup first, so duplicates cannot be created.",
        },
        {
          x: 53,
          y: 33,
          text: "The primary key is the filter. A package is found by project number, hence the search field.",
        },
        {
          x: 47,
          y: 43,
          text: "Ownership before you open anything. The owner column makes the responsible person visible from the index.",
        },
        {
          x: 58,
          y: 43,
          text: "The status model, surfacing. Every transition is timestamped, so last-modified is a real signal, not a file date.",
        },
      ],
      caption:
        "Four decisions on one screen: identity, ownership and state are readable before a package is opened.",
    },
    // The first two rows carry what the interim-editing and visible-backlog
    // decisions said until 2026-09-10; the decisions repeated these rows.
    parked: [
      {
        item: "The reporting dashboard",
        // [NEEDS SIGN-OFF] Condensed; "cost the release" was "protecting the
        // core flow cost the release".
        why: "Infeasible this release. Surfacing the dependency and holding it in the backlog cost the release its most demo-friendly screen.",
      },
      {
        item: "In-product editing of package, project and customer details",
        why: "Not feasible within the technical constraints; Excel stayed the interim path. Continuity now was worth more than a half-built editor.",
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
      challenge: `A backlog of ${figures.billingBacklogSize} billing packages had built up behind manual assembly of feeder-system data, screenshots, PDFs, spreadsheets and handoffs.`,
      // [NEEDS SIGN-OFF] "Cleared the backlog" confirmed 2026-09-09; the
      // adoption-by-other-projects count is unconfirmed.
      result: `The workflow cleared the backlog and keeps it clear; ${figures.billingActiveUsers} people use it, and other projects have picked up its approval flow.`,
      // "Ten explicit stages" left this line 2026-09-10: the copy enumerates
      // six (feedback-queue C2). The figure and `scope.owned` still say ten.
      approach:
        "Automate retrieval first, then design what keeps it clear: explicit stages, ownership, review and status history.",
    },
    // The backlog size is the claim and the challenge line; the
    // automation-versus-workflow sentence is this section's heading.
    productFraming:
      "Billing packages for highway-construction work reconcile project-ledger data with documents submitted to state transportation agencies under federal rules. Every package in the backlog was billable work the organization could not collect until the evidence was assembled and reviewed. The bet had two parts: automate the retrieval consuming the team, then build a mechanism that keeps the backlog from re-forming. The second part is why design was in the room, and why I owned product definition as well as design.",
    // The one study where a metric was set at kickoff, which is the hardest
    // thing on the page to claim after the fact.
    framing: [
      {
        label: "Hypothesis",
        text:
          "Work disappeared because no role owned it and no vocabulary said where it was. Make both explicit and the backlog becomes recoverable.",
      },
      {
        label: "KPI set at kickoff",
        text:
          "+20% billing-package submission rate, the step where packages were dying. Explicit ownership and status should carry more packages to submission.",
      },
    ],
    hmw:
      "How might we turn a fragmented orchestration process into a guided, error-tolerant workflow that users could review and trust?",
    // Four rows, from five: the infeasible-editing-and-dashboard row is the
    // parking lot.
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
    ],
    scope: {
      // Paraphrases BILLING_OPERATIONAL_FLOW and BILLING_STATUS_MODEL in
      // ownedStatements.ts; keep the two agreeing.
      owned:
        "Product and design for the workflow. I defined the features and scope from stakeholder input, designed the front end, ran handoff and maintained the design backlog. The ten-stage decomposition, the status model, the development-ready flows and the error-condition wireframes are mine.",
      // [NEEDS SIGN-OFF] "the priority tiers" stands for "the Must / Should /
      // Nice-to-have option sets".
      led:
        "Requirements workshops and discovery with the CWO team, the client’s Chief Data Office, product, engineering and UI development, where I set the priority tiers. Moderated usability research with ten participants across three user groups. Working sessions with the data team lead on retrieval and dependencies.",
      influenced:
        "Prioritized backlogs, roadmaps, test plans and acceptance criteria, built from the wireframes. The scope calls on the dashboard and the interim editing path. The approval flow has since been picked up by other projects.",
      // [NEEDS SIGN-OFF] Composed from the rewrite's Team metadata.
      workedWith:
        "The CWO team, the client’s Chief Data Office, product, engineering, UI development, and finance and operations stakeholders. A principal designer sat with the engagement in a consulting role.",
    },
    evidence: {
      // [NEEDS SIGN-OFF] The participant count and the three groups are new
      // to the site.
      body:
        "Moderated usability research with ten participants across the three user groups (admins, accountants, engineers), plus working sessions on requirements, dependencies and release feasibility.",
      // The editing-and-dashboard finding left 2026-09-10: it is the parking
      // lot's first two rows.
      findings: [
        {
          finding: "Missing screenshots stopped assembly after work was already underway.",
          response: "A recoverable screenshot-generation pattern: visible error state, bot redeploy, preserved progress.",
        },
        {
          finding: "Creators and reviewers had different responsibilities, and the review step had the most friction.",
          response: "Owner and reviewer views, review tasks, role-based permissions, status history.",
        },
        {
          finding: "Sessions validated the core package-assembly flow across all three groups.",
          response: "The flow held; effort went to states and recovery rather than restructuring.",
        },
      ],
      insight:
        "The workflow could recover billable work only by making dependencies, responsibility and recovery visible before submission, not after a package failed.",
    },
    // Four decisions, from six on 2026-09-10: the interim-editing path and
    // the visible-backlog decisions were the parking lot's first two rows
    // restated, so the rows kept them (neither carried an image). Titles are
    // the consequence, not the activity, per prototype C and the design
    // critic's strongest finding (feedback-queue C6); the previous titles
    // restated their own mechanism labels. [NEEDS SIGN-OFF] on the titles.
    // The package index left decision 2 and the billing report left decision
    // 4 earlier on 2026-09-10: both are already on the page, in the opener
    // and the annotated screen.
    decisions: [
      {
        mechanism: "Progressive validation",
        decision: "Catch the gap where it happens, not at submission.",
        rationale:
          "Defects that surface at submission cost the most; the work behind them is already spread across systems. Missing data surfaces as the user moves, progress is preserved when a dependency fails, and a completeness review runs before submission.",
        rejected: "waiting until submission to reveal missing data",
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
        rationale: `Users needed to know whether a package was being assembled or ready to submit; the organization needed a record of who did what. ${figures.billingStatusStates} states, Initiated to Completed, carry both, with permissions, history and notifications. It is what keeps the backlog from re-forming.`,
        rejected: "leaving package state implicit in the documents and the people handling them",
        images: [
          {
            label: "Status model",
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
        // The usability sentence is the second finding.
        rationale:
          "Handoffs were where packages lost state. Package metadata carries owner, status and review tasks, and reusable review-and-submit patterns make the handoff visible.",
        rejected: "an off-product coordination step with no visible handoff or history",
        // The review flow was the first of three study-level flow panels
        // until 2026-09-11; it proves this decision, so it is its plate. The
        // other two (creation-flow-02b, review-flow-02) left the page with
        // the Plates layout, which showed neither. [NEEDS SIGN-OFF]
        images: [
          {
            label: "Review flow",
            src: cwoReview01,
            fullSrc: cwoReview01Full,
            width: 1942,
            height: 1833,
            displayScale: 0.55,
            alt: "Review flow, start: open the billing package and check whether a review is active. If one is active and the user is not the reviewer, view only. Otherwise start review, set the status to review active, then loop through inline edits, each saved or discarded, until there are no more edits. A note states that starting a review sets the package to in review and enables editing only for the reviewer; all other users have view-only access until the review is complete.",
            caption: "Starting a review locks the package to one reviewer; everyone else reads until it is done.",
          },
        ],
      },
    ],
    // The edge-cases table is decision 01's plate (Plates layout, 2026-09-11):
    // it is the evidence for progressive validation.
    statesDecision: 0,
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
        userSees: "Everyone else has view-only access until the review completes",
      },
      {
        state: "Discarded inline edit",
        recovery: "Reverts cleanly without affecting the rest of the package",
      },
    ],
    impact: {
      // The backlog size reads from ./figures since 2026-09-10; it was typed
      // into this line before.
      before: `A backlog of ${figures.billingBacklogSize} billing packages across fragmented systems, screenshots, spreadsheets and manual handoffs.`,
      after: `Backlog cleared, and a workflow that keeps it clear: validation, recovery, ownership, review and status history, used by ${figures.billingActiveUsers} people.`,
      // Three points: the phased-roadmap point is the parking lot's last row.
      proof: [
        `The backlog of ${figures.billingBacklogSize} billing packages was cleared; ${figures.billingActiveUsers} people are active on the application.`,
        "The approval flow has been picked up by other projects.",
        "Ownership, package state, history and review handoffs are visible in-product, with recoverable screenshot generation and progressive validation.",
      ],
      measureNext:
        "Package cycle time from Initiated to Completed, the share of packages that hit the screenshot-recovery path, and first-pass approval rate. The status model makes all three available without new instrumentation.",
      // [NEEDS SIGN-OFF] Authored 2026-09-09 from the rewrite's verify list.
      metricStatus: `The backlog size is my own account, not a project record, and ${figures.billingActiveUsers} active users is my own count as of ${figures.billingActiveAsOf}. The +20% submission-rate KPI is measurable from status timestamps but not yet measured. Defect reduction and handoff time are not verified.`,
    },
    reflection: {
      // The first sentence is this section's heading.
      learned:
        "The most important design work here was not a screen. It was exposing dependencies early, preserving state when automation failed, and making responsibility visible through review and submission. Automation cleared the backlog; the status and ownership model kept it from coming back.",
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
      "Verifiable AI answers over thousands of documents; a compliance tool on the same rails, not a second product.",
    overview: {
      challenge:
        "Users got fast AI answers from thousands of documents but could not see where they came from or compare sources.",
      result:
        "Sourced answers, explicit document selection, two comparison modes and drafting, on a widget framework a compliance tool could reuse.",
      approach:
        "Treat verification as an interaction, not a disclaimer, make document scope visible product state, and prioritize by value, effort and dependency.",
    },
    // [NEEDS SIGN-OFF] "reuse" replaces her word "leverage" for the second
    // problem; the regulated-workflow list (legal, compliance, risk,
    // contracts) is the Users line above and is not repeated.
    productFraming:
      "The organization had an enterprise AI assistant under pressure to show it did more than summarize. The bet was whether AI could be trusted inside regulated workflows, where an unsourced answer is a liability rather than a time-saver, and the business wanted a second use case without funding a second product. Two problems wearing one name: trust, whether an answer carries its evidence, and reuse, whether the patterns behind it could become parts a compliance tool is assembled from.",
    framing: [
      {
        label: "Hypothesis",
        text:
          "Users will trust AI summaries of internal documents only if the path from any statement to its source is one interaction away.",
      },
      {
        label: "Success metric",
        text:
          "Not defined at the outset. I would use verification rate, the share of AI answers where a user opens a cited source.",
      },
    ],
    hmw:
      "How might we move enterprise users from retrieval to verified understanding without hiding the documents behind the AI, or rebuilding the experience for every use case?",
    // Four rows, from five: the denied-access row went (an edge case, not a
    // constraint that shaped the product), and the milestone months left
    // the fixed-dates row (planning-board dates, not a delivery record).
    constraints: [
      {
        constraint: "Retrieval was imperfect; the team’s own note said users would need to validate against sources",
        implication: "Verification had to be a first-class interaction on every answer",
      },
      {
        constraint: "Content lived inside governed knowledge domains that only their owners could upload to",
        implication: "Selection worked within a domain; cross-domain comparison and outside uploads became explicit product questions",
      },
      {
        constraint: "Three competing plans for the fines and regulations data feed were still unresolved during design",
        implication: "The interface could not assume completeness or freshness, so scope, recency and source stayed visible",
      },
      {
        constraint: "Fixed dates and federated engineering shared across use cases on a common widget framework",
        implication: "Must/Should/Nice tiers with dated commitments, and every pattern had to be reusable",
      },
    ],
    scope: {
      owned:
        "UX strategy and feature definition: the region-based layout, chat and chat-with-document, inline citations, multi-document comparison, drafting and export, and the responsive system across five breakpoints. The UX acceptance criteria engineering built against, and accessibility documentation written into the design source of truth, not audited later.",
      led:
        "Requirements and prioritization workshops with product, engineering and client stakeholders. Research planning, protocols and synthesis. Living backlogs across the document AI product and the adjacent enterprise knowledge experience.",
      // The widget-on-shared-rails sentence is decision 5.
      influenced:
        "The Must/Should/Nice tiers. The response template that fixed a mandatory shape for comparison answers, constraining the model’s output, not only the UI. I did not own the model, retrieval or data procurement; where those were unresolved, I designed against the uncertainty and said so.",
      workedWith:
        "Design, product, engineering, research and client stakeholders across two or more time zones, with federated engineering shared across use cases.",
    },
    evidence: {
      // The participant count is published only as unverified.
      body:
        "Research planning, protocols and synthesis, with a discussion guide for the compliance use case and another for document comparison. An internal record references ten participants; the count is unverified.",
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
          response: "Citations, source scope and the original documents stayed visible throughout.",
        },
        {
          finding: "Compliance users tracked fines by hand; trust and accuracy were their first concern about AI.",
          response: "Filtering and a recommendations playbook as the widget’s core, inline citation as the validation path.",
        },
      ],
      insight:
        "Evidence cannot be a final-step disclaimer: users need to see which documents are active and reach the source without losing their place.",
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
          "Every statement carries citation chips; a source opens in the embedded viewer and narrows the chat to that document. Reliability was imperfect, and if verifying cost the user their place they would stop verifying. An unverified answer in a compliance workflow is worse than none.",
        rejected: "a citation footer at the end of a response, which makes checking a source a separate task",
        images: [
          {
            label: "Citation loop",
            src: diCitationLoopUrl,
            fullSrc: diCitationLoopUrl,
            inlineSvg: diagramSvg(diCitationLoopRaw),
            width: 960,
            height: 600,
            alt: "A three-stage loop. A generated statement carries numbered citation chips. Opening the Sources control lists the documents behind the answer, each item opening in the embedded viewer or in a new tab. Opening a source narrows the chat context to that one document, so the answer and its evidence are read together. Closing the source widens the context back to the broader conversation, which returns the user to the statement they started from without losing their place. A note below records the rejected alternative: a citation footer at the end of a response, which satisfies an audit requirement but makes checking a source a separate task.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "A round trip, not an exit: context narrows to the source and widens again, so checking never costs the reader their place.",
          },
        ],
      },
      {
        mechanism: "Count-bound comparison",
        decision: "Bound comparison mode to the selection count, not to user preference.",
        rationale:
          "Two documents open a side-by-side diff; more than two open a comparison table, themes as rows and documents as columns. Two documents invite reading, where nuance matters; five invite scanning, where a grid is the only readable form.",
        rejected: "one universal comparison view for any number of documents",
        tradeoff: "both modes had to be built and maintained.",
        images: [
          {
            label: "Comparison modes",
            src: diComparisonModesUrl,
            fullSrc: diComparisonModesUrl,
            inlineSvg: diagramSvg(diComparisonModesRaw),
            width: 960,
            height: 600,
            alt: "A branch diagram. A user selects between two and ten documents, which appear as chips beside the prompt and stay deselectable until submission. The selection count, not a user preference, decides the mode. Exactly two documents open a side-by-side diff that highlights shared and differing content section by section. Three to ten documents open a comparison table whose rows are themes or entities and whose columns are documents. A note records the rejected alternative: one universal comparison view that scaled to any number of documents.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "Bound to the count, not a preference: two documents and five are different reading tasks, so they get different views.",
          },
        ],
      },
      {
        mechanism: "Selection as visible state",
        decision: "Made document selection visible, bounded, editable product state.",
        rationale:
          "Selections appear as chips, editable until submission and bounded to two to ten documents. Scope is the most load-bearing fact about an AI answer; it belongs in the interface as state the user can see and change, not in retrieval logic they must trust.",
        // [NEEDS SIGN-OFF] The quoted question condenses "makes the one
        // question the user most needs answered, what did you read,
        // unanswerable".
        rejected: "inferring the document set from the prompt, which demos well and leaves “what did you read” unanswerable",
      },
      {
        mechanism: "Draft beside the conversation",
        decision: "Kept drafting beside the conversation and exported it into the system of record.",
        rationale:
          "Create draft opens a focus mode with the chat still beside it. Export writes a versioned Word file to the enterprise document store. A draft that cannot leave the AI tool sends the user back to copy-paste, and the evidence chain dies at the clipboard.",
        rejected: "a standalone editor, competing with tools the organization already runs and cut off from the conversation",
      },
      {
        mechanism: "The widget on shared rails",
        decision: "Shipped the compliance tool as a widget on shared rails, not as its own product.",
        rationale:
          "The regulatory-risk use case reuses document selection, search, comparison, citation and the response template, with its own filtering layer on top. A standalone dashboard would have duplicated the hardest parts of the platform, governed selection and traceable answers, and their failure modes.",
        rejected: "an independent risk dashboard: faster to a demo, and a second product with a second trust model",
      },
    ],
    // The four end-to-end flow panels (user-flow-01…04.jpg, cut from the
    // 9,000px board) left the page 2026-09-10 in the image cut: they carried
    // the team's own sticky notes, unconfirmed as publishable, and the
    // citation loop draws the one leg of that path a decision rests on. The
    // panels stay in the folder, unimported.
    impact: {
      before:
        "Untraceable answers, hidden document scope, and no path to a second use case without a second product.",
      after:
        "Answers carry their sources, the document set is visible, drafts leave as versioned files, and a compliance widget rides the same rails.",
      proof: [
        // [NEEDS SIGN-OFF] The April approval is recorded as a team review;
        // confirm it was a formal sign-off.
        "Must/Should/Nice tiers with dated commitments, reviewed and approved with the team in April.",
        "Comparison, selection and drafting specified to acceptance-criteria depth, with frames across five breakpoints and seven layout regions.",
        "Accessibility documented in the design source of truth rather than retrofitted.",
        "The compliance use case reframed from a standalone dashboard into a widget on the shared framework.",
      ],
      metricStatus:
        "No adoption, revenue or time-savings figure appears here. Shipment status and attribution are unverified, and an unattributed number would be worth less than the honest omission.",
    },
    reflection: {
      learned:
        "I designed the verification interactions before anyone knew how good the retrieval was, and that was right. But I let the comparison work run ahead of the data-source decision: I wrote acceptance criteria that assumed a coherent corpus while the feed was undecided. The lesson is not to wait for the data; it is to write the design’s dependency on it as explicitly as the interaction, so it stays visible.",
      principle: "Trust in enterprise AI is built through interaction structure.",
    },
  },
};
