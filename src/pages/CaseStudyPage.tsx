import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ZoomIn } from "lucide-react";
import { projects } from "../data/projects";
import Button from "../components/ui/Button";
import ImageLightbox from "../components/work/ImageLightbox";
import financeAIFlow from "../imports/Finance_AI_Transformation_-_End-to-End_Flow.png";
import ccjUserFlow from "../assets/case-studies/ccj/user-flow.jpg";
import ccjDashboard from "../assets/case-studies/ccj/dashboard-performance.jpg";
import ccjMitigationPlan from "../assets/case-studies/ccj/mitigation-plan.jpg";
import ccjChatExpanded from "../assets/case-studies/ccj/chat-expanded.png";
import cwoMvp1Workflow from "../assets/case-studies/cwo/mvp1-workflow.jpg";
import cwoCreationFlow from "../assets/case-studies/cwo/creation-flow.jpg";
import cwoFlow from "../assets/case-studies/cwo/flow.jpg";
import cwoStrategyAlignment from "../assets/case-studies/cwo/strategy-alignment.jpg";

interface CaseStudyImage {
  src: string;
  alt: string;
  caption: string;
}

interface Tldr {
  challenge: string;
  solution: string;
  win: string;
}

const caseStudyContent: Record<
  string,
  {
    outcomeLabel: string;
    tldr: Tldr;
    snapshotFields: { label: string; value: string }[];
    context: string;
    ownership: string[];
    keyDecisions: string[];
    states: string[];
    images: CaseStudyImage[];
    outcomeText?: string;
    learned?: string;
  }
