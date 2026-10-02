import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

process.env.KEYSTATIC_ENABLED = 'true';

const astroCli = resolve('node_modules/astro/bin/astro.mjs');
process.argv = [process.execPath, astroCli, 'dev', ...process.argv.slice(2)];
await import(pathToFileURL(astroCli).href);
