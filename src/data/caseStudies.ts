import { figures } from "./figures";
// Case study content, keyed by project slug.
//
// buildSections renders the fields as: Overview -> Problem (context, framing,
// insight) -> Turning point -> Solution (with the featured decision) ->
// Outcomes -> Role and team -> Research -> Reflection -> Details.
//
// Figures that repeat across the site come from ./figures — never retype one.
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
import cwoPackageIndex from "../assets/case-studies/cwo/package-index.jpg?preview";
import cwoPackageIndexFull from "../assets/case-studies/cwo/package-index.jpg";
import cwoBillingReport from "../assets/case-studies/cwo/billing-report.jpg?preview";
import cwoBillingReportFull from "../assets/case-studies/cwo/billing-report.jpg";
import cwoCreationFlow from "../assets/case-studies/cwo/creation-flow.jpg?preview";
import cwoCreationFlowFull from "../assets/case-studies/cwo/creation-flow.jpg";
import cwoFlow from "../assets/case-studies/cwo/flow.jpg?preview";
import cwoFlowFull from "../assets/case-studies/cwo/flow.jpg";
import cwoStrategyAlignment from "../assets/case-studies/cwo/strategy-alignment.jpg?preview";
import cwoStrategyAlignmentFull from "../assets/case-studies/cwo/strategy-alignment.jpg";
// Diagram drawn 2026-09-08 with the diagram-design plugin; source is the
// .html beside it, exported to .svg and .png (see research/decisions/case-study-diagrams.md).
import cwoStatusModel from "../assets/case-studies/cwo/status-model.png?preview";
import cwoStatusModelFull from "../assets/case-studies/cwo/status-model.png";
import gafFrontDoor from "../assets/case-studies/gaf/front-door-flow.png?preview";
import gafFrontDoorFull from "../assets/case-studies/gaf/front-door-flow.png";
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
 * Replaced a flat `owned` list, which tended to grow into a résumé dump — the
 * detail belongs in Key decisions, so this section only has to orient the
 * reader. The flat list and its fallback were removed 2026-09-04.
 */
export interface OwnedTheme {
  label: string;
  detail: string;
}

/**
 * The overview as the framework's three lines: challenge, result, approach,
 * one sentence each. A recruiter should be able to stop here and know why the
 * work mattered.
 *
 * Studies still carrying the older single paragraph render it as-is until
 * they are migrated, which is why the field is a union.
 */
export interface OverviewLines {
  /** What was wrong or at stake. One sentence. */
  challenge: string;
  /** What changed because of the work. One sentence, carries the headline figure. */
  result: string;
  /** How it was done, stated as the approach rather than the process. One sentence. */
  approach: string;
}

/**
 * One row of the Problem table: a constraint and what it forced the product
 * to do. Four to six rows. A constraint whose implication is not a product
 * consequence is not a constraint, it is context.
 */
export interface Constraint {
  constraint: string;
  implication: string;
}

/**
 * Scope and ownership, as four labelled blocks.
 *
 * The framework is explicit that "contributed" and "led" are different words,
 * so the four are kept apart rather than merged into one ownership list.
 * `influenced` is the principal-level tell: roadmap, priorities, and standards
 * adopted outside the design lane.
 */
export interface Scope {
  owned: string;
  led?: string;
  influenced?: string;
  workedWith?: string;
}

/**
 * One line of the product framing rendered inside Problem: hypothesis,
 * success metric, constraint, where it landed. Labels are free text because
 * the billing study had a KPI set at kickoff while the others state the
 * metric the author would hold the work to.
 *
 * Budget: four lines, 25 words each, 100 in all. A line that repeats the
 * turning point or the overview is cut, not shortened.
 */
export interface FramingItem {
  label: string;
  text: string;
}

/**
 * A research finding paired with the product change it caused. A finding
 * whose response names no change is cut. Five findings at most.
 */
export interface EvidenceFinding {
  finding: string;
  response: string;
}

export interface Evidence {
  /** The method, in one line: 30 words. */
  body?: string;
  findings?: EvidenceFinding[];
  /** The reframing line, rendered as a pull-quote in Problem: one sentence, 25 words. */
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
  /**
   * The evidence for this decision, rendered beneath it. The framework's rule
   * is that a visual earns its place by carrying evidence, so a figure belongs
   * with the decision it proves rather than in a gallery of its own.
   */
  images?: CaseStudyImage[];
}

export interface StateRecovery {
  state: string;
  userSees?: string;
  recovery?: string;
}

/**
 * Outcomes. The stat band already restates the figures in display type, so
 * this section argues them rather than listing them again.
 *
 * Budget: headline 30 words; each narrative line 25; before and after 20
 * each; four proof points; the metric caveat 50. About 150 in all.
 */
