# Anastasia Novelly Moylan — Portfolio

**[anastasiamoylan.github.io](https://anastasiamoylan.github.io)**

The source of my portfolio. I'm a Lead Product Designer working on enterprise AI,
B2B SaaS, and finance products — end-to-end journeys and the systems underneath them.

This repository is public so the work can be read, not so it can be reused. It is the
site itself: my case studies, my writing, my résumé. It is **not a template, a starter,
or a boilerplate**. If you're looking for a portfolio starter, this isn't one.

The reason it's open is simpler: I design through implementation, and building the site
myself is part of how I work.

---

## The work

Four end-to-end enterprise engagements:

| Case study | What it was | My role |
| --- | --- | --- |
| **Finance Cloud** | Reporting, forecasting, and month-end close unified into one governed AI platform, with the interaction principles that make agent output worth acting on | Product Experience Lead |
| **An Auditable Billing Workflow** | Replacing manual billing-package assembly to recover backlogged revenue — built from zero over a year, from MVP to dashboard, in-product editing, and review | Lead Designer, then Design Lead and UX / Product Strategy Lead |
| **A Tailorable Enterprise AI Platform** | Giving business units their own AI toolbox on centrally maintained rails, with sourced answers users could trace back to the evidence | UX and Product Strategy Lead |
| **The Connected Customer Journey** | Designing the path from a predictive churn score to a reviewed, accountable human decision — a showcase concept, not deployed to customers | Senior UX Designer, leading design on the engagement |

Alongside them: a [philosophy](https://anastasiamoylan.github.io/philosophy) page of
principles tested against those engagements, and a résumé.

---

## How the site is built, and why

A few choices that matter to what the site is *for*, rather than to how it's coded:

**The résumé and the case studies can't contradict each other.** Claims that appear in
both are written once and shared by both. These are professional claims about real
engagements, and a résumé that quietly disagrees with the case study describing the
same work is worse than either document alone.

**Renaming a case study doesn't break links people already have.** Old URLs keep
working and resolve to the current one. Renaming is a content decision; it shouldn't
cost a visitor a dead link.

**Every page is readable without JavaScript.** Each route is prerendered to static
HTML, so crawlers, link previews, screen readers, and slow connections get real
content. A portfolio a recruiter's link preview can't read is a portfolio with a hole
in it.

**AI summaries stay accurate.** An `llms.txt` and a plain-text résumé are generated
from the same content the pages render — not hand-written — because that's
increasingly how people first encounter a portfolio, and a hand-kept copy is a copy
that drifts.

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

The rest of it, in one screen:

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

---

## Technical notes

React 18, React Router 7, Vite 6, Tailwind CSS 4, TypeScript in strict mode, GA4.

`sitemap.xml`, `llms.txt`, and `resume.txt` are generated into `dist/` at build time and
deliberately not checked in — a checked-in copy is a copy that drifts.

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
