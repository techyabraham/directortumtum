export function filterDraftEntries<T extends { draft: boolean }>(entries: T[], search = ''): T[] {
  const previewEnabled = import.meta.env.DEV || (
    import.meta.env.PUBLIC_PREVIEW === 'true' && new URLSearchParams(search).get('preview') === '1'
  );
  return entries.filter((entry) => !entry.draft || previewEnabled);
}
