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

{{<tabs labels="Basic | Advanced">}}
{{<tab label="basic" default="true">}}

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

{{</tab>}}
{{<tab label="advanced">}}

```js
---
filename: vitest.config.js
---
import { defineWorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globalSetup: ["./global-setup.ts"],
		pool: "@cloudflare/vitest-pool-workers",
		poolOptions: {
			workers: defineWorkersPoolOptions({
				isolatedStorage: true,
				singleWorker: true,
				miniflare: {
					// Configuration for the test runner Worker
					compatibilityDate: "2024-01-01",
					compatibilityFlags: [
						"nodejs_compat",
						// Required to use `WORKER.scheduled()`. This is an experimental
						// compatibility flag, and cannot be enabled in production.
						"service_binding_extra_handlers",
					],
					serviceBindings: {
						WORKER: "worker",
					},

					workers: [
						// Configuration for the Worker under test
						{
							name: "worker",
							modules: true,
							scriptPath: "./dist/index.js", // Built by `global-setup.ts`
							compatibilityDate: "2024-01-01",
							compatibilityFlags: ["nodejs_compat"],
						},
					],
				},
			}),
		},
	},
});
```

{{</tab>}}
{{</tabs>}}

If using the advanced configuration from the example above, you will also need this:

```js
---
filename: global-setup.ts
---
import childProcess from "node:child_process";

export default function () {
	childProcess.execSync("wrangler build", { cwd: __dirname });
}
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

### Unit

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

### Integration

```js
---
filename: scheduled-integration-self.test.ts
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

```js
---
filename: scheduled-integration-advanced.test.ts
---
import { env } from "cloudflare:test";
import { expect, it } from "vitest";

it("dispatches scheduled event", async () => {
	const result = await env.WORKER.scheduled({
		scheduledTime: new Date(1000),
		cron: "30 * * * *",
	});
	expect(result.outcome).toBe("ok");
});
```

## Related resources

- More examples of testing scheduled events can be found in the `workers-sdk` [repo](https://github.com/cloudflare/workers-sdk/)
