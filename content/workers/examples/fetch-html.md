---
type: example
summary: Send a request to a remote server, read HTML from the response, and
  serve that HTML.
tags:
  - Originless
pcx_content_type: configuration
title: Fetch HTML
weight: 3
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * Example someHost at URL is set up to respond with HTML
     * Replace URL with the host you wish to send requests to
     */
    const someHost = "https://examples.cloudflareworkers.com/demos";
    const url = someHost + "/static/html";

    /**
     * gatherResponse awaits and returns a response body as a string.
     * Use await gatherResponse(..) in an async function to get the response body
     * @param {Response} response
     */
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      } else if (contentType.includes("application/text")) {
        return response.text();
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.text();
      }
    }

    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    };

    const response = await fetch(url, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    /**
     * Example someHost at URL is set up to respond with HTML
     * Replace URL with the host you wish to send requests to
     */
    const someHost = "https://examples.cloudflareworkers.com/demos";
    const url = someHost + "/static/html";

    /**
     * gatherResponse awaits and returns a response body as a string.
     * Use await gatherResponse(..) in an async function to get the response body
     * @param {Response} response
     */
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      } else if (contentType.includes("application/text")) {
        return response.text();
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.text();
      }
    }

    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    };

    const response = await fetch(url, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
