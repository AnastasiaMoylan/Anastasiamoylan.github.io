/**
 * The case-study content types, in the fields the principal framework asks
 * for (docs/case-study/principal-ux-case-study-framework.md).
 *
 * Split out of caseStudies.ts on 2026-09-09 so that a type change and a
 * content change never have to touch the same file: the content file is
 * 1,600 lines of prose that several people edit at once. caseStudies.ts
 * re-exports everything here, so existing `import type { X } from
 * "../../data/caseStudies"` paths still resolve.
 *
 * Every field on a study is optional unless the framework makes it the core
 * of the page, and a section whose data is absent does not render, so a study
 * can ship partially filled without empty headings. Each field carries its
 * word budget in its doc comment.
 */

export interface CaseStudyImage {
  src: string;
  fullSrc: string;
  /**
   * Intrinsic pixels of the source asset. The gallery renders images fluid
   * (`w-full h-auto`) and lazy, so without these the browser reserves zero
   * height and the page jumps as each image loads; the attributes only fix the
   * aspect ratio, so the full-resolution numbers are correct for the downscaled
   * preview too.
   */
  width: number;
  height: number;
  alt: string;
  /** Required. States the decision the image shows, not what is in the frame. */
  caption: string;
  /**
   * Render at this fraction of the intrinsic width in CSS pixels instead of
   * fitting the column. For a panel cut from a wide flow: fitted to a column,
   * a 2,250px panel renders its 30px labels at 10px, under the site's floor.
   * At 0.55 they are 16px. A panel wider than the column scrolls sideways in
   * its own container; the page never does.
   */
  displayScale?: number;
  /**
   * The figure's own markup, for a drawn diagram shipped as SVG (2026-09-10).
   * When present the gallery inlines it instead of loading `src` in an
   * `<img>`, so the diagram sets its labels in the site's fonts and stays
   * crisp at any width; it is not zoomable, because it needs no zoom. Build
   * it with `diagramSvg()` from a `?raw` import. `src` and `fullSrc` still
   * point at the `.svg` file.
   */
  inlineSvg?: string;
  /**
   * The plate label, two or three words ("Status model", "Package index").
   * Set in mono after the page's own "Plate 04 ·" numbering (Plates layout,
   * 2026-09-11). Falls back to the label the rendering section supplies.
   */
  label?: string;
}

/**
 * The overview as the framework's three lines: challenge, result, approach,
 * one sentence each. A recruiter should be able to stop here and know why the
 * work mattered.
 *
 * The result line doubles as the page's h1 when a study has no `claim`, and
 * the approach line is the header's deck.
 */
export interface OverviewLines {
  /** What was wrong or at stake. One sentence. */
  challenge: string;
  /** What changed because of the work. One sentence, carries the headline figure. */
  result: string;
  /** How it was done, stated as the approach rather than the process. One sentence. */
  approach: string;
}

/**
 * One row of the Problem table: a constraint and what it forced the product
 * to do. Four to six rows. A constraint whose implication is not a product
 * consequence is not a constraint, it is context.
 */
export interface Constraint {
  constraint: string;
  implication: string;
}

/**
 * Scope and ownership, as four labelled blocks.
 *
 * The framework is explicit that "contributed" and "led" are different words,
 * so the four are kept apart rather than merged into one ownership list.
 * `influenced` is the principal-level tell: roadmap, priorities, and standards
 * adopted outside the design lane.
 */
export interface Scope {
  owned: string;
  led?: string;
  influenced?: string;
  workedWith?: string;
}

/**
 * One line of the product framing rendered inside Problem: hypothesis,
 * success metric, constraint, where it landed. Labels are free text because
 * the billing study had a KPI set at kickoff while the others state the
 * metric the author would hold the work to.
 *
 * Budget: four lines, 25 words each, 100 in all. A line that repeats the
 * turning point or the overview is cut, not shortened.
 */
export interface FramingItem {
  label: string;
  text: string;
}

/**
 * A research finding paired with the product change it caused. A finding
 * whose response names no change is cut. Five findings at most.
 */
