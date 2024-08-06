---
pcx_content_type: reference
title: Custom worker entrypoint
meta:
  title: Custom worker entrypoint | Full-stack (SSR) | Next.js apps
---

# Custom worker entrypoint (Advanced)

Certain use cases may require the ability the control what happens in your Pages project's worker. Observability requirements, for instance, might benefit from being able to intercept console logs, catch uncaught exceptions, or monitor the time spent doing work in the next-on-pages router.

All of these would require modifying the worker to add some code before and/or after the `next-on-pages` logic runs.

To achieve this, next-on-pages exposes an option to use your own worker entrypoint. Within it, you can directly import and use the next-on-pages fetch handler.

1. Create a handler in your project.

```ts
---
header: ./custom-entrypoint.ts
---
import nextOnPagesHandler from '@cloudflare/next-on-pages/fetch-handler';

export default {
	async fetch(request, env, ctx) {
		// do something before running the next-on-pages handler

		const response = await nextOnPagesHandler.fetch(request, env, ctx);

		// do something after running the next-on-pages handler

		return response;
	},
} as ExportedHandler<{ ASSETS: Fetcher }>;
```

2. Pass the entrypoint argument to the next-on-pages CLI with the path to your handler.

```sh
$ npx @cloudflare/next-on-pages --custom-entrypoint=./custom-entrypoint.ts
```