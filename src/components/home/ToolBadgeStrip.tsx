import Badge from "../ui/Badge";

const tools = ["Figma", "React", "Tailwind CSS", "GitHub"];

export default function ToolBadgeStrip() {
  return (
    <div className="py-12 border-b border-border">
      <div className="content-container">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-5">
          Tools I work with
        </p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-2.5">
          {tools.map((tool) => (
            <li key={tool}>
              <Badge variant="default">{tool}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
