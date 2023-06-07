---
type: example
summary: Create a modified request with edited properties based off of an
  incoming request.
tags:
  - Middleware
  - Headers
pcx_content_type: configuration
title: Modify request property
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * Example someHost is set up to return raw JSON
     * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied
     * @param {string} someHost the host the request will resolve too
     */
    const someHost = "example.com";
    const someUrl = "https://foo.example.com/api.js";

    /**
     * The best practice is to only assign new RequestInit properties
     * on the request object using either a method or the constructor
     */
    const newRequestInit = {
      // Change method
      method: "POST",
      // Change body
      body: JSON.stringify({ bar: "foo" }),
      // Change the redirect mode.
      redirect: "follow",
      // Change headers, note this method will erase existing headers
      headers: {
        "Content-Type": "application/json",
      },
      // Change a Cloudflare feature on the outbound response
      cf: { apps: false },
    };

    // Change just the host
    const url = new URL(someUrl);

    url.hostname = someHost;

    // Best practice is to always use the original request to construct the new request
    // to clone all the attributes. Applying the URL also requires a constructor
    // since once a Request has been constructed, its URL is immutable.
    const newRequest = new Request(
      url.toString(),
      new Request(request, newRequestInit)
    );

    // Set headers using method
    newRequest.headers.set("X-Example", "bar");
    newRequest.headers.set("Content-Type", "application/json");
    try {
      return await fetch(newRequest);
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    /**
     * Example someHost is set up to return raw JSON
     * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied
     * @param {string} someHost the host the request will resolve too
     */
    const someHost = "example.com";
    const someUrl = "https://foo.example.com/api.js";

    /**
     * The best practice is to only assign new RequestInit properties
     * on the request object using either a method or the constructor
     */
    const newRequestInit = {
      // Change method
      method: "POST",
      // Change body
      body: JSON.stringify({ bar: "foo" }),
      // Change the redirect mode.
      redirect: "follow",
      // Change headers, note this method will erase existing headers
      headers: {
        "Content-Type": "application/json",
      },
      // Change a Cloudflare feature on the outbound response
      cf: { apps: false },
    };

    // Change just the host
    const url = new URL(someUrl);

    url.hostname = someHost;

    // Best practice is to always use the original request to construct the new request
    // to clone all the attributes. Applying the URL also requires a constructor
    // since once a Request has been constructed, its URL is immutable.
    const newRequest = new Request(
      url.toString(),
      new Request(request, newRequestInit)
    );

    // Set headers using method
    newRequest.headers.set("X-Example", "bar");
    newRequest.headers.set("Content-Type", "application/json");
    try {
      return await fetch(newRequest);
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
