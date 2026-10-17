import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeDomain } from '../src/domain.js';

test('normalizes a mixed-case domain', () => {
  assert.equal(normalizeDomain('Example.COM'), 'example.com');
});

test('accepts a URL and extracts its hostname', () => {
  assert.equal(normalizeDomain('https://WWW.Example.com/path'), 'www.example.com');
});

test('rejects an invalid hostname', () => {
  assert.throws(() => normalizeDomain('bad_domain'), /Invalid domain/);
});
