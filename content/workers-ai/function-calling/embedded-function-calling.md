---
pcx_content_type: configuration
weight: 2
title: Embedded Function Calling
---

{{<heading-pill style="beta">}} Embedded function calling {{</heading-pill>}}

Cloudflare has a unique [embedded function calling](https://blog.cloudflare.com/embedded-function-calling) feature that allows you to execute function code alongside your tool call inference. Our npm package [`@cloudflare/ai-utils`]() is the developer toolkit you'll need to get started with embedded function calling.

Embedded function calling can be used to easily make complex agents that interact with websites and APIs, like using natural language to create meetings on Google Calendar, saving data to Notion, automatically routing requests to other APIs, saving data to an R2 bucket - or all of them at the same time. All you need is a prompt and an OpenAPI spec to get started.


## Get Started
To get started, you will need to `npm install @cloudflare/ai-utils` in your project repository.

Then, import the utils with `import { createToolsFromOpenAPISpec, runWithTools, autoTrimTools } from "@cloudflare/ai-utils"` in your `index.js` file. 

Check out the working example and API reference below. Our utils package is also open-sourced on [Github]().

```js
import { createToolsFromOpenAPISpec, runWithTools, autoTrimTools } from "@cloudflare/ai-utils"

export default {
  async fetch(request, env, ctx) {

	const response = await runWithTools(
	  env.AI,
	  "@hf/nousresearch/hermes-2-pro-mistral-7b",
	  {
		messages: [{ role: "user", content: "Who is Cloudflare on github?"}],
		tools: [
			// You can pass the OpenAPI spec link or contents directly
			...await createToolsFromOpenAPISpec(
				'https://gist.githubusercontent.com/mchenco/fd8f20c8f06d50af40b94b0671273dc1/raw/f9d4b5cd5944cc32d6b34cad0406d96fd3acaca6/partial_api.github.com.json',
				{ overrides: [{
					// for all requests on *.github.com, we'll need to add a User-Agent and Authorization.
					matcher: ({ url, method }) => {
						return url.hostname === "api.github.com"
					},
					values: {
						headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",}
					}
				}]}
			),
		]
	  },   
	  {
		strictValidation: true,
		streamFinalResponse: true,
		verbose: true,
		trimFunction: autoTrimTools,
	  }
	).then((response) => {
	  return response
	})

	return new Response(JSON.stringify(response))
  }
}
```

## API Reference

### runWithTools
This wrapper method enables you to do embedded function calling. You pass it the AI binding, model, inputs (`messages` array and `tools` array), and optional configurations.

{{<definitions>}}
- {{<code>}}AI Binding{{</code>}}{{<param-type>}}Ai {{</param-type>}}
  - The AI binding, such as `env.AI`.
- {{<code>}}model{{</code>}}{{<param-type>}}BaseAiTextGenerationModels {{</param-type>}}
  - The ID of the model that supports function calling. For example, `@hf/nousresearch/hermes-2-pro-mistral-7b`.
- {{<code>}}input{{</code>}}{{<param-type>}}Object {{</param-type>}}
  - {{<code>}}messages{{</code>}}{{<param-type>}}RoleScopedChatInput[] {{</param-type>}}
  - {{<code>}}tools{{</code>}}{{<param-type>}}AiTextGenerationToolInputWithFunction[] {{</param-type>}}
- {{<code>}}config{{</code>}}{{<param-type>}}Object {{</param-type>}}
  - {{<code>}}streamFinalResponse{{</code>}}{{<param-type>}}boolean {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - {{<code>}}maxRecursiveToolRuns{{</code>}}{{<param-type>}}number {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - {{<code>}}strictValidation{{</code>}}{{<param-type>}}boolean {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - {{<code>}}verbose{{</code>}}{{<param-type>}}boolean {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  - {{<code>}}trimFunction{{</code>}}{{<param-type>}}boolean {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
  	- For the `trimFunction`, you can pass it `autoTrimTools`, which is another helper method we've devised to automatically choose the correct tools (using an LLM) before sending it off for inference. This means that your final inference call will have fewer input tokens.
{{</definitions>}}

### createToolsFromOpenAPISpec
This method lets you automatically create tool schemas based on OpenAPI specs, so you don't have to manually write or hardcode the tool schemas. You can pass the OpenAPI spec for any API in JSON or YAML format.

`createToolsFromOpenAPISpec` has a config input that allows you to perform overrides if you need to provide headers like Authentication or User-Agent.

{{<definitions>}}
- {{<code>}}spec{{</code>}}{{<param-type>}}string {{</param-type>}}
	- The OpenAPI specifiction in either JSON or YAML format, or a URL to a remote OpenAPI specification.
- {{<code>}}config{{</code>}}{{<param-type>}}Config {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
	- Configuration options for the createToolsFromOpenAPISpec function
	- {{<code>}}overrides{{</code>}}{{<param-type>}}ConfigRule[] {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
	- {{<code>}}matchPatterns{{</code>}}{{<param-type>}}RegExp[] {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
	- {{<code>}}options{{</code>}}{{<param-type>}}Object {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}} {
		{{<code>}}verbose{{</code>}}{{<param-type>}}boolean {{</param-type>}}{{<prop-meta>}} optional {{</prop-meta>}}
	}
{{</definitions>}}

## Troubleshooting
If you are getting a `BadInput` error, your inputs may exceed our current context window for our models. Try cutting down on  input tokens to resolve this error.
