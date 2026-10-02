import sharp from 'sharp';
import { extname, join, parse } from 'node:path';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/compress-image.mjs path/to/source-image');
  process.exit(1);
}

const { dir, name } = parse(input);
const outputDirectory = dir || '.';
const metadata = await sharp(input).metadata();
const resize = metadata.width > 2400 ? { width: 2400, withoutEnlargement: true } : undefined;
const avifPath = join(outputDirectory, `${name}-optimized.avif`);
const webpPath = join(outputDirectory, `${name}-optimized.webp`);

let avif = sharp(input);
let webp = sharp(input);
if (resize) { avif = avif.resize(resize); webp = webp.resize(resize); }
await Promise.all([
  avif.avif({ quality: 55, effort: 5 }).toFile(avifPath),
  webp.webp({ quality: 78, effort: 5 }).toFile(webpPath),
]);
console.log(`Created ${avifPath} and ${webpPath} from ${extname(input) || 'image'} source (${metadata.width}×${metadata.height}).`);
