# Anastasia Novelly Moylan — Portfolio

Source for [anastasiamoylan.github.io](https://anastasiamoylan.github.io) — the portfolio site of Anastasia Novelly Moylan, Lead Experience Designer. A React single-page app that is prerendered to static HTML at build time, so every route is readable without JavaScript and by crawlers and social-share cards.

## Tech stack

- **React 18** + **React Router 7**
- **Vite 6** (build + dev server)
- **Tailwind CSS 4**
- **TypeScript** (strict; `tsc --noEmit` for checking)
- **GitHub Pages** for hosting, deployed via GitHub Actions
- **GA4** analytics (`react-ga4`)

## Getting started

```bash
npm install     # install dependencies
npm run dev      # start the Vite dev server (http://localhost:5173)
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server with HMR. |
| `npm run build` | Production build: client bundle → SSR bundle → prerender all routes to static HTML → clean up. |
| `npm run build:client` | Client bundle only (no prerender). |
| `npm run typecheck` | Type-check the project with `tsc --noEmit`. |

## Project structure

```
index.html              App shell + base <head> meta (template for prerender)
src/
  main.tsx              Client entry
  entry-server.tsx      SSR entry used by the prerender step
  app/
    App.tsx             Root component (GA init)
    router.tsx          Routes + per-navigation <head>/scroll/analytics
  pages/                One component per route (Home, Work, CaseStudy, About, …)
  components/           Layout, home, work, resume, and shared UI components
  data/
    projects.ts         Case-study card data
    pageMeta.ts         Per-route title/description/canonical/OG metadata
  assets/               Case-study images
  styles/               Tailwind + theme CSS
scripts/
  prerender.mjs         Renders each route to dist/<route>/index.html with route-specific meta
public/                 Static files served as-is (llms.txt, resume.txt, sitemap.xml, robots.txt, favicon)
```

## How prerendering works

`npm run build` runs three steps (see [`package.json`](package.json)):

1. `vite build` produces the client bundle in `dist/`.
2. `vite build --ssr src/entry-server.tsx` produces a server bundle in `dist-server/`.
3. [`scripts/prerender.mjs`](scripts/prerender.mjs) renders each route from that bundle into `dist/<route>/index.html`, injecting per-route `<title>`, description, canonical, and Open Graph tags from [`src/data/pageMeta.ts`](src/data/pageMeta.ts). The temporary server bundle is then removed.

Routes to prerender are listed in [`scripts/prerender.mjs`](scripts/prerender.mjs); the corresponding URLs are also in [`public/sitemap.xml`](public/sitemap.xml). Add a new route in both places when adding a page.

## SEO & metadata

Metadata lives in one place — [`src/data/pageMeta.ts`](src/data/pageMeta.ts) — and is applied twice:

- **At build time** by the prerender step, so the static HTML each route serves has correct meta.
- **At runtime** by `DocumentHead` in [`src/app/router.tsx`](src/app/router.tsx), which updates `<head>` on client-side navigation.

Case-study meta is derived automatically from [`src/data/projects.ts`](src/data/projects.ts).

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs `npm run build` and publishes `dist/` to GitHub Pages. **Build output is not committed** — CI regenerates it on every push.
