import Eyebrow from "./Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3;
  /** Set when a parent landmark points at this heading via aria-labelledby. */
  id?: string;
}

/*
  Page titles (level 1) get the display scale; section headings settle at the
  34px the design uses, so a section never competes with the page title.
*/
const titleSize = {
  1: "text-[clamp(2.25rem,5vw,3.25rem)]",
  2: "text-[clamp(1.625rem,3vw,2.125rem)]",
  3: "text-[clamp(1.375rem,2.4vw,1.625rem)]",
};

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
      <HeadingTag
        id={id}
        className={`font-display font-extrabold text-foreground leading-[1.1] tracking-[-0.03em] ${titleSize[level]}`}
      >
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
