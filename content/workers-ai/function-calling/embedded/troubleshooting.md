---
pcx_content_type: concept
weight: 8
title: Troubleshooting
meta:
  title: Troubleshooting
---

# Troubleshooting

This section will describe tools for troubleshooting and address common errors.

## Logging

General [logging](/workers/observability/logging/) capabilities for Workers also apply to embedded function calling.

### Function invocations

The invocations of tools can be logged as in any Worker using `console.log()`:

```ts
---
header: Logging tool invocations
highlight: [6]
---
export default {
	async fetch(request, env, ctx) {
		const sum = (args: { a: number; b: number }): Promise<string> => {
			const { a, b } = args;
      // Logging from within embedded function invocations
      console.log(`The sum function has been invoked with the arguments a: ${a} and b: ${b}`)
			return Promise.resolve((a + b).toString());
		};
    ...
  }
}
```

### Logging within `runWithTools`

The `runWithTools` function has a `verbose` mode that emits helpful logs for debugging of function calls as well input and output statistics.

```ts
---
header: Enabled verbose mode
highlight: [13]
---

const response = await runWithTools(
  env.AI,
  '@hf/nousresearch/hermes-2-pro-mistral-7b',
  {
    messages: [
      ...
    ],
    tools: [
      ...
    ],
  },
  // Enable verbose mode
  { verbose: true }
);
```

## Performance

To respond to a LLM prompt with embedded function, potentially multiple AI inference requests and function invocations are needed, which can have an impact on user experience.

Consider the following to improve performance:

- Shorten prompts (to reduce time for input processing)
- Reduce number of tools provided
- Stream the final response to the end user (to minimize the time to interaction). See example below:

```ts
---
header: Streamed response example
highlight: [15]
---
async fetch(request, env, ctx) {
  const response = (await runWithTools(
    env.AI,
    '@hf/nousresearch/hermes-2-pro-mistral-7b',
    {
      messages: [
        ...
      ],
      tools: [
        ...
      ],
    },
    {
      // Enable response streaming
      streamFinalResponse: true,
    }
  )) as ReadableStream;

  // Set response headers for streaming
  return new Response(response, {
    headers: {
      'content-type': 'text/event-stream',
    },
  });
}
```

## Common Errors

If you are getting a `BadInput` error, your inputs may exceed our current context window for our models. Try reducing input tokens to resolve this error.
