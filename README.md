# Anastasia Novelly Moylan — Portfolio

**[anastasiamoylan.github.io](https://anastasiamoylan.github.io)**

The source of my portfolio. I'm a Lead Experience Designer working on enterprise AI,
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
[`public/llms.txt`](public/llms.txt) and a plain-text
[`resume.txt`](public/resume.txt) exist so language models summarizing me have
something accurate to read. That's increasingly how people encounter a portfolio.

---

## Structure

```
index.html              App shell + base <head> meta (prerender template)
src/
  app/                  Root component, router, per-navigation head/scroll/analytics
  pages/                One component per route
  components/           Layout, home, work, case-study, resume, shared UI
  data/
    projects.ts         Case-study cards, slugs, filters, featured order
    caseStudies.ts      Long-form case-study content
    ownedStatements.ts  Claims shared by case studies and the résumé
    pageMeta.ts         Per-route title/description/canonical/OG
    routes.ts           Every prerendered URL; also the sitemap source
  assets/               Case-study imagery
  styles/               Tailwind layer + theme tokens
scripts/prerender.mjs   Renders each route to dist/<route>/index.html
public/                 llms.txt, resume.txt, robots.txt, 404.html, favicon
```

Built with React 18, React Router 7, Vite 6, Tailwind CSS 4, and TypeScript in strict
mode. Analytics via GA4.

---

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages. Build output is never committed — CI
regenerates it on every push.

Adding a route means listing it in [`src/data/routes.ts`](src/data/routes.ts) and
declaring its `<Route>` in [`src/app/router.tsx`](src/app/router.tsx). The prerender
step and `sitemap.xml` both read that one list. Case-study URLs derive from the
project data, so a new case study needs neither edit.

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
