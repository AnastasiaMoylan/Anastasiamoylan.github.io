import { figures } from "./figures";

/**
 * The About page's content, moved out of `AboutPage.tsx` on 2026-09-10 so the
 * page renders data the way every other page does. Copy is verbatim from the
 * page as it was; the two `[NEEDS SIGN-OFF]` paragraphs keep their flags.
 * Education is not here: the page reads `resumeEducation` from `resume.ts`,
 * which it used to retype character for character.
 */

export const aboutHeader = {
  title: "Anastasia Novelly Moylan",
  subtitle: "Lead Product Designer · 11 years in enterprise product and AI design",
};

/** "Who I am", one entry per paragraph. */
export const aboutIntro: string[] = [
  "I design complex enterprise products: AI assistants, workflows, document intelligence systems, and operational tooling. I stay engaged until what ships matches what was designed, a distinction that a lot of enterprise design loses between design and production.",
  "My background spans B2B SaaS, telecommunications, aviation, and finance: role-based permissions, trustworthy AI, scoping a POC that tests the right assumptions, and design systems that serve large engineering orgs without becoming a bottleneck.",
  // [NEEDS SIGN-OFF] Added 2026-08-25. "Lead" reads as people manager in some
  // orgs and senior IC in others, and nothing on the site disambiguated it.
  // Anastasia's ladder runs toward Principal, not management — stated here as
  // positioning rather than as a caveat.
  `I lead on the individual-contributor track: my org's path runs toward Principal rather than people management. Direction without reporting lines: I set design direction for ${figures.designersDirectedWord} designers across the finance program and decide who works on what. I translate the program lead's and product owners' intent into direction designers can execute, onboard new designers to the program's patterns and client, and coach on client interaction and information gathering. When my capacity ran out, I handed one designer's mentoring to another lead and charged a third with standardizing the research program across engagements.`,
  "I also manage a review program for my agency's finance practice, checking completed work against what's required and leading critique that explains reasoning instead of just corrections.",
  // [NEEDS SIGN-OFF] Added 2026-09-03 from the scorecard session record
  // (§4.8). Self-reported time-saved figures deliberately omitted.
  "I define with AI as well as design with it. I used Figma Make and Windsurf to move from research findings to product requirements, feature breakdown, and a prioritized, story-level backlog in one loop, and to put working prototypes in front of the client rather than static screens. Engineering built from the stories directly.",
  "I don't wait for direction: I set the vision, run the workshops, and drive alignment across an organization to get it built.",
];

export interface TimelineRole {
  title: string;
  dates: string;
  context: string;
}

export interface TimelineEntry {
  company: string;
  roles: TimelineRole[];
}

export const aboutTimeline: TimelineEntry[] = [
  {
    company: "Amdocs Studios",
    roles: [
      {
        title: "Lead Product Designer",
        dates: "2025–Present",
        context:
          "Manages a review program for the agency's finance practice, checking completed work against what's required before it moves forward. Drives integration of AI capabilities into production-ready, enterprise-scale systems for finance, billing, and telecommunications CX platforms, and establishes shared design frameworks and best practices across projects.",
      },
      {
        title: "Senior Experience Designer",
        dates: "July 2021–July 2025",
        context:
          "Led design on Finance Cloud and other AI-assisted finance and billing products, enterprise document intelligence, and complex telecommunications CX platforms, driving product strategy alignment and end-to-end experience across multi-phase engagements.",
      },
    ],
  },
  {
    company: "American Airlines",
    roles: [
      {
        title: "Senior Product Designer",
        dates: "December 2019–July 2021",
        context:
          "Redesigned the travel checkout experience, modernizing outdated flows and establishing an incremental approach to evolving the design system and UI over time. Led the design team's migration to new design software and redesigned the homepage, balancing a visual refresh against maintaining conversion.",
      },
    ],
  },
  {
    company: "Brinks Home Security",
    roles: [
      {
        title: "Lead UI/UX Designer",
        dates: "June 2015–December 2019",
        context:
          "Built and owned the design system from scratch, delivering customer-facing mobile products alongside internal dealer and operations tooling across a full redesign cycle. Led data-driven design and conversion-rate optimization, including a new lead-generation testing framework and iterative A/B testing on SEM landing pages, and managed the designer internship program from hiring through development.",
      },
    ],
  },
];

export const aboutDomains: string[] = [
  "Enterprise finance and financial operations",
  "Telecommunications and CX platforms",
  "Aviation",
  "Home security and technology",
  "AI-enabled B2B software",
  "Enterprise knowledge and document intelligence",
  "Data transformation, reporting, and analytics",
];

export const aboutTools: string[] = [
  "Figma", "FigJam", "Figma variables and components", "Figma Make",
  "React", "Tailwind CSS", "Vite", "Flywheel UI", "DCU",
  "Claude Code", "Windsurf", "Jira", "Notion",
];
