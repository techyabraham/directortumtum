import type { APIRoute } from 'astro';
import { brand } from '../data/site';

const manifest = {
  name: brand.name,
  short_name: brand.name,
  start_url: '/',
  display: 'standalone',
  background_color: '#FAF8FC',
  theme_color: '#4D0A7D',
  icons: [{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
};

export const GET: APIRoute = () => new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
