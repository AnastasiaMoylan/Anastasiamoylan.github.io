import {
  FINANCE_PRODUCT_MODEL,
  FINANCE_RESEARCH_ARTIFACTS,
  BILLING_OPERATIONAL_FLOW,
  BILLING_STATUS_MODEL,
  CCJ_HUMAN_REVIEW,
} from "./ownedStatements";

/**
 * The résumé, as data.
 *
 * `src/components/resume/ResumeContent.tsx` renders it as the /resume page and
 * `buildResumeTxt()` in `textOutputs.ts` emits it as `resume.txt`. They are the
 * same document in two formats, so they read from this file rather than each
 * holding their own copy — which is how the plain-text résumé came to still
 * claim CCJ had shipped after the page had been corrected.
 *
 * Ownership bullets come from `ownedStatements.ts`; see the note there before
 * changing one.
 */

export interface ResumeContact {
  /** Shown on the page and in the text output. */
  label: string;
  href: string;
}

export interface ResumeSubJob {
  title: string;
  bullets: string[];
}

export interface ResumeJob {
  company: string;
  /** One line per title held; a promotion adds a line rather than replacing one. */
  titles: string[];
  meta?: string;
  bullets: string[];
  subJobsLabel?: string;
  subJobs?: ResumeSubJob[];
}

export const resumeHeader = {
  name: "Anastasia Novelly Moylan",
  tagline:
    "Lead Product Designer | Developer Platforms, Enterprise Systems & Partner Experiences",
  contacts: [
    { label: "1 (785) 844-3388", href: "tel:17858443388" },
    { label: "anastasiamoylan.design@gmail.com", href: "mailto:anastasiamoylan.design@gmail.com" },
    { label: "anastasiamoylan.github.io", href: "https://anastasiamoylan.github.io" },
    { label: "linkedin.com/in/anastasiamoylan", href: "https://linkedin.com/in/anastasiamoylan" },
  ] as ResumeContact[],
  location: "St. Marys, Kansas, United States · Open to remote work across the Americas",
};

export const resumeSummary: string[] = [
  "Lead Product Designer and product design leader with 10+ years of experience turning complex, data-intensive systems, developer-facing tooling, and partner integrations into clear, trustworthy product experiences. Owns work from solution framing and product strategy through end-to-end flows, research, prototyping, design-system decisions, implementation support, and design QA. Experienced across enterprise B2B software, telecommunications, finance, aviation, home security, AI-assisted knowledge tools, workflow automation, and predictive customer experiences.",
  "Designs systems rather than isolated screens, defining roles, permissions, states, edge cases, failure conditions, handoffs, and recovery paths before they surface during implementation. Partners closely with product managers, engineers, data teams, architects, finance stakeholders, and client leaders to make tradeoffs explicit and preserve the user experience through delivery. Uses Figma, React, Tailwind CSS, Vite, and AI-assisted development tools to build interaction prototypes, test system behavior, and reduce ambiguity between design and engineering.",
  "Brings a specific point of view to AI product design: generated output should be inspectable, consequential actions should be reversible, latency and partial results require designed states, and users should retain control through evidence, review, versioning, and recovery. Leads critique with clear rationale, manages a review program that checks completed work against what's required, and changes direction when research or technical evidence reveals a better path.",
];

