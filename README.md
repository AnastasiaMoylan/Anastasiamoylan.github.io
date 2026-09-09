# Anastasia Novelly Moylan — Portfolio

**[anastasiamoylan.github.io](https://anastasiamoylan.github.io)**

The source of my portfolio. I'm a Lead Product Designer working on enterprise AI,
B2B SaaS, and finance products — end-to-end journeys and the systems underneath them.

This repository is public so the work can be read, not so it can be reused. It is the
site itself: my case studies, my writing, my résumé. It is **not a template, a starter,
or a boilerplate**, and it isn't built to be cloned and refitted with someone else's
name. If you're looking for a portfolio starter, this isn't one.

The reason it's open is simpler: I design through implementation, and the decisions in
this repo are part of what I'd want a hiring team to see.

---

## The work

Four case studies, each an end-to-end enterprise engagement:

| Case study | What it was |
| --- | --- |
| **Finance Cloud** | Reporting, forecasting, and month-end close in one governed AI platform |
| **The Connected Customer Journey** | Turning predictive churn scores into reviewed, accountable action |
| **An Auditable Billing Workflow** | Replacing manual billing-package assembly to recover backlogged revenue |
| **A Tailorable Enterprise AI Platform** | Giving business units their own AI toolbox on centrally maintained rails |

Alongside them: a [philosophy](https://anastasiamoylan.github.io/philosophy) page of
principles tested against those engagements, and a résumé.

---

## Decisions worth explaining

The parts of this build I'd defend in a design review.

**The résumé and the case studies cannot contradict each other.**
Claims that appear in both live once, in
[`src/data/ownedStatements.ts`](src/data/ownedStatements.ts), and are imported into
both places. These are professional claims about real engagements — a résumé that
quietly disagrees with the case study describing the same work is worse than either
document alone. Making drift structurally impossible was cheaper than remembering to
check.

**Renaming a case study doesn't break links people already have.**
A retired slug stays live as a `previousSlug` alias and resolves to the current URL,
with the canonical tag always pointing at the new one. Renaming something is a
content decision; it shouldn't cost a visitor a 404 or split the page's search history.

**Every route is readable without JavaScript.**
The site is a React SPA, but `npm run build` prerenders each route to static HTML.
Crawlers, social-share cards, screen readers, and anyone on a bad connection get real
content, not an empty `<div id="root">`. A portfolio that a recruiter's link preview
can't read is a portfolio with a hole in it.

**Metadata is defined once and applied twice.**
[`src/data/pageMeta.ts`](src/data/pageMeta.ts) is the single source for titles,
descriptions, canonicals, and Open Graph tags. The prerender step writes them into the
static HTML at build time; `DocumentHead` reapplies them on client-side navigation.
Case-study metadata derives automatically from the case-study data, so adding a study
can't leave its meta behind.

**The site tells AI crawlers what it is.**
`llms.txt` and a plain-text `resume.txt` exist so language models summarizing me
have something accurate to read. That's increasingly how people encounter a
portfolio — which is also why neither is written by hand. Both are generated at
build time from the same data the pages render
([`src/data/textOutputs.ts`](src/data/textOutputs.ts)), so the summary a model
reads can't quietly fall behind the site it describes.

---

## Structure

Everything you can read on the site — every sentence, number, and claim — is data, not
markup. The components render it; they don't contain it. So if you came here to read the
work rather than the code, `src/data/` is the whole story:

| To read | Open |
| --- | --- |
| A case study, in full | [`caseStudies.ts`](src/data/caseStudies.ts) |
| How the studies are titled, tagged, and ordered | [`projects.ts`](src/data/projects.ts) |
| The résumé | [`resume.ts`](src/data/resume.ts) |
| The design principles | [`philosophy.ts`](src/data/philosophy.ts) |
| A claim the résumé and a case study both make | [`ownedStatements.ts`](src/data/ownedStatements.ts) |
| Every repeated number, with where it came from | [`figures.ts`](src/data/figures.ts) |

And the rest of it, in one screen:

```
src/
  data/         the content above — edit here, not in the components
  pages/        one component per route
  components/   layout, home, work, case study, résumé, shared UI
  app/          root component, router, per-navigation head / scroll / analytics
  assets/       case-study imagery
  styles/       Tailwind layer and theme tokens
scripts/        prerender.mjs — renders each route to static HTML, then writes
                sitemap.xml, llms.txt, and resume.txt
public/         robots.txt, favicon, 404.html
index.html      app shell and base <head>, used as the prerender template
```

`sitemap.xml`, `llms.txt`, and `resume.txt` are **generated into `dist/`** and are
deliberately absent from `public/` — a checked-in copy is a copy that drifts.
[`textOutputs.ts`](src/data/textOutputs.ts) builds the last two from the same data the
pages render.

Built with React 18, React Router 7, Vite 6, Tailwind CSS 4, and TypeScript in strict
mode. Analytics via GA4.

---

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages. Build output is never committed — CI
regenerates it on every push.

Adding a route means listing it in
[`scripts/prerender.mjs`](scripts/prerender.mjs) and
[`public/sitemap.xml`](public/sitemap.xml).

---

## Running it locally

For my own reference, and for anyone who wants to verify the build does what I say it
does.

```bash
npm install
npm run dev        # dev server → http://localhost:5173
npm run build      # client bundle → SSR bundle → prerender → cleanup
npm run typecheck  # tsc --noEmit
```

---

## Usage

The code is here to be read. The content — case studies, copy, imagery, résumé, and my
name — is not licensed for reuse, and the engagements described belong to the clients
who commissioned them.

If something here is useful to you, I'd rather you asked than forked.
[Get in touch](https://anastasiamoylan.github.io/contact).
