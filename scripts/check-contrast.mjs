import { readFile } from 'node:fs/promises';

const tokens = await readFile('src/styles/tokens.css', 'utf8');
const token = (name) => {
  const value = tokens.match(new RegExp(`${name}:\\s*([^;]+)`))?.[1]?.trim();
  if (!value) return undefined;
  if (value.startsWith('#')) return value;
  const referenced = value.match(/^var\((--[\w-]+)\)$/)?.[1];
  return referenced ? token(referenced) : undefined;
};
const pairs = [
  ['Body text on warm off-white', token('--ink'), token('--bg'), 4.5],
  ['Body text on white cards', token('--ink'), token('--surface'), 4.5],
  ['Muted text on warm off-white', token('--ink-muted'), token('--bg'), 4.5],
  ['Muted text on white cards', token('--ink-muted'), token('--surface'), 4.5],
  ['Brand text on warm off-white', token('--brand'), token('--bg'), 4.5],
  ['Brand text on white cards', token('--brand'), token('--surface'), 4.5],
  ['White button text on brand', token('--on-brand'), token('--brand'), 4.5],
  ['White text on brand hover', token('--on-brand'), token('--purple-700'), 4.5],
  ['White hero text on deep purple', '#F0EAF5', token('--purple-900'), 4.5],
  ['Eyebrow text on deep purple', '#F0DFFA', token('--purple-900'), 4.5],
  ['Status boundary on warm off-white', token('--border'), token('--bg'), 3],
  ['Status boundary on white cards', token('--border'), token('--surface'), 3],
  ['Focus outline on light surfaces', token('--focus'), token('--bg'), 3],
  ['Focus outline on deep purple', token('--focus-on-dark'), token('--purple-900'), 3],
  ['Selection text on amber highlight', token('--purple-900'), token('--accent'), 4.5],
  ['Error text on white', '#8B1E2D', token('--surface'), 4.5],
  ['Draft label on neutral poster', token('--ink-muted'), '#D5D2D8', 4.5],
];

function luminance(hex) {
  const [r, g, b] = hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16) / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

let failures = 0;
for (const [label, foreground, background, minimum] of pairs) {
  if (!foreground || !background) { console.error(`Missing color token in ${label}.`); failures++; continue; }
  const [a, b] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
  const ratio = (a + 0.05) / (b + 0.05);
  console.log(`${label}: ${ratio.toFixed(2)}:1 ${ratio >= minimum ? 'PASS' : 'FAIL'}`);
  if (ratio < minimum) failures++;
}
if (failures) process.exitCode = 1;
