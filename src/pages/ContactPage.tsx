import Eyebrow from "../components/ui/Eyebrow";

/**
 * Typographic contact (from the Mobbin research board): one line of intent,
 * email as text you can copy, no form, no icon cards. The colophon is the
 * craft signal at the last scroll.
 */
export default function ContactPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container max-w-[44rem]">
        <Eyebrow className="mb-4">Contact</Eyebrow>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold text-foreground leading-[1.1] mb-6">
          Let’s make it legible.
        </h1>
        <p className="text-[1.0625rem] text-muted-foreground leading-[1.7] max-w-[36rem]">
          Open to Lead and Principal UX roles — enterprise products, fintech, and
          AI-assisted tools. Remote only, across the Americas. No forms, no gatekeeping:
          reach out directly.
        </p>

        <dl className="m-0 mt-12 flex flex-col gap-7 border-t border-border pt-10">
          <div>
            <dt className="m-0 font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-tertiary-700">
              Email
            </dt>
            <dd className="mt-1.5 m-0">
              <a
                href="mailto:anastasiamoylan.design@gmail.com"
                className="font-display text-[clamp(1.25rem,3vw,1.75rem)] font-bold tracking-[-0.015em] text-accent no-underline transition-colors duration-150 hover:text-foreground break-all"
              >
                anastasiamoylan.design@gmail.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="m-0 font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-tertiary-700">
              LinkedIn
            </dt>
            <dd className="mt-1.5 m-0">
              <a
                href="https://linkedin.com/in/anastasiamoylan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1.0625rem] font-semibold text-foreground no-underline transition-colors duration-150 hover:text-accent"
              >
                linkedin.com/in/anastasiamoylan ↗
              </a>
            </dd>
          </div>
          <div>
            <dt className="m-0 font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-tertiary-700">
              Location
            </dt>
            <dd className="mt-1.5 m-0 text-[1.0625rem] text-muted-foreground">
              St. Marys, Kansas · Central Time
            </dd>
          </div>
        </dl>

        <p className="mt-16 border-t border-border pt-6 font-mono text-[0.6875rem] leading-[1.8] uppercase tracking-[0.1em] text-muted-foreground">
          Designed in Figma · Built with React, Tailwind, and Claude Code · Typeset in
          Archivo, Inter, and IBM Plex Mono
        </p>
      </div>
    </div>
  );
}
