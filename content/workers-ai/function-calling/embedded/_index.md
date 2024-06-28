---
pcx_content_type: concept
weight: 2
title: Embedded
meta:
  title: Embedded function calling
---

{{<heading-pill style="beta">}} Embedded function calling {{</heading-pill>}}

Cloudflare has a unique [embedded function calling](https://blog.cloudflare.com/embedded-function-calling) feature that allows you to execute function code alongside your tool call inference. Our npm package [`@cloudflare/ai-utils`](https://www.npmjs.com/package/@cloudflare/ai-utils) is the developer toolkit to get started.

Embedded function calling can be used to easily make complex agents that interact with websites and APIs, like using natural language to create meetings on Google Calendar, saving data to Notion, automatically routing requests to other APIs, saving data to an R2 bucket - or all of this at the same time. All you need is a prompt and an OpenAPI spec to get started.


{{<Aside type="warning" header="REST API support">}}

Embedded function calling depends on features native to the Workers platform. This means that embedded function calling is only supported via [Cloudflare Workers](/workers-ai/get-started/workers-wrangler/), not via the [REST API](/workers-ai/get-started/rest-api/).

{{</Aside>}}

## Get Started

### 1. Create a Worker project with Workers AI

 Follow the [Workers AI Get Started Guide](/workers-ai/get-started/workers-wrangler/) until step 2.

### 2. Install additional npm package

Next, run the following command in your project repository to install the Worker AI utilities package.

```sh
$ npm install @cloudflare/ai-utils --save
```

### 3. Add Workers AI Embedded function calling

Update the index.ts file in your application directory with the following code:


```js
---
header: Embedded function calling example
---
import {
  createToolsFromOpenAPISpec,
  runWithTools,
  autoTrimTools,
} from "@cloudflare/ai-utils";

export default {
  async fetch(request, env, ctx) {
    const response = await runWithTools(
      env.AI,
      "@hf/nousresearch/hermes-2-pro-mistral-7b",
      {
        messages: [
          {
            role: "user",
            content: "Who is Cloudflare on github?",
          },
        ],
        tools: [
          // You can pass the OpenAPI spec link or contents directly
          ...(await createToolsFromOpenAPISpec(
            "https://gist.githubusercontent.com/mchenco/fd8f20c8f06d50af40b94b0671273dc1/raw/f9d4b5cd5944cc32d6b34cad0406d96fd3acaca6/partial_api.github.com.json",
            {
              overrides: [
                {
                  matcher: ({ url, method }) => {
                    return url.hostname === "api.github.com";
                  },
                  // for all requests on *.github.com, we'll need to add a User-Agent.
                  values: {
                    headers: {
                      "User-Agent":
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                    },
                  },
                },
              ],
            },
          )),
        ],
      },
    ).then((response) => {
      return response;
    });

    return new Response(JSON.stringify(response));
  },
};
```

This example imports the utils with `import { createToolsFromOpenAPISpec, runWithTools, autoTrimTools } from "@cloudflare/ai-utils"` and follows the  API reference below. 

The `ai-utils package` is also open-sourced on [Github](https://github.com/cloudflare/ai-utils).

### 4. Local development & deployment

 Follow steps 4 and 5 of the [Workers AI Get Started Guide](/workers-ai/get-started/workers-wrangler/) for local development and deployment.

{{<Aside type="note" header="Workers AI Embedded Function Calling charges">}}

Embedded function calling runs Workers AI inference requests. Standard charges for inference (e.g. tokens) usage will be charged.
Resources consumed (e.g. CPU time) during embedded functions' code execution will be charged just as any other Worker's code execution.

{{</Aside>}}

## API reference

For more details, refer to [API reference](/workers-ai/function-calling/embedded/api-reference/).

## Troubleshooting

If you are getting a `BadInput` error, your inputs may exceed our current context window for our models. Try reducing input tokens to resolve this error.
