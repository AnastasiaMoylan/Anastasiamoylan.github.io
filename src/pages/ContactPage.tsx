import Button from "../components/ui/Button";

const details = [
  {
    label: "Email",
    value: "anastasianmoylan.design@gmail.com",
    href: "mailto:anastasianmoylan.design@gmail.com",
    description: "Best for initial conversations. I respond within one business day.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/anastasia-novelly-moylan-76a70052",
    href: "https://linkedin.com/in/anastasia-novelly-moylan-76a70052",
    description: "Longer career history, endorsements, and activity.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <div className="max-w-[44rem]">
          <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-foreground leading-[1.15] mb-5">
            Let&apos;s talk about the problem you&apos;re solving.
          </h1>
          <p className="text-[1.0625rem] text-muted-foreground leading-[1.7] mb-12">
            I&apos;m open to senior product design roles — particularly where the product involves AI, complex workflows, or enterprise-scale systems. The best first conversations start with what you&apos;re building and where the design challenge actually lives, not a job description.
          </p>

          <div className="flex flex-col gap-6 mb-12">
            {details.map(({ label, value, href, description }) => (
              <div key={label} className="p-6 bg-card border border-border rounded-md flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-1">{label}</p>
                <a
                  href={href}
                  className="text-[1.0625rem] font-semibold text-accent-text hover:text-foreground transition-colors duration-150 break-all"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {value}
                </a>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-card border border-border rounded-md mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent mb-3">What to expect</p>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {[
                "Quick response — typically within one business day",
                "No recruiter screens required — you can reach me directly",
                "Full designs available to share in a conversation — NDA-friendly",
                "Comfortable with async or live conversations",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] text-muted-foreground">
                  <span className="text-accent mt-[2px] shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="mailto:anastasianmoylan.design@gmail.com" variant="primary">
              Send an Email
            </Button>
            <Button to="/resume" variant="outline">
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
