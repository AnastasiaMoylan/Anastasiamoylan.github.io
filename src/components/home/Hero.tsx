import { Fragment } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import { homeHero } from "../../data/home";

/**
 * The home hero in the Lead plate layout (`styles/home.css`). The copy and the
 * cover come from `data/home.ts`; this file is only the layout, so another of
 * the drawn heroes can replace it without touching the content.
 */
export default function Hero() {
  const { eyebrow, headline, deck, primaryCta, secondaryCta, meta, lead } = homeHero;

  return (
    <section className="home-hero on-ink" aria-labelledby="hero-heading">
      <div className="content-container">
        <div className="home-hero-grid">
          <div className="home-hero-who">
            <Eyebrow tone="ink" className="home-hero-eyebrow">
              {eyebrow.split(" · ").map((phrase, i, all) => (
                <Fragment key={phrase}>
                  <span>
                    {phrase}
                    {i < all.length - 1 && " ·"}
                  </span>{" "}
                </Fragment>
              ))}
            </Eyebrow>
            <h1 id="hero-heading">
              {headline[0]} <em>{headline[1]}</em>
            </h1>
            <p className="home-hero-deck">{deck}</p>
            <div className="home-hero-cta">
              <Button to={primaryCta.to} variant="inkPrimary">
                {primaryCta.label}
              </Button>
              <Button to={secondaryCta.to} variant="inkOutline">
                {secondaryCta.label}
              </Button>
            </div>
            <ul className="home-hero-meta">
              {meta.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>

          <Link className="home-hero-lead" to={lead.to}>
            <span className="home-hero-cap">
              <b aria-hidden="true">{lead.ordinal}</b>
              <span>{lead.title}</span>
            </span>
            {/* Inlined, not an <img>: the cover's labels are live text. Hidden
                from assistive tech so the link's name is the caption above,
                not the caption plus the SVG's title and description. */}
            <span className="home-hero-shot" aria-hidden="true" dangerouslySetInnerHTML={{ __html: lead.svg }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
