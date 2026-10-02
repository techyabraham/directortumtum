export function splitWorkshopEntries(workshops, today) {
  return {
    upcoming: workshops.filter(({ data }) => data.status !== 'completed' && (!data.startDate || data.startDate >= today)),
    past: workshops.filter(({ data }) => data.status === 'completed' || Boolean(data.startDate && data.startDate < today)),
  };
}
