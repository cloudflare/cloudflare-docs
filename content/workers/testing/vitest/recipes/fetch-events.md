---
title: Scheduled Events
weight: 1
pcx_content_type: concept
meta:
  description: A guide to help you get started testing fetch events.
---

# Fetch Events

The following code snippets are intended to help you get started testing fetch events.

## Prerequisites

- `@cloudflare/vitest-pool-workers` [installed and setup](/workers/testing/vitest/get-started/write-your-first-test/)

## Example Configuration

```js
---
filename: vitest.config.js
---
import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		pool: "@cloudflare/vitest-pool-workers",
		poolOptions: {
			workers: defineWorkersPoolOptions({
				isolatedStorage: true,
				singleWorker: true,
				wrangler: {
					configPath: "./wrangler.toml",
				},
			}),
		},
	},
});
```

## Example Worker

```js
---
filename: index.ts
---
export default {
	async fetch(request, env, ctx) {
		return new Response("👋");
	}
} satisfies ExportedHandler;
```

## Example Tests

```js
---
filename: fetch-unit.test.ts
---
import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { expect, it } from "vitest";
import worker from "../src/index";

// Required to get correctly typed `request` for 1st param of `worker.fetch()`
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

it("dispatches fetch event", async () => {
	const request = new IncomingRequest("http://example.com");
	const ctx = createExecutionContext();
	const response = await worker.fetch(request, env, ctx);
	await waitOnExecutionContext(ctx);
	expect(await response.text()).toBe("👋");
});
```

```js
---
filename: fetch-integration-self.test.ts
---
import { SELF } from "cloudflare:test";
import { expect, it } from "vitest";
import "../src/"; // Currently required to automatically rerun tests when `main` changes

it("dispatches fetch event", async () => {
	const response = await SELF.fetch("http://example.com");
	expect(await response.text()).toBe("👋");
});
```

## Related resources

- More examples of testing scheduled events can be found in the `workers-sdk` [repo](https://github.com/cloudflare/workers-sdk/)
