---
pcx_content_type: navigation
title: Use KV API
weight: 6
layout: wide
products: [KV]
tags: [AI]
---

# Example using Workers KV API

Interact with persistent storage to retrieve or store information enables for powerful use cases.

In this example we show how embedded function calling can interact with other resources on the Cloudflare Developer Platform with a few lines of code.

## Pre-Requisites

For this example to work, you need to provision a [KV](/kv/) namespace first. To do so, follow the [KV - Get started ](/kv/get-started/) guide.

Importantly, your `wrangler.toml` file must be updated to include the `KV` binding definition to your respective namespace.

## Worker code

```ts
---
header: Embedded function calling example with KV API
---
import { runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
	KV: KVNamespace;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const updateKvValue = async ({ key, value }: { key: string; value: string }) => {
			const response = await env.KV.put(key, value);
			return `Successfully updated key-value pair in database: ${response}`;
		};

		// Run AI inference with function calling
		const response = await runWithTools(env.AI, '@hf/nousresearch/hermes-2-pro-mistral-7b', {
			messages: [
				{ role: 'system', content: 'Put user given values in KV' },
				{ role: 'user', content: 'Set the value of banana to yellow.' },
			],
			tools: [
				{
					name: 'KV update',
					description: 'Update a key-value pair in the database',
					parameters: {
						type: 'object',
						properties: {
							key: {
								type: 'string',
								description: 'The key to update',
							},
							value: {
								type: 'string',
								description: 'The value to update',
							},
						},
						required: ['key', 'value'],
					},
					function: updateKvValue,
				},
			],
		});
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;

```

## Verify results

To verify the results, run the following command

```sh
$ npx wrangler kv:key get banana --binding KV --local
```
