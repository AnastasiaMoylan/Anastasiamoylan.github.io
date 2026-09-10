import Eyebrow from "../ui/Eyebrow";

/**
 * "Built with": the team the work sat inside, named once before the close
 * (Layout C). Contribution clarity was the most-repeated criterion in the
 * reviewer research, and naming collaborators reads as credibility rather
 * than diluted credit. The text is the study's own `scope.workedWith`, so the
 * credits and the ownership block can never name different people.
 */
export default function Credits({ workedWith }: { workedWith: string }) {
  return (
    <div className="content-container border-t border-border py-[clamp(2rem,4vw,3rem)]">
      <Eyebrow>Built with</Eyebrow>
      <p className="mt-3 m-0 max-w-[56rem] text-small leading-[1.7] text-muted-foreground">
        {workedWith}
      </p>
    </div>
  );
}
