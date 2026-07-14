export interface Project {
  slug: string;
  title: string;
  problem: string;
  role: string;
  status: string;
  tags: string[];
  outcome: string;
  featuredOrder: number;
  filterCategories: string[];
  image?: string;
}

import financeAIFlow from "../imports/Finance_AI_Transformation_-_End-to-End_Flow.png";

export const projects: Project[] = [
  {
    slug: "governed-ai-finance-workspace",
    image: financeAIFlow,
    title: "Designing a Governed AI Workspace for Enterprise Finance",
    problem:
      "Finance teams needed AI-assisted analysis without losing the audit trails, governance controls, and human accountability that financial operations require. The risk: ship AI features that feel powerful but bypass controls, and the platform becomes a liability.",
    role: "Lead UX / Product Designer",
    status: "Proof of concept (ongoing)",
    tags: ["AI Interaction Design", "Complex Workflows", "Governance"],
    outcome:
      "Defined a product model that separated experimentation from production, made AI activity inspectable at every step, and gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
    featuredOrder: 3,
    filterCategories: ["AI and Trust", "Complex Workflows", "Data and Finance"],
  },
  {
    slug: "auditable-billing-workflow",
    title: "Replacing Manual Billing-Package Assembly With an Auditable Workflow",
    problem:
      "AT&T's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed. Work disappeared mid-process and nobody could tell where.",
    role: "Design Lead and UX / Product Strategy Lead",
    status: "MVP delivered",
    tags: ["End-to-end Flow", "B2B SaaS", "Workflow Automation"],
    outcome:
      "Delivered a first MVP that gave every role a shared view of progress, defined a status model that made ownership and handoffs explicit, and laid a phased roadmap for document integration and full automation.",
    featuredOrder: 2,
    filterCategories: ["Complex Workflows", "B2B SaaS", "Customer Experience"],
  },
  {
    slug: "enterprise-document-knowledge",
    title: "Making Enterprise AI Answers Verifiable Across Complex Documents",
    problem:
      "Knowledge workers were getting AI-generated answers they couldn't verify: no source context, no way to compare documents side-by-side, no path back to the original evidence. Trust eroded fast.",
    role: "UX and Product Strategy Lead",
    status: "Multi-phase platform (ongoing)",
    tags: ["Document Intelligence", "AI Trust", "Research"],
    outcome:
      "Research showed users preferred side-by-side comparison over tabs, so the navigation model changed based on that evidence. Sourced chat, inline citations, and an embedded PDF viewer kept every answer traceable back to its source.",
    featuredOrder: 4,
    filterCategories: ["AI and Trust", "B2B SaaS", "Research"],
  },
  {
    slug: "connected-customer-journey",
    title: "Reducing Churn With a Connected Customer Journey Platform",
    problem:
      "Globe had predictive churn signals but no way to act on them. The gap between a model score and a human taking the right action for the right customer was entirely undesigned.",
    role: "Senior UX Designer",
    status: "Completed April 2025",
    tags: ["Predictive Analytics", "Customer Experience", "AI Decision Support"],
    outcome:
      "Designed an end-to-end mitigation flow that turned a model score into a reviewed, edited, and launched action, with monitoring built in. Human review of AI-assisted messaging was required before anything reached a customer.",
    featuredOrder: 1,
    filterCategories: ["AI and Trust", "Customer Experience", "Data and Finance"],
  },
];

export const filterCategories = [
  "All",
  "AI and Trust",
  "Complex Workflows",
  "B2B SaaS",
  "Design Systems",
  "Research",
  "Data and Finance",
  "Customer Experience",
];