> = {
  "governed-ai-finance-workspace": {
    outcomeLabel: "Governed AI workspace · Completed, 2025–2026",
    tldr: {
      challenge:
        "Finance teams needed AI-assisted analysis without losing the governance controls, audit trails, and human accountability financial operations require.",
      solution:
        "A governed workspace that separates experimentation from production, makes AI activity fully inspectable, and requires human approval before consequential actions.",
      win: "Gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
    },
    snapshotFields: [
      { label: "Role", value: "Lead UX / Product Designer" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025–2026" },
      { label: "Tools", value: "Figma, React, Tailwind CSS, Vite" },
    ],
    context:
      "Enterprise finance teams needed AI-assisted analysis and transformation tools without losing the governance controls, audit trails, and human accountability that financial operations require. The core tension: AI can accelerate analysis, but accountants, controllers, and compliance stakeholders need to remain responsible for journal entries, accruals, and close work.",
    ownership: [
      "Led the product model for a governed enterprise-finance workspace connecting Workflow Builder, Sandbox, promotion gates, Production, and monitoring for accountants, analysts, managers/controllers, finance leaders, admins, and viewers.",
      "Separated experimentation from production so users could test Python analysis, transformations, datasets, and AI-assisted plans without bypassing financial controls; made environment, data access, permissions, and promotion requirements visible throughout the flow.",
      "Designed AI uncertainty and failure as first-class interaction states: partial or low-confidence output, failed data/Python operations, missing permissions, blocked promotion, exception handling, preserved work, retry and escalation, plus pause/resume/rollback concepts for consequential workflows.",
      "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history; preserved human responsibility for accruals, journal entries, close work, and other high-consequence actions.",
      "Created PRDs, flows, role models, screeners, recruitment materials, training plans, and moderated research for a working POC.",
    ],
    keyDecisions: [
      "Separated experimentation from production as two distinct environments rather than gating a single workspace with permissions, so users could test Python analysis, transformations, and AI-assisted plans in a sandbox with no path to silently affecting financial controls. Promotion to production became an explicit, reviewable event instead of a hidden setting.",
      "Designed promotion as a gated checklist with visible unmet requirements rather than a one-click publish, so a blocked promotion explained exactly which controls, approvals, or data-access conditions weren't yet met, turning governance from an invisible backend rule into something users could see and resolve.",
      "Treated AI uncertainty and failure as first-class interaction states, partial or low-confidence output, failed data or Python operations, preserved work on error, retry and escalation, instead of hiding them, so the workspace stayed trustworthy at exactly the moments AI is least reliable.",
    ],
    outcomeText:
      "Defined a product model that separated experimentation from production, made AI activity inspectable at every step, and gave finance leaders the evidence they needed to trust and approve AI-assisted work. The result was a working POC that gave stakeholders a concrete, testable model for how governed AI could operate inside financial operations, rather than an abstract promise.",
    learned:
      "The hardest part wasn't making AI capable, it was making its governance legible. Early on, controls lived in the backend and users had to trust that they existed. The work got better once every control had a visible surface: an environment label, a promotion checklist, an audit entry. Governance people can't see isn't governance they'll approve.",
    states: [
      "Partial or low-confidence AI output: visual indicator, explanation, and option to proceed with review",
      "Failed Python/data operations: preserved work state, clear error, retry and escalation path",
      "Missing permissions: blocked state with explanation and request-access path",
      "Blocked promotion: reason visible, checklist of unmet requirements",
      "Pause/resume/rollback: for consequential multi-step workflows",
    ],
    images: [
      {
        src: financeAIFlow,
        alt: "End-to-end flow diagram for the Finance AI Transformation, showing Governance, Risk and Compliance governing Agentic Workflows, Data Products, Command Center, and the full pipeline through User Experiences, Feedback and Iteration, Problem Framing, Data Discovery and Ingestion, and Finance Sandbox.",
        caption:
          "End-to-end flow: governance and compliance layer governing agentic workflows, shared data products, and the full pipeline from user experience through finance sandbox exploration.",
      },
    ],
  },
  "connected-customer-journey": {
    outcomeLabel: "Connected customer journey · Completed, April 2025",
    tldr: {
      challenge:
        "A telecommunications client had predictive churn signals but no connected path from that signal to an action a customer service representative could actually execute.",
      solution:
        "An end-to-end mitigation flow connecting churn detection, AI-assisted messaging, and human review into one journey, with an AI chatbot handling routine cases and escalating to a person when sentiment called for it.",
      win: "Turned a model score into a reviewed, edited, and launched action, with monitoring built in and human review required before anything reached a customer.",
    },
    snapshotFields: [
      { label: "Role", value: "Senior UX Designer" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Tools", value: "Figma, FigJam" },
    ],
    context:
      "A telecommunications client had predictive churn signals but no way to act on them. Analysts could see who was at risk of churning, but there was no connected path from that signal to a mitigation action a customer service representative could actually execute. The gap between a model score and a human taking the right action for the right customer was entirely undesigned.",
    ownership: [
      "Designed a complex, data-driven customer journey platform connecting dynamic segmentation, predictive churn signals, sentiment and NPS health, journey drop-offs, AI-assisted messaging, offer customization, and performance monitoring.",
      "Converted model output into decision support by pairing predictions with customer context, lifecycle stage, behavior, sentiment, and available actions instead of presenting an opaque score as a final answer.",
      "Created an end-to-end mitigation flow from segment and risk detection through context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
      "Preserved human control by requiring users to review and edit AI-assisted communication before delivery.",
    ],
    keyDecisions: [
      "Built customer segments dynamically from churn-risk criteria (issues, historic behavior, likelihood to churn) rather than static lists, so the model stayed correlated with real journey data instead of a one-time snapshot.",
      "Treated each offer as a hypothesis first, with a what-if analysis tool that let analysts adjust inputs and watch the model's inference and recommended offer update in response, refined over time by a human-feedback loop.",
      "Routed customers to an AI chatbot first, transferring to a human customer service representative only when sentiment analysis and account context indicated the interaction needed a person, keeping routine requests fast while protecting the moments that needed empathy.",
    ],
    states: [
      "Angry or high-churn-risk customer: prompts the representative to use generative AI to draft an empathetic, tone-matched message based on the specific triggers detected, not a generic response",
      "Representative needs to go further than the model recommends: access to additional offers the automated system doesn't yet know about",
      "Reviewing a case mid-conversation: the customer's personal file, offer history, and a summarized view of prior offer variations stay visible without leaving the chat",
      "Offer declined or resolution unsuccessful: loops back to offer adjustment rather than ending in a dead end",
    ],
    outcomeText:
      "Designed an end-to-end mitigation flow that turned a model score into a reviewed, edited, and launched action, with monitoring built in. Human review of AI-assisted messaging was required before anything reached a customer.",
    learned:
      "A model score is not a decision. The project reset once we stopped treating the churn prediction as the answer and started treating it as the opening of a decision the representative still had to make, with context, options, and a way to edit anything AI suggested before it reached a customer.",
    images: [
      {
        src: ccjUserFlow,
        alt: "User flow diagram for the connected customer journey, showing an analyst path from dashboard alert through offer generation, a customer journey path from risk event through AI chatbot and human customer-service handoff, and a customer-service representative path ending in resolution.",
        caption:
          "End-to-end flow: from churn-risk detection and segment creation, through AI chatbot and human customer-service handoff, to offer resolution and monitoring.",
      },
      {
        src: ccjDashboard,
        alt: "Analyst dashboard showing at-risk KPIs including top-up revenue, data usage, and network experience, alongside ARPU, NPS, retention, and campaign conversion performance.",
        caption:
          "Analyst dashboard surfacing at-risk KPIs alongside ARPU, NPS, retention, and campaign performance, with a direct path to mitigate a flagged risk.",
      },
      {
        src: ccjMitigationPlan,
        alt: "Mitigation plan screen showing an identified KPI risk, its key drivers, and a personalized offer generation builder with audience, tone, and message preview.",
        caption:
          "Mitigation plan for an identified KPI risk, pairing the key drivers behind it with an AI-assisted, tone-controlled offer builder and a live preview of the customer-facing message.",
      },
      {
        src: ccjChatExpanded,
        alt: "Customer service representative interface with an expanded chat panel showing an AI-generated customer summary and suggested course of action alongside the live conversation.",
        caption:
          "The representative's chat interface, with an AI-generated customer summary and suggested course of action alongside the live conversation.",
      },
    ],
  },
  "auditable-billing-workflow": {
    outcomeLabel: "Auditable billing workflow · Completed, 2024–2025",
    tldr: {
      challenge:
        "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed.",
      solution:
        "A guided B2B workflow with a shared status model, role-based permissions, and a full audit trail replacing manual, ownerless assembly.",
      win: "Delivered a first MVP giving every role a shared view of progress, plus a phased roadmap to full automation.",
    },
    snapshotFields: [
      { label: "Role", value: "Design Lead and UX / Product Strategy Lead" },
      { label: "Client", value: "Confidential telecommunications company" },
      { label: "Timeframe", value: "2024–2025" },
      { label: "Tools", value: "Figma, FigJam" },
    ],
    context:
      "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed. Work disappeared mid-process and nobody could tell where it had gone. Assembling a single billing package meant manually pulling project data, screenshots, and invoices from multiple systems with no shared status model or audit trail.",
    ownership: [
      "Led a guided B2B workflow replacing fragmented billing-package assembly, spanning project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion.",
      "Mapped the complete operational flow across admins, accountants, engineers, owners, and reviewers, including missing evidence, failed automation, loading, validation, interim spreadsheet editing, handoffs, and recovery without loss of progress.",
      "Defined a reusable status model (Initiated, In Progress, Review, Approved, Finalized, Completed) with permissions, ownership, notifications, activity history, UAT sign-off, and audit-trail concepts.",
      "Partnered with engineering and UI development during implementation, moving unsupported dashboard functionality into a visible future backlog instead of compromising the active release.",
      "Delivered a completed first MVP for interface and project querying, plus a phased roadmap for document integration, in-product editing, expanded review, and automation.",
    ],
    keyDecisions: [
      "Modeled role-based access as a first-class flow branch rather than a permissions afterthought: admins, accountants, engineers, and collections could create packages, while a view-only report role and an engineer-specific one-time report view kept read access scoped to what each role actually needed.",
      "Made billing-package identity explicit (the package's primary key is the project number) so the system could tell the difference between resuming a previously created package and starting a new one, instead of silently duplicating work.",
      "Built review as its own state machine: a reviewer starts a session, makes inline edits with save or discard, and submits with a git-style commit message, so changes stayed traceable and reversible before a package was finalized.",
    ],
    states: [
      "Invalid or unmatched project number entered: explicit error state before any billing package is created",
      "Billing package primary key not found: routes to creating a new billing package instead of failing silently",
      "Automation or feeder-system failure: work in progress is preserved rather than lost, with a clear retry path",
      "Review in progress: all other users see view-only access until the review is complete, so no one edits a package mid-review",
      "Discarded inline edit: reverts cleanly without affecting the rest of the package",
    ],
    outcomeText:
      "Delivered a first MVP that gave every role a shared view of progress, defined a status model that made ownership and handoffs explicit, and laid a phased roadmap for document integration and full automation.",
    learned:
      "Most of the value came from the status model, not the screens. Once every role shared one vocabulary for where a package was, Initiated, In Progress, Review, Approved, Finalized, Completed, the \"where did the work go\" problem largely dissolved. The interface was almost downstream of getting that shared language right.",
    images: [
      {
        src: cwoMvp1Workflow,
        alt: "MVP1 user flow diagram showing a user searching a project number, the system matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
        caption:
          "MVP1 flow: searching a project number, matching it to a billing package by primary key, and generating the package with a PDF invoice and screenshots.",
      },
      {
        src: cwoCreationFlow,
        alt: "Billing package creation flow diagram showing role-based branching for admin, accountant, engineer, collections, and view-only report roles, from sign-in through review, export, and finalization.",
        caption:
          "Creation flow: role-based branching from sign-in through review, export, and finalization.",
      },
      {
        src: cwoFlow,
        alt: "Review flow diagram showing a reviewer starting a review, making inline edits with save or discard options, completing the review, and submitting with a git-style commit message.",
        caption:
          "Review flow: starting a review, making inline edits with save or discard, completing the review, and submitting with a git-style commit message before the package is marked ready for review.",
      },
      {
        src: cwoStrategyAlignment,
        alt: "MVP2 scope-definition workshop board showing goals and outcomes, feature prioritization by must-have, should-have, and nice-to-have, and entity relationships between agreement, billing invoice, project, and vendor invoice.",
        caption:
          "MVP2 scope-definition workshop: goals and outcomes, feature prioritization, and the entity relationships used to plan the next phase.",
      },
    ],
  },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="text-base text-muted-foreground leading-[1.65] pl-5 relative">
          <span className="absolute left-0 text-accent">—</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function TldrBox({ tldr }: { tldr: Tldr }) {
  return (
    <div className="bg-secondary border border-border rounded-md p-6 mb-12" aria-label="Case study summary">
      <dl className="flex flex-col gap-4 m-0">
        <div>
          <dt className="text-[0.8125rem] font-semibold text-foreground mb-1">The challenge</dt>
          <dd className="text-[0.9375rem] text-muted-foreground leading-[1.65] m-0">{tldr.challenge}</dd>
        </div>
        <div>
          <dt className="text-[0.8125rem] font-semibold text-foreground mb-1">The system solution</dt>
          <dd className="text-[0.9375rem] text-muted-foreground leading-[1.65] m-0">{tldr.solution}</dd>
        </div>
        <div>
          <dt className="text-[0.8125rem] font-semibold text-foreground mb-1">The big win</dt>
          <dd className="text-[0.9375rem] text-muted-foreground leading-[1.65] m-0">{tldr.win}</dd>
        </div>
      </dl>
    </div>
  );
}

function ImageGallery({ images }: { images: CaseStudyImage[] }) {
  const [active, setActive] = useState<CaseStudyImage | null>(null);
  return (
    <>
      <div className="flex flex-col gap-8">
        {images.map((image) => (
          <figure key={image.src} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActive(image)}
              aria-label={`Enlarge image: ${image.caption}`}
              className="group relative block w-full p-0 rounded-md border border-border overflow-hidden bg-card cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img src={image.src} alt={image.alt} className="w-full h-auto block" loading="lazy" />
              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 pointer-events-none">
                <ZoomIn size={18} />
              </span>
            </button>
            <figcaption className="text-[0.8125rem] text-muted-foreground italic">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      {active && <ImageLightbox image={active} onClose={() => setActive(null)} />}
    </>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/work" replace />;

  const content = caseStudyContent[slug!];
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!content) {
    return (
      <div className="py-16 pb-24">
        <div className="content-container">
          <Link to="/work" className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline mb-10 transition-colors duration-150">
            &larr; All case studies
          </Link>
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground mb-6">{project.title}</h1>
          <p className="text-[1.0625rem] text-muted-foreground mb-2">Full case study and visuals coming soon.</p>
          <p className="text-[0.9375rem] text-muted-foreground">Detailed write-up available on request. <Link to="/contact" className="text-accent hover:text-foreground no-underline transition-colors duration-150">Get in touch</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <Link to="/work" className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted-foreground hover:text-foreground no-underline mb-10 transition-colors duration-150">
          &larr; All case studies
        </Link>

        <div className="max-w-[48rem] mb-12 pb-12 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-4">
            {content.outcomeLabel}
          </p>
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground leading-[1.15]">
            {project.title}
          </h1>
        </div>

        <TldrBox tldr={content.tldr} />

        <div className="bg-card border border-border rounded-md px-8 py-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.snapshotFields.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1">{label}</p>
                <p className="text-[0.9375rem] text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {[
            { heading: "Context and stakes", content: <p className="text-base text-muted-foreground leading-[1.7] max-w-[46rem]">{content.context}</p> },
            { heading: "My ownership", content: <BulletList items={content.ownership} /> },
            { heading: "Key decisions", content: <BulletList items={content.keyDecisions} /> },
            { heading: "States, edge cases, and recovery", content: <BulletList items={content.states} /> },
            { heading: "Execution", content: <ImageGallery images={content.images} /> },
            content.outcomeText && {
              heading: "Outcome and impact",
              content: <p className="text-base text-muted-foreground leading-[1.7] max-w-[46rem]">{content.outcomeText}</p>,
            },
            content.learned && {
              heading: "What I learned",
              content: <p className="text-base text-muted-foreground leading-[1.7] max-w-[46rem]">{content.learned}</p>,
            },
          ].filter((section): section is { heading: string; content: import("react").ReactElement } => Boolean(section)).map(({ heading, content: sectionContent }) => (
            <section key={heading} className="flex flex-col gap-5">
              <h2 className="text-[1.375rem] font-bold text-foreground pb-3 border-b border-border">
                {heading}
              </h2>
              {sectionContent}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
              Next case study
            </p>
            <Link
              to={`/work/${nextProject.slug}`}
              className="text-base font-semibold text-accent hover:text-foreground no-underline transition-colors duration-150"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>
    </div>
  );
}
