export function buildWhatsAppUrlForNumber(baseUrl, message) {
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
