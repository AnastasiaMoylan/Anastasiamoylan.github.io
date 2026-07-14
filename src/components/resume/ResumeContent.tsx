import "./ResumeContent.css";

function Section({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section className="resume-section mt-10 pt-8 border-t border-border" aria-labelledby={id}>
      <h2
        id={id}
        className="resume-section-heading text-[0.75rem] font-bold uppercase tracking-[0.1em] text-accent mb-5"
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="resume-bullet-marker text-accent shrink-0 mt-0.5">—</span>
          <span className="resume-bullet-text text-[0.9375rem] text-muted-foreground leading-[1.65]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ResumeContent() {
  return (
    <article className="max-w-[52rem]">
      {/* ── Header ── */}
      <header>
        <h1 className="resume-name text-[clamp(2rem,5vw,3rem)] font-bold text-foreground leading-[1.1] mb-2">
          Anastasia Novelly Moylan
        </h1>
        <p className="resume-tagline text-[1.0625rem] font-medium text-accent mb-5">
          Lead Product Designer | Complex B2B SaaS, AI Workflows &amp; Design Systems
        </p>
        <ul className="resume-contact list-none p-0 m-0 flex flex-wrap gap-x-5 gap-y-1 mb-3">
          <li>
            <a href="tel:17858443388" className="resume-contact-link text-[0.9375rem] text-accent hover:text-foreground no-underline transition-colors duration-150">
              1 (785) 844-3388
            </a>
          </li>
          <li>
            <a href="mailto:anastasianmoylan.design@gmail.com" className="resume-contact-link text-[0.9375rem] text-accent hover:text-foreground no-underline transition-colors duration-150">
              anastasianmoylan.design@gmail.com
            </a>
          </li>
          <li>
            <a href="https://anastasiamoylan.github.io" className="resume-contact-link text-[0.9375rem] text-accent hover:text-foreground no-underline transition-colors duration-150" target="_blank" rel="noopener noreferrer">
              anastasiamoylan.github.io
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/anastasia-novelly-moylan-76a70052" className="resume-contact-link text-[0.9375rem] text-accent hover:text-foreground no-underline transition-colors duration-150" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/anastasia-novelly-moylan-76a70052
            </a>
          </li>
        </ul>
        <p className="resume-location text-[0.9375rem] text-muted-foreground">
          St. Marys, Kansas, United States &middot; Open to remote work across the Americas
        </p>
      </header>

      {/* ── Summary ── */}
      <Section id="resume-summary-heading" heading="Summary">
        <div className="flex flex-col gap-3">
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
            Lead Experience Designer and product design leader with 10+ years of experience turning complex, data-intensive systems into clear, trustworthy product experiences. Owns work from problem framing and product strategy through end-to-end flows, research, prototyping, design-system decisions, implementation support, and design QA. Experienced across enterprise B2B software, telecommunications, finance, aviation, home security, AI-assisted knowledge tools, workflow automation, and predictive customer experiences.
          </p>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
            Designs systems rather than isolated screens, defining roles, permissions, states, edge cases, failure conditions, handoffs, and recovery paths before they become implementation problems. Partners closely with product managers, engineers, data teams, architects, finance stakeholders, and client leaders to make tradeoffs explicit and preserve the user experience through delivery. Uses Figma, React, Tailwind CSS, Vite, and AI-assisted development tools to build interaction prototypes, test system behavior, and reduce ambiguity between design and engineering.
          </p>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
            Brings a specific point of view to AI product design: generated output should be inspectable, consequential actions should be reversible, latency and partial results require designed states, and users should retain control through evidence, review, versioning, and recovery. Leads critique with clear rationale, mentors two to three designers at a time, and changes direction when research or technical evidence reveals a better path.
          </p>
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section id="resume-experience-heading" heading="Experience">
        {/* Amdocs */}
        <div className="mb-10">
          <h3 className="resume-job-company text-[1.0625rem] font-bold text-foreground mb-1">
            Amdocs Studios (formerly Stellar Elements)
          </h3>
          <p className="resume-job-title text-[0.9375rem] font-semibold text-muted-foreground">Lead Experience Designer | 2025&ndash;Present</p>
          <p className="resume-job-title text-[0.9375rem] font-semibold text-muted-foreground">Senior Experience Designer | July 2021&ndash;July 2025</p>
          <p className="resume-job-meta text-sm text-muted-foreground mt-1 mb-4">St. Marys, Kansas / Distributed enterprise consulting teams</p>
          <Bullets items={[
            "Own UX and product design across concurrent enterprise B2B engagements, guiding two to three designers while partnering with product, engineering, data, finance, architecture, and client stakeholders from early strategy through implementation.",
            "Translate ambiguous business and technical problems into product direction, requirements, capability maps, information architecture, and end-to-end flows covering roles, permissions, loading states, empty states, validation, exceptions, approval paths, and recovery behavior.",
            "Stay involved beyond handoff by creating development-ready flows, acceptance criteria, decision logs, asynchronous walkthroughs, Definition of Ready and Definition of Done gates, accessibility checks, and design-QA reviews; partner with engineering to assess UI feasibility, surface regressions, and protect interaction quality during delivery.",
            "Build code-aware interaction prototypes with React, Tailwind CSS, Vite, Windsurf, Figma Make, and enterprise UI libraries to validate behavior and reduce implementation ambiguity.",
            "Work as an experienced design-system practitioner across Figma variables and components, Flywheel React/Tailwind UI, and DCU patterns; extend systems with reusable validation, status, role, review-and-submit, audit-history, and workflow patterns.",
            "Lead requirements workshops, co-creation, usability research, working-POC evaluations, critique, backlog prioritization, roadmap definition, sprint planning, test planning, and executive storytelling across teams in the United States, Europe, APAC, and Israel.",
            "Mentor designers through pairing, structured critique, requirements clarification, and delivery reviews.",
            "Led an AI-heavy 2025 portfolio spanning finance transformation, enterprise knowledge tools, document intelligence, predictive customer experiences, workflow automation, and rapid proofs of concept.",
          ]} />

          <p className="text-[0.8125rem] font-semibold italic text-accent mt-5 mb-3">Selected product ownership and outcomes:</p>

          {[
            {
              title: "Finance Transformation / CFO.ai | Lead UX / Product Designer, 2025–2026",
              bullets: [
                "Led the product model for a governed enterprise-finance workspace connecting Workflow Builder, Sandbox, promotion gates, Production, and monitoring for accountants, analysts, managers/controllers, finance leaders, admins, and viewers.",
                "Separated experimentation from production so users could test Python analysis, transformations, datasets, and AI-assisted plans without bypassing financial controls.",
                "Designed AI uncertainty and failure as first-class interaction states, including partial or low-confidence output, failed operations, missing permissions, blocked promotion, exception handling, retry/escalation, and pause/resume/rollback for consequential workflows.",
                "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history.",
                "Created PRDs, flows, role models, screeners, recruitment materials, training plans, and moderated research for a working POC.",
              ],
            },
            {
              title: "Custom Work Orders | Design Lead and UX / Product Strategy Lead, 2024–2025",
              bullets: [
                "Led an AT&T client engagement that replaced fragmented billing-package assembly with a guided B2B workflow spanning project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion.",
                "Mapped the complete operational flow across admins, accountants, engineers, owners, and reviewers, including missing evidence, failed automation, loading, validation, interim spreadsheet editing, handoffs, and recovery without loss of progress.",
                "Defined a reusable status model (Initiated, In Progress, Review, Approved, Finalized, Completed) with permissions, ownership, notifications, activity history, UAT sign-off, and audit-trail concepts.",
                "Partnered with engineering and UI development during implementation and moved unsupported dashboard functionality into a visible future backlog instead of compromising the active release.",
                "Delivered a completed first MVP for interface and project querying plus a phased roadmap for document integration, in-product editing, expanded review, and automation.",
              ],
            },
            {
              title: "Document Insights / Enterprise Knowledge LLM | UX and Product Strategy Lead, 2025",
              bullets: [
                "Shaped a multi-phase AI document workspace spanning semantic search, document selection, sourced chat, inline citations, an embedded PDF viewer, related questions, side-by-side and table comparison, and AI-assisted drafting.",
                "Treated citations as navigation rather than decoration, kept selected-document state explicit, and preserved conversation and source context so generated answers remained verifiable.",
                "Designed privacy-aware persistence, requiring an intentional save rather than retaining user activity by default.",
                "Led or contributed to mixed-method research, protocol development, affinity synthesis, usage-metric definition, and roadmap prioritization; changed navigation and comparison recommendations based on evidence about tab confusion, trust, and preference for side-by-side review.",
              ],
            },
            {
              title: "Globe Connected Customer Journey | Senior UX Designer, completed by April 2025",
              bullets: [
                "Designed a complex, data-driven customer journey platform connecting dynamic segmentation, predictive churn signals, sentiment and NPS health, journey drop-offs, AI-assisted messaging, offer customization, and performance monitoring.",
                "Converted model output into decision support by pairing predictions with customer context, lifecycle stage, behavior, sentiment, and available actions instead of presenting an opaque score as a final answer.",
                "Created an end-to-end mitigation flow from segment and risk detection through context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
                "Preserved human control by requiring users to review and edit AI-assisted communication before delivery.",
              ],
            },
          ].map(({ title, bullets }) => (
            <div key={title} className="resume-sub-job mt-6 pl-4 border-l-2 border-border">
              <h4 className="resume-sub-job-title text-[0.9375rem] font-bold text-foreground mb-3">{title}</h4>
              <Bullets items={bullets} />
            </div>
          ))}
        </div>

        {/* American Airlines */}
        <div className="mb-10">
          <h3 className="resume-job-company text-[1.0625rem] font-bold text-foreground mb-1">American Airlines</h3>
          <p className="resume-job-title text-[0.9375rem] font-semibold text-muted-foreground mb-1">Senior Product Designer | December 2019&ndash;July 2021 | Dallas&ndash;Fort Worth, Texas</p>
          <div className="mt-3">
            <Bullets items={[
              "Contributed senior product-design expertise within a large-scale aviation and digital-product environment, balancing customer needs, business priorities, operational requirements, and technical constraints.",
              "Applied product strategy, user advocacy, interaction design, prototyping, critique, and cross-functional collaboration to airline product work.",
              "Partnered across disciplines to translate requirements and complex workflows into usable digital experiences and clearer product direction.",
            ]} />
          </div>
        </div>

        {/* Brinks */}
        <div>
          <h3 className="resume-job-company text-[1.0625rem] font-bold text-foreground mb-1">Brinks Home Security</h3>
          <p className="resume-job-title text-[0.9375rem] font-semibold text-muted-foreground mb-1">Lead UI/UX Designer | June 2015&ndash;December 2019 | Greater Chicago Area</p>
          <div className="mt-3">
            <Bullets items={[
              "Led UX and UI design in the home-security and technology domain, with an emphasis on data-driven design and conversion-rate optimization.",
              "Translated customer, business, and technical needs into understandable digital-product experiences using systems thinking, interaction design, and user-centered problem solving.",
              "Collaborated across product, engineering, marketing, and business functions to improve usability and support measurable product and conversion goals.",
              "Brought strategic communication, audience understanding, and evidence-based design rationale to stakeholder reviews and product decisions.",
            ]} />
          </div>
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section id="resume-skills-heading" heading="Skills">
        <div className="flex flex-col gap-5">
          {[
            { label: "Product design and ownership", body: "End-to-end product-area ownership, product/UX strategy, complex B2B SaaS and enterprise platforms, systems thinking and information architecture, end-to-end flows/state models/edge cases/recovery paths, interaction design, workflow automation, requirements/PRDs/acceptance criteria, roadmaps/backlogs/prioritization, design QA and accessibility review." },
            { label: "AI interaction design", body: "AI-assisted workflows and LLM interaction design, uncertainty/latency/partial results/reversibility, human-in-the-loop review, evidence/citations/explainability, generated-plan and generated-code inspection, agent activity/logs/lineage/versioning/auditability, predictive analytics and decision-support interfaces, experimentation and promotion gates." },
            { label: "Flow literacy and complex systems", body: "Role and permission modeling, loading/empty/error/blocked/success states, progressive validation and preserved-progress patterns, approval/exception/escalation/retry/rollback paths, audit trails and compliance-aware workflows." },
            { label: "Design systems and implementation", body: "Figma variables, components, and libraries; design-system adoption and extension; Flywheel React/Tailwind UI and DCU; React and Tailwind CSS prototyping; Vite, Heroicons, Windsurf, Figma Make; engineering pairing, UI feasibility review, regression identification." },
            { label: "Research, communication, and leadership", body: "Moderated usability and working-POC testing, qualitative/quantitative research planning, affinity mapping and synthesis, stakeholder workshops, client consulting, executive storytelling, critique/mentorship/pairing, multi-team/multi-time-zone delivery." },
            { label: "Tools", body: "Figma, FigJam, Figma Make, React, Tailwind CSS, Vite, Flywheel UI, DCU, Heroicons, Windsurf, Jira, Notion, Excel, Markdown, Word, PowerPoint, Mermaid, draw.io, ChatGPT, Claude, MCP-enabled workflows." },
            { label: "Domain experience", body: "Enterprise finance and financial operations, telecommunications and customer-experience platforms, aviation, home security and technology, AI-enabled B2B software, enterprise knowledge and document intelligence, data governance and analytics." },
          ].map(({ label, body }) => (
            <div key={label}>
              <p className="resume-skills-label text-sm font-bold text-foreground mb-1">{label}</p>
              <p className="resume-skills-body text-[0.9375rem] text-muted-foreground leading-[1.65]">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section id="resume-education-heading" heading="Education">
        <div className="flex flex-col gap-5">
          <div>
            <p className="resume-edu-school text-base font-bold text-foreground">The University of Kansas</p>
            <p className="resume-edu-degree text-[0.9375rem] text-muted-foreground">Bachelor of Science in Journalism (BSJ), Strategic Communications &middot; Lawrence, Kansas</p>
          </div>
          <div>
            <p className="resume-edu-school text-base font-bold text-foreground">LUMA Institute</p>
            <p className="resume-edu-degree text-[0.9375rem] text-muted-foreground">LUMA Design Thinking Practitioner</p>
          </div>
        </div>
      </Section>
    </article>
  );
}
