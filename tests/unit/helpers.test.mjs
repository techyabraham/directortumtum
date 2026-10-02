import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWhatsAppUrlForNumber } from '../../src/utils/whatsapp-core.js';
import { formatNairaValue } from '../../src/utils/format-core.js';
import { splitWorkshopEntries } from '../../src/utils/dates-core.js';
import { buildEnquiryMessageValue, buildMailtoUrlValue } from '../../src/utils/enquiry-core.js';

test('WhatsApp URL safely encodes punctuation and symbols', () => {
  assert.equal(buildWhatsAppUrlForNumber('https://wa.me/100', 'film & edit? yes!'), 'https://wa.me/100?text=film%20%26%20edit%3F%20yes!');
});

test('WhatsApp URL preserves emoji and line breaks after encoding', () => {
  const url = buildWhatsAppUrlForNumber('https://wa.me/100', 'Hello 👋\nSecond line');
  assert.equal(new URL(url).searchParams.get('text'), 'Hello 👋\nSecond line');
});

test('NGN formatter uses en-NG and keeps the amount readable', () => {
  assert.match(formatNairaValue(123456), /123,456/);
  assert.match(formatNairaValue(123456), /₦|NGN/);
});

test('workshops split into upcoming, undated, and past groups', () => {
  const workshops = [
    { id: 'future', data: { status: 'open', startDate: '2030-05-01' } },
    { id: 'undated', data: { status: 'open' } },
    { id: 'past-date', data: { status: 'open', startDate: '2030-03-01' } },
    { id: 'completed', data: { status: 'completed', startDate: '2030-05-01' } },
  ];
  const split = splitWorkshopEntries(workshops, '2030-04-01');
  assert.deepEqual(split.upcoming.map(({ id }) => id), ['future', 'undated']);
  assert.deepEqual(split.past.map(({ id }) => id), ['past-date', 'completed']);
});

test('enquiry text is formatted and mailto values are encoded', () => {
  const message = buildEnquiryMessageValue('  A. Person  ', 'Film', 'Story & edit?\nSecond line');
  assert.equal(message, 'Name: A. Person\nEnquiry: Film\n\nStory & edit?\nSecond line');
  const url = buildMailtoUrlValue('studio@example.test', 'Film & production', message);
  assert.equal(new URL(url).searchParams.get('subject'), 'Film & production');
  assert.equal(new URL(url).searchParams.get('body'), message);
});
