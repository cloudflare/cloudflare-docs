---
pcx_content_type: navigation
title: Parsing from OpenAPI Spec
weight: 7
---

# Example using parsing from OpenAPI Spec

TODO: Add desc

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
