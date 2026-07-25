import type { Tldr } from "../../data/caseStudies";

export default function OverviewSection({ tldr }: { tldr: Tldr }) {
  return (
    <section className="mt-12 pb-12 border-b border-border">
      <h2 className="text-[1.375rem] font-bold text-foreground pb-3 mb-5 border-b border-border">Overview</h2>
      <div className="border border-border rounded-[14px] overflow-hidden grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        <div className="bg-card border-b md:border-b-0 md:border-r border-border p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-3">The challenge</p>
          <p className="text-[0.9375rem] text-foreground leading-[1.7]">{tldr.challenge}</p>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-2">The result</p>
            <p className="text-[1.0625rem] font-medium text-foreground leading-[1.6]">{tldr.result}</p>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">How I approached it</p>
            <p className="text-sm text-muted-foreground leading-[1.7]">{tldr.solution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
