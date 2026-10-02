import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

const integrations = [sitemap()];
if (process.env.KEYSTATIC_ENABLED === 'true') integrations.push(react(), markdoc(), keystatic());

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example.com',
  // Keystatic's dev API uses slashless endpoints; keep the public site routes canonical.
  trailingSlash: process.env.KEYSTATIC_ENABLED === 'true' ? 'ignore' : 'always',
  integrations,
});
