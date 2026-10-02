# Local content editor

The project uses [Keystatic](https://keystatic.com/docs/introduction) in local storage mode. The editor manages project, workshop, testimonial, and credential entries in the existing `src/content/` collections; uploaded project posters go into `src/assets/projects/` for Astro image processing.

## Open the editor

1. Run `npm install` after pulling the project if dependencies are not installed.
2. Run `npm run dev` from the project folder. This starts Astro with Keystatic enabled locally.
3. Open `http://localhost:4321/keystatic`.
4. Save content in the editor. Keystatic writes the Markdown and image files into the project; review and commit those files with Git.
5. Run `npm run build` to generate the updated static site.

Keystatic is enabled only for the local Astro development server. The public production build remains static and does not include the editor route, authentication endpoints, or a CMS backend. Local editing needs the Astro dev server running, but no account or external service. Hosted editing would require a separate GitHub storage/authentication setup and a host that supports the required server-side routes.

## Publishing safeguards

- New projects, workshops, testimonials, and credentials start as drafts. Leave the draft box checked until details and media are approved.
- For testimonials, confirm written consent before unchecking draft. The Astro schema rejects a published testimonial without `consentConfirmed`.
- Verify credential details and year before publication; the Astro schema requires a year for published credentials.
- Use `provider: none` until an approved video and captions/transcript are ready. Never invent a video ID.
- For workshop pricing enter a numeric NGN amount or `contact`.
- Review content and run `npm run check` and `npm run build` before publishing. Production placeholder checks still apply.

Existing entries created by the content guide remain in place. New CMS entries use Keystatic's Markdown frontmatter format under a collection subdirectory, which Astro's recursive Markdown loader reads.
