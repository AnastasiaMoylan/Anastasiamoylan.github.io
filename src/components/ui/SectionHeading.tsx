interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 2 | 3;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  level = 2,
}: SectionHeadingProps) {
  const HeadingTag = `h${level}` as "h2" | "h3";

  return (
    <div className="flex flex-col gap-3">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
          {eyebrow}
        </p>
      )}
      <HeadingTag className="text-[clamp(2rem,4vw,3.75rem)] font-bold text-foreground leading-[1.1]">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-[1.0625rem] text-muted-foreground leading-relaxed max-w-[46rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
