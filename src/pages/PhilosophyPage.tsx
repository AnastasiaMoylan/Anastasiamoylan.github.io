import { Fragment, useEffect, useState } from "react";
import { figures } from "../data/figures";
import {
  principles,
  principleCountWord,
  philosophyThesis,
  philosophyBridge,
  evaluationIntro,
  evaluationChecks,
  type Principle,
} from "../data/philosophy";

/**
 * The philosophy page in the Rail direction (`styles/philosophy.css`,
 * reference `renderings/philosophy-1-rail.src.html`). Every sentence comes
 * from `data/philosophy.ts`; the three small figures are the site's diagram
 * language restating a principle, which is why two of them are aria-hidden.
 */

const ordinal = (i: number) => String(i + 1).padStart(2, "0");
const anchor = (i: number) => `p${i + 1}`;

/**
 * A thesis is two sentences, the turn in the second. Split at the first full
 * stop so the second can be set in italic; a thesis that isn't two sentences
 * renders whole.
 */
function Thesis({ text }: { text: string }) {
  const cut = text.indexOf(". ");
  if (cut < 0) return <p className="ph-thesis">{text}</p>;
  return (
    <p className="ph-thesis">
      {text.slice(0, cut + 1)} <em>{text.slice(cut + 2)}</em>
    </p>
  );
}

/** The billing status model from principle 01, as chips — the flow, drawn. */
function StatusFlowPlate() {
  // Five states, matching the principle's own body copy on this page. The
  // billing study publishes six (`figures.billingStatusStates`); whether the
  // page copy should say six too is the owner's call, not a code fix.
  const states = ["Initiated", "In Progress", "Review", "Approved", "Finalized"];
  return (
    <figure className="ph-plate" aria-hidden="true">
      <div className="ph-flow">
        {states.map((state, i) => (
          <Fragment key={state}>
            {i > 0 && <i>&rarr;</i>}
            <span>{state}</span>
          </Fragment>
        ))}
      </div>
      <figcaption>One shared status vocabulary, with ownership and history attached.</figcaption>
    </figure>
  );
}

/** The threshold question from principle 04, as three zones on the tint ramp. */
function ThresholdPlate() {
  return (
    <figure className="ph-plate" aria-hidden="true">
      <div className="ph-zones">
        <div>Acts on its own</div>
        <div>Recommends and waits</div>
        <div>Stops and asks</div>
      </div>
      <figcaption className="ph-zones-cap">
        <span>Higher confidence &middot; lower consequence</span>
        <span>Lower confidence &middot; higher consequence</span>
      </figcaption>
    </figure>
  );
}

/**
 * Principle 08's thesis as a figure. Not aria-hidden: unlike the other two
 * visuals it isn't a restatement — it IS the thesis line.
 */
function AiStat() {
  return (
    <p className="ph-stat">
      <b>{figures.aiDrivenShare}</b>
      <span>of my work is AI-driven &mdash; with my judgment on every output.</span>
    </p>
  );
}

const plates: Record<Exclude<NonNullable<Principle["visual"]>, "aiStat">, () => React.ReactNode> = {
  statusFlow: StatusFlowPlate,
  thresholds: ThresholdPlate,
};

/**
 * Which principle is in view, for the rail's location mark. One scroll
 * handler, one frame at a time: the last article whose top has passed the
 * line under the sticky header.
 */
function useCurrentPrinciple() {
  const [current, setCurrent] = useState<number | null>(null);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      let found: number | null = null;
      principles.forEach((_, i) => {
        const el = document.getElementById(anchor(i));
        if (el && el.getBoundingClientRect().top <= 120) found = i;
      });
      const checks = document.getElementById("checks");
      if (checks && checks.getBoundingClientRect().top <= 120) found = null;
      setCurrent(found);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return current;
}

export default function PhilosophyPage() {
  const current = useCurrentPrinciple();

  return (
    <div className="ph-page">
      <section className="ph-open" aria-labelledby="ph-title">
        <div className="content-container">
          <div className="ph-grid">
            <p className="ph-eyebrow">Design philosophy</p>
            <h1 id="ph-title">The whole system, not just the screen</h1>
            <p className="ph-sub">{principleCountWord} principles, each drawn from a real engagement.</p>
            <blockquote>{philosophyThesis}</blockquote>
            <p className="ph-bridge">{philosophyBridge}</p>
          </div>
        </div>
      </section>

      <section className="ph-body" aria-label="The principles">
        <div className="content-container">
          <div className="ph-grid">
            <nav className="ph-rail" aria-label="Principles">
              <p className="ph-eyebrow">{principleCountWord} principles</p>
              <ol>
                {principles.map(({ title }, i) => (
                  <li key={title}>
                    <a href={`#${anchor(i)}`} aria-current={current === i ? "true" : undefined}>
                      <b>{ordinal(i)}</b>
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
              <a className="ph-to-checks" href="#checks">
                How I evaluate design &darr;
              </a>
            </nav>

            <div className="ph-list">
              {principles.map(({ title, thesis, body, visual }, i) => {
                const Plate = visual && visual !== "aiStat" ? plates[visual] : null;
                return (
                  <article key={title} className="ph-p" id={anchor(i)}>
                    <span className="ph-n" aria-hidden="true">
                      {ordinal(i)}
                    </span>
                    <h2>{title}</h2>
                    {/* AiStat stands in for 08's thesis, so the line isn't repeated. */}
                    {visual === "aiStat" && <AiStat />}
                    {thesis && <Thesis text={thesis} />}
                    <div className="ph-prose">
                      {body.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>
                    {Plate && <Plate />}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="ph-checks" id="checks" aria-labelledby="ph-checks-title">
        <div className="content-container">
          <p className="ph-eyebrow">The checks</p>
          <h2 id="ph-checks-title">How I evaluate design</h2>
          <p className="ph-intro">{evaluationIntro}</p>
          <ul>
            {evaluationChecks.map(({ title, body }) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
