import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import Button from "../components/ui/Button";
import financeAIFlow from "../imports/Finance_AI_Transformation_-_End-to-End_Flow.png";

const caseStudyContent: Record<
  string,
  {
    outcomeLabel: string;
    snapshotFields: { label: string; value: string }[];
    context: string;
    ownership: string[];
    keyDecisions: string[];
    states: string[];
  }
> = {
  "governed-ai-finance-workspace": {
    outcomeLabel: "Governed AI workspace · Proof of concept, 2025–2026",
    snapshotFields: [
      { label: "Role", value: "Lead UX / Product Designer" },
      { label: "Employer", value: "Amdocs Studios" },
      { label: "Client", value: "Confidential enterprise telecommunications organization" },
      { label: "Timeframe", value: "2025–2026" },
      { label: "Status", value: "Proof of concept (ongoing platform vision)" },
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
      "[TODO: add decision detail: environment separation rationale]",
      "[TODO: add decision detail: promotion gate design]",
      "[TODO: add decision detail: AI uncertainty state patterns]",
    ],
    states: [
      "Partial or low-confidence AI output: visual indicator, explanation, and option to proceed with review",
      "Failed Python/data operations: preserved work state, clear error, retry and escalation path",
      "Missing permissions: blocked state with explanation and request-access path",
      "Blocked promotion: reason visible, checklist of unmet requirements",
      "Pause/resume/rollback: for consequential multi-step workflows",
    ],
  },
};

function TodoTag({ children }: { children: string }) {
  return (
    <span className="inline-block bg-ring/15 border border-ring/40 rounded-sm px-2 py-0.5 text-sm text-ring italic">
      {children}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="text-base text-muted-foreground leading-[1.65] pl-5 relative">
          <span className="absolute left-0 text-accent">—</span>
          {item.startsWith("[TODO") ? <TodoTag>{item}</TodoTag> : item}
        </li>
      ))}
    </ul>
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
      <div className="py-16">
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
            {
              heading: "Execution",
              content: (
                <figure className="flex flex-col gap-3">
                  <div className="rounded-md border border-border overflow-hidden bg-card">
                    <img
                      src={financeAIFlow}
                      alt="End-to-end flow diagram for the Finance AI Transformation, showing Governance, Risk and Compliance governing Agentic Workflows, Data Products, Command Center, and the full pipeline through User Experiences, Feedback and Iteration, Problem Framing, Data Discovery and Ingestion, and Finance Sandbox."
                      className="w-full h-auto block"
                    />
                  </div>
                  <figcaption className="text-[0.8125rem] text-muted-foreground italic">
                    End-to-end flow: governance and compliance layer governing agentic workflows, shared data products, and the full pipeline from user experience through finance sandbox exploration.
                  </figcaption>
                </figure>
              ),
            },
            {
              heading: "Outcome and impact",
              content: <p className="text-base text-muted-foreground leading-[1.7]"><TodoTag>[TODO: add measured outcomes: POC reception, research findings, roadmap decisions driven by this work]</TodoTag></p>,
            },
            {
              heading: "What I learned",
              content: <p className="text-base text-muted-foreground leading-[1.7]"><TodoTag>[TODO: add what was learned or changed direction during this engagement]</TodoTag></p>,
            },
          ].map(({ heading, content: sectionContent }) => (
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
