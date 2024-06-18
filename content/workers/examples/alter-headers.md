---
type: example
summary: Example of how to add, change, or delete headers sent in a request or returned in a response.
tags:
  - Headers
  - Middleware
languages:
  - JavaScript
  - TypeScript
  - Python
preview:
  - true
pcx_content_type: example
title: Alter headers
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
---
playground: true
---
export default {
  async fetch(request) {
    const response = await fetch("https://example.com");

    // Clone the response so that it's no longer immutable
    const newResponse = new Response(response.body, response);

    // Add a custom header with a value
    newResponse.headers.append(
      "x-workers-hello",
      "Hello from Cloudflare Workers"
    );

    // Delete headers
    newResponse.headers.delete("x-header-to-delete");
    newResponse.headers.delete("x-header2-to-delete");

    // Adjust the value for an existing header
    newResponse.headers.set("x-header-to-change", "NewValue");

    return newResponse;
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const response = await fetch(request);

    // Clone the response so that it's no longer immutable
    const newResponse = new Response(response.body, response);

    // Add a custom header with a value
    newResponse.headers.append(
      "x-workers-hello",
      "Hello from Cloudflare Workers"
    );

    // Delete headers
    newResponse.headers.delete("x-header-to-delete");
    newResponse.headers.delete("x-header2-to-delete");

    // Adjust the value for an existing header
    newResponse.headers.set("x-header-to-change", "NewValue");

    return newResponse;
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch

async def on_fetch(request):
    response = await fetch("https://example.com")

    # Clone the response so that it's no longer immutable
    new_response = Response.new(response.body, response)

    # Add a custom header with a value
    new_response.headers.append(
      "x-workers-hello",
      "Hello from Cloudflare Workers"
    )

    # Delete headers
    new_response.headers.delete("x-header-to-delete")
    new_response.headers.delete("x-header2-to-delete")

    # Adjust the value for an existing header
    new_response.headers.set("x-header-to-change", "NewValue")

    return new_response
```

{{</tab>}}
{{</tabs>}}

You can also use the [`custom-headers-example` template](https://github.com/kristianfreeman/custom-headers-example) to deploy this code to your custom domain.
