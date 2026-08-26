import SectionHeading from "../components/ui/SectionHeading";
import WorkRow from "../components/work/WorkRow";
import Button from "../components/ui/Button";
import { projects } from "../data/projects";

const ordered = [...projects].sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function WorkPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <div className="mb-12">
          <SectionHeading
            level={1}
            eyebrow="Case studies"
            title="Selected product work"
            subtitle="These are the solutions worth explaining, each shaped by organizational complexity, technical constraints, and user needs that all had to be resolved at the same time. Every one shows how I work, not just what I delivered."
          />
        </div>

        {/* Numbered editorial rows (see the Mobbin research board): the outcome
            sentence carries each row. Filters were removed — four studies is
            below the point where filtering earns its place. */}
        {/* sr-only h2 keeps the outline h1 -> h2 -> row h3s; visually the
            rows follow the page header directly. */}
        <h2 className="sr-only">Case studies</h2>
        <div aria-label="Case studies">
          {ordered.map((project, i) => (
            <WorkRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground mb-8">
            Seen enough to want to talk?
          </h2>
          <Button to="/contact" variant="primary">Get in Touch</Button>
        </div>
      </div>
    </div>
  );
}
