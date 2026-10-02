import { splitWorkshopEntries } from './dates-core.js';
import type { CollectionEntry } from 'astro:content';

export function formatWorkshopDate(startDate: string, endDate?: string): string {
  const formatter = new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const start = new Date(`${startDate}T00:00:00.000Z`);
  if (!endDate || endDate === startDate) return formatter.format(start);
  return `${formatter.format(start)} – ${formatter.format(new Date(`${endDate}T00:00:00.000Z`))}`;
}

export function splitWorkshopEntriesTyped(workshops: CollectionEntry<'workshops'>[], today: string): {
  upcoming: CollectionEntry<'workshops'>[];
  past: CollectionEntry<'workshops'>[];
} {
  const split = splitWorkshopEntries(workshops, today);
  return {
    upcoming: split.upcoming as CollectionEntry<'workshops'>[],
    past: split.past as CollectionEntry<'workshops'>[],
  };
}
