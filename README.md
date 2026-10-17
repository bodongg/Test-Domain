# Test Domain

A tiny, dependency-free Node.js utility that turns a domain or HTTP(S) URL into a normalized hostname. It is useful when preparing a domain list for tests or configuration.

## Requirements

Node.js 20 or newer.

## Use as a module

```js
import { normalizeDomain } from './src/domain.js';

normalizeDomain('https://WWW.Example.com/path'); // 'www.example.com'
```

Invalid inputs throw an `Error` with a message beginning `Invalid domain`.

## Run tests

```sh
npm test
```

This checks hostname syntax only. It does not query DNS or confirm that a site exists.
