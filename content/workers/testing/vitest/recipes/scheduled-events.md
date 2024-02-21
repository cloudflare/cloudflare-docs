---
title: Scheduled Events
weight: 1
pcx_content_type: concept
meta:
  description: A guide to help you get started testing scheduled events.
---

# Scheduled Events

The following code snippets are intended to help you get started testing scheduled events.

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
				miniflare: {
					// Required to use `SELF.scheduled()`. This is an experimental
					// compatibility flag, and cannot be enabled in production.
					compatibilityFlags: ["service_binding_extra_handlers"],
				},
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
	async scheduled(controller, env, ctx) {
		// ...
	}
} satisfies ExportedHandler;
```

## Example Tests

```js
---
filename: scheduled-unit.test.ts
---
import {
	createExecutionContext,
	createScheduledController,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { it } from "vitest";
import worker from "../src/index";

it("dispatches scheduled event", async () => {
	const controller = createScheduledController({
		scheduledTime: new Date(1000),
		cron: "30 * * * *",
	});
	const ctx = createExecutionContext();
	await worker.scheduled(controller, env, ctx);
	await waitOnExecutionContext(ctx);
  expect(result.outcome).toBe("ok");
});
```

```js
---
filename: scheduled-integration.test.ts
---
import { SELF } from "cloudflare:test";
import { expect, it } from "vitest";
import "../src/"; // Currently required to automatically rerun tests when `main` changes

it("dispatches scheduled event", async () => {
	const result = await SELF.scheduled({
		scheduledTime: new Date(1000),
		cron: "30 * * * *",
	});
	expect(result.outcome).toBe("ok");
});
```

## Related resources

- More examples of testing scheduled events can be found in the `workers-sdk` [repo](https://github.com/cloudflare/workers-sdk/)
