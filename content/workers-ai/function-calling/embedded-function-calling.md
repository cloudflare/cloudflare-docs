---
pcx_content_type: configuration
weight: 2
title: Embedded Function Calling
---

# Embedded function calling
Cloudflare has our [own way of function calling](https://blog.cloudflare.com/embedded-function-calling) so that you can use execute function code alongside your tool call inference. Our npm package [`@cloudflare/ai-utils`]() is the developer toolkit that enables embedded function calling.


## Get Started
To get started, you will need to `npm install @cloudflare/ai-utils` in your project repository. Then, import the utils with `import { runWithTools, createToolsFromOpenAPISpec } from '@cloudflare/ai-utils'` in your `index.js` file. 

## API Reference

### runWithTools
runWithTools is the wrapper function that enables you to do embedded function calling. 

{{<definitions>}}
- {{<code>}}AI Binding{{</code>}}{{<param-type>}}Ai{{</param-type>}}
  - The 
- {{<code>}}Model{{</code>}}{{<param-type>}}BaseAiTextGenerationModels{{</param-type>}}
  - The ID of the model that supports function calling. For example, `@hf/nousresearch/hermes-2-pro-mistral-7b`
- {{<code>}}Input{{</code>}}{{<param-type>}}Object{{</param-type>}}
  - {{<code>}}Messages{{</code>}}{{<param-type>}}RoleScopedChatInput[]{{</param-type>}}
	- An array of messages, including the system prompt and user prompt.
  - {{<code>}}Tools{{</code>}}{{<param-type>}}AiTextGenerationToolInputWithFunction[]{{</param-type>}}
	- An array of tools with their name, description, and properties.
- {{<code>}}Config{{</code>}}{{<param-type>}}asdf{{</param-type>}}
  - asdf

{{</definitions>}}

### createToolsFromOpenAPISpec

### autoTrimTools
