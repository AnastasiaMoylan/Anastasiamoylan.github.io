import ResumeContent from "../components/resume/ResumeContent";

export default function ResumePage() {
  return (
    <div className="py-16 pb-24 print:py-0">
      <div className="content-container">
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-8 border-b border-border print:hidden">
          <span className="text-sm text-muted-foreground mr-auto">
            Anastasia Novelly Moylan &middot; Resume
          </span>
          <a
            href="/resume.txt"
            download="anastasia-novelly-moylan-resume.txt"
            className="inline-flex items-center gap-2 font-sans text-[0.9375rem] font-semibold px-5 py-2.5 rounded-sm bg-transparent text-foreground border-2 border-border hover:border-muted-foreground no-underline transition-colors duration-150 min-h-[44px]"
          >
            Download plain-text version
          </a>
          <button
            className="inline-flex items-center gap-2 font-sans text-[0.9375rem] font-semibold px-5 py-2.5 rounded-sm bg-primary text-primary-foreground border-2 border-primary hover:bg-accent-hover hover:border-accent-hover cursor-pointer transition-colors duration-150 min-h-[44px]"
            onClick={() => window.print()}
            type="button"
          >
            Print / Save as PDF
          </button>
        </div>

        <ResumeContent />
      </div>
    </div>
  );
}
