---
type: example
summary: Example of how to add, change, or delete headers sent in a request or returned in a response.
tags:
  - Headers
  - Middleware
pcx_content_type: configuration
title: Alter headers
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
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
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request: Request) {
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
};
export default handler;
```

{{</tab>}}
{{</tabs>}}

You can also use the [`custom-headers-example` template](https://github.com/codewithkristian/custom-headers-example) to deploy this code to your custom domain.
