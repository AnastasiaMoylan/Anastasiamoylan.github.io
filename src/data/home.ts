/**
 * The home hero's content, kept apart from its layout so the layout can be
 * swapped (three were drawn: `renderings/home-4-ink-hero-a|b|c.src.html`; A,
 * the lead plate, is the one built). Every line is the live hero's own copy,
 * moved here from `Hero.tsx` unchanged.
 */
import { projects } from "./projects";
import { diagramSvg } from "./diagramSvg";
import gafCoverRaw from "../assets/case-studies/gaf/cover.svg?raw";

const lead = projects.find((p) => p.slug === "finance-cloud")!;

export const homeHero = {
  eyebrow: "Lead Product Designer · AI Workflow Patterns for Enterprise",
  /** The headline up to its last word, and the last word, which takes the accent. */
  headline: ["Designing journeys people can", "trust."] as const,
  deck: "Governed AI for enterprise finance, telecom, and document intelligence — where every automated step stays inspectable, reversible, and owned by a person.",
  primaryCta: { label: "See the case studies", to: "/work" },
  secondaryCta: { label: "Get in touch", to: "/contact" },
  meta: [
    "St. Marys, Kansas",
    "Remote across the Americas",
    "Eleven years",
    "Finance",
    "Telecom",
    "AI-enabled B2B software",
  ],
  /** The one cover the hero shows, inlined so its labels set in the site's faces. */
  lead: {
    ordinal: String(lead.featuredOrder).padStart(2, "0"),
    title: lead.title,
    to: `/work/${lead.slug}`,
    svg: diagramSvg(gafCoverRaw),
  },
};

export type HomeHero = typeof homeHero;
