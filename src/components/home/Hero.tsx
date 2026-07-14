import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="py-20 pb-24 border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div className="content-container grid grid-cols-1S">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-5">
            Lead Experience Designer &middot; AI and systems
            design.
          </p>
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1.05] text-foreground mb-6"
          >
            Bridging the gap between product and human
            experience.
          </h1>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground leading-[1.7] max-w-[46rem] mb-10">
            For 10+ years, I&apos;ve turned complex enterprise
            workflows into clear, trustworthy
            products&mdash;leading teams and partnering with
            engineering from early strategy through
            implementation and quality assurance.
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
            B2B SaaS &middot; Enterprise AI &middot; Finance
            transformation &middot; Design systems &middot;
            React/Tailwind prototyping
          </p>
        </div>
      </div>
    </section>
  );
}