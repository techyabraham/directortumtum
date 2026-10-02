import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('dist/404', { recursive: true });
await copyFile('dist/404.html', 'dist/404/index.html');
console.log('Created the requested /404/ static route alias.');
