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

## Homepage directions (2026-09-19, third pass: the hero and the contrast)

Owner's brief: a more catching hero, more contrast on the page, and visuals that show the process and the work. Same rule as the second pass: no new copy. The headline in Ink is the live hero line; the headline in Billboard is principle 02's thesis from `src/data/philosophy.ts`, and either line drops into either layout. The process strip in Ink quotes principles 01, 02, 03 and 07; the governance chain in Billboard is the live `GovernanceChain` figure. Outcome figures, study cards and the leadership cards are verbatim from `figures.ts`, `projects.ts` and `HowILead`.

Contrast comes from the grounds, not from new colours: the hero and contact bands are ink (`--tertiary-900`), the outcomes and studies are pure white, the warm ground stays between. On ink the accent is rose (`--accent-tint-light`), because solid maroon reads at 1.1:1 against it; every text pairing clears WCAG AA (champagne on ink 8.7:1, rose on ink 7.3:1, ink on white 11.5:1, maroon on white 8.6:1, white on maroon 10.4:1). Body copy is set in `--foreground`, not `--muted-foreground`.

| Template | Layout |
|---|---|
| `home-4-ink.src.html` | **Ink.** Header and hero on ink; the live headline at display size with the last word in rose; the three study covers fanned as numbered plates on the right; the meta line as a facts row. Outcomes as four figures on white between 3px ink rules. A five-step process rail quoting the philosophy. Case studies as full rows on white, cover seven columns, alternating sides. Leadership as three columns on the warm ground. Contact on ink. |
| `home-5-billboard.src.html` | **Billboard.** White hero, principle 02's thesis across all twelve columns in Archivo's condensed width with the second sentence in maroon; the deck left and a facts list right. Then the Finance Cloud cover full-width at 21:9 with the governance chain drawn along its foot. Outcomes on solid maroon. Case studies as three cover cards with ink caption plates. Leadership as a numbered ledger on white. Contact on ink. |

### Hero variants of Ink (2026-09-18)

Owner's note on Ink: the visual was out of proportion to the rest of the hero. In the first drawing the headline ran to 108px across seven columns while each cover was about 390px wide, and the covers' own ground (`#1d2d2b`) sat on the lighter hero ink (`#283d3b`), so every plate read as a small screen inside a dark box. All three variants move the hero and header to `#1d2d2b`, the covers' ground, so the screen sits on the hero itself; white on it is 14.4:1, champagne 10.9:1, rose 9.0:1. Copy is unchanged from Ink; everything below the hero is Ink as drawn.

| Template | Hero |
|---|---|
| `home-4-ink-hero-a.src.html` | **Lead plate.** Implemented on the site, 2026-09-18 (`src/components/home/Hero.tsx`, `src/styles/home.css`, copy in `src/data/home.ts`), with the live hero's own copy in place of the rendering's re-punctuated deck and three-fact meta list; the header takes the hero's ground on `/` only. Five columns of text, seven of artefact. Headline at 68px. One cover, Finance Cloud, large enough to read and run off the right edge of the window; its governance rail becomes the hero's baseline. |
| `home-4-ink-hero-b.src.html` | **Three across.** Headline the width of the page at 88px, deck and buttons on one row, then all three covers as a twelve-column row of numbered plates, each cropped in to its screen. A swipe row on phones. |
| `home-4-ink-hero-c.src.html` | **Fan, rebalanced.** The original fan at six columns each side: headline down to 78px, plates up to 80% of six columns plus the page margin and cropped to the screen, so the front plate is about half as wide again. |

## Philosophy directions (2026-09-19)

Two layouts of `src/data/philosophy.ts` as it stands: the thesis, the bridge, the eight principles with their thesis lines and the three coded figures, and the six evaluation checks. No sentence is new.

| Template | Layout |
|---|---|
| `philosophy-1-rail.src.html` | **Rail.** Implemented on the site, 2026-09-18 (`src/pages/PhilosophyPage.tsx`, `src/styles/philosophy.css`). Opener on ink with the thesis in Newsreader at 44px. Below, a sticky index of the eight principles in the left three columns and the principles down the right eight: ordinal in maroon, thesis in Newsreader, body in ink. The status flow and the threshold zones as champagne plates with a maroon edge. The checks close on ink as a three-by-two grid. |
| `philosophy-2-spreads.src.html` | **Spreads.** White opener, title left and thesis right, then a jump strip on ink. Each principle a full-width spread alternating white and the warm ground under a 3px ink rule: the ordinal at poster size in rose, title and thesis (maroon Newsreader) in the left five columns, body with a drop cap in the right six, the figure spanning below. The checks as a numbered table on champagne. |

Build with `node renderings/build.mjs home-1-stacked home-2-split home-3-band` (or `home-4-ink home-4-ink-hero-a home-4-ink-hero-b home-4-ink-hero-c home-5-billboard philosophy-1-rail philosophy-2-spreads`). `{{img:<study>/<name>}}` resolves against any study folder; the study covers are drawn SVGs since 2026-09-19 (`scripts/visuals/`), so the homepage templates inline them with `{{svg:<study>/cover}}`. `_phone.html` is a gitignored harness that shows all three at 390px.

Build either case-study template with `node renderings/build.mjs k-broadsheet` (or `j-plates`); the output `renderings/<name>.html` is gitignored because it embeds the screenshots. The three billing screenshots these two embed (`billing-report`, `package-index`, `review-flow-01`) stay in the repo for that reason only; the site itself stopped using screenshots on 2026-09-19. The content in both is the billing study as of commit `d7b35ca`; the live copy in `src/data/caseStudies.ts` may have moved on since.

The research and the full specification for both directions are in the local working notes, `docs/case-study/2026-09-10-editorial-layout-research.md`.
