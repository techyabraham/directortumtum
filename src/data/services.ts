export type ServiceItem = { title: string; description: string; draft: boolean };
export type ServiceGroup = { title: string; items: ServiceItem[]; draft: boolean };

const placeholder = {
  title: 'DRAFT PLACEHOLDER: approved service copy needed',
  description: 'DRAFT PLACEHOLDER: replace with approved service details before launch.',
  draft: true,
} satisfies ServiceItem;

export const services: ServiceGroup[] = [
  { title: 'Filmmaking', items: [{ ...placeholder }], draft: true },
  { title: 'Production', items: [{ ...placeholder }], draft: true },
  { title: 'Post-production', items: [{ ...placeholder }], draft: true },
  { title: 'Education', items: [{ ...placeholder }], draft: true },
];
