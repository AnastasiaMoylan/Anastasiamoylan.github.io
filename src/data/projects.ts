import { figures } from "./figures";
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
    // Card and metadata migrated 2026-09-09 from the Finance Cloud
    // principal-framework rewrite; see the sign-off notes in caseStudies.ts.
    tagline:
      "A governed AI platform for finance and payroll, taken from zero to one and scaled through iterative testing",
    problem:
      "Finance teams needed AI-assisted analysis without losing the governance controls, audit trails and human accountability that financial operations require \u2014 a platform producing numbers without provenance would be either untrusted and unused, or trusted and indefensible.",
    // Role confirmed 2026-09-11: the engagement role, distinct from the
    // employment title on the r\u00e9sum\u00e9. Status authored 2026-09-11 from the
    // owner's account of the program. [NEEDS SIGN-OFF] on the status wording.
    // Both must stay identical to the study's snapshot fields.
    role: "Product Experience Lead",
    status: "Ongoing program; several MVPs released, some in testing and some in production",
    // "Complex Workflows" dropped per the rewrite: it is true of every study
    // here, so it does no sorting work.
    tags: ["AI Interaction Design", "Governance", "Data and Finance"],
    outcome: `Took a governed AI finance platform from zero to one and scaled it through iterative testing: experimentation separated from production, every AI action inspectable, and human approval required before anything consequential.`,
    featuredOrder: 1,
    filterCategories: ["AI and Trust", "Complex Workflows", "Data and Finance"],
  },
  {
    slug: "auditable-billing-workflow",
    image: cwoCover,
    title: "An Auditable Billing Workflow",
    // Card and header rewritten 2026-09-09 from the CWO principal-framework
    // document; see the sign-off notes on this study in caseStudies.ts.
    tagline:
      "Turning fragmented documents, feeder-system screenshots, and ledger data into a guided review and submission experience",
    problem:
      "A telecommunications client's billing-package process was fragmented across tools, owned by no single role, and had no recovery path when automation failed. Work disappeared mid-process and nobody could tell where.",
    // Role and status confirmed 2026-09-11. The role is the engagement role
    // and differs from the résumé's title on purpose. Both must stay
    // identical to the case study's own snapshot fields.
    role: "Product Lead and Design Contributor",
    status: "Released",
    tags: ["Enterprise Workflow", "Status and Audit Model", "Product Strategy"],
    outcome:
      `Cleared a backlog of ${figures.billingBacklogSize} billing packages with a guided, auditable workflow now used by ${figures.billingActiveUsers} people, on a status model that made ownership and handoffs explicit.`,
    featuredOrder: 3,
    filterCategories: ["Complex Workflows", "B2B SaaS", "Customer Experience"],
  },
  {
    slug: "enterprise-document-knowledge",
    image: diCover,
    // [NEEDS SIGN-OFF] The site has carried both "Verifiable AI Answers" and
    // "A Tailorable Enterprise AI Platform"; the 2026-09-09 rewrite settles on
    // the platform framing above. Whatever is chosen has to match the page H1,
    // the next-study link, and the title tag, which all derive from here.
    title: "A Verifiable Document AI Platform",
    tagline: "Answers users could trace, compare, and reuse — on rails the next compliance tool could ride",
    problem:
      "Business users could get a fast AI answer from thousands of internal documents but had no way to see where it came from, compare conflicting sources, or reuse the pattern for the next compliance question.",
    // Role and status confirmed 2026-09-11. Both must stay identical to the
    // case study's own snapshot fields.
    role: "Lead Product Designer, UX and product strategy lead",
    status: "Released",
    tags: ["Enterprise AI", "Document Intelligence", "AI Trust"],
    outcome:
      "An answer carries its sources, the active document set is visible and editable, comparison has a mode matched to the reading task, and a governed compliance widget rides the same rails instead of shipping as a second product.",
    featuredOrder: 4,
    filterCategories: ["AI and Trust", "B2B SaaS", "Research"],
  },
  {
    slug: "connected-customer-journey",
    image: ccjDashboard,
    title: "The Connected Customer Journey",
    tagline: "Designing the path from a churn score to a human decision",
    problem:
      "A telecommunications client had predictive churn signals but no way to act on them. The gap between a model score and a human taking the right action for the right customer was entirely undesigned.",
    role: "Senior UX Designer, leading design on the engagement",
    status: "Showcase concept, not deployed to customers",
    // Off the homepage 2026-09-03: a showcase that never reached customers
    // should not out-rank the three engagements that shipped. Still on /work.
    hiddenOnHome: true,
    tags: ["Predictive Analytics", "Customer Experience", "AI Decision Support"],
    outcome:
      "A showcase concept: an end-to-end mitigation flow in which a model score becomes a decision a person reviews, edits, and monitors. Human review of AI-assisted messaging was required by design.",
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
