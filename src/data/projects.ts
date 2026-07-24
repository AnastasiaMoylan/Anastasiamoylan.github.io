export interface Project {
  slug: string;
  title: string;
  /** Verb- and outcome-led line pairing with the short title on cards and the case-study header. */
  tagline: string;
  problem: string;
  role: string;
  status: string;
  tags: string[];
  outcome: string;
  featuredOrder: number;
  /** Hidden from the homepage featured grid; still listed on /work. */
  hiddenOnHome?: boolean;
  filterCategories: string[];
  image?: string;
}

import financeAIFlow from "../assets/case-studies/gaf/cover.jpg";
import ccjDashboard from "../assets/case-studies/ccj/dashboard-performance.jpg";
import cwoCover from "../assets/case-studies/cwo/cover.jpg";
import diCover from "../assets/case-studies/di/cover.jpg";

export const projects: Project[] = [
  {
    slug: "governed-ai-finance-workspace",
    image: financeAIFlow,
    title: "An AI Workspace for Finance",
    tagline: "Reporting, forecasting, and month-end close in one governed AI platform",
    problem:
      "Finance teams needed AI-assisted analysis without losing the audit trails, governance controls, and human accountability that financial operations require. The risk: ship AI features that feel powerful but bypass controls, and the platform becomes a liability.",
    role: "Lead UX / Product Designer",
    status: "Completed",
    tags: ["AI Interaction Design", "Complex Workflows", "Governance"],
    outcome:
      "Defined a product model that separated experimentation from production, made AI activity inspectable at every step, and gave finance leaders the evidence they needed to trust and approve AI-assisted work.",
    featuredOrder: 1,
    filterCategories: ["AI and Trust", "Complex Workflows", "Data and Finance"],
  },
  {
    slug: "auditable-billing-workflow",
    image: cwoCover,
    title: "An Auditable Billing Workflow",
    tagline: "Replacing manual billing-package assembly to recover backlogged revenue",
    problem:
      "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed. Work disappeared mid-process and nobody could tell where.",
    role: "Design Lead and UX / Product Strategy Lead",
    status: "Completed",
    tags: ["End-to-end Flow", "B2B SaaS", "Workflow Automation"],
    outcome:
      "Delivered a first MVP that gave every role a shared view of progress, defined a status model that made ownership and handoffs explicit, and laid a phased roadmap for document integration and full automation.",
    featuredOrder: 3,
    filterCategories: ["Complex Workflows", "B2B SaaS", "Customer Experience"],
  },
  {
    slug: "enterprise-document-knowledge",
    image: diCover,
    title: "A Tailorable Enterprise AI Platform",
    tagline: "Giving business units their own AI toolbox on centrally maintained rails",
    problem:
      "Knowledge workers were getting AI-generated answers they couldn't verify: no source context, no way to compare documents side-by-side, no path back to the original evidence. Trust eroded fast.",
    role: "UX and Product Strategy Lead",
    status: "Completed",
    tags: ["Document Intelligence", "AI Trust", "Research"],
    outcome:
      "Research showed users preferred side-by-side comparison over tabs, so the navigation model changed based on that evidence. Sourced chat, inline citations, and an embedded PDF viewer kept every answer traceable back to its source.",
    featuredOrder: 4,
    filterCategories: ["AI and Trust", "B2B SaaS", "Research"],
  },
  {
    slug: "connected-customer-journey",
    image: ccjDashboard,
    title: "The Connected Customer Journey",
    tagline: "Reducing churn by connecting a fragmented customer journey",
    problem:
      "A telecommunications client had predictive churn signals but no way to act on them. The gap between a model score and a human taking the right action for the right customer was entirely undesigned.",
    role: "Lead UX Designer",
    status: "Completed April 2025",
    tags: ["Predictive Analytics", "Customer Experience", "AI Decision Support"],
    outcome:
      "Designed an end-to-end mitigation flow that turned a model score into a reviewed, edited, and launched action, with monitoring built in. Human review of AI-assisted messaging was required before anything reached a customer.",
    featuredOrder: 2,
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
