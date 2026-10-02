import { buildEnquiryMessageValue, buildMailtoUrlValue } from './enquiry-core.js';

export function buildEnquiryMessage(name: string, type: string, message: string): string {
  return buildEnquiryMessageValue(name, type, message);
}

export function buildMailtoUrl(email: string, subject: string, message: string): string {
  return buildMailtoUrlValue(email, subject, message);
}
