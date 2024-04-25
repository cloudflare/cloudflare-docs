---
pcx_content_type: concept
title: Recipes
weight: 3
meta:
  description: Examples that demonstrate how to write unit tests and integration tests for Workers projects with the Workers Vitest integration.
---

# Recipes

Recipes are examples that help demonstrate how to write unit tests and integration tests for Workers projects using the [`@cloudflare/vitest-pool-workers`](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) package.

- [Basic unit and integration tests using `SELF`](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-unit-integration-self)
- [Basic integration tests using an auxiliary Worker](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-integration-auxiliary)
- [Isolated tests using KV, R2 and the Cache API](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/kv-r2-caches)
- [Isolated tests using D1 with migrations](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1)
- [Isolated tests using Durable Objects with direct access](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/durable-objects)
- [Tests using Queue producers and consumers](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/queues)
- [Tests using Hyperdrive with a Vitest managed TCP server](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/hyperdrive)
- [Tests using declarative/imperative outbound request mocks](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/request-mocking)
- [Tests using multiple auxiliary workers and request mocks](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/multiple-workers)
- [Tests importing WebAssembly modules](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/web-assembly)
