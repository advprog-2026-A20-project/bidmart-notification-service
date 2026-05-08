const test = require('node:test');
const assert = require('node:assert/strict');
const { consumedEvents } = require('../src/events/contracts');

test('event contracts berisi event inti notification', () => {
  assert.equal(consumedEvents.includes('BidPlaced'), true);
  assert.equal(consumedEvents.includes('AuctionClosed'), true);
});
