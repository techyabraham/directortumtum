# Launch checklist

- [ ] Replace `hello@example.com` in `src/data/site.ts` with the approved email.
- [ ] Set `PUBLIC_SITE_URL` to the production canonical origin.
- [ ] Set `PUBLIC_IS_PRODUCTION=true` only on the production deployment; preview/staging builds must leave it unset and use `PUBLIC_PREVIEW=true` only for review previews.
- [ ] Confirm the default OG graphic and replace if a brand-approved sharing graphic is supplied.
- [ ] Replace JPEG logo variants with a tight-cropped transparent SVG asset while preserving the supplied mark, and confirm wordmark spelling.
- [ ] Replace the current JPEG favicon with an approved SVG mark if a source SVG is supplied; no vector logo file is currently present.
- [x] Sample the exact purple from supplied logo assets (`#4D0A7D`).
- [ ] Add approved biography, service copy, films, workshop details, and portrait as available.
- [ ] Provide captions or a transcript link for every published film.
- [ ] Review the privacy page with qualified counsel before launch.
- [ ] Replace the draft project at `src/content/projects/draft-project.md` with approved film details, synopsis, poster and captions/transcript.
- [ ] Replace the draft workshop at `src/content/workshops/draft-workshop.md` with approved schedule, price, duration, location, status and enquiry message, or remove it if no workshop is approved.
- [ ] Replace/remove `src/content/testimonials/draft-testimonial.md`; obtain and record consent before publishing a real testimonial.
- [ ] Replace/remove `src/content/credentials/draft-credential.md` using only approved credentials.
- [ ] Replace draft service copy in `src/data/services.ts` with approved service descriptions.
- [ ] Run `npm run check:placeholders` and `npm run build` before launch.
- [ ] Run axe checks and Lighthouse on home, work, a project page, services, training and contact; record measured results in `docs/ACCESSIBILITY_REPORT.md` and `docs/PERFORMANCE_REPORT.md`.
- [ ] Run keyboard-only checks, screen reader spot-checks, and the listed real-device checks before launch.
