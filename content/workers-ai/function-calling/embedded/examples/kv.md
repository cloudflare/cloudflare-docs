---
pcx_content_type: navigation
title: Use KV API
weight: 6
---

# Example using Workers KV API

TODO: Add desc
TODO: Refine and test example, prompt does not work for sure, check for TS

```ts
---
header: Embedded function calling example with KV API
---
import { runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
  KV: KVNamespace
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const sum = (args: { a: number; b: number }): Promise<string> => {
			const { a, b } = args;
			return Promise.resolve((a + b).toString());
		};
		// Run AI inference with function calling
		const response = 		await runWithTools(env.AI, "@hf/nousresearch/hermes-2-pro-mistral-7b", {
			messages: [
				{ role: "system", content: "Put user given values in KV" },
				{ role: "user", content: prompt },
			],
			tools: [
				{
					name: "KV update",
					description: "Update a key-value pair in the database",
					parameters: {
						type: "object",
						properties: {
							key: {
								type: "string",
								description: "The key to update",
							},
							value: {
								type: "string",
								description: "The value to update",
							},
						},
						required: ["key", "value"],
					},
					async function({ key, value }) {
						const response = await env.KV.put(key, value);
						return `Successfully updated key-value pair in database: ${response}`;
					},
				},
			],
		});
    return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;
```
