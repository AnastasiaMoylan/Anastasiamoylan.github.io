import ResumeContent from "../components/resume/ResumeContent";
import Button from "../components/ui/Button";

export default function ResumePage() {
  return (
    <div className="py-16 pb-24 print:py-0">
      <div className="content-container">
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-8 border-b border-border print:hidden">
          <span className="text-sm text-muted-foreground mr-auto">
            Anastasia Novelly Moylan &middot; Resume
          </span>
          <Button href="/resume.txt" download="anastasia-novelly-moylan-resume.txt" variant="outline">
            Download plain-text version
          </Button>
          <Button onClick={() => window.print()} variant="primary">
            Print / Save as PDF
          </Button>
        </div>

        <ResumeContent />
      </div>
    </div>
  );
}
