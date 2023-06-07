---
type: example
summary: Send a GET request and read in JSON from the response. Use to fetch
  external data.
tags:
  - Originless
pcx_content_type: configuration
title: Fetch JSON
weight: 4
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    /**
     * Example someHost is set up to take in a JSON request
     * Replace url with the host you wish to send requests to
     * @param {string} someHost the host to send the request to
     * @param {string} url the URL to send the request to
     */
    const someHost = "https://examples.cloudflareworkers.com/demos";
    const url = someHost + "/static/json";

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
      }
      return response.text();
    }

    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
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
  async fetch(request, env, ctx) {
    /**
     * Example someHost is set up to take in a JSON request
     * Replace url with the host you wish to send requests to
     * @param {string} someHost the host to send the request to
     * @param {string} url the URL to send the request to
     */
    const someHost = "https://examples.cloudflareworkers.com/demos";
    const url = someHost + "/static/json";

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
      }
      return response.text();
    }

    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
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
