#!/usr/bin/env node
import { normalizeDomain } from './domain.js';

const args = process.argv.slice(2);
const json = args[0] === '--json';
const input = json ? args[1] : args[0];

if (args.length !== (json ? 2 : 1)) {
  console.error('Usage: node src/cli.js [--json] <domain-or-url>');
  process.exitCode = 1;
} else {
  try {
    const hostname = normalizeDomain(input);
    console.log(json ? JSON.stringify({ input, hostname, valid: true }) : hostname);
  } catch (error) {
    if (json) {
      console.log(JSON.stringify({ input, valid: false, error: error.message }));
    } else {
      console.error(error.message);
    }
    process.exitCode = 1;
  }
}
