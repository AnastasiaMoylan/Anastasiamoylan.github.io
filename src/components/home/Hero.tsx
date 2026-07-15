import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="py-20 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="content-container grid grid-cols-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-5">
            Lead Experience Designer &middot; End-to-End Journeys &amp; Systems Design
          </p>
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.05] text-foreground mb-6"
          >
            Designing end-to-end journeys people can trust.
          </h1>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-[1.7] max-w-[46rem] mb-10">
            I design the full path: from the first signal a customer or operator receives, through every handoff and decision point, to the final action that closes the loop. Every role in the flow and every state the system can be in are mapped and designed before a screen gets built.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <Button to="/work" variant="primary">
              Case Studies
            </Button>
            <Button to="/philosophy" variant="outline">
              My Philosophy
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Customer Journey Design &middot; End-to-End Workflows &middot; B2B SaaS &middot; Enterprise AI &middot; Design Systems
          </p>
        </div>
      </div>
    </section>
  );
}
