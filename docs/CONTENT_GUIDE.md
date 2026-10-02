# Content guide

## Drafts and published content

Projects, workshops, testimonials, and credentials use Zod schemas in `src/content/config.ts` and are registered with Astro in `src/content.config.ts`. Each entry defaults to `draft: true`. Draft data should be filtered with `filterDraftEntries` from `src/utils/drafts.ts`; it is visible in development, or on a preview deployment only when `PUBLIC_PREVIEW=true` and the URL includes `?preview=1`.

Only switch `draft` to `false` after replacing all placeholders with approved content. `npm run check:placeholders` blocks a production build if a published Markdown entry or service object still contains `PLACEHOLDER`, `TODO`, `example.com`, or `lorem`.

For large approved source images, run `node scripts/compress-image.mjs path/to/source.jpg`. Place source images in `src/assets/`, keep hero originals at least 2400px wide and poster originals at least 1600px wide, and use the generated WebP/AVIF files only when a downstream service requires a separate upload. Astro generates responsive image outputs from local assets.

## Add a project

Create a Markdown file in `src/content/projects/`, with unique kebab-case `slug`, one or more approved categories, summary, poster path and meaningful `posterAlt`, video provider and id (or `provider: none`), and synopsis as the Markdown body. Use an approved local poster in `src/assets/`; draft poster assets must be plain neutral grey with only an aspect ratio. Set `draft: false` only for approved work. Every published film needs captions or a transcript link.

## Add a workshop

Create a Markdown file in `src/content/workshops/` and provide the format, price or `contact`, duration, date(s) when confirmed, location/platform, status, and an approved WhatsApp enquiry message. Set `draft: false` only when the details are approved.

## Add a testimonial or credential

Create a Markdown entry in the matching collection folder. Publish a testimonial only after setting `consentConfirmed: true` and `draft: false`. Credentials must be verified and approved before publication. Otherwise keep the entry in draft or remove it.
