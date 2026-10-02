import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase kebab-case slug.');

const videoSchema = z.preprocess((value) => {
  if (!value || typeof value !== 'object') return value;
  const video = value as Record<string, unknown>;
  return {
    ...video,
    ...(video.id === '' ? { id: undefined } : {}),
    ...(video.captionsUrl === '' ? { captionsUrl: undefined } : {}),
  };
}, z.discriminatedUnion('provider', [
  z.object({ provider: z.literal('vimeo'), id: z.string().min(1), privacyMode: z.literal(true), captionsUrl: z.url().optional() }),
  z.object({ provider: z.literal('youtube'), id: z.string().min(1), privacyMode: z.literal(true), captionsUrl: z.url().optional() }),
  z.object({ provider: z.literal('none'), id: z.never().optional(), privacyMode: z.literal(true), captionsUrl: z.url().optional() }),
]));

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./projects', import.meta.url) }),
  schema: ({ image }) => z.object({
    title: z.string().min(1), slug: slugSchema,
    categories: z.array(z.enum(['mobile-videography', 'documentary', 'short-film', 'brand-story', 'events-weddings', 'social-media'])).min(1),
    year: z.number().int().optional(), summary: z.string().max(240),
    poster: image(), posterAlt: z.string().min(1), posterAspect: z.enum(['16:9', '4:5', '1:1']).default('16:9'),
    video: videoSchema, role: z.array(z.string()).optional(), location: z.string().optional(), client: z.string().optional(),
    credits: z.array(z.object({ role: z.string(), name: z.string() })).optional(),
    featured: z.boolean().default(false), order: z.number().default(100), draft: z.boolean().default(true),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./workshops', import.meta.url) }),
  schema: z.object({
    title: z.string().min(1), slug: slugSchema, description: z.string().min(1),
    format: z.enum(['one-to-one', 'group', 'online', 'in-person', 'hybrid']),
    priceNGN: z.preprocess((value) => typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value) ? Number(value) : value,
      z.union([z.number().nonnegative(), z.literal('contact')])), duration: z.string().min(1),
    startDate: z.iso.date().optional(), endDate: z.iso.date().optional(), location: z.string().min(1),
    capacity: z.number().int().positive().optional(), status: z.enum(['open', 'waitlist', 'full', 'completed', 'cancelled']),
    enquiryMessage: z.string().min(1), registrationUrl: z.url().optional(), draft: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./testimonials', import.meta.url) }),
  schema: z.object({ quote: z.string().min(1), name: z.string().min(1), roleOrganisation: z.string().min(1), projectSlug: slugSchema.optional(), consentConfirmed: z.boolean().default(false), draft: z.boolean().default(true) })
    .superRefine((entry, context) => {
      if (!entry.draft && !entry.consentConfirmed) context.addIssue({ code: 'custom', path: ['consentConfirmed'], message: 'Published testimonials require confirmed consent.' });
    }),
});

const credentials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: new URL('./credentials', import.meta.url) }),
  schema: z.object({ type: z.enum(['award', 'press', 'collaboration', 'certification']), title: z.string().min(1), issuer: z.string().min(1), year: z.number().int().optional(), url: z.url().optional(), draft: z.boolean().default(true) })
    .superRefine((entry, context) => {
      if (!entry.draft && entry.year === undefined) context.addIssue({ code: 'custom', path: ['year'], message: 'Published credentials require a confirmed year.' });
    }),
});

export const collections = { projects, workshops, testimonials, credentials };
