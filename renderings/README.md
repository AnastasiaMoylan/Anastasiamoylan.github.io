# Case-study layout renderings

Standalone HTML renderings of the billing case study, kept as design references. They are not part of the site build.

| Template | Direction | Status |
|---|---|---|
| `j-plates.src.html` | **Plates.** Every artefact a numbered full-bleed plate on a ground assigned by kind (screens on ink, diagrams on champagne, tables on white); the argument is a 60ch column on the warm ground between plates. | Implemented on the site, 2026-09-11 (`src/components/case-study/`, `src/styles/case-study.css`). This file is the reference it was built from. |
| `k-broadsheet.src.html` | **Broadsheet.** One ground, an eight-column hairline grid with a numeral margin, Archivo's width axis as the voice, numbered cuts mirrored block to block, a list of figures as the navigation. | The backup direction. Not implemented. |

Build either with `node renderings/build.mjs k-broadsheet` (or `j-plates`); the output `renderings/<name>.html` is gitignored because it embeds the screenshots. The content in both is the billing study as of commit `d7b35ca`; the live copy in `src/data/caseStudies.ts` may have moved on since.

The research and the full specification for both directions are in the local working notes, `docs/case-study/2026-09-10-editorial-layout-research.md`.
