import type { APIRoute } from 'astro';

const isPublicProduction = import.meta.env.PROD && import.meta.env.PUBLIC_IS_PRODUCTION === 'true' && import.meta.env.PUBLIC_PREVIEW !== 'true';

export const GET: APIRoute = () => new Response(
  isPublicProduction ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
