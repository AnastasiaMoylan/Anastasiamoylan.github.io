export interface Project {
  slug: string;
  /** Retired slug kept working as a route alias, so existing links survive a rename. */
  previousSlug?: string;
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
    slug: "finance-cloud",
    previousSlug: "governed-ai-finance-workspace",
    image: financeAIFlow,
    title: "Finance Cloud",
    tagline:
      "Unifying data exploration, AI agents, workflow automation, and audit tooling into one finance product suite",
    problem:
      "The client had invested in valuable finance products, but users experienced them as disconnected tools rather than a coherent platform \u2014 no unified entry point, overlapping terminology, and an integration promise the architecture could not yet keep.",
    role: "Product Experience Lead",
    status: "Completed",
    tags: ["AI Interaction Design", "Complex Workflows", "Governance", "Data and Finance"],
    outcome:
      "Reframed the program as a suite of independent products with a shared experience layer, designed the unified homepage as its access-aware front door, and set the AI interaction principles that make agent output worth acting on.",
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
    role: "Lead Designer, then Design Lead and UX / Product Strategy Lead",
    status: "Completed",
    tags: ["End-to-end Flow", "B2B SaaS", "Workflow Automation"],
    outcome:
      "Over a one-year engagement, delivered an MVP that gave every role a shared view of progress, then the dashboard, in-product editing, and review process — reaching the 100-user adoption target on a status model that made ownership and handoffs explicit.",
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
  "Research",
  "Data and Finance",
  "Customer Experience",
];
