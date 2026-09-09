import { projects } from "./projects";
import { getPageMeta } from "./pageMeta";
import { SITE_URL } from "./routes";
import { principles, principleCountWord } from "./philosophy";
import {
  resumeHeader,
  resumeSummary,
  resumeExperience,
  resumeSkills,
  resumeEducation,
} from "./resume";

/**
 * The plain-text surfaces — `llms.txt` and `resume.txt` — built from the same
 * data the pages render.
 *
 * `scripts/prerender.mjs` writes both into `dist/` at build time, exactly as it
 * already does for `sitemap.xml`, so **there is deliberately no
 * `public/llms.txt` or `public/resume.txt`**. Both files used to be maintained
 * by hand and both had drifted: llms.txt still published the "10 pilot users to
 * 300" and "1,000+ planned" figures after the site dropped them as unsourced,
 * still called CCJ a completed engagement after the site reclassified it as a
 * showcase concept, and still said "Seven principles" against a page of eight.
 *
 * A figure or a claim can now only be changed in the data files, and every
 * surface follows on the next build.
 */

/**
 * The one line of copy that exists only here — llms.txt opens with it and no
 * page renders it. Everything else on this file is derived.
 */
export const siteSummary =
  "Anastasia designs end-to-end journeys and systems people can trust: mapping every role, handoff, and state before a screen gets built, and staying involved from strategy through implementation and QA. Across enterprise B2B software, telecommunications, aviation, home security, and finance.";

/** Case studies in the same order the homepage features them. */
function orderedProjects() {
  return [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function buildLlmsTxt(): string {
  const home = getPageMeta("/");
  const about = getPageMeta("/about");
  const resume = getPageMeta("/resume");

  const caseStudies = orderedProjects()
    .map((p) => {
      const url = `${SITE_URL}/work/${p.slug}`;
      return `- [${p.title}](${url}): ${p.tagline}. ${p.outcome} Role: ${p.role}. Status: ${p.status}.`;
    })
    .join("\n");

  // Derived from the principle list itself, so the count and the titles can
  // never disagree with /philosophy. Semicolons, not commas: several titles
  // carry their own comma ("Design flows, not screens"). Casing is left alone
  // so "AI" and "I" survive.
  const principleTitles = principles.map((principle) => principle.title).join("; ");

  const email = resumeHeader.contacts.find((c) => c.href.startsWith("mailto:"));
  const linkedin = resumeHeader.contacts.find((c) => c.href.includes("linkedin.com"));

  return `# ${resumeHeader.name}

> ${home.description}

${siteSummary}

## Case Studies

${caseStudies}

## About

- [About](${SITE_URL}/about): ${about.description}
- [Design Philosophy](${SITE_URL}/philosophy): ${principleCountWord} principles — ${principleTitles}.
- [Resume](${SITE_URL}/resume): ${resume.description}

## Contact

- [Contact](${SITE_URL}/contact): Email ${email?.label} or connect on LinkedIn (${linkedin?.label}).
`;
}

/**
 * Plain-text résumé. Typographic characters are flattened to ASCII so the file
 * reads correctly in a terminal, an ATS parser, and a plain-text email client.
 */
function ascii(s: string): string {
  return s
    .replace(/[–—]/g, "-") // en dash, em dash
    .replace(/·/g, "-") // middle dot
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...");
}

export function buildResumeTxt(): string {
  const out: string[] = [];
  const rule = () => out.push("", "---", "");

  out.push(ascii(resumeHeader.name).toUpperCase());
  out.push(ascii(resumeHeader.tagline));
  out.push("");
  for (const contact of resumeHeader.contacts) out.push(ascii(contact.label));
  out.push(ascii(resumeHeader.location));

  rule();
  out.push("SUMMARY", "");
  out.push(resumeSummary.map(ascii).join("\n\n"));

  rule();
  out.push("EXPERIENCE", "");
  resumeExperience.forEach((job, i) => {
    // Two blank lines between employers, one inside an employer's block.
    if (i > 0) out.push("", "");
    out.push(ascii(job.company));
    for (const title of job.titles) out.push(ascii(title));
    if (job.meta) out.push(ascii(job.meta));
    out.push("");
    for (const bullet of job.bullets) out.push(`- ${ascii(bullet)}`);

    if (job.subJobsLabel) out.push("", ascii(job.subJobsLabel));
    for (const sub of job.subJobs ?? []) {
      out.push("");
      // The page renders "Product | Role, dates"; the text file uses " -- " so
      // the pipe isn't mistaken for a column separator by a parser.
      out.push(ascii(sub.title).replace(" | ", " -- "));
      for (const bullet of sub.bullets) out.push(`- ${ascii(bullet)}`);
    }
  });

  rule();
  out.push("SKILLS", "");
  resumeSkills.forEach(({ label, body }, i) => {
    if (i > 0) out.push("");
    out.push(ascii(label));
    out.push(ascii(body));
  });

  rule();
  out.push("EDUCATION", "");
  resumeEducation.forEach(({ school, degree }, i) => {
    if (i > 0) out.push("");
    out.push(ascii(school));
    out.push(ascii(degree));
  });

  return out.join("\n") + "\n";
}
