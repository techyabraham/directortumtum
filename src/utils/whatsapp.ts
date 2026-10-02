import { brand } from '../data/site';
import { buildWhatsAppUrlForNumber } from './whatsapp-core.js';

export function buildWhatsAppUrl(message: string): string {
  return buildWhatsAppUrlForNumber(brand.whatsappUrl, message);
}