export interface EvidenceFinding {
  finding: string;
  response: string;
}

export interface Evidence {
  /** The method, in one line: 30 words. */
  body?: string;
  findings?: EvidenceFinding[];
  /** The reframing line, rendered as a pull-quote in Problem: one sentence, 25 words. */
  insight: string;
  principle?: string;
}

export interface Decision {
  /**
   * The named mechanism this decision produced, set as a small label above the
   * decision (Layout C, 2026-09-09): "Progressive validation", "The six-state
   * status model". A named mechanism is citable in an interview; "a decision"
   * is not. Three words or so.
   */
  mechanism?: string;
  decision: string;
  rationale: string;
  /** The path not taken. */
  rejected?: string;
  /** What choosing this path cost. */
  tradeoff?: string;
  /**
   * The evidence for this decision, rendered beneath it. The framework's rule
   * is that a visual earns its place by carrying evidence, so a figure belongs
   * with the decision it proves rather than in a gallery of its own.
   */
  images?: CaseStudyImage[];
}

export interface StateRecovery {
  state: string;
  userSees?: string;
  recovery?: string;
}

/**
 * Outcomes. The stat band already restates the figures in display type, so
 * this section argues them rather than listing them again.
 *
 * The framework's order: the before/after pair, the validated proof, and
 * what to measure next. The metric caveat that closed it (`metricStatus`)
 * was removed from the site 2026-09-11 at the owner's request: it read as
 * machine-written. The headline and the
 * business / user / organizational lines of the earlier shape went with the
 * last migration (2026-09-09): the claim in the header is the headline now,
 * and a narrative line that named a real change is a proof point.
 *
 * Budget: before and after 20 words each; four proof points. About 100 in
 * all.
 */
export interface Impact {
  before: string;
  after: string;
  /** NDA-safe validated proof points. Four at most. */
  proof?: string[];
  /**
   * What I would measure next, and why it is already available. Closes
   * Outcome. Naming the measurement you would run reads as senior in a way
   * that an absent metric does not.
   */
  measureNext?: string;
}

export interface Reflection {
  learned: string;
  wouldChange?: string;
  /** Threads back to the portfolio's through-line: systems legibility and trust. */
  principle?: string;
}

/**
 * One figure in the at-a-glance band under the header.
 *
 * `value` is set in display type, so it stays short — a number, a ratio, or a
 * single word. Studies whose outcomes are not numerically verified use a
 * countable design output ("6" status states) or a plain word ("Required")
 * rather than a metric the project record cannot support.
 */
export interface Stat {
  value: string;
  label: string;
}

/**
 * One case study, in the fields the principal framework asks for
 * (docs/case-study/principal-ux-case-study-framework.md). The pre-2026-09-09
 * shape — a single overview paragraph, `context`, `turn`, `solutionSteps`,
 * `team`, `ownedThemes`, `leadership` — was removed once the last study was
 * migrated, along with the transitional rendering that carried it. A study
 * that needs a section it does not have gets the field filled, not a new one.
 */
/**
 * The ids of the rendered children, in page order. `parked` is the ninth
 * child added with Layout C (2026-09-09); it sits between the decisions and
 * the evidence.
 */
export type SectionId =
  | "overview"
  | "product-framing"
  | "problem"
  | "scope"
  | "decisions"
  | "parked"
  | "evidence"
  | "outcome"
  | "learned";

/**
 * The opening image pair under the lede (Layout C): one close-up of real
 * interface detail, one wider screen in context. Reviewers cut most
 * candidates in the first thirty seconds on visual quality alone, and a
 * distant mockup with no close-up is the named red flag, so the detail comes
 * first and is cropped tight.
 */
export interface Opener {
  detail: CaseStudyImage;
  context: CaseStudyImage;
}

/**
 * A numbered pin on an annotated screen. `x` and `y` are percentages of the
 * image box, so they need tuning per asset; `text` is the line of reasoning
 * the pin keys to, and it leads with the decision it shows.
 */
export interface AnnotationPin {
  x: number;
  y: number;
  text: string;
}

