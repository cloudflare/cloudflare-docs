---
type: example
summary: Fetch and modify response properties which are immutable by creating a
  copy first.
tags:
  - Middleware
  - Headers
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Modify response
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * @param {string} headerNameSrc Header to get the new value from
     * @param {string} headerNameDst Header to set based off of value in src
     */
    const headerNameSrc = "foo"; //"Orig-Header"
    const headerNameDst = "Last-Modified";

    /**
     * Response properties are immutable. To change them, construct a new
     * Response and pass modified status or statusText in the ResponseInit
     * object. Response headers can be modified through the headers `set` method.
     */
    const originalResponse = await fetch(request);

    // Change status and statusText, but preserve body and headers
    let response = new Response(originalResponse.body, {
      status: 500,
      statusText: "some message",
      headers: originalResponse.headers,
    });

    // Change response body by adding the foo prop
    const originalBody = await originalResponse.json();
    const body = JSON.stringify({ foo: "bar", ...originalBody });
    response = new Response(body, response);

    // Add a header using set method
    response.headers.set("foo", "bar");

    // Set destination header to the value of the source header
    const src = response.headers.get(headerNameSrc);

    if (src != null) {
      response.headers.set(headerNameDst, src);
      console.log(
        `Response header "${headerNameDst}" was set to "${response.headers.get(
          headerNameDst
        )}"`
      );
    }
    return response;
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    /**
     * @param {string} headerNameSrc Header to get the new value from
     * @param {string} headerNameDst Header to set based off of value in src
     */
    const headerNameSrc = "foo"; //"Orig-Header"
    const headerNameDst = "Last-Modified";

    /**
     * Response properties are immutable. To change them, construct a new
     * Response and pass modified status or statusText in the ResponseInit
     * object. Response headers can be modified through the headers `set` method.
     */
    const originalResponse = await fetch(request);

    // Change status and statusText, but preserve body and headers
    let response = new Response(originalResponse.body, {
      status: 500,
      statusText: "some message",
      headers: originalResponse.headers,
    });

    // Change response body by adding the foo prop
    const originalBody = await originalResponse.json();
    const body = JSON.stringify({ foo: "bar", ...originalBody });
    response = new Response(body, response);

    // Add a header using set method
    response.headers.set("foo", "bar");

    // Set destination header to the value of the source header
    const src = response.headers.get(headerNameSrc);

    if (src != null) {
      response.headers.set(headerNameDst, src);
      console.log(
        `Response header "${headerNameDst}" was set to "${response.headers.get(
          headerNameDst
        )}"`
      );
    }
    return response;
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch, JSON

async def on_fetch(request):
    header_name_src = "foo" # Header to get the new value from
    header_name_dst = "Last-Modified" # Header to set based off of value in src

    # Response properties are immutable. To change them, construct a new response
    original_response = await fetch(request)

    # Change status and statusText, but preserve body and headers
    response = Response.new(original_response.body, status=500, statusText="some message", headers=original_response.headers)

    # Change response body by adding the foo prop
    original_body = await original_response.json()
    original_body.foo = "bar"
    response = Response.new(JSON.stringify(original_body), response)

    # Add a new header
    response.headers["foo"] = "bar"

    # Set destination header to the value of the source header
    src = response.headers[header_name_src]

    if src is not None:
        response.headers[header_name_dst] = src
        print(f'Response header {header_name_dst} was set to {response.headers[header_name_dst]}')

    return response
```

{{</tab>}}
{{</tabs>}}