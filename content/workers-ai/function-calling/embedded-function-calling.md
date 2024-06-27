---
pcx_content_type: configuration
weight: 2
title: Embedded Function Calling
---

# Embedded function calling
Cloudflare has a unique [embedded function calling](https://blog.cloudflare.com/embedded-function-calling) feature that allows you to execute function code alongside your tool call inference. Our npm package [`@cloudflare/ai-utils`]() is the developer toolkit that enables embedded function calling.


## Get Started
To get started, you will need to `npm install @cloudflare/ai-utils` in your project repository. Then, import the utils with `import { runWithTools, createToolsFromOpenAPISpec } from '@cloudflare/ai-utils'` in your `index.js` file. 

```ts
import { createToolsFromOpenAPISpec, runWithTools, autoTrimTools } from "@cloudflare/ai-utils"

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const response = await runWithTools(
      env.AI,
      "@hf/nousresearch/hermes-2-pro-mistral-7b",
      {
        messages: [
          {
            role: "user",
            content: "What is the weather in Austin, Texas?"
          }
        ],
        tools: [
          // You can pass the OpenAPI spec link or contents directly
          ...await createToolsFromOpenAPISpec('https://raw.githubusercontent.com/open-meteo/open-meteo/main/openapi.yml'),
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

    return new Response(response instanceof ReadableStream ? response : JSON.stringify(response, null, 2))
  }
} satisfies ExportedHandler<Env>
```

## API Reference

### runWithTools
runWithTools is the wrapper function that enables you to do embedded function calling. You pass it the AI binding, model, inputs (`messages` array and `tools` array), and optional configurations.

{{<definitions>}}
- {{<code>}}AI Binding{{</code>}}{{<param-type>}}Ai{{</param-type>}}
  - The AI binding, such as `env.AI`
- {{<code>}}Model{{</code>}}{{<param-type>}}BaseAiTextGenerationModels{{</param-type>}}
  - The ID of the model that supports function calling. For example, `@hf/nousresearch/hermes-2-pro-mistral-7b`
- {{<code>}}Input{{</code>}}{{<param-type>}}Object{{</param-type>}}
  - {{<code>}}Messages{{</code>}}{{<param-type>}}RoleScopedChatInput[]{{</param-type>}}
  - {{<code>}}Tools{{</code>}}{{<param-type>}}AiTextGenerationToolInputWithFunction[]{{</param-type>}}
- {{<code>}}Config{{</code>}}{{<param-type>}}Object{{</param-type>}}
  - {{<code>}}streamFinalResponse{{</code>}}{{<param-type>}}boolean{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}
  - {{<code>}}maxRecursiveToolRuns{{</code>}}{{<param-type>}}number{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}
  - {{<code>}}strictValidation{{</code>}}{{<param-type>}}boolean{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}
  - {{<code>}}verbose{{</code>}}{{<param-type>}}boolean{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}
  - {{<code>}}trimFunction{{</code>}}{{<param-type>}}boolean{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}
{{</definitions>}}

### createToolsFromOpenAPISpec

{{<definitions>}}
- {{<code>}}spec{{</code>}}{{<param-type>}}String{{</param-type>}}
{{</definitions>}}

### autoTrimTools
