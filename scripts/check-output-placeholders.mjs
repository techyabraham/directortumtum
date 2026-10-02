import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

if (process.env.PUBLIC_PREVIEW === 'true') {
  console.log('Preview build: draft placeholders may be included and require ?preview=1 to display.');
  process.exit(0);
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (['.html', '.js', '.txt', '.xml', '.webmanifest'].includes(extname(path))) files.push(path);
  }
  return files;
}

const leaked = [];
for (const path of await walk('dist')) {
  const source = await readFile(path, 'utf8');
  if (/DRAFT PLACEHOLDER|TODO|lorem/i.test(source)) leaked.push(path);
}

if (leaked.length) {
  console.error(`Draft/placeholder content leaked into production output: ${leaked.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('Production output check passed: no draft placeholders, TODOs, or lorem text.');
}
