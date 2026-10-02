# Performance report

## Build and asset measurements

Measured from the static production output generated on 2026-10-01. Gzip sizes below use Node's built-in zlib at level 9; transfer sizes will vary with the deployment server's compression settings.

| Asset | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Home HTML (`dist/index.html`) | 12,409 | 3,447 |
| Shared stylesheet (`dist/_astro/about.C1v8Q1eB.css`) | 7,858 | 2,108 |

The build generated static pages and a local poster. The homepage does not load a video iframe by default. Video embeds are activated on user action. Fonts are self-hosted WOFF2 files.

## Checks and limits

- `npm run build` passed, including prebuild dependency/placeholder/contrast checks and postbuild output placeholder validation.
- Lighthouse scores, Core Web Vitals, and real-device network measurements were not captured in this environment. Playwright could not launch because its Chromium headless-shell executable is not installed. No performance score is inferred from bundle size alone.
- Re-run Lighthouse against the deployed preview after the final approved image assets and content are supplied. Confirm cache and compression behavior on the selected host; `_headers` currently provides the Cloudflare Pages header configuration.
