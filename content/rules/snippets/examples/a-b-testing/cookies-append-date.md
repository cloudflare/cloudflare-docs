---
type: example
summary: Append dates to cookies to use for A/B testing.
goal:
 - A/B testing
operation:
 - Cookies manipulation
 - Request header manipulation
product:
 - Snippets
pcx_content_type: configuration
title: Append dates to cookies
weight: 1001
layout: example
---

The following example appends the response header `Set-Cookie` with:
- a `testGroup` based on the request header `userGroup`
- a dynamically defined expiry date, seven days (`8640000` ms) after the request

On the [**Add Snippet Code**](https://dash.cloudflare.com/?to=/:account/:zone/rules/snippets/create/code) page, copy and paste the following code:

```js
export default {
  async fetch(request) {
    const response = await fetch(request);

    // Clone the response so that it's no longer immutable
    const newResponse = new Response(response.body, response);

    // Define the expiry and group variables
    const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();
    const group = request.headers.get("userGroup") == "premium" ? "A" : "B";

    // Append the custom header with the values
    newResponse.headers.append(
      "Set-Cookie",`testGroup=${group}; Expires=${expiry}; path=/`
    );

    return newResponse;
  },
};
```

To test the code, follow the steps below:
1. On the sandbox next to your code, make sure the **Network** tab is selected.
2. Define any necessary request headers on the **HTTP** tab.
3. Select `GET` and then **Send**.
4. In the **Network** tab, you should see a request for `snippets-preview-worker.snippets.workers.dev`.
5. Select the request and check the your code has been applied.

Proceed to define whether the Snippet should run for all incoming requests or only when they match a custom filter expression.

After reviewing the snippet code and the snippet rule that defines when the snippet will run, **Save and deploy Snippet. If you are not ready to deploy snippet** or **Save and enable later**.