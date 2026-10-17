import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

function run(...args) {
  return spawnSync(process.execPath, ['src/cli.js', ...args], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
  });
}

test('prints a normalized hostname', () => {
  const result = run('HTTPS://Example.COM/path');
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), 'example.com');
});

test('reports invalid input with a nonzero exit code', () => {
  const result = run('bad_domain');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Invalid domain/);
});

test('prints machine-readable JSON when requested', () => {
  const result = run('--json', 'https://Example.COM/path');
  assert.equal(result.status, 0);
  assert.deepEqual(JSON.parse(result.stdout), {
    input: 'https://Example.COM/path',
    hostname: 'example.com',
    valid: true,
  });
});

test('prints a JSON error for invalid input', () => {
  const result = run('--json', 'bad_domain');
  assert.equal(result.status, 1);
  const data = JSON.parse(result.stdout);
  assert.equal(data.valid, false);
  assert.match(data.error, /Invalid domain/);
});
