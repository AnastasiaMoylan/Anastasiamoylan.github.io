import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import WorkCard from "../components/work/WorkCard";
import WorkFilters from "../components/work/WorkFilters";
import Button from "../components/ui/Button";
import { projects } from "../data/projects";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder)
      : projects.filter((p) => p.filterCategories.includes(activeFilter));

  return (
    <div className="py-16">
      <div className="content-container">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Case studies"
            title="Selected product work"
            subtitle="These are the problems worth explaining: organizational complexity, technical constraints, and user needs that all had to be resolved at the same time. Each one shows how I work, not just what I delivered."
          />
        </div>

        <WorkFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          aria-live="polite"
          aria-label="Case study results"
        >
          {filtered.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>

        <aside className="mt-12 p-6 bg-card border border-border rounded-md text-[0.9375rem] text-muted-foreground leading-relaxed">
          Client and engagement details are confidential. The placeholder visuals here represent real interface work. Full designs are available to share during a conversation with a hiring team.
        </aside>

        <div className="mt-20 text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground mb-4">
            Seen enough to want to talk?
          </h2>
          <p className="text-[1.0625rem] text-muted-foreground mb-8 max-w-[36rem] mx-auto">
            I&apos;m available for senior product design roles. The best conversations start with a specific problem you&apos;re trying to solve.
          </p>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>
    </div>
  );
}
