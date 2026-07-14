import Hero from "../components/home/Hero";
import ToolBadgeStrip from "../components/home/ToolBadgeStrip";
import CapabilityGrid from "../components/home/CapabilityGrid";
import ProcessPreview from "../components/home/ProcessPreview";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import WorkCard from "../components/work/WorkCard";
import { projects } from "../data/projects";

const featuredProjects = [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolBadgeStrip />

      <section className="py-20 border-b border-border" aria-labelledby="home-work-heading">
        <div className="content-container">
          <SectionHeading
            eyebrow="Selected work"
            title="Four end-to-end solutions worth reading about"
            subtitle="Each one was an opportunity to design a connected, end-to-end solution: turning disconnected steps, unclear ownership, and untracked handoffs into a journey people could follow with confidence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {featuredProjects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CapabilityGrid />
      <ProcessPreview />

      <section className="py-20 border-b border-border" aria-labelledby="philosophy-teaser-heading">
        <div className="content-container">
          <div className="max-w-[48rem]">
            <SectionHeading
              eyebrow="Design philosophy"
              title="The whole system, not just the screen"
            />
            <blockquote className="text-[clamp(1.125rem,2.5vw,1.375rem)] font-medium text-foreground leading-[1.55] italic pl-6 border-l-[3px] border-primary mt-8 mb-8">“Good product design is what makes a system understandable: getting the flows right, designing the data well, and treating AI as core to the experience, not an afterthought.”</blockquote>
            <Button to="/philosophy" variant="outline">Read the full philosophy</Button>
          </div>
        </div>
      </section>

      <section className="py-20 text-center" aria-labelledby="home-cta-heading">
        <div className="content-container">
          <h2
            id="home-cta-heading"
            className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground mb-4"
          >
            Working on something complex?
          </h2>
          <p className="text-[1.0625rem] text-muted-foreground mb-8 max-w-[36rem] mx-auto">
            I&apos;m open to roles where the problems are real, the systems are complicated, and the work matters.
          </p>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </section>
    </>
  );
}
