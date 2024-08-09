---
pcx_content_type: reference
title: Advanced Usage
weight: 8
meta:
  title: Advanced Usage
---

# Advanced Usage

## Custom Worker Entrypoint

If you need to run code before or after your Next.js application, you can do so by creating your own Worker entrypoint, and forward requests to your Next.js application.This can help you intercept logs from your app, catch and handle uncaught exceptions, or add additional context to incoming requests or outgoing responses.

1. Create a new file in your Next.js project, with a [`fetch()` handler](/workers/runtime-apis/handlers/fetch/), that looks like this:

```ts
---
filename: ./custom-entrypoint.ts
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

This looks like a Worker — but it does not need its own `wrangler.toml` file. You can think of it purely as code that `@cloudflare/next-on-pages` will then use to wrap the output of the build that is deployed to your Cloudflare Pages project.


2. Pass the entrypoint argument to the next-on-pages CLI with the path to your handler.

```sh
$ npx @cloudflare/next-on-pages --custom-entrypoint=./custom-entrypoint.ts
```
