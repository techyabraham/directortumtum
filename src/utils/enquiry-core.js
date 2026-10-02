export function buildEnquiryMessageValue(name, type, message) {
  return `Name: ${name.trim()}\nEnquiry: ${type}\n\n${message.trim()}`;
}

export function buildMailtoUrlValue(email, subject, message) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
