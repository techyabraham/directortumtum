import { config, collection, fields } from '@keystatic/core';

const content = () => fields.markdoc({
  label: 'Synopsis / description',
  extension: 'md',
});

const projectCategories = [
  { label: 'Mobile videography', value: 'mobile-videography' },
  { label: 'Documentary', value: 'documentary' },
  { label: 'Short film', value: 'short-film' },
  { label: 'Brand story', value: 'brand-story' },
  { label: 'Events and weddings', value: 'events-weddings' },
  { label: 'Social media', value: 'social-media' },
];

const optionalText = (label: string) => fields.text({ label, description: 'Leave blank when not applicable.' });

export default config({
  storage: { kind: 'local' },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'slug',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Project title' }),
        slug: fields.slug({ name: { label: 'URL slug' } }),
        categories: fields.multiselect({ label: 'Categories', options: projectCategories }),
        year: fields.integer({ label: 'Year' }),
        summary: fields.text({ label: 'Card summary', multiline: true, description: 'Keep this under 240 characters.' }),
        poster: fields.image({
          label: 'Poster image',
          directory: 'src/assets/projects',
          publicPath: '../../../assets/projects/',
        }),
        posterAlt: fields.text({ label: 'Poster alternative text' }),
        posterAspect: fields.select({
          label: 'Poster aspect ratio',
          options: [
            { label: '16:9 landscape', value: '16:9' },
            { label: '4:5 portrait', value: '4:5' },
            { label: '1:1 square', value: '1:1' },
          ],
          defaultValue: '16:9',
        }),
        video: fields.object({
          provider: fields.select({ label: 'Video provider', options: [
            { label: 'No video yet', value: 'none' },
            { label: 'Vimeo', value: 'vimeo' },
            { label: 'YouTube', value: 'youtube' },
          ], defaultValue: 'none' }),
          id: optionalText('Vimeo or YouTube video ID'),
          privacyMode: fields.checkbox({ label: 'Use privacy enhanced embed', defaultValue: true }),
          captionsUrl: optionalText('Captions or transcript URL'),
        }, { label: 'Video' }),
        role: fields.array(fields.text({ label: 'Role' }), { label: 'Roles' }),
        location: optionalText('Location'),
        client: optionalText('Client'),
        credits: fields.array(fields.object({
          role: fields.text({ label: 'Credit role' }),
          name: fields.text({ label: 'Person or organisation' }),
        }, { label: 'Credit' }), { label: 'Credits' }),
        featured: fields.checkbox({ label: 'Feature on homepage', defaultValue: false }),
        order: fields.integer({ label: 'Display order', defaultValue: 100 }),
        draft: fields.checkbox({ label: 'Keep as draft', defaultValue: true, description: 'Uncheck only after all content is approved and complete.' }),
        content: content(),
      },
    }),
    workshops: collection({
      label: 'Workshops',
      slugField: 'slug',
      path: 'src/content/workshops/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Workshop title' }),
        slug: fields.slug({ name: { label: 'URL slug' } }),
        description: fields.text({ label: 'Short description', multiline: true }),
        format: fields.select({ label: 'Format', options: [
          { label: 'One to one', value: 'one-to-one' }, { label: 'Group', value: 'group' },
          { label: 'Online', value: 'online' }, { label: 'In person', value: 'in-person' },
          { label: 'Hybrid', value: 'hybrid' },
        ], defaultValue: 'group' }),
        priceNGN: fields.text({ label: 'Price in NGN or “contact”', description: 'Enter a number (for example 25000) or contact.' }),
        duration: fields.text({ label: 'Duration' }),
        startDate: fields.date({ label: 'Start date' }),
        endDate: fields.date({ label: 'End date' }),
        location: fields.text({ label: 'Location or platform' }),
        capacity: fields.integer({ label: 'Capacity' }),
        status: fields.select({ label: 'Status', options: [
          { label: 'Open', value: 'open' }, { label: 'Waitlist', value: 'waitlist' },
          { label: 'Full', value: 'full' }, { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ], defaultValue: 'open' }),
        enquiryMessage: fields.text({ label: 'WhatsApp enquiry message', multiline: true }),
        registrationUrl: optionalText('Registration URL'),
        draft: fields.checkbox({ label: 'Keep as draft', defaultValue: true }),
        content: content(),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'slug',
      path: 'src/content/testimonials/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.text({ label: 'Person name' }),
        slug: fields.slug({ name: { label: 'URL slug' } }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        roleOrganisation: fields.text({ label: 'Role and organisation' }),
        projectSlug: optionalText('Related project slug'),
        consentConfirmed: fields.checkbox({ label: 'Written permission to publish confirmed', defaultValue: false }),
        draft: fields.checkbox({ label: 'Keep as draft', defaultValue: true, description: 'A published testimonial must have confirmed permission.' }),
        content: content(),
      },
    }),
    credentials: collection({
      label: 'Credentials',
      slugField: 'slug',
      path: 'src/content/credentials/*',
      format: { contentField: 'content' },
      schema: {
        type: fields.select({ label: 'Type', options: [
          { label: 'Award', value: 'award' }, { label: 'Press', value: 'press' },
          { label: 'Collaboration', value: 'collaboration' }, { label: 'Certification', value: 'certification' },
        ], defaultValue: 'award' }),
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ name: { label: 'URL slug' } }),
        issuer: fields.text({ label: 'Issuer' }),
        year: fields.integer({ label: 'Year' }),
        url: optionalText('Reference URL'),
        draft: fields.checkbox({ label: 'Keep as draft', defaultValue: true, description: 'Publish only after independently verifying details and year.' }),
        content: content(),
      },
    }),
  },
});
