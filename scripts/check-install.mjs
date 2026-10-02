import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const requiredEntrypoints = [
  'astro',
  '@astrojs/sitemap',
  'mdast-util-to-markdown',
];
const missing = [];

for (const entrypoint of requiredEntrypoints) {
  try {
    require.resolve(entrypoint);
  } catch {
    missing.push(entrypoint);
  }
}

if (missing.length > 0) {
  console.error(`Dependency installation is incomplete. Missing or broken package entrypoints: ${missing.join(', ')}.`);
  console.error('Restore dependencies with `npm_config_offline=false npm ci`, then run `npm run build` again.');
  process.exitCode = 1;
} else {
  console.log('Dependency integrity check passed.');
}
