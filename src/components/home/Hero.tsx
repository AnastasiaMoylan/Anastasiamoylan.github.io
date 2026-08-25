import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";

export default function Hero() {
  return (
    <section
      className="py-20 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="content-container grid grid-cols-1">
        <div>
          <Eyebrow className="mb-5">
            Lead UX Designer &middot; Design Systems &amp; AI-Augmented Workflows for Enterprise
          </Eyebrow>
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.05] text-foreground mb-6"
          >
            Designing journeys people can trust.
          </h1>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-[1.7] max-w-[46rem] mb-10">
            I work where product development and engineering meet, designing platforms that many teams and products depend on. I map the whole journey: every role, every state, and every path that breaks. From first contact to final action, my focus is turning complex processes into something people can actually use.
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
            End-to-End Flows &middot; Journeys, Not Just Screens &middot; Data-Driven
          </p>
        </div>
      </div>
    </section>
  );
}
