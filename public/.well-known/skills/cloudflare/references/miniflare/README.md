# Miniflare

Local simulator for Cloudflare Workers development/testing. Runs Workers in workerd sandbox implementing runtime APIs - no internet required.

## Features

- Full-featured: KV, Durable Objects, R2, D1, WebSockets, Queues
- Fully-local: test without internet, instant reload
- TypeScript-native: detailed logging, source maps
- Advanced testing: dispatch events without HTTP, simulate Worker connections

## When to Use

- Integration tests for Workers
- Advanced use cases requiring fine-grained control
- Testing bindings/storage locally
- Multiple Workers with service bindings

**Note:** Most users should use Wrangler. Miniflare for advanced testing.

## Setup

```bash
npm i -D miniflare
```

Requires ES modules in `package.json`:
```json
{"type": "module"}
```

## Quick Start

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  script: `
    export default {
      async fetch(request, env, ctx) {
        return new Response("Hello Miniflare!");
      }
    }
  `,
});

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // Hello Miniflare!
await mf.dispose();
```

## See Also

- [configuration.md](./configuration.md) - Config options, bindings, wrangler.toml
- [api.md](./api.md) - Programmatic API, methods, event dispatching
- [patterns.md](./patterns.md) - Testing patterns, CI, mocking
- [gotchas.md](./gotchas.md) - Compatibility issues, limits, debugging

## Resources

- [Miniflare Docs](https://developers.cloudflare.com/workers/testing/miniflare/)
- [Miniflare GitHub](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare)
- [Vitest Integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) (recommended)
