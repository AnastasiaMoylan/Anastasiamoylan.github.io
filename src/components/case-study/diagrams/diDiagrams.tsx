import type { SectionAugments } from "../buildSections";
import type { CaseStudyImage } from "../../../data/caseStudies";
import ImageGallery from "../ImageGallery";

import citationLoop from "../../../assets/case-studies/di/citation-loop.png?preview";
import citationLoopFull from "../../../assets/case-studies/di/citation-loop.png";
import comparisonModes from "../../../assets/case-studies/di/comparison-modes.png?preview";
import comparisonModesFull from "../../../assets/case-studies/di/comparison-modes.png";
import scopeOwnership from "../../../assets/case-studies/di/scope-ownership.png?preview";
import scopeOwnershipFull from "../../../assets/case-studies/di/scope-ownership.png";

/**
 * The three diagrams this study carries, drawn 2026-09-08 to 09 with the
 * diagram-design plugin (source `.html` beside each `.png`; see
 * research/decisions/case-study-diagrams.md).
 *
 * Until now this study had no entry in `augments.ts` at all — it was the only
 * one of the four with no coded figure, which is why its Key decisions section
 * argued in prose alone.
 *
 * Alt text is lifted verbatim from each diagram's own `<desc>`, so the two
 * cannot drift. Captions are authored and flagged.
 */
const citation: CaseStudyImage = {
  src: citationLoop,
  fullSrc: citationLoopFull,
  width: 2400,
  height: 1502,
  alt: "A three-stage loop. A generated statement carries numbered citation chips. Opening the Sources control lists the documents behind the answer, each item opening in the embedded viewer or in a new tab. Opening a source narrows the chat context to that one document, so the answer and its evidence are read together. Closing the source widens the context back to the broader conversation, which returns the user to the statement they started from without losing their place. A note below records the rejected alternative: a citation footer at the end of a response, which satisfies an audit requirement but makes checking a source a separate task.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "Verification is a round trip, not an exit. The context narrows to the source and widens again, so checking a claim never costs the reader their place.",
};

const comparison: CaseStudyImage = {
  src: comparisonModes,
  fullSrc: comparisonModesFull,
  width: 2400,
  height: 1502,
  alt: "A branch diagram. A user selects between two and ten documents, which appear as chips beside the prompt and stay deselectable until submission. The selection count, not a user preference, decides the mode. Exactly two documents open a side-by-side diff that highlights shared and differing content section by section. Three to ten documents open a comparison table whose rows are themes or entities and whose columns are documents. A note records the rejected alternative: one universal comparison view that scaled to any number of documents.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "The mode is bound to the count, not to a preference. Two documents and five are different reading tasks, so they get different views.",
};

const scope: CaseStudyImage = {
  src: scopeOwnership,
  fullSrc: scopeOwnershipFull,
  width: 2400,
  height: 1502,
  alt: "Four widening bands of involvement on the document AI platform. At the core, what I owned outright: the region-based layout across five breakpoints, citations, sources and the embedded viewer, and document selection, comparison, drafting and export — with the UX acceptance criteria engineering built against and the accessibility documentation written into the design source of truth. Around it, what I led: requirements and prioritization workshops, research planning, protocol development and synthesis, and living backlogs across two products. Beyond that, what I influenced outside the design lane: the Must, Should and Nice-to-have tiers with dated commitments, the compliance tool framed as a widget on shared rails, and the mandatory response template for comparison answers. The outermost band is the team the work sat inside. A note below records what I did not own: the model, the retrieval stack, and the data-source procurement.",
  // [NEEDS SIGN-OFF] Caption authored 2026-09-09 with the wiring.
  caption:
    "Four widening bands, and a line naming what I did not own. The model, the retrieval stack and the data-source procurement were somebody else's.",
};

export function diAugments(): SectionAugments {
  return {
    append: {
      scope: <ImageGallery images={[scope]} />,
      decisions: <ImageGallery images={[citation, comparison]} />,
    },
  };
}
