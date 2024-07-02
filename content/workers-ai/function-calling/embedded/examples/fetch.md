---
pcx_content_type: example
title: Use fetch() handler
weight: 4
---

# Example using `fetch()` handler

TODO: Add desc
TODO: Fix formatting of response

```ts
---
header: Embedded function calling example with fetch()
---
import { runWithTools } from '@cloudflare/ai-utils';

type Env = {
	AI: Ai;
};

export default {
	async fetch(request, env, ctx) {
		// Define function
		const getWeather = async (args: { numDays: number }) => {
			const { numDays } = args;
			// Interpolate values for external API call
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${request.cf?.latitude}&longitude=${request.cf?.longitude}&daily=temperature_2m_max,precipitation_sum&timezone=GMT&forecast_days=${numDays}`
			);
			console.log('here');
			return response.text();
		};
		// Run AI inference with function calling
		const response = await runWithTools(
			env.AI,
			// Model with function calling support
			'@hf/nousresearch/hermes-2-pro-mistral-7b',
			{
				// Messages
				messages: [
					{
						role: 'user',
						content: 'What the weather like the next 5 days? Respond as text',
					},
				],
				// Definition of available tools the AI model can leverage
				tools: [
					{
						name: 'getWeather',
						description: 'Get the weather for the next [numDays] days',
						parameters: {
							type: 'object',
							properties: {
								numDays: { type: 'numDays', description: 'number of days for the weather forecast' },
							},
							required: ['numDays'],
						},
						// reference to previously defined function
						function: getWeather,
					},
				],
			}
		);
		return new Response(JSON.stringify(response));
	},
} satisfies ExportedHandler<Env>;

```
