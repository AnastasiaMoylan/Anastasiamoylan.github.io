import { Mail, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container max-w-[36rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-4">Contact</p>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold text-foreground leading-[1.1] mb-4">
          Get in touch
        </h1>
        <p className="text-[1.0625rem] text-muted-foreground leading-[1.7] mb-12">
          I&apos;m open to senior product design roles. Reach out directly. No forms, no gatekeeping.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="mailto:anastasiamoylan@gmail.com"
            className="flex items-center gap-5 p-6 bg-card border-2 border-border rounded-md hover:border-primary hover:bg-secondary transition-colors duration-150 group no-underline"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
              <Mail size={22} />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Email</span>
              <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-150 truncate">
                anastasiamoylan@gmail.com
              </span>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/anastasia-novelly-moylan-76a70052"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 p-6 bg-card border-2 border-border rounded-md hover:border-primary hover:bg-secondary transition-colors duration-150 group no-underline"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
              <Linkedin size={22} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">LinkedIn</span>
              <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
                Anastasia Novelly Moylan
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
