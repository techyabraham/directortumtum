# Accessibility report

## Checks completed

- `npm run check` passed on 2026-10-01. Astro reported 0 errors, warnings, or hints across 57 files; ESLint, placeholder checks, and the project's contrast checker also passed.
- `npm run check:contrast` checked 17 implemented color pairs. The lowest text pair was the status boundary at 4.66:1; all listed pairs passed the project's thresholds. See [CONTRAST.md](./CONTRAST.md) for the pair-by-pair results.
- The mobile navigation was manually opened in a browser at 375 × 667. It exposes the expanded state, moves focus into the open menu, locks background scrolling, closes with Escape, restores focus to the trigger, and restores scrolling.

## Automated browser audit status

`npm run test:e2e` is configured to run 46 Playwright checks including axe-core scans of the required routes. It could not execute because the Playwright Chromium headless-shell binary is not installed at the configured local browser path. As a result, no axe-core findings are claimed as measured. Install the configured browser with `npx playwright install chromium` in an environment where browser downloads are allowed, then run `npm run test:e2e`.

## Remaining manual checks

- Test navigation and the enquiry form with a screen reader (NVDA with Firefox or VoiceOver with Safari).
- Confirm the final supplied logo asset has meaningful alternative text in its actual placement; current JPEGs contain large margins and should be replaced by a tight-cropped approved asset when available.
- Repeat keyboard and screen-reader checks against approved published projects, services, testimonials, workshop details, and video embeds after those entries replace drafts.

This report records implementation checks, not a formal WCAG conformance certification.
