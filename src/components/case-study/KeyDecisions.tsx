import type { ReactNode } from "react";
import type {
  AnnotatedFigure as AnnotatedFigureData,
  Decision,
  StateRecovery,
} from "../../data/caseStudyTypes";
import AnnotatedFigure from "./AnnotatedFigure";
import ImageGallery from "./ImageGallery";
import RejectedPath from "./RejectedPath";
import StatesRecovery from "./StatesRecovery";

/**
 * The decisions, one block each in argument order (Plates layout,
 * 2026-09-11): the number and the mechanism it produced, the claim in the
 * voice face, the reasoning, the decision's plates, then the path not taken.
 * No card grid: a decision is a short run of argument followed by the
 * evidence that proves it, stacked, never beside.
 *
 * A decision's plates are its own `images`, plus the annotated screen and the
 * states table when the study attaches them to it (`annotated.decision`,
 * `statesDecision`). The "Instead of" line goes on the last plate, in the
 * margin beside its caption; a decision without a plate sets it under the
 * reasoning. The mechanism label is the citable name ("the six-state status
 * model"); a study whose decisions carry none shows the number alone.
 */
export default function KeyDecisions({
  decisions,
  annotated,
  states,
  statesDecision,
}: {
  decisions: Decision[];
  annotated?: AnnotatedFigureData;
  states?: StateRecovery[];
  statesDecision?: number;
}) {
  const ordinal = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <div className="cs-sub">
      {decisions.map((d, i) => {
        const note = <RejectedPath decision={d} />;
        const hasNote = !!(d.rejected || d.tradeoff);

        // The decision's plates, in order, with the note on the last one.
        const plates: ((note?: ReactNode) => ReactNode)[] = [];
        if (d.images?.length) {
          plates.push((n) => <ImageGallery key="images" images={d.images!} label={d.mechanism} note={n} />);
        }
        if (annotated && annotated.decision === i) {
          plates.push((n) => <AnnotatedFigure key="annotated" figure={annotated} note={n} />);
        }
        if (states?.length && statesDecision === i) {
          plates.push((n) => <StatesRecovery key="states" states={states} note={n} />);
        }

        return (
          <article key={d.decision} className="cs-sub cs-dec" id={`decision-${i + 1}`}>
            <p className="cs-dec-id cs-label">
              <span className="cs-n" aria-hidden="true">{ordinal(i)}</span>
              {d.mechanism && <span className="cs-m">{d.mechanism}</span>}
            </p>
            <h4 className="cs-h3">{d.decision}</h4>
            <div className="cs-prose cs-body">
              <p>{d.rationale}</p>
            </div>
            {plates.map((render, p) => render(p === plates.length - 1 && hasNote ? note : undefined))}
            {plates.length === 0 && hasNote && note}
          </article>
        );
      })}
    </div>
  );
}