export const resumeExperience: ResumeJob[] = [
  {
    company: "Amdocs Studios (formerly Stellar Elements)",
    titles: [
      "Lead Product Designer | 2025–Present",
      "Senior Experience Designer | July 2021–July 2025",
    ],
    meta: "St. Marys, Kansas / Distributed enterprise consulting teams",
    bullets: [
      "Own UX and product design across concurrent enterprise B2B engagements, managing a review program for the finance practice that checks completed work against requirements, while partnering with product, engineering, data, finance, architecture, and client stakeholders from early strategy through implementation.",
      "Translate ambiguous business and technical needs into product direction, requirements, capability maps, information architecture, and end-to-end flows covering roles, permissions, loading states, empty states, validation, exceptions, approval paths, and recovery behavior.",
      "Stay involved beyond handoff by creating development-ready flows, acceptance criteria, decision logs, asynchronous walkthroughs, Definition of Ready and Definition of Done gates, accessibility checks, and design-QA reviews; partner with engineering to assess UI feasibility, surface regressions, and protect interaction quality during delivery.",
      "Build code-aware interaction prototypes with React, Tailwind CSS, Vite, Windsurf, Figma Make, and enterprise UI libraries to validate behavior and reduce implementation ambiguity.",
      "Work as an experienced design-system practitioner across Figma variables and components, Flywheel React/Tailwind UI, and DCU patterns; extend systems with reusable validation, status, role, review-and-submit, audit-history, and workflow patterns.",
      "Lead requirements workshops, co-creation, usability research, working-POC evaluations, critique, backlog prioritization, roadmap definition, sprint planning, test planning, and executive storytelling across teams in the United States, Europe, APAC, and Israel.",
      "Review completed work through pairing, structured critique, requirements clarification, and delivery reviews, checking it against what was required.",
      "Led an AI-heavy 2025 portfolio spanning finance transformation, enterprise knowledge tools, document intelligence, predictive customer experiences, workflow automation, and rapid proofs of concept.",
    ],
    subJobsLabel: "Selected product ownership and outcomes:",
    subJobs: [
      {
        title: "Finance Transformation / CFO.ai | Lead UX / Product Designer, 2025–2026",
        bullets: [
          FINANCE_PRODUCT_MODEL,
          "Separated experimentation from production so users could test Python analysis, transformations, datasets, and AI-assisted plans without bypassing financial controls.",
          "Designed AI uncertainty and failure as first-class interaction states, including partial or low-confidence output, failed operations, missing permissions, blocked promotion, exception handling, retry/escalation, and pause/resume/rollback for consequential workflows.",
          "Made AI activity inspectable through previews, editable plans, generated-code visibility, evidence, logs, lineage, versions, human approvals, and audit history.",
          FINANCE_RESEARCH_ARTIFACTS,
        ],
      },
      {
        title: "Custom Work Orders | Design Lead and UX / Product Strategy Lead, 2024–2025",
        bullets: [
          "Led a telecommunications client engagement that replaced fragmented billing-package assembly with a guided B2B workflow spanning project selection, evidence retrieval, screenshot generation, document merging, review, approval, and completion.",
          BILLING_OPERATIONAL_FLOW,
          BILLING_STATUS_MODEL,
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
        title:
          "Connected Customer Journey (Telecommunications) | Senior UX Designer, showcase concept, 2024–2025",
        bullets: [
          "Designed a complex, data-driven customer journey platform connecting dynamic segmentation, predictive churn signals, sentiment and NPS health, journey drop-offs, AI-assisted messaging, offer customization, and performance monitoring.",
          "Converted model output into decision support by pairing predictions with customer context, lifecycle stage, behavior, sentiment, and available actions instead of presenting an opaque score as a final answer.",
          "Created an end-to-end mitigation flow from segment and risk detection through context review, human-selected action, message or offer adjustment, launch, monitoring, and iteration.",
          CCJ_HUMAN_REVIEW,
        ],
      },
    ],
  },
  {
    company: "American Airlines",
    titles: ["Senior Product Designer | December 2019–July 2021 | Dallas–Fort Worth, Texas"],
    bullets: [
      "Redesigned the travel checkout experience, modernizing outdated flows and establishing an incremental approach to evolving the design system and UI over time.",
      "Led the design team's migration to new design software, partnering closely with the team to support the transition.",
      "Redesigned the homepage with a new look and feel, balancing a visual refresh against maintaining conversion.",
    ],
  },
  {
    company: "Brinks Home Security",
    titles: ["Lead UI/UX Designer | June 2015–December 2019 | Greater Chicago Area"],
    bullets: [
      "Built and owned the design system from scratch, delivering customer-facing mobile products alongside internal dealer and operations tooling across a full redesign cycle.",
      "Led data-driven design and conversion-rate optimization, including a new lead-generation testing framework and iterative A/B testing on SEM landing pages and flows.",
      "Managed the designer internship program from hiring through development, and led a content-strategy rollout with copywriters, developers, and executive leadership.",
    ],
  },
];

export const resumeSkills: { label: string; body: string }[] = [
  {
    label: "Product design and ownership",
    body: "End-to-end product-area ownership, product/UX strategy, complex B2B SaaS and enterprise platforms, developer-facing tooling, API and workflow design, service design, systems thinking and information architecture, end-to-end flows/state models/edge cases/recovery paths, interaction design, workflow automation, requirements/PRDs/acceptance criteria, roadmaps/backlogs/prioritization, design QA and accessibility review.",
  },
  {
    label: "AI interaction design",
    body: "AI-assisted workflows and LLM interaction design, uncertainty/latency/partial results/reversibility, human-in-the-loop review, evidence/citations/explainability, generated-plan and generated-code inspection, agent activity/logs/lineage/versioning/auditability, predictive analytics and decision-support interfaces, experimentation and promotion gates.",
  },
  {
    label: "Flow literacy and complex systems",
    body: "Role and permission modeling, loading/empty/error/blocked/success states, progressive validation and preserved-progress patterns, approval/exception/escalation/retry/rollback paths, audit trails and compliance-aware workflows.",
  },
  {
    label: "Design systems and implementation",
    body: "Figma variables, components, and libraries; design-system adoption and extension; Flywheel React/Tailwind UI and DCU; React and Tailwind CSS prototyping; Vite, Heroicons, Windsurf, Figma Make; engineering pairing, UI feasibility review, regression identification.",
  },
  {
    label: "Research, communication, and leadership",
    body: "Moderated usability and working-POC testing, qualitative/quantitative research planning, affinity mapping and synthesis, stakeholder workshops, client consulting, executive storytelling, critique/review/pairing, multi-team/multi-time-zone delivery.",
  },
  {
    label: "Tools",
    body: "Figma, FigJam, Figma Make, React, Tailwind CSS, Vite, Flywheel UI, DCU, Heroicons, Windsurf, Jira, Notion, Excel, Markdown, Word, PowerPoint, Mermaid, draw.io, ChatGPT, Claude, MCP-enabled workflows.",
  },
  {
    label: "Domain experience",
    body: "Enterprise finance and financial operations, telecommunications and customer-experience platforms, aviation, home security and technology, AI-enabled B2B software, enterprise knowledge and document intelligence, data governance and analytics.",
  },
];

export const resumeEducation: { school: string; degree: string }[] = [
  {
    school: "The University of Kansas",
    degree:
      "Bachelor of Science in Journalism (BSJ), Strategic Communications · Lawrence, Kansas",
  },
  {
    school: "LUMA Institute",
    degree: "LUMA Design Thinking Practitioner",
  },
];
