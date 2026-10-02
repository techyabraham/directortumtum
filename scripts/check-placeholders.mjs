import { readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import ts from 'typescript';

const markers = /PLACEHOLDER|TODO|example\.com|lorem/i;
const failures = [];
const slugsByCollection = new Map();

async function walk(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await walk(path));
    else results.push(path);
  }
  return results;
}

for (const path of await walk('src/content')) {
  if (!['.md', '.mdx'].includes(extname(path))) continue;
  const source = await readFile(path, 'utf8');
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  const metadata = frontmatter?.[1] ?? '';
  const draft = metadata.match(/^draft:\s*(true|false)\s*$/m)?.[1] ?? 'true';
  const slug = metadata.match(/^slug:\s*["']?([^\s"']+)["']?\s*$/m)?.[1];
  const collection = path.split(/[\\/]/)[2];
  if (slug) {
    const seen = slugsByCollection.get(collection) ?? new Set();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) failures.push(`${path} (slug must be kebab-case)`);
    if (seen.has(slug)) failures.push(`${path} (duplicate slug: ${slug})`);
    seen.add(slug);
    slugsByCollection.set(collection, seen);
  }
  if (draft === 'false' && markers.test(source)) failures.push(path);
}

const servicesPath = 'src/data/services.ts';
const servicesSource = await readFile(servicesPath, 'utf8');
const servicesFile = ts.createSourceFile(servicesPath, servicesSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
function inspect(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const draftProperty = node.properties.find((property) =>
      ts.isPropertyAssignment(property) && property.name.getText(servicesFile).replaceAll(/["']/g, '') === 'draft'
    );
    if (draftProperty && ts.isPropertyAssignment(draftProperty) && draftProperty.initializer.kind === ts.SyntaxKind.FalseKeyword && markers.test(node.getText(servicesFile))) {
      failures.push(servicesPath);
    }
  }
  ts.forEachChild(node, inspect);
}
inspect(servicesFile);

if (failures.length) {
  console.error(`Production entries contain placeholder content: ${[...new Set(failures)].join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('Placeholder check passed: no placeholder markers in published content.');
}
