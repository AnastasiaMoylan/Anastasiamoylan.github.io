/**
 * Prepares a diagram-design SVG export for inlining in the page (2026-09-10).
 *
 * The drawn diagrams under `src/assets/case-studies/` ship as `.svg` and are
 * imported twice: `?raw` for the markup this function cleans, and plain for
 * the file URL the lightbox and `alt` fallbacks use. They used to ship as
 * 2400px PNG rasters; the SVG is a tenth of the size and stays crisp.
 *
 * Inlined rather than loaded through `<img>` for one reason: an SVG in an
 * `<img>` cannot fetch the fonts it names, so its text metrics collapse to
 * system fallbacks and the carefully sized labels overflow. Inline, the text
 * is set in the site's own faces, so the figure reads as part of the page.
 *
 * Three edits, all textual:
 *   - the XML prolog goes, since the markup lands inside an HTML document;
 *   - the `<defs><style>@import …</style></defs>` that pulls Geist Mono and
 *     Instrument Serif from Google Fonts goes, so a case-study page makes no
 *     request the rest of the site does not;
 *   - the export's families map to the site's: Geist Mono to IBM Plex Mono,
 *     Inter to Inter, and the Instrument Serif italic callout to Inter italic,
 *     which sets a little wider. Colors need no translation: the profile the
 *     diagrams were drawn with is `theme.css`.
 *
 * The `<title>`, `<desc>`, `role="img"` and `aria-labelledby` the export
 * carries are kept, so the inline figure is described to assistive technology
 * by the diagram itself.
 */
export function diagramSvg(raw: string): string {
  return raw
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .replace(/<defs>\s*<style>[\s\S]*?<\/style>\s*<\/defs>/, "")
    .replace(/'Geist Mono', monospace/g, "'IBM Plex Mono', ui-monospace, monospace")
    .replace(/'Inter', sans-serif/g, "'Inter', system-ui, sans-serif")
    .replace(/'Instrument Serif', serif/g, "'Inter', system-ui, sans-serif")
    // Inter italic sets about a sixth wider than Instrument Serif, so a
    // callout kept at the export's size runs under the leader line drawn to
    // its end. One step down restores the measure the diagram was drawn to.
    // Smaller step first, or a 16 would fall through both rules to 12.
    .replace(/font-size="14" font-style="italic"/g, 'font-size="12" font-style="italic"')
    .replace(/font-size="16" font-style="italic"/g, 'font-size="14" font-style="italic"')
    .trim();
}
