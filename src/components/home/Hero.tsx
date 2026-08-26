import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import GovernanceChain from "./GovernanceChain";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border" aria-labelledby="hero-heading">
      <div className="blueprint absolute inset-0" aria-hidden="true" />

      <div className="content-container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_396px] lg:gap-16 lg:items-start">
          <div>
            <Eyebrow>
              Lead UX Designer &middot; Design Systems &amp; AI-Augmented Workflows for Enterprise
            </Eyebrow>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground"
            >
              Designing journeys people can trust.
            </h1>

            <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-[1.75] text-muted-foreground">
              Governed AI for enterprise finance, telecom, and document intelligence &mdash; where
              every automated step stays inspectable, reversible, and owned by a person.
            </p>

            <div className="mt-9">
              <Button to="/work" shape="hex">
                See the case studies
              </Button>
            </div>
          </div>

          <GovernanceChain />
        </div>

        <p className="mt-16 text-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
          St. Marys, Kansas &middot; Remote across the Americas &middot; Eleven years &middot; Finance &middot; Telecom &middot; AI-enabled B2B software
        </p>
      </div>
    </section>
  );
}
