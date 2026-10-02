# Browser verification

The browser checks for Phase 7 should run against `npm run preview` at `http://127.0.0.1:4321/`.

- Visit `/`, `/work/`, `/services/`, `/training/`, `/about/`, `/contact/`, `/privacy/`, and `/404/`; confirm each has one `<h1>` and no horizontal overflow at 375px and 1280px.
- Open the mobile navigation at 375px, verify focus enters the dialog, tab stays in it, Escape closes it, focus returns to the menu button, `aria-expanded` resets, and page scrolling unlocks.
- When approved projects exist, exercise category chips and `?category=documentary`; verify cards and URL update.
- When an approved video ID exists, activate its poster, verify iframe appears only after activation, then close with Escape and confirm focus returns to the poster.
- Submit invalid enquiry fields and verify inline errors and focus on the error summary. For valid-field URL checks, inspect generated WhatsApp/mailto URLs without navigating away or submitting externally.
- On a preview build (`PUBLIC_PREVIEW=true`), draft cards should appear only with `?preview=1`; production builds must contain no draft copy.
- Run axe-core and Lighthouse after the repository can install those tools; record measured results in the matching report files.
