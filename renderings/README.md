# Case-study layout renderings

Standalone HTML renderings of the billing case study, kept as design references. They are not part of the site build.

| Template | Direction | Status |
|---|---|---|
| `j-plates.src.html` | **Plates.** Every artefact a numbered full-bleed plate on a ground assigned by kind (screens on ink, diagrams on champagne, tables on white); the argument is a 60ch column on the warm ground between plates. | Implemented on the site, 2026-09-11 (`src/components/case-study/`, `src/styles/case-study.css`). This file is the reference it was built from. |
| `k-broadsheet.src.html` | **Broadsheet.** One ground, an eight-column hairline grid with a numeral margin, Archivo's width axis as the voice, numbered cuts mirrored block to block, a list of figures as the navigation. | The backup direction. Not implemented. |

## Homepage directions (2026-09-15, second pass)

Three layouts of the same four sections, in the order the owner set: who, outcomes, case studies, contact. No line of copy is new: the name, role, intro paragraphs and location come from `src/data/about.ts` and the résumé, the outcome figures and labels from `src/data/figures.ts` and the live `OutcomeNumbers`, the study titles, taglines, roles and statuses from `src/data/projects.ts`, and the contact copy from the contact page and footer. The first pass (three authored-headline directions) was rejected as reading AI-generated and was deleted; its research, plan and critique remain in `docs/homepage/` for reference.

| Template | Layout |
|---|---|
| `home-1-stacked.src.html` | One column. Name as the headline, role, both intro paragraphs, two buttons; outcomes as a three-by-two grid on white; case studies as rows with the cover left; contact as the dark band with a definition list. |
| `home-2-split.src.html` | Name and intro on the left, the six outcomes as a ledger on the right so the claims sit in the first screen; case studies three across with covers; contact on the warm ground. |
| `home-3-band.src.html` | Name at display size; outcomes as one band with the hackathon figure carrying the weight; case studies as a numbered list with covers right; contact as the email address set large on the dark band. |

Build with `node renderings/build.mjs home-1-stacked home-2-split home-3-band`. `{{img:<study>/<name>}}` resolves against any study folder. `_phone.html` is a gitignored harness that shows all three at 390px.

Build either case-study template with `node renderings/build.mjs k-broadsheet` (or `j-plates`); the output `renderings/<name>.html` is gitignored because it embeds the screenshots. The content in both is the billing study as of commit `d7b35ca`; the live copy in `src/data/caseStudies.ts` may have moved on since.

The research and the full specification for both directions are in the local working notes, `docs/case-study/2026-09-10-editorial-layout-research.md`.
