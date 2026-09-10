import type { SectionAugments } from "../buildSections";
import { financeCloudAugments } from "./financeCloudDiagrams";
import { ccjAugments } from "./ccjDiagrams";
import { cwoAugments } from "./cwoDiagrams";
import { diAugments } from "./diDiagrams";

/**
 * Coded diagrams attached to a case study, keyed by project slug.
 *
 * CaseStudyPage looks its study up here, so wiring diagrams into a new study
 * is one line in this map — the page itself never has to know which studies
 * carry figures.
 */
const augmentsBySlug: Record<string, () => SectionAugments> = {
  "finance-cloud": financeCloudAugments,
  "connected-customer-journey": ccjAugments,
  "auditable-billing-workflow": cwoAugments,
  "enterprise-document-knowledge": diAugments,
};

export function getAugments(slug: string): SectionAugments {
  return augmentsBySlug[slug]?.() ?? {};
}
