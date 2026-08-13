import { projects } from "./projects";

const SITE = "https://anastasiamoylan.github.io";
const NAME = "Anastasia Novelly Moylan";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const staticMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${NAME} — Lead Experience Designer`,
    description:
      "Anastasia Novelly Moylan is a Lead Experience Designer specializing in end-to-end journey design and systems for enterprise AI, B2B SaaS, and finance products.",
  },
  "/work": {
    title: `Work — ${NAME}`,
    description:
      "End-to-end enterprise case studies: governed AI for finance, an auditable billing workflow, verifiable document intelligence, and a connected customer-journey platform.",
  },
  "/philosophy": {
    title: `Philosophy — ${NAME}`,
    description:
      "Principles tested against real enterprise engagements: design flows not screens, design through implementation, and make AI uncertainty visible and reversible.",
  },
  "/about": {
    title: `About — ${NAME}`,
    description:
      "10+ years designing complex enterprise products across finance, telecommunications, aviation, and AI-enabled B2B software.",
  },
  "/contact": {
    title: `Contact — ${NAME}`,
    description: "Reach out directly by email or LinkedIn. No forms, no gatekeeping.",
  },
  "/resume": {
    title: `Resume — ${NAME}`,
    description:
      "Resume of Anastasia Novelly Moylan, Lead Experience Designer with 10+ years in enterprise product and AI design.",
  },
};

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname || "/";
}

export function getPageMeta(pathname: string): PageMeta {
  const route = normalize(pathname);
  const canonical = SITE + (route === "/" ? "/" : route);

  const caseMatch = route.match(/^\/work\/(.+)$/);
  if (caseMatch) {
    const project = projects.find(
      (p) => p.slug === caseMatch[1] || p.previousSlug === caseMatch[1],
    );
    if (project) {
      return {
        title: `${project.title} — ${NAME}`,
        description: `${project.tagline}. ${project.outcome}`,
        // Always the current slug, so a retired alias consolidates onto it.
        canonical: `${SITE}/work/${project.slug}`,
      };
    }
  }

  const meta = staticMeta[route] ?? staticMeta["/"];
  return { ...meta, canonical };
}
