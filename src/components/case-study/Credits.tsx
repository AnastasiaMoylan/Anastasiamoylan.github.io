/**
 * "Built with": the team the work sat inside, named once before the close.
 * Contribution clarity was the most-repeated criterion in the reviewer
 * research, and naming collaborators reads as credibility. The text is the
 * study's own `scope.workedWith`, so the credits and the ownership block can
 * never name different people.
 */
export default function Credits({ workedWith }: { workedWith: string }) {
  return (
    <div className="cs-credits">
      <p className="cs-label text-tertiary-700">Built with</p>
      <p className="cs-small text-muted-foreground">{workedWith}</p>
    </div>
  );
}