export interface Impact {
  /**
   * Optional since 2026-09-09: the framework leads Outcome with the
   * before/after pair, and a study that has one does not need a headline
   * restating it.
   */
  headline?: string;
  business?: string;
  user?: string;
  organizational?: string;
  before?: string;
  after?: string;
  /** NDA-safe validated proof points. Four at most. */
  proof?: string[];
  /** Why a hard metric is absent, when it is. */
  metricStatus?: string;
  /**
   * What I would measure next, and why it is already available. Closes
   * Outcome. Naming the measurement you would run reads as senior in a way
   * that an absent metric does not.
   */
  measureNext?: string;
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
 * Condensed from `ownedThemes`; the fuller list renders beside it in Role and team.
 */
export interface LeadershipPoint {
  kind: "Product strategy" | "Design" | "Research" | "Team leadership";
  title: string;
  detail: string;
}

/**
 * One stage of the solution, carrying two supporting points at most.
 *
 * Budget: three or four steps, two points of about 15 words each, 120 words
 * across the section. Captions are counted separately; where a step carries
 * images, the caption states the decision and the points stay short.
 */
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
  /** At-a-glance figures. Absent means the band doesn't render. */
  stats?: Stat[];
  /**
   * Challenge, result, approach — one sentence each. Budget 70 words.
   *
   * A plain string is the pre-2026-09-09 shape and still renders as one
   * paragraph, so a study migrates when its copy is signed off rather than
   * when the type changes.
   */
  overview?: string | OverviewLines;
  /**
   * The news, rendered as the page's h1 (added 2026-09-09 with the lede
   * header). One sentence, outcome-first, 20 words or fewer — it is the
   * largest type on the page and a reviewer reads it in the first ten seconds.
   *
   * Falls back to `overview.result`, then to the project tagline. A study
   * showing its tagline here has not had its claim written: the tagline
   * describes the work, and this slot has to assert what changed.
   */
  claim?: string;
  /**
   * Two or three sentences on the business context: what the organization was
   * trying to achieve, what was at stake, and why design was in the room.
   * Budget 90 words. This is the block that separates lead from principal —
   * it shows the bet was understood, not just the brief.
   */
  productFraming?: string;
  /** The problem as one "how might we" line. Opens Problem. Budget 30 words. */
  hmw?: string;
  /** Constraint and its product implication, four to six rows. Renders in Problem. */
  constraints?: Constraint[];
  /** Owned, led, influenced beyond the lane, worked with. Renders in Scope and ownership. */
  scope?: Scope;
  /** Hypothesis, success metric, constraint, and where it landed. Renders in Problem. Budget 100 words. */
  framing?: FramingItem[];
  /** Direction and craft, split. Absent means the section doesn't render. */
  leadership?: LeadershipPoint[];
  /** The solution as an ordered walk, replacing a flat capability list. */
  solutionSteps?: SolutionStep[];
  /**
   * The messy middle: the one pivot, failure, or reversal, told straight in
   * one paragraph. Budget 75 words. Where a diagram carries the arc, the prose
   * does not repeat it.
   */
  turn?: string;
  /**
   * Process artifacts — working boards, end-to-end flows. Rendered in the deep
   * dive as "The journey behind the screens", a separate container from the
   * solution gallery so the story stays product-first.
   */
  processImages?: CaseStudyImage[];
  /** Situation and constraint, opening Problem. Budget 60 words. Never restates the role. */
  context?: string;
  evidence?: Evidence;
  /**
   * Ownership as short themes. Renders in Role and team. The résumé's shared
   * claims live in ownedStatements.ts; keep the two agreeing.
   */
  ownedThemes?: OwnedTheme[];
  decisions: Decision[];
  states?: StateRecovery[];
  images?: CaseStudyImage[];
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
    // Migrated 2026-09-09 from research/design/updated-case-studies/finance-cloud-principal-framework.md,
    // which is Anastasia's own account of the governed analysis platform.
    // Every field below is her text unless a comment says otherwise.
    //
    // This study carries two layers and the page has figures for both, so the
    // copy has to as well. The platform layer (sandbox, promotion gate,
    // designed states, thresholds) is the rewrite and leads: it is what the
    // PromotionGate, ConfidenceThresholds and GovernedPipeline diagrams draw.
    // The program layer (the suite reframe, the homepage as front door, the
    // V1-to-V3 pivot, direction across six designers) is her 2026-08-25
    // program-level account, kept because SuiteMap, VersionArc, the operating
    // model, the front-door flow and every figure in the stat band come from
    // it; a first pass of this migration dropped that layer and left those
    // five figures and the band describing things the prose no longer said.
    snapshotFields: [
      // Role: "Product Experience Lead" is the engagement role on the finance
      // program and "Lead Experience Designer" the employment title; both are
      // correct at their own layer (resolved with Anastasia 2026-08-26). The
      // rewrite's "Lead Product Designer" is not applied. [NEEDS SIGN-OFF] on
      // the client descriptor only: it follows the rewrite, replacing
      // "Confidential Fortune 500 telecommunications company".
      { label: "Role", value: "Product Experience Lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2024\u2013Present" },
      // The rewrite's own verify list says to refresh its status line before
      // publishing; this is the more recent account (2026-09-08). [NEEDS SIGN-OFF]
      { label: "Status", value: "V3 of the analysis platform in testing; unified homepage MVP in development" },
      { label: "Users", value: "Accountants, analysts, managers and controllers, finance leaders, admins and viewers" },
      { label: "Team", value: "Product, engineering, ML engineering and AI research, data, finance and compliance stakeholders" },
    ],
    // The stat band is unchanged. Which figure should lead this study — the
    // hackathon, or the 10 \u2192 300 pilot arc — is open question 3 in the
    // implementation plan, so both stay on the page until it is settled: the
    // band keeps the hackathon, the claim and Outcome carry the pilot arc.
    stats: [
      { value: figures.hackathonAnalyses, label: `Hackathon analyses by ${figures.hackathonUsers} users` },
      { value: String(figures.financeCloudVersions), label: "Product versions, each redirected by research" },
      { value: String(figures.researchEngagements), label: "Research engagements to date" },
      { value: figures.programScaleShort, label: "Program the research now directs" },
    ],
    // The h1. Her own "Card and header lead line" from the rewrite. [NEEDS SIGN-OFF]
    claim: `Took a governed AI finance platform from zero to one and scaled it from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with ${figures.financePlannedUsers} planned.`,
    overview: {
      challenge:
        "Finance teams needed AI-assisted analysis and transformation without losing the governance controls, audit trails and human accountability that financial operations require.",
      result: `Took Finance Cloud from zero to one, then scaled it through iterative testing from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with enterprise adoption of ${figures.financePlannedUsers} planned; finance leaders got the evidence they needed to trust and approve AI-assisted work.`,
      approach:
        "Separate experimentation from production, make every AI action inspectable, and require human approval before anything consequential happens.",
    },
    productFraming:
      "The organization wanted AI inside its finance and payroll operations: reporting, forecasting, variance analysis, anomaly detection, month-end close and manual journal entries. Every one of those surfaces touches money that has already been committed or is about to be, and the accountants, controllers and compliance stakeholders who work there remain personally responsible for the numbers regardless of what produced them. The bet was that AI could carry a meaningful share of the analysis without moving that responsibility, and the risk was that a platform which produced numbers without provenance would be either untrusted and unused, or trusted and indefensible. Design was in the room because the problem was not model capability. It was making governance legible enough that the people accountable for the output could see it, act on it and approve it. That is a product-model question, and it is why I owned the model rather than the screens. The platform sat inside a wider finance program \u2014 data exploration, AI-assisted analysis, workflow automation, AI agents, audit tooling and access management \u2014 whose products were owned by different teams, built on separate technology stacks and not yet deeply integrated, while the program was described to the business as a single integrated application. My job widened to making that ecosystem understandable and usable as one experience without promising integration that did not yet exist.",
    // [NEEDS SIGN-OFF] The last two sentences above are her pre-migration
    // `context` and overview, joined by one authored clause ("sat inside a
    // wider finance program"). Over the 90-word budget, like the other two
    // studies' framing, because it carries both layers.
    // Two of the four framing lines were cut in the migration: the constraint
    // is a row in the table below, and where it landed is now the Outcome.
    // The hypothesis and the metric stay because open question 1 \u2014 whether
    // this block survives at all \u2014 is unresolved, and this is the only place
    // a metric chosen before the work is visible.
    framing: [
      {
        label: "Hypothesis",
        text:
          "AI could carry a meaningful share of finance analysis without moving responsibility for the numbers, if every consequential action stayed visible and owned by a person.",
      },
      {
        label: "Success metric",
        text:
          "None defined at the outset. I would hold it to the share of close work running through the governed pipeline with human sign-off; AI plans approved without rework is the leading indicator.",
      },
    ],
    hmw:
      "How might we let finance teams use AI for analysis and close work while keeping every consequential action visible, reviewable and owned by a person?",
    constraints: [
      {
        constraint:
          "Accountants, controllers and compliance stakeholders are personally responsible for journal entries, accruals, payroll runs and close work",
        implication:
          "AI could recommend and prepare, but a person had to approve anything consequential, and the product had to make that handoff explicit rather than implied",
      },
      {
        constraint: "A number without provenance cannot be approved, only re-derived by hand",
        implication:
          "Every AI output needed a visible path back to its inputs, transformations and generated code",
      },
      {
        constraint:
          "Controls that lived only in the backend were invisible to the people accountable for them",
        implication:
          "Governance needed a surface in the interface: environment labels, promotion checklists, audit entries",
      },
      {
        constraint:
          "Automation that fails silently in finance does not just lose work, it breaks trust in every future result",
        implication: "Failure, partial output and low confidence needed designed states rather than error toasts",
      },
      {
        constraint: "Anomalies surfaced too late are indistinguishable from anomalies never surfaced",
        implication: "Detection had to reach the accountable role proactively, not wait to be found in a report",
      },
      // Replaced the rewrite's sixth row (pilot-to-enterprise scale), which
      // the evidence table's last finding and the lesson both already carry.
      // This row is the reframe decision's rationale, in her words.
      {
        constraint:
          "The program was described to the business as a single integrated application that the architecture and roadmap could not yet support",
        implication:
          "Coherence had to be earned through design \u2014 a common visual language, central discovery, clear product relationships \u2014 rather than inherited from architecture",
      },
    ],
    scope: {
      owned:
        "The product model for Finance Cloud, connecting Workflow Builder, Sandbox, promotion gates, Production and monitoring across six user roles. The environment separation and promotion-gate model. The copilot and agent-driven workflow patterns across reporting, forecasting, variance analysis and month-end close. The anomaly detection and proactive notification design. The full set of AI uncertainty and failure states, and the inspectability layer: previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals and audit history. PRDs, flows, role models, screeners, recruitment materials and training plans. At program level, the cross-product experience direction: the suite narrative, the unified homepage as the suite\u2019s front door, and the standardized patterns across workflow products \u2014 headers, breadcrumbs, status badges, approval history.",
      // The second and third sentences are her "Direction without reporting
      // lines" and "Stood up the research practice" leadership cards, which
      // the operating-model figure below draws.
      led: `The zero-to-one build with the lead product owner, translating product requirements into a shipped POC. Moderated research for the POC, and the iterative testing program that took the platform from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}. Design direction for ${figures.designersDirectedWord} designers across the finance program, deciding who works on what and translating the program lead\u2019s and product owners\u2019 intent into direction designers can execute. The research practice: some workflows had reached only about four unique participants, so I built a recruited tester pool of 32 analysts, ran 45-minute moderated sessions against prototypes, and segmented participants by role so each protocol asked people only about work they actually did.`,
      // The thresholds sentence is softened to the 2026-09-03 correction the
      // ConfidenceThresholds diagram already states: the three-tier model is
      // defined, the confidence cut-offs are still to be set. The rewrite's
      // "now used across the platform" is on its own verify list. [NEEDS SIGN-OFF]
      influenced:
        "The three-tier model \u2014 act, recommend and wait, stop and escalate \u2014 defined with ML engineering and AI research as explicit product boundaries rather than inherited from the model; the confidence cut-offs that place an action in a tier are still to be set as the pilot produces data. The environment separation and promotion-gate model is now used across the platform, not only in the surfaces I designed. Preserved human responsibility for accruals, journal entries, payroll and close work as a product principle, which shaped what engineering built as automated versus what stayed as a review step. And the program narrative itself: the shift from \u201cone integrated application\u201d to a suite of independent products with a shared design language.",
      // Composed from the rewrite's "Worked with" line and the pre-migration
      // team grid, so no discipline is lost with the grid. [NEEDS SIGN-OFF]
      workedWith:
        `Program leadership, product management, ${figures.designersDirectedWord} application-level designers each owning one product, engineering and data specialists, ML engineering and AI research, access-management partners, and finance subject-matter experts, compliance stakeholders and end users.`,
    },
    evidence: {
      body: `Role-segmented, moderated prototype testing with direct access to domain experts: 45-minute one-on-one sessions with clickable prototypes, questions tailored to each participant\u2019s responsibilities rather than to \u201cfinance users\u201d as one audience. Also moderated research for the working POC, run with screeners and recruitment materials I created, and the iterative testing program that scaled the platform from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}. Participant counts for the POC research are not recorded and are not stated; the scaling figures are user counts, not study counts.`,
      // The rewrite's first four findings restate the constraints table above
      // word for word, so they are not repeated here. These are the findings
      // that changed something the constraints do not already state: the
      // hackathon (the pivot VersionArc draws) and her three program-level
      // findings, plus the rewrite's one finding about scale.
      findings: [
        {
          finding: `A hackathon put V1 in front of ${figures.hackathonUsers} finance users, who ran ${figures.hackathonAnalyses} business analyses: they could not and would not read and adjust generated Python.`,
          response:
            "V2 rebuilt the flow around direct data exploration and handing multi-step work to an agent; V3 was set by the research that followed.",
        },
        {
          finding:
            "Users generally saw only the products they were already permitted to use, making discovery of the wider suite difficult.",
          response:
            "Discovery needed a central, access-aware entry point \u2014 a homepage that knows what each person can use after login.",
        },
        {
          finding:
            "Teams used overlapping language for products, roles and AI concepts \u2014 the agent portfolio had no shared object model.",
          response:
            "A formal hierarchy \u2014 Category \u2192 Driver \u2192 Anchor Signal \u2014 had to exist before monitor configuration, thresholds and briefings could be designed against it.",
        },
        {
          finding:
            "One AI workstream had UX and engineering progressing in parallel with unclear expectations and limited cadence.",
          response:
            "Program-level experience leadership had to reconnect the workstream and bring the end-to-end workflow into view before build.",
        },
        {
          finding:
            "Pilot users tolerated ambiguity because they could ask a person; scaled users could not.",
          response:
            "Every explanation that had lived with a person moved into the interface: labels, checklists, states and reasons.",
        },
      ],
      insight: "Governance people cannot see is not governance they will approve.",
    },
    // Eight decisions, two over the framework's six, because the study has two
    // layers and each figure on the page needs the decision it proves in
    // prose: decisions 1 to 3 are the program layer (SuiteMap, the front-door
    // flow, VersionArc), 4 to 7 the platform layer (PromotionGate and
    // GovernedPipeline, the states table, ConfidenceThresholds). The rewrite's
    // sandbox and gate decisions share one figure, so they are one decision;
    // its anomaly decision is not here because the constraints, evidence and
    // states tables already carry it three times. Decisions 1 to 3 and 8 are
    // her 2026-08-25 account; 4 to 7 the rewrite.
    decisions: [
      {
        decision:
          "Repositioned the program from a single integrated application to a suite of independent finance products with a shared experience layer.",
        rationale:
          "The architecture and roadmap could not yet support the single-app promise. The reframe acknowledged the current technical reality while creating a credible path toward a more connected future \u2014 a common visual language, central discovery, and clear product relationships.",
        rejected: "continuing to describe the program as one integrated application",
        tradeoff:
          "Giving up the seamless-platform story meant the experience layer had to earn coherence through design \u2014 shared language, discovery, product relationships \u2014 rather than inherit it from architecture.",
      },
      // Her launcher, own-tab and "Your Apps" decisions, merged because the
      // front-door flow beneath proves all three at once. [NEEDS SIGN-OFF]
      // on the merge; every sentence is hers.
      {
        decision:
          "Designed the homepage as an app launcher and discovery hub, personalized from actual post-login access, with each product launching in its own tab.",
        rationale:
          "Four tenets held the scope: modularity and scalability, discoverability, launcher-not-kitchen-sink, and a layout reflecting real usage patterns. \u201cYour Apps\u201d surfaces the products each person can actually use, and launching independent apps in new tabs avoided cross-app token and authentication complexity and let independently built products keep shipping.",
        rejected:
          "a kitchen-sink catalog or a complex dashboard; a fixed layout over-prioritizing flagship applications; embedding every product inside one shell",
        tradeoff:
          "The seams between products stay visible \u2014 the suite is coherent at the point of discovery, not continuous during use \u2014 and favorites, broader filtering, persistent cross-app launchers and centralized notifications were deferred to a named roadmap rather than allowed to block the MVP.",
        images: [
          {
            src: gafFrontDoor,
            fullSrc: gafFrontDoorFull,
            width: 2400,
            height: 1502,
            alt: "A four-stage user flow. A person signs in; their access is resolved after login. The homepage then answers two questions at once: a personalized Your Apps area lists the products that person can actually use, and a discovery area shows the wider suite they cannot yet see, which is what research found people were missing. Choosing a product launches it in its own tab with its internal navigation intact, so independently built products keep shipping. Two rejected alternatives are recorded: a kitchen-sink catalog or a complex dashboard in place of a launcher, and embedding every product inside one shell.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
            caption:
              "The homepage answers two questions at once: what you can use, and what else exists. Launching in a tab was a stated cost, not an oversight.",
          },
        ],
      },
      // The pivot that used to be the Turning point section, in her words.
      // VersionArc, appended below the list, draws it; no rejected path is
      // stated because the record does not name one.
      {
        decision:
          "Rebuilt the analysis flow around direct data exploration and agent handoff after the hackathon, rather than around generated code.",
        rationale:
          "V1 assumed finance analysts could read and adjust generated Python. Putting it in front of real finance users at a hackathon showed they could not and would not: they needed to explore data directly and hand multi-step work to an agent. V2 rebuilt the flow around that, then hit two constraints: a metadata layer that did not exist and orchestration too deterministic for how finance work branches. Research set V3\u2019s direction, now in testing.",
      },
      {
        decision:
          "Separated experimentation from production as two distinct environments, with promotion as a gated checklist that shows unmet requirements.",
        rationale:
          "Finance users needed room to explore, and the organization needed certainty that exploration could not touch committed numbers. A sandbox for Python analysis, transformations, datasets and AI-assisted plans has no silent path into financial controls; promotion to production is an explicit, reviewable event, and a blocked promotion states exactly which control, approval or data-access condition is missing. Governance that lives as a backend rule reads to the user as \u201cit won\u2019t let me\u201d, which is indistinguishable from a bug.",
        rejected: "gating one workspace with permissions, or a one-click publish",
        tradeoff:
          "A single workspace with permissions makes the boundary a setting someone has to remember exists.",
      },
      {
        decision: "Treated AI uncertainty and failure as first-class interaction states.",
        rationale:
          "The platform is judged at exactly the moments AI is least reliable. A finance user who loses work to a silent failure once will re-derive every future result by hand, which erases the value of the platform.",
        rejected:
          "hiding failure behind generic errors, or treating it as an edge case to handle later",
      },
      // The rewrite's copilot decision, carrying her "understand, clarify,
      // confirm assumptions, then plan" principle from the earlier copy.
      {
        decision:
          "Scoped the copilot to the work in front of the user, and made it confirm its understanding before producing a plan.",
        rationale:
          "A plan is inspectable; an answer is not. Assistance appears inside a specific report, forecast or close task with the relevant data already in context, and runs understand, clarify, confirm assumptions, then plan and output, so silent assumptions surface before a result does. The user reads the plan, changes it and runs it.",
        rejected:
          "a general-purpose assistant that has to be told what it is looking at, answering immediately and letting users discover wrong assumptions in the output",
      },
      // Softened from the rewrite's "set confidence thresholds ... with numbers
      // attached" to the 2026-09-03 correction: the tiers are defined, the
      // model-confidence cut-offs are pending. The signal thresholds and the
      // 72-hour success definition are her earlier account. [NEEDS SIGN-OFF]
      {
        decision:
          "Defined where the system acts, where it recommends and waits, and where it stops and escalates as product boundaries, not model defaults.",
        rationale:
          "A raw confidence score pushes interpretation onto the user, who has no basis for deciding whether a given score is safe enough for an accrual. The three tiers are interaction design decisions; the model-confidence cut-offs that place an action in a tier are still to be set with ML engineering as the pilot produces confidence data. With domain experts we set the signal thresholds separately \u2014 useful outputs are directionally correct and within an order of magnitude, and a threshold sits where action is warranted, roughly 3% meaningful in one use case and 1% often noise \u2014 and defined agent success as analyst behavior within 72 hours, not forecast precision: did the analyst run a scenario or start a leadership conversation.",
        rejected: "surfacing a raw confidence score and leaving interpretation to the user",
      },
      {
        decision:
          "Proceeded on documented access assumptions with explicit break-notification agreements, rather than waiting for the identity architecture to settle.",
        rationale:
          "The enterprise identity integration was unresolved and would have blocked design indefinitely. Writing the assumptions down \u2014 with agreement that design would be notified when one broke \u2014 kept the work moving without pretending the uncertainty away.",
        rejected: "pausing design until enterprise identity questions resolved",
        tradeoff:
          "Some access-dependent behavior may need rework when the architecture lands \u2014 accepted, and recorded, so design never stalled.",
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
    impact: {
      before:
        "AI-assisted analysis was either untrusted or unusable in finance, because output arrived without provenance and controls lived where accountable people could not see them.",
      after: `A governed platform where experimentation is separated from production, every AI action is inspectable, anomalies reach the accountable role proactively, and consequential work requires human approval; scaled from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}, with enterprise adoption of ${figures.financePlannedUsers} planned.`,
      // Seven proof points, over the four the type budgets for. The first four
      // are what the stat band restates in display type, so the band never
      // shows a figure the page does not argue; the last three are what
      // shipped or shifted on each layer. The rewrite's thresholds, anomaly,
      // states and human-responsibility points are decisions above, and its
      // "concrete, testable model" line is the overview's result.
      proof: [
        `A hackathon put V1 in front of ${figures.hackathonUsers} finance users who ran ${figures.hackathonAnalyses} business analyses; the result pivoted the product.`,
        `Delivered a working POC from zero, then scaled it through iterative testing from ${figures.financePilotUsers} pilot users to ${figures.financeScaledUsers}.`,
        `${figures.financeCloudVersionsWord} product versions, each redirected by research; V3 is in testing now.`,
        `${figures.researchEngagementsWord} research engagements to date, scaled from about four participants to a 32-analyst pool, consumed by program leads and executive sponsors, and now directing an ${figures.programScale} modernization program.`,
        // "now used across the platform" is on the rewrite's own verify list.
        "Established the environment separation and promotion-gate model now used across the platform.",
        "Established a shared experience model for the whole suite and defined the homepage MVP, navigation scenarios, access assumptions and phased roadmap in time for development within the same program increment.",
        "Gave the program an operating model in which program-level experience leadership and application-level design ownership reinforce each other.",
      ],
      measureNext:
        "Share of promotions blocked at the gate and then resolved without escalation, the rate at which anomaly notifications are acted on versus dismissed with a reason, and how often copilot plans are edited before they run. All three are available from the audit history the product already keeps, without new instrumentation.",
      // [NEEDS SIGN-OFF] The pilot-scale figures were off the site as unsourced
      // until 2026-09-09, when Anastasia said to keep them. This caveat is what
      // makes that publishable: they are her account, not a project record.
      metricStatus: `The ${figures.financePilotUsers} \u2192 ${figures.financeScaledUsers} scaling figures are my own account rather than figures read from a project record, and what ${figures.financeScaledUsers} counts \u2014 provisioned, onboarded or active \u2014 is not confirmed. The ${figures.financePlannedUsers} is a plan, not a delivery. Exact adoption dates, efficiency gains and close-cycle improvements are not verified and are not stated. Program-internal dates and client financial figures are known but deliberately not published.`,
    },
    reflection: {
      learned:
        "The hardest part was not making the AI capable. It was making its governance legible, and I underestimated how much of that legibility was being carried by people rather than the product. Early on, controls lived in the backend and users trusted that they existed; at ten pilot users that worked, because anyone who saw something odd could ask someone who knew. At three hundred they could not, and the design had to absorb every explanation a person had been giving: an environment label, a promotion checklist, an audit entry, a stated reason for a block. I would now design for the thousandth user from the first sketch, because the pilot hides exactly the gaps that scale exposes.",
      // Scorecard session record \u00a74.5 (decision locked: publish as
      // reflection). The tense of "leadership is redirecting" is on the
      // 2026-09-08 Granola list to confirm; the decision was pending then.
      wouldChange:
        "Two automations in the suite, anomaly detection and manual journal-entry automation, did not scale. The flows are specialized enough that a model tuned for one does not transfer, and making them work at acceptable cost means the company changing how the work is done, not just tooling it. Leadership is redirecting on cost and scalability; the research program I ran is the evidence behind that decision. What I would do differently: test transferability across two flows before designing deeply for one.",
      principle: "Don\u2019t promise integration before it exists.",
    },
  },
  "connected-customer-journey": {
    snapshotFields: [
      // Résumé ladder: Senior through Jul 2025, Lead from 2025. The engagement
      // role was leading design; the job title was Senior (aligned 2026-09-04).
      { label: "Role", value: "Senior UX Designer, leading design on the engagement" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      // "Completed, April 2025" read as shipped; the work never reached
      // customers. Venue (AWS re:Invent 2024) pending Amdocs permission to name.
      { label: "Status", value: "Showcase concept, not deployed to customers" },
    ],
    team: [
      { role: "UX Design" },
      { role: "Data Science" },
      { role: "Marketing and CX" },
      { role: "AI/NLP Engineering" },
      { role: "Front-end and back-end engineering" },
      { role: "Product Owners" },
    ],
    // No churn, conversion, or revenue metric is verified for this engagement
    // (see impact.metricStatus), so the band carries countable design outputs
    // instead: the roles the flow spans, the surfaces in `images`, and the
    // review rule. "0 → 1" was dropped 2026-09-03: a showcase concept that never
    // reached customers is not a zero-to-one product.
    stats: [
      { value: "3", label: "Roles the flow spans" },
      { value: "6", label: "Connected surfaces designed" },
      { value: "Required", label: "Human review before any AI message" },
    ],
    // Cut to the 70-word budget 2026-09-04. The signal-to-monitoring walk it
    // used to end on is the Solution section's four steps.
    overview:
      "As a Senior UX Designer at Amdocs Studios leading design on this engagement, I implemented the product vision for a connected customer journey at a telecommunications operator: turning predictive churn signals into action. I ran the research that tested the hypothesis behind the vision, and designed the flow end to end across the analyst who sees the risk, the customer who lives it, and the representative who resolves it.",
    // Scorecard session record §4.7, CCJ block. Venue naming pending permission.
    framing: [
      // Status renders in the header fact line; not repeated here (2026-09-04).
      {
        label: "Hypothesis",
        text: "A churn score creates value only when the accountable person can act on it with context.",
      },
      {
        label: "Success metric",
        text:
          "Not defined; as a showcase, none was expected. If deployed, I would hold it to churn in the contacted at-risk segment against an uncontacted control, with time from signal to launched action as the leading indicator.",
      },
      {
        label: "Constraint",
        text:
          "Every AI-drafted message required human review; chatbot-to-human handoff was gated on sentiment.",
      },
    ],
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
          "The dashboard leads with the KPIs at risk, each with why and a direct path to mitigate it",
          "Segments build dynamically from churn-risk criteria rather than static lists",
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
          "Journey exploration shows where customers fail by entry channel, with the churned and continued share on each path",
          "A segment-of-one timeline replays one customer's events against their churn risk",
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
          "The mitigation plan pairs the KPI at risk with its drivers and one recommended action, testable in a what-if tool first",
          "AI drafts a message for a chosen audience and tone; the person edits the live preview before it goes out",
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
          "A chatbot handles routine cases and hands off to a representative when sentiment and context call for a person",
          "The representative works from an AI summary and suggested action; a declined offer loops back to adjustment",
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
    // Situation only (2026-09-04); the role line it carried is the overview's job.
    context:
      "A telecommunications operator had predictive churn signals but no way to act on them. Analysts, service teams, an AI layer, and the partner systems feeding it each held part of the picture, and nothing connected detection to a reviewed action, its launch, and what happened next.",
    // Signed off by Anastasia 2026-08-26.
    turn:
      "The project reset partway through. We had been treating the churn prediction as the answer: surface the score, recommend an action, done. It isn't an answer. The reset came when we started treating a prediction as the opening of a decision a person still had to make — with the customer's context beside it, options to compare, and the ability to edit anything AI drafted before a customer ever saw it. Every surface got rebuilt around that.",
    evidence: {
      body:
        "User research against the hypothesis behind the vision: that a churn signal changes nothing unless the person responsible for the customer can see why it fired and act without leaving the context. It held.",
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
    // One diagram, in Details since 2026-09-04: the end-to-end user flow. The
    // Solution section shows the product screens instead, so the flow sits
    // behind a click for the reader who wants the whole path at once.
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
        "Designed an end-to-end mitigation flow in which a model score becomes a decision a person reviews, edits, and monitors, shown as a concept rather than deployed.",
      user:
        "Human review of AI-assisted messaging was required before anything reached a customer.",
      organizational:
        "Marketing, CX, and service teams gained one interaction model for moving from journey evidence to a human-reviewed response.",
      before: "Fragmented customer signals and cross-tool handoffs.",
      after:
        "One workflow to detect risk, understand the behavior behind it, choose a mitigation, review the message, and monitor the response.",
      proof: [
        "Made journey drop-offs and churn risk visible beside customer context.",
        "Translated predictive models into decision support for non-technical users.",
        "Connected AI-assisted messaging and personalized offers to human review.",
        "Defined a learning loop for monitoring and adjusting offers based on customer response.",
      ],
      metricStatus:
        "This was a showcase concept and did not reach customers, so no churn-reduction, conversion, adoption, or revenue metric is presented.",
    },
    reflection: {
      learned:
        "The project reset once we stopped treating the churn prediction as the answer and started treating it as the opening of a decision the representative still had to make, with context, options, and a way to edit anything AI suggested before it reached a customer.",
      principle: "A model score is not a decision.",
    },
  },

  "auditable-billing-workflow": {
    // Rewritten 2026-09-09 from research/design/updated-case-studies/cwo-principal-framework.md,
    // which is Anastasia's own account of the engagement given that day. Every
    // field below is her text unless a comment says otherwise. The changes that
    // contradict what the site published before are marked, because each one
    // needs confirming before this ships.
    snapshotFields: [
      // [NEEDS SIGN-OFF] Role changed from "Lead Designer, then Design Lead and
      // UX / Product Strategy Lead". The rewrite says product lead and design
      // contributor, with a principal designer consulting — a different story
      // from taking over design leadership mid-engagement, and it disagrees
      // with the résumé. Settle this, the résumé, and the card together.
      { label: "Role", value: "Product Lead and Design Contributor" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2024–2025" },
      // [NEEDS SIGN-OFF] Was "Completed". The rewrite has MVP 1 in use with
      // 1.5 in progress, which also makes in-product editing a future phase
      // rather than something already shipped.
      { label: "Status", value: "MVP 1 released and in use; MVP 1.5 in progress" },
      // [NEEDS SIGN-OFF] Both trimmed to fit the header's one fact line. The
      // full user and team descriptions are in Scope and ownership.
      { label: "Users", value: "Admins, accountants, and engineers managing projects and billing packages" },
      { label: "Team", value: "CWO team with the client's Chief Data Office, product, engineering, and UI development" },
    ],
    // Provenance for every figure is in ./figures. The backlog figure and the
    // user count are both Anastasia's own account (2026-09-09); the status
    // states are read from the status model.
    stats: [
      { value: "0 → 1", label: "Built from zero" },
      { value: "Cleared", label: `Backlog of ${figures.billingBacklogSize} billing packages` },
      { value: String(figures.billingActiveUsers), label: `Active users, ${figures.billingActiveAsOfShort}` },
      { value: String(figures.billingStatusStates), label: "Shared status states" },
    ],
    // The h1. Trimmed from the rewrite's own "Card and header lead line", so
    // it is her sentence rather than a new claim. [NEEDS SIGN-OFF]
    claim: `Cleared a backlog of ${figures.billingBacklogSize} billing packages with a guided, auditable workflow now used by ${figures.billingActiveUsers} people.`,
    overview: {
      challenge: `A backlog of ${figures.billingBacklogSize} billing packages had built up behind a manual orchestration of feeder-system data, screenshots, PDFs, spreadsheets, and off-product handoffs.`,
      // [NEEDS SIGN-OFF] "Cleared the backlog" replaces the site's weaker
      // "unblocked recovery of the backlog", confirmed 2026-09-09. The
      // adoption-by-other-projects claim is new and its count is unconfirmed.
      result: `The workflow cleared the backlog and gave the team a mechanism to keep it clear; ${figures.billingActiveUsers} people now use it, and its approval flow has been picked up by other projects.`,
      approach:
        "Automate retrieval first, then design the mechanism that maintains it: ten explicit stages with progressive validation, recovery, ownership, review, status, and history, so a package never silently loses state.",
    },
    // Over the 90-word budget on the type. Left at full length because it is
    // the block that carries the bet, and every sentence in it is load-bearing.
    productFraming:
      "Billing packages for highway-construction work had to reconcile project-ledger data with documentation submitted to state transportation agencies under federal requirements. By the time the project started the organization was a few hundred packages behind, and every one of them was billable work it could not collect until the evidence was assembled and reviewed. The bet was in two parts: automate the retrieval that was consuming the team, and then build a mechanism that would keep the backlog from re-forming. The second part is why design was in the room. Clearing a backlog once is an automation problem; staying clear is a workflow problem, and it lives in the boundaries between systems and roles rather than in any one screen. I owned product definition as well as design for that reason.",
    // Two of the four framing lines were cut 2026-09-09: the constraint is a
    // row in the table below, and the measurement status is now split between
    // `impact.measureNext` and `impact.metricStatus`. The hypothesis and the
    // KPI stay because this is the one study where a metric was set at kickoff,
    // and that is the hardest thing on the page to claim after the fact.
    framing: [
      {
        label: "Hypothesis",
        text:
          "Work was disappearing because no role owned it and no shared vocabulary existed for where a package was. Make ownership and status explicit and the backlog becomes recoverable.",
      },
      {
        label: "KPI set at kickoff",
        text:
          "+20% billing-package submission rate, the step where packages were dying. Explicit ownership and status should carry more packages to submission instead of stalling.",
      },
    ],
    hmw:
      "How might we turn a fragmented orchestration process into a guided, error-tolerant workflow that users could review and trust?",
    constraints: [
      {
        constraint:
          "Evidence came from multiple feeder systems, dynamically generated screenshots, invoices, PDFs, and spreadsheet edits",
        implication:
          "The product had to coordinate the whole package, not optimize a single screen or document",
      },
      {
        constraint: "Missing screenshots could stop assembly after work was already underway",
        implication:
          "Retrieval failures needed preserved progress, a visible error state, and a recovery action",
      },
      {
        constraint: "Different roles could create, edit, review, or approve",
        implication:
          "Ownership, review tasks, permissions, handoffs, and status history had to be explicit",
      },
      {
        constraint:
          "Users could not tell whether a package was still being assembled or ready to submit",
        implication: "Package state needed to be a first-class, visible object with history",
      },
      {
        constraint:
          "Direct editing and a planned dashboard were infeasible in the current release",
        implication:
          "The release needed an interim editing path and a smaller operational scope without erasing future opportunity",
      },
    ],
    scope: {
      owned:
        "Product and design for the workflow. I defined the features and the scope from what was collected from key stakeholders, designed the front end, ran design handoff, and maintained the design backlog. The ten-stage decomposition, the status model, the development-ready flows, and the error-condition wireframes are mine.",
      led:
        "Requirements workshops and discovery with the CWO team, the client's Chief Data Office, product, engineering, and UI development, where I set the Must / Should / Nice-to-have option sets. Moderated usability research with ten participants across three user groups. Ongoing syncs with the development teams to keep delivery on track, and working sessions with the data team lead on retrieval and dependencies.",
      influenced:
        "Translated wireframes into prioritized backlogs, roadmaps, test plans, and acceptance criteria. Maintained decision logs, quality gates, and risk documentation. Made the scope calls on the dashboard and the interim editing path. Added jobs-to-be-done documentation to the automation plan. The approval flow designed here has since been picked up by other projects.",
      // [NEEDS SIGN-OFF] Composed from the rewrite's Team metadata and its
      // shorter "Worked with" line, so the disciplines the team grid used to
      // list are not lost now that the grid is gone.
      workedWith:
        "The CWO team, the client's Chief Data Office and data team lead, product, engineering, UI development, and finance and operations stakeholders. A principal designer sat with the engagement in a consulting role.",
    },
    evidence: {
      // [NEEDS SIGN-OFF] The participant count and the three user groups are
      // new to the site. Nothing in the earlier project record states them.
      body:
        "Initial moderated usability research with ten participants distributed across the three user groups — admins, accountants, engineers — alongside working sessions on business goals, feature requirements, system dependencies, design-system limitations, unhappy paths, testing, and release feasibility.",
      findings: [
        {
          finding:
            "Billable work was accumulating because information lived across feeder systems, ledger data, screenshots, PDFs, and spreadsheets.",
          response:
            "Designed the product around the whole package: search, add and remove projects, retrieve data and evidence, merge, review, finalize.",
        },
        {
          finding: "Missing screenshots stopped assembly after work was already underway.",
          response:
            "Recoverable screenshot-generation pattern: visible error state, bot redeploy, preserved progress.",
        },
        {
          finding:
            "Creators and reviewers had different responsibilities, and the review step was where usability sessions found the most friction.",
          response:
            "Improvements to the review process; owner and reviewer views, review tasks, role-based permissions, status history.",
        },
        {
          finding:
            "Usability sessions validated the core package-assembly flow across all three groups.",
          response:
            "Flow held; effort went to states and recovery rather than restructuring.",
        },
        {
          finding: "Direct editing and the dashboard were not feasible in the immediate scope.",
          response:
            "Interim Excel editing path; dashboard moved to backlog with the dependency documented.",
        },
      ],
      insight:
        "The workflow could recover billable work only if it made dependencies, responsibility, and recovery visible before submission — not after a package failed.",
    },
    // Six decisions, the rewrite's five plus billing-package identity, which
    // the rewrite does not mention and nothing contradicts. The three product
    // screens are attached to the decisions they prove, so the Solution walk
    // they used to illustrate is gone: its content is now the overview's
    // approach line and the ownership block.
    decisions: [
      {
        decision: "Used progressive validation as users moved through package building.",
        rationale:
          "Defects that surface only at submission cost the most, because the work behind them is already spread across systems. Catching them at the stage where they occur keeps the package recoverable. Missing data, loading and retrieval states, and recovery actions surface as the user moves, progress is preserved when one dependency fails, and a completeness review runs before submission.",
        rejected: "waiting until final submission to reveal missing data or evidence",
      },
      {
        decision:
          "Made billing-package identity explicit: the package's primary key is the project number.",
        rationale:
          "The system could tell the difference between resuming a previously created package and starting a new one.",
        rejected: "silently duplicating work",
        images: [
          {
            src: cwoPackageIndex,
            fullSrc: cwoPackageIndexFull,
            width: 2400,
            height: 1537,
            alt: "Billing package index listing existing packages by package ID, projects, contract number, owner, and last modified, with a project-number filter, sortable columns, and a Start new billing package button.",
            caption:
              "The index is keyed to the project number, so a package that already exists is found before a new one is started.",
          },
        ],
      },
      {
        decision: "Made package status a first-class object.",
        rationale:
          "Users needed to know whether a package was being assembled or ready to submit, and the organization needed a record of who did what. A six-state model — Initiated, In Progress, Review, Approved, Finalized, Completed — carries both, with trigger-based updates, role-based permissions, status history and audit trail, notifications, and status-based reporting. It is also what keeps the backlog from re-forming: a package cannot sit in an undefined state.",
        rejected: "leaving package state implicit in the documents and the people handling them",
        images: [
          {
            src: cwoStatusModel,
            fullSrc: cwoStatusModelFull,
            width: 2400,
            height: 1502,
            alt: "State machine of the billing package status model: Initiated, In Progress, Review, Approved, Finalized, Completed, with a retry loop and a missing-evidence return.",
            // [NEEDS SIGN-OFF] Caption authored 2026-09-08 with the diagram.
            caption:
              "Six states, two recovery loops. The loops are where work used to disappear; Review became its own state so nobody edits mid-review.",
          },
        ],
      },
      {
        decision: "Separated ownership from review.",
        rationale:
          "Handoffs were where packages lost state, so putting the handoff in the product gives it a history. Package metadata carries owner, creation date and time, current status, and review tasks, and reusable review-and-submit patterns make the handoff visible. Usability sessions across the three user groups drove the specific improvements to the review step.",
        rejected:
          "treating ownership and review as an off-product coordination step with no visible handoff or history",
        images: [
          {
            src: cwoBillingReport,
            fullSrc: cwoBillingReportFull,
            width: 2400,
            height: 2390,
            alt: "Billing report for a four-project package showing the breakdown of charges by category, gross and net construction cost, credit lines, previous billings and advance payments, the total amount due, a last-data-sync timestamp beside the title, and a Download PDF button.",
            caption:
              "The finalized report shows how the total was built, category by category, with the data-sync time beside the title, so a reviewer can check the number before the PDF leaves the system.",
          },
        ],
      },
      {
        decision: "Preserved an interim editing path through Excel.",
        rationale:
          "Direct editing was not feasible within the technical constraints. Operational continuity now was worth more than a half-built editor, and the future state was designed rather than abandoned.",
        rejected: "shipping an incomplete in-product editor that did not meet the constraints",
        tradeoff:
          "A deliberate product tradeoff: preserve operational continuity now while designing a more integrated future state.",
      },
      {
        decision: "De-scoped the planned dashboard without losing the opportunity.",
        rationale:
          "Forcing unsupported work into the release would have put the feasible billing workflow at risk. I surfaced the dependency behind the dashboard, moved it out of the current scope, and held it in the backlog as a future opportunity, which kept the case for it alive.",
        rejected: "forcing the dashboard into scope",
        tradeoff: "Protecting the core flow cost the release its most demo-friendly screen.",
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
    // The flows behind the screens. Two notes on why these are here rather
    // than beside a decision: the MVP1 workflow board left the page because
    // the creation flow covers it, and the scope board's full-resolution
    // version carries internal release targets.
    //
    // `package-create-validation.jpg` sits unimported in this study's assets:
    // the create dialog was dropped from the page 2026-09-08, "for now", so
    // the screenshot is kept for when it returns. Unimported files are not
    // bundled, so it costs the build nothing.
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
        src: cwoFlow,
        fullSrc: cwoFlowFull,
        width: 6368,
        height: 2536,
        alt: "Review flow diagram showing a reviewer starting a review, making inline edits with save or discard options, completing the review, and submitting with a git-style commit message.",
        caption:
          "Review as its own state machine — inline edits, save or discard, and a commit message before anything is finalized.",
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
    impact: {
      before: `A few hundred billing packages behind, accumulating across fragmented systems, files, screenshots, spreadsheets, and manual handoffs.`,
      after: `Backlog cleared, and a stepwise workflow that keeps it clear: package creation, progressive validation, recovery, ownership, review, status, and history in one place, in use by ${figures.billingActiveUsers} people.`,
      // Seven proof points, over the four the type budgets for. Left whole
      // because each names a different thing that shipped or shifted.
      proof: [
        `The backlog of ${figures.billingBacklogSize} unprocessed billing packages was cleared.`,
        `${figures.billingActiveUsers} active users on the application.`,
        "The approval flow has been picked up by other projects.",
        "Recoverable screenshot-generation and progressive-validation patterns in the shipped workflow.",
        "Role, review, submit, and status patterns reused across the workflow.",
        "Ownership, package state, action history, and review handoffs visible in-product.",
        "A phased roadmap established for document integration, in-product editing, expanded review, and automated retrieval.",
      ],
      measureNext:
        "Package cycle time from Initiated to Completed, the share of packages that hit the screenshot-recovery path, and first-pass approval rate. The status model makes all three available without new instrumentation.",
      // [NEEDS SIGN-OFF] Authored 2026-09-09 from the rewrite's verify list.
      // The rewrite carries no metric disclaimer of its own and the framework
      // requires one wherever a number cannot be attributed.
      metricStatus: `The backlog size is my own account rather than a figure read from the project record, and the ${figures.billingActiveUsers} active users is my own count as of ${figures.billingActiveAsOf}. The +20% submission-rate KPI set at kickoff is measurable from the status model's timestamps but not yet measured. Release dates, defect reduction, and handoff time are not verified and not stated.`,
    },
    reflection: {
      learned:
        "Complex enterprise workflows fail at the boundaries between systems and teams. The most important design work here was not an individual screen. It was exposing dependencies early, preserving state when automation failed, and making responsibility visible through review and submission. Automation cleared the backlog; the status and ownership model is what kept it from coming back.",
    },
  },
  // Rewritten 2026-09-09 from research/design/updated-case-studies/case-study-document-ai-platform.md,
  // which is Anastasia's own account of the engagement. Every field below is her
  // text unless a comment says otherwise. Changes that contradict what the site
  // published before are marked, because each one needs confirming before this ships.
  //
  // Deliberately NOT published, per the draft's own verification list: the client,
  // product, and use-case names, the teammates, the partner engineering team, the
  // data vendors, the document store, and the model. The ten-participant count is
  // published only as unverified, inside the evidence method line.
  //
  // Supersedes the older document-insights framing. The rewrite drops two claims
  // the source does not support: that testing reversed a tab-based navigation
  // model, and that saving was designed as an explicit privacy action.
  "enterprise-document-knowledge": {
    snapshotFields: [
      // [NEEDS SIGN-OFF] Role expanded from "UX and Product Strategy Lead" to the
      // rewrite's full title. This is one of the surfaces the résumé/site title
      // divergence runs through — settle it with About and the résumé together.
      { label: "Role", value: "Lead Experience Designer — UX and product strategy lead" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025" },
      // [NEEDS SIGN-OFF] Was "Multi-phase accelerator and product-development work".
      // The rewrite is explicit that production status is unconfirmed.
      { label: "Status", value: "Multi-phase accelerator and product development; production status to confirm" },
      {
        label: "Users",
        value:
          "Enterprise business users, corporate communications, legal, risk and compliance, contract and product managers",
      },
      {
        label: "Team",
        value: "Design, product, engineering, research, and client stakeholders across two or more time zones",
      },
    ],
    // Adoption and efficiency are unattributed (see impact.metricStatus), so the
    // band counts what the design actually produced. The region count is read off
    // the list in decision 6; the breakpoint range and the two comparison modes
    // are stated in the rewrite.
    stats: [
      { value: "2", label: "Comparison modes, matched to the reading task" },
      { value: "5", label: "Breakpoints, 375px to 1536px" },
      { value: "7", label: "Named layout regions" },
      { value: "1", label: "Shared framework, not a second product" },
    ],
    overview: {
      challenge:
        "Business users could get a fast AI answer from thousands of internal documents but had no way to see where it came from, compare conflicting sources, or reuse the pattern for the next compliance question.",
      result:
        "A phased document AI experience — sourced answers, embedded viewer, explicit document selection, two comparison modes, and drafting — plus a widget framework that let a governed compliance tool ship on the same rails instead of as a separate product.",
      approach:
        "Treat verification as an interaction rather than a disclaimer, make document scope visible product state, and prioritize a contested backlog against user value, business value, effort, and technical dependency.",
    },
    // Over the 90-word budget on the type, and left there: this is the block that
    // carries the two-part bet, and the leverage half is what makes the compliance
    // widget a decision rather than a footnote.
    productFraming:
      "The organization had already invested in an enterprise AI assistant and was under pressure to show it did more than summarize: the real bet was whether AI could be trusted inside regulated workflows — legal, compliance, risk, contracts — where an unsourced answer is a liability rather than a time-saver. At the same time the business wanted a second and third use case without funding a second and third product, which made this two problems wearing one name: trust, whether a generated answer could carry its evidence with it, and leverage, whether the patterns behind that answer could become reusable parts a compliance tool could be assembled from. Design was in the room because both are interaction problems before they are model problems.",
    // Two lines, not four: the constraint is a row in the table below, and where it
    // landed is the Outcome section. Both lines are the site's existing copy, kept
    // because the rewrite's thesis and metric status agree with them.
    framing: [
      {
        label: "Hypothesis",
        text:
          "Users will trust AI summaries of internal documents only if the path from any statement back to its source is one interaction away.",
      },
      {
        label: "Success metric",
        text:
          "Not defined at the outset. I would hold it to verification rate: the share of AI answers where a user opens a cited source. Near zero means the citations are decoration.",
      },
    ],
    hmw:
      "How might we help enterprise users move from retrieval to verified understanding — without hiding the documents behind the AI, and without rebuilding the experience for every new use case?",
    constraints: [
      {
        constraint:
          "Retrieval reliability was explicitly below an academic standard; the team's own note was that users would need to validate against sources",
        implication:
          "Verification had to be a first-class interaction on every answer rather than a footnote. Citations became navigation",
      },
      {
        constraint:
          "Content lived inside governed knowledge domains, and only domain owners could upload to them",
        implication:
          "Document selection had to work within a domain; cross-domain comparison and outside-document upload became explicit product questions rather than assumed capability",
      },
      {
        constraint: "Access to a domain could be denied outright",
        implication:
          "The flow needed a real 'no access' branch and a path to request access, not a dead end",
      },
      {
        constraint:
          "Three competing plans for the fines and regulations data feed were still unresolved during design",
        implication:
          "The interface could not assume completeness or freshness, so scope, recency, and source had to be visible to the user",
      },
      {
        constraint:
          "Fixed dates: design complete end of February, engineering onboarded March 1, proof of concept end of June, then user acceptance testing",
        implication:
          "The backlog had to be cut into Must / Should / Nice tiers with dated commitments rather than sequenced by enthusiasm",
      },
      {
        constraint:
          "Federated engineering resources shared across use cases and time zones, on a common widget framework",
        implication:
          "Every pattern had to be reusable across use cases; a bespoke screen was a cost the program could not absorb",
      },
    ],
    scope: {
      owned:
        "UX strategy and feature definition for the document AI experience: the region-based application layout, the entry point and domain landing, chat, chat-with-document, inline citations and sources, multi-document comparison, draft creation and export, follow-up prompts, and the responsive system across five breakpoints from 375px to 1536px. I wrote the UX acceptance criteria that engineering built against, and the accessibility documentation — semantic markup and ARIA roles, landmark regions, and reading order — was produced as part of the design source of truth rather than handed off as a later audit.",
      led:
        "Requirements and prioritization workshops with product, engineering, and client stakeholders. Research planning, protocol development, and synthesis, including a discussion guide for the compliance use case and a separate guide for document comparison. Living backlogs across the document AI product and the adjacent enterprise knowledge experience.",
      influenced:
        "The feature prioritization that produced the Must Have / Should Have / Nice to Have tiers and their dated commitments. The framing of the compliance tool as a widget on a shared framework rather than a standalone dashboard. The response template that fixed a mandatory shape for comparison answers — summary of documents, differences, commonalities, with domain-specific suggestions optional — which constrained the model's output rather than only the UI around it. I did not own the model, the retrieval stack, or the data-source procurement; where those were unresolved, I designed against the uncertainty and said so.",
      workedWith:
        "Design, product, engineering, research, and client stakeholders across two or more time zones, on federated engineering resources shared with other use cases.",
    },
    evidence: {
      // The open questions belong in the method line rather than the findings
      // table: they name what the research did not settle, and the table's rule is
      // that every row states a change. The participant count is published only as
      // unverified, per the framework's rule on unattributed numbers.
      body:
        "I led research planning, protocol development, and synthesis, including a discussion guide for the compliance use case and a separate guide for document comparison. Four questions stayed open and were logged as design risks with owners rather than resolved on assumption: whether users understood how to select a knowledge domain and what they could search with, whether the basic-versus-advanced chat distinction meant anything to them, whether files should ever be selectable across domains — the working answer was probably not — and whether a user needs to upload an outside document to compare against a governed one. An internal record references ten research participants, but the count and study attribution are unverified and are not used here as an impact metric.",
      findings: [
        {
          finding:
            "Tab behavior and document selection caused confusion about what the AI was actually reading.",
          response:
            "Selected-document state was made explicit and persistent — visible chips, editable until submission, surviving collapse and expand.",
        },
        {
          finding: "Side-by-side comparison was received positively for nuanced reading.",
          response:
            "Preserved as its own mode for two documents rather than folded into a normalized table.",
        },
        {
          finding:
            "Summarization tables helped users scan structured differences across many documents.",
          response:
            "Kept as a complementary mode for more than two documents; the two modes were deliberately not treated as interchangeable.",
        },
        {
          finding: "Users wanted clearer guardrails around AI-generated information.",
          response:
            "Citations, source scope, and the original documents stayed visible throughout the workflow rather than appearing at the end of an answer.",
        },
        {
          finding:
            "Compliance and risk users described a manual process for tracking fines and assessing risk, and named trust and accuracy as their first concern about an AI doing it.",
          response:
            "Filtering and a recommendations playbook were scoped as the widget's core functions, with inline citation carried through as the validation path.",
        },
      ],
      insight:
        "Evidence cannot be a final-step disclaimer. Users need to see which documents are active, move from a generated statement to its source, and compare alternatives without losing their place.",
    },
    decisions: [
      {
        decision: "Made citations navigation, not decoration.",
        rationale:
          "Every generated statement carried numbered citation chips, a Sources control with defined default, hover, active, and focus states, and source list items that opened the document in the embedded viewer or in a new tab. Opening a source narrowed chat context to that document; closing it returned the user to the broader conversation. The team already knew reliability was imperfect, and if verification cost the user their place in the conversation they would stop verifying — an unverified answer in a compliance workflow is worse than no answer.",
        rejected:
          "a citation footer listing sources at the end of a response, which satisfies the audit requirement and makes checking a source a separate task rather than a continuation of the current one",
      },
      {
        decision: "Bound comparison mode to selection count, not to user preference.",
        rationale:
          "Selecting exactly two documents produced a summary response with a call to action to open a side-by-side diff, highlighting shared and differing content section by section. Selecting more than two produced a summary of common and unique themes with a call to action to open a comparison table — rows as themes or entities, columns as documents. These are different reading tasks: two documents invite contextual reading where nuance matters, five invite scanning, where a normalized grid is the only readable form.",
        rejected: "one universal comparison view that scaled to any number of documents",
        tradeoff:
          "it would have been cheaper to build and would have made two-document comparison, the most common case, worse, so both modes had to be built and maintained.",
      },
      {
        decision: "Made document selection visible, bounded, editable product state.",
        rationale:
          "Comparison started from the chat input's overflow menu, opened a file selector above the prompt field with a condensed and an expanded view, allowed keyword and category search with real-time filtering, and required between two and ten documents. Selections appeared as chips beside the prompt, stayed deselectable until submission, persisted across collapse and expand, and triggered a plain validation message outside the range. Users repeatedly lost track of which documents an answer was drawn from, and scope is the single most load-bearing fact about an AI answer, so it belongs in the interface as state the user can see and change rather than in retrieval logic they have to trust.",
        rejected:
          "inferring the document set from the prompt, which demos well, removes a step, and makes the one question the user most needs answered — what did you read? — unanswerable",
      },
      {
        decision: "Kept drafting beside the conversation and exported it into the system of record.",
        rationale:
          "\"Create draft,\" from the overflow menu or from natural language, moved the user into a focus mode: draft canvas on the right, chat still on the left. A user-supplied outline produced a structured draft; no outline produced a default structured draft labeled as editable. Export wrote a Word file to the enterprise document store, created the folder if it did not exist, versioned on re-export, and surfaced a specific error with a retry when permissions or storage failed. The artifact is the point — a draft that cannot leave the AI tool sends the user back to copy-paste, and the evidence chain dies at the clipboard.",
        rejected:
          "a rich standalone editor, which would have competed with the document tools the organization already runs and severed the draft from the conversation that produced it",
      },
      {
        decision: "Shipped the compliance tool as a widget on shared rails, not as its own product.",
        rationale:
          "The regulatory risk use case — letting legal, risk, contract, product, and sales users review penalties across companies and industries, understand the rules behind them, and build a mitigation playbook — was designed to live inside the document AI umbrella as a widget, reusing document selection, search, comparison, citation, and the response template, with its own filtering and dashboard layer on top. Engineering was federated across use cases and time zones on a common widget framework, so a standalone dashboard would have duplicated the hardest parts of the platform — governed selection and traceable answers — and duplicated their failure modes. Framing it as a widget also let it inherit the verification behavior a compliance audience needs most.",
        rejected:
          "building it as an independent risk dashboard against its own data feed: faster to a demo, and a second product with a second trust model and no reuse",
      },
      {
        decision: "Defined layout regions and accessibility as the system, not as polish.",
        rationale:
          "The application was specified as named regions — global, local, leading, main, context, app header, and an item region visible only on selection — and designed across five breakpoints, with accessibility annotated in the source of truth: semantic markup and ARIA roles, landmark regions, and reading order. Even small behaviors were specified rather than left to interpretation: exactly three follow-up prompts, capped at 51 characters, with a leading icon on desktop and tablet and only the first prompt carrying an icon on mobile. Region names are what let a widget be dropped into a layout without renegotiating the layout; they are the mechanism that makes reuse real, and they are also how reading order stays stable when panels collapse.",
        rejected:
          "designing screens per feature and rationalizing the grid afterward, with an accessibility review before launch — an order that produces a system which cannot absorb the next widget and an audit that arrives too late to change anything",
      },
    ],
    // The study's only figure. It carries the whole flow rather than one decision,
    // so it stays at study level and renders after the decisions list.
    images: [
      {
        src: diUserFlows,
        fullSrc: diUserFlowsFull,
        width: 9000,
        height: 2196,
        alt: "End-to-end user flow diagram. A landing path leads into company knowledge, then a chat session where a prompt returns an LLM response with listed citations and sources, opening a document in place or in an external tab. A wider end-to-end comparison flow runs from a new chat through selecting general knowledge, company knowledge, or personal files, choosing a docs, data, or workflow domain, and starting a chat that branches into asking a question, comparing documents, finding a document, or creating a draft, then searching and selecting files, returning a summary response with follow-up prompts and feedback, and ending in viewing the document, a diff, or a table.",
        caption:
          "End-to-end flow: choosing a governed domain before the chat begins scopes every session to a known set of company sources, so asking, comparing, finding, and drafting all resolve back to listed citations and the original document.",
      },
    ],
    impact: {
      before:
        "A contested backlog of AI and document features, an answer that could not be traced back to what produced it, hidden document scope, and no path to a second use case that did not mean a second product.",
      after:
        "A phased document AI experience where an answer carries its sources, the active document set is visible and editable, comparison has a mode matched to the reading task, a draft leaves the tool as a versioned file in the system of record — and a governed compliance widget rides the same rails.",
      proof: [
        // [NEEDS SIGN-OFF] The April approval is recorded on the board as a team
        // review; confirm it was a formal sign-off before this line ships.
        "Feature prioritization produced agreed Must Have / Should Have / Nice to Have tiers with dated commitments, reviewed and approved with the team in April.",
        "Multi-document comparison, document selection, and draft creation and export were specified to acceptance-criteria depth and handed to engineering with responsive frames, redline specifications, and permutation states.",
        "Accessibility — semantic markup, landmark regions, and reading order — was documented in the design source of truth rather than retrofitted.",
        "The compliance use case was reframed from a standalone dashboard into a widget on the shared framework, with a prototype scoped for review by attorneys, risk assessors, business stakeholders, product owners, and end users.",
        "A fixed response template — summary, differences, commonalities, optional domain suggestions — gave engineering a testable contract for comparison output.",
      ],
      metricStatus:
        "No adoption, revenue, or time-savings figure appears here. Shipment status and attribution are unverified, and an unattributed number would be worth less than the honest omission.",
    },
    reflection: {
      learned:
        "I designed the verification interactions well before anyone could tell me how good the retrieval actually was, and I now think that was correct — but I let the comparison work run ahead of the data-source decision, and it cost us. Three competing plans for the fines and regulations feed were still open while I was writing acceptance criteria that assumed a coherent corpus, which meant some of those criteria could not be tested until late and a few assumptions about recency and completeness went unchallenged longer than they should have. The lesson is not to wait for the data; it is to write the design's dependency on the data down as explicitly as I write the interaction, so the unresolved thing stays visible to everyone instead of quietly becoming my assumption.",
      principle: "Trust in enterprise AI is built through interaction structure.",
    },
  },
};
