# Assumptions

- Approved project copy and project assets were not present at scaffold time. The client later identified `logo/logo1.jpeg` and `logo/logo2.jpeg` as the supplied logo variants.
- The client must confirm the site spelling “Director TumTum”; the supplied logo lettering is described as “Director Tum Tum”.
- Email uses the required `hello@example.com` placeholder pending confirmation.
- The site URL defaults to `https://example.com` until the production domain is supplied.
- The sampled purple from both JPEG logo backgrounds/marks is `#4D0A7D` (RGB 77, 10, 125). These are JPEGs with substantial white/purple padding; they are used as-is. A tight-cropped transparent SVG is required before launch to avoid the padding in layout.
- Privacy copy will need legal review; no legal compliance claim is made.
- Analytics is disabled by default (`brand.analyticsEnabled = false`). No analytics script is loaded.
- Cloudflare Web Analytics can be enabled only with `brand.analyticsEnabled = true` and `PUBLIC_CF_WEB_ANALYTICS_TOKEN`; no token is currently supplied.
