/** Hairline-topped closing line pinned to the bottom of a TintPanel. */
export default function FootNote({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-auto border-t border-border pt-4" />
      <p className="m-0 text-[0.75rem] leading-[1.55] text-muted-foreground">{children}</p>
    </>
  );
}
