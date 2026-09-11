import Plate from "../Plate";

/**
 * A coded diagram (React markup rather than an exported SVG) as a champagne
 * plate (Plates layout, 2026-09-11). The heading is the plate label; the
 * subheading, set as the bold lead-in, and the closing line become the
 * caption. The diagram brings its own cards and rules, so it sits on the
 * ground as-is.
 */
export default function DiagramPanel({
  heading,
  subheading,
  quote,
  children,
}: {
  heading: string;
  subheading?: string;
  quote?: React.ReactNode;
  children: React.ReactNode;
}) {
  const caption =
    subheading || quote ? (
      <>
        {subheading && <b>{subheading}</b>} {quote}
      </>
    ) : undefined;
  return (
    <Plate ground="champagne" label={heading} caption={caption}>
      <div className="cs-coded">{children}</div>
    </Plate>
  );
}