/**
 * A real screen with numbered callouts keyed to lines of reasoning (Layout C).
 * It shows the thinking on the artefact instead of abstracting it into a
 * diagram. Renders at the end of Key decisions. Four pins at most.
 */
export interface AnnotatedFigure {
  image: CaseStudyImage;
  pins: AnnotationPin[];
  /** States what the screen proves, not what is in the frame. */
  caption: string;
  /**
   * The index of the decision this screen proves. Set, the annotated screen
   * is that decision's plate; absent, it renders after the decisions.
   */
  decision?: number;
}

/**
 * One entry of the parking lot: what did not make the release, and why.
 * An entry without its reason is a backlog item, not a judgment; `why` is
 * required. Budget: 30 words per reason, four entries.
 */
export interface ParkedItem {
  item: string;
  why: string;
}

export interface CaseStudy {
  snapshotFields: { label: string; value: string }[];
  /**
   * Per-study claim headings for the children (Layout C, 2026-09-09). The
   * three parent names are constant on every study; a child heading here is
   * the claim or question that section answers ("Clearing a backlog once is
   * automation. Staying clear is a workflow problem."). A child without an
   * entry falls back to its plain noun. Twelve words or fewer.
   */
  headings?: Partial<Record<SectionId, string>>;
  /** The close-up and context pair under the lede. Absent means no opener band. */
  opener?: Opener;
  /** Numbered pins on a real screen, at the end of Key decisions. */
  annotated?: AnnotatedFigure;
  /**
   * What did not make the release and why. Renders as its own child between
   * Key decisions and Evidence. The calls that kept work out of a release are
   * the ones a panel asks about.
   */
  parked?: ParkedItem[];
  /** At-a-glance figures. Absent means the band doesn't render. */
  stats?: Stat[];
  /** Challenge, result, approach — one sentence each. Budget 70 words. */
  overview?: OverviewLines;
  /**
   * The news, rendered as the page's h1 (added 2026-09-09 with the lede
   * header). One sentence, outcome-first, 20 words or fewer — it is the
   * largest type on the page and a reviewer reads it in the first ten seconds.
   *
   * Falls back to `overview.result`, then to the project tagline. A study
   * showing its tagline here has not had its claim written: the tagline
   * describes the work, and this slot has to assert what changed.
   */
  claim?: string;
  /**
   * Two or three sentences on the business context: what the organization was
   * trying to achieve, what was at stake, and why design was in the room.
   * Budget 90 words. This is the block that separates lead from principal —
   * it shows the bet was understood, not just the brief.
   */
  productFraming?: string;
  /** The problem as one "how might we" line. Opens Problem. Budget 30 words. */
  hmw?: string;
  /** Constraint and its product implication, four to six rows. Renders in Problem. */
  constraints?: Constraint[];
  /** Owned, led, influenced beyond the lane, worked with. Renders in Scope and ownership. */
  scope?: Scope;
  /** Hypothesis, success metric, constraint, and where it landed. Renders in Product framing. Budget 100 words. */
  framing?: FramingItem[];
  /**
   * Process artifacts — working boards, end-to-end flows. Render at the end of
   * Key decisions as "The flows behind the screens", after the decisions and
   * the states, for the reader who wants the whole path at once.
   */
  processImages?: CaseStudyImage[];
  evidence?: Evidence;
  /**
   * Three to six, numbered. The core of the study. A figure that proves one
   * decision belongs on that decision's `images`; `scope.owned` is where the
   * résumé's shared ownership claims (ownedStatements.ts) have to keep agreeing
   * with the study.
   */
  decisions: Decision[];
  /** Edge cases and recovery, rendered as a table plate. */
  states?: StateRecovery[];
  /**
   * The index of the decision the states table proves (Plates layout,
   * 2026-09-11): the table becomes that decision's plate instead of a
   * section of its own. Absent, it renders after the decisions.
   */
  statesDecision?: number;
  /**
   * Figures that belong to the study rather than to one decision. Render after
   * the decisions list. A figure that proves one decision goes on that
   * decision instead.
   */
  images?: CaseStudyImage[];
  impact?: Impact;
  reflection?: Reflection;
}

