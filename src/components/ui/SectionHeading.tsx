import Eyebrow from "./Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3;
  /** Set when a parent landmark points at this heading via aria-labelledby. */
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  level = 2,
  id,
}: SectionHeadingProps) {
  const HeadingTag = `h${level}` as "h1" | "h2" | "h3";

  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <HeadingTag id={id} className="text-[clamp(2rem,4vw,3.75rem)] font-bold text-foreground leading-[1.1]">
        {title}
      </HeadingTag>
      {subtitle && (
        <p className="text-[1.0625rem] text-muted-foreground leading-[1.7] max-w-[46rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
